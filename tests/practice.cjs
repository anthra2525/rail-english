'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const V=require('../vocabulary-core.js'),items=require('../vocabulary-data.js');
const now=Date.parse('2026-10-26T14:59:00Z'),day=V.dayKey(now),tomorrow=now+60000;
const copy=x=>JSON.parse(JSON.stringify(x));
function finish(s,time=now,wrong=false){
 const p=s.practice;
 for(const id of p.ids){
  const item=items.find(x=>x.id===id);
  if(!p.answers[id])assert.equal(V.answer(s,'practice',V.dayKey(time),id,(item.answer+(wrong?1:0))%4,time),true);
  if(p.answers[id].confidence==='pending')assert.equal(V.confirm(s,items,'practice',V.dayKey(time),id,wrong?'unsure':'clear',time+1),true);
 }
}
for(const size of [10,20,30,50])test(`free practice selects ${size} distinct items from all 480`,()=>{
 const s=V.fresh();assert.equal(V.startPractice(s,items,size,'all',now),true);
 assert.equal(s.practice.ids.length,size);assert.equal(new Set(s.practice.ids).size,size);
 assert.ok(s.practice.ids.some(id=>items.find(i=>i.id===id).kind==='word'));
 assert.ok(s.practice.ids.some(id=>items.find(i=>i.id===id).kind==='idiom'));
 finish(s);assert.equal(s.attempts.length,size);assert.deepEqual(s.days,{});
});
test('repeated sets reach all 480 items before repeated items crowd out unseen ones',()=>{
 const s=V.fresh(),seen=new Set();
 for(let n=0;n<10;n++){
  V.startPractice(s,items,50,'all',now);
  const ids=[...s.practice.ids];
  assert.equal(ids.filter(id=>!seen.has(id)).length,Math.min(50,480-seen.size));
  finish(s);ids.forEach(id=>seen.add(id));
 }
 assert.equal(seen.size,480);assert.equal(s.attempts.length,500);assert.equal(new Set(s.attempts.map(a=>a.id)).size,500);
 assert.deepEqual(V.clean(copy(s),items),s);
});
test('daily fixed goal, pending answer and completion are unchanged by additional sets',()=>{
 const s=V.fresh(),p=V.start(s,items,now),id=p.ids[0];
 V.answer(s,'daily',day,id,items[0].answer,now);
 const original=copy(p);
 V.startPractice(s,items,20,'all',now);assert.equal(s.practice.ids.some(id=>p.ids.includes(id)),false);finish(s);
 assert.deepEqual(s.days[day],original);assert.equal(V.notificationSnapshot(s,now).complete,false);
 for(const id of p.ids){const item=items.find(x=>x.id===id);if(!p.answers[id])V.answer(s,'daily',day,id,item.answer,now);V.confirm(s,items,'daily',day,id,'clear',now+2);}
 const completed=copy(s.days[day]);V.startPractice(s,items,20,'all',now);finish(s);
 assert.deepEqual(s.days[day],completed);assert.equal(s.attempts.length,45);assert.equal(V.notificationSnapshot(s,now).complete,true);
});
test('word, idiom and mistake-only filters restrict candidates',()=>{
 for(const kind of ['word','idiom']){const s=V.fresh();V.startPractice(s,items,50,kind,now);assert.ok(s.practice.ids.every(id=>items.find(x=>x.id===id).kind===kind));}
 const s=V.fresh();s.progress[items[3].id]=V.schedule(null,false,'unsure',now);s.progress[items[5].id]=V.schedule(null,true,'clear',now);
 V.startPractice(s,items,50,'review',now);assert.deepEqual(s.practice.ids,[items[3].id]);
});
test('small and empty pools do not duplicate items or replace prior results',()=>{
 const s=V.fresh();assert.equal(V.startPractice(s,[],50,'all',now),false);assert.equal(s.practice,null);
 assert.equal(V.startPractice(s,items.slice(0,2),50,'all',now),true);assert.equal(s.practice.ids.length,2);finish(s);
 const before=copy(s);assert.equal(V.startPractice(s,items,50,'review',now),false);assert.deepEqual(s,before);
});
test('starting again, changing options or single-item review resumes unfinished set',()=>{
 const s=V.fresh();V.startPractice(s,items,20,'all',now);const id=s.practice.ids[0];V.answer(s,'practice',day,id,0,now);
 const before=copy(s);V.startPractice(s,items,50,'idiom',now+2);V.practice(s,items,items[2].id,now+3);assert.deepEqual(s,before);
 const restored=V.clean(copy(s),items);assert.deepEqual(restored.practice,before.practice);finish(restored);assert.equal(restored.attempts.length,20);
});
test('practice crosses JST midnight and preserves pending answer; old-day event cannot confirm',()=>{
 const s=V.fresh();V.startPractice(s,items,10,'all',now);const id=s.practice.ids[0];V.answer(s,'practice',day,id,items.find(i=>i.id===id).answer,now);
 assert.equal(V.confirm(s,items,'practice',day,id,'clear',tomorrow),false);
 const restored=V.clean(copy(s),items);assert.equal(V.active(restored,'practice',tomorrow).id,s.practice.id);
 finish(restored,tomorrow);assert.equal(restored.attempts.length,10);assert.ok(restored.attempts.every(a=>a.day==='2026-10-27'));
 assert.deepEqual(restored.days,{});assert.deepEqual(V.clean(copy(restored),items),restored);
});
test('old one-item practice and unknown fields survive upgrade and midnight resume',()=>{
 const s=V.fresh(),item=items[0];s.progress[item.id]=V.schedule(null,true,'clear',now);s.practice={id:'old-practice',day,ids:[item.id],answers:{},future:{keep:true}};
 s.settings.futureOption=9;V.answer(s,'practice',day,item.id,item.answer,now);
 const restored=V.clean(copy(s),items);assert.deepEqual(restored,s);finish(restored,tomorrow);assert.equal(restored.attempts[0].id,'old-practice/'+item.id);assert.deepEqual(restored.practice.future,{keep:true});
});
test('same-millisecond sets, repeated confirmations and wrong-answer repeats append unique results',()=>{
 const s=V.fresh(),pool=[items[0]];
 V.startPractice(s,pool,10,'all',now);const first=s.practice.id;finish(s,now,true);const original=copy(s.attempts[0]);
 assert.equal(V.confirm(s,items,'practice',day,items[0].id,'clear',now+2),false);
 V.startPractice(s,pool,10,'all',now);assert.notEqual(s.practice.id,first);finish(s);
 assert.equal(s.attempts.length,2);assert.deepEqual(s.attempts[0],original);assert.equal(s.progress[items[0].id].seen,2);
 assert.equal(s.progress[items[0].id].correct,1);assert.equal(s.progress[items[0].id].stage,0);assert.equal(s.progress[items[0].id].needsReview,true);assert.equal(s.progress[items[0].id].due,'2026-10-27');
});
test('same-day correct repeats retain spaced-review date and never advance twice',()=>{
 const s=V.fresh(),pool=[items[0]];V.startPractice(s,pool,10,'all',now);finish(s);const p=copy(s.progress[items[0].id]);
 V.startPractice(s,pool,10,'all',now);finish(s);assert.equal(s.progress[items[0].id].stage,p.stage);assert.equal(s.progress[items[0].id].due,p.due);
});
test('new day resets selection preference; invalid settings use safe defaults',()=>{
 const s=V.fresh();V.startPractice(s,items,10,'word',now);finish(s);
 const previous=copy(s.practice);assert.deepEqual(new Set(V.practiceSelection(s,items.filter(i=>previous.ids.includes(i.id)),10,'all',tomorrow)),new Set(previous.ids));
 s.settings.practiceSize=999;s.settings.practiceKind='bad';assert.deepEqual(V.practiceSettings(s),{size:20,kind:'all'});
 const before=copy(s);assert.equal(V.startPractice(s,items,999,'all',now),false);assert.equal(V.startPractice(s,items,10,'bad',now),false);assert.deepEqual(s,before);
});
for(const mode of ['daily','practice'])test(`${mode}: clock rollback cannot persist an invalid confirmation; original pending answer resumes`,()=>{
 const s=V.fresh();if(mode==='daily')V.start(s,items,now);else V.startPractice(s,items,10,'all',now);
 const p=V.active(s,mode,now),id=p.ids[0],item=items.find(i=>i.id===id);
 V.answer(s,mode,day,id,item.answer,now);const before=copy(s);
 assert.equal(V.confirm(s,items,mode,day,id,'clear',now-1000),false);
 assert.deepEqual(s,before);assert.deepEqual(V.clean(copy(s),items),before);
 assert.equal(V.confirm(s,items,mode,day,id,'clear',now+1000),true);assert.equal(s.attempts.length,1);
 assert.deepEqual(V.clean(copy(s),items),s);
});
test('practice clock rollback across a date boundary leaves pending state and review history intact',()=>{
 const s=V.fresh();V.startPractice(s,items,10,'all',tomorrow);
 const id=s.practice.ids[0],item=items.find(i=>i.id===id);V.answer(s,'practice',V.dayKey(tomorrow),id,item.answer,tomorrow);
 const before=copy(s);assert.equal(V.confirm(s,items,'practice',day,id,'clear',now),false);assert.deepEqual(s,before);assert.deepEqual(V.clean(copy(s),items),s);
});