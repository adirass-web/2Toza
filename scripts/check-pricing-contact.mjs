import assert from 'node:assert/strict';
import { serve, loadPlaywright } from './lib/serve.mjs';
const server = await serve();
const browser = await loadPlaywright().chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
try {
 for (const width of [320, 390, 768, 1024, 1101, 1200, 1440]) {
  const page = await browser.newPage({viewport:{width,height:800},reducedMotion:'reduce'});
  await page.goto(server.base+'/en/pricing/',{waitUntil:'load'});
  const result=await page.evaluate(async()=>{
   const links=[...document.querySelectorAll('.fixed-contact-icons a')];
   const featured=document.querySelector('.pricing-option--featured');
   const parse = color => (color.match(/[\d.]+/g)||[]).map(Number);
   const lum = color => { const v=parse(color).slice(0,3).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4});return .2126*v[0]+.7152*v[1]+.0722*v[2]; };
   const contrast=(a,b)=>{const l=[lum(a),lum(b)].sort((x,y)=>y-x);return (l[0]+.05)/(l[1]+.05)};
   const base=getComputedStyle(document.documentElement).backgroundColor, dark=getComputedStyle(featured).backgroundColor;
   const metrics=links.map(a=>{const s=getComputedStyle(a),r=a.getBoundingClientRect();return {width:r.width,height:r.height,label:a.getAttribute('aria-label'),background:s.backgroundColor,border:s.borderTopColor,strokeContrast:contrast('rgb(0, 0, 0)',s.backgroundColor),againstDark:Math.max(contrast(s.backgroundColor,dark),contrast(s.borderTopColor,dark)),againstLight:Math.max(contrast(s.backgroundColor,base),contrast(s.borderTopColor,base))}});
   const overlap=[]; const interactive=[...document.querySelectorAll('main a, main summary')]; const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT,{acceptNode(n){return n.textContent.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
   for(let y=0;y<document.documentElement.scrollHeight;y+=240){window.scrollTo(0,y);await new Promise(r=>requestAnimationFrame(r));const controls=links.map(a=>a.getBoundingClientRect());for(const el of interactive){const r=el.getBoundingClientRect();if(r.width&&r.height&&r.bottom>0&&r.top<innerHeight&&controls.some(c=>r.left<c.right&&r.right>c.left&&r.top<c.bottom&&r.bottom>c.top))overlap.push('control: '+el.textContent.trim().slice(0,60));}for(const n of nodes){const range=document.createRange();range.selectNodeContents(n);for(const r of range.getClientRects()){if(!r.width||!r.height||r.bottom<0||r.top>innerHeight)continue;if(controls.some(c=>r.left<c.right&&r.right>c.left&&r.top<c.bottom&&r.bottom>c.top))overlap.push(n.textContent.trim().slice(0,80));}}}
   return {metrics,overlap:[...new Set(overlap)],overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.equal(result.overflow,false,`overflow ${width}`);
  for(const m of result.metrics){assert.ok(m.width>=44&&m.height>=44&&m.label,`target ${width}`);assert.ok(m.background.endsWith(', 1)')||/^rgb\(/.test(m.background),`opaque contact background ${width}: ${m.background}`);assert.ok(m.strokeContrast>=4.5,`glyph contrast ${width}: ${m.strokeContrast}`);assert.ok(m.againstDark>=3&&m.againstLight>=3,`control distinction ${width}: ${JSON.stringify(m)}`)}
  assert.deepEqual(result.overlap,[],`contact controls overlap pricing text at ${width}`);
  await page.keyboard.press('Tab');
  await page.locator('.fixed-contact-icons a').first().focus();
  assert.notEqual(await page.locator('.fixed-contact-icons a').first().evaluate(e=>getComputedStyle(e).outlineStyle),'none',`focus indicator ${width}`);
  await page.locator('.pricing-option--featured').scrollIntoViewIfNeeded();
  await page.screenshot({path:`/tmp/pricing-contacts-${width}.png`});
  await page.close();
 }
 console.log('Contact controls: contrast, 44px targets and unobstructed pricing text pass at 320, 390, 768, 1024, 1101, 1200 and 1440px.');
} finally {await browser.close();server.close()}
