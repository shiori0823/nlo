import fs from 'fs';
import path from 'path';

const OUT = '/tmp/claude-0/-home-user-nlo/3c673625-3496-52bf-b1af-b58486e554a5/scratchpad/s1220';
const REPO = '/home/user/nlo';

const C = {
  ink: '#111418',
  sub: '#3C4248',
  orange: '#EA6A1E',
  oink: '#C2510D',
  tint: '#F7F4F0',
  wash: '#FDEEE2',
  rule: '#DDD8D2',
  paper: '#FFFFFF',
};

const b64 = f => fs.readFileSync(f).toString('base64');
const stage = 'data:image/jpeg;base64,' + b64(REPO + '/assets/sato/stage.jpg');
const deadlift = 'data:image/jpeg;base64,' + b64(REPO + '/assets/sato/deadlift.jpg');
const qr = 'data:image/png;base64,' + b64(OUT + '/qr-square.png');

const ZK = "'Zen Kaku Gothic New', Verdana, sans-serif";
const OS = "'Oswald', Arial, sans-serif";

/* ---------- サイネージ 1920x1080 ---------- */

const badge = (t, size = 34) =>
  `<p style="align-self:start;border:5px solid ${C.orange};color:${C.ink};font-size:${size}px;font-weight:900;letter-spacing:5px;line-height:1.3;padding:10px 28px;border-radius:2px">${t}</p>`;

const slides = [];

// 01 表紙
slides.push({ id: '01-cover', note: '表紙。日時と会場を大きく。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:28px">
  ${badge('勝ち筋をつくるトレーニング講座　第6回・最終回')}
  <h1 style="font-size:80px;font-weight:900;line-height:1.28;color:${C.ink}">今年の努力を、<br>来年の結果に<br>つなげる60分。</h1>
  <div style="border-top:6px solid ${C.ink};padding-top:26px;display:flex;flex-direction:row;align-items:baseline;gap:24px">
    <p style="font-family:${OS};font-size:92px;font-weight:700;line-height:1.05;color:${C.oink}">12.20</p>
    <p style="font-size:44px;font-weight:900;color:${C.oink}">（日）10:30〜11:30</p>
  </div>
  <p style="font-size:38px;font-weight:700;line-height:1.5;color:${C.ink}">会場：ノーリミッツ岡山（対面開催）<br>講師：オーナー 佐藤亮太</p>
</div>
<div style="width:560px;display:flex;flex-direction:column;gap:12px">
  <img src="${stage}" style="width:560px;height:747px;object-fit:cover;border-radius:4px">
  <p style="font-size:22px;font-weight:500;color:#6F757B">Photo: SAMURAI POWERLIFTING MEDIA</p>
</div>` });

// 02 悩み
const worry = t => `<li style="display:flex;flex-direction:row;gap:22px;align-items:flex-start;font-size:40px;font-weight:700;line-height:1.5;color:${C.ink}"><span style="flex:none;width:20px;height:20px;margin-top:18px;background:${C.orange};border-radius:2px"></span><span>${t}</span></li>`;
slides.push({ id: '02-worry', note: '共感パート。4つに絞る。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:34px">
  ${badge('こんなことはありませんか？')}
  <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:26px">
    ${worry('今年も頑張ったけれど、どれだけ成長したのかわからない')}
    ${worry('目標を立てても、途中で曖昧になってしまう')}
    ${worry('練習の結果に一喜一憂し、モチベーションが安定しない')}
    ${worry('来年こそ結果を出したいけれど、何から始めればいいかわからない')}
  </ul>
  <p style="font-size:46px;font-weight:900;line-height:1.5;color:${C.ink};border-left:14px solid ${C.orange};padding-left:28px;margin-top:10px">振り返りは、反省するためのものではありません。<br>次の行動を決めるためのものです。</p>
</div>` });

