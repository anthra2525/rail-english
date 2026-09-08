# Rail English 1.0.0

730点を最初の目標にし、800点台まで段階的に練習するための、無料・オフライン志向の学習アプリ試作品です。

**アプリのコードと公開用ファイルは作成済みですが、公開URLはまだ発行していません。** ZIPのダウンロードだけでiPhoneへのインストールが完了するわけではありません。

## 入っているもの

- オリジナル120問：730／800／800+の3コースに各40問。各コースは短文穴埋め30問＋読解10問です。
- 1回5問または10問。文法／語彙・会議／短文読解で絞り込めます。
- 穴埋めの回答後は、完成した正解文 → 和訳 → 日本語解説を表示します。
- 間違いと「正解したが迷った」を復習対象にします。
- 未出題のみの練習、復習日が来た問題、間違いの即時復習、自由練習に対応します。
- 学習記録、途中の問題と回答、初見と復習の正答率を分けて端末に保存します。
- 学習記録のJSON書き出し／復元、追加問題パックの読み込みに対応します。
- オフラインで必要なファイルが揃ったことを確認してから「オフライン準備完了」と表示します。

コースの難易度は独自の目安です。本試験との統計的な対応づけはしていません。点数を予測したり730点・800点獲得を保証したりするアプリではありません。公式問題は収録していません。リスニング、Part 6の本格演習、長文・模試は初版に含みません。

## まずPCで操作を試す

配布した `Rail-English-Preview.html` を保存し、ChromeやEdgeなどで開きます。問題・解説・画面プログラムを1ファイルに含めています。ブラウザー設定によってファイルからの学習記録保存が制限される場合は警告を表示します。

iPhoneの「ファイル」アプリやチャット内のプレビューでは、JavaScriptが実行されず、操作できない場合があります。このプレビューはiPhoneへのインストール用ではありません。

## 無料で公開する：GitHub Pages

公開ZIP内の `public` フォルダーが公開に必要な完成品です。npmやビルド作業は不要です。

1. PCでGitHubにサインインし、新しいリポジトリを作ります。名前の例は `rail-english`。無料の構成では **Public** を選びます。READMEを追加して作成すると、アップロード画面に進みやすくなります。
2. リポジトリで **Add file → Upload files** を開きます。ZIPそのものではなく、`public` **の中にある** `index.html`、`sw.js`、`manifest.webmanifest`、`icons`フォルダーをアップロードします。リポジトリの最上位に `index.html` が見える状態にします。`.nojekyll` も同梱していますが、これが見えなくても今回の単純な静的ファイル構成には通常支障がありません。
3. **Settings → Pages → Build and deployment** で、**Source: Deploy from a branch**、**Branch: main**、フォルダー **/(root)** を選び、保存します。
4. 公開処理が完了したら、Pages画面に表示されるHTTPSのURLを使います。リポジトリ自体のURLとは別です。独自ドメインや有料プランは不要です。

無料の公開リポジトリではアプリのコードと問題も公開されます。個人の回答履歴はアプリからGitHubへ送信しません。**書き出した学習バックアップをリポジトリにアップロードしないでください。**

この配布物にGitHubのパスワードやトークンを入力する機能はありません。

## iPhoneのホーム画面へ

1. 家のWi-Fiなど通信できる場所で、公開したHTTPSのアプリURLを **Safari** で開きます。
2. 共有メニューから **ホーム画面に追加**。表示される場合は **Webアプリとして開く** をオンにします。
3. ホーム画面に追加した **Rail Englishのアイコンから** アプリを開きます。Safari側で準備済みでも、ホーム画面側で再確認してください。
4. 右上が **オフライン準備完了** になったことを確認します。
5. 機内モードにしてWi-Fiもオフにします。アプリを終了してホーム画面のアイコンから開き直します。
6. 1問解き、解説を確認して「わかった」または「迷った」を押します。もう一度終了・起動し、記録が残ることを確認します。

機内モードで開けないときは、いったん通信を戻し、「設定 → 保存状態を確認する」を押してください。Safariの通常タブではなく、追加したアイコンで確認することが重要です。

