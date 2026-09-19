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