// 03 得られる3つ
const point = (n, h, b) => `
<div style="flex:1;background:${C.tint};border-top:10px solid ${C.orange};border-radius:4px;padding:40px 34px;display:flex;flex-direction:column;gap:18px">
  <p style="font-family:${OS};font-size:56px;font-weight:700;line-height:1;color:${C.oink}">${n}</p>
  <h3 style="font-size:40px;font-weight:900;line-height:1.4;color:${C.ink}">${h}</h3>
  <p style="font-size:30px;font-weight:500;line-height:1.65;color:${C.sub}">${b}</p>
</div>`;
slides.push({ id: '03-outcome', note: 'ベネフィット3つ。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:40px">
  ${badge('このセミナーで得られる3つのこと')}
  <div style="flex:1;display:flex;flex-direction:row;gap:32px">
    ${point('1', '正しい振り返りの方法がわかる', 'できたこと・改善点を整理する方法を学び、自分の成長と課題を明確にします。')}
    ${point('2', '来年の目標が具体的になる', '「強くなりたい」を、目指す結果と現在地から具体的な目標に落とし込みます。')}
    ${point('3', '次の練習でやることが決まる', '目標を立てて終わりにしません。次の練習から取り組むことまで決めます。')}
  </div>
  <p style="font-size:38px;font-weight:900;line-height:1.5;color:${C.ink}">参加特典：振り返り＆目標設定ワークシート</p>
</div>` });

// 04 参加費
slides.push({ id: '04-price', note: '単発の参加費。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:38px">
  ${badge('参加費')}
  <div style="display:flex;flex-direction:row;gap:36px">
    <div style="flex:1;border:7px solid ${C.orange};border-radius:4px;padding:46px 40px;display:flex;flex-direction:column;gap:14px">
      <p style="font-size:34px;font-weight:900;letter-spacing:4px;color:${C.oink}">メンバー</p>
      <p style="display:flex;align-items:baseline;gap:14px"><span style="font-family:${OS};font-size:104px;font-weight:700;line-height:1;color:${C.ink}">3,300</span><span style="font-size:36px;font-weight:700;color:${C.ink}">円（税込）</span></p>
    </div>
    <div style="flex:1;border:3px solid ${C.rule};border-radius:4px;padding:46px 40px;display:flex;flex-direction:column;gap:14px">
      <p style="font-size:34px;font-weight:900;letter-spacing:4px;color:${C.sub}">一般</p>
      <p style="display:flex;align-items:baseline;gap:14px"><span style="font-family:${OS};font-size:104px;font-weight:700;line-height:1;color:${C.ink}">5,500</span><span style="font-size:36px;font-weight:700;color:${C.ink}">円（税込）</span></p>
    </div>
  </div>
  <div style="background:${C.wash};border-radius:4px;padding:36px 40px;display:flex;flex-direction:column;gap:12px">
    <p style="font-size:30px;font-weight:900;letter-spacing:4px;color:${C.oink}">参加特典</p>
    <p style="font-size:40px;font-weight:900;line-height:1.45;color:${C.ink}">振り返り＆目標設定ワークシート</p>
    <p style="font-size:30px;font-weight:500;line-height:1.6;color:${C.sub}">今年の振り返りから来年の目標、次の行動までを整理できます。</p>
  </div>
  <p style="font-size:34px;font-weight:700;line-height:1.5;color:${C.sub}">対象：競技種目を問わず、スポーツに取り組む方。はじめての方も参加できます。</p>
</div>` });

