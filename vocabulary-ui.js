(function(root){
'use strict';
root.createVocabularyUI=function(h){
 const V=root.RailVocab,items=root.RAIL_VOCABULARY,byId=new Map(items.map(x=>[x.id,x])),e=h.esc;
 const state=()=>h.state().vocabulary;
 const safeDay=()=>V.dayKey();
 const date=d=>d?d.slice(5).replace('-','/'):'—';
 function home(){
  const s=state(),day=safeDay(),p=s.days[day],planned=p||V.selection(s,items,day),done=V.confirmed(p),complete=V.completed(p),newCount=planned.newIds.length;
  const reviews=Object.values(s.progress).filter(x=>x.needsReview).length;
  return `${h.intro('WORDS FOR YOUR NEXT STEP.','単語と熟語を、毎日の力に。','意味を選んで、例文で確認。少しずつ、使える英語へ。')}
  <div class="layout"><div class="stack"><section class="card hero vocabulary-hero"><div class="hero-label">TODAY · ${day} · 日本時間</div>
  <div class="hero-heading"><div><h2>${complete?'今日の学習は完了！':p?'続きから、ひとつずつ。':'今日の単語・熟語'}</h2><p>新規 ${newCount} 項目 ＋ 復習 ${planned.ids.length-newCount} 項目</p></div><div class="round-count"><span>${done}<small>/${planned.ids.length}</small></span></div></div>
  <button class="btn full" data-action="vocab-start" ${planned.ids.length?'':'disabled'}>${complete?'今日の結果を見る':p?'続きを再開する':'今日の学習を始める'} ${h.icon('arrow',18)}</button>
  <div class="hero-foot"><span>自信の確認までで1項目</span><span>途中で閉じても続きから</span></div>
  ${planned.ids.length?'':'<p class="section-space">新規項目も期限到来の復習もありません。次の復習日まで自由に見直せます。</p>'}</section>
  <section class="card"><div class="section-row"><h2>覚えることと、続けること</h2><span class="tag">別々に記録</span></div>
  <p class="small muted">間違いや「迷った」も今日の実施に数えます。自信を持って正解した項目は、期限が来るたびに間隔を広げて確認します。</p>
  <div class="stat-grid section-space"><div><div class="stat-value">${Object.keys(s.progress).length}</div><div class="stat-label">学習した項目 / ${items.length}</div></div><div><div class="stat-value">${Object.values(s.progress).filter(p=>p.stage===5&&!p.needsReview).length}</div><div class="stat-label">30日間隔に到達</div></div><div><div class="stat-value">${Object.values(s.days).filter(V.completed).length}</div><div class="stat-label">完了した日数</div></div></div></section></div>
  <div class="stack"><section class="card"><div class="section-row"><h2>間違い・迷いの復習</h2><span class="count-bubble">${reviews}</span></div><p class="small muted">必要な復習は今日の課題に追加。期限前に見直すこともできます。</p><button class="btn secondary full section-space" data-action="nav" data-route="vocab-review">単語・熟語の復習を見る</button></section>
  <section class="card"><h2>TOEIC問題も、いつでも。</h2><p class="small muted section-space">これまでの300問と追加問題、学習記録、中断した続きはこちら。</p><button class="btn secondary full section-space" data-action="nav" data-route="toeic">${h.state().session?'TOEIC問題の続きを開く':'TOEIC問題モードを開く'}</button></section>
  <section class="card"><h3>自分のペースで</h3><p class="small muted section-space">新規は1日 ${s.settings.dailyNew} 項目。設定で変更できます。開始済みの今日の項目は変わりません。</p><p class="subtle-note section-space">通知は未接続です。保存した希望時刻だけでは通知されません。</p><button class="text-btn" data-action="nav" data-route="settings">学習量・通知の設定</button></section></div></div>`;
 }
 function quiz(mode='daily'){
  const s=state(),day=safeDay(),p=V.active(s,mode);
  if(!p)return `<section class="card empty"><h1>日本時間の新しい日です</h1><p>前日までの確定済みの記録は保存されています。今日の項目を始めましょう。</p><button class="btn" data-action="vocab-start">今日の学習を始める</button></section>`;
  if(!p.ids.length)return `<section class="card empty"><h1>今日の課題はありません</h1><p>すべての新規項目を学習しました。次の復習日にまた取り組みましょう。</p><button class="btn" data-action="nav" data-route="vocab-review">復習予定を見る</button><button class="text-btn full" data-action="nav" data-route="home">ホームへ</button></section>`;
  const id=V.pendingId(p);
  if(!id){
   const correct=p.ids.filter(id=>p.answers[id]?.choice===byId.get(id).answer).length,clear=p.ids.filter(id=>p.answers[id]?.confidence==='clear').length;
   return `<div class="quiz-wrap"><section class="card empty"><div class="eyebrow">${mode==='daily'?'DAILY COMPLETE':'REVIEW COMPLETE'}</div><h1>${mode==='daily'?'今日の学習、完了です。':'見直しができました。'}</h1><p>${p.ids.length}項目の回答と自信の確認が終わりました。</p><div class="result-score">${correct}<small> / ${p.ids.length}</small></div><p>意味の正解数</p><div class="result-items"><div class="result-line"><span>自信を持って正解</span><strong>${clear}項目</strong></div><div class="result-line"><span>間違い・迷い</span><strong>${p.ids.length-clear}項目</strong></div></div><p class="small muted">実施済みと習得状況は別に記録しています。間違いや迷いは翌日以降の復習へ。</p><p class="subtle-note section-space">${h.storageError()?'端末へ保存できていません。閉じる前に設定からバックアップしてください。':'この端末に保存しました。通知サービスは未接続です。'}</p><div class="button-stack section-space"><button class="btn" data-action="nav" data-route="home">ホームへ</button><button class="btn secondary" data-action="nav" data-route="vocab-review">復習予定を見る</button></div></section></div>`;
  }
  const item=byId.get(id),a=p.answers[id],count=V.confirmed(p),correct=a?.choice===item.answer;
  const token=`data-day="${day}" data-item="${id}" data-mode="${mode}" data-plan="${mode==='daily'?p.startedAt:p.id}"`;
  return `<div class="quiz-wrap"><div class="quiz-top"><button class="text-btn" data-action="nav" data-route="home">← 中断してホームへ</button><span>${count+1} / ${p.ids.length} 項目</span></div><div class="progress-track" role="progressbar" aria-label="確定した項目" aria-valuemin="0" aria-valuemax="${p.ids.length}" aria-valuenow="${count}"><div class="progress-fill" style="width:${count/p.ids.length*100}%"></div></div>
  <div class="quiz-meta"><div class="badges"><span class="badge">${item.kind==='word'?'単語':'熟語・表現'}</span><span class="badge gray">${item.pos}</span><span class="badge gray">${mode==='practice'?'自由な見直し':p.newIds.includes(id)?'新規':'期限の来た復習'}</span></div><span class="small muted">日本時間 ${date(day)}</span></div>
  <section class="card question-card"><p class="question-number">この意味は？</p><h1 class="vocab-term" lang="en">${e(item.term)}</h1>
  <div class="choices" role="group" aria-label="意味を選ぶ">${item.options.map((opt,i)=>`<button class="choice ${a?(i===item.answer?'correct':a.choice===i?'wrong':'unselected'):''}" data-action="vocab-answer" ${token} data-choice="${i}" ${a?'disabled':''}><span class="choice-letter">${'ABCD'[i]}</span><span class="choice-word">${e(opt)}</span>${a&&i===item.answer?'<span aria-label="正解">✓</span>':''}</button>`).join('')}</div></section>
  ${a?`<section class="card feedback" id="vocab-feedback" tabindex="-1" aria-label="意味と例文"><div class="feedback-status ${correct?'':'incorrect'}">${correct?'✓ 正解です':'↺ 正解を確認しよう'}</div><h2>${e(item.meaning)}</h2><p class="complete-sentence section-space" lang="en">${e(item.example)}</p><p class="translation">${e(item.translation)}</p><div class="explain"><h3>一緒に覚える表現</h3>${item.collocations.map(c=>`<p lang="en">${e(c)}</p>`).join('')}</div>
  <div class="confidence"><p>${correct?'自信を持って答えられましたか？':'意味と例文を確認したら、下のボタンで確定します。'}</p>${correct?`<div class="row-two"><button class="btn secondary" data-action="vocab-confirm" ${token} data-confidence="unsure">迷った</button><button class="btn" data-action="vocab-confirm" ${token} data-confidence="clear">わかった →</button></div>`:`<button class="btn full" data-action="vocab-confirm" ${token} data-confidence="unsure">確認した・復習に残す →</button>`}</div></section>`:'<p class="quiz-hint">意味を1つ選び、例文で確認しましょう。</p>'}</div>`;
 }
 function review(){
  const s=state(),learned=items.filter(i=>s.progress[i.id]).sort((a,b)=>s.progress[a.id].due.localeCompare(s.progress[b.id].due)),due=learned.filter(i=>s.progress[i.id].due<=safeDay()).length;
  return `${h.intro('MAKE WORDS STICK.','単語・熟語の復習','間違いと迷いを、少しずつ確かな理解へ。')}<div class="layout"><section class="card"><h2>今日が期限の復習：${due}項目</h2><p class="small muted section-space">今日の固定課題に含めて学びます。開始後に増えた復習は、ここで見直すか次の日に取り組めます。</p><button class="btn full section-space" data-action="vocab-start">今日の学習へ</button><div class="divider"></div><h3>1 → 3 → 7 → 14 → 30日</h3><p class="small muted section-space">期限が来た日に自信を持って正解したとき、1日に一度だけ段階が進みます。期限前の見直しでは、正解しても元の復習日を延ばしません。</p><p class="small muted section-space">間違い・迷いは翌日までにもう一度。日付は日本時間で切り替わります。</p><button class="text-btn section-space" data-action="nav" data-route="review">TOEIC問題の復習へ</button></section><section class="card"><h2>学習した項目と次の復習</h2>${learned.length?learned.map(i=>{const p=s.progress[i.id];return `<div class="list-item"><div class="list-item-main"><div class="tags">${i.kind==='word'?'単語':'熟語'} · ${date(p.due)} · ${p.needsReview?'間違い・迷い':p.stage===5?'30日間隔':'間隔を広げて確認中'}</div><h3 lang="en">${e(i.term)}</h3><p>${e(i.meaning)}</p></div><button class="text-btn" data-action="vocab-practice" data-item="${i.id}" aria-label="${e(i.term)}を見直す">見直す</button></div>`;}).join(''):'<p class="small muted section-space">学習すると、ここに復習予定が表示されます。</p>'}</section></div>`;
 }
 function settings(){
  const s=state();
  return `<div class="layout section-space vocab-settings"><section class="card"><h2>単語・熟語の学習量</h2><div class="field"><label for="vocab-new">1日の新規項目数（単語＋熟語）</label><select id="vocab-new" data-vocab-setting="dailyNew">${[3,5,10,15].map(n=>`<option value="${n}" ${s.settings.dailyNew===n?'selected':''}>${n}項目${n===5?'（初期値）':''}</option>`).join('')}</select></div><p class="subtle-note section-space">期限の来た復習はこの数に追加します。変更は次に作る日次課題から適用され、開始済みの項目は変わりません。</p><p class="small muted section-space">収録：単語80・熟語40。TOEIC問題の正答は、単語の習得に置き換えません。</p></section>
  <section class="card"><div class="section-row"><h2>学習リマインダー</h2><span class="tag">未接続・通知されません</span></div><p class="small">日本時間 20:00 / 未完了なら 21:00・22:00</p><p class="small muted section-space">今日の固定課題をすべて確定すると、その日の以降の配信を停止する設計です。</p><label class="setting-row" for="vocab-reminder"><div><h3>接続後にこの時刻で通知を希望する</h3><p>希望だけを端末に保存します。通知はまだ有効になりません。</p></div><input id="vocab-reminder" class="switch" type="checkbox" data-vocab-setting="reminders" ${s.reminders.wanted?'checked':''}></label>
  <details><summary>利用開始に必要な準備</summary><p>通知を配信する小規模なサーバーとの接続が必要です。iPhoneではホーム画面に追加したアプリを開き、利用者の操作で通知を許可します。今回は接続・購読・許可の要求は行いません。</p><p>オフラインの完了は端末に保存されます。将来の配信停止にはサーバーへの同期が必要で、未同期の完了をサーバーが知ることはできません。</p></details></section></div>`;
 }
 function stats(){
  const s=state(),done=Object.values(s.days).filter(V.completed).length;
  return `<section class="card section-space"><h2>単語・熟語の記録</h2><div class="stat-grid section-space"><div><div class="stat-value">${Object.keys(s.progress).length}</div><div class="stat-label">学習した項目</div></div><div><div class="stat-value">${done}</div><div class="stat-label">日次完了</div></div><div><div class="stat-value">${s.attempts.length}</div><div class="stat-label">確定した回答</div></div></div><p class="subtle-note section-space">下の正答率・コース記録は、従来のTOEIC問題モードの記録です。</p></section>`;
 }
 function action(act,d){
  if(act==='vocab-start'){h.change(()=>V.start(state(),items));h.go('vocab');return;}
  if(act==='vocab-practice'){h.change(()=>V.practice(state(),items,d.item));h.go('vocab-practice');return;}
  if(d.day!==safeDay()){h.toast('日本時間の日付が変わりました。今日の項目から再開します。');h.go('vocab');return;}
  let changed=false;
  h.change(()=>{
   const p=V.active(state(),d.mode);
   if(!p||String(d.mode==='daily'?p.startedAt:p.id)!==d.plan)return;
   if(act==='vocab-answer')changed=V.answer(state(),d.mode,d.day,d.item,Number(d.choice));
   if(act==='vocab-confirm')changed=V.confirm(state(),items,d.mode,d.day,d.item,d.confidence);
  });
  h.render(act==='vocab-confirm');
  if(changed&&act==='vocab-answer')requestAnimationFrame(()=>{const el=document.getElementById('vocab-feedback');el?.focus({preventScroll:true});el?.scrollIntoView({behavior:'instant',block:'start'});});
 }
 function setting(el){h.change(()=>{if(el.dataset.vocabSetting==='dailyNew'&&[3,5,10,15].includes(Number(el.value)))state().settings.dailyNew=Number(el.value);else if(el.dataset.vocabSetting==='reminders')state().reminders.wanted=el.checked;state().sync.revision++;});h.render(false);}
 return {home,quiz,review,settings,stats,action,setting};
};
})(globalThis);

