const fs=require('node:fs');
const {chromium}=require('/workspace/toza-release/node_modules/@playwright/test');
const path=require('node:path');
const md=new(require('/workspace/toza-release/node_modules/markdown-it'))();
const source=fs.readFileSync(path.join(__dirname,'../pricing.md'),'utf8').split('## Hero\n\n')[1];
const expected=md.parse(source,{}).filter(t=>t.type==='inline').map(t=>t.content.replace(/ \{#[\w-]+\}/g,'')).map(x=>md.renderInline(x));
(async()=>{
 const browser=await chromium.launch({headless:true});
 const results=[];
 for(const width of [1440,390,320]) {
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+': '+r.url());});
  await page.goto('http://127.0.0.1:8794/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const sourceIntegrity=await page.evaluate(expected=>{
   const normalize=x=>x.replace(/\s+/g,' ').trim();
   const actual=normalize(document.querySelector('main').textContent);let cursor=0;const failures=[];
   for(const raw of expected){const node=document.createElement('div');node.innerHTML=raw;const text=normalize(node.textContent);const at=actual.indexOf(text,cursor);if(at<0)failures.push(text);else cursor=at+text.length;}return {blocks:expected.length,failures};
  },expected);
  if(sourceIntegrity.failures.length)throw Error('Source order/content mismatch '+JSON.stringify(sourceIntegrity));
  const stats=await page.evaluate(()=>({
   width:innerWidth,scrollWidth:document.documentElement.scrollWidth,fullHeight:document.documentElement.scrollHeight,
   visibleWords:document.querySelector('main').innerText.trim().split(/\s+/).length,
   totalWords:document.querySelector('main').textContent.trim().split(/\s+/).length,
   tableDisplay:getComputedStyle(document.querySelector('.p-matrix')).display,
   headerClip:getComputedStyle(document.querySelector('.p-matrix thead')).clipPath,
   rowDisplay:getComputedStyle(document.querySelector('.p-matrix tbody tr')).display,
   columns:document.querySelector('.p-matrix').rows[0].cells.length,
   tableWidth:document.querySelector('.p-matrix').getBoundingClientRect().width,
   matrixRows:document.querySelector('.p-matrix').tBodies[0].rows.length,
   explicitHeaders:[...document.querySelectorAll('.p-matrix tbody tr')].every((r,i)=>[...r.querySelectorAll('td')].every((td,j)=>td.getAttribute('headers')===`p-label-${i} p-col-${j+1}`)),
   assessmentOutcomesVisible:document.querySelector('.p-assessment-outcomes').innerText.includes('whether or not you continue')&&document.querySelector('.p-assessment-outcomes').innerText.includes('Four hours is not an automatic cutoff'),
   disclosures:document.querySelectorAll('details').length,
   headings:[...document.querySelectorAll('h1')].map(x=>x.textContent),
   actions:[...document.querySelectorAll('.contact-channels a')].map(x=>({text:x.textContent,height:x.getBoundingClientRect().height})),
   footerHeight:document.querySelector('footer').getBoundingClientRect().height,
   duplicateIDs:[...document.querySelectorAll('[id]')].map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i)
  }));
  if((width>640&&(stats.tableDisplay!=='table'||stats.rowDisplay!=='table-row'))||(width<=640&&(stats.tableDisplay!=='block'||stats.rowDisplay!=='grid'))||stats.headerClip!=='none'||stats.scrollWidth>width||!stats.explicitHeaders||!stats.assessmentOutcomesVisible||stats.matrixRows!==12||stats.columns!==3||errors.length||stats.duplicateIDs.length)throw Error(JSON.stringify({stats,errors}));
  await page.screenshot({path:path.join(__dirname,`screenshots/pricing-${width}-full.png`),fullPage:true});
  await page.screenshot({path:path.join(__dirname,`screenshots/pricing-${width}-viewport.png`)});
  await page.evaluate(()=>scrollTo(0,0));
  const matrixRect=await page.locator('.p-matrix').evaluate(x=>{const r=x.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height};});
  await page.screenshot({path:path.join(__dirname,`screenshots/matrix-${width}.png`),fullPage:true,clip:matrixRect});
  if(width<760){await page.evaluate(()=>scrollTo(0,document.querySelector('.p-row-6').getBoundingClientRect().top+scrollY));const stickyTop=await page.locator('.p-matrix thead').evaluate(x=>x.getBoundingClientRect().top);if(Math.abs(stickyTop)>1)throw Error('Mobile header not sticky');await page.evaluate(()=>scrollTo(0,0));}
  await page.locator('.p-journey').screenshot({path:path.join(__dirname,`screenshots/journey-${width}.png`)});
  await page.goto('http://127.0.0.1:8794/#full-services',{waitUntil:'networkidle'});
  const creditBeforeMatrix=await page.evaluate(()=>{const note=document.querySelector('.p-credit-note'),table=document.querySelector('.p-matrix');return Boolean(note.compareDocumentPosition(table)&Node.DOCUMENT_POSITION_FOLLOWING)&&note.getBoundingClientRect().bottom<=table.getBoundingClientRect().top;});
  if(!creditBeforeMatrix)throw Error('Direct comparison entry sees balance before condition');
  await page.locator('.p-hero a[href="#credit"]').click();
  await page.waitForFunction(()=>document.getElementById('credit').open);
  if(!await page.locator('#credit').evaluate(x=>x.open))throw Error('Credit reference did not open from link');
  await page.locator('#credit summary').focus();await page.keyboard.press('Enter');
  if(await page.locator('#credit').evaluate(x=>x.open))throw Error('Native keyboard toggle failed');
  await page.locator('.p-hero a[href="#credit"]').click();
  if(!await page.locator('#credit').evaluate(x=>x.open))throw Error('Repeated same-hash credit link failed');
  await page.locator('#credit summary').click();
  await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
  if(!await page.locator('details').evaluateAll(xs=>xs.every(x=>x.open)))throw Error('Print disclosure omitted');
  await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
  if(await page.locator('#credit').evaluate(x=>x.open))throw Error('Print state not restored');
  results.push({...stats,sourceIntegrity,creditBeforeMatrix,errors,creditLink:'PASS',nativeKeyboard:'PASS',printExpansion:'PASS'});
  await page.close();
 }
 fs.writeFileSync(path.join(__dirname,'checks.json'),JSON.stringify({status:'PASS',results},null,2)+'\n');
 await browser.close();console.log(JSON.stringify(results,null,2));
})();
