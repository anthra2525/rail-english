'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..'),V=require('../vocabulary-core.js'),items=require('../vocabulary-data.js');
const at=(day,hour='11:00')=>Date.parse(day+'T'+hour+':00Z');
const now=at('2026-10-05'),day=V.dayKey(now),first=items[0];
function doItem(s,id,choice=items.find(x=>x.id===id).answer,confidence='clear',time=now,mode='daily'){
 assert.equal(V.answer(s,mode,V.dayKey(time),id,choice,time),true);
 assert.equal(V.confirm(s,items,mode,V.dayKey(time),id,confidence,time+10),true);
}
const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const data=JSON.parse(html.match(/<script[^>]*id="question-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
const main=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('const APP_VERSION'));
const sandbox={RailVocab:V,RAIL_VOCABULARY:items,document:{getElementById:()=>({textContent:JSON.stringify(data)})},Date,globalThis:{}};
vm.runInNewContext(main.slice(0,main.indexOf('try{const raw=localStorage'))+'globalThis.api={cleanState,defaultState};})();',sandbox);
const {cleanState,defaultState}=sandbox.globalThis.api;
const plain=x=>JSON.parse(JSON.stringify(x));
test('catalog: 480 distinct lexemes, 320 words and 160 idioms, coherent four-choice groups',()=>{
 assert.equal(items.length,480);assert.equal(items.filter(x=>x.kind==='word').length,320);assert.equal(items.filter(x=>x.kind==='idiom').length,160);
 assert.equal(new Set(items.map(x=>x.id)).size,480);assert.equal(new Set(items.map(x=>x.term.toLowerCase())).size,480);
 for(const i of items){assert.equal(i.options.length,4);assert.equal(new Set(i.options).size,4);assert.equal(i.options[i.answer],i.meaning);assert.ok(i.example.length>25);assert.ok(i.translation.length>10);assert.ok(i.collocations.length);assert.ok(!i.term.includes('_____'));}
});
test('JST day boundary is independent of host timezone',()=>{
 assert.equal(V.dayKey(at('2026-10-05','14:59')),'2026-10-05');assert.equal(V.dayKey(at('2026-10-05','15:00')),'2026-10-06');
 assert.equal(V.plusDays('2028-02-28',1),'2028-02-29');assert.equal(V.plusDays('2026-12-31',1),'2027-01-01');
});
test('opening and selecting do not create or complete a daily plan',()=>{
 const s=V.fresh();V.selection(s,items,day);assert.deepEqual(s.days,{});assert.equal(V.notificationSnapshot(s,now).complete,false);
});
test('default plan has 5 fresh, includes both kinds, stays fixed after settings change',()=>{
 const s=V.fresh(),p=V.start(s,items,now),ids=[...p.ids];assert.equal(ids.length,5);assert.equal(ids.filter(id=>items.find(x=>x.id===id).kind==='idiom').length,2);
 s.settings.dailyNew=15;assert.deepEqual(V.start(s,items,now+100).ids,ids);
});
test('all due reviews added in addition to new quota; no duplicate IDs',()=>{
 const s=V.fresh();for(const i of items.slice(0,8))s.progress[i.id]=V.schedule(null,true,'clear',now-86400000);
 const p=V.start(s,items,now);assert.equal(p.ids.length,13);assert.equal(p.newIds.length,5);assert.equal(new Set(p.ids).size,13);
});
test('settings apply to next plan; depleted catalog is handled',()=>{
 const s=V.fresh();s.settings.dailyNew=3;assert.equal(V.start(s,items,now).ids.length,3);
 const t=V.fresh();for(const i of items)t.progress[i.id]=V.schedule(null,true,'clear',now);
 assert.equal(V.start(t,items,now).ids.length,0);assert.equal(V.completed(t.days[day]),false);
});
test('answer is pending until confidence; duplicate choice and stale confidence cannot add credit',()=>{
 const s=V.fresh(),p=V.start(s,items,now),id=p.ids[0];
 assert.equal(V.confirm(s,items,'daily',day,id,'clear',now),false);
 assert.equal(V.answer(s,'daily',day,id,first.answer,now),true);
 assert.equal(V.answer(s,'daily',day,id,first.answer,now+1),false);
 assert.equal(V.confirmed(p),0);assert.equal(s.progress[id],undefined);
 assert.equal(V.confirm(s,items,'daily',day,id,'clear',now+2),true);
 assert.equal(V.confirm(s,items,'daily',day,id,'clear',now+3),false);
 assert.equal(s.attempts.length,1);assert.equal(V.confirmed(p),1);
});
test('wrong and unsure count as daily work but not mastery; completion needs every unique item',()=>{
 const s=V.fresh(),p=V.start(s,items,now);p.ids.forEach((id,i)=>{const item=items.find(x=>x.id===id);doItem(s,id,i===0?(item.answer+1)%4:item.answer,i===1?'unsure':'clear');if(i<p.ids.length-1)assert.equal(V.completed(p),false);});
 assert.equal(V.completed(p),true);assert.equal(V.notificationSnapshot(s,now).complete,true);
 assert.equal(s.progress[p.ids[0]].stage,0);assert.equal(s.progress[p.ids[1]].needsReview,true);
 assert.equal(s.progress[p.ids[0]].due,'2026-10-06');assert.equal(s.attempts.length,5);
 V.start(s,items,now+500);assert.equal(s.attempts.length,5);
});
test('only due confident answers advance 1,3,7,14,30 and at most once a day',()=>{
 let p=null,time=now;for(let n=0;n<5;n++){p=V.schedule(p,true,'clear',time);assert.equal(p.stage,n+1);assert.equal(p.due,V.plusDays(V.dayKey(time),[1,3,7,14,30][n]));const old=plain(p);p=V.schedule(p,true,'clear',time+1);assert.equal(p.stage,old.stage);assert.equal(p.due,old.due);time=at(p.due);}
});
test('early correct practice keeps original due and review flag; early failure never delays due',()=>{
 let p=V.schedule(null,true,'clear',now);p=V.schedule(p,true,'clear',at(p.due));const original=p.due;
 const early=V.schedule(p,true,'clear',at('2026-10-07'));assert.equal(early.due,original);assert.equal(early.stage,2);
 const failure=V.schedule(p,false,'unsure',at('2026-10-07'));assert.equal(failure.due,'2026-10-08');assert.equal(failure.stage,0);
 const same=V.schedule(failure,true,'clear',at('2026-10-07','12:00'));assert.equal(same.due,failure.due);assert.equal(same.needsReview,true);
});
test('after due success then failure, no second advancement on same learning day',()=>{
 let p=V.schedule(null,true,'clear',now);p=V.schedule(p,false,'unsure',now+1);p.due=day;
 p=V.schedule(p,true,'clear',now+2);assert.equal(p.stage,0);assert.equal(p.lastAdvancedDay,day);
});
test('midnight pending answer cannot complete yesterday or today',()=>{
 const before=at('2026-10-05','14:59'),after=at('2026-10-05','15:00'),s=V.fresh(),p=V.start(s,items,before),id=p.ids[0];
 V.answer(s,'daily',day,id,first.answer,before);assert.equal(V.confirm(s,items,'daily',day,id,'clear',after),false);
 assert.equal(V.confirmed(p),0);assert.equal(V.notificationSnapshot(s,after).complete,false);V.start(s,items,after);assert.equal(V.confirmed(s.days['2026-10-06']),0);
});
test('pending session survives JSON reload and backup, resumes exactly once',()=>{
 const s=V.fresh(),p=V.start(s,items,now),id=p.ids[0];V.answer(s,'daily',day,id,first.answer,now);
 const restored=V.clean(plain(s),items);assert.equal(V.pendingId(restored.days[day]),id);
 assert.equal(V.confirm(restored,items,'daily',day,id,'clear',now+100),true);
 assert.equal(V.confirm(restored,items,'daily',day,id,'clear',now+101),false);
});
test('practice is independent of daily completion and survives reload',()=>{
 const s=V.fresh();s.progress[first.id]=V.schedule(null,true,'clear',now);V.practice(s,items,first.id,now);
 doItem(s,first.id,first.answer,'clear',now,'practice');const r=V.clean(plain(s),items);
 assert.equal(r.progress[first.id].stage,1);assert.equal(r.progress[first.id].due,'2026-10-06');assert.equal(V.notificationSnapshot(r,now).complete,false);
});
test('legacy migration keeps attempts, progress, extras, settings, pending session and unknown fields',()=>{
 const s=plain(defaultState());delete s.vocabulary;
 const q={...data.questions[0],id:'custom-regression',customMeta:{keep:true}};s.extraQuestions=[q];s.extraRoot={nested:{keep:true}};s.settings.futureSetting={enabled:true};s.settings.level=800;
 s.attempts=[{id:'a-original',qid:q.id,at:now,choice:q.answer,correct:true,type:'new',seconds:3,confidence:'pending',futureAttempt:{keep:true}}];
 s.progress[q.id]={seen:1,correct:1,streak:0,due:now+86400000,needsReview:true,lastAt:now,futureProgress:42};
 s.session={id:'legacy-session',mode:'daily',qids:[q.id],index:0,attemptIds:['a-original'],started:now,futureSession:{keep:true}};
 s.lastResult={total:5,correct:3,fresh:5,unsure:2,futureResult:true};
 const migrated=plain(cleanState(s));const {vocabulary,...legacy}=migrated;
 assert.deepEqual(legacy,s);assert.deepEqual(vocabulary,V.fresh());
 assert.equal(Object.keys(vocabulary.progress).length,0);
});
test('new namespace and nested unknown fields round-trip through cleanState twice',()=>{
 const s=plain(defaultState()),p=V.start(s.vocabulary,items,now);V.answer(s.vocabulary,'daily',day,p.ids[0],first.answer,now);
 s.vocabulary.future={keep:true};s.vocabulary.days[day].futureDay=3;s.vocabulary.days[day].answers[p.ids[0]].futureAnswer='kept';s.vocabulary.settings.futureSetting=4;
 const r=plain(cleanState(plain(cleanState(s))));assert.deepEqual(r,s);
});
test('completedAt cannot mark unconfirmed or empty imported plan complete',()=>{
 const s=V.fresh(),p=V.start(s,items,now);p.completedAt=now;assert.equal(V.clean(s,items).days[day].completedAt,null);
 p.ids=[];p.newIds=[];assert.equal(V.clean(s,items).days[day].completedAt,null);
});
test('invalid vocabulary backup throws, allowing app to protect raw storage',()=>{
 const s=V.fresh(),p=V.start(s,items,now);p.ids.push(p.ids[0]);assert.throws(()=>V.clean(s,items));
 const t=V.fresh();t.schemaVersion=99;assert.throws(()=>V.clean(t,items));
});
test('notification snapshot remains disconnected data only, includes JST hours and completion',()=>{
 const s=V.fresh();s.reminders.wanted=true;const snapshot=V.notificationSnapshot(s,now);
 assert.deepEqual(snapshot.hours,[20,21,22]);assert.equal(snapshot.timezone,'Asia/Tokyo');assert.equal(snapshot.complete,false);assert.ok(!('enabled' in snapshot));
});
test('HTML, SW and unchanged origin identities align; all scripts parse; original question IDs unchanged',()=>{
 assert.ok(html.includes("APP_VERSION='1.2.1'"));assert.ok(html.includes("STORAGE_KEY='rail-english-v1'"));
 const sw=fs.readFileSync(path.join(app,'sw.js'),'utf8');assert.ok(sw.includes("VERSION='1.2.1'"));
 for(const name of ['vocabulary-core.js','vocabulary-data.js','vocabulary-ui.js']){assert.ok(sw.includes(name));assert.ok(html.includes(name));new vm.Script(fs.readFileSync(path.join(app,name),'utf8'));}
 new vm.Script(main);new vm.Script(sw);
 const manifest=JSON.parse(fs.readFileSync(path.join(app,'manifest.webmanifest'),'utf8'));assert.equal(manifest.id,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./');
 assert.equal(data.questions.length,300);assert.equal(new Set(data.questions.map(q=>q.id)).size,300);
 const basePath=path.resolve(app,'../baseline/rail-english-64ca2cc63203ae0d535e95873824189e6d84ec93');
 if(fs.existsSync(basePath)){const original=fs.readFileSync(path.join(basePath,'index.html'),'utf8');assert.equal(html.match(/<script[^>]*id="question-data"[^>]*>([\s\S]*?)<\/script>/)[1],original.match(/<script[^>]*id="question-data"[^>]*>([\s\S]*?)<\/script>/)[1]);const oldManifest=JSON.parse(fs.readFileSync(path.join(basePath,'manifest.webmanifest'),'utf8'));for(const key of ['id','scope','start_url','icons'])assert.deepEqual(manifest[key],oldManifest[key]);}
});



test('all original120 vocabulary objects and distractors survive expansion unchanged',()=>{
 const hash=require('node:crypto').createHash('sha256').update(JSON.stringify(items.slice(0,120))).digest('hex');assert.equal(hash,'6e36c6419465ef6359292db64b44c4f1353155e5fe49d8b96902477bb8e96717');
 assert.equal(items[120].id,'lex-121');assert.equal(items[479].id,'lex-480');
});