## データ保存と費用

学習中にAIや外部のAPIを呼びません。会員登録、広告、アクセス解析、サブスクリプションはありません。初回公開・保存・アプリ更新には通信が必要です。通信料金は利用中の回線契約に従います。

回答はlocalStorage、オフライン起動用のファイルはService WorkerのCache Storageへ保存します。ブラウザーのサイトデータ消去、空き容量不足などでデータが失われる可能性があります。定期的に「設定 → 学習記録を書き出す」で保存してください。

バックアップの復元は現在の学習記録を置き換えます。追加問題パックは既存の記録を残したまま追加します。同じIDの問題は上書きしません。

復習間隔は単純なルールです：間違い・迷いは24時間後。自信を持って連続正解した場合は1日、3日、7日、14日、30日後。医学的・統計的に個人最適化された学習モデルではありません。

## 実施済みのテストと未確認事項

画面操作、正誤判定、迷いの記録、新規／復習の区別、途中再開、バックアップ形式と復元、追加問題と重複ID拒否、保存エラー時の警告、横幅320～1280pxでの横はみ出しなどを自動テストしました。

この作業環境の管理ブラウザーはURLへの移動を禁止しているため、UIテストはローカルHTMLを直接描画し、メモリー内の保存領域を使ったものです。実際のディスクへの永続保存やインストール済みアプリのテストではありません。

オフライン用の処理はNode.jsでCache API、通信断、ワーカー再起動、更新失敗を模擬してテストしました。**iPhone実機、Safari、公開URLでの初回インストール、実際の機内モードでの再起動は未確認です。** 上のiPhone確認手順を公開後に実施してください。

## 開発を続ける場合

ZIPの `source` 内に編集用コードがあります。

- `app.js`：画面、採点、保存、出題、復習。
- `styles.css`：画面デザイン。
- `questions.json`：原稿データ。問題IDは一度使ったら変更しないでください。
- `build_questions.py`：同梱問題を生成する原稿。実行すると `questions.json` を再生成します。
- `build.py`：CSS／JS／問題を `index.html` に埋め込み、アイコンを作成。Python 3とPillowが必要です。
- `sw.js`：オフライン保存とバージョン更新。
- `tests`：テストコードと結果。

編集後は `python build.py` で再生成し、生成した `index.html` と必要ファイルを `public` にコピーします。配布済みのHTMLだけを書き換えても、`build.py` の次回実行で上書きされるため、元のJS/CSS/JSONを編集してください。

更新時は `app.js` のAPP_VERSIONと `sw.js` のVERSIONを必ず両方変更します。sw.jsが変わらなければ、以前のキャッシュが使われ続けることがあります。更新版は全ファイル保存後に待機し、学習中でないときに「設定」で適用できます。バージョンアップ時も保存キーを変更しなければ学習記録を維持します。

PCで実際のService Workerを確認する場合は、`public` をカレントフォルダーにして以下を実行します。

```
python -m http.server 8000
```

PCのブラウザーで `http://localhost:8000/` を開きます。iPhoneからPCのLANアドレスへ単にHTTP接続しただけでは、通常はService Workerの安全なコンテキスト要件を満たしません。iPhoneの試用はHTTPSの公開URLを使ってください。

追加パックの例は `source/example-extra-pack.json` です。この例を読み込むと追加の1問が入ります。本文、選択肢、解説にはHTMLタグではなくプレーンテキストを指定してください。

## 参照した公式資料（2026年9月8日確認）

- Apple：iPhoneのSafariでWebサイトをアプリにする  
  https://support.apple.com/ja-jp/guide/iphone/iphea86e5236/ios
- GitHub：Creating a GitHub Pages site  
  https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub：Configuring a publishing source for your GitHub Pages site  
  https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub：What is GitHub Pages?  
  https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- MDN：Using Service Workers  
  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- MDN：Storage quotas and eviction criteria  
  https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

Rail Englishは独立した非公式の練習用アプリです。TOEICはETSの登録商標です。公式団体の承認・提携を示すものではありません。