// 05 パーソナル
const slot = (n, t) => `<li style="display:flex;flex-direction:row;align-items:baseline;gap:16px;background:${C.paper};border-radius:4px;padding:18px 26px"><span style="font-size:32px;font-weight:900;color:${C.oink}">${n}</span><span style="font-family:${OS};font-size:44px;font-weight:700;color:${C.ink}">${t}</span></li>`;
slides.push({ id: '05-personal', note: '当日限定パーソナル。先着4名。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:30px">
  <div style="display:flex;flex-direction:row;align-items:center;gap:28px">
    <p style="background:${C.orange};color:${C.ink};font-size:34px;font-weight:900;letter-spacing:5px;padding:12px 30px;border-radius:2px">当日限定</p>
    <h1 style="font-size:72px;font-weight:900;line-height:1.2;color:${C.ink}"><span style="font-family:${OS};color:${C.oink}">45</span>分パーソナル</h1>
    <p style="font-size:40px;font-weight:900;color:${C.oink}">先着4名</p>
  </div>
  <p style="font-size:34px;font-weight:500;line-height:1.6;color:${C.sub}">あなたのトレーニング内容をもとに、重量設定・プログラム・フォームを個別に確認します。</p>
  <div style="flex:1;display:flex;flex-direction:row;gap:36px">
    <div style="flex:1;background:${C.wash};border-radius:4px;padding:34px;display:flex;flex-direction:column;gap:16px">
      <p style="font-size:30px;font-weight:900;letter-spacing:4px;color:${C.oink}">時間枠（各45分）</p>
      <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px">
        ${slot('①', '12:00〜12:45')}
        ${slot('②', '12:50〜13:35')}
        ${slot('③', '13:40〜14:25')}
        ${slot('④', '14:30〜15:15')}
      </ul>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:20px">
      <div style="border:7px solid ${C.orange};border-radius:4px;padding:28px 32px;display:flex;flex-direction:row;align-items:baseline;gap:18px">
        <span style="font-size:32px;font-weight:900;color:${C.oink}">メンバー</span>
        <span style="font-family:${OS};font-size:72px;font-weight:700;line-height:1;color:${C.ink}">5,000</span>
        <span style="font-size:30px;font-weight:700;color:${C.ink}">円（税込）</span>
      </div>
      <div style="border:3px solid ${C.rule};border-radius:4px;padding:28px 32px;display:flex;flex-direction:row;align-items:baseline;gap:18px">
        <span style="font-size:32px;font-weight:900;color:${C.sub}">一般</span>
        <span style="font-family:${OS};font-size:72px;font-weight:700;line-height:1;color:${C.ink}">7,000</span>
        <span style="font-size:30px;font-weight:700;color:${C.ink}">円（税込）</span>
      </div>
      <p style="font-size:30px;font-weight:500;line-height:1.6;color:${C.sub}">重量設定の見直し／プログラムの調整／フォーム確認と改善アドバイス</p>
      <p style="font-size:36px;font-weight:900;line-height:1.5;color:${C.oink}">先着順で受付いたします。<br>受付スタッフまたは佐藤オーナーまで。</p>
    </div>
  </div>
</div>` });

// 06 年間6本セット
slides.push({ id: '06-pack', note: '年間6本セット（アーカイブ）。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:30px">
  ${badge('年間6本セット')}
  <h1 style="font-size:72px;font-weight:900;line-height:1.3;color:${C.ink}">1年分の講座を、まとめて。</h1>
  <p style="font-size:34px;font-weight:500;line-height:1.65;color:${C.sub}">ベンチプレス、スクワット、デッドリフト、ピーキング、試合設計、そして今回の振り返りまで。<br>今年おこなった全6回を、アーカイブでご覧いただけます。</p>
  <div style="display:flex;flex-direction:row;gap:36px">
    <div style="flex:1;border:7px solid ${C.orange};border-radius:4px;padding:34px 36px;display:flex;flex-direction:column;gap:10px">
      <p style="font-size:32px;font-weight:900;letter-spacing:4px;color:${C.oink}">メンバー</p>
      <p style="display:flex;align-items:baseline;gap:12px"><span style="font-family:${OS};font-size:88px;font-weight:700;line-height:1;color:${C.ink}">19,800</span><span style="font-size:32px;font-weight:700;color:${C.ink}">円（税込）</span></p>
    </div>
    <div style="flex:1;border:3px solid ${C.rule};border-radius:4px;padding:34px 36px;display:flex;flex-direction:column;gap:10px">
      <p style="font-size:32px;font-weight:900;letter-spacing:4px;color:${C.sub}">一般</p>
      <p style="display:flex;align-items:baseline;gap:12px"><span style="font-family:${OS};font-size:88px;font-weight:700;line-height:1;color:${C.ink}">29,800</span><span style="font-size:32px;font-weight:700;color:${C.ink}">円（税込）</span></p>
    </div>
  </div>
  <div style="background:${C.tint};border-left:14px solid ${C.orange};border-radius:4px;padding:30px 34px;display:flex;flex-direction:column;gap:10px">
    <p style="font-size:36px;font-weight:900;line-height:1.5;color:${C.ink}">12月20日に来られない方も、このセットならアーカイブで観られます。</p>
    <p style="font-size:30px;font-weight:500;line-height:1.6;color:${C.sub}">アーカイブの視聴期限は2027年3月31日です。</p>
  </div>
</div>` });

