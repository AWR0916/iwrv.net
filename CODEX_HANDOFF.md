# 藍・W・楽歌 Official Site - Codex引き継ぎ書

最終更新: 2026-07-12

## 1. プロジェクト概要

- サイト名: 藍・W・楽歌 Official Site
- 英語名: Ai Winston Rucker
- サイトコンセプト: AWR - After Work Radio
- 目的: YouTubeチャンネル登録、Raidoriファンクラブ登録、企業案件・イベント出演の問い合わせ獲得
- 本番URL: https://iwrv.net/
- GitHub Pages URL: https://awr0916.github.io/iwrv.net/
- GitHubリポジトリ: https://github.com/AWR0916/iwrv.net
- ローカル作業フォルダ: `D:\Document\claudecode\Rucker_website`
- 公開ブランチ: `main` のルート
- 構成: ビルド工程のない静的な単一ページサイト。HTML、CSS、JavaScriptは主に`index.html`内にある。

## 2. 現在の公開状態

2026-07-12時点で以下は完了済み。

- Xserver Domainで`iwrv.net`のDNSをGitHub Pagesへ設定済み
- GitHub PagesのCustom domainは`iwrv.net`
- DNS check successful
- Enforce HTTPS有効
- `www.iwrv.net`は`iwrv.net`へ転送
- OGP画像の共有表示を確認済み
- `robots.txt`と`sitemap.xml`を公開済み
- 正式URL、OGP、フォーム、Raidori、YouTube、X、代表動画、ラジオ番組ページの応答確認済み
- スマホ幅390pxでHeroの表示崩れ、重なり、横はみ出しがないことを確認済み

公開確認先:

- https://iwrv.net/robots.txt
- https://iwrv.net/sitemap.xml
- https://iwrv.net/images/ogp.jpg

## 3. 想定閲覧者

主な閲覧者は30〜50代の大人の趣味層・仕事終わり層。

- 性別不問
- ホワイトカラー中心
- 一部、企業・芸能・イベント・制作関係者
- ラジオ、音楽、レトロゲーム、旅行、街歩き、歴史、地理、雑学、懐かしいカルチャーに関心がある
- 強いオタク感、過度なアイドル感、内輪ノリ、派手なVTuber演出には距離を置く
- 投げ銭よりも、納得感のある応援、イベント参加、グッズ購入、ファンクラブ加入に向く

## 4. デザイン方針

- 大人向けカルチャー誌、深夜ラジオ番組、仕事終わりの寄り道場所の空気感
- 黒、アイボリー、金、控えめな紫を中心とする
- 落ち着き、信頼感、読みやすさを優先
- 明朝体、紙面風の構成を活用
- スマホ表示を最優先
- 余白を取りすぎず、情報を整理する
- 初見で何をしている人か分かる構成にする
- 企業担当者が依頼しやすい導線を維持する

避けるもの:

- 過度なネオン、サイバー風一辺倒
- ピンク・水色中心の若年VTuber風
- 萌え・アイドル感の強い演出
- 英語だけのラベルが多いUI
- 内輪ノリの強い文言
- 長すぎる設定資料
- カードの中にカードを重ねる構成
- 情報の重複

## 5. 作業時の必須ルール

変更時は必ず以下を行う。

1. 現在の`index.html`を確認する
2. 変更前に問題点を短く整理する
3. HTML/CSSの構文を壊さない
4. スマホ表示を最優先する
5. 変更内容を箇条書きで報告する
6. 変更したファイルを明記する
7. 画像パス、リンク切れ、タグ閉じ忘れを確認する

追加ルール:

- 既存のデザイン方針と文章のトーンを維持する
- 無関係なリファクタリングをしない
- GitHubへ反映する前に`git status`で対象を確認する
- 画像パスはGitHub Pages上で大文字・小文字を区別する
- ユーザーが作成した変更を勝手に戻さない
- 公開後は`https://iwrv.net/`で確認する

