import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';

const REPO = '/home/user/nlo';
const OUT = '/tmp/claude-0/-home-user-nlo/3c673625-3496-52bf-b1af-b58486e554a5/scratchpad/ogp';

const C = { ink: '#111418', sub: '#3C4248', orange: '#EA6A1E', oink: '#C2510D', tint: '#F7F4F0', wash: '#FDEEE2', rule: '#DDD8D2' };
const ZK = "'Zen Kaku Gothic New', Verdana, sans-serif";
const OS = "'Oswald', Arial, sans-serif";
const stage = 'data:image/jpeg;base64,' + fs.readFileSync(REPO + '/assets/sato/stage.jpg').toString('base64');

const cards = [
  {
    id: 'og-seminar',
    to: REPO + '/seminar-1220/og.jpg',
    html: `
<div style="flex:1;display:flex;flex-direction:column;gap:22px;justify-content:center">
  <p style="align-self:start;border:4px solid ${C.orange};font-size:21px;font-weight:900;letter-spacing:3px;padding:7px 18px;line-height:1.3">勝ち筋をつくるトレーニング講座　第6回・最終回</p>
  <h1 style="font-size:54px;font-weight:900;line-height:1.3">今年の努力を、<br>来年の結果につなげる60分。</h1>
  <div style="border-top:5px solid ${C.ink};padding-top:18px;display:flex;align-items:baseline;gap:16px">
    <span style="font-family:${OS};font-size:62px;font-weight:700;line-height:1;color:${C.oink}">12.20</span>
    <span style="font-size:28px;font-weight:900;color:${C.oink}">（日）10:30〜11:30</span>
  </div>
  <p style="font-size:24px;font-weight:700;line-height:1.5;color:${C.sub}">ノーリミッツ岡山（対面開催）／講師：オーナー 佐藤亮太</p>
</div>
<img src="${stage}" style="width:330px;height:470px;object-fit:cover;object-position:50% 25%;border-radius:3px">`,
  },
  {
    id: 'og-top',
    to: REPO + '/og.jpg',
    html: `
<div style="flex:1;display:flex;flex-direction:column;gap:26px;justify-content:center">
  <p style="font-size:26px;font-weight:900;line-height:1.4">ノーリミッツ岡山<span style="display:block;font-size:17px;font-weight:500;letter-spacing:4px;color:${C.sub};margin-top:2px">NO LIMITS OKAYAMA</span></p>
  <h1 style="font-size:66px;font-weight:900;line-height:1.3;border-top:5px solid ${C.ink};padding-top:22px">お知らせ</h1>
  <div style="display:flex;flex-direction:column;gap:12px">
    <p style="display:flex;align-items:center;gap:14px;font-size:27px;font-weight:900;line-height:1.5"><span style="background:${C.orange};font-size:19px;letter-spacing:2px;padding:5px 14px;line-height:1.3">募集中</span>12/20 セミナー 第6回・最終回</p>
    <p style="display:flex;align-items:center;gap:14px;font-size:27px;font-weight:900;line-height:1.5"><span style="background:${C.wash};color:${C.oink};font-size:19px;letter-spacing:2px;padding:5px 14px;line-height:1.3">12/31まで</span>トライアルキャンペーン</p>
  </div>
</div>
<img src="${stage}" style="width:330px;height:470px;object-fit:cover;object-position:50% 25%;border-radius:3px">`,
  },
];

async function fontCss(chars) {
  const text = encodeURIComponent([...new Set(chars)].join(''));
  const url = `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Oswald:wght@500;600;700&display=block&text=${text}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
  if (!res.ok) throw new Error('fonts css ' + res.status);
  let css = await res.text();
  for (const u of [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [])]) {
    const r = await fetch(u);
    css = css.split(u).join('data:font/woff2;base64,' + Buffer.from(await r.arrayBuffer()).toString('base64'));
  }
  return css;
}

const text = cards.map(c => c.html).join('').replace(/<[^>]*>/g, '').replace(/\s+/g, '') + '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const css = await fontCss(text);

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
for (const c of cards) {
  const f = `${OUT}/${c.id}.html`;
  fs.writeFileSync(f, `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>${css}
html,body{margin:0;padding:0;background:#fff}
section{width:1200px;height:630px;box-sizing:border-box;overflow:hidden}
section *{box-sizing:border-box}
section h1,section p{margin:0}
</style></head><body><section style="font-family:${ZK};color:${C.ink};padding:56px 60px;display:flex;flex-direction:row;align-items:center;gap:44px">${c.html}</section></body></html>`);
  await p.goto('file://' + f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const over = await p.evaluate(() => { const s = document.querySelector('section'); return (s.scrollWidth - s.clientWidth) + '/' + (s.scrollHeight - s.clientHeight); });
  await p.locator('section').screenshot({ path: c.to, type: 'jpeg', quality: 88 });
  console.log(c.to.replace(REPO, ''), (fs.statSync(c.to).size / 1024).toFixed(0) + 'KB', 'はみ出し', over);
}
await b.close();
