"""UI tests with an in-memory localStorage harness.
The managed browser blocks URL navigation in this environment. These tests
render the local HTML via set_content, not a deployed or installed PWA.
Run HTTP smoke tests separately on a normal browser/iPhone before release.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
HTML=(ROOT/'index.html').read_text()
BASE=json.loads((ROOT/'questions.json').read_text())
BANK={q['id']:q for q in BASE['questions']}
report=[]
def ok(name):report.append(name);print('PASS',name)
def state(page):return page.evaluate("JSON.parse(localStorage.getItem('rail-english-v1'))")
def open_page(browser,seed=None,width=390,fail=False):
    page=browser.new_page(viewport={'width':width,'height':844})
    page.on('dialog',lambda dialog:dialog.accept())
    page.evaluate('''({seed,fail})=>{
      const mem=new Map();if(seed!==null)mem.set('rail-english-v1',typeof seed==='string'?seed:JSON.stringify(seed));
      Object.defineProperty(window,'localStorage',{value:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>{if(fail)throw Error('QuotaExceededError');mem.set(k,String(v));},removeItem:k=>mem.delete(k)}});
      Object.defineProperty(window,'sessionStorage',{value:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}});
      window.__uiErrors=[];window.addEventListener('error',e=>window.__uiErrors.push(e.message));
      const original=URL.createObjectURL;URL.createObjectURL=function(b){window.__exportedBlob=b;return original.call(this,b);};
    }''',{'seed':seed,'fail':fail})
    page.set_content(HTML,wait_until='load')
    return page

def answer(page,correct=True,confidence='clear'):
    s=state(page);qid=s['session']['qids'][s['session']['index']];q=BANK[qid]
    pick=q['answer'] if correct else (q['answer']+1)%4
    page.locator(f'[data-action=answer][data-choice="{pick}"]').click()
    saved=state(page);a=saved['attempts'][-1]
    assert a['qid']==qid and a['correct']==correct and a['confidence']=='pending'
    assert page.locator('.complete-sentence').inner_text()==(q['text'].replace('_____',q['options'][q['answer']]) if q['kind']=='cloze' else q['options'][q['answer']])
    page.locator(f'[data-action=next][data-confidence="{confidence if correct else "unsure"}"]').click()
    return qid

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    page=open_page(browser)
    assert page.locator('h1').inner_text()=='通勤時間を、積み重ねに。'
    assert len(BANK)==120 and all(sum(q['level']==level for q in BANK.values())==40 for level in [730,800,850])
    ok('120 questions, 40 in each course')
    page.locator('[data-action=start][data-mode=new]').click()
    initial=state(page)['session']['qids'];assert len(initial)==5 and len(set(initial))==5
    wrong=answer(page,False);assert state(page)['progress'][wrong]['needsReview']
    unsure=answer(page,True,'unsure');assert state(page)['progress'][unsure]['needsReview']
    clear=answer(page,True,'clear');assert not state(page)['progress'][clear]['needsReview']
    ok('Wrong answers / uncertain correct answers / clear correct answers are separated')
    s=state(page);qid=s['session']['qids'][s['session']['index']]
    page.locator(f'[data-action=answer][data-choice="{BANK[qid]["answer"]}"]').click()
    checkpoint=state(page)
    page2=open_page(browser,checkpoint)
    page2.locator('[data-action=resume]').click()
    assert page2.locator('.feedback').count()==1
    assert state(page2)['attempts']==checkpoint['attempts']
    page2.locator('[data-action=next][data-confidence=clear]').click()
    answer(page2,True)
    assert state(page2)['session'] is None
    assert '4 / 5' in page2.locator('.result-score').inner_text()
    ok('Answer saved before confidence; fresh page restores in-progress answer without duplicates')
    page2.locator('[data-action=nav][data-route=home]').first.click()
    page2.locator('[data-action=start][data-mode=new]').click()
    assert not set(state(page2)['session']['qids'])&set(initial)
    ok('New-only practice avoids previously answered items')
    for i in range(5):answer(page2,True)
    page2.locator('[data-action=nav][data-route=stats]').click()
    assert '90%' in page2.locator('.metric-row').inner_text()
    ok('First-attempt accuracy is independent of review accuracy')
    page2.locator('[data-action=nav][data-route=review]').first.click()
    assert len([v for v in state(page2)['progress'].values() if v['needsReview']])==2
    page2.locator('[data-action=start][data-mode=mistakes]').click()
    assert set(state(page2)['session']['qids'])=={wrong,unsure}
    for i in range(2):answer(page2,True)
    assert len(state(page2)['attempts'])==12
    assert all(not v['needsReview'] for v in state(page2)['progress'].values())
    assert all(a['type']=='review' for a in state(page2)['attempts'][-2:])
    ok('Immediate mistake review updates spaced schedule and review counters')
    page2.locator('[data-action=nav][data-route=home]').first.click()
    page2.locator('[data-action=level][data-level="850"]').click()
    page2.locator('#filter').select_option('reading')
    page2.locator('[data-action=start][data-mode=new]').click()
    selected=state(page2)['session']['qids'];assert all(BANK[q]['level']==850 and BANK[q]['kind']=='reading' for q in selected)
    assert page2.locator('.passage').count()==1
    ok('Course/filter controls and reading passage rendering')
    before=state(page2)
    page2.locator('#bottom-nav [data-action=nav][data-route=settings]').click()
    page2.locator('[data-action=export]').click()
    exported=json.loads(page2.evaluate('window.__exportedBlob.text()'))
    assert exported['app']=='rail-english' and exported['state']['attempts']==before['attempts']
    restore=open_page(browser)
    restore.locator('#bottom-nav [data-action=nav][data-route=settings]').click()
    restore.locator('#backup-file').set_input_files({'name':'backup.json','mimeType':'application/json','buffer':json.dumps(exported).encode()})
    restore.wait_for_selector('[data-action=resume]')
    assert state(restore)['attempts']==before['attempts']
    ok('Backup serialization / import restore with confirmation')
    restore.locator('#bottom-nav [data-action=nav][data-route=settings]').click()
    q=dict(BANK['q001']);q['id']='test-extra-001'
    pack={'schemaVersion':1,'questions':[q]}
    restore.locator('#pack-file').set_input_files({'name':'pack.json','mimeType':'application/json','buffer':json.dumps(pack).encode()})
    restore.wait_for_function("JSON.parse(localStorage.getItem('rail-english-v1')).extraQuestions.length===1")
    assert state(restore)['attempts']==before['attempts']
    restore.locator('#pack-file').set_input_files({'name':'pack.json','mimeType':'application/json','buffer':json.dumps(pack).encode()})
    restore.wait_for_function("document.querySelector('#toast').textContent.includes('同じID')")
    assert len(state(restore)['extraQuestions'])==1
    ok('Additional pack import preserves progress; duplicate IDs rejected')
    for width in [320,390,768,1280]:
        layout=open_page(browser,width=width)
        for route in ['home','review','stats','settings']:
            layout.locator(f'#bottom-nav [data-route={route}]').click()
            assert layout.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),(width,route)
        layout.locator('#largeText').check()
        layout.locator('#bottom-nav [data-route=home]').click()
        layout.locator('[data-action=start][data-mode=new]').click()
        assert layout.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),(width,'quiz')
        assert not layout.evaluate('window.__uiErrors')
        layout.close()
    ok('No horizontal overflow at 320/390/768/1280px; large text works')
    failed=open_page(browser,fail=True)
    failed.locator('[data-action=start][data-mode=new]').click()
    assert failed.locator('#storage-warning').is_visible()
    corrupt=open_page(browser,seed='{invalid json')
    assert corrupt.locator('#storage-warning').is_visible()
    corrupt.locator('[data-action=start][data-mode=new]').click()
    assert corrupt.evaluate("localStorage.getItem('rail-english-v1')")=='{invalid json'
    ok('Storage failure warns; malformed existing data is not overwritten')
    assert not page2.evaluate('window.__uiErrors')
    clean=open_page(browser)
    clean.screenshot(path='/mnt/data/rail-home-mobile.png',full_page=False)
    clean.locator('[data-action=start][data-mode=new]').click()
    clean.screenshot(path='/mnt/data/rail-question-mobile.png',full_page=False)
    desktop=open_page(browser,width=1120)
    desktop.screenshot(path='/mnt/data/rail-desktop.png',full_page=True)
    browser.close()
(ROOT/'tests'/'ui-results.json').write_text(json.dumps({'method':'Chromium local HTML rendering with in-memory storage harness; not iPhone/Safari or installed PWA','passed':report},ensure_ascii=False,indent=2))
print('ALL UI TESTS PASSED',len(report))
