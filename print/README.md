# print

## flyer-a4.pdf — A4チラシ（白地・黒文字・オレンジ）

スライド7枚目（開催概要・申込み）をA4縦（210×297mm）に再構成したものです。
そのまま印刷・コンビニプリント・入稿に使えます。

- 用紙：A4 縦／余白なし設定で等倍印刷（「用紙に合わせる」は選ばない）
- 色：白地＋黒文字、強調のみオレンジ `#E35C0A`
- QRコード：`assets/qr-lp-black.png`（読み取り先 https://shiori0823.github.io/nlo/ ）

## 作り直す場合

`flyer-a4.html` が元データです。書体は本文に埋め込んであるため、
ネット接続がなくても同じ見た目で開けます。編集後、PDFを作り直すには：

```sh
node -e "
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+process.cwd()+'/print/flyer-a4.html');
await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:'print/flyer-a4.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
await b.close();})()"
```

ブラウザで `flyer-a4.html` を開いて「印刷 → PDFに保存」でも同じものが作れます。
その際は余白を「なし」、背景グラフィックを「あり」にしてください。

## slides-png/ — ジム広告スライド（PNG）

ジムのディスプレイ用スライド7枚を、1920×1080px のPNGで書き出したものです。
デジタルサイネージやSNS投稿にそのまま使えます。

| ファイル | 内容 |
| --- | --- |
| `01-cover.png` | タイトル・日程 |
| `02-worries.png` | こんなお悩みありませんか？ |
| `03-outcome.png` | このイベントで得られること |
| `04-teacher.png` | 小杉先生だからこそ |
| `05-plans.png` | 3つの参加方法・料金 |
| `06-voices.png` | 参加された方の声 |
| `07-apply.png` | 開催概要・QRコード |

ファイル名の番号が表示順です。スライドの内容を変更したあとPNGを作り直す場合は、
Artifact側のスライドを更新してから書き出し直してください。

## poster-trial-a3.pdf — トライアルキャンペーン ポスター（A3・屋外掲示）

ジムの前に掲示し、通りがかりの人に読んでもらう前提のポスター。

- 用紙：A3 縦（297×420mm）／余白なし設定で等倍印刷
- 色：白地＋黒文字、強調は赤枠 `#C8102E`、金額の一部に濃い青 `#0B5FA5`
- 掲示期限：2026年12月31日（キャンペーン終了日）
- CTA：見学予約のQR（大／Square予約ページ）とホームページのQR（小）
  - `assets/qr-booking.png` … https://book.squareup.com/appointments/wt2javqwtod98y/location/3D1YXSYDHHNYE/services
  - `assets/qr-hp-okayama.png` … https://nolimits-gym-okayama.com/
- 屋外掲示のため、ラミネート加工または屋外用メディアでの出力を推奨

`poster-trial-a3.html` が元データ。書体は埋め込み済みで、
作り直す手順は flyer-a4.pdf と同じ。

## poster-trial-a4x4.pdf — A3ポスターのA4×4分割版

A3が印刷できない環境向け。A4を4枚印刷して貼り合わせると、正確にA3になる。

### 継ぎ目の位置

絵柄を切らないよう、要素の隙間に継ぎ目を通している。

- 縦の継ぎ目：**x=185mm**（写真の右端182.7mmと、会員の声の左端187.7mmの間）
- 横の継ぎ目：**y=160mm**（料金欄の下端157.8mmと、写真の上端162.8mmの間）

集合写真・QRコード2つは、いずれも1枚の紙の中に収まっていて分断されない。
継ぎ目が横切るのは、申し込み枠の枠線と最下部の区切り線だけ。

| ページ | 位置 | タイル寸法 | A4上の余白 |
| --- | --- | --- | --- |
| 1／4 | 左上 | 195×170mm | 左右7.5mm |
| 2／4 | 右上 | 112×170mm | 左右49mm |
| 3／4 | 左下 | 195×260mm | 左右7.5mm |
| 4／4 | 右下 | 112×260mm | 左右49mm |

のりしろは10mm。枠線＝切り取り線。枠の外（ページ番号・注意書き）は切り落とされる。

### 貼り合わせ手順

1. A4・**等倍（100%）**で4枚印刷する。「用紙に合わせる」は必ずオフ
2. 4枚とも、細い枠線に沿って4辺を切り落とす
3. 上の段：左上に右上を10mm重ねて貼る（右が上）
4. 下の段：左下に右下を同様に貼る
5. 上の段の下に、下の段を10mm重ねて貼る（下が上）

左右の余白が7.5mmのページがあるため、余白5mm以上で印刷できるプリンタが必要。

元データは `poster-trial-a4x4.html`（`poster-trial-a3.html` から生成）。
継ぎ目の位置は生成スクリプト内の `SX` `SY` `OV` で変更できる。
