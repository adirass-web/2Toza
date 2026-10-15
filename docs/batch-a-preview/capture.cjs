'use strict';
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { createSiteServer } = require('../../tests/helpers/site-server.cjs');
const pages = [
  ['why', '/en/why-us.html', '#one-person-understands-your-situation-and-does-the-work'],
  ['process', '/en/what-happens-during-the-visit.html', '#your-paid-assessment-inspection-diagnosis-and-urgent-first-aid']
];
(async () => {
  const server = createSiteServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch(); const captures = [];
  try {
    for (const [device,width,height] of [['desktop',1440,900], ['mobile',390,844]]) {
      const context = await browser.newContext({ viewport:{width,height}, colorScheme:'light', reducedMotion:'reduce' });
      for (const [name,route,focus] of pages) {
        const page = await context.newPage(), errors = [];
        page.on('pageerror',error => errors.push(error.message));
        page.on('response',response => { if(response.status() >= 400) errors.push(response.status()+' '+response.url()); });
        const response = await page.goto(base+route,{waitUntil:'networkidle'}); assert.equal(response.status(),200);
        await page.evaluate(() => document.fonts.ready);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(()=>{}))));
        const metrics = await page.evaluate(() => ({ width:document.documentElement.clientWidth, scrollWidth:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight, h1s:document.querySelectorAll('h1').length }));
        assert(metrics.scrollWidth <= metrics.width+1,name+': horizontal overflow'); assert.equal(metrics.h1s,1); assert.deepEqual(errors,[]);
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'.png')});
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'-full.png'),fullPage:true});
        const target = page.locator(focus); assert.equal(await target.count(),1,name+': section anchor');
        await target.scrollIntoViewIfNeeded();
        await page.evaluate(element => window.scrollTo(0,element.getBoundingClientRect().top+window.scrollY-100),await target.elementHandle());
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'-detail.png')});
        captures.push({name,device,route,...metrics,errors}); await page.close();
      }
      await context.close();
    }
    fs.writeFileSync(path.join(__dirname,'capture-checks.json'),JSON.stringify({capturedAt:new Date().toISOString(),captures},null,2)+'\n');
    console.log('Batch A: desktop/mobile openings, full pages and detail captures; no overflow or page/asset errors.');
  } finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
})().catch(error=>{console.error(error);process.exitCode=1});
