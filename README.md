# ノーリミッツ岡山　告知ページ

GitHub Pages で公開している静的サイト。ビルド不要。

```
index.html                お知らせ一覧（トップ）
seminar-1220/             第6回セミナー LP（2026-12-20）
archive/kosugi-2026/      終了：小杉先生 コンディショニング・整体
assets/                   共有素材（QRコード・写真）
print/                    印刷・サイネージ用の書き出し
build/                    サイネージとポスターの生成スクリプト
```

## 公開

Settings → Pages → Deploy from a branch →
ブランチ `claude/dazzling-allen-wdallb` ／ フォルダ `/ (root)`

- トップ　https://shiori0823.github.io/nlo/
- 第6回セミナー　https://shiori0823.github.io/nlo/seminar-1220/

`.nojekyll` を置いてあるので Jekyll のビルドは走らない。

### 公開されないとき

ビルドもデプロイも成功しているのに
「There isn't a GitHub Pages site here.」と出ることがある。
そのときは Pages の設定を作り直す。

1. Settings → Pages → ブランチの欄で `None` を選ぶ（ここで「保存」が押せるようになる）
2. 保存 → ページを再読み込み
3. ブランチ `claude/dazzling-allen-wdallb` ／ `/ (root)` を選び直して保存

同じ値を選び直すだけでは保存ボタンが押せないので、
いったん `None` を挟むのがコツ。

## 決まりごと

- 色は白地・黒文字、差し色はブランドのオレンジ（`#ea6a1e`）のみ。
  小さい文字のオレンジは `#c2510d`（白地で4.5:1以上）を使う。
- 画像はページと同じ階層に置く。`../assets/` のような書き方はしない
  （公開場所によって表示されなくなるため）。
- 終了したイベントは `archive/` に移し、冒頭に終了バナーと `noindex` を入れる。