## 6. 現在のページ構成

`index.html`は次の順序。

1. Hero `#top`
2. Profile `#profile`
3. Contents `#contents`
4. Radio Program `#radio-program`
5. Archive `#archive`
6. On Air Schedule `#onair`
7. Xへの案内 `#news`
8. Club `#club`
9. Business `#business`
10. Activity History `#activity`
11. Contact `#contact`
12. Lore `#lore`
13. Footer

上部メニューは日本語中心。

- ホーム
- プロフィール
- コンテンツ
- ラジオ
- アーカイブ
- スケジュール
- X
- ファンクラブ
- 案件のご相談
- 問い合わせ

## 7. 重要な実装判断

### Hero

- Heroにプロフィール名・読み仮名・肩書きを重複表示しない
- Heroのプロフィール重複情報はProfileへ集約
- ON AIR / Today's Contentsは小型タグ表示
- HeroタグはContentsと統一: AlternativeRadio / Music / Retro Game / Voice Drama / Vlog
- Hero立ち絵は枠なし、背景透明、`object-fit: contain`
- CTAはYouTubeとRaidori

### Profile

- Music表記は`the pillows、ロックンロール、懐メロ`の順
- 右側はVRoid Hubのiframeではなく、冬服3Dモデルの固定立ち絵
- VRoid Hub埋め込みは接続拒否が発生したため撤去済み。再追加しない
- 表示画像: `images/ai-winston-rucker-model-winter.png`

### Contents

現在の5項目を維持する。

- AlternativeRadio
- Music
- Retro Game
- Voice Drama
- Vlog

`AWRはサイトコンセプト`という説明を各所で繰り返さない。

### Radio Program

- AlternativeRadioは実際に運用しているラジオ番組
- 毎週月曜21:00よりYouTubeで生放送
- 番組ページは外部Wixサイト

### Archive

代表動画は次の3件。

- ラジオ傑作回: https://youtube.com/live/Mut930hbo2o?feature=share
- 歌ってみた: https://youtu.be/vtPU41os7r4
- 自由研究Vlog: https://youtu.be/Jf48xivIlcQ

### On Air Schedule

- 4枚の予定カードは削除済み
- 毎週作成するスケジュール画像を大きく表示する
- 表示内容は`data/onair.json`から読み込む
- 現在の画像: `images/onair/2026-07-week-2.png`
- 詳細な更新手順は`SCHEDULE_UPDATE.md`を参照

### X / News

- X APIや投稿埋め込みは使わない
- 固定のフォロー導線のみ表示
- Instagramは使用しない

### Club

現在の文章:

> Raidoriでは、日常ブログや限定配信、握手会など特典が沢山！
> 藍・W・楽歌をもっとディープに楽しみたい方はこちらへ。

### Activity History

- Profile内からBusinessの近くへ移動済み
- 実績として見せる
- 主要イベント3件は外部リンク付き

### Lore

- ページ下部に置く
- 折りたたみ表示を維持する
- ProfileやHeroより前へ移動しない

## 8. 主要URL

- 正式サイト: https://iwrv.net/
- GitHub: https://github.com/AWR0916/iwrv.net
- YouTube: https://www.youtube.com/@i_w_r_v
- X: https://x.com/i_w_r_v
- Raidori: https://raidori.com/@i_w_r_v
- Googleフォーム: https://forms.gle/tPc6XtXfbnA2iaT76
- AlternativeRadio: https://a1wruck3r2025.wixsite.com/irwv

実績リンク:

- 大規模声劇: https://youtube.com/live/6nmy546cdV4?feature=share
- リアルイベント出演: https://x.com/oiranoitalian/status/2006562075074875672?s=20
- リアルライブ出演予定: https://x.com/BirdlimeTrap/status/2068650138445504903?s=20

## 9. 主要ファイル

