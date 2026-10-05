/* Original business-English learning material, authored for this app.
   Groups of four provide distinct Japanese distractors. IDs never derive from inflections. */
(function(root){
'use strict';
const rows=`lex-001|noun|invoice|請求書|Please send the invoice to our accounting department.|請求書を経理部に送ってください。|issue an invoice / pay an invoice
lex-002|noun|itinerary|旅程表|Your updated itinerary includes a stop in Osaka.|更新された旅程表には大阪への立ち寄りが含まれています。|a travel itinerary / revise an itinerary
lex-003|noun|warranty|保証|The printer comes with a two-year warranty.|そのプリンターには2年間の保証が付いています。|under warranty / extend a warranty
lex-004|noun|vacancy|空き職・欠員|We have a vacancy in the sales department.|営業部に欠員があります。|fill a vacancy / a job vacancy
lex-005|noun|deadline|締め切り|The deadline for applications is Friday.|応募の締め切りは金曜日です。|meet a deadline / extend a deadline
lex-006|noun|revenue|売上高・収益|Revenue increased after the new store opened.|新店舗の開店後、売上高が増えました。|annual revenue / generate revenue
lex-007|noun|inventory|在庫|The warehouse team checks inventory every Monday.|倉庫のチームは毎週月曜日に在庫を確認します。|manage inventory / excess inventory
lex-008|noun|venue|開催場所|The conference venue is close to the station.|会議の開催場所は駅の近くです。|a conference venue / book a venue
lex-009|noun|shipment|出荷品・発送|Your shipment is scheduled to arrive tomorrow.|お客様の荷物は明日到着する予定です。|track a shipment / a delayed shipment
lex-010|noun|agenda|議題・議事日程|Please review the agenda before the meeting.|会議の前に議事日程を確認してください。|on the agenda / set the agenda
lex-011|noun|refund|返金|You can request a refund within thirty days.|30日以内であれば返金を申請できます。|a full refund / receive a refund
lex-012|noun|candidate|候補者|Each candidate will have a thirty-minute interview.|各候補者は30分間の面接を受けます。|a qualified candidate / interview a candidate
lex-013|noun|estimate|見積もり|The contractor provided an estimate for the repairs.|請負業者は修理の見積もりを提示しました。|a cost estimate / provide an estimate
lex-014|noun|receipt|領収書|Keep your receipt until the expense report is approved.|経費報告書が承認されるまで領収書を保管してください。|an itemized receipt / keep a receipt
lex-015|noun|branch|支店|Our new branch will open in Kyoto next month.|当社の新しい支店は来月京都に開店します。|a local branch / open a branch
lex-016|noun|supplier|供給業者・仕入れ先|We are looking for a supplier of recycled paper.|再生紙の仕入れ先を探しています。|a reliable supplier / contact a supplier
lex-017|noun|policy|方針・規定|The travel policy explains which expenses are covered.|出張規定には、どの経費が支給対象になるか記載されています。|company policy / a refund policy
lex-018|noun|maintenance|保守・点検|The elevators will be closed for maintenance tonight.|今夜、エレベーターは点検のため利用できません。|routine maintenance / perform maintenance
lex-019|noun|proposal|提案・企画書|The committee will discuss your proposal on Tuesday.|委員会は火曜日にあなたの提案を協議します。|submit a proposal / a project proposal
lex-020|noun|reservation|予約|Please confirm your reservation by email.|メールで予約を確認してください。|make a reservation / cancel a reservation
lex-021|noun|merger|合併|The merger brought the two regional banks together.|合併によって、その二つの地方銀行が一つになりました。|announce a merger / a proposed merger
lex-022|noun|workforce|従業員全体・労働力|The company plans to expand its workforce next year.|同社は来年、従業員数を増やす予定です。|a skilled workforce / expand the workforce
lex-023|noun|premises|建物と敷地|Visitors must wear identification badges on the premises.|訪問者は敷地内で身分証明バッジを着用しなければなりません。|on the premises / business premises
lex-024|noun|feedback|意見・評価|We welcome feedback on the new booking system.|新しい予約システムに関するご意見を歓迎します。|customer feedback / provide feedback
lex-025|noun|incentive|奨励策・動機となるもの|The store offers a discount as an incentive to renew membership.|その店は会員更新を促すために割引を提供しています。|a financial incentive / offer an incentive
lex-026|noun|shortage|不足|A shortage of materials has delayed production.|資材不足で生産が遅れています。|a staff shortage / a shortage of supplies
lex-027|noun|budget|予算|The project stayed within its original budget.|そのプロジェクトは当初の予算内に収まりました。|within budget / allocate a budget
lex-028|noun|facility|施設|The new training facility can accommodate fifty people.|新しい研修施設は50人を収容できます。|a training facility / a manufacturing facility
lex-029|noun|appointment|面会・診察の予約|I have an appointment with the manager at ten.|10時に部長と面会する約束があります。|schedule an appointment / by appointment
lex-030|noun|subscription|定期購読・継続利用契約|Your annual subscription will expire next month.|年間利用契約は来月期限が切れます。|renew a subscription / an annual subscription
lex-031|noun|fare|交通機関の運賃|The fare includes the airport transfer.|その運賃には空港送迎が含まれています。|a train fare / a reduced fare
lex-032|noun|reputation|評判|The hotel has a reputation for excellent service.|そのホテルは優れたサービスで評判です。|build a reputation / a reputation for quality
lex-033|verb|approve|承認する|The director approved the revised budget.|役員は修正された予算を承認しました。|approve a request / approve a budget
lex-034|verb|postpone|延期する|We postponed the launch until September.|発売を9月まで延期しました。|postpone a meeting / postpone until Friday
lex-035|verb|reimburse|払い戻す・精算する|The company will reimburse employees for travel expenses.|会社は従業員に出張経費を払い戻します。|reimburse someone for expenses
lex-036|verb|recruit|採用する・募集する|We plan to recruit two additional engineers.|技術者をさらに2人採用する予定です。|recruit staff / recruit new employees
lex-037|verb|accommodate|収容する・対応する|This room can accommodate up to eighty guests.|この部屋は最大80人の来客を収容できます。|accommodate guests / accommodate a request
lex-038|verb|allocate|割り当てる|We allocated extra funds to staff training.|社員研修に追加の資金を割り当てました。|allocate funds to / allocate resources
lex-039|verb|comply|従う・順守する|All suppliers must comply with our safety standards.|すべての仕入れ先は当社の安全基準を順守しなければなりません。|comply with regulations / comply with a request
lex-040|verb|negotiate|交渉する|The sales team negotiated a lower shipping rate.|営業チームは送料を下げる交渉をしました。|negotiate a contract / negotiate with a supplier
lex-041|verb|confirm|確認する・確定する|Please confirm the delivery address before ordering.|注文前に配送先住所を確認してください。|confirm a booking / confirm the details
lex-042|verb|distribute|配布する・分配する|The receptionist distributed name tags to the visitors.|受付係は訪問者に名札を配りました。|distribute materials / distribute to participants
lex-043|verb|inspect|検査する・点検する|A technician will inspect the equipment tomorrow.|技術者が明日その機器を点検します。|inspect equipment / inspect for damage
lex-044|verb|retain|保持する・引き留める|The company introduced flexible hours to retain staff.|会社は従業員を引き留めるために柔軟な勤務時間を導入しました。|retain employees / retain a copy
lex-045|verb|submit|提出する|Submit your expense report by the end of the week.|週末までに経費報告書を提出してください。|submit an application / submit a report
lex-046|verb|renovate|改装する|The hotel will renovate its lobby this winter.|そのホテルはこの冬にロビーを改装します。|renovate a building / renovate an office
lex-047|verb|waive|免除する|The bank agreed to waive the processing fee.|銀行は手数料を免除することに同意しました。|waive a fee / waive a requirement
lex-048|verb|resolve|解決する|The support team resolved the issue within an hour.|サポートチームは1時間以内に問題を解決しました。|resolve a problem / resolve a dispute
lex-049|verb|anticipate|予想する・見込む|We anticipate higher demand during the holiday season.|休暇シーズンには需要が増えると見込んでいます。|anticipate demand / anticipate a delay
lex-050|verb|implement|実施する・導入する|The department will implement the new procedure next month.|その部門は来月、新しい手順を導入します。|implement a policy / implement changes
lex-051|verb|notify|知らせる・通知する|Please notify the manager of any schedule changes.|日程の変更があれば部長に知らせてください。|notify someone of a change
lex-052|verb|verify|正しいことを確かめる|Staff must verify each customer's identity.|スタッフは各顧客の本人確認をしなければなりません。|verify identity / verify the accuracy
lex-053|verb|expire|期限が切れる|The discount code will expire at the end of June.|割引コードは6月末に期限が切れます。|a contract expires / a license expires
lex-054|verb|withdraw|撤回する・引き出す|The applicant decided to withdraw her application.|応募者は自分の応募を取り下げることにしました。|withdraw an application / withdraw funds
lex-055|verb|resume|再開する|Normal service will resume on Monday morning.|通常の運行は月曜日の朝に再開します。|resume operations / resume work
lex-056|verb|replace|交換する・取り替える|We need to replace the damaged cable.|損傷したケーブルを交換する必要があります。|replace equipment / replace A with B
lex-057|verb|enclose|同封する|I have enclosed a copy of the signed agreement.|署名済みの契約書の写しを同封しました。|enclose a copy / enclose a document
lex-058|verb|purchase|購入する|Tickets can be purchased at the information desk.|チケットは案内デスクで購入できます。|purchase tickets / purchase equipment
lex-059|verb|recommend|勧める・推薦する|The consultant recommended a simpler payment system.|コンサルタントはより簡単な決済システムを勧めました。|recommend a product / recommend doing
lex-060|verb|reduce|減らす・削減する|The new software helps reduce processing time.|新しいソフトウェアは処理時間の短縮に役立ちます。|reduce costs / reduce by ten percent
lex-061|adjective|available|利用できる・空いている|A meeting room is available on the second floor.|2階の会議室が利用できます。|readily available / available upon request
lex-062|adjective|mandatory|義務付けられた|Attendance at the safety briefing is mandatory.|安全説明会への出席は義務付けられています。|mandatory training / mandatory attendance
lex-063|adjective|reliable|信頼できる|We need a reliable delivery service.|信頼できる配送サービスが必要です。|a reliable source / reliable equipment
lex-064|adjective|temporary|一時的な|The company hired temporary staff for the busy season.|会社は繁忙期に向けて臨時職員を雇いました。|temporary employment / a temporary closure
lex-065|adjective|eligible|資格・条件を満たしている|Full-time employees are eligible for this benefit.|常勤の従業員はこの福利厚生の対象になります。|eligible for benefits / eligible to apply
lex-066|adjective|confidential|機密の|Please keep the client information confidential.|顧客情報は機密扱いにしてください。|confidential information / strictly confidential
lex-067|adjective|overdue|期限を過ぎた|Payment for the last shipment is now overdue.|前回の出荷分の支払いは、すでに期限を過ぎています。|an overdue payment / an overdue invoice
lex-068|adjective|spacious|広々とした|The apartment has a spacious living area.|そのアパートには広々とした居住空間があります。|a spacious room / a spacious lobby
lex-069|adjective|tentative|仮の・暫定的な|We have set a tentative date for the workshop.|研修会の仮の日程を決めました。|a tentative schedule / a tentative agreement
lex-070|adjective|substantial|かなりの・多額の|The new process led to substantial savings.|新しい工程によって大幅な節約が実現しました。|substantial savings / a substantial increase
lex-071|adjective|compatible|互換性がある・両立できる|This device is compatible with our existing software.|この機器は既存のソフトウェアと互換性があります。|compatible with / fully compatible
lex-072|adjective|affordable|手頃な価格の|The store offers affordable office furniture.|その店は手頃な価格のオフィス家具を扱っています。|affordable prices / affordable housing
lex-073|adjective|comprehensive|包括的な・広範囲にわたる|The consultant prepared a comprehensive report.|コンサルタントは包括的な報告書を作成しました。|a comprehensive review / comprehensive coverage
lex-074|adjective|defective|欠陥のある|Please return any defective products to the store.|欠陥のある商品は店舗に返品してください。|a defective product / defective equipment
lex-075|adjective|convenient|便利な・都合のよい|Let us know a convenient time for the interview.|面接に都合のよい時間をお知らせください。|a convenient location / convenient for customers
lex-076|adjective|qualified|必要な資格・能力のある|Only qualified technicians may repair this machine.|必要な資格を持つ技術者だけがこの機械を修理できます。|a qualified applicant / qualified to do
lex-077|adverb|promptly|速やかに|Please respond promptly to customer inquiries.|顧客からの問い合わせには速やかに対応してください。|respond promptly / pay promptly
lex-078|adverb|annually|毎年|The equipment must be inspected annually.|その機器は毎年点検する必要があります。|review annually / held annually
lex-079|adverb|exclusively|独占的に・限定して|This discount is available exclusively to members.|この割引は会員限定で利用できます。|exclusively for members / available exclusively
lex-080|adverb|approximately|およそ|The installation takes approximately two hours.|設置にはおよそ2時間かかります。|approximately one hour / approximately fifty people
lex-081|idiom|carry out|実施する・遂行する|The team will carry out a safety inspection tomorrow.|チームは明日、安全点検を実施します。|carry out an inspection / carry out a survey
lex-082|idiom|put off|延期する|We had to put off the meeting until Thursday.|会議を木曜日まで延期しなければなりませんでした。|put off a meeting / put off doing
lex-083|idiom|fill out|必要事項を記入する|Please fill out this form before your appointment.|予約の時間までにこの用紙に必要事項を記入してください。|fill out a form / fill out an application
lex-084|idiom|look into|調査する・調べる|Our technicians are looking into the connection problem.|技術者が接続の問題を調査しています。|look into a problem / look into a complaint
lex-085|idiom|follow up on|追加確認・対応をする|I am calling to follow up on your request.|ご依頼について追加確認をするためにお電話しています。|follow up on a request / follow up on an inquiry
lex-086|idiom|run out of|使い果たす・切らす|The office has run out of printer paper.|オフィスのプリンター用紙が切れました。|run out of supplies / run out of time
lex-087|idiom|take over|引き継ぐ|Ms. Lee will take over the project next week.|リーさんが来週そのプロジェクトを引き継ぎます。|take over responsibility / take over a business
lex-088|idiom|turn down|断る・却下する|The applicant turned down the job offer.|応募者はその採用の申し出を断りました。|turn down an offer / turn down a request
lex-089|idiom|get in touch with|連絡を取る|Please get in touch with our support team.|当社のサポートチームに連絡してください。|get in touch with a client
lex-090|idiom|keep track of|継続して把握する・記録する|This spreadsheet helps us keep track of expenses.|この表計算シートは経費の記録に役立ちます。|keep track of orders / keep track of progress
lex-091|idiom|make up for|埋め合わせる|We offered free delivery to make up for the delay.|遅延の埋め合わせとして無料配送を提供しました。|make up for lost time / make up for a delay
lex-092|idiom|come up with|考え出す・提案する|The team came up with a simpler design.|チームはより簡単な設計を考え出しました。|come up with an idea / come up with a solution
lex-093|idiom|set up|設置する・準備する|We will set up the display before the store opens.|開店前に展示を設置します。|set up equipment / set up a meeting
lex-094|idiom|call off|中止する|The organizers called off the outdoor event.|主催者は屋外イベントを中止しました。|call off an event / call off a meeting
lex-095|idiom|drop by|立ち寄る|Feel free to drop by our booth after the presentation.|発表の後、お気軽に当社のブースへお立ち寄りください。|drop by the office / drop by a booth
lex-096|idiom|hand in|提出する|Please hand in your visitor badge when you leave.|お帰りの際は訪問者用バッジを提出してください。|hand in a report / hand in a form
lex-097|idiom|take part in|参加する|All employees can take part in the workshop.|すべての従業員が研修会に参加できます。|take part in training / take part in a discussion
lex-098|idiom|deal with|対処する・扱う|The reception team deals with booking inquiries.|受付チームは予約の問い合わせに対応します。|deal with complaints / deal with a problem
lex-099|idiom|go over|詳しく確認する・見直す|Let's go over the contract before we sign it.|署名する前に契約書を詳しく確認しましょう。|go over the details / go over a report
lex-100|idiom|point out|指摘する|The auditor pointed out an error in the report.|監査担当者は報告書の誤りを指摘しました。|point out an error / point out a difference
lex-101|idiom|look forward to|楽しみに待つ|We look forward to working with your team.|皆様のチームと一緒に仕事をすることを楽しみにしています。|look forward to doing / look forward to a visit
lex-102|idiom|be in charge of|担当している・責任者である|Ms. Patel is in charge of employee training.|パテルさんが社員研修を担当しています。|be in charge of a project
lex-103|idiom|be subject to|変更や条件などの対象となる|Delivery dates are subject to change.|配送日は変更される場合があります。|be subject to approval / be subject to change
lex-104|idiom|be entitled to|受ける権利がある|Members are entitled to a free consultation.|会員は無料相談を受ける権利があります。|be entitled to a refund / be entitled to benefits
lex-105|idiom|account for|割合を占める・理由を説明する|Online orders account for half of our sales.|オンライン注文が当社の売り上げの半分を占めています。|account for a share / account for an increase
lex-106|idiom|refer to|参照する・言及する|Please refer to the manual for installation instructions.|設置手順については説明書を参照してください。|refer to a manual / refer to a document
lex-107|idiom|depend on|左右される・頼る|The delivery date will depend on stock availability.|配送日は在庫状況によって決まります。|depend on demand / depend on the weather
lex-108|idiom|dispose of|処分する|Please dispose of used batteries in the designated container.|使用済み電池は指定された容器に捨ててください。|dispose of waste / dispose of old equipment
lex-109|idiom|on behalf of|～を代表して・～に代わって|I am writing on behalf of the sales director.|営業部長に代わってご連絡しています。|on behalf of the company
lex-110|idiom|in advance|前もって|Please book your seat at least one week in advance.|少なくとも1週間前に座席を予約してください。|pay in advance / notify in advance
lex-111|idiom|in accordance with|～に従って・～に準拠して|All refunds are processed in accordance with our policy.|返金はすべて当社の規定に従って処理されます。|in accordance with regulations
lex-112|idiom|at no extra charge|追加料金なしで|Breakfast is included at no extra charge.|朝食は追加料金なしで提供されます。|delivery at no extra charge
lex-113|idiom|in the meantime|その間に・それまでは|The technician will arrive soon; in the meantime, please turn off the printer.|技術者がまもなく到着します。それまではプリンターの電源を切っておいてください。|in the meantime, please wait
lex-114|idiom|as soon as possible|できるだけ早く|Please send the revised quote as soon as possible.|修正した見積もりをできるだけ早く送ってください。|reply as soon as possible
lex-115|idiom|on a regular basis|定期的に|We review our safety procedures on a regular basis.|私たちは安全手順を定期的に見直しています。|inspect on a regular basis
lex-116|idiom|in person|直接会って・本人が出向いて|You must collect your access card in person.|入館証は本人が直接受け取る必要があります。|apply in person / meet in person
lex-117|idiom|prior to|～より前に|Please read the instructions prior to installation.|設置前に説明書を読んでください。|prior to departure / prior to the meeting
lex-118|idiom|due to|～が原因で|The shipment was delayed due to heavy snow.|大雪のため出荷が遅れました。|due to a delay / due to bad weather
lex-119|idiom|regardless of|～に関係なく|The fee is the same regardless of the number of attendees.|参加者の人数に関係なく料金は同じです。|regardless of size / regardless of age
lex-120|idiom|in addition to|～に加えて|In addition to lunch, the fee covers all training materials.|料金には昼食に加えて、すべての研修教材が含まれています。|in addition to the cost / in addition to doing`.split('\n').map(row=>row.split('|'));
const labels={noun:'名詞',verb:'動詞',adjective:'形容詞',adverb:'副詞',idiom:'熟語・定型表現'};
const items=rows.map(([id,pos,term,meaning,example,translation,collocations],index)=>{
 const group=rows.slice(Math.floor(index/4)*4,Math.floor(index/4)*4+4).map(x=>x[3]);
 const shift=(Math.floor(index/4)+1)%4,options=group.slice(shift).concat(group.slice(0,shift));
 return {id,kind:pos==='idiom'?'idiom':'word',pos:labels[pos],term,meaning,example,translation,collocations:collocations.split(' / '),options,answer:options.indexOf(meaning)};
});
// Interleave selection in the state machine, retaining stable catalog order and IDs.
root.RAIL_VOCABULARY=items;
if(typeof module!=='undefined')module.exports=items;
})(typeof globalThis!=='undefined'?globalThis:this);