// 07 申し込み
slides.push({ id: '07-apply', note: '申し込み。QRはSquareの決済ページ。', html: `
<div style="flex:1;display:flex;flex-direction:column;gap:26px">
  ${badge('お申し込み')}
  <h1 style="font-size:76px;font-weight:900;line-height:1.3;color:${C.ink}">今年を振り返り、<br>来年の勝ち筋をつくろう。</h1>
  <div style="border-top:6px solid ${C.ink};padding-top:24px;display:flex;flex-direction:row;align-items:baseline;gap:22px">
    <p style="font-family:${OS};font-size:80px;font-weight:700;line-height:1.05;color:${C.oink}">12.20</p>
    <p style="font-size:40px;font-weight:900;color:${C.oink}">（日）10:30〜11:30</p>
  </div>
  <p style="font-size:38px;font-weight:700;line-height:1.55;color:${C.ink}">メンバー 3,300円／一般 5,500円（税込）<br>会場：ノーリミッツ岡山</p>
  <p style="font-size:34px;font-weight:900;line-height:1.55;color:${C.ink};background:${C.wash};border-radius:4px;padding:24px 30px">受付スタッフ・佐藤オーナーへお声がけいただくか、<br>右のQRコードからお申し込みください。</p>
</div>
<div style="width:520px;display:flex;flex-direction:column;align-items:center;gap:20px;background:${C.tint};border-radius:4px;padding:44px 36px">
  <p style="font-size:34px;font-weight:900;letter-spacing:4px;color:${C.oink}">スマホで読み取り</p>
  <img src="${qr}" style="width:400px;height:400px;image-rendering:pixelated">
  <p style="font-size:30px;font-weight:700;line-height:1.5;color:${C.ink};text-align:center">お申し込みページが開きます</p>
</div>` });

/* ---------- A4ポスター ---------- */

const posterBody = `
<header class="top">
  <p class="series">勝ち筋をつくるトレーニング講座　第6回・最終回</p>
  <p class="gym">ノーリミッツ岡山<small>NO LIMITS OKAYAMA</small></p>
</header>

<h1>今年の努力を、<br>来年の結果につなげる60分。</h1>
<p class="lead">モチベーションに左右されない、正しい振り返りのやり方と目標の決め方。</p>

<div class="when">
  <p class="d">12.20</p>
  <div class="wtxt">
    <p class="w1">（日）10:30〜11:30</p>
    <p class="w2">会場：ノーリミッツ岡山（対面開催）／講師：オーナー 佐藤亮太</p>
  </div>
</div>

<div class="three">
  <div><p class="n">1</p><p class="t">正しい振り返り方が<br>わかる</p></div>
  <div><p class="n">2</p><p class="t">来年の目標が<br>具体的になる</p></div>
  <div><p class="n">3</p><p class="t">次の練習でやることが<br>決まる</p></div>
</div>
<p class="gift">参加特典：振り返り＆目標設定ワークシート</p>

<div class="pricerow">
  <div class="pc member"><p class="who">メンバー</p><p class="v">3,300<small>円（税込）</small></p></div>
  <div class="pc general"><p class="who">一般</p><p class="v">5,500<small>円（税込）</small></p></div>
  <div class="qr">
    <img src="${qr}">
    <p>QRから<br>お申し込み</p>
  </div>
</div>

<div class="opt">
  <div class="opt-h"><span class="tag">当日限定</span><span class="oh">45分パーソナル</span><span class="lim">先着4名</span></div>
  <p class="opt-b">重量設定・プログラム・フォームを個別に確認します。　時間枠：12:00〜／12:50〜／13:40〜／14:30〜（各45分）</p>
  <p class="opt-p">メンバー 5,000円／一般 7,000円（税込）　※セミナーとは別のお申し込みです</p>
</div>

<div class="opt pack">
  <div class="opt-h"><span class="tag">年間6本セット</span><span class="oh">1年分の講座を、まとめて。</span></div>
  <p class="opt-b">今年おこなった全6回をアーカイブで視聴できます。12月20日に来られない方も、こちらで観られます。</p>
  <p class="opt-p">メンバー 19,800円／一般 29,800円（税込）　※視聴期限 2027年3月31日</p>
</div>

<div class="teacher">
  <img src="${stage}">
  <div>
    <p class="tl">講師</p>
    <p class="tn">佐藤亮太<span>ノーリミッツ岡山 オーナー</span></p>
    <p class="tb">トレーニングの結果を次の成長につなげるために必要な、振り返りと目標設定の考え方をお伝えします。競技種目や経験年数は問いません。はじめての方もご参加いただけます。</p>
  </div>
</div>

<footer class="bottom">
  <p>お申し込み・ご相談は、受付スタッフまたは佐藤オーナーまでお気軽にどうぞ。</p>
</footer>`;

