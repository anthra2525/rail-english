'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),tools=path.join(root,'tools'),results=path.join(root,'verification'),app=path.join(root,'app'),base=path.join(root,'baseline/rail-english-64ca2cc63203ae0d535e95873824189e6d84ec93');
process.env.TEMP=path.join(tools,'tmp');process.env.TMP=process.env.TEMP;
const {chromium}=require(path.join(tools,'playwright/package')),V=require('../vocabulary-core.js'),items=require('../vocabulary-data.js');
let source=base,workerHits=0;
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://localhost').pathname.replace('/rail-english/','/');
 const target=path.join(source,name==='/'?'index.html':name);
 if(name==='/sw.js')workerHits++;
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':name.endsWith('.js')?'application/javascript':name.endsWith('.png')?'image/png':name.endsWith('webmanifest')?'application/manifest+json':'text/html; charset=utf-8','Cache-Control':'no-cache'});res.end(data);});
});
(async()=>{
 await new Promise(resolve=>server.listen(4174,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,executablePath:path.join(tools,'browser/chrome-win64/chrome.exe'),env:{...process.env,USERPROFILE:path.join(tools,'browser-profile'),APPDATA:path.join(tools,'browser-profile/appdata'),LOCALAPPDATA:path.join(tools,'browser-profile/local')}});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:4174/rail-english/';await page.goto(url);
  await page.waitForFunction(()=>document.getElementById('offline-status').textContent.includes('準備完了'));
  await page.locator('[data-action="start"][data-mode="daily"]').click();
  const data=JSON.parse(fs.readFileSync(path.join(base,'index.html'),'utf8').match(/<script[^>]*id="question-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const oldState=await page.evaluate(()=>JSON.parse(localStorage.getItem('rail-english-v1'))),q=data.questions.find(x=>x.id===oldState.session.qids[0]);
  await page.locator('[data-action="answer"][data-choice="'+q.answer+'"]').click();
  await page.locator('[data-action="next"][data-confidence="clear"]').click();
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('rail-english-v1')));
  // A real waiting worker. Upgrade directly here because v1.1 blocks its update button during a legacy session.
  source=app;
  await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration('./');await r.update();window.upgradeWorker=r.installing||r.waiting;});
  await page.waitForFunction(()=>window.upgradeWorker?.state==='installed'); await page.evaluate(()=>{sessionStorage.setItem('rail-english-reload','1');window.upgradeWorker.postMessage({type:'SKIP_WAITING'});});
  // Waiting worker was requested atomically in the preceding check.
  try {await page.waitForSelector('.vocabulary-hero',{timeout:10000});} catch(e) {console.log(JSON.stringify(await page.evaluate(async()=>({text:document.body.innerText,controller:navigator.serviceWorker.controller?.scriptURL,version:document.documentElement.innerHTML.match(/APP_VERSION=.{1,20}/)?.[0],caches:await caches.keys(),registration:await navigator.serviceWorker.getRegistration('./').then(r=>({active:r.active?.state,waiting:r.waiting?.state,installing:r.installing?.state})),reload:sessionStorage.getItem('rail-english-reload')}))));console.log('errors',errors);throw e;}
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('rail-english-v1')));
  assert.deepEqual(after,before); // Loading new app alone makes no destructive storage write.
  await page.locator('[data-action="vocab-start"]').click();
  const migrated=await page.evaluate(()=>JSON.parse(localStorage.getItem('rail-english-v1')));
  assert.deepEqual(migrated.attempts,before.attempts);assert.deepEqual(migrated.progress,before.progress);assert.deepEqual(migrated.session,before.session);
  const cacheInfo=await page.evaluate(async()=>{const names=await caches.keys();const cache=await caches.open(names.find(n=>n.endsWith('::1.2.0')));return {names,urls:(await cache.keys()).map(r=>r.url)};});
  assert.equal(cacheInfo.names.some(n=>n.endsWith('::1.1.0')),false);
  for(const file of ['vocabulary-core.js','vocabulary-data.js','vocabulary-ui.js'])assert.ok(cacheInfo.urls.some(u=>u.endsWith(file)));
  await context.setOffline(true);await page.reload();await page.locator('[data-action="vocab-start"]').click();assert.equal(await page.locator('[data-action="vocab-answer"]').count(),4);
  await context.setOffline(false);
  // Empty catalog plan must not display completion.
  const empty=await page.evaluate(()=>JSON.parse(localStorage.getItem('rail-english-v1')));empty.vocabulary=V.fresh();
  for(const item of items)empty.vocabulary.progress[item.id]=V.schedule(null,true,'clear',Date.now());
  await page.evaluate(s=>localStorage.setItem('rail-english-v1',JSON.stringify(s)),empty);await page.reload();
  await page.locator('[data-route="vocab-review"]').first().click();await page.locator('[data-action="vocab-start"]').click();
  assert.ok((await page.locator('body').innerText()).includes('今日の課題はありません'));assert.ok(!(await page.locator('body').innerText()).includes('今日の学習、完了'));
  assert.deepEqual(errors,[]);
  const result={passed:4,checks:['Real 1.1.0 to 1.2.0 service-worker upgrade preserves pending legacy session and history','Only app-scoped old cache deleted; all new vocabulary files cached','Offline launch after upgrade loads all vocabulary assets','Empty catalog plan never displays daily completion'],workerHits,cacheInfo,errors};
  fs.writeFileSync(path.join(results,'upgrade-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});




