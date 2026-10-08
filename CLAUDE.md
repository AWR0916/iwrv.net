# CLAUDE.md

このリポジトリの規則は `AGENTS.md` にまとめています。Claude（Claude Code、Coworkなど）は作業の前に必ず従ってください。

@AGENTS.md

## 作業を始めるとき（毎回）

1. `git status` で未コミットの変更が無いことを確認する。あれば作業せず利用者に報告する。
2. `git pull --ff-only origin main` で最新にする。失敗したら作業せず利用者に報告する。
3. `git log --oneline -5` で直近の変更を確認する。
4. 編集するファイルを、その場で読み直してから編集する。以前の会話や手元の古いコピーを土台にしない。

## 週次スケジュールの更新

手順は [SCHEDULE_UPDATE_v2.md](SCHEDULE_UPDATE_v2.md) に従います。変更するのは次の3つだけです。

- `data/schedule.json`
- `data/updates.json`
- `index.html` の予備表示（`#issueRange` `#nextOnAir` `#weekPeriod` `#week` `#weekList` `#updatesList`）。ファイル全体を書き直さず、該当箇所だけ置き換える

`data/onair.json` と `images/onair/` は削除済みです。作り直さないでください。

push の前に `git status` と `git diff` を確認し、変更が依頼した範囲だけであることを確かめます。手元にだけ置くファイル（`CODEX_HANDOFF.md`、`GOOGLE_FORM_TEMPLATE.md`、`deploy.ps1`、`deploy.bat`）はコミットしません。
