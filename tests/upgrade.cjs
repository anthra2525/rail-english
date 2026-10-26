'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {app,results,chromium,launchOptions}=require('./browser-env.cjs');
const base=process.env.RAIL_TEST_BASE;
if(!base)throw Error('Set RAIL_TEST_BASE to a clean v1.2.1 checkout or archive.');
const items=require('../vocabulary-data.js'),key='rail-english-v1',now=Date.parse('2026-10-26T11:00:00Z');
let source=base,broken=false,workerHits=0;
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://localhost').pathname.replace('/rail-english/','/'),target=path.resolve(source,'.'+(name==='/'?'/index.html':name));
 if(!target.startsWith(path.resolve(source)+path.sep)){res.writeHead(403).end();return;}
 if(name==='/sw.js')workerHits++;
 if(broken&&name==='/vocabulary-ui.js'){res.writeHead(503).end();return;}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':name.endsWith('.js')?'application/javascript':name.endsWith('.png')?'image/png':name.endsWith('webmanifest')?'application/manifest+json':'text/html; charset=utf-8','Cache-Control':'no-cache'});res.end(data);});
});
(async()=>{
 await new Promise(resolve=>server.listen(4174,'127.0.0.1',resolve));let browser;
 try{
  browser=await chromium.launch(launchOptions);const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[],checks=[];
  page.on('pageerror',e=>errors.push(e.message));await page.clock.install({time:now});await page.goto('http://127.0.0.1:4174/rail-english/');
  await page.waitForFunction(()=>document.getElementById('offline-status').textContent.includes('準備完了'));
  const read=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  const answer=async(wrong=false)=>{const id=await page.locator('[data-action="vocab-answer"]').first().getAttribute('data-item'),item=items.find(i=>i.id===id);await page.locator('[data-action="vocab-answer"][data-choice="'+((item.answer+(wrong?1:0))%4)+'"]').click();};
  const version=()=>page.evaluate(async()=>{const r=await navigator.serviceWorker.ready;return await new Promise(resolve=>{const c=new MessageChannel();c.port1.onmessage=e=>resolve(e.data.version);r.active.postMessage({type:'CHECK_CACHE'},[c.port2]);});});
  assert.equal(await version(),'1.2.1');await page.locator('[data-action="vocab-start"]').click();await answer(true);await page.locator('[data-action="vocab-confirm"]').click();await answer();
  // Include an older saved one-item practice and unrelated legacy records.
  await page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k)),q=JSON.parse(document.getElementById('question-data').textContent).questions[0];
   s.futureRoot={preserved:true};s.settings.futureSetting=9;s.attempts=[{id:'old-toeic',qid:q.id,at:Date.now(),choice:q.answer,correct:true,type:'new',seconds:2,confidence:'clear',futureAttempt:3}];
   s.progress[q.id]={seen:1,correct:1,streak:1,due:Date.now()+86400000,needsReview:false,lastAt:Date.now(),futureProgress:4};
   RailVocab.practice(s.vocabulary,RAIL_VOCABULARY,s.vocabulary.days[RailVocab.dayKey()].ids[0]);localStorage.setItem(k,JSON.stringify(s));
  },key);await page.reload();
  const old=await read();await page.evaluate(async()=>{const c=await caches.open('unrelated-app-cache');await c.put('/unrelated',new Response('keep'));});
  source=app;broken=true;
  await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration('./');await r.update();window.upgradeWorker=r.installing||r.waiting;});
  await page.waitForFunction(()=>window.upgradeWorker?.state==='redundant');assert.equal(await version(),'1.2.1');assert.deepEqual(await read(),old);
  await context.setOffline(true);await page.reload();await page.waitForSelector('.vocabulary-hero');assert.equal(await version(),'1.2.1');assert.deepEqual(await read(),old);await context.setOffline(false);
  checks.push('Failed update with one missing asset leaves v1.2.1 usable offline and saved history intact');
  broken=false;await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration('./');await r.update();window.upgradeWorker=r.installing||r.waiting;});
  await page.waitForFunction(()=>window.upgradeWorker?.state==='installed');assert.equal(await version(),'1.2.1');
  await page.locator('[data-route="settings"]').last().click();await page.locator('[data-action="update"]').click();assert.equal(await version(),'1.2.1');assert.deepEqual(await read(),old);
  checks.push('Successful new worker waits; update button blocks while daily confidence is pending');
  await page.locator('[data-route="home"]').last().click();await page.locator('[data-action="vocab-start"]').click();await page.locator('[data-action="vocab-confirm"]').last().click();const before=await read();
  await page.locator('[data-route="settings"]').last().click();page.once('dialog',d=>d.accept());await page.locator('[data-action="update"]').click();
  await page.waitForSelector('.practice-card');assert.equal(await version(),'1.3.0');assert.deepEqual(await read(),before);
  await page.locator('[data-route="settings"]').last().click();assert.ok((await page.locator('body').innerText()).includes('1.3.0'));await page.locator('[data-route="home"]').last().click();
  checks.push('Real v1.2.1 to v1.3.0 update preserves complete state byte-for-byte on loading and displays version 1.3.0');
  const cacheInfo=await page.evaluate(async()=>{const names=await caches.keys(),name=names.find(n=>n.endsWith('::1.3.0')),cache=await caches.open(name);return {names,urls:(await cache.keys()).map(r=>r.url)};});
  assert.ok(cacheInfo.names.includes('unrelated-app-cache'));assert.equal(cacheInfo.names.some(n=>n.endsWith('::1.2.1')),false);assert.equal(cacheInfo.urls.length,8);
  for(const name of ['index.html','vocabulary-core.js','vocabulary-ui.js','vocabulary-data.js','manifest.webmanifest'])assert.ok(cacheInfo.urls.some(u=>u.endsWith(name)));
  checks.push('Only previous app cache removed; unrelated cache preserved and all eight release assets cached');
  await context.setOffline(true);await page.reload();await page.locator('[data-action="vocab-free"]').click();assert.equal((await read()).vocabulary.practice.id,before.vocabulary.practice.id);
  await answer();await page.locator('[data-action="vocab-confirm"]').last().click();await page.locator('#vocab-practice-size').selectOption('50');await page.locator('[data-action="vocab-free"]').click();await answer();
  const pending=await read();assert.equal(pending.vocabulary.practice.ids.length,50);await page.reload();await page.locator('[data-action="vocab-free"]').click();assert.equal(await page.locator('[data-action="vocab-answer"]:disabled').count(),4);
  assert.deepEqual((await read()).attempts,before.attempts);assert.deepEqual((await read()).progress,before.progress);assert.equal((await read()).futureRoot.preserved,true);
  checks.push('Offline after update resumes old practice and starts a new 50-item set; pending answer and legacy history persist');
  assert.deepEqual(errors,[]);const result={passed:checks.length,checks,errors,workerHits,cacheInfo,browser:await browser.version()};fs.writeFileSync(path.join(results,'upgrade-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});