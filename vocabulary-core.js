/* Pure vocabulary state machine. No network or notification permission requests. */
(function(root){
'use strict';
const DAY=86400000, INTERVALS=[1,3,7,14,30], PRACTICE_SIZES=[10,20,30,50], PRACTICE_KINDS=['all','word','idiom','review'];
const dayKey=(now=Date.now())=>new Date(now+9*3600000).toISOString().slice(0,10);
const plusDays=(day,n)=>new Date(Date.parse(day+'T00:00:00Z')+n*DAY).toISOString().slice(0,10);
const isDay=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'))&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
const fresh=()=>({schemaVersion:1,settings:{dailyNew:5},progress:{},days:{},attempts:[],practice:null,reminders:{wanted:false,hours:[20,21,22],timezone:'Asia/Tokyo'},sync:{revision:0}});
function clean(raw,items){
 if(raw===undefined)return fresh();
 const s=JSON.parse(JSON.stringify(raw)), ids=new Set(items.map(x=>x.id));
 const record=x=>x&&typeof x==='object'&&!Array.isArray(x);
 const fail=()=>{throw Error('単語・熟語の記録形式を確認できません。元データを保護するため読み込みを止めました。');};
 if(!record(s)||s.schemaVersion!==1||!record(s.progress)||!record(s.days)||!Array.isArray(s.attempts))fail();
 s.settings={...(s.settings||{}),dailyNew:[3,5,10,15].includes(s.settings?.dailyNew)?s.settings.dailyNew:5};
 s.reminders={...(s.reminders||{}),wanted:s.reminders?.wanted===true,hours:[20,21,22],timezone:'Asia/Tokyo'};
 s.sync={...(s.sync||{}),revision:Number.isInteger(s.sync?.revision)&&s.sync.revision>=0?s.sync.revision:0};
 for(const [id,p] of Object.entries(s.progress)){
  if(!ids.has(id)||!record(p)||!Number.isInteger(p.stage)||p.stage<0||p.stage>5||!isDay(p.due)||!Number.isInteger(p.seen)||p.seen<1||!Number.isInteger(p.correct)||p.correct<0||p.correct>p.seen||typeof p.needsReview!=='boolean'||(p.lastAdvancedDay!==null&&!isDay(p.lastAdvancedDay))||!isDay(p.lastStudiedDay))fail();
 }
 const validAnswer=(a)=>record(a)&&Number.isInteger(a.choice)&&a.choice>=0&&a.choice<4&&Number.isFinite(a.at)&&a.at>0&&['pending','clear','unsure'].includes(a.confidence)&&(a.confidence==='pending'?a.confirmedAt===null:Number.isFinite(a.confirmedAt)&&a.confirmedAt>=a.at);
 const validPlan=p=>record(p)&&Array.isArray(p.ids)&&p.ids.length<=items.length&&new Set(p.ids).size===p.ids.length&&p.ids.every(id=>ids.has(id))&&record(p.answers)&&Object.entries(p.answers).every(([id,a])=>p.ids.includes(id)&&validAnswer(a));
 for(const [day,p] of Object.entries(s.days)){
  if(!isDay(day)||!validPlan(p)||!Array.isArray(p.newIds)||!p.newIds.every(id=>p.ids.includes(id))||new Set(p.newIds).size!==p.newIds.length||!Number.isFinite(p.startedAt)||dayKey(p.startedAt)!==day)fail();
  // Completion is derived, never trusted from an imported flag.
  for(const a of Object.values(p.answers))if(dayKey(a.at)!==day||(a.confirmedAt!==null&&dayKey(a.confirmedAt)!==day))fail();
  p.completedAt=completed(p)?Math.max(...Object.values(p.answers).map(a=>a.confirmedAt)):null;
 }
 if(s.practice!==null&&s.practice!==undefined&&(!validPlan(s.practice)||!isDay(s.practice.day)||typeof s.practice.id!=='string'))fail();
 s.practice=s.practice||null;
 const attemptIds=new Set();
 for(const a of s.attempts){if(!record(a)||!ids.has(a.itemId)||typeof a.id!=='string'||attemptIds.has(a.id)||!validAnswer(a)||a.confidence==='pending'||!['daily','practice'].includes(a.mode)||!isDay(a.day)||dayKey(a.confirmedAt)!==a.day)fail();attemptIds.add(a.id);}
 return s;
}
const confirmed=p=>p?p.ids.filter(id=>p.answers[id]&&p.answers[id].confidence!=='pending').length:0;
const completed=p=>!!p&&p.ids.length>0&&confirmed(p)===p.ids.length;
function selection(s,items,day){
 const due=items.filter(x=>s.progress[x.id]?.due<=day).sort((a,b)=>s.progress[a.id].due.localeCompare(s.progress[b.id].due));
 const words=items.filter(x=>!s.progress[x.id]&&x.kind==='word'), phrases=items.filter(x=>!s.progress[x.id]&&x.kind==='idiom');
 const unseen=[]; // Three words / two phrases per default day while both pools remain.
 for(let i=0;unseen.length<s.settings.dailyNew&&(words.length||phrases.length);i++){
  const pool=i%5===2||i%5===4?phrases:words;
  unseen.push((pool.length?pool:words.length?words:phrases).shift());
 }
 return {ids:[...due,...unseen].map(x=>x.id),newIds:unseen.map(x=>x.id)};
}
function start(s,items,now=Date.now()){
 const day=dayKey(now);
 if(!s.days[day]){s.days[day]={...selection(s,items,day),answers:{},startedAt:now,completedAt:null};s.sync.revision++;}
 return s.days[day];
}
function active(s,mode,now=Date.now()){
 return (mode==='practice'?s.practice:s.days[dayKey(now)])||null;
}
function pendingId(p){return p?.ids.find(id=>!p.answers[id]||p.answers[id].confidence==='pending')||null;}
function answer(s,mode,day,id,choice,now=Date.now()){
 if(day!==dayKey(now)||!Number.isInteger(choice)||choice<0||choice>3)return false;
 const p=active(s,mode,now);
 if(!p||pendingId(p)!==id||p.answers[id])return false;
 p.answers[id]={choice,at:now,confidence:'pending',confirmedAt:null};s.sync.revision++;return true;
}
function schedule(old,correct,confidence,now){
 const day=dayKey(now), p=old?{...old}:{stage:0,due:day,seen:0,correct:0,lastAdvancedDay:null,needsReview:true};
 const due=p.due<=day,canAdvance=due&&p.lastAdvancedDay!==day;
 p.seen++;p.correct+=correct?1:0;p.lastStudiedDay=day;
 if(correct&&confidence==='clear'){
  if(canAdvance){p.stage=Math.min(5,p.stage+1);p.due=plusDays(day,INTERVALS[p.stage-1]);p.lastAdvancedDay=day;p.needsReview=false;}
 }else{
  p.stage=0;p.needsReview=true;
  // Failure can bring review forward; early practice never pushes an existing deadline back.
  const tomorrow=plusDays(day,1);p.due=due?tomorrow:p.due<tomorrow?p.due:tomorrow;
 }
 return p;
}
function confirm(s,items,mode,day,id,confidence,now=Date.now()){
 if(day!==dayKey(now)||!['clear','unsure'].includes(confidence))return false;
 const p=active(s,mode,now),a=p?.answers[id],item=items.find(x=>x.id===id);
 // A device clock adjustment must not create an unreadable saved attempt.
 if(!item||!a||pendingId(p)!==id||a.confidence!=='pending'||now<a.at)return false;
 const correct=a.choice===item.answer;
 a.confidence=correct?confidence:'unsure';a.confirmedAt=now;
 s.progress[id]=schedule(s.progress[id],correct,a.confidence,now);
 s.attempts.push({...a,id:mode==='daily'?day+'/'+id:s.practice.id+'/'+id,itemId:id,day,mode,correct});
 if(mode==='daily'&&completed(p))p.completedAt=now;
 s.sync.revision++;return true;
}
// A single resumable set, including across midnight. Confirmed results live in the
// append-only attempts log; starting another set never replaces those results.
const practiceSettings=s=>({size:PRACTICE_SIZES.includes(s.settings.practiceSize)?s.settings.practiceSize:20,kind:PRACTICE_KINDS.includes(s.settings.practiceKind)?s.settings.practiceKind:'all'});
const practicePool=(s,items,kind)=>items.filter(x=>kind==='review'?s.progress[x.id]?.needsReview:kind==='all'||x.kind===kind);
const unfinishedPractice=s=>s.practice&&pendingId(s.practice)?s.practice:null;
function practiceSelection(s,items,size,kind,now=Date.now()){
 if(!PRACTICE_SIZES.includes(size)||!PRACTICE_KINDS.includes(kind))return [];
 const day=dayKey(now),counts=new Map();
 for(const a of s.attempts)if(a.day===day)counts.set(a.itemId,(counts.get(a.itemId)||0)+1);
 // Reserve today's fixed goal too, so free practice complements the daily plan.
 const reserved=[...(s.days[day]?.ids||[]),...(s.practice?.day===day?s.practice.ids:[])];
 for(const id of reserved)counts.set(id,Math.max(1,counts.get(id)||0));
 const pool=practicePool(s,items,kind),result=[];
 const priority=i=>s.progress[i.id]?.due<=day?0:!s.progress[i.id]?1:2;
 // Least practiced today first. Within each tier, due items and new vocabulary
 // come first. Mix words/idioms without repeating IDs in a set.
 for(const count of [...new Set(pool.map(i=>counts.get(i.id)||0))].sort((a,b)=>a-b)){
  const tier=pool.filter(i=>(counts.get(i.id)||0)===count).map(i=>({item:i,tie:Math.random()}));
  tier.sort((a,b)=>priority(a.item)-priority(b.item)||(s.progress[a.item.id]?.due||'').localeCompare(s.progress[b.item.id]?.due||'')||a.tie-b.tie);
  const words=tier.filter(x=>x.item.kind==='word'),phrases=tier.filter(x=>x.item.kind==='idiom');
  while(result.length<size&&(words.length||phrases.length)){
   const pool=result.length%5===2||result.length%5===4?phrases:words;
   result.push((pool.length?pool:words.length?words:phrases).shift().item.id);
  }
  if(result.length===size)break;
 }
 return result;
}
function makePractice(s,ids,now,details={}){
 if(!ids.length)return false;
 // Revision survives reloads; guard imported logs as well as same-millisecond taps.
 let id='practice-'+now+'-'+(s.sync.revision+1);
 while(s.practice?.id===id||s.attempts.some(a=>a.id.startsWith(id+'/')))id+='-next';
 s.practice={id,day:dayKey(now),ids,answers:{},...details};s.sync.revision++;
 return true;
}
function startPractice(s,items,size=practiceSettings(s).size,kind=practiceSettings(s).kind,now=Date.now()){
 if(unfinishedPractice(s))return true;
 return makePractice(s,practiceSelection(s,items,size,kind,now),now,{size,kind});
}
function practice(s,items,id,now=Date.now()){
 if(unfinishedPractice(s))return true;
 if(!items.some(x=>x.id===id)||!s.progress[id])return false;
 return makePractice(s,[id],now,{kind:'review'});
}
function notificationSnapshot(s,now=Date.now()){
 const day=dayKey(now),p=s.days[day];
 return {version:1,day,timezone:'Asia/Tokyo',hours:[20,21,22],wanted:s.reminders.wanted,revision:s.sync.revision,
  started:!!p,total:p?.ids.length||0,confirmed:confirmed(p),complete:completed(p),completedAt:completed(p)?p.completedAt:null};
}
const api={dayKey,plusDays,fresh,clean,selection,start,active,pendingId,answer,confirm,schedule,practice,PRACTICE_SIZES,PRACTICE_KINDS,practiceSettings,practicePool,unfinishedPractice,practiceSelection,startPractice,confirmed,completed,notificationSnapshot};
if(typeof module!=='undefined')module.exports=api;
root.RailVocab=api;
})(typeof globalThis!=='undefined'?globalThis:this);

