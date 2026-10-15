'use strict';
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { createSiteServer } = require('../../tests/helpers/site-server.cjs');
const pages = [
  ['business', '/en/business-dispute.html', '#put-the-technical-questions-in-experienced-hands', 'confidential documents or plans you intend to keep private', 'closing unwanted shared access and strengthening sign-in and recovery'],
  ['inheritance', '/en/inheritance-clash.html', '#work-through-your-own-access-with-expert-help', 'private correspondence or financial information'],
  ['attorneys', '/en/attorneys.html', '#hands-on-inspection-diagnosis-and-urgent-first-aid', 'The client gains a clearer basis for deciding which technical changes to authorize.']
];
const focusInfo = () => {
  const e=document.activeElement, r=e.getBoundingClientRect(), s=getComputedStyle(e);
  return {tag:e.tagName,text:e.textContent.trim(),id:e.id,href:e.getAttribute('href'),visible:r.width>0&&r.height>0&&r.top>=0&&r.bottom<=innerHeight,outline:s.outlineStyle,outlineWidth:s.outlineWidth,outlineColor:s.outlineColor};
};
(async()=>{
  if(process.argv.includes('--gallery')){
    const browser=await chromium.launch();
    try{
      const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];
      page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
      await page.goto('http://127.0.0.1:8795/_preview/',{waitUntil:'networkidle'});
      assert.equal(await page.locator('main img').count(),6);
      const images=await page.locator('main img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0})));
      assert(images.every(e=>e.loaded));
      for(const a of await page.locator('a').evaluateAll(es=>es.filter(e=>!e.getAttribute('href').startsWith('#')).map(e=>e.href))){const r=await page.request.get(a);assert.equal(r.status(),200)}
      await page.screenshot({path:path.join(__dirname,'review-gallery.png'),fullPage:true});
      const keyboard=[];for(const [index,id] of ['business','inheritance','attorneys'].entries()){
        await page.goto('http://127.0.0.1:8795/_preview/',{waitUntil:'networkidle'});for(let n=0;n<=index;n++)await page.keyboard.press('Tab');
        const focused=await page.evaluate(focusInfo);assert.equal(focused.href,'#'+id);assert(focused.visible);assert.notEqual(focused.outline,'none');
        await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#'+id);await page.keyboard.press('Tab');const next=await page.evaluate(focusInfo);assert.equal(next.href,pages[index][1]);assert(next.visible);keyboard.push({id,controlFocus:focused,nextWorkingPageFocus:next});
      }
      const widths=[];for(const width of [390,768,1440]){await page.setViewportSize({width,height:900});const m=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));assert(m.scrollWidth<=m.width+1);widths.push(m)}
      const desktopInteraction=[];await page.setViewportSize({width:1440,height:900});
      for(const [name,route,detail] of pages){
        await page.goto('http://127.0.0.1:8795'+route,{waitUntil:'networkidle'});await page.keyboard.press('Tab');const skip=await page.evaluate(focusInfo);assert.equal(skip.href,'#main-content');assert(skip.visible);assert.notEqual(skip.outline,'none');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
        await page.keyboard.press('Tab');const primary=await page.evaluate(focusInfo);assert.equal(primary.href,'#contact');assert(primary.visible);assert.notEqual(primary.outline,'none');await page.keyboard.press('Enter');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>location.hash),'#contact');
        const contact=await page.locator('#contact h2').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}));assert(contact.top>=0&&contact.bottom<900);
        await page.screenshot({path:path.join(__dirname,name+'-desktop-contact.png')});
        await page.locator('.page-index a').nth(1).focus();await page.keyboard.press('Enter');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>location.hash),detail);
        desktopInteraction.push({name,skip,primary,contact,assessmentAnchorReached:true});
      }
      assert.deepEqual(errors,[]);
      const file=path.join(__dirname,'capture-checks.json'),report=JSON.parse(fs.readFileSync(file,'utf8'));report.desktopInteraction=desktopInteraction;report.gallery={url:'http://127.0.0.1:8795/_preview/',status:'PASS',images,keyboard,widths,errors};fs.writeFileSync(file,JSON.stringify(report,null,2)+'\n');fs.writeFileSync(path.join(__dirname,'gallery-checks.json'),JSON.stringify(report.gallery,null,2)+'\n');console.log('Batch B gallery PASS: all six images load, all target links respond200, keyboard page anchors, responsive widths; desktop skip/CTA/Assessment anchors PASS.');
    }finally{await browser.close()}
    return;
  }
  const server=createSiteServer(); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port, browser=await chromium.launch();
  const report={capturedAt:new Date().toISOString(),engine:'Chromium',captures:[],widthChecks:[],interactionChecks:[],linkChecks:[],printChecks:[],reducedMotionChecks:[]};
  try {
    const context=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce'});
    for(const [name,route,detail,...copy] of pages){
      const page=await context.newPage(),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
      page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
      page.on('requestfailed',r=>errors.push('failed: '+r.url()+' '+r.failure().errorText));
      for(const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]){
        await page.setViewportSize({width,height});
        const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
        await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
        for(const text of copy)assert((await page.locator('main').textContent()).includes(text),name+': approved copy missing '+text);
        const metrics=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1s:document.querySelectorAll('h1').length,bodyFont:getComputedStyle(document.querySelector('.hero-lead p:not(.hero-kicker)')).fontSize,fonts:[...new Set([...document.querySelectorAll('main *')].map(e=>getComputedStyle(e).fontFamily))],headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({tag:e.tagName,text:e.textContent.trim(),size:getComputedStyle(e).fontSize}))}));
        assert(metrics.scrollWidth<=metrics.width+1,name+': overflow');assert.equal(metrics.h1s,1);
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'.png')});
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'-full.png'),fullPage:true});
        const target=page.locator(detail);assert.equal(await target.count(),1,name+': detail anchor');
        await target.evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-100));
        await page.screenshot({path:path.join(__dirname,name+'-'+device+'-detail.png')});
        report.captures.push({name,device,route,...metrics});
      }
      for(const width of [320,390,768,1440]){
        await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'networkidle'});
        const metrics=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,sectionCount:document.querySelectorAll('main section').length,hiddenSections:[...document.querySelectorAll('main section')].filter(e=>e.getBoundingClientRect().height===0).map(e=>e.id),badImages:[...document.images].filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.src)}));
        assert(metrics.scrollWidth<=metrics.width+1,name+' '+width+': overflow');assert.deepEqual(metrics.hiddenSections,[]);assert.deepEqual(metrics.badImages,[]);
        report.widthChecks.push({name,...metrics});
      }
      const links=await page.locator('a[href]').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),target:e.target,rel:e.rel,text:e.textContent.trim()})));
      for(const href of [...new Set(links.filter(l=>l.href.startsWith('/')).map(l=>l.href))]){
        const resp=await context.request.get(base+href);assert.equal(resp.status(),200,name+': broken '+href);report.linkChecks.push({name,href,status:resp.status()});
      }
      for(const link of links.filter(l=>l.href.startsWith('#')))assert(await page.locator(link.href).count(),name+': absent '+link.href);
      const channels=links.filter(l=>/wa\.me|signal\.me/.test(l.href));assert.equal(channels.length,2);
      for(const l of channels){assert.equal(l.target,'_blank');assert(l.rel.includes('noopener')&&l.rel.includes('noreferrer'))}
      report.linkChecks.push({name,contactDestinations:channels});
      await page.setViewportSize({width:390,height:667});await page.goto(base+route,{waitUntil:'networkidle'});
      await page.keyboard.press('Tab');const skip=await page.evaluate(focusInfo);assert.equal(skip.href,'#main-content');assert(skip.visible);assert.notEqual(skip.outline,'none');
      await page.screenshot({path:path.join(__dirname,name+'-mobile-skip-focus.png')});
      await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>location.hash),'#main-content');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
      const menu=page.locator('[data-nav-toggle]');await menu.focus();await page.keyboard.press('Enter');assert.equal(await menu.getAttribute('aria-expanded'),'true');assert(await page.locator('#site-menu').isVisible());
      await page.keyboard.press('Tab');const menuFocus=await page.evaluate(focusInfo);assert(menuFocus.visible);assert.notEqual(menuFocus.outline,'none');
      await page.screenshot({path:path.join(__dirname,name+'-mobile-menu-focus.png')});
      await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-nav-toggle')),true);
      await page.locator('.hero-lead a[href="#contact"]').focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>location.hash==='#contact');await page.waitForTimeout(100);
      const contact=await page.locator('#contact').evaluate(e=>({top:e.getBoundingClientRect().top,height:e.getBoundingClientRect().height,headerBottom:document.querySelector('header').getBoundingClientRect().bottom,scrollY}));assert(contact.top>=contact.headerBottom-2,name+': heading hidden by header');
      await page.screenshot({path:path.join(__dirname,name+'-mobile-short-contact.png')});
      const channelFocus=[];for(let i=0;i<2;i++){await page.locator('.contact-channels a').nth(i).focus();await page.keyboard.press('Shift');const f=await page.evaluate(focusInfo);assert(f.visible,name+': contact link focus obscured');assert.notEqual(f.outline,'none');channelFocus.push(f)}
      await page.screenshot({path:path.join(__dirname,name+'-mobile-short-contact-actions.png')});
      await page.locator('.page-index a').nth(1).focus();await page.keyboard.press('Enter');await page.waitForFunction(id=>location.hash===id,detail);await page.waitForTimeout(100);
      const anchor=await page.locator(detail).evaluate(e=>({top:e.getBoundingClientRect().top,headerBottom:document.querySelector('header').getBoundingClientRect().bottom}));assert(anchor.top>=anchor.headerBottom-2,name+': assessment anchor obscured');
      report.interactionChecks.push({name,skip,menuFocus,contact,channelFocus,assessmentAnchor:anchor});
      await page.setViewportSize({width:1440,height:900});await page.goto(base+route,{waitUntil:'networkidle'});await page.emulateMedia({media:'print'});
      const printed=await page.evaluate(()=>({hiddenSections:[...document.querySelectorAll('main section')].filter(e=>getComputedStyle(e).display==='none').map(e=>e.id),scrollWidth:document.documentElement.scrollWidth,width:document.documentElement.clientWidth,text:document.querySelector('main').innerText}));assert.deepEqual(printed.hiddenSections,[]);for(const t of copy)assert(printed.text.includes(t));assert(printed.text.includes('₪3,600 including VAT'));assert(printed.text.includes('Suggested message:'));
      await page.screenshot({path:path.join(__dirname,name+'-print-full.png'),fullPage:true});report.printChecks.push({name,hiddenSections:printed.hiddenSections,feeAndContactVisible:true});await page.emulateMedia({media:'screen'});
      const motion=await page.evaluate(()=>({reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior,animated:[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).animationName!=='none').map(e=>({tag:e.tagName,duration:getComputedStyle(e).animationDuration}))}));assert(motion.reduce);assert.equal(motion.scrollBehavior,'auto');report.reducedMotionChecks.push({name,...motion});
      assert.deepEqual(errors,[],name+': errors');report.captures.filter(c=>c.name===name).forEach(c=>c.errors=errors);await page.close();
    }
    await context.close();report.status='PASS';fs.writeFileSync(path.join(__dirname,'capture-checks.json'),JSON.stringify(report,null,2)+'\n');console.log('Batch B rendered checks PASS: three pages, 18 primary captures, 12 width checks, keyboard/menu/anchors/contact/links/print/reduced motion.');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e);process.exitCode=1});