const posterCss = `
@page{ size:A4 portrait; margin:0; }
html,body{ margin:0; padding:0; background:#fff; }
body{
  width:210mm; height:297mm; padding:13mm 13mm 11mm;
  box-sizing:border-box; display:flex; flex-direction:column;
  color:${C.ink}; font-family:${ZK}; font-weight:500;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
*{ box-sizing:border-box; }
p{ margin:0; }
h1{ margin:0; }

.top{ display:flex; align-items:center; gap:4mm; margin-bottom:5mm; }
.series{
  border:1.1mm solid ${C.orange}; color:${C.ink};
  font-size:11pt; font-weight:900; letter-spacing:.08em;
  padding:1.8mm 4mm; line-height:1.3;
}
.gym{ margin-left:auto; text-align:right; font-size:11pt; font-weight:900; line-height:1.35; }
.gym small{ display:block; font-size:7pt; font-weight:500; color:${C.sub}; letter-spacing:.1em; }

h1{ font-size:28pt; font-weight:900; line-height:1.3; margin-bottom:2.5mm; }
.lead{ font-size:12pt; font-weight:700; line-height:1.6; color:${C.sub}; margin-bottom:4mm; }

.when{
  display:flex; align-items:center; gap:6mm;
  border-top:1.4mm solid ${C.ink}; border-bottom:.3mm solid ${C.rule};
  padding:3mm 0; margin-bottom:4mm;
}
.when .d{ font-family:${OS}; font-size:40pt; font-weight:700; line-height:1; color:${C.oink}; }
.when .w1{ font-size:17pt; font-weight:900; line-height:1.3; color:${C.oink}; }
.when .w2{ font-size:10.5pt; font-weight:700; line-height:1.5; color:${C.ink}; margin-top:1mm; }

.three{ display:flex; gap:3.5mm; margin-bottom:3mm; }
.three > div{
  flex:1; background:${C.tint}; border-top:1.6mm solid ${C.orange};
  padding:3mm 3.5mm 3.5mm; display:flex; flex-direction:column; gap:1.5mm;
}
.three .n{ font-family:${OS}; font-size:19pt; font-weight:700; line-height:1; color:${C.oink}; }
.three .t{ font-size:11pt; font-weight:900; line-height:1.45; }
.gift{ font-size:10.5pt; font-weight:900; line-height:1.5; margin-bottom:4mm; }

.pricerow{ display:flex; gap:3.5mm; align-items:stretch; margin-bottom:4mm; }
.pc{ flex:1; padding:4mm 4.5mm; display:flex; flex-direction:column; justify-content:center; gap:1mm; }
.pc.member{ border:1.2mm solid ${C.orange}; }
.pc.general{ border:.4mm solid ${C.rule}; }
.pc .who{ font-size:10pt; font-weight:900; letter-spacing:.1em; color:${C.sub}; }
.pc.member .who{ color:${C.oink}; }
.pc .v{ font-family:${OS}; font-size:30pt; font-weight:700; line-height:1.05; }
.pc .v small{ font-family:${ZK}; font-size:9.5pt; font-weight:700; margin-left:1.5mm; }
.qr{
  width:36mm; background:${C.tint}; padding:3mm 2mm;
  display:flex; flex-direction:column; align-items:center; gap:1.5mm;
}
.qr img{ width:27mm; height:27mm; image-rendering:pixelated; display:block; }
.qr p{ font-size:8pt; font-weight:900; line-height:1.4; text-align:center; color:${C.ink}; }

.opt{ border:.4mm solid ${C.rule}; padding:3mm 4mm; margin-bottom:3mm; }
.opt.pack{ background:${C.tint}; border-color:${C.tint}; }
.opt-h{ display:flex; align-items:center; gap:3mm; margin-bottom:2mm; }
.opt-h .tag{
  background:${C.orange}; color:${C.ink}; font-size:9.5pt; font-weight:900;
  letter-spacing:.08em; padding:1.2mm 3mm; line-height:1.3;
}
.opt-h .oh{ font-size:14pt; font-weight:900; line-height:1.3; }
.opt-h .lim{ font-size:11pt; font-weight:900; color:${C.oink}; }
.opt-b{ font-size:9.5pt; font-weight:500; line-height:1.6; color:${C.sub}; margin-bottom:1.5mm; }
.opt-p{ font-size:11pt; font-weight:900; line-height:1.5; color:${C.ink}; }

.teacher{ display:flex; gap:5mm; align-items:flex-start; margin-top:3mm; }
.teacher img{ width:28mm; height:36mm; object-fit:cover; object-position:50% 30%; display:block; flex:none; }
.teacher .tl{ font-size:8.5pt; font-weight:900; letter-spacing:.14em; color:${C.oink}; margin-bottom:1.5mm; }
.teacher .tn{ font-size:16pt; font-weight:900; line-height:1.3; margin-bottom:2mm; }
.teacher .tn span{ display:block; font-size:9.5pt; font-weight:700; color:${C.sub}; margin-top:.8mm; }
.teacher .tb{ font-size:9.5pt; font-weight:500; line-height:1.65; color:${C.sub}; }

.bottom{ margin-top:auto; border-top:.4mm solid ${C.rule}; padding-top:2.5mm; }
.bottom p{ font-size:9.5pt; font-weight:700; line-height:1.5; color:${C.sub}; }
`;

