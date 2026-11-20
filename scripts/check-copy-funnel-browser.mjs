import assert from 'node:assert/strict';import fs from 'node:fs';import{serve,loadPlaywright}from'./lib/serve.mjs';
const server=await serve();const browser=await loadPlaywright().chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
const captures='.artifacts/copy-funnel/captures';
fs.mkdirSync(captures,{recursive:true});
async function checkTargets(links){
 for(const link of await links.all()){
  assert.ok((await link.boundingBox()).height>=44);
  await link.focus();
  assert.equal(await link.evaluate(el=>el===document.activeElement),true);
 }
}
try{
 for(const width of [390,1440])for(const slug of ['', 'pricing/','separation-divorce/']){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(server.base+'/en/'+slug);
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${slug} overflow ${width}`);
  await checkTargets(page.locator('.messaging-actions a'));
  await page.screenshot({path:`${captures}/${slug.replace('/','')||'home'}-${width}.png`,fullPage:true});
  await page.close();
 }
 for(const width of [320,390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},javaScriptEnabled:false});
  await page.goto(`${server.base}/en/`);
  await page.getByRole('link',{name:'See what your apps can reveal'}).click();
  assert.equal(new URL(page.url()).hash,'#what-apps-reveal');
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`exposure overflow ${width}`);
  const traces=page.locator('#exposure-traces + ul li');
  assert.equal(await traces.count(),3);
  for(const trace of await traces.all()){
   assert.ok(await trace.isVisible());
   assert.ok(await trace.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=17));
  }
  assert.ok(await page.getByText('You might be planning a move.',{exact:true}).isVisible());
  const actions=page.locator('#exposure-contact + p + p a');
  assert.equal(await actions.count(),2);
  await checkTargets(actions);
  await page.screenshot({path:`${captures}/exposure-${width}.png`,fullPage:true});
  await page.getByRole('link',{name:'View the full-size diagram'}).click();
  assert.equal(new URL(page.url()).pathname,'/assets/img/toza-digital-exposure-five-ws.png');
  await page.waitForFunction(()=>document.images[0]?.naturalWidth===1635);
  await page.goBack();
  assert.equal(new URL(page.url()).pathname,'/en/exposure/');
  await page.close();
 }
 console.log('9 captures; no overflow; readable exposure lesson without JavaScript; full-size image and contact links work.');
}finally{await browser.close();server.close()}
