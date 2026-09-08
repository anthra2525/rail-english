/* Rail English 1.0 — no framework, analytics, remote fonts or AI requests. */
'use strict';
(() => {
const APP_VERSION='1.0.0';
const STORAGE_KEY='rail-english-v1';
const basePack=JSON.parse(document.getElementById('question-data').textContent);
const DAY=86400000;
const $=s=>document.querySelector(s);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={
 rail:'<path d="M7 4h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z"/><path d="M5 11h14M9 7h6M8 19l-2 3m10-3 2 3"/><path d="M8 15h1m6 0h1"/>',
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 review:'<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/><path d="M12 7v5l3 2"/>',
 stats:'<path d="M4 20V10m8 10V4m8 16v-7M2 21h20"/>',
 settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 book:'<path d="M12 5C8 2 4 3 3 4v15c2-2 6-2 9 0 3-2 7-2 9 0V4c-1-1-5-2-9 1v14"/>',
 flag:'<path d="M5 21V3c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>'
};
const icon=(name,size=22)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.book}</svg>`;
const defaultState=()=>({schemaVersion:1,settings:{level:730,filter:'all',size:5,largeText:false,timer:false},progress:{},attempts:[],session:null,lastResult:null,extraQuestions:[]});
let storageError='';
let state=defaultState();
let route='home';
let offlineState={ready:false,text:'オフライン準備中',detail:'画面と問題を端末に保存します。'};
let updateReady=null;
let toastHandle;
let visibleSince=0;
let elapsedPending=0;
const textValid=(v,max=12000)=>typeof v==='string'&&v.length>0&&v.length<=max;
function validateQuestion(q){
 return q&&textValid(q.id,100)&&/^[a-zA-Z0-9_-]+$/.test(q.id)&&[730,800,850].includes(q.level)&&['cloze','reading'].includes(q.kind)&&textValid(q.skill,50)&&textValid(q.text,1500)&&Array.isArray(q.options)&&q.options.length===4&&q.options.every(o=>textValid(o,500))&&new Set(q.options).size===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&textValid(q.translation,5000)&&textValid(q.explanation,5000)&&(q.kind!=='cloze'||q.text.split('_____').length===2)&&(q.kind!=='reading'||textValid(q.passage)&&textValid(q.title,120));
}
function cleanState(raw){
 if(!raw||raw.schemaVersion!==1||!Array.isArray(raw.attempts)||typeof raw.progress!=='object'||raw.progress===null) throw Error('対応していない学習記録です。');
 const s=defaultState(),r=raw.settings||{};
 s.settings={level:[730,800,850].includes(r.level)?r.level:730,filter:['all','grammar','vocab','reading'].includes(r.filter)?r.filter:'all',size:[5,10].includes(r.size)?r.size:5,largeText:r.largeText===true,timer:r.timer===true};
 if(raw.extraQuestions!==undefined&&(!Array.isArray(raw.extraQuestions)||raw.extraQuestions.length>5000||!raw.extraQuestions.every(validateQuestion)))throw Error('追加問題の形式が正しくありません。');
 const baseIds=new Set(basePack.questions.map(q=>q.id));
 s.extraQuestions=(raw.extraQuestions||[]).filter(q=>!baseIds.has(q.id));
 if(new Set(s.extraQuestions.map(q=>q.id)).size!==s.extraQuestions.length)throw Error('問題IDが重複しています。');
 const known=new Set([...baseIds,...s.extraQuestions.map(q=>q.id)]);
 s.attempts=raw.attempts.filter(a=>a&&known.has(a.qid)&&textValid(a.id,120)&&Number.isFinite(a.at)&&a.at>0&&Number.isInteger(a.choice)&&a.choice>=0&&a.choice<=3&&typeof a.correct==='boolean'&&['new','review'].includes(a.type)).map(a=>({id:a.id,qid:a.qid,at:a.at,choice:a.choice,correct:a.correct,type:a.type,seconds:Math.max(0,Math.min(3600,Number(a.seconds)||0)),confidence:['clear','unsure','pending'].includes(a.confidence)?a.confidence:'pending'})).slice(-100000);
 if(new Set(s.attempts.map(a=>a.id)).size!==s.attempts.length)throw Error('回答IDが重複しています。');
 s.progress=Object.create(null);
 for(const [id,p] of Object.entries(raw.progress)){
  if(!known.has(id)||!p||!Number.isFinite(p.seen)||p.seen<1)continue;
  s.progress[id]={seen:Math.floor(p.seen),correct:Math.max(0,Math.floor(Number(p.correct)||0)),streak:Math.max(0,Math.min(20,Math.floor(Number(p.streak)||0))),due:Number.isFinite(p.due)?p.due:0,needsReview:p.needsReview===true,lastAt:Number.isFinite(p.lastAt)?p.lastAt:0};
 }
 const x=raw.session;
 if(x&&Array.isArray(x.qids)&&x.qids.length>0&&x.qids.length<=10&&x.qids.every(id=>known.has(id))&&new Set(x.qids).size===x.qids.length&&Number.isInteger(x.index)&&x.index>=0&&x.index<x.qids.length&&Array.isArray(x.attemptIds)&&x.attemptIds.length<=x.qids.length&&x.attemptIds.every(id=>s.attempts.some(a=>a.id===id))){
  s.session={id:typeof x.id==='string'?x.id:'resumed',mode:['daily','new','review','mistakes','practice'].includes(x.mode)?x.mode:'daily',qids:x.qids,index:x.index,attemptIds:x.attemptIds,started:Number(x.started)||Date.now()};
  if(x.attemptIds.length<x.index||x.attemptIds.length>x.index+1||x.attemptIds.some((id,i)=>s.attempts.find(a=>a.id===id)?.qid!==x.qids[i]))s.session=null;
 }
 return s;
}
try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state=cleanState(JSON.parse(raw));}catch(e){storageError='保存済みの記録を読み込めませんでした。元データを上書きしないため保存を停止しています。「設定」から元データを書き出してください。';}
let questions=[...basePack.questions,...state.extraQuestions];
let byId=new Map(questions.map(q=>[q.id,q]));
function refreshQuestions(){questions=[...basePack.questions,...state.extraQuestions];byId=new Map(questions.map(q=>[q.id,q]));}
function save(){
 if(storageError)return false;
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch(e){storageError='端末に記録を保存できません。今の画面では学習できますが、閉じる前に「設定」でバックアップしてください。';renderStorageWarning();return false;}
}
function renderStorageWarning(){const b=$('#storage-warning');b.textContent=storageError;b.classList.toggle('hidden',!storageError);}
const todayKey=(time=Date.now())=>{const d=new Date(time);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const formatDate=n=>new Date(n).toLocaleDateString('ja-JP',{month:'numeric',day:'numeric'});
const percent=(n,d)=>d?`${Math.round(n/d*100)}%`:'—';
const progressFor=q=>state.progress[typeof q==='string'?q:q.id];
const courseName=level=>({730:'730点を目指す',800:'800点に挑戦',850:'800点台を固める'}[level]);
const kindName=q=>q.kind==='reading'?'短文読解':'短文穴埋め';
function filtered(){return questions.filter(q=>q.level===state.settings.level&&(state.settings.filter==='all'||(state.settings.filter==='reading'?q.kind==='reading':state.settings.filter==='vocab'?['語彙','日程・会議'].includes(q.skill):q.kind==='cloze'&&!['語彙','日程・会議'].includes(q.skill))));}
const dueQuestions=(pool=questions)=>pool.filter(q=>progressFor(q)&&progressFor(q).due<=Date.now());
const mistakes=()=>questions.filter(q=>progressFor(q)?.needsReview);
const firstAttempts=()=>state.attempts.filter(a=>a.type==='new');
const todayAttempts=()=>state.attempts.filter(a=>todayKey(a.at)===todayKey());
function streakDays(){
 const days=new Set(state.attempts.map(a=>todayKey(a.at)));let d=new Date(),n=0;
 if(!days.has(todayKey(d.getTime())))d.setDate(d.getDate()-1);
 while(days.has(todayKey(d.getTime()))&&n<10000){n++;d.setDate(d.getDate()-1);}return n;
}
function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function selectSession(mode){
 const pool=filtered(),fresh=shuffle(pool.filter(q=>!progressFor(q))),due=shuffle(dueQuestions(pool));let selection=[];
 if(mode==='review')selection=dueQuestions().sort((a,b)=>progressFor(a).due-progressFor(b).due);
 else if(mode==='mistakes')selection=shuffle(mistakes());
 else if(mode==='new')selection=fresh;
 else if(mode==='practice')selection=shuffle(pool);
 else {
  const taken=new Set();const add=xs=>{for(const q of xs)if(!taken.has(q.id)){selection.push(q);taken.add(q.id);}};
  add(due.slice(0,Math.min(2,state.settings.size)));add(fresh);add(due);
 }
 return selection.slice(0,state.settings.size).map(q=>q.id);
}
function toast(msg){const box=$('#toast');box.textContent=msg;box.classList.remove('hidden');clearTimeout(toastHandle);toastHandle=setTimeout(()=>box.classList.add('hidden'),4500);}
function renderHeader(){
 $('.brand-logo').innerHTML=icon('rail',23);
 const b=$('#offline-status');b.classList.toggle('is-ready',offlineState.ready);b.innerHTML=`<span class="dot"></span><span>${esc(offlineState.text)}</span>`;
 b.title=offlineState.detail;
 $('#bottom-nav').innerHTML=[['home','ホーム','home'],['review','復習','review'],['stats','記録','stats'],['settings','設定','settings']].map(([r,label,ic])=>`<button class="nav-item ${route===r?'active':''}" data-action="nav" data-route="${r}" ${route===r?'aria-current="page"':''}>${icon(ic)}<span>${label}</span></button>`).join('');
}
function todayWeek(){let html='';for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const list=state.attempts.filter(a=>todayKey(a.at)===todayKey(d.getTime()));html+=`<div class="day"><div class="day-box ${list.length?'done':''} ${i===0?'today':''}">${list.length||'·'}</div>${['日','月','火','水','木','金','土'][d.getDay()]}</div>`;}return html;}
function intro(eyebrow,title,desc){return `<div class="intro"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div><div class="date-tag">${new Date().toLocaleDateString('ja-JP',{month:'long',day:'numeric',weekday:'long'})}</div></div>`;}
function renderHome(){
 const today=todayAttempts(),first=firstAttempts(),pool=filtered(),fresh=pool.filter(q=>!progressFor(q)).length,seen=pool.length-fresh,due=dueQuestions().length;
 const s=state.session;
 return `${intro('SMALL STEPS, BIG GOALS.','通勤時間を、積み重ねに。','まずは730点。その先の800点台まで、自分のペースで。')}
 <div class="layout"><div class="stack">
 <section class="card hero"><div class="hero-label">YOUR DAILY PRACTICE</div><div class="hero-heading"><div><h2>${s?'続きから、もう1問。':`今日の${state.settings.size}問`}</h2><p>${s?`${s.index+1}問目から再開できます`:'新しい問題と、必要な復習を。'}</p></div><div class="round-count" aria-label="今日の回答数 ${today.length}">${today.length}<small>問</small></div></div><button class="btn full" data-action="${s?'resume':'start'}" data-mode="daily">${s?'続きから再開する':'学習をはじめる'}${icon('arrow',19)}</button><div class="hero-foot"><span>${esc(courseName(state.settings.level))}</span><span>1問ごとに記録を保存</span></div></section>
 <section class="card"><div class="section-row"><h2>学習のペース</h2><span class="tag">直近7日</span></div><div class="stat-grid"><div><div class="stat-value">${Object.keys(state.progress).length}<span class="small muted"> 問</span></div><div class="stat-label">学習した問題</div></div><div><div class="stat-value">${percent(first.filter(a=>a.correct).length,first.length)}</div><div class="stat-label">初見の正答率</div></div><div><div class="stat-value">${streakDays()}<span class="small muted"> 日</span></div><div class="stat-label">連続学習</div></div></div><div class="mini-week">${todayWeek()}</div></section>
 <section class="card"><div class="review-teaser"><div class="review-icon">${icon('review',24)}</div><div style="flex:1"><strong>復習のタイミング</strong><p>期限が来た問題が ${due} 問あります</p></div><button class="text-btn" data-action="nav" data-route="review" aria-label="復習画面へ">${icon('arrow',22)}</button></div></section>
 </div><div class="stack"><section class="card"><div class="section-row"><h2>いまの学習コース</h2><span class="tag">自由に変更</span></div><div class="course-options">${[730,800,850].map(l=>`<button class="course-option ${state.settings.level===l?'selected':''}" data-action="level" data-level="${l}" aria-pressed="${state.settings.level===l}"><span class="course-number">${l===850?'800+':l}</span><span class="course-caption">${l===730?'基礎を固める':l===800?'次の目標へ':'定着と応用'}</span></button>`).join('')}</div><div class="row-two"><div class="field"><label for="filter">出題の種類</label><select id="filter" data-setting="filter"><option value="all">すべて</option><option value="grammar">文法</option><option value="vocab">語彙・会議</option><option value="reading">短文読解</option></select></div><div class="field"><label for="size">1回の問題数</label><select id="size" data-setting="size"><option value="5">5問</option><option value="10">10問</option></select></div></div><div class="course-summary">選択中の範囲：${seen} / ${pool.length}問を学習済み</div><div class="progress-track"><div class="progress-fill" style="width:${pool.length?seen/pool.length*100:0}%"></div></div><div class="section-space button-stack"><button class="btn secondary full" data-action="start" data-mode="new" ${fresh?'':'disabled'}>未出題だけ解く <span class="small muted">${fresh}問</span></button><button class="text-btn" data-action="start" data-mode="practice">学習済みも含めて自由練習</button></div><p class="subtle-note">コースは学習用の目安です。正答率から本試験のスコアは推定しません。</p></section><section class="card"><div class="eyebrow">YOUR NEXT STATION</div><h3>730は通過点。800点台へ。</h3><div class="milestone"><span class="milestone-stop"></span><span class="milestone-text">730</span><span class="milestone-line"></span><span class="milestone-stop"></span><span class="milestone-text">800</span><span class="milestone-line"></span><span class="milestone-stop"></span><span class="milestone-text">800+</span></div><p class="subtle-note section-space">「当たった」と「わかった」を分けて記録。迷った正解も、あとから復習できます。</p></section></div></div><p class="footer-note">オリジナル ${questions.length} 問 · 広告なし · アカウント不要</p>`;
}
function activeAttempt(){const s=state.session;return s?state.attempts.find(a=>a.id===s.attemptIds[s.index]):null;}
function renderQuiz(){
 const s=state.session;if(!s){route='home';return renderHome();}const q=byId.get(s.qids[s.index]),a=activeAttempt();
 const status=a?.correct?'正解です':'正解を確認しよう';
 const full=q.kind==='cloze'?esc(q.text).replace('_____',`<strong>${esc(q.options[q.answer])}</strong>`):esc(q.options[q.answer]);
 const next=s.index===s.qids.length-1?'結果を見る':'次の問題へ';
 return `<div class="quiz-wrap"><div class="quiz-top"><button class="text-btn" data-action="pause">← 中断してホームへ</button><span>${s.index+1} / ${s.qids.length} 問</span></div><div class="progress-track"><div class="progress-fill" style="width:${s.index/s.qids.length*100}%"></div></div><div class="quiz-meta"><div class="badges"><span class="badge">${q.level===850?'800+':q.level}</span><span class="badge gray">${esc(q.skill)}</span><span class="badge gray">${a?a.type==='new'?'初見':'復習':progressFor(q)?'復習':'初見'}</span></div>${state.settings.timer?'<span class="timer" id="question-timer">00:00</span>':'<span class="small muted">時間制限なし</span>'}</div>
 <section class="card question-card"><div class="question-number">${esc(kindName(q))} <span class="muted">/ ${q.id}</span></div>${q.kind==='reading'?`<div class="passage-title">${esc(q.title)}</div><div class="passage" lang="en">${esc(q.passage)}</div>`:''}<h2 class="question-text" lang="en">${esc(q.text).replace('_____','<span class="blank">_____</span>')}</h2><div class="choices" role="group" aria-label="解答の選択肢">${q.options.map((opt,i)=>`<button class="choice ${a?(i===q.answer?'correct':i===a.choice?'wrong':'unselected'):''}" data-action="answer" data-choice="${i}" ${a?'disabled':''} aria-label="${'ABCD'[i]} ${esc(opt)}"><span class="choice-letter">${'ABCD'[i]}</span><span class="choice-word" lang="en">${esc(opt)}</span>${a&&(i===q.answer||i===a.choice)?`<span class="choice-mark" aria-hidden="true">${i===q.answer?'✓':'×'}</span>`:''}</button>`).join('')}</div>${!a?'<p class="quiz-hint">答えを1つ選んでください</p>':''}</section>
 ${a?`<section class="card feedback" id="feedback" tabindex="-1" aria-label="正解と解説"><div class="feedback-status ${a.correct?'':'incorrect'}">${a.correct?'✓':'↺'} ${status}</div><div class="answer-label">${q.kind==='cloze'?'完成した正解文':'正解の選択肢'}</div><p class="complete-sentence" lang="en">${full}</p><p class="translation">${esc(q.translation)}</p><div class="explain"><h3>ここを押さえよう</h3><p>${esc(q.explanation)}</p>${q.proof?`<div class="proof-label">本文の根拠</div><div class="proof" lang="en">${esc(q.proof)}</div>`:''}</div><div class="confidence">${a.correct?`<p>自信を持って答えられましたか？</p><div class="row-two"><button class="btn secondary" data-action="next" data-confidence="unsure">迷った・勘だった</button><button class="btn" data-action="next" data-confidence="clear">わかった ${icon('arrow',17)}</button></div>`:`<p>この問題は自動で復習に残します。</p><button class="btn full" data-action="next" data-confidence="unsure">${next} ${icon('arrow',17)}</button>`}</div></section>`:''}</div>`;
}
function renderReview(){const needs=mistakes(),due=dueQuestions();return `${intro('MAKE IT STICK.','あやふやを、自信に。','間違いも、迷った正解も。必要なものから復習しよう。')}
 <div class="layout"><div class="stack"><section class="card"><div class="section-row"><h2>今日の復習</h2><span class="count-bubble">${due.length}<span class="small muted"> 問</span></span></div><p class="small muted">全コースから、復習日が来た問題を出題します。</p><button class="btn full section-space" data-action="start" data-mode="review" ${due.length?'':'disabled'}>期限が来た問題を復習する ${icon('arrow',18)}</button><div class="divider"></div><div class="section-row"><h3>いま復習したい問題</h3><span class="small muted">${needs.length}問</span></div><p class="small muted">間違えた問題や「迷った」問題は、期限前でも復習できます。</p><button class="btn secondary full section-space" data-action="start" data-mode="mistakes" ${needs.length?'':'disabled'}>間違い・迷いを復習する</button></section><section class="card"><h3>復習のタイミングについて</h3><p class="subtle-note section-space">間違い・迷いは翌日にもう一度。自信を持って正解できたら、1日 → 3日 → 7日 → 14日 → 30日の間隔で確認します。「期限が来た問題」には、覚えた内容の定期確認も含まれます。</p><p class="subtle-note section-space">回答した直後は、確認が済むまで復習候補に残します。解説の下で「わかった」または「迷った」を選ぶと確定します。</p></section></div><div class="stack"><section class="card"><div class="section-row"><h2>復習リスト</h2><span class="tag">間違い・迷い</span></div>${needs.length?needs.slice(0,30).map(q=>`<div class="list-item"><div class="list-item-main"><div class="tags">${q.level===850?'800+':q.level} · ${esc(q.skill)} · 次回 ${formatDate(progressFor(q).due)}</div><p lang="en">${esc(q.text)}</p></div></div>`).join('')+(needs.length>30?`<p class="small muted">ほか ${needs.length-30}問あります。</p>`:''):`<div class="empty"><div class="empty-icon">${icon('check',28)}</div><h3>復習リストは空です</h3><p>問題を解くと、間違いや迷いを<br>ここに集めておけます。</p><button class="btn secondary" data-action="nav" data-route="home">ホームへ</button></div>`}</section></div></div>`;}
function renderStats(){const first=firstAttempts(),review=state.attempts.filter(a=>a.type==='review');const skills=[...new Set(questions.map(q=>q.skill))];const bySkill=skills.map(skill=>{const rows=first.filter(a=>byId.get(a.qid)?.skill===skill);return {skill,rows,correct:rows.filter(a=>a.correct).length};}).filter(x=>x.rows.length).sort((a,b)=>(a.correct/a.rows.length)-(b.correct/b.rows.length));return `${intro('SEE YOUR PROGRESS.','できることが、増えていく。','初めて解いた結果と、復習の結果を分けて記録します。')}
 <div class="metric-row"><section class="card metric-card"><div class="stat-value">${percent(first.filter(a=>a.correct).length,first.length)}</div><div class="stat-label">初見の正答率 · ${first.length}問</div></section><section class="card metric-card"><div class="stat-value">${percent(review.filter(a=>a.correct).length,review.length)}</div><div class="stat-label">復習の正答率 · ${review.length}回答</div></section><section class="card metric-card"><div class="stat-value">${state.attempts.length}</div><div class="stat-label">合計の回答数</div></section></div>
 <div class="layout"><section class="card"><div class="section-row"><h2>分野ごとの初見正答率</h2><span class="tag">苦手から表示</span></div>${bySkill.length?bySkill.map(x=>`<div class="bar-row"><span>${esc(x.skill)}</span><div class="progress-track"><div class="progress-fill" style="width:${x.correct/x.rows.length*100}%"></div></div><small>${percent(x.correct,x.rows.length)}<br>${x.rows.length}問</small></div>`).join(''):'<p class="muted small section-space">まだ記録がありません。最初の5問からはじめましょう。</p>'}<p class="subtle-note section-space">少ない問題数での正答率は変動が大きいため、参考値として見てください。</p></section><div class="stack"><section class="card"><h2>コースの進み具合</h2>${[730,800,850].map(l=>{const pool=questions.filter(q=>q.level===l),seen=pool.filter(q=>progressFor(q)).length;return `<div class="section-space"><div class="section-row"><h3>${courseName(l)}</h3><span class="small muted">${seen} / ${pool.length}</span></div><div class="progress-track"><div class="progress-fill" style="width:${seen/pool.length*100}%"></div></div></div>`;}).join('')}</section><section class="card"><h3>本試験の点数とは別の記録です</h3><p class="subtle-note section-space">この問題集は独自作成の練習問題です。コース名は目標の目安で、難易度を本試験と統計的に対応づけたものではありません。予測スコアは表示しません。現在はリスニング・長文の本格演習を含みません。</p></section></div></div>`;}
function renderSettings(){return `${intro('YOUR LEARNING, YOUR WAY.','いつもの勉強を、快適に。','表示・オフライン準備・バックアップをここで管理。')}
 <div class="layout"><div class="stack"><section class="card"><h2>表示と学習</h2><label class="setting-row" for="largeText"><div><h3>文字を大きくする</h3><p>問題文・選択肢・解説を大きく表示</p></div><input class="switch" type="checkbox" id="largeText" data-setting="largeText" ${state.settings.largeText?'checked':''}></label><label class="setting-row" for="timer"><div><h3>回答時間を表示する</h3><p>時間制限はありません。中断時間は除外します。</p></div><input class="switch" type="checkbox" id="timer" data-setting="timer" ${state.settings.timer?'checked':''}></label></section>
 <section class="card"><h2>学習記録のバックアップ</h2><p class="small muted section-space">回答履歴と追加問題をファイルに保存します。端末の容量不足やサイトデータの消去に備えて、定期的に保存してください。</p><div class="button-stack section-space"><button class="btn" data-action="export">学習記録を書き出す</button><label class="btn secondary file-label" for="backup-file">バックアップから復元する</label><input class="hidden" id="backup-file" type="file" accept=".json,application/json" data-import="backup">${storageError?'<button class="btn secondary" data-action="raw-export">読み込めなかった元データを書き出す</button>':''}</div><p class="subtle-note section-space">復元は現在の記録を置き換えます。ファイルは端末内で処理され、サーバーへ送られません。</p></section>
 <section class="card"><h2>問題集</h2><p class="small muted section-space">オリジナル ${basePack.questions.length}問 / 追加 ${state.extraQuestions.length}問</p><label class="btn secondary full section-space file-label" for="pack-file">追加問題パックを読み込む</label><input class="hidden" id="pack-file" type="file" accept=".json,application/json" data-import="pack"><p class="subtle-note section-space">専用JSON形式の問題パックに対応。問題IDが重複するパックは読み込みません。既存の学習記録は保持されます。</p></section></div>
 <div class="stack"><section class="card"><div class="section-row"><h2>オフラインの準備</h2><span class="tag">${offlineState.ready?'保存済み':'未確認'}</span></div><p class="small">${esc(offlineState.detail)}</p><button class="btn secondary full section-space" data-action="check-offline">保存状態を確認する</button>${updateReady?'<button class="btn soft full section-space" data-action="update">新しい版に更新する</button>':''}<details open><summary>iPhoneに入れる手順</summary><ol class="help-list"><li>HTTPSで公開したこのアプリのURLを、Safariで開きます。</li><li>共有メニューから「ホーム画面に追加」。表示される場合は「Webアプリとして開く」をオンにします。</li><li>追加したアイコンから開き、オンラインのまま「オフライン準備完了」を確認します。</li><li>機内モードでアプリを閉じて開き直し、出題と記録の保存を確認します。</li></ol><p>ZIPやHTMLファイルを「ファイル」アプリで開くだけでは、インストールは完了しません。初回はHTTPSの公開URLが必要です。</p></details><details><summary>オフラインでできること・注意点</summary><p>出題、解説、復習、途中再開、記録表示は通信なしで動作します。更新と初回保存だけ通信が必要です。保存を維持できる保証はないため、記録のバックアップを推奨します。通信状態の表示はブラウザーが報告する状態で、実際の回線品質を測定していません。</p></details><button class="text-btn section-space" data-action="persist">ブラウザーにデータ保持をリクエストする</button></section><section class="card"><h3>Rail English <span class="small muted">${APP_VERSION}</span></h3><p class="subtle-note section-space">個人学習用の試作品。ログイン・広告・アクセス解析・有料AIへの接続はありません。個別の回答記録は端末内に保存します。公式団体とは関係のない非公式アプリです。TOEICはETSの登録商標です。</p><details><summary>学習記録をリセットする</summary><p>この端末の回答履歴を消去します。追加問題と表示設定は残します。先にバックアップしてください。</p><button class="btn danger section-space" data-action="reset">回答履歴をリセット</button></details></section></div></div>`;}
function renderResult(){const r=state.lastResult;if(!r){route='home';return renderHome();}return `<div class="quiz-wrap">${intro('ONE STEP FORWARD.','おつかれさま。','小さな積み重ねが、次の目標につながります。')}<section class="card empty"><div class="result-score">${r.correct}<small> / ${r.total}</small></div><p>今回の正解数</p><div class="result-items"><div class="result-line"><span>初めて解いた問題</span><strong>${r.fresh}問</strong></div><div class="result-line"><span>復習した問題</span><strong>${r.total-r.fresh}問</strong></div><div class="result-line"><span>間違い・迷いとして残した問題</span><strong>${r.unsure}問</strong></div></div><div class="button-stack"><button class="btn full" data-action="nav" data-route="home">ホームへ戻る</button><button class="btn secondary full" data-action="nav" data-route="review">復習リストを見る</button></div><p class="subtle-note section-space">${storageError?'端末への保存に失敗しています。設定からバックアップしてください。':'今回の記録は端末に保存しました。'}</p></section></div>`;}
function render(scroll=true){
 document.body.classList.toggle('large-text',state.settings.largeText);
 renderHeader();renderStorageWarning();
 $('#main').innerHTML=({home:renderHome,quiz:renderQuiz,review:renderReview,stats:renderStats,settings:renderSettings,result:renderResult}[route]||renderHome)();
 if($('#filter'))$('#filter').value=state.settings.filter;if($('#size'))$('#size').value=state.settings.size;
 renderHeader();
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
 if(route==='quiz'&&!activeAttempt()&&document.visibilityState==='visible'&&!visibleSince)visibleSince=performance.now();
 tickTimer();
}
function freezeTime(){if(visibleSince){elapsedPending+=performance.now()-visibleSince;visibleSince=0;}}
function resetTime(){visibleSince=0;elapsedPending=0;}
function tickTimer(){const el=$('#question-timer');if(!el||route!=='quiz')return;const a=activeAttempt();const n=a?Math.round(a.seconds):Math.floor((elapsedPending+(visibleSince?performance.now()-visibleSince:0))/1000);el.textContent=`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
function go(r){freezeTime();route=r;render();}
function start(mode){
 if(state.session){toast('中断中の学習があります。ホームから続きを再開してください。');go('home');return;}
 const qids=selectSession(mode);if(!qids.length){toast('この条件の問題はありません。コースや出題の種類を変更してください。');return;}
 state.session={id:`s-${Date.now()}`,mode,qids,index:0,attemptIds:[],started:Date.now()};save();resetTime();route='quiz';render();
}
function answer(choice){
 const s=state.session;if(!s||activeAttempt()||!Number.isInteger(choice)||choice<0||choice>3)return;
 freezeTime();const q=byId.get(s.qids[s.index]);const old=progressFor(q),now=Date.now();const a={id:`a-${now}-${Math.random().toString(36).slice(2,9)}`,qid:q.id,choice,correct:choice===q.answer,at:now,seconds:Math.min(3600,elapsedPending/1000),confidence:'pending',type:old?'review':'new'};
 state.attempts.push(a);s.attemptIds.push(a.id);
 state.progress[q.id]={seen:(old?.seen||0)+1,correct:(old?.correct||0)+(a.correct?1:0),streak:a.correct?(old?.streak||0):0,due:now+DAY,needsReview:true,lastAt:now};save();render(false);
 requestAnimationFrame(()=>{const feedback=$('#feedback');feedback?.focus({preventScroll:true});feedback?.scrollIntoView({behavior:'instant',block:'start'});});
}
function next(confidence){
 const s=state.session,a=activeAttempt();if(!s||!a||a.confidence!=='pending')return;
 a.confidence=a.correct&&confidence==='clear'?'clear':'unsure';const p=state.progress[a.qid];
 if(a.confidence==='clear'){p.streak++;p.needsReview=false;const intervals=[1,3,7,14,30];p.due=Date.now()+intervals[Math.min(p.streak-1,4)]*DAY;}else{p.streak=0;p.needsReview=true;p.due=Date.now()+DAY;}
 if(s.index+1>=s.qids.length){const attempts=s.attemptIds.map(id=>state.attempts.find(a=>a.id===id));state.lastResult={total:attempts.length,correct:attempts.filter(a=>a.correct).length,fresh:attempts.filter(a=>a.type==='new').length,unsure:attempts.filter(a=>a.confidence!=='clear').length};state.session=null;route='result';}else{s.index++;}
 save();resetTime();render();
}
function downloadFile(data,name,type='application/json'){
 const blob=new Blob([data],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
async function importFile(file,kind){
 if(!file)return;
 try{
  if(file.size>20*1024*1024)throw Error('20MB以下のファイルを選んでください。');
  const raw=JSON.parse(await file.text());
  if(kind==='backup'){
   if(raw.app!=='rail-english'||raw.schemaVersion!==1)throw Error('Rail Englishのバックアップではありません。');
   const incoming=cleanState(raw.state);
   if(!confirm('現在の学習記録を、このバックアップの内容に置き換えます。よろしいですか？'))return;
   freezeTime();resetTime();state=incoming;storageError='';refreshQuestions();save();go('home');toast('学習記録を復元しました。');
  }else{
   if(!raw||raw.schemaVersion!==1||!Array.isArray(raw.questions)||!raw.questions.length||raw.questions.length>5000||!raw.questions.every(validateQuestion))throw Error('問題パックの形式が正しくありません。');
   const ids=raw.questions.map(q=>q.id);if(new Set(ids).size!==ids.length||ids.some(id=>byId.has(id)))throw Error('既存の問題と同じIDがあります。重複しないパックを選んでください。');
   if(state.extraQuestions.length+raw.questions.length>5000)throw Error('追加問題は最大5,000問です。');
   state.extraQuestions.push(...raw.questions);refreshQuestions();save();render(false);toast(`${raw.questions.length}問を追加しました。`);
  }
 }catch(e){toast(e instanceof SyntaxError?'JSONファイルを読み取れませんでした。':e.message);}
}
async function refreshOffline(){
 if(document.querySelector('meta[name=rail-preview]')){offlineState={ready:false,text:'操作お試し版',detail:'このファイルは操作確認用です。iPhoneへの追加には、ZIPのpublicフォルダー内のファイルをHTTPSで公開してください。'};renderHeader();return;}
 if(location.protocol==='file:') {offlineState={ready:false,text:'ファイル試用版',detail:'いまはHTMLファイルの試用モードです。PCで基本操作を試せますが、iPhoneに入れるには同梱ファイルをHTTPSで公開してください。'};renderHeader();return;}
 if(!('serviceWorker' in navigator)||!window.isSecureContext){offlineState={ready:false,text:'公開URLが必要',detail:'オフラインの保存にはHTTPSの公開URLが必要です。PCでの開発はlocalhostでも確認できます。'};renderHeader();return;}
 try{
  const existing=await navigator.serviceWorker.getRegistration('./');
  const reg=(!navigator.onLine&&existing)?existing:await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
  if(reg.waiting)updateReady=reg.waiting;
  reg.addEventListener('updatefound',()=>{const w=reg.installing;w?.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller){updateReady=reg.waiting;toast('新しい版があります。設定画面から更新できます。');}});});
  // Do not label the app ready until its controlling worker confirms all required files exist.
  if(!navigator.serviceWorker.controller){offlineState={ready:false,text:'端末へ保存中',detail:'必要なファイルを端末に保存しています。この画面を閉じずにお待ちください。'};renderHeader();return;}
  const channel=new MessageChannel();
  const result=await new Promise((resolve,reject)=>{const id=setTimeout(()=>reject(Error('保存状態の確認がタイムアウトしました。')),7000);channel.port1.onmessage=e=>{clearTimeout(id);resolve(e.data);};navigator.serviceWorker.controller.postMessage({type:'CHECK_CACHE'},[channel.port2]);});
  offlineState=result.ready?{ready:true,text:navigator.onLine?'オフライン準備完了':'圏外でも学習できます',detail:`画面・問題・アプリアイコンを保存済みです（${result.version}）。ホーム画面のアイコンから開き、機内モードで再起動と出題を確認してください。`}:{ready:false,text:'保存を再確認',detail:'保存ファイルが不足しています。通信できる場所で「保存状態を確認する」を押してください。'};
 }catch(e){offlineState={ready:false,text:'保存を確認できません',detail:'通信できる場所で、設定の「保存状態を確認する」を押してください。既存の保存データが使える場合もあります。'};}
 renderHeader();
}
document.addEventListener('click',async e=>{
 const button=e.target.closest('[data-action]');if(!button||button.disabled)return;
 if(button.tagName==='A')e.preventDefault();
 const act=button.dataset.action;
 if(act==='nav')go(button.dataset.route);
 else if(act==='level'){state.settings.level=Number(button.dataset.level);save();render(false);}
 else if(act==='start')start(button.dataset.mode);
 else if(act==='resume'){go('quiz');}
 else if(act==='pause')go('home');
 else if(act==='answer')answer(Number(button.dataset.choice));
 else if(act==='next')next(button.dataset.confidence);
 else if(act==='export')downloadFile(JSON.stringify({app:'rail-english',schemaVersion:1,exportedAt:new Date().toISOString(),state},null,2),`rail-english-backup-${todayKey()}.json`);
 else if(act==='raw-export'){try{downloadFile(localStorage.getItem(STORAGE_KEY)||'{}','rail-english-recovery.json');}catch(e){toast('元データにアクセスできませんでした。');}}
 else if(act==='check-offline'){await refreshOffline();if(route==='settings')render(false);}
 else if(act==='update'&&updateReady){if(state.session){toast('中断中の学習を終えてから更新してください。');return;}if(confirm('保存済みの学習記録を残して、新しい版に更新します。よろしいですか？')){sessionStorage.setItem('rail-english-reload','1');updateReady.postMessage({type:'SKIP_WAITING'});}}
 else if(act==='persist'){try{const ok=await navigator.storage?.persist?.();toast(ok?'ブラウザーがデータ保持を許可しました。':'この環境では保持を保証できません。バックアップをご利用ください。');}catch(e){toast('保持の申請は利用できません。バックアップをご利用ください。');}}
 else if(act==='reset'){if(!confirm('この端末の回答履歴をすべて消します。先にバックアップしましたか？'))return;const settings=state.settings,extraQuestions=state.extraQuestions;state={...defaultState(),settings,extraQuestions};storageError='';save();resetTime();render(false);toast('学習記録をリセットしました。');}
});
document.addEventListener('change',e=>{
 const el=e.target;if(el.dataset.setting){const key=el.dataset.setting;state.settings[key]=el.type==='checkbox'?el.checked:key==='size'?Number(el.value):el.value;save();render(false);}
 if(el.dataset.import){importFile(el.files?.[0],el.dataset.import);el.value='';}
});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){freezeTime();save();}else if(route==='quiz'&&!activeAttempt()){visibleSince=performance.now();}});
window.addEventListener('pagehide',()=>{freezeTime();save();});
window.addEventListener('online',()=>refreshOffline());window.addEventListener('offline',()=>refreshOffline());
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY){freezeTime();try{state=cleanState(JSON.parse(e.newValue));refreshQuestions();resetTime();render(false);toast('別の画面で変更された記録を反映しました。');}catch(err){toast('別の画面の記録を反映できません。多重起動を避けてください。');}}});
if('serviceWorker' in navigator){navigator.serviceWorker.addEventListener('controllerchange',()=>{if(sessionStorage.getItem('rail-english-reload')){sessionStorage.removeItem('rail-english-reload');location.reload();}else refreshOffline();});}
setInterval(tickTimer,1000);
render();refreshOffline();
})();
