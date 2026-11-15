// Review-only DOM compositions. Never writes published templates or assets.
import {mkdir,writeFile} from 'node:fs/promises';
import {serve,loadPlaywright} from './lib/serve.mjs';
const out='.artifacts/photography'; await mkdir(out,{recursive:true});
const srv=await serve(); const {chromium}=loadPlaywright();
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
const inventory=[];
try {
for(const width of [320,390,1440]) {
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const slug of ['', 'separation-divorce','business-dispute','inheritance-conflict','about','pricing','how-it-works']) {
  const name=slug||'home'; await page.goto(srv.base+'/en/'+(slug?slug+'/':''),{waitUntil:'networkidle'}); await page.evaluate(async()=>{await document.fonts.ready;window.__photoSourceLoading=new WeakMap();for(const i of document.querySelectorAll('main img')){window.__photoSourceLoading.set(i,{attribute:i.getAttribute('loading'),policy:i.loading});i.loading='eager';await i.decode().catch(()=>{});}});
  await page.screenshot({path:`${out}/${name}-${width}-current.png`,fullPage:true});
  if(name==='home') await page.locator('.hero-image').screenshot({path:`${out}/home-${width}-reference-detail.png`});
  const images=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>!i.src.endsWith('.svg')).map(i=>{const r=i.getBoundingClientRect(),c=getComputedStyle(i);return {src:i.getAttribute('src'),natural:[i.naturalWidth,i.naturalHeight],rendered:[r.width,r.height],x:r.x,y:r.y,objectFit:c.objectFit,objectPosition:c.objectPosition,loading:window.__photoSourceLoading.get(i).policy,loadingAttribute:window.__photoSourceLoading.get(i).attribute,captureLoading:i.loading,priority:i.fetchPriority,widthAttribute:i.getAttribute('width'),heightAttribute:i.getAttribute('height'),alt:i.getAttribute('alt')};}));
  inventory.push({page:name,width,images});
  if(['pricing','how-it-works'].includes(slug)) {
   await page.evaluate(slug=>{
    const f=document.createElement('figure'); f.className='photography-proposal'; f.setAttribute('aria-label','Proposed photographic slot; no photograph selected');
    f.style.cssText='display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;aspect-ratio:3/2;flex:none;margin:24px 0;background:#d9d8d3;border:1px solid #77766f;color:#33332f;font:12px/1.4 Assistant,sans-serif;text-align:center;padding:16px';
    f.innerHTML='PROPOSED '+(slug==='pricing'?'CARD':'SECTION')+' SLOT<br>3:2 · photograph pending';
    if(slug==='pricing')document.querySelector('.pricing-featured-art').replaceWith(f);
    else {const h=document.querySelector('.locked-copy h2'); let last=h;while(last.nextElementSibling&&last.nextElementSibling.tagName!=='H2')last=last.nextElementSibling;last.after(f);}
   },slug);
   await page.screenshot({path:`${out}/${name}-${width}-proposed.png`,fullPage:true});
   const slot=await page.locator('.photography-proposal').boundingBox();
   await page.screenshot({path:`${out}/${name}-${width}-slot-detail.png`,fullPage:true,clip:{x:0,y:Math.max(0,slot.y+await page.evaluate(()=>scrollY)-100),width,height:slot.height+200}});
   const target=page.locator(slug==='pricing'?'.pricing-comparison':'.locked-copy');
   await target.screenshot({path:`${out}/${name}-${width}-composition.png`});
   inventory.push({page:name,width,proposedSlot:await page.locator('.photography-proposal').evaluate(e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height}})});
  }
 }
 await context.close();
}
for(const width of [390,1440]) {
 const page=await browser.newPage({viewport:{width:1320,height:850}});
 const {readFile}=await import('node:fs/promises');
 const entries=[['Current Home reference',`home-${width}-reference-detail.png`],['Proposed Personal Shield',`pricing-${width}-slot-detail.png`],['Proposed How it works',`how-it-works-${width}-slot-detail.png`]];
 let html='<body style="margin:0;padding:24px;background:#eeede9;font:20px Arial"><h1 style="font-size:24px">Geometry review · '+width+'px source viewport · no photos selected</h1><div style="display:flex;gap:20px;align-items:start">';
 for(const [label,file] of entries)html+='<section style="width:410px"><h2 style="font-size:20px">'+label+'</h2><img style="width:100%;display:block" src="data:image/png;base64,'+(await readFile(out+'/'+file)).toString('base64')+'"></section>';
 await page.setContent(html+'</div>');await page.screenshot({path:`${out}/review-${width}.png`,fullPage:true});await page.close();
}
await writeFile(`${out}/geometry.json`,JSON.stringify(inventory,null,2)+'\n');
} finally {await browser.close();srv.close();}
console.log('Photography reference and geometry captures written to '+out);