- `index.html`: サイト本体。CSSとJavaScriptも内包
- `CNAME`: `iwrv.net`
- `robots.txt`: 全ページのクロールを許可し、サイトマップを指定
- `sitemap.xml`: 正式URLを登録
- `data/onair.json`: 週次スケジュール表示データ
- `SCHEDULE_UPDATE.md`: スケジュール画像更新手順
- `GOOGLE_FORM_TEMPLATE.md`: 問い合わせフォーム項目の控え
- `images/ogp.jpg`: OGP画像、1200x630
- `images/ai-winston-rucker-main.PNG`: Hero立ち絵。拡張子の大文字に注意
- `images/ai-winston-rucker-model-winter.png`: Profileの冬服3Dモデル固定画像
- `images/onair/`: 週次スケジュール画像

リポジトリ直下の`ai-winston-rucker-main.PNG`は過去から残っている重複ファイル。現在のHTMLは`images/ai-winston-rucker-main.PNG`を参照する。必要性を確認せず削除しない。

## 10. OGP / SEO

- canonical: `https://iwrv.net/`
- og:url: `https://iwrv.net/`
- og:image: `https://iwrv.net/images/ogp.jpg`
- OGP画像サイズ: 1200x630
- OGPはサイト本文には表示されず、X、Discord、LINEなどでURLを共有した際のカード画像として表示される
- OGPの反映確認済み
- `robots.txt`と`sitemap.xml`は公開済み

次の推奨作業はGoogle Search Consoleへの`iwrv.net`登録と、`https://iwrv.net/sitemap.xml`の送信。

## 11. 週次スケジュール更新

ユーザーは毎週「この画像をスケジュールに設定して」と画像を送る運用を希望している。

更新時:

1. 画像を`images/onair/`へ週ごとの新しいファイル名で追加
2. `data/onair.json`の`period`、`image`、`alt`、`note`を更新
3. ローカルで画像パスとJSON構文を確認
4. コミットして`main`へpush
5. `https://iwrv.net/`で表示確認

同じ画像名を上書きしない。ブラウザキャッシュで古い画像が残るのを防ぐため。

## 12. Git運用

作業前:

```powershell
git status --short --branch
git pull --ff-only origin main
```

作業後:

```powershell
git status --short
git add <変更したファイル>
git commit -m "変更内容を表すメッセージ"
git push origin main
```

- リモート: `https://github.com/AWR0916/iwrv.net.git`
- GitHub Pagesは`main`ルートから自動公開
- push後は数十秒ほどデプロイ待ちになる場合がある
- force push、reset --hard、既存変更の巻き戻しは行わない

## 13. 最終確認項目

公開前・公開後に以下を確認する。

- HTMLの主要タグの開始・終了数
- `href="#"`が残っていないこと
- ローカル画像がすべて存在すること
- `data/onair.json`がJSONとして読み込めること
- `sitemap.xml`がXMLとして妥当であること
- Heroと主要CTAが390px幅で収まること
- Googleフォーム、Raidori、YouTube、X、代表動画が開くこと
- OGP画像が200応答すること
- `robots.txt`と`sitemap.xml`が200応答すること
- Git作業ツリーがクリーンであること

## 14. 次のアクション

最優先:

1. Google Search Consoleに`iwrv.net`をドメインプロパティとして追加
2. Xserver DomainへSearch Console指定のTXTレコードを追加
3. 所有権確認後、`https://iwrv.net/sitemap.xml`を送信

その後:

- 毎週のスケジュール画像更新
- Search Consoleでインデックス状況を確認
- YouTube登録、Raidori登録、問い合わせ導線の改善を実績データに基づいて検討

## 15. 新しいCodexタスクへの開始指示

新しいタスクでは、最初に以下を行う。

1. この`CODEX_HANDOFF.md`を読む
2. `index.html`を確認する
3. `git status --short --branch`を確認する
4. `git pull --ff-only origin main`で同期する
5. 変更前に問題点と作業範囲をユーザーへ短く報告する

この文書より、実際の最新ファイルとユーザーの最新指示を優先する。
