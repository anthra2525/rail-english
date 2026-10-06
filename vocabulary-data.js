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
lex-120|idiom|in addition to|～に加えて|In addition to lunch, the fee covers all training materials.|料金には昼食に加えて、すべての研修教材が含まれています。|in addition to the cost / in addition to doing
lex-121|noun|application|応募書類・申請|Your application must include a letter describing your recent experience.|応募書類には最近の経験を説明する手紙を添える必要があります。|submit an application / an application form
lex-122|noun|orientation|新人向け説明会|New employees will attend orientation before starting work on Monday.|新入社員は月曜日に業務を始める前に新人向け説明会に出席します。|attend orientation / an orientation program
lex-123|noun|salary|給与|The advertised salary depends on the successful applicant's experience.|広告に掲載された給与は採用される応募者の経験によって決まります。|an annual salary / a starting salary
lex-124|noun|colleague|同僚|My colleague offered to lead the presentation while I was away.|私の不在中、同僚が発表を担当すると申し出てくれました。|a former colleague / work with colleagues
lex-125|noun|tenure|在職期間|Her tenure as department manager began when the company opened its Osaka office.|彼女の部長としての在職期間は会社が大阪事務所を開設したときに始まりました。|during her tenure / a long tenure
lex-126|noun|interview|面接|The interview will focus on your experience managing large projects.|面接では大規模なプロジェクトを管理した経験を中心に質問します。|conduct an interview / a job interview
lex-127|noun|department|部署・部門|Each department must send one representative to the planning meeting.|各部署は計画会議に代表者を1人出席させなければなりません。|the accounting department / a department manager
lex-128|noun|benefit|福利厚生・給付|The company introduced a new benefit covering monthly gym fees.|会社は毎月のジム利用料を補助する新しい福利厚生を導入しました。|employee benefits / a retirement benefit
lex-129|noun|supervisor|直属の上司・監督者|Ask your supervisor before changing the hours on your schedule.|勤務表の時間を変更する前に直属の上司に確認してください。|an immediate supervisor / a production supervisor
lex-130|noun|attendance|出席・参加人数|Attendance at the annual conference exceeded our expectations this year.|今年の年次会議の参加人数は予想を上回りました。|record attendance / attendance at a meeting
lex-131|noun|pension|年金|Employees can join the company pension plan after completing their probation.|従業員は試用期間を終えると会社の年金制度に加入できます。|a pension plan / receive a pension
lex-132|noun|shift|交代制の勤務時間|The evening shift begins after the afternoon deliveries are completed.|夕方の勤務は午後の配送が完了した後に始まります。|work a night shift / a shift schedule
lex-133|noun|contract|契約・契約書|Both parties must sign the contract before construction can begin.|建設を開始する前に両当事者が契約書に署名しなければなりません。|sign a contract / renew a contract
lex-134|noun|brochure|案内パンフレット|The brochure includes photographs of every room type in the hotel.|そのパンフレットにはホテルの全種類の客室の写真が掲載されています。|a product brochure / request a brochure
lex-135|noun|discount|割引|Customers receive a discount when they order more than twenty units.|20個を超えて注文するお客様には割引が適用されます。|offer a discount / a volume discount
lex-136|noun|customer|顧客|A regular customer suggested adding more vegetarian options to the menu.|常連客がメニューにベジタリアン向けの選択肢を増やすよう提案しました。|a loyal customer / customer satisfaction
lex-137|noun|order|注文|Your order will be processed after we receive the deposit.|手付金を受領した後にご注文を処理します。|place an order / an order number
lex-138|noun|packaging|梱包材・包装|The new packaging protects fragile items without using extra plastic.|新しい梱包材は余分なプラスチックを使わずに壊れやすい商品を保護します。|recyclable packaging / protective packaging
lex-139|noun|warehouse|倉庫|The warehouse stores replacement parts for all our current models.|その倉庫には当社の現行モデルすべての交換部品が保管されています。|a distribution warehouse / warehouse space
lex-140|noun|carrier|運送業者|The carrier will contact you to arrange a delivery time.|運送業者が配送時間の調整のために連絡します。|a shipping carrier / select a carrier
lex-141|noun|destination|目的地・配送先|Check the destination printed on the label before loading each package.|各荷物を積み込む前にラベルに印刷された配送先を確認してください。|a final destination / a popular destination
lex-142|noun|customs|税関|The goods cannot leave customs until the missing documents arrive.|不足している書類が届くまで商品は税関を通過できません。|clear customs / customs officials
lex-143|noun|freight|貨物|Most freight arrives by rail before being transported to local stores.|貨物の大半は鉄道で到着してから地元の店舗へ運ばれます。|air freight / freight transportation
lex-144|noun|delay|遅延|A brief delay at the port affected several afternoon deliveries.|港での短い遅延が午後の配送数件に影響しました。|an unexpected delay / experience a delay
lex-145|noun|conference|会議・大会|The conference brings together researchers and business leaders from several countries.|その会議には複数の国から研究者と企業の幹部が集まります。|attend a conference / a conference organizer
lex-146|noun|minutes|議事録|Please read the minutes before we discuss the remaining issues.|残っている問題を議論する前に議事録を読んでください。|take minutes / approve the minutes
lex-147|noun|participant|参加者|Each participant will receive a workbook at the registration desk.|各参加者は受付でワークブックを受け取ります。|a workshop participant / registered participants
lex-148|noun|presentation|発表・プレゼンテーション|Her presentation explained how the new design would lower production costs.|彼女の発表では新しい設計によって生産費をどう下げられるかが説明されました。|give a presentation / a sales presentation
lex-149|noun|expense|経費・支出|List each business expense separately on the form provided.|指定の用紙に業務上の各経費を別々に記入してください。|travel expenses / an expense report
lex-150|noun|margin|利ざや・利益率|Our profit margin improved after we negotiated lower material costs.|資材費を下げる交渉をした後、当社の利益率が改善しました。|a profit margin / a narrow margin
lex-151|noun|deposit|手付金・保証金|A small deposit is required to secure the meeting room.|会議室を確保するには少額の手付金が必要です。|pay a deposit / a refundable deposit
lex-152|noun|balance|未払い残額|Please pay the remaining balance before the furniture is delivered.|家具が配送される前に残りの未払い額をお支払いください。|an outstanding balance / pay the balance
lex-153|noun|transaction|取引|Every transaction is recorded automatically in the company's accounting system.|すべての取引は会社の会計システムに自動的に記録されます。|a business transaction / process a transaction
lex-154|noun|interest|利息|The bank pays interest on this account at the end of each month.|銀行は毎月末にこの口座の利息を支払います。|earn interest / an interest rate
lex-155|noun|installment|分割払いの1回分|The final installment for the equipment is due next week.|機器代金の分割払いの最終回分は来週が支払期限です。|pay in installments / a monthly installment
lex-156|noun|currency|通貨|The website displays prices in the currency selected by each visitor.|そのウェブサイトでは各訪問者が選んだ通貨で価格が表示されます。|foreign currency / exchange currency
lex-157|noun|complaint|苦情|The manager handled the complaint and offered a replacement meal.|店長は苦情に対応し、代わりの料理を提供すると申し出ました。|file a complaint / handle a complaint
lex-158|noun|inquiry|問い合わせ|Your inquiry about group tickets has been forwarded to our sales team.|団体チケットについてのお問い合わせを営業チームに転送しました。|a customer inquiry / respond to an inquiry
lex-159|noun|assistance|支援・手助け|Please press the blue button if you need assistance with payment.|お支払いについて手助けが必要な場合は青いボタンを押してください。|provide assistance / request assistance
lex-160|noun|courtesy|礼儀正しさ・好意による配慮|Staff members should treat every visitor with courtesy and patience.|職員はすべての来訪者に礼儀正しく辛抱強く接するべきです。|professional courtesy / treat someone with courtesy
lex-161|noun|luggage|旅行かばん類・手荷物|You may leave your luggage at reception until your room is ready.|客室の準備ができるまで手荷物をフロントに預けられます。|store luggage / a luggage tag
lex-162|noun|platform|駅のホーム|Passengers should wait on the platform indicated on the departure board.|乗客は発車案内板に表示されたホームでお待ちください。|a station platform / the departure platform
lex-163|noun|timetable|時刻表・予定表|The revised timetable includes an additional train during the morning rush.|改訂された時刻表には朝のラッシュ時の列車が1本追加されています。|a train timetable / a revised timetable
lex-164|noun|connection|乗り継ぎ|We have a tight connection between our two flights in Seoul.|ソウルでの二つの便の乗り継ぎ時間にはほとんど余裕がありません。|a flight connection / miss a connection
lex-165|noun|passport|旅券・パスポート|Your passport must remain valid throughout the entire business trip.|パスポートは出張の全期間を通じて有効でなければなりません。|a valid passport / renew a passport
lex-166|noun|passenger|乗客|Each passenger may bring one small bag into the cabin.|各乗客は機内に小さなかばんを一つ持ち込めます。|a train passenger / passenger safety
lex-167|noun|terminal|空港のターミナル|A free shuttle connects this terminal with the main airport building.|無料シャトルがこのターミナルと空港の主要建物を結んでいます。|an airport terminal / the international terminal
lex-168|noun|excursion|短い観光旅行|The conference fee includes an afternoon excursion to a nearby vineyard.|会議の参加費には近くのブドウ園への午後の小旅行が含まれています。|a guided excursion / a day excursion
lex-169|noun|lease|賃貸借契約|Our lease allows us to use the parking spaces behind the building.|当社の賃貸借契約では建物の裏の駐車スペースを使用できます。|sign a lease / a commercial lease
lex-170|noun|entrance|入り口|The main entrance will remain closed while the steps are repaired.|階段の修理中は正面入り口が閉鎖されたままになります。|the main entrance / an entrance hall
lex-171|noun|ventilation|換気|Better ventilation has made the workshop more comfortable during summer.|換気が改善され、夏の作業場がより快適になりました。|adequate ventilation / a ventilation system
lex-172|noun|security|警備・防犯|Building security checks all visitor passes at the front desk.|建物の警備担当者は受付ですべての訪問者の入館証を確認します。|security personnel / a security system
lex-173|noun|equipment|機器・設備|All equipment must be cleaned before the laboratory closes tonight.|今夜研究室を閉める前にすべての機器を清掃しなければなりません。|office equipment / safety equipment
lex-174|noun|component|構成部品|This component connects the motor to the main control unit.|この部品はモーターと主制御装置を接続します。|an electronic component / a key component
lex-175|noun|output|生産量|Daily output increased after workers received training on the new machines.|従業員が新しい機械の研修を受けた後、1日の生産量が増えました。|production output / increase output
lex-176|noun|precaution|予防措置|As a precaution, technicians disconnect the power before opening the machine.|予防措置として、技術者は機械を開ける前に電源を切り離します。|a safety precaution / take precautions
lex-177|noun|prototype|試作品|Engineers tested the prototype before selecting materials for the final product.|技術者は最終製品の材料を選ぶ前に試作品を試験しました。|develop a prototype / a working prototype
lex-178|noun|capacity|収容能力・生産能力|The factory is operating at full capacity to meet holiday demand.|工場は休暇期の需要に応えるために最大能力で稼働しています。|production capacity / at full capacity
lex-179|noun|productivity|生産性|Better tools have increased productivity without requiring employees to work longer hours.|道具の改善により、従業員の労働時間を延ばすことなく生産性が向上しました。|increase productivity / employee productivity
lex-180|noun|procedure|手順|The manual describes the procedure for shutting down the system safely.|説明書にはシステムを安全に停止する手順が記載されています。|follow a procedure / a standard procedure
lex-181|noun|regulation|規則・法規|A new regulation requires clearer labels on imported food products.|新しい規則では輸入食品により明確な表示を付けることが求められています。|safety regulations / comply with regulations
lex-182|noun|permit|許可証|Drivers need a permit to park in the loading area.|積み込み区域に駐車するには運転手に許可証が必要です。|a parking permit / apply for a permit
lex-183|noun|liability|法的責任|The contract explains our liability for damage during transportation.|契約書には輸送中の損傷に対する当社の法的責任が記載されています。|legal liability / liability for damages
lex-184|noun|machinery|機械類|Only trained employees may operate the machinery in this area.|この区域の機械を操作できるのは訓練を受けた従業員だけです。|heavy machinery / operate machinery
lex-185|noun|advertisement|広告|The advertisement lists the qualifications needed for the marketing position.|その広告にはマーケティング職に必要な資格や条件が記載されています。|place an advertisement / a newspaper advertisement
lex-186|noun|audience|聴衆・視聴者|The speaker invited questions from the audience after her demonstration.|講演者は実演の後に聴衆からの質問を受け付けました。|a target audience / address an audience
lex-187|noun|brand|ブランド・商標|The company introduced a new brand of affordable kitchen appliances.|会社は手頃な価格のキッチン家電の新ブランドを発表しました。|brand recognition / a leading brand
lex-188|noun|survey|アンケート・調査|Please complete the survey about your experience using our delivery service.|当社の配送サービスの利用体験についてアンケートにご回答ください。|conduct a survey / survey results
lex-189|noun|campaign|組織的な宣伝活動|Our latest advertising campaign focuses on the durability of our products.|当社の最新の広告キャンペーンは製品の耐久性に重点を置いています。|an advertising campaign / launch a campaign
lex-190|noun|demand|需要|Demand for outdoor furniture usually rises as the weather gets warmer.|屋外用家具の需要は通常、気候が暖かくなるにつれて増加します。|meet demand / growing demand
lex-191|noun|trend|傾向・動向|The report identifies a trend toward smaller apartments near train stations.|報告書は駅の近くのより小さなアパートを好む傾向を指摘しています。|a market trend / follow a trend
lex-192|noun|market|市場|The company plans to enter the European market next spring.|その会社は来春、欧州市場に参入する予定です。|enter a market / market research
lex-193|noun|investment|投資|The investment in modern equipment should lower our long-term operating costs.|最新設備への投資によって長期的な運営費が下がる見込みです。|a long-term investment / return on investment
lex-194|noun|asset|資産|The company sold an unused asset to fund its expansion.|会社は事業拡大の資金を調達するために未使用の資産を売却しました。|a valuable asset / fixed assets
lex-195|noun|loan|融資・貸付金|The bank offered a loan to help the bakery buy equipment.|銀行はパン店の設備購入を支援するために融資を申し出ました。|apply for a loan / repay a loan
lex-196|noun|payroll|給与支払い業務・給与台帳|Please send any changes to your bank details before payroll is processed.|給与支払い処理の前に銀行口座情報の変更をお知らせください。|process payroll / a payroll system
lex-197|noun|certificate|証明書・修了証|Participants receive a certificate after completing all six training sessions.|参加者は全6回の研修を修了すると修了証を受け取ります。|a training certificate / issue a certificate
lex-198|noun|session|授業・会議などの1回|The morning session will cover basic techniques for handling customer complaints.|午前の講習では顧客の苦情に対応する基本的な方法を扱います。|a training session / a question-and-answer session
lex-199|noun|skill|技能・能力|Clear communication is an essential skill for anyone supervising a team.|明確に意思を伝えることは、チームを指揮する人に不可欠な能力です。|develop a skill / communication skills
lex-200|noun|tuition|授業料|The company pays tuition for courses related to an employee's work.|会社は従業員の業務に関連する講座の授業料を支払います。|tuition fees / pay tuition
lex-201|noun|spreadsheet|表計算シート|The spreadsheet calculates the total cost of each project automatically.|その表計算シートは各プロジェクトの総費用を自動的に計算します。|update a spreadsheet / a budget spreadsheet
lex-202|noun|database|データベース|The database stores product details and contact information for suppliers.|そのデータベースには製品情報と仕入れ先の連絡先が保存されています。|search a database / a customer database
lex-203|noun|password|パスワード|Choose a password that is difficult for other people to guess.|他の人が推測しにくいパスワードを選んでください。|reset a password / a secure password
lex-204|noun|access|利用・入場する権限|Only registered guests have access to the hotel's fitness center.|ホテルのフィットネスセンターを利用できるのは宿泊登録済みのお客様だけです。|have access to / restricted access
lex-205|noun|headquarters|本社・本部|The company moved its headquarters to a building near the station.|その会社は本社を駅の近くの建物に移転しました。|corporate headquarters / regional headquarters
lex-206|noun|subsidiary|子会社|Our overseas subsidiary manages sales and customer support in Australia.|当社の海外子会社はオーストラリアでの営業と顧客サポートを管理しています。|a wholly owned subsidiary / establish a subsidiary
lex-207|noun|partnership|提携・協力関係|The partnership will allow both companies to reach more customers.|その提携により両社はより多くの顧客に商品やサービスを届けられます。|form a partnership / a strategic partnership
lex-208|noun|ownership|所有権・所有状態|Ownership of the building will transfer when the final payment arrives.|最終の支払いが届くと建物の所有権が移転します。|transfer ownership / under new ownership
lex-209|noun|donation|寄付|The library used the donation to buy books for its language section.|図書館はその寄付金を使い、語学コーナーの本を購入しました。|make a donation / a charitable donation
lex-210|noun|booth|展示用ブース・小区画|Visit our booth to see a demonstration of the latest model.|最新モデルの実演をご覧になるには当社のブースへお越しください。|an exhibition booth / a registration booth
lex-211|noun|admission|入場・入場料|Admission to the museum is free on the first Sunday of each month.|毎月第1日曜日はその博物館の入場料が無料です。|free admission / an admission fee
lex-212|noun|refreshment|軽い飲食物|Light refreshments will be served during the afternoon break.|午後の休憩中に軽い飲食物が提供されます。|light refreshments / serve refreshments
lex-213|noun|exception|例外|The manager made an exception because the customer had received incorrect instructions.|顧客が誤った案内を受けていたため、店長は例外を認めました。|make an exception / without exception
lex-214|noun|alternative|代わりの選択肢|The agent suggested an alternative when our preferred hotel was full.|希望していたホテルが満室だったため、担当者は別の選択肢を提案しました。|offer an alternative / a practical alternative
lex-215|noun|evidence|証拠・裏付け|The report provides evidence that the new process reduces waste.|報告書は新しい工程が廃棄物を減らすことを示す証拠を提示しています。|provide evidence / supporting evidence
lex-216|noun|requirement|必要条件・要件|A valid driver's license is a requirement for this delivery position.|有効な運転免許証がこの配送職の必要条件です。|meet a requirement / a minimum requirement
lex-217|verb|analyze|分析する|Our team will analyze the survey results before recommending any changes.|私たちのチームは変更を提案する前にアンケート結果を分析します。|analyze data / analyze the results
lex-218|verb|assemble|組み立てる|Two technicians can assemble the display shelves in about an hour.|技術者2人で陳列棚を約1時間で組み立てられます。|assemble furniture / assemble a product
lex-219|verb|attach|添付する・取り付ける|Please attach a photograph of the damaged item to your email.|破損した商品の写真をメールに添付してください。|attach a document / attach a label
lex-220|verb|attract|引き付ける|The new exhibition is expected to attract visitors from neighboring cities.|新しい展示会は近隣の都市から来場者を引き付けると期待されています。|attract customers / attract attention
lex-221|verb|clarify|明確にする|Could you clarify which delivery charges are included in this price?|この価格にどの配送料が含まれているかを明確にしていただけますか。|clarify a point / clarify the requirements
lex-222|verb|compare|比較する|We should compare several suppliers before choosing one for the project.|プロジェクトの仕入れ先を決める前に数社を比較すべきです。|compare prices / compare results
lex-223|verb|compile|まとめて作成する|The assistant will compile a list of attendees by Friday.|アシスタントは金曜日までに出席者の一覧をまとめます。|compile a report / compile a list
lex-224|verb|conserve|無駄遣いを抑えて節約する|Please turn off unused lights to conserve energy in the office.|オフィスの電力を節約するために使っていない照明を消してください。|conserve energy / conserve water
lex-225|verb|contribute|貢献する・提供する|Several local businesses will contribute funds to the community festival.|地元企業数社が地域のお祭りに資金を提供します。|contribute to a project / contribute funds
lex-226|verb|coordinate|調整して連携させる|Maria will coordinate deliveries so that materials arrive in the correct order.|マリアは資材が適切な順序で届くように配送を調整します。|coordinate activities / coordinate with suppliers
lex-227|verb|demonstrate|実演する・示す|The trainer will demonstrate how to use the new labeling machine.|講師が新しいラベル貼り機の使い方を実演します。|demonstrate a technique / demonstrate how to use
lex-228|verb|designate|指定する|The committee will designate one person to handle questions from reporters.|委員会は記者からの質問に対応する担当者を1人指定します。|designate a representative / designate an area
lex-229|verb|evaluate|評価する|We will evaluate the software after the trial period ends.|試用期間が終わった後にそのソフトウェアを評価します。|evaluate performance / evaluate a proposal
lex-230|verb|exceed|超える|Please contact the manager if repair costs exceed the approved amount.|修理費が承認された金額を超える場合は部長に連絡してください。|exceed expectations / exceed a limit
lex-231|verb|expand|拡大する|The restaurant plans to expand its outdoor seating area next summer.|そのレストランは来夏、屋外の座席スペースを広げる予定です。|expand a business / expand into new markets
lex-232|verb|facilitate|円滑にする・促進する|The shared calendar should facilitate communication between teams in different offices.|共有カレンダーは別々のオフィスのチーム間の連絡を円滑にするはずです。|facilitate communication / facilitate the process
lex-233|verb|adapt|適応する・適合させる|Small retailers must adapt their services to changing customer preferences.|小規模な小売店は変化する顧客の好みにサービスを適合させる必要があります。|adapt to changes / adapt a design
lex-234|verb|operate|操作する・稼働する|Only trained staff may operate this machine during production hours.|生産時間中にこの機械を操作できるのは訓練を受けたスタッフだけです。|operate machinery / operate a business
lex-235|verb|maintain|維持する|Regular staff training helps us maintain a high standard of service.|定期的な社員研修は高いサービス水準の維持に役立ちます。|maintain standards / maintain quality
lex-236|verb|measure|測定する|Please measure the doorway before ordering the new storage cabinet.|新しい収納棚を注文する前に出入り口の寸法を測ってください。|measure a distance / measure performance
lex-237|verb|persuade|説得する|The sales representative persuaded us to try a more durable material.|営業担当者は、より耐久性のある素材を試すよう私たちを説得しました。|persuade someone to act / persuade a customer
lex-238|verb|schedule|日時を決める・予定に入れる|We should schedule the inspection before the new tenants arrive.|新しい入居者が来る前に点検の日時を設定すべきです。|schedule a meeting / schedule an inspection
lex-239|verb|suspend|一時停止する|The airline will suspend flights on this route during runway repairs.|航空会社は滑走路の修理中、この路線の運航を一時停止します。|suspend operations / suspend service
lex-240|verb|prioritize|優先順位を付ける|We need to prioritize urgent repairs before beginning any decorative work.|装飾工事を始める前に緊急の修理を優先する必要があります。|prioritize tasks / prioritize urgent requests
lex-241|verb|acknowledge|（受領・事実などを）認める、知らせる|Please acknowledge receipt of the contract by replying to this message.|このメッセージに返信して、契約書を受領したことをお知らせください。|acknowledge receipt / acknowledge a mistake
lex-242|verb|audit|（会計などを）監査する|An independent firm will audit our financial records next month.|独立した会社が来月、当社の財務記録を監査します。|audit financial records / audit an account
lex-243|verb|issue|発行する|The office will issue visitor passes at the reception desk.|事務所は受付で来訪者用の入館証を発行します。|issue a permit / issue a receipt
lex-244|verb|calculate|計算する|The software calculates shipping costs based on package weight and destination.|このソフトウェアは荷物の重量と配送先に基づいて送料を計算します。|calculate the cost / calculate interest
lex-245|verb|celebrate|祝う|The company will celebrate its twentieth anniversary with a staff dinner.|会社は社員との夕食会で創立20周年を祝います。|celebrate an anniversary / celebrate an achievement
lex-246|verb|charge|（料金を）請求する|The hotel charges an additional fee for late departures.|そのホテルはチェックアウトが遅い場合に追加料金を請求します。|charge a fee / charge extra
lex-247|verb|deduct|差し引く、控除する|We will deduct the deposit from your final invoice.|最終請求額から手付金を差し引きます。|deduct expenses / deduct an amount
lex-248|verb|deliver|配達する、届ける|The courier delivered the replacement parts before the factory opened.|宅配業者は工場の始業前に交換部品を届けました。|deliver a package / deliver goods
lex-249|verb|depart|出発する|The airport shuttle departs from the main entrance every thirty minutes.|空港行きのシャトルバスは正面入口から30分おきに出発します。|depart on time / depart from a station
lex-250|verb|describe|説明する、描写する|The brochure describes the services included in each membership plan.|パンフレットには各会員プランに含まれるサービスが説明されています。|describe a procedure / describe a product
lex-251|verb|detect|検出する、見つける|The new sensors detect small changes in storage temperature.|新しいセンサーは保管温度のわずかな変化を検出します。|detect a problem / detect a change
lex-252|verb|draft|下書きする、草案を作る|Please draft a short announcement about the office relocation.|事務所移転についての短いお知らせの下書きを作ってください。|draft a proposal / draft an announcement
lex-253|verb|edit|編集する、修正する|Our editor will edit the newsletter before it goes to print.|当社の編集者が印刷前にニュースレターを編集します。|edit a document / edit a manuscript
lex-254|verb|emphasize|強調する|The trainer emphasized the importance of reporting safety concerns immediately.|講師は安全上の懸念を直ちに報告することの重要性を強調しました。|emphasize the importance / emphasize a point
lex-255|verb|enhance|高める、向上させる|Better lighting can enhance the appearance of products in the showroom.|照明を改善すると、ショールームの商品の見栄えを高められます。|enhance performance / enhance the appearance
lex-256|verb|retrieve|取り出す、検索して取得する|Employees can retrieve archived invoices through the company's secure online portal.|従業員は会社の安全なオンラインポータルから保管された請求書を取り出せます。|retrieve a document / retrieve information
lex-257|verb|repair|修理する|Our technicians can repair most printers without replacing the entire unit.|当社の技術者は、ほとんどのプリンターを本体ごと交換せずに修理できます。|repair equipment / repair a machine
lex-258|verb|exhibit|展示する|Several local artists will exhibit their work in the hotel lobby.|地元のアーティスト数名がホテルのロビーに作品を展示します。|exhibit artwork / exhibit products
lex-259|verb|export|輸出する|The manufacturer exports medical equipment to more than twenty countries.|その製造業者は20か国以上に医療機器を輸出しています。|export goods / export equipment
lex-260|verb|finance|資金を提供する、融資する|A local bank agreed to finance the construction of our warehouse.|地元の銀行が当社の倉庫建設に融資することに同意しました。|finance a project / finance construction
lex-261|verb|guarantee|保証する|The supplier guarantees that all products meet the required safety standards.|供給業者はすべての製品が必要な安全基準を満たすことを保証しています。|guarantee quality / guarantee delivery
lex-262|verb|guide|案内する、導く|A staff member will guide visitors through the production area.|職員が来訪者を製造エリア内に案内します。|guide visitors / guide someone through a process
lex-263|verb|illustrate|（図や例で）示す、説明する|These charts illustrate how customer preferences have changed since last year.|これらの図表は昨年から顧客の好みがどう変わったかを示しています。|illustrate a point / illustrate a trend
lex-264|verb|strengthen|強化する、強める|The company plans to strengthen its relationship with local suppliers.|会社は地元の供給業者との関係を強化する予定です。|strengthen relationships / strengthen security
lex-265|verb|launch|発売する、開始する|The company plans to launch its new delivery service in April.|会社は4月に新しい配送サービスを開始する予定です。|launch a product / launch a service
lex-266|verb|store|保管する、保存する|Please store cleaning supplies in the locked cabinet beside the kitchen.|清掃用品はキッチン横の鍵のかかった戸棚に保管してください。|store supplies / store information
lex-267|verb|select|選ぶ、選定する|The committee will select a venue after comparing the rental costs.|委員会は利用料金を比較したうえで会場を選びます。|select a candidate / select a venue
lex-268|verb|motivate|意欲を高める、動機づける|Regular feedback helps motivate employees to develop their professional skills.|定期的なフィードバックは、専門技能を伸ばそうとする従業員の意欲を高めるのに役立ちます。|motivate employees / motivate a team
lex-269|verb|obtain|入手する、取得する|Visitors must obtain a security pass before entering the laboratory.|来訪者は研究室に入る前に入館証を取得しなければなりません。|obtain permission / obtain a permit
lex-270|verb|overlook|見落とす|We overlooked a small error in the original shipping address.|私たちは元の配送先住所にあった小さな誤りを見落としました。|overlook an error / overlook a detail
lex-271|verb|owe|（金銭の）支払い義務がある、借りがある|The client still owes us payment for last month's consulting services.|その顧客にはまだ先月のコンサルティングサービスの代金を当社に支払う義務があります。|owe money / owe an amount
lex-272|verb|process|（注文・申請などを）処理する|Our office processes refund requests within five business days.|当事務所は返金申請を5営業日以内に処理します。|process an order / process an application
lex-273|verb|prohibit|禁止する|Company rules prohibit the use of personal devices in secure areas.|会社の規則では、機密管理区域での私物の端末の使用が禁止されています。|prohibit smoking / prohibit the use of something
lex-274|verb|promote|昇進させる|The firm promoted Ms. Chen to regional manager last month.|会社は先月、チェンさんを地域統括マネージャーに昇進させました。|promote an employee / promote someone to manager
lex-275|verb|prove|証明する|These documents prove that the shipment arrived before the deadline.|これらの書類は貨物が期限前に到着したことを証明しています。|prove a claim / prove that something is true
lex-276|verb|publish|出版する、公表する|The association publishes a detailed industry report every spring.|その協会は毎年春に詳細な業界報告書を発行しています。|publish a report / publish a book
lex-277|verb|relocate|移転する、転居する|The design team will relocate to a larger studio in June.|デザインチームは6月により広いスタジオへ移転します。|relocate an office / relocate to a new city
lex-278|verb|request|依頼する、求める|You can request a printed receipt at the reception desk.|受付で紙の領収書を依頼できます。|request assistance / request a refund
lex-279|verb|consult|相談する、参照する|Please consult the maintenance manual before attempting to restart the machine.|機械を再起動しようとする前に、保守マニュアルを参照してください。|consult a manual / consult an expert
lex-280|verb|restore|復旧させる、元の状態に戻す|Technicians restored internet access shortly after the morning power outage.|技術者は朝の停電後まもなくインターネット接続を復旧させました。|restore service / restore a building
lex-281|adjective|accurate|正確な|Accurate sales figures are essential for planning next year's budget.|正確な売上高の数値は来年度の予算を計画するうえで不可欠です。|accurate information / accurate records
lex-282|adjective|adjacent|隣接した|We reserved two adjacent meeting rooms for the training sessions.|研修用に隣接する2つの会議室を予約しました。|adjacent rooms / adjacent buildings
lex-283|adjective|apparent|明らかな、見て取れる|The benefits of the new system became apparent after one month.|新しいシステムの利点は1か月後に明らかになりました。|apparent benefits / become apparent
lex-284|adjective|automatic|自動の|The building's automatic doors remain locked outside normal business hours.|その建物の自動ドアは通常の営業時間外には施錠されたままです。|automatic doors / automatic renewal
lex-285|adjective|brief|短時間の、簡潔な|We held a brief meeting before welcoming the overseas visitors.|海外からの来訪者を迎える前に、私たちは短い会議を開きました。|brief meeting / brief summary
lex-286|adjective|capable|能力がある、有能な|We need a capable technician who can repair this equipment.|この機器を修理できる有能な技術者が必要です。|capable employee / capable of handling a task
lex-287|adjective|cautious|慎重な|Investors remained cautious despite the company's encouraging sales results.|会社の好調な売上実績にもかかわらず、投資家は慎重な姿勢を保ちました。|cautious approach / cautious about spending
lex-288|adjective|central|中心部の、中心的な|The hotel has a central location near shops and restaurants.|そのホテルは店やレストランに近い中心部に位置しています。|central location / central role
lex-289|adjective|competitive|競争力のある、競争の激しい|Our competitive prices have attracted several new corporate clients.|当社の競争力のある価格により、法人の新規顧客を数社獲得しました。|competitive prices / competitive market
lex-290|adjective|complex|複雑な|The consultant explained the complex procedure using a simple diagram.|コンサルタントは簡単な図を使ってその複雑な手順を説明しました。|complex procedure / complex issue
lex-291|adjective|consistent|一貫した、安定した|The bakery's consistent quality keeps customers coming back every week.|そのベーカリーの安定した品質のおかげで、顧客は毎週訪れています。|consistent quality / consistent performance
lex-292|adjective|crowded|混雑した|The station becomes crowded when nearby offices close for the day.|近くのオフィスがその日の業務を終える時間になると、駅は混雑します。|crowded station / crowded room
lex-293|adjective|current|現在の、最新の|Please check that your current address appears on the application.|申請書に現在の住所が記載されていることを確認してください。|current address / current situation
lex-294|adjective|damaged|破損した|Please keep the damaged packaging until the courier completes its investigation.|宅配業者の調査が終わるまで、破損した梱包材を保管してください。|damaged goods / damaged packaging
lex-295|adjective|domestic|国内の|Domestic flights leave from the smaller terminal across the road.|国内線は道路の向かいにある小さいほうのターミナルから出発します。|domestic flight / domestic market
lex-296|adjective|durable|丈夫な、耐久性のある|These durable chairs are designed for daily use in busy restaurants.|これらの丈夫な椅子は、忙しいレストランで毎日使うことを想定して設計されています。|durable materials / durable equipment
lex-297|adjective|efficient|効率的な|The new ordering system makes our daily operations more efficient.|新しい発注システムにより、日々の業務がより効率的になります。|efficient system / efficient use of resources
lex-298|adjective|essential|不可欠な|A reliable internet connection is essential for this online training course.|このオンライン研修には安定したインターネット接続が不可欠です。|essential information / essential equipment
lex-299|adjective|exceptional|並外れて優れた|The manager thanked the team for its exceptional customer service.|マネージャーはチームの並外れて優れた顧客対応に感謝しました。|exceptional service / exceptional performance
lex-300|adjective|experienced|経験豊富な|An experienced supervisor will train the new warehouse staff.|経験豊富な監督者が倉庫の新しいスタッフを指導します。|experienced staff / experienced professional
lex-301|adjective|flexible|柔軟な、融通の利く|Our flexible schedule allows employees to start work at different times.|当社の柔軟な勤務制度では、従業員がそれぞれ異なる時刻に仕事を始められます。|flexible schedule / flexible approach
lex-302|adjective|formal|正式な、形式にのっとった|The client sent a formal invitation to the opening ceremony.|顧客は開業式への正式な招待状を送りました。|formal invitation / formal agreement
lex-303|adjective|frequent|頻繁な|Frequent interruptions made it difficult to finish the report on time.|作業がたびたび中断されたため、報告書を予定どおりに仕上げるのが難しくなりました。|frequent interruptions / frequent traveler
lex-304|adjective|generous|気前のよい、手厚い|The company offers a generous travel allowance to its sales representatives.|その会社は営業担当者に手厚い出張手当を支給しています。|generous allowance / generous donation
lex-305|adjective|hesitant|ためらっている|Some customers are hesitant to order expensive products without seeing them.|高価な商品を実物を見ずに注文することをためらう顧客もいます。|hesitant to agree / hesitant about a change
lex-306|adjective|immediate|即座の、直ちに必要な|The leak requires immediate attention to prevent further damage.|さらなる被害を防ぐには、その水漏れに直ちに対処する必要があります。|immediate attention / immediate response
lex-307|adjective|impressive|印象的な、感心させる|The candidate gave an impressive presentation during her second interview.|その候補者は2回目の面接で見事なプレゼンテーションを行いました。|impressive presentation / impressive results
lex-308|adjective|independent|独立した|An independent laboratory will test the quality of our drinking water.|独立した検査機関が当社の飲料水の品質を検査します。|independent laboratory / independent review
lex-309|adjective|initial|最初の、初期の|The initial payment is due when you sign the rental agreement.|最初の支払いは賃貸契約書に署名する際に必要です。|initial payment / initial stage
lex-310|adjective|international|国際的な|The city will host an international trade exhibition next autumn.|その都市は来年の秋に国際見本市を開催します。|international trade / international conference
lex-311|adjective|legal|法律上の、合法の|Please consult our legal department before signing the contract.|契約書に署名する前に、当社の法務部に相談してください。|legal department / legal advice
lex-312|adjective|loyal|忠実な、変わらず支持する|The store offers special discounts to its most loyal customers.|その店は特にひいきにしてくれる顧客に特別割引を提供しています。|loyal customers / loyal employee
lex-313|adjective|maximum|最大の、上限の|The maximum weight for each parcel is twenty kilograms.|小包1個あたりの重量の上限は20キログラムです。|maximum capacity / maximum weight
lex-314|adjective|minor|小さな、軽微な|A minor adjustment to the machine reduced the noise considerably.|機械を少し調整したところ、騒音が大幅に減りました。|minor adjustment / minor damage
lex-315|adjective|modern|現代的な、最新式の|The conference center has modern facilities and spacious meeting rooms.|その会議センターには最新式の設備と広々とした会議室があります。|modern facilities / modern technology
lex-316|adjective|multiple|複数の|The hotel can arrange transportation for guests arriving on multiple flights.|ホテルは複数の便で到着する宿泊客の送迎を手配できます。|multiple locations / multiple options
lex-317|adjective|nearby|近くの|Employees often buy lunch at the nearby shopping center.|従業員はよく近くのショッピングセンターで昼食を買います。|nearby restaurant / nearby station
lex-318|adjective|optional|任意の、選択できる|The afternoon workshop is optional for employees who completed earlier training.|以前の研修を修了した従業員は、午後の講習会への参加は任意です。|optional workshop / optional feature
lex-319|adjective|original|元の、原本の|Please send the original receipt with your expense claim.|経費精算の申請とともに領収書の原本を送ってください。|original receipt / original document
lex-320|adjective|outstanding|未払いの、未処理の|Please pay the outstanding balance before the end of this month.|今月末までに未払い残高をお支払いください。|outstanding balance / outstanding payment
lex-321|adjective|permanent|恒久的な、常設の|The museum's permanent collection includes paintings by several local artists.|その美術館の常設コレクションには、地元の画家数名の作品が含まれています。|permanent position / permanent collection
lex-322|adjective|potential|潜在的な、見込みのある|The sales team invited potential clients to a product demonstration.|営業チームは見込み客を製品の実演会に招待しました。|potential clients / potential problem
lex-323|adjective|practical|実用的な、現実的な|The seminar offers practical advice on managing a small business.|そのセミナーでは小規模企業の経営について実用的な助言を提供します。|practical advice / practical solution
lex-324|adjective|previous|前の、以前の|Please include contact details for your previous employer on the form.|用紙に前の勤務先の連絡先を記入してください。|previous employer / previous experience
lex-325|adjective|profitable|利益の出る|The new branch became profitable within its first year.|新しい支店は開設から1年以内に黒字になりました。|profitable business / profitable investment
lex-326|adjective|regional|地域の|Our regional offices provide support to customers throughout the country.|当社の各地域の事務所は、全国の顧客をサポートしています。|regional office / regional manager
lex-327|adjective|relevant|関連のある、適切な|Applicants should describe any relevant experience in their cover letters.|応募者はカバーレターに応募職種に関連する経験を記載してください。|relevant experience / relevant information
lex-328|adjective|remote|遠隔の、遠く離れた|The new software gives employees remote access to company files.|新しいソフトウェアにより、従業員は会社のファイルに遠隔からアクセスできます。|remote access / remote location
lex-329|adjective|administrative|管理上の、事務の|The assistant handles administrative tasks such as booking rooms and ordering supplies.|そのアシスタントは会議室の予約や備品の発注などの事務作業を担当しています。|administrative tasks / administrative staff
lex-330|adjective|seasonal|季節の、季節限定の|The restaurant updates its menu regularly to feature seasonal vegetables.|そのレストランは季節の野菜を取り入れるため、定期的にメニューを更新します。|seasonal menu / seasonal demand
lex-331|adjective|separate|別々の、独立した|Please put personal purchases on a separate receipt from business expenses.|私用の購入分は業務経費とは別の領収書にしてください。|separate receipt / separate entrance
lex-332|adjective|similar|似ている|The two models offer similar features at different price points.|その2つのモデルは価格帯が異なりますが、似た機能を備えています。|similar features / similar results
lex-333|adjective|specific|具体的な、特定の|Please give specific examples of your achievements during the interview.|面接では自分の実績を具体的な例を挙げて説明してください。|specific examples / specific requirements
lex-334|adjective|stable|安定した|Fuel prices remained stable throughout the first quarter of the year.|燃料価格はその年の第1四半期を通じて安定していました。|stable prices / stable employment
lex-335|adjective|strict|厳しい、厳格な|The laboratory follows strict procedures for handling chemical samples.|その研究室では化学試料の取り扱いについて厳格な手順を守っています。|strict procedures / strict deadline
lex-336|adjective|suitable|適した、ふさわしい|This room is suitable for interviews and small team meetings.|この部屋は面接や少人数のチーム会議に適しています。|suitable location / suitable candidate
lex-337|adjective|sufficient|十分な|We have sufficient supplies to last until the next delivery.|次の納品まで持つだけの十分な備品があります。|sufficient time / sufficient funds
lex-338|adjective|urgent|緊急の|Please contact the duty manager if you have an urgent request.|緊急の依頼がある場合は当直のマネージャーに連絡してください。|urgent request / urgent matter
lex-339|adjective|valid|有効な|This discount coupon is valid until the end of November.|この割引クーポンは11月末まで有効です。|valid coupon / valid identification
lex-340|adjective|vacant|空いている、空席の|The building has two vacant offices on the top floor.|そのビルの最上階には空きオフィスが2室あります。|vacant office / vacant position
lex-341|adverb|accordingly|それに応じて、したがって|Demand has increased, so we have adjusted our production schedule accordingly.|需要が増えたため、それに応じて生産日程を調整しました。|adjust accordingly / plan accordingly
lex-342|adverb|carefully|注意深く、慎重に|Please read the warranty conditions carefully before contacting customer service.|カスタマーサービスに連絡する前に、保証条件を注意深く読んでください。|read carefully / check carefully
lex-343|adverb|recently|最近|The company recently opened a second office near the airport.|会社は最近、空港の近くに2つ目の事務所を開設しました。|recently opened / recently hired
lex-344|adverb|entirely|完全に、まったく|The training course is conducted entirely online for remote employees.|その研修は遠隔勤務の従業員向けにすべてオンラインで実施されます。|entirely online / entirely different
lex-345|adverb|clearly|明確に、はっきりと|All emergency exits must be clearly marked and easily accessible.|すべての非常口は明確に表示され、容易に利用できる状態でなければなりません。|clearly marked / explain clearly
lex-346|adverb|deliberately|意図的に、わざと|The designer deliberately left extra space for future additions to the form.|デザイナーは用紙への今後の項目追加に備え、意図的に余白を多く残しました。|deliberately omit / deliberately choose
lex-347|adverb|eventually|最終的には、やがて|After several revisions, the committee eventually accepted the proposal.|数回の修正を経て、委員会は最終的にその提案を受け入れました。|eventually succeed / eventually become
lex-348|adverb|simultaneously|同時に|The system allows several users to edit the same document simultaneously.|このシステムでは複数の利用者が同じ文書を同時に編集できます。|work simultaneously / operate simultaneously
lex-349|adverb|considerably|かなり、大幅に|Delivery times have improved considerably since we opened the new warehouse.|新しい倉庫を開設してから、配送時間は大幅に改善しました。|improve considerably / considerably lower
lex-350|adverb|directly|直接に|Please send any questions about the contract directly to our legal department.|契約に関する質問は、当社の法務部に直接送ってください。|contact directly / report directly to
lex-351|adverb|gradually|徐々に|The company will gradually introduce the new system across all branches.|会社は新しいシステムを全支店に徐々に導入します。|gradually increase / gradually introduce
lex-352|adverb|locally|地元で、地域内で|The restaurant purchases most of its fresh produce locally.|そのレストランは生鮮青果物の大半を地元で仕入れています。|produced locally / locally grown
lex-353|adverb|normally|通常は、普通は|The reception desk normally opens thirty minutes before the first appointment.|受付は通常、最初の予約時刻の30分前に開きます。|normally open / operate normally
lex-354|adverb|occasionally|時々|The director occasionally visits regional offices to meet local staff.|部長は地元のスタッフに会うため、時々地域の事務所を訪問します。|occasionally visit / occasionally require
lex-355|adverb|properly|適切に、きちんと|Make sure the containers are properly sealed before shipping them.|容器を発送する前に、きちんと密閉されていることを確認してください。|properly sealed / function properly
lex-356|adverb|steadily|着実に、安定して|Membership has grown steadily since the fitness center expanded its classes.|フィットネスセンターがクラスを拡充して以来、会員数は着実に増えています。|grow steadily / steadily improve
lex-357|adverb|otherwise|そうしなければ、それ以外は|Please save your changes now; otherwise, your work may be lost.|今すぐ変更を保存してください。そうしないと、作業内容が失われる可能性があります。|unless otherwise stated / otherwise unavailable
lex-358|adverb|thoroughly|徹底的に、十分に|Please inspect the rental vehicle thoroughly before leaving the parking area.|駐車場を出る前に、レンタカーを十分に点検してください。|inspect thoroughly / clean thoroughly
lex-359|adverb|abroad|海外へ、海外で|Employees traveling abroad must check their passport expiration dates before departure.|海外へ渡航する従業員は、出発前にパスポートの有効期限を確認しなければなりません。|travel abroad / work abroad
lex-360|adverb|unexpectedly|予想外に、思いがけず|The supplier unexpectedly closed its warehouse, causing delays in several shipments.|供給業者が予想外に倉庫を閉鎖したため、数件の出荷に遅れが生じました。|close unexpectedly / unexpectedly high
lex-361|idiom|provided that|～という条件で|You may change your reservation provided that seats remain available.|座席に空きがあるという条件で予約を変更できます。|provided that space permits / provided that payment is received
lex-362|idiom|in contrast to|～とは対照的に|In contrast to last year, demand remained strong throughout November.|昨年とは対照的に、11月を通して需要は堅調でした。|in contrast to previous results / in contrast to competitors
lex-363|idiom|by the time|～する時までには|By the time the guests arrive, we will have prepared everything.|来客が到着する時までには、すべての準備が整っているでしょう。|by the time we arrive / by the time construction ends
lex-364|idiom|in case of|～が起きた場合には|In case of an emergency, use the stairs beside reception.|緊急時には受付の横の階段を使ってください。|in case of fire / in case of cancellation
lex-365|idiom|as a result|その結果|The store extended its hours, and sales increased as a result.|店が営業時間を延長し、その結果、売り上げが増えました。|as a result of changes / improve as a result
lex-366|idiom|even though|～であるにもかかわらず|Even though the deadline was tight, the team finished early.|締め切りまで余裕がなかったにもかかわらず、チームは早めに作業を終えました。|even though prices rose / even though demand fell
lex-367|idiom|so that|～するために・～できるように|Please label each box so that staff can identify its contents.|スタッフが中身を確認できるように、各箱にラベルを付けてください。|so that everyone understands / so that we can proceed
lex-368|idiom|rather than|～ではなく|Please send a digital copy rather than printing the entire report.|報告書全体を印刷するのではなく、電子版を送ってください。|rather than wait / rather than by mail
lex-369|idiom|no later than|遅くとも～までに|Please return the signed agreement no later than Friday afternoon.|遅くとも金曜日の午後までに署名済みの契約書を返送してください。|no later than noon / no later than the deadline
lex-370|idiom|as of|～の時点で・～付で|As of October first, our office will occupy the fourth floor.|10月1日付で、当社のオフィスは4階に移ります。|as of today / as of next month
lex-371|idiom|until further notice|追って通知があるまで|The northern entrance will remain closed until further notice.|北側の入口は追って通知があるまで閉鎖されます。|closed until further notice / suspended until further notice
lex-372|idiom|from now on|これからは|From now on, all purchase requests must include a project code.|これからは、すべての購入申請にプロジェクトコードを記載する必要があります。|use this address from now on / apply from now on
lex-373|idiom|ahead of schedule|予定より早く|The renovation finished ahead of schedule despite several delivery delays.|数回の配送遅延があったものの、改装は予定より早く完了しました。|finish ahead of schedule / arrive ahead of schedule
lex-374|idiom|on arrival|到着時に|On arrival, please collect your room key from the reception desk.|到着時に、受付で部屋の鍵を受け取ってください。|pay on arrival / register on arrival
lex-375|idiom|within walking distance|歩いて行ける距離に|Several restaurants are within walking distance of the conference center.|会議場から歩いて行ける距離に、いくつかのレストランがあります。|within walking distance of the station / within easy walking distance
lex-376|idiom|in stock|在庫がある|The blue model is currently in stock at our downtown store.|青いモデルは現在、当社の中心街の店舗に在庫があります。|have an item in stock / keep spare parts in stock
lex-377|idiom|out of order|故障している|The ticket machine near the entrance is out of order.|入口付近の券売機は故障しています。|temporarily out of order / an elevator is out of order
lex-378|idiom|under construction|建設中で|A larger parking garage is under construction behind the hotel.|ホテルの裏で、より大きな駐車場が建設中です。|a building under construction / remain under construction
lex-379|idiom|on display|展示されている|The latest kitchen appliances are on display near the entrance.|最新の台所用電化製品が入口付近に展示されています。|put products on display / items on display
lex-380|idiom|for sale|売りに出されている|The office building next to the station is for sale.|駅の隣のオフィスビルが売りに出されています。|offer equipment for sale / property for sale
lex-381|idiom|in transit|輸送中で|Your replacement parts are in transit and should arrive tomorrow.|交換部品は輸送中で、明日到着する予定です。|goods in transit / damaged in transit
lex-382|idiom|at capacity|最大稼働・収容能力に達して|The factory is operating at capacity to meet summer demand.|工場は夏の需要に応えるため、最大能力で稼働しています。|operate at capacity / a venue at capacity
lex-383|idiom|on hold|保留中で・待機中で|The expansion project is on hold until funding is secured.|拡張計画は資金が確保されるまで保留になっています。|put a project on hold / place a caller on hold
lex-384|idiom|under review|審査・検討中で|Your application is still under review by the selection committee.|あなたの申請は、選考委員会でまだ審査中です。|an application under review / a policy under review
lex-385|idiom|in writing|書面で|Any changes to the agreement must be confirmed in writing.|契約内容の変更はすべて書面で確認する必要があります。|confirm in writing / request in writing
lex-386|idiom|by mistake|誤って|The supplier sent our order to the former address by mistake.|仕入れ先は誤って当社の注文品を以前の住所に送りました。|sent by mistake / deleted by mistake
lex-387|idiom|at short notice|急な知らせで・直前の依頼で|We appreciate your willingness to attend the meeting at short notice.|急な依頼にもかかわらず、会議にご出席いただけることに感謝します。|available at short notice / arrange at short notice
lex-388|idiom|in full|全額・全部を|The remaining balance must be paid in full before delivery.|残金は配達前に全額支払う必要があります。|pay in full / read in full
lex-389|idiom|in installments|分割払いで|Customers can pay for the equipment in installments over twelve months.|お客様は機器の代金を12か月の分割払いで支払えます。|pay in installments / repay in monthly installments
lex-390|idiom|at one's own expense|自費で|Participants may extend their hotel stay at their own expense.|参加者は自費でホテルの滞在を延長できます。|travel at one's own expense / attend at one's own expense
lex-391|idiom|in bulk|まとめて大量に|We buy packaging materials in bulk to obtain better prices.|より安く購入するため、梱包資材をまとめて大量に仕入れています。|buy in bulk / order in bulk
lex-392|idiom|on credit|掛け払いで|Approved business customers may purchase office supplies on credit.|承認済みの法人顧客は、事務用品を掛け払いで購入できます。|buy on credit / sell on credit
lex-393|idiom|break even|収支がとんとんになる|The new cafe expects to break even within six months.|新しいカフェは、6か月以内に収支がとんとんになると見込んでいます。|break even on a project / reach the break-even point
lex-394|idiom|make a profit|利益を上げる|The branch began to make a profit during its second year.|その支店は2年目に利益を上げ始めました。|make a steady profit / make a profit on sales
lex-395|idiom|incur a loss|損失を被る|The retailer may incur a loss if unsold goods expire.|売れ残った商品の期限が切れると、小売業者は損失を被る可能性があります。|incur a financial loss / incur a loss on an investment
lex-396|idiom|cut corners|必要な手順を省いて手を抜く|We cannot cut corners when testing products for customer safety.|顧客の安全のための製品試験では、必要な手順を省くことはできません。|cut corners on safety / avoid cutting corners
lex-397|idiom|draw up|文書・計画を作成する|Our legal team will draw up a new agreement tomorrow.|当社の法務チームが明日、新しい契約書を作成します。|draw up a contract / draw up a plan
lex-398|idiom|go into effect|発効する・適用が始まる|The revised parking rules go into effect next Monday morning.|改定された駐車規則は、来週月曜日の朝から適用されます。|a law goes into effect / changes go into effect
lex-399|idiom|remain in force|引き続き有効である|The original agreement will remain in force until December.|元の契約は12月まで引き続き有効です。|a contract remains in force / regulations remain in force
lex-400|idiom|breach of contract|契約違反|Failure to deliver the goods may constitute a breach of contract.|商品を納入しないことは、契約違反に当たる場合があります。|constitute a breach of contract / damages for breach of contract
lex-401|idiom|notice period|事前通知期間|The lease requires a notice period of thirty days before cancellation.|賃貸契約を解約するには、30日前までに通知する必要があります。|a thirty-day notice period / during the notice period
lex-402|idiom|terms and conditions|契約・利用の諸条件|Please read the terms and conditions before accepting the service agreement.|サービス契約に同意する前に、諸条件をお読みください。|agree to the terms and conditions / standard terms and conditions
lex-403|idiom|conflict of interest|利益相反|Committee members must report any potential conflict of interest.|委員は、利益相反となる可能性があれば報告する必要があります。|disclose a conflict of interest / avoid a conflict of interest
lex-404|idiom|non-disclosure agreement|秘密保持契約|All contractors must sign a non-disclosure agreement before accessing client files.|すべての請負業者は、顧客ファイルを閲覧する前に秘密保持契約に署名する必要があります。|sign a non-disclosure agreement / a mutual non-disclosure agreement
lex-405|idiom|raise a concern|懸念を表明する|Please raise any concerns about the schedule during today's briefing.|日程について懸念があれば、本日の説明会でお伝えください。|raise a concern about safety / raise serious concerns
lex-406|idiom|reach a consensus|合意に達する|The committee hopes to reach a consensus before the next meeting.|委員会は次回の会議までに合意に達することを目指しています。|reach a consensus on priorities / reach a broad consensus
lex-407|idiom|take minutes|議事録を取る|Could you take minutes while I lead the discussion today?|今日、私が議論を進める間、議事録を取っていただけますか。|take minutes at a meeting / take detailed minutes
lex-408|idiom|cast a vote|票を投じる|Each board member will cast a vote on the proposal.|各取締役は、その提案について票を投じます。|cast a vote for a candidate / cast a vote against a proposal
lex-409|idiom|bring up|話題に出す|Please bring up the staffing issue at our next meeting.|次回の会議で、人員配置の問題を話題に出してください。|bring up a question / bring up an issue
lex-410|idiom|get down to business|本題・仕事に取りかかる|After a brief introduction, we can get down to business.|簡単な紹介の後で、本題に入りましょう。|get down to business immediately / ready to get down to business
lex-411|idiom|stay on topic|話題からそれない|Please stay on topic so we can finish the discussion promptly.|話し合いを速やかに終えられるよう、話題からそれないでください。|stay on topic during discussions / remind speakers to stay on topic
lex-412|idiom|wrap up|締めくくる・終える|Let's wrap up the meeting with a summary of our decisions.|決定事項をまとめて、会議を締めくくりましょう。|wrap up a meeting / wrap up a presentation
lex-413|idiom|take into account|考慮に入れる|We must take seasonal demand into account when planning inventory.|在庫を計画する際は、季節ごとの需要を考慮に入れなければなりません。|take costs into account / take feedback into account
lex-414|idiom|rule out|可能性・選択肢を除外する|We cannot rule out further delays while testing continues.|試験が続いている間は、さらなる遅延の可能性を否定できません。|rule out a possibility / rule out an option
lex-415|idiom|weigh the pros and cons|利点と欠点を比較検討する|We should weigh the pros and cons before choosing a supplier.|仕入れ先を選ぶ前に、利点と欠点を比較検討すべきです。|weigh the pros and cons of relocation / carefully weigh the pros and cons
lex-416|idiom|make an exception|例外を認める|The manager agreed to make an exception for this urgent request.|部長は、この緊急の依頼について例外を認めることに同意しました。|make an exception to a rule / make an exception for a customer
lex-417|idiom|be aware of|～を認識している|All staff should be aware of the updated evacuation routes.|すべてのスタッフは、更新された避難経路を把握しておく必要があります。|be aware of risks / be fully aware of changes
lex-418|idiom|be familiar with|～をよく知っている・使い慣れている|The new assistant is already familiar with our scheduling software.|新しいアシスタントは、すでに当社の予定管理ソフトを使い慣れています。|be familiar with a procedure / be familiar with local customs
lex-419|idiom|be willing to|進んで～する意思がある|Several employees are willing to work at the new branch.|数名の従業員が、新しい支店で働く意思を示しています。|be willing to help / be willing to negotiate
lex-420|idiom|be likely to|～する可能性が高い|The new station is likely to attract more shoppers downtown.|新しい駅によって、中心街により多くの買い物客が訪れる可能性が高いです。|be likely to increase / be likely to succeed
lex-421|idiom|in terms of|～の点では|This supplier performs well in terms of quality and reliability.|この仕入れ先は、品質と信頼性の点で優れています。|in terms of cost / in terms of performance
lex-422|idiom|at a glance|一目で|The dashboard lets managers see current production levels at a glance.|管理画面では、管理者が現在の生産状況を一目で確認できます。|see at a glance / understand at a glance
lex-423|idiom|in favor of|～に賛成して|Most employees are in favor of introducing more flexible working hours.|ほとんどの従業員は、より柔軟な勤務時間の導入に賛成しています。|vote in favor of / be in favor of a proposal
lex-424|idiom|in proportion to|～に比例して|Shipping costs rise in proportion to the weight of each package.|送料は、各荷物の重量に比例して増えます。|in proportion to size / in proportion to income
lex-425|idiom|in the absence of|～の不在時に・～がない場合に|In the absence of the director, her deputy will chair the meeting.|部長の不在時には、副部長が会議の議長を務めます。|in the absence of evidence / in the absence of a manager
lex-426|idiom|in turn|順番に|Each department head will speak in turn during the afternoon briefing.|午後の説明会では、各部門の責任者が順番に発言します。|speak in turn / answer in turn
lex-427|idiom|now that|今や～なので|Now that testing is complete, we can release the software.|試験が完了したので、ソフトウェアを公開できます。|now that the work is finished / now that everyone is here
lex-428|idiom|as if|まるで～であるかのように|Please use the booking system as if you were a customer.|お客様になったつもりで予約システムを使ってみてください。|as if nothing had changed / as if you were a customer
lex-429|idiom|in excess of|～を超えて|Orders in excess of fifty units qualify for our volume discount.|50個を超える注文は、当社の数量割引の対象になります。|in excess of the limit / in excess of ten thousand dollars
lex-430|idiom|with regard to|～に関して|I have a question with regard to the revised delivery schedule.|改定された配送日程に関して、質問があります。|with regard to your request / with regard to payment
lex-431|idiom|in detail|詳しく|The technician explained the installation process in detail before starting.|技術者は作業を始める前に、設置手順を詳しく説明しました。|describe in detail / discuss in detail
lex-432|idiom|for the time being|当面の間|For the time being, please direct all inquiries to reception.|当面の間、問い合わせはすべて受付にお寄せください。|remain closed for the time being / sufficient for the time being
lex-433|idiom|keep up with|～に遅れずついていく|Our warehouse needs more staff to keep up with demand.|需要に対応し続けるには、倉庫の人員を増やす必要があります。|keep up with changes / keep up with demand
lex-434|idiom|fall behind|遅れを取る|The installation team could fall behind if parts arrive late.|部品の到着が遅れると、設置チームの作業が遅れる可能性があります。|fall behind schedule / fall behind with payments
lex-435|idiom|make progress|進展する・前進する|The design team continues to make progress on the new packaging.|設計チームは、新しい包装の開発を引き続き進めています。|make steady progress / make progress toward a goal
lex-436|idiom|meet expectations|期待に応える|The updated product must meet expectations for both quality and performance.|改良版の製品は、品質と性能の両方で期待に応えなければなりません。|meet customer expectations / meet high expectations
lex-437|idiom|take advantage of|機会・制度などを活用する|Members can take advantage of discounted rates during the winter.|会員は冬季に割引料金を利用できます。|take advantage of an offer / take advantage of an opportunity
lex-438|idiom|be on the lookout for|～を注意して探す|Our buyers are on the lookout for locally produced gifts.|当社の仕入れ担当者は、地元で作られた贈答品を注意して探しています。|be on the lookout for errors / be on the lookout for new suppliers
lex-439|idiom|stand out|目立つ・際立つ|Clear product photographs help your listing stand out from competing offers.|鮮明な商品写真によって、掲載商品が競合の商品より目立ちます。|stand out from competitors / stand out in a crowd
lex-440|idiom|build on|～を土台にさらに発展させる|The next workshop will build on skills introduced during today's session.|次回の研修会では、本日紹介した技能を土台に学習を進めます。|build on past success / build on existing knowledge
lex-441|idiom|step down|役職を退く|The director plans to step down after twenty years of service.|その役員は、20年間の勤務を経て退任する予定です。|step down as chair / step down from a position
lex-442|idiom|lay off|人員削減のため解雇する|The manufacturer may lay off workers if demand continues to decline.|需要の減少が続くと、メーカーは人員削減を行う可能性があります。|lay off employees / lay off temporary workers
lex-443|idiom|fill in for|一時的に～の代役を務める|Can you fill in for our receptionist on Thursday afternoon?|木曜日の午後に、受付係の代役を務めていただけますか。|fill in for a colleague / fill in for the manager
lex-444|idiom|report to|～の指揮下で働く|The new marketing coordinator will report to the regional director.|新しいマーケティング調整担当者は、地域統括責任者の指揮下で働きます。|report directly to a manager / report to the head of sales
lex-445|idiom|on probation|試用期間中で|New employees remain on probation during their first three months.|新入社員は、最初の3か月間は試用期間中となります。|an employee on probation / remain on probation
lex-446|idiom|on leave|休暇・休職中で|Our department head is on leave until next Tuesday.|当部門の責任者は、来週火曜日まで休暇中です。|be on parental leave / staff on leave
lex-447|idiom|on duty|勤務中で|A security officer is on duty throughout the night.|夜間は、警備員が常時勤務しています。|staff on duty / a nurse on duty
lex-448|idiom|on call|呼び出しに対応できる待機状態で|A technician will be on call during the holiday weekend.|連休中は、技術者が呼び出しに対応できるよう待機します。|a doctor on call / remain on call
lex-449|idiom|turn out|結果的に～だと分かる|The repair turned out to be simpler than we expected.|修理は、予想していたよりも簡単だと分かりました。|turn out well / turn out to be useful
lex-450|idiom|come across|偶然見つける|I came across the missing receipt while organizing my desk.|机を整理していたときに、紛失していた領収書を偶然見つけました。|come across a useful article / come across an old document
lex-451|idiom|set aside|取っておく・確保する|Please set aside two hours for the staff training session.|社員研修のために、2時間を確保しておいてください。|set aside time / set aside money
lex-452|idiom|pass on|情報などを次の人に伝える|Please pass on these instructions to the evening shift.|この指示を夕方の勤務担当者に伝えてください。|pass on a message / pass on information
lex-453|idiom|check in|宿泊・搭乗などの受付をする|Guests can check in at the hotel after three o'clock.|宿泊客は、3時以降にホテルでチェックインできます。|check in at the hotel / check in for a flight
lex-454|idiom|check out|宿泊施設の退出手続きをする|Please check out by noon to avoid an additional charge.|追加料金を避けるため、正午までにチェックアウトしてください。|check out of a hotel / check out early
lex-455|idiom|pick up|受け取りに行く・迎えに行く|You can pick up your rental car beside the terminal.|ターミナルの横で、レンタカーを受け取れます。|pick up a package / pick up a passenger
lex-456|idiom|drop off|届けて置く・車で送り届ける|The shuttle will drop off passengers outside the main entrance.|シャトルバスは、正面入口の外で乗客を降ろします。|drop off a parcel / drop off passengers
lex-457|idiom|round trip|往復|The fare covers a round trip between the airport and downtown.|その運賃には、空港と中心街の間の往復が含まれています。|a round-trip ticket / book a round trip
lex-458|idiom|connecting flight|乗り継ぎ便|Our connecting flight departs from the same terminal this evening.|乗り継ぎ便は、今晩同じターミナルから出発します。|catch a connecting flight / miss a connecting flight
lex-459|idiom|boarding pass|搭乗券|Please have your boarding pass ready before entering the security area.|保安検査区域に入る前に、搭乗券を準備してください。|print a boarding pass / a mobile boarding pass
lex-460|idiom|baggage claim|手荷物受取所|A driver will meet you just outside baggage claim.|運転手が手荷物受取所のすぐ外でお迎えします。|proceed to baggage claim / the baggage claim area
lex-461|idiom|lead time|発注から納品などまでの所要期間|Custom furniture requires a lead time of approximately six weeks.|特注家具は、発注から納品までおよそ6週間かかります。|a short lead time / reduce lead time
lex-462|idiom|quality control|品質管理|The new production line includes several quality control checkpoints.|新しい生産ラインには、品質管理の確認工程がいくつか設けられています。|quality control procedures / a quality control team
lex-463|idiom|assembly line|組立ライン|Workers inspect each unit before it leaves the assembly line.|作業員は、各製品が組立ラインを出る前に検査します。|an automated assembly line / work on an assembly line
lex-464|idiom|raw materials|原材料|Rising costs for raw materials have affected our production budget.|原材料の価格上昇が、当社の生産予算に影響しています。|source raw materials / the cost of raw materials
lex-465|idiom|cash flow|現金収支・資金の流れ|Faster invoice processing should improve the company's cash flow.|請求書処理の迅速化によって、会社の資金の流れが改善するはずです。|positive cash flow / improve cash flow
lex-466|idiom|market share|市場占有率|The new product helped the company gain market share overseas.|新製品によって、同社は海外の市場占有率を高めました。|increase market share / a decline in market share
lex-467|idiom|operating costs|事業運営にかかる費用|Energy savings have reduced operating costs at our largest factory.|省エネルギーによって、当社最大の工場の運営費が減りました。|lower operating costs / annual operating costs
lex-468|idiom|balance sheet|貸借対照表|The balance sheet lists the company's assets and liabilities.|貸借対照表には、会社の資産と負債が記載されています。|prepare a balance sheet / review the balance sheet
lex-469|idiom|purchase order|発注書|Please include the purchase order number on your invoice.|請求書には、発注書の番号を記載してください。|issue a purchase order / a purchase order number
lex-470|idiom|expense report|経費報告書|Submit your expense report with receipts by the fifth.|領収書を添えて、5日までに経費報告書を提出してください。|file an expense report / approve an expense report
lex-471|idiom|service charge|サービス料|A service charge will be added to the final bill.|最終的な請求額にサービス料が加算されます。|include a service charge / a mandatory service charge
lex-472|idiom|security deposit|保証金・敷金|The landlord will return your security deposit after inspecting the apartment.|家主は部屋を点検した後に、敷金を返還します。|pay a security deposit / a refundable security deposit
lex-473|idiom|word of mouth|口コミ|Most new customers hear about our store through word of mouth.|新規顧客の多くは、口コミで当店を知ります。|spread by word of mouth / word-of-mouth recommendations
lex-474|idiom|brand awareness|ブランド認知度|The campaign aims to increase brand awareness among younger shoppers.|このキャンペーンは、若い買い物客の間でブランド認知度を高めることを目指しています。|raise brand awareness / measure brand awareness
lex-475|idiom|target audience|想定する顧客・読者層|We must identify the target audience before designing the advertisement.|広告を制作する前に、対象となる顧客層を特定する必要があります。|reach a target audience / define the target audience
lex-476|idiom|competitive edge|競争上の優位性|Faster delivery gives our company a competitive edge in this market.|より迅速な配送が、この市場で当社の競争上の優位性となっています。|gain a competitive edge / maintain a competitive edge
lex-477|idiom|in response to|～に応じて・～への返答として|We extended opening hours in response to customer requests.|顧客の要望に応じて、営業時間を延長しました。|in response to demand / in response to an inquiry
lex-478|idiom|with the exception of|～を除いて|All branches will open tomorrow, with the exception of the airport location.|空港店を除き、明日はすべての支店が営業します。|with the exception of holidays / with the exception of one item
lex-479|idiom|on average|平均すると|Our team processes fifty service requests per day on average.|当チームは、1日平均50件のサービス依頼を処理しています。|on average per month / cost less on average
lex-480|idiom|in the long run|長い目で見れば|Investing in durable equipment can save money in the long run.|耐久性のある機器に投資すれば、長い目で見て費用を節約できます。|benefit in the long run / more efficient in the long run`.split('\n').map(row=>row.split('|'));
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


