// Geometry and copy-preserving static layout checks, plus review captures.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {serve,loadPlaywright} from './lib/serve.mjs';
const out='.artifacts/preline';await mkdir(out,{recursive:true});
const server=await serve();
const browser=await loadPlaywright().chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
const metrics=[];
try {
 for(const width of [320,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',javaScriptEnabled:false});
  for(const slug of ['about','pricing']){
   await page.goto(server.base+'/en/'+slug+'/',{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${slug} overflow ${width}`);
   if(slug==='pricing'){
    const cards=await page.locator('.pricing-option').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width}}));
    assert.equal(new Set(cards.map(c=>Math.round(c.y))).size,width>=1280?1:3,`pricing row count ${width}`);
    if(width>=1280)assert.ok(Math.max(...cards.map(c=>c.width))-Math.min(...cards.map(c=>c.width))<1,'equal cards');
    await page.locator('.pricing-inclusions summary').first().click();
    assert.equal(await page.locator('.pricing-inclusions').first().getAttribute('open'),'','native no-JS disclosure');
    await page.locator('.pricing-inclusions summary').first().click();
    metrics.push({slug,width,cards});
   }else{
    const image=await page.locator('.expert-portrait img').evaluate(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,fit:getComputedStyle(e).objectFit}});
    assert.ok(image.naturalWidth>0, "portrait loaded");assert.equal(image.naturalWidth,image.naturalHeight);assert.equal(image.width,image.height);assert.ok(image.width<=320);
    assert.equal(await page.locator('.expert-intro h1').count(),1);assert.equal(await page.locator('.expert-intro h2').count(),0);
    metrics.push({slug,width,image});
   }
   await page.screenshot({path:`${out}/${slug}-${width}.png`,fullPage:true});
   await page.locator(slug==='pricing'?'.pricing-comparison':'.expert-intro').screenshot({path:`${out}/${slug}-${width}-grid.png`});
  }
  await page.close();
 }
 await writeFile(`${out}/geometry.json`,JSON.stringify(metrics,null,2)+'\n');
 console.log('Preline grids: 320/390/768/1024/1440px geometry, uncropped existing portrait and native no-JS disclosures pass; captures written.');
}finally{await browser.close();server.close()}
