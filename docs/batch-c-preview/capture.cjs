'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {createSiteServer}=require('../../tests/helpers/site-server.cjs');
const label='What should I send in the first message?',answerId='what-should-i-send-in-the-first-message';
const pages=[['faq','/en/faq.html','#'+answerId],['process','/en/what-happens-during-the-visit.html','/en/faq.html#'+answerId]];
const focusInfo=()=>{const e=document.activeElement,r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName,id:e.id,href:e.getAttribute('href'),text:e.textContent.trim(),top:r.top,bottom:r.bottom,visible:r.width>0&&r.height>0&&r.top>=0&&r.bottom<=innerHeight,outline:s.outlineStyle,outlineWidth:s.outlineWidth}};
const metrics=()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,h1s:document.querySelectorAll('h1').length,badImages:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src)});
async function ready(page){await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode().catch(()=>{}))))}
async function checkAnswer(page){
  await page.waitForFunction(id=>location.pathname==='/en/faq.html'&&location.hash==='#'+id&&document.getElementById(id).open,answerId);
  const d=page.locator('#'+answerId);assert.equal(await d.locator('summary').textContent(),label);assert(await d.locator('.faq-answer').isVisible());
  const text=await d.innerText();assert(text.includes("I'd like a private conversation. Please let me know the next step."));assert(text.includes('Do not send passwords, recovery codes, screenshots, legal documents, intimate material or details, or detailed allegations in that first message.'));
  const answer=await d.evaluate(e=>({open:e.open,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,text:e.innerText}));assert(answer.top>=0&&answer.top<200,'answer summary should appear near viewport start');return answer;
}
async function gallery(){
  const browser=await chromium.launch();try{
    const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
    const url='http://127.0.0.1:8796/_preview/';await page.goto(url,{waitUntil:'networkidle'});assert.equal(await page.locator('main img').count(),8);
    const images=await page.locator('img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0})));assert(images.every(e=>e.loaded));
    for(const href of await page.locator('a').evaluateAll(es=>es.filter(e=>!e.getAttribute('href').startsWith('#')).map(e=>e.href))){const r=await page.request.get(href);assert.equal(r.status(),200)}
    await page.screenshot({path:path.join(__dirname,'review-gallery.png'),fullPage:true});
    const keyboard=[];for(const [index,id] of ['faq','process'].entries()){await page.goto(url,{waitUntil:'networkidle'});for(let n=0;n<=index;n++)await page.keyboard.press('Tab');const f=await page.evaluate(focusInfo);assert.equal(f.href,'#'+id);assert(f.visible&&f.outline!=='none');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#'+id);await page.keyboard.press('Tab');const next=await page.evaluate(focusInfo);assert.equal(next.href,pages[index][1]+'#contact');assert(next.visible);keyboard.push({id,focus:f,next})}
    const widths=[];for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});const m=await page.evaluate(metrics);assert(m.scrollWidth<=m.width+1);widths.push(m)}assert.deepEqual(errors,[]);
    const evidence={status:'PASS',url,images,keyboard,widths,errors};fs.writeFileSync(path.join(__dirname,'gallery-checks.json'),JSON.stringify(evidence,null,2)+'\n');console.log('Batch C gallery PASS:8actual images, links,keyboard,widths.');
  }finally{await browser.close()}
}
(async()=>{
  if(process.argv.includes('--gallery')){await gallery();return}
  const server=createSiteServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port,browser=await chromium.launch();
  const report={capturedAt:new Date().toISOString(),engine:'Chromium',captures:[],flows:[],widthChecks:[],shortPhone:[],print:[],motion:[],linkChecks:[]};
  try{
    const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',colorScheme:'light'});
    for(const [name,route,target] of pages){
      const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});page.on('requestfailed',r=>errors.push(r.url()+' '+r.failure().errorText));
      for(const width of [320,390,768,1440]){
        const device=width===1440?'desktop':'mobile',height=width===390?844:900;await page.setViewportSize({width,height});await page.goto(base+route,{waitUntil:'networkidle'});await ready(page);
        const m=await page.evaluate(metrics);assert(m.scrollWidth<=m.width+1);assert.equal(m.h1s,1);assert.deepEqual(m.badImages,[]);report.widthChecks.push({name,...m});
        const guidance=page.locator('#contact a').filter({hasText:label});assert.equal(await guidance.count(),1);assert.equal(await guidance.getAttribute('href'),target);
        if(width===390||width===1440){await page.screenshot({path:path.join(__dirname,name+'-'+device+'-opening.png')});await page.screenshot({path:path.join(__dirname,name+'-'+device+'-full.png'),fullPage:true})}
        // Real keyboard traversal through skip and primary CTA, then contact guidance.
        await page.keyboard.press('Tab');const skip=await page.evaluate(focusInfo);assert.equal(skip.href,'#main-content');assert(skip.visible&&skip.outline!=='none');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
        await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'#contact');await page.keyboard.press('Enter');await page.waitForFunction(()=>location.hash==='#contact');await page.waitForTimeout(100);
        await page.keyboard.press('Tab');const guidanceFocus=await page.evaluate(focusInfo);assert.equal(guidanceFocus.href,target);assert(guidanceFocus.visible&&guidanceFocus.outline!=='none');
        if(width===390||width===1440)await page.screenshot({path:path.join(__dirname,name+'-'+device+'-contact.png')});
        await page.keyboard.press('Enter');const answer=await checkAnswer(page);await ready(page);
        if(width===390||width===1440){await page.screenshot({path:path.join(__dirname,name+'-'+device+'-guidance.png')});report.captures.push({name,device,width,height,states:['contact before activation','guidance after activation']})}
        await page.goBack({waitUntil:'networkidle'});await page.waitForFunction(r=>location.pathname===r&&location.hash==='#contact',route);await page.waitForTimeout(100);
        const returned=await page.locator('#contact').evaluate(e=>({top:e.getBoundingClientRect().top,height:e.getBoundingClientRect().height}));assert(returned.top>=0&&returned.top<200);
        // The guidance is optional: channels remain independently reachable from contact.
        await guidance.focus();await page.keyboard.press('Tab');const whatsapp=await page.evaluate(focusInfo);assert(/wa\.me/.test(whatsapp.href));assert(whatsapp.visible&&whatsapp.outline!=='none');await page.keyboard.press('Tab');const signal=await page.evaluate(focusInfo);assert(/signal\.me/.test(signal.href));assert(signal.visible&&signal.outline!=='none');
        // Repeat with pointer activation and return, without opening messaging apps.
        await guidance.click();const pointerAnswer=await checkAnswer(page);await page.goBack({waitUntil:'networkidle'});await page.waitForFunction(r=>location.pathname===r&&location.hash==='#contact',route);
        await page.locator('.hero-lead a[href="#contact"]').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#contact');assert(await page.locator('.contact-channels').isVisible());
        report.flows.push({name,width,skip,guidanceFocus,answer,returned,whatsapp,signal,pointerAnswerOpen:pointerAnswer.open,contactReachableAfterReturn:true});
      }
      await page.setViewportSize({width:390,height:667});await page.goto(base+route,{waitUntil:'networkidle'});await ready(page);
      const menu=page.locator('[data-nav-toggle]');await menu.focus();await page.keyboard.press('Enter');assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Tab');const menuFocus=await page.evaluate(focusInfo);assert(menuFocus.visible&&menuFocus.outline!=='none');await page.screenshot({path:path.join(__dirname,name+'-short-menu-focus.png')});await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert(await menu.evaluate(e=>e===document.activeElement));
      await page.locator('.hero-lead a[href="#contact"]').focus();await page.keyboard.press('Enter');await page.waitForTimeout(100);await page.keyboard.press('Tab');const shortFocus=await page.evaluate(focusInfo);assert.equal(shortFocus.href,target);assert(shortFocus.visible&&shortFocus.outline!=='none');await page.screenshot({path:path.join(__dirname,name+'-short-contact.png')});
      await page.keyboard.press('Enter');const shortAnswer=await checkAnswer(page);await page.screenshot({path:path.join(__dirname,name+'-short-guidance.png')});await page.goBack({waitUntil:'networkidle'});await page.locator('.contact-channels a').nth(1).focus();await page.keyboard.press('Shift');const channel=await page.evaluate(focusInfo);assert(channel.visible&&channel.outline!=='none');await page.screenshot({path:path.join(__dirname,name+'-short-contact-actions.png')});report.shortPhone.push({name,menuFocus,shortFocus,answer:shortAnswer,channel});
      const links=await page.locator('a[href]').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),target:e.target,rel:e.rel,text:e.textContent.trim()})));
      for(const href of [...new Set(links.filter(l=>l.href.startsWith('/')).map(l=>l.href))]){const response=await context.request.get(base+href);assert.equal(response.status(),200);report.linkChecks.push({name,href,status:response.status()})}
      for(const l of links.filter(l=>l.href.startsWith('#')))assert.equal(await page.locator(l.href).count(),1,l.href+'missing');const channels=links.filter(l=>/wa\.me|signal\.me/.test(l.href));assert.equal(channels.length,2);for(const l of channels){assert.equal(l.target,'_blank');assert(l.rel.includes('noopener')&&l.rel.includes('noreferrer'))}report.linkChecks.push({name,channels});
      await page.setViewportSize({width:1440,height:900});await page.goto(base+route,{waitUntil:'networkidle'});await page.emulateMedia({media:'print'});await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));
      const print=await page.evaluate(()=>({hiddenSections:[...document.querySelectorAll('main section')].filter(e=>getComputedStyle(e).display==='none').map(e=>e.id),closedDetails:[...document.querySelectorAll('main details')].filter(e=>!e.open).map(e=>e.id),text:document.querySelector('main').innerText}));assert.deepEqual(print.hiddenSections,[]);assert.deepEqual(print.closedDetails,[]);assert(print.text.includes(label));assert(print.text.includes('Do not send passwords, recovery codes, screenshots'));assert(print.text.includes('₪3,600'));await page.locator('#contact').evaluate(e=>e.scrollIntoView());await page.screenshot({path:path.join(__dirname,name+'-print-contact.png')});report.print.push({name,hiddenSections:print.hiddenSections,closedDetails:print.closedDetails,guidanceAndServiceTextVisible:true});await page.evaluate(()=>dispatchEvent(new Event('afterprint')));await page.emulateMedia({media:'screen'});
      const motion=await page.evaluate(()=>({reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,scroll:getComputedStyle(document.documentElement).scrollBehavior,animated:[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).animationName!=='none').length}));assert(motion.reduce);assert.equal(motion.scroll,'auto');report.motion.push({name,...motion});assert.deepEqual(errors,[]);report.captures.filter(c=>c.name===name).forEach(c=>c.errors=errors);await page.close();
    }
    await context.close();report.status='PASS';fs.writeFileSync(path.join(__dirname,'capture-checks.json'),JSON.stringify(report,null,2)+'\n');console.log('Batch C actual browser PASS: both link paths at four widths,keyboard+pointer,Back+channels,shortphone,print,reducedmotion.');
  }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
