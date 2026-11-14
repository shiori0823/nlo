# 第6回セミナー（12/20）デジタルサイネージ用 PNG

1920×1080px・7枚。白地・黒文字、差し色はブランドのオレンジのみ。
最小文字サイズは30px（50代・老眼でも読める想定）。

| ファイル | 内容 |
| --- | --- |
| 01-cover.png | 表紙。日時・会場・講師 |
| 02-worry.png | 共感パート（4つの悩み） |
| 03-outcome.png | 得られる3つのこと＋特典 |
| 04-price.png | 参加費（メンバー3,300／一般5,500）＋特典 |
| 05-personal.png | 当日限定45分パーソナル（時間枠・料金） |
| 06-pack.png | 年間6本セット（19,800／29,800・視聴期限2027.3.31） |
| 07-apply.png | 申し込み。QRはSquare決済ページ |

## QRコード

`assets/qr-square-1220.png` → https://square.link/u/9tAu5zzr
誤り訂正レベルH。書き出し後のPNGから実際に読み取れることを確認済み。

LPを公開したら、QRの飛び先をLPに差し替えることもできる。
その場合は `build/seminar1220-collateral.mjs` の URL を変えて作り直す。

## 作り直し方

```
node build/seminar1220-collateral.mjs   # HTMLを生成（フォントは実体を埋め込み）
node <scratchpad>/s1220/render.mjs      # PNGとPDFを書き出し
```