/* ---------- フォントのサブセット埋め込み ---------- */

function textOf(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, '');
}

async function fontCss(chars) {
  const text = encodeURIComponent([...new Set(chars)].join(''));
  const fams = 'family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Oswald:wght@500;600;700';
  const url = `https://fonts.googleapis.com/css2?${fams}&display=block&text=${text}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
  if (!res.ok) throw new Error('fonts css ' + res.status + ' ' + (await res.text()).slice(0, 200));
  let css = await res.text();
  const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [])];
  if (!urls.length) throw new Error('no font urls');
  for (const u of urls) {
    const r = await fetch(u);
    if (!r.ok) throw new Error('font ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    css = css.split(u).join('data:font/woff2;base64,' + buf.toString('base64'));
  }
  return css;
}

/* ---------- 書き出し ---------- */

const allText = textOf(slides.map(s => s.html).join('') + posterBody) + '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const css = await fontCss(allText);
console.log('font css bytes:', css.length);

fs.mkdirSync(OUT + '/pages', { recursive: true });
for (const s of slides) {
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>
${css}
html,body{margin:0;padding:0;background:#fff}
section{width:1920px;height:1080px;box-sizing:border-box;position:relative;overflow:hidden}
section *{box-sizing:border-box}
section h1,section h2,section h3,section p,section ul,section ol,section li{margin:0}
</style></head><body><section style="background:${C.paper};color:${C.ink};font-family:${ZK};padding:88px;display:flex;flex-direction:row;align-items:center;gap:56px">
${s.html}
</section></body></html>`;
  fs.writeFileSync(`${OUT}/pages/${s.id}.html`, html);
}

const poster = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<title>勝ち筋をつくるトレーニング講座 第6回 ポスター（A4）</title>
<style>${css}${posterCss}</style></head><body>${posterBody}</body></html>`;
fs.writeFileSync(REPO + '/print/poster-seminar1220-a4.html', poster);

console.log('slides:', slides.length, '／poster written');
