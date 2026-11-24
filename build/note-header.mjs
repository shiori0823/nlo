import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';

const REPO = '/home/user/nlo';
const OUT = '/tmp/claude-0/-home-user-nlo/3c673625-3496-52bf-b1af-b58486e554a5/scratchpad/ogp';

const C = { ink: '#111418', sub: '#3C4248', faint: '#6F757B', orange: '#EA6A1E', oink: '#C2510D', tint: '#F7F4F0' };
const ZK = "'Zen Kaku Gothic New', Verdana, sans-serif";
const OS = "'Oswald', Arial, sans-serif";
const walk = 'data:image/jpeg;base64,' + fs.readFileSync(REPO + '/assets/sato/walk.jpg').toString('base64');

const body = `
<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:26px;min-width:0">
  <p style="display:flex;align-items:center;gap:14px;font-size:19px;font-weight:900;letter-spacing:4px;color:${C.oink};line-height:1">
    <span style="width:34px;height:4px;background:${C.orange};flex:none"></span>NO LIMITS OKAYAMA｜佐藤亮太
  </p>
  <h1 style="font-size:58px;font-weight:900;line-height:1.35;letter-spacing:-.01em">強くなるために、<br>大切なものを<br>犠牲にしなくていい。</h1>
  <div style="display:flex;align-items:center;gap:18px;border-top:5px solid ${C.ink};padding-top:22px">
    <span style="font-family:${OS};font-size:54px;font-weight:700;line-height:1">180<span style="font-size:.52em">kg</span></span>
    <span style="font-size:34px;font-weight:900;color:${C.orange};line-height:1">→</span>
    <span style="font-family:${OS};font-size:54px;font-weight:700;line-height:1;color:${C.oink}">80<span style="font-size:.52em">kg</span></span>
    <span style="font-size:22px;font-weight:700;line-height:1.5;color:${C.sub};margin-left:6px">僕が失ったものと、<br>手に入れたもの。</span>
  </div>
</div>
<div style="width:420px;flex:none;align-self:stretch;position:relative">
  <img src="${walk}" style="width:100%;height:100%;object-fit:cover;object-position:50% 18%;display:block">
</div>`;

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

const css = await fontCss(body.replace(/<[^>]*>/g, '').replace(/\s+/g, '') + 'kgNOLIMITSOKAYAMAPhotoSAMURWEDI0123456789');

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>${css}
html,body{margin:0;padding:0;background:#fff}
section{width:1280px;height:670px;box-sizing:border-box;overflow:hidden}
section *{box-sizing:border-box}
section h1,section p{margin:0}
</style></head><body><section style="font-family:${ZK};color:${C.ink};background:#fff;padding:0 0 0 64px;display:flex;flex-direction:row;align-items:stretch;gap:52px">${body}</section></body></html>`;

fs.writeFileSync(OUT + '/note-header.html', html);

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 670 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto('file://' + OUT + '/note-header.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
const over = await p.evaluate(() => { const s = document.querySelector('section'); return (s.scrollWidth - s.clientWidth) + '/' + (s.scrollHeight - s.clientHeight); });
const to = REPO + '/note/header-01.jpg';
await p.locator('section').screenshot({ path: to, type: 'jpeg', quality: 90 });
console.log('note/header-01.jpg', (fs.statSync(to).size / 1024).toFixed(0) + 'KB', 'はみ出し', over);
await b.close();
