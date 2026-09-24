import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const src = '/tmp/claude-0/-home-user-nlo/3c673625-3496-52bf-b1af-b58486e554a5/scratchpad/slide-pages';
const dst = '/home/user/nlo/print/slides-png';
const files = fs.readdirSync(src).filter(f=>f.endsWith('.html')).sort();
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1920,height:1080}, deviceScaleFactor:1 });
const p = await ctx.newPage();
for (const f of files) {
  await p.goto('file://'+src+'/'+f);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const sec = p.locator('section');
  const box = await sec.boundingBox();
  const out = dst + '/' + f.replace('.html','.png');
  await sec.screenshot({ path: out });
  console.log(f.padEnd(18), Math.round(box.width)+'x'+Math.round(box.height),
              (fs.statSync(out).size/1024).toFixed(0)+'KB');
}
await b.close();
