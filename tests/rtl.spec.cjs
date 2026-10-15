const fs = require('node:fs');
const {expect,test} = require('@playwright/test');
const {createSiteServer} = require('./helpers/site-server.cjs');
const {pages,md} = require('../scripts/accepted-copy.cjs');
let server,siteUrl;
test.beforeAll(async()=>{
  server=createSiteServer();
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  siteUrl='http://127.0.0.1:'+server.address().port;
});
test.afterAll(async()=>{if(server) await new Promise(resolve=>server.close(resolve));});
const normalize=s=>s.replace(/\s+/g,' ').trim();
async function noOverflow(page) {
  const b=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  expect(b.scroll).toBeLessThanOrEqual(b.client+1);
}
for(const copy of pages()) test('accepted copy, metadata and layout: '+copy.route,async({page},testInfo)=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const failures=[];page.on('response',r=>{if(r.status()>=400) failures.push(r.url());});
  await page.goto(siteUrl+'/en/'+(copy.route==='index'?'':copy.route+'.html'));
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#contact')).toHaveCount(1);
  await expect(page).toHaveTitle(copy.metadata.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',copy.metadata.description);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content',copy.metadata.og_description);
  const main=normalize(await page.locator('main').textContent());
  // Accepted blocks remain verbatim; the approved layout may move whole blocks.
  // verify-presentation.cjs also compares exact block inventories and table row associations.
  const raw=copy.source.split(/#{2,3} Hero\n\n/)[1];
  for(const token of md.parse(raw,{}).filter(t=>t.type==='inline')) {
    let text=token.children.map(t=>t.type==='text'||t.type==='code_inline'?t.content:t.type==='softbreak'?' ':'').join('').replace(/ \{#[\w-]+\}$/,'');
    text=normalize(text);
    if(!text || /^(Portrait caption:|Portrait alt text:|External link to cyberdrtabansky.com\.)/.test(text)) continue;
    if(text==='Request a private conversation: WhatsApp / Signal' || text==='Request a private conversation') continue;
    expect(main,'Missing accepted text: '+text).toContain(text);
  }
  await expect(page.locator('.brand')).toHaveAttribute('aria-label','Toza home');
  await expect(page.locator('.brand .name')).toHaveText('toza');
  const contact=page.locator(copy.route==='pricing'?'.p-contact':'#contact');
  const wa=contact.locator('a[href^="https://wa.me/"]');
  const signal=contact.locator('a[href^="https://signal.me/"]');
  await expect(wa).toHaveText('Message on WhatsApp');
  const url=new URL(await wa.getAttribute('href'));
  expect(url.pathname).toBe('/972533366276');
  expect(url.searchParams.get('text')).toBe("I'd like a private conversation. Please let me know the next step.");
  await expect(signal).toHaveAttribute('href','https://signal.me/#p/+972533366276');
  await noOverflow(page);
  expect(errors).toEqual([]);expect(failures).toEqual([]);
  if(['index','pricing','faq','why-us','private-exposure-assessment','separation-divorce','they-know-something'].includes(copy.route)) {
    await page.screenshot({path:testInfo.outputPath(copy.route+'.png'),fullPage:true});
    await page.screenshot({path:testInfo.outputPath(copy.route+'-viewport.png'),fullPage:false});
  }
});
test('mobile menu, keyboard focus and narrow reflow',async({page})=>{
  await page.setViewportSize({width:320,height:800});
  await page.goto(siteUrl+'/en/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const toggle=page.locator('[data-nav-toggle]');
  await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
  await noOverflow(page);
  const menuBounds=await page.locator('#site-menu').evaluate(menu=>({left:menu.getBoundingClientRect().left,right:menu.getBoundingClientRect().right,width:document.documentElement.clientWidth}));
  expect(menuBounds.left).toBeGreaterThanOrEqual(-1);expect(menuBounds.right).toBeLessThanOrEqual(menuBounds.width+1);
  await page.keyboard.press('Escape');await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await toggle.click();await page.locator('#site-menu a[href="#contact"]').click();
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await noOverflow(page);
  for(const width of [640,768,1024]) {
    await page.setViewportSize({width,height:900});await noOverflow(page);
  }
});
test('FAQ expands, collapses, opens group and question deep links',async({page})=>{
  await page.goto(siteUrl+'/en/faq.html#privacy');
  const privacy=page.locator('#privacy details');
  expect(await privacy.evaluateAll(items=>items.every(i=>i.open))).toBe(true);
  const all=page.locator('.faq details');const toggle=page.locator('[data-faq-toggle-all]');
  await toggle.click();expect(await all.evaluateAll(items=>items.every(i=>i.open))).toBe(true);
  await toggle.click();expect(await all.evaluateAll(items=>items.every(i=>!i.open))).toBe(true);
  const question=await all.first().getAttribute('id');
  await page.evaluate(id=>{location.hash=id;},question);
  await expect(all.first()).toHaveAttribute('open','');
  await page.evaluate(()=>{location.hash='boundaries';});
  expect(await page.locator('#boundaries details').evaluateAll(items=>items.every(i=>i.open))).toBe(true);
  await all.first().locator('summary').focus();await page.keyboard.press('Enter');
  await expect(all.first()).not.toHaveAttribute('open','');
});
test('comparison tables reflow with preserved row and column headers',async({page})=>{
  await page.setViewportSize({width:320,height:800});
  await page.goto(siteUrl+'/en/pricing.html');
  const core=page.locator('.p-core');
  await expect(core).toHaveCount(1);
  await expect(core.locator('thead th[scope="col"]')).toHaveCount(3);
  await expect(core.locator('tbody th[scope="row"]')).toHaveCount(7);
  const associations=await core.locator('tbody tr').evaluateAll(rows=>rows.every((row,i)=>[...row.querySelectorAll('td')].every((cell,j)=>cell.getAttribute('headers')===`p-attribute-${i} p-product-${j+1}`)));
  expect(associations).toBe(true);
  for(const header of await core.locator('thead th:not(:first-child)').all())await expect(header).toBeVisible();
  const cells=await core.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('td')].map(cell=>{const r=cell.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,size:parseFloat(getComputedStyle(cell).fontSize)};})));
  for(const [personal,inner]of cells){expect(Math.abs(personal.top-inner.top)).toBeLessThanOrEqual(1);expect(personal.right).toBeLessThanOrEqual(inner.left+1);expect(personal.size).toBeGreaterThanOrEqual(16);expect(inner.size).toBeGreaterThanOrEqual(16);}
  const urgent=page.locator('details.p-reference').filter({has:page.locator('summary',{hasText:'Urgent visits in Central Israel'})});
  await urgent.locator('summary').focus();await page.keyboard.press('Enter');
  await expect(urgent).toHaveAttribute('open','');
  const tables=page.locator('main table');await expect(tables).toHaveCount(2);
  for(const table of await tables.all()){
    expect(await table.locator('thead th[scope="col"]').count()).toBeGreaterThan(1);
    expect(await table.locator('tbody th[scope="row"]').count()).toBeGreaterThan(0);
    const bounds=await table.evaluate(t=>({client:t.clientWidth,scroll:t.scrollWidth}));expect(bounds.scroll).toBeLessThanOrEqual(bounds.client+1);
  }
  await noOverflow(page);
});
test('founder portrait and explicit professional link',async({page})=>{
  await page.goto(siteUrl+'/en/why-us.html');
  const portrait=page.locator('.portrait img');
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute('alt','Portrait of Dr. Lior Tabansky');
  await expect.poll(()=>portrait.evaluate(i=>i.complete&&i.naturalWidth===640)).toBe(true);
  await expect(page.locator('main a[href="https://cyberdrtabansky.com/en/"]')).toHaveAttribute('target','_blank');
});
for(const legal of ['terms','privacy']) test('retained Hebrew legal document: '+legal,async({page})=>{
  await page.goto(siteUrl+'/'+legal+'.html');
  await expect(page.locator('html')).toHaveAttribute('lang','he');
  await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  expect(await page.locator('main').innerText()).toMatch(/[\u0590-\u05ff]/);
  await noOverflow(page);
});
test('reduced motion and fresh versioned assets on repeat navigation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(siteUrl+'/en/');
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('link[href="/assets/css/clear-practice.css?v=clear-practice-2"]')).toHaveCount(1);
  await expect(page.locator('script[src="/assets/js/home-pricing.js?v=narrative-1"]')).toHaveCount(1);
  await page.reload();await expect(page.locator('h1')).toHaveText('Private information can be used against you.');
});

test('supporting details, credit conditions, deep links and print retain access',async({page})=>{
  await page.goto(siteUrl+'/en/pricing.html');
  const all=page.locator('main details');await expect(all).toHaveCount(8);
  expect(await all.evaluateAll(items=>items.every(i=>!i.open))).toBe(true);
  const localCredit=page.locator('.p-credit-condition');await expect(localCredit).toHaveCount(2);
  for(const condition of await localCredit.all()){
    await expect(condition).toBeVisible();await expect(condition).toContainText('begins within 14 days of completion of the initial service');
    await expect(condition).toContainText('Booking alone does not qualify');await expect(condition).toContainText('The credit applies once per group engagement');
  }
  const credit=page.locator('#credit');
  await expect(credit.getByText(/Booking alone does not qualify/)).not.toBeVisible();
  await page.locator('.p-compare a[href="#credit"]').click();await expect(credit).toHaveAttribute('open','');
  await expect(credit.getByText(/Booking alone does not qualify/)).toBeVisible();
  await expect(credit.getByText(/The credit applies once to the group engagement/)).toBeVisible();
  await credit.locator('summary').click();await expect(credit).not.toHaveAttribute('open','');
  await page.locator('.p-compare a[href="#credit"]').click();await expect(credit).toHaveAttribute('open','');
  const boundaries=page.locator('#service-details summary');
  await boundaries.focus();await page.keyboard.press('Enter');await expect(page.locator('#service-details')).toHaveAttribute('open','');
  await boundaries.press('Enter');await expect(page.locator('#service-details')).not.toHaveAttribute('open','');
  await page.goto(siteUrl+'/en/pricing.html#service-details');await expect(page.locator('#service-details')).toHaveAttribute('open','');
  const urgent=page.locator('details.p-reference').filter({has:page.locator('summary',{hasText:'Urgent visits in Central Israel'})});
  const urgentId=await urgent.getAttribute('id');await page.goto(siteUrl+'/en/pricing.html#'+urgentId);
  await expect(urgent).toHaveAttribute('open','');await expect(urgent.locator('summary')).toBeInViewport({ratio:1});
  const before=await all.evaluateAll(items=>items.map(i=>i.open));
  await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));expect(await all.evaluateAll(items=>items.every(i=>i.open))).toBe(true);
  await page.evaluate(()=>dispatchEvent(new Event('afterprint')));expect(await all.evaluateAll(items=>items.map(i=>i.open))).toEqual(before);
});

test('main section order and core scope remain consistent across widths',async({page})=>{
  for(const route of ['index','pricing','separation-divorce','they-know-something']) {
    let expected;
    for(const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:900});
      await page.goto(siteUrl+'/en/'+(route==='index'?'':route+'.html'));
      const order=await page.locator(route==='pricing'?'.pricing-04-content>section,.pricing-04-content>details':'main>section[id]').evaluateAll(items=>items.map(i=>({tag:i.tagName,id:i.id,className:i.className})));
      if(expected)expect(order).toEqual(expected);else expected=order;
      await noOverflow(page);
      if(route==='pricing'){
        await expect(page.locator('.p-hero')).toContainText('₪14,000 including VAT');
        await expect(page.locator('.p-assessment-scene')).toContainText('₪3,600 including VAT');
      }else if(route==='index'){
        await expect(page.locator('.copy-hero')).toContainText('₪14,000 including VAT');
        await expect(page.locator('#assessment')).toContainText('₪3,600 including VAT');
      } else await expect(page.locator('.copy-offer .offer-price')).toBeVisible();
      if(route==='pricing') {
        await expect(page.getByRole('cell',{name:'From ₪42,000',exact:true})).toBeVisible();
        await expect(page.locator('.p-core').getByRole('rowheader',{name:'Shared home/home-office network and router',exact:true})).toBeVisible();
      }
    }
  }
});

test('marketing Home exposes stakes, full-service scope and separate Assessment',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(siteUrl+'/en/');
  await expect(page.locator('.copy-hero')).toContainText('Are you sure your private information is still private?');
  await expect(page.locator('.copy-hero')).toContainText('money, reputation and decisions');
  const outcome=page.locator('#personal-shield');
  await expect(outcome).toContainText('Two compatible physical security keys');
  await expect(outcome).toContainText('You remain present, control your credentials and approve material changes');
  expect(await outcome.evaluate((element)=>Boolean(element.compareDocumentPosition(document.querySelector('#assessment'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(page.locator('.copy-hero')).toContainText('Personal Shield is a separate purchase');
  for(const paragraph of await outcome.locator('p').all())await expect(paragraph).toBeVisible();
  const before=await page.locator('main details').evaluateAll(items=>items.map(i=>i.open));
  await page.keyboard.press('Tab');await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.locator('main details').evaluateAll(items=>items.map(i=>i.open))).toEqual(before);
});

test('pricing exposes main offer, visual comparison and separately accepted paid stages',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto(siteUrl+'/en/pricing.html');
  const fee=page.locator('.p-hero').getByText('₪14,000 including VAT · One person · Two devices',{exact:true});
  const feeBounds=await fee.boundingBox();expect(feeBounds.y+feeBounds.height).toBeLessThan(844);
  expect(await page.locator('.p-core tbody th').allTextContents()).toEqual([
    'Full engagement price','People','Your devices worked on','Yubico security keys supplied','Shared home/home-office network and router','In-person protection work','Remaining payment with eligible Assessment credit'
  ]);
  const counts=await page.evaluate(()=>({people:[...document.querySelectorAll('.p-core-row-1 td')].map(n=>n.querySelectorAll('.p-people svg').length),devices:[...document.querySelectorAll('.p-core-row-2 td')].map(n=>n.querySelectorAll('.p-device-groups svg').length),keys:[...document.querySelectorAll('.p-core-row-3 td')].map(n=>n.querySelectorAll('.p-key-groups svg').length)}));
  expect(counts).toEqual({people:[1,4],devices:[2,8],keys:[2,8]});
  await expect(page.locator('.p-compare')).toContainText('The same standard of individual protection');
  await expect(page.locator('.p-compare')).toContainText('begins within 14 days of completion of the initial service');
  await expect(page.locator('.p-core-row-5')).toContainText('Typically 7–14 hours, excluding Assessment');
  await expect(page.locator('.p-core-row-5')).toContainText('Typically 2–4 working days');
  await expect(page.locator('.p-method-caption')).toHaveText('Illustration of the review method. Your assessment reflects your own circumstances.');
  for(const label of ['Sign in','Recover access','Share information','Grant permissions'])await expect(page.locator('.p-practice').getByText(label,{exact:true})).toBeVisible();
  await expect(page.locator('.p-owner-decision')).toContainText('Full protection requires its own acceptance. There is no automatic continuation.');
  await expect(page.locator('.p-conversation')).toContainText('explicit acceptance and receipt of payment');
  await expect(page.locator('.p-aftercare')).toContainText("For issues directly related to Toza's changes. Inner Circle's period starts at group completion.");
  await page.locator('#full-specification summary').click();
  await expect(page.locator('#full-specification').getByText(/Personal details are shared only with that person's consent/)).toBeVisible();
  await expect(page.locator('#full-specification')).toContainText('a private dated record per person and a separate shared-network record');
  await page.goto(siteUrl+'/en/pricing.html#assessment');
  const assessment=page.locator('.p-assessment-scene');
  await expect(assessment.getByText(/The initial Assessment covers/)).toBeVisible();
  await expect(assessment.getByText(/The initial Assessment covers/)).toContainText("one main phone and one PC, iPad or second phone");
  await expect(assessment.getByText(/The initial Assessment covers/)).toContainText("Inner Circle's remaining-group review and mapping are included in the full engagement");
  await expect(assessment.getByText(/You receive a practical summary of what was reviewed/)).toBeVisible();
  await expect(assessment.getByText(/You receive a practical summary of what was reviewed/)).toContainText('whether or not you continue');
  await expect(assessment.getByText(/If urgent exposure is identified/)).toBeVisible();
  await expect(assessment.getByText(/If urgent exposure is identified/)).toContainText('approved first-aid changes that can safely be completed within the agreed scope');
  await expect(assessment.getByText(/If urgent exposure is identified/)).toContainText('Typically four hours is not an automatic cutoff');
  const urgent=page.locator('details.p-reference').filter({has:page.locator('summary',{hasText:'Urgent visits in Central Israel'})});
  await urgent.locator('summary').click();await expect(urgent).toContainText("within four hours after both Toza's acceptance and receipt of payment");
  await noOverflow(page);
});

test('situation pages keep material controls and separate purchases with their scope',async({page})=>{
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:844});
    await page.goto(siteUrl+'/en/separation-divorce.html');
    const effects=page.locator('#make-changes-with-their-consequences-in-view');
    await expect(effects.getByText(/We do not promise invisible changes/)).toBeVisible();
    const later=page.locator('#a-setup-for-the-life-you-are-moving-into');
    await expect(later.getByText(/Scope and price are agreed separately; there is no automatic continuation/)).toBeVisible();
    await expect(page.locator('.page-index').getByRole('link',{name:'After the visit'})).toHaveAttribute('href','#a-setup-for-the-life-you-are-moving-into');
    await noOverflow(page);

    await page.goto(siteUrl+'/en/they-know-something.html');
    const assessment=page.locator('#have-someone-examine-the-access-and-address-urgent-problems');
    const hardening=page.locator('#hardening-beyond-the-first-visit');
    await expect(assessment.getByText(/Any expansion of scope or price needs your agreement/)).toBeVisible();
    await expect(assessment.getByRole('link',{name:'Initial visit details'})).toBeVisible();
    await expect(assessment.getByRole('link',{name:'See availability, fees and arrival conditions'})).toBeVisible();
    await expect(page.locator('#have-someone-examine-the-access-and-address-urgent-problems + #hardening-beyond-the-first-visit')).toHaveCount(1);
    await expect(hardening.getByText(/Scope, price and purchase are agreed separately/)).toBeVisible();
    await expect(assessment.getByText(/Personal Shield/)).toHaveCount(0);
    await expect(page.getByText(/Recovering copies of information already shared is outside this service/)).toBeVisible();
    await expect(page.locator('#contact').getByText(/Contact through WhatsApp or Signal is not guaranteed to be invisible/)).toBeVisible();
    await noOverflow(page);
  }
});

for(const route of ['index','pricing'])test('short-screen contact and responsive narrative: '+route,async({page})=>{
  await page.setViewportSize({width:390,height:667});
  await page.goto(siteUrl+'/en/'+(route==='index'?'':route+'.html'));
  await page.locator('main a[href="#contact"]').first().click();
  const channels=page.locator(route==='pricing'?'.p-contact .contact-channels a':'#contact .contact-channels a');
  await expect(channels).toHaveCount(2);
  for(const channel of await channels.all()){
    await expect(channel).toBeInViewport({ratio:1});
    const bounds=await channel.boundingBox();expect(bounds.height).toBeGreaterThanOrEqual(44);
  }
  for(const width of [320,390,640,768,1024,1440]){
    await page.setViewportSize({width,height:900});await noOverflow(page);
  }
});

test('narrative assets are scoped and the script retains shared behavior',async({page})=>{
  const original=fs.readFileSync('assets/js/site.js','utf8');
  const expected=original.replace("var disclosure = target.querySelector('.section-disclosure');", "var disclosure = target.id === 'main-content' ? null : target.querySelector('.section-disclosure');");
  expect(expected).not.toBe(original);
  expect(fs.readFileSync('assets/js/home-pricing.js','utf8')).toBe(expected);
  await page.goto(siteUrl+'/en/why-us.html');
  await expect(page.locator('link[href*="home-pricing.css"]')).toHaveCount(0);
  await expect(page.locator('script[src="/assets/js/home-pricing.js?v=narrative-1"]')).toHaveCount(1);
  await expect(page.locator('link[href="/assets/css/marketing-02.css?v=marketing-02-1"]')).toHaveCount(1);
});

test('Process stages preserve visible order, purchase boundaries and readable headings',async({page})=>{
  const processCopy=pages().find(copy=>copy.route==='what-happens-during-the-visit');
  const approvedStageBlocks=processCopy.sections.slice(0,3).map(section=>md.parse(section,{}).filter(token=>token.type==='inline').map(token=>normalize(token.children.map(child=>child.type==='text'||child.type==='code_inline'?child.content:child.type==='softbreak'?' ':'').join(''))));
  const stageIds=[
    'decide-whether-toza-fits-before-you-buy',
    'your-paid-assessment-inspection-diagnosis-and-urgent-first-aid',
    'have-the-agreed-setup-hardened-around-your-life',
  ];
  for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:900});
    await page.goto(siteUrl+'/en/what-happens-during-the-visit.html');
    await expect(page.locator('main details')).toHaveCount(0);
    expect(await page.locator('.process-stage').evaluateAll(items=>items.map(i=>i.id))).toEqual(stageIds);
    expect(await page.locator('.process-stage').evaluateAll(items=>items.map(i=>i.querySelectorAll('.process-step').length))).toEqual([2,3,3]);
    expect(await page.locator('.process-step').evaluateAll(items=>items.map(i=>Number(i.dataset.processStep)))).toEqual([1,2,3,4,5,6,7,8]);
    const steps=await page.locator('.process-step').evaluateAll(items=>items.map(i=>({top:i.getBoundingClientRect().top,bottom:i.getBoundingClientRect().bottom})));
    for(let i=1;i<steps.length;i++)expect(steps[i].top).toBeGreaterThanOrEqual(steps[i-1].bottom);
    const stages=await page.locator('.process-stage').all();
    for(const [index,stage] of stages.entries()){
      expect((await stage.locator('h2,h3,p').allTextContents()).map(normalize)).toEqual(approvedStageBlocks[index]);
      const heading=stage.locator('h2');await expect(heading).toBeVisible();
      const bounds=await heading.boundingBox();
      const stageBounds=await stage.locator('.copy-body').boundingBox();
      expect(bounds.width).toBeGreaterThanOrEqual(stageBounds.width*.9);
      for(const block of await stage.locator('h3,p').all())await expect(block).toBeVisible();
    }
    const offer=page.locator('#'+stageIds[1]+' .section-title');
    await expect(offer).toContainText('Private Exposure Assessment · Typically four hours');
    await expect(offer.locator('.offer-price')).toHaveText('₪3,600 including VAT');
    const decision=page.locator('.process-decision');
    await expect(decision).toContainText('Broader hardening is a separate purchase decision');
    const assessment=await page.locator('#'+stageIds[1]).boundingBox();
    const full=await page.locator('#'+stageIds[2]).boundingBox();
    expect(full.y-(assessment.y+assessment.height)).toBeGreaterThanOrEqual(28);
    expect(await page.locator('main>.copy-section').evaluateAll(items=>items.slice(3).map(i=>i.id))).toEqual([
      'get-help-with-the-changes-afterward','you-approve-changes-and-decide-what-an-adviser-receives','need-an-urgent-visit','contact'
    ]);
    for(const block of await page.locator('main>.copy-section h2,main>.copy-section h3,main>.copy-section p').all())await expect(block).toBeVisible();
    await noOverflow(page);
  }
});

test('Process anchors, short-screen contact, print and CSS scope remain accessible',async({page})=>{
  await page.setViewportSize({width:390,height:667});
  await page.goto(siteUrl+'/en/what-happens-during-the-visit.html');
  await expect(page.locator('link[href="/assets/css/process-stages.css?v=batch-a-1"]')).toHaveCount(1);
  for(const label of ['Before you buy','The Assessment','Full engagement']){
    const link=page.locator('.page-index').getByRole('link',{name:label,exact:true});
    const target=await link.getAttribute('href');
    await link.focus();await page.keyboard.press('Enter');
    await expect(page.locator(target+' h2')).toBeInViewport({ratio:1});
    expect(new URL(page.url()).hash).toBe(target);
  }
  await page.locator('.page-index').getByRole('link',{name:'Contact',exact:true}).click();
  for(const channel of await page.locator('#contact .contact-channels a').all())await expect(channel).toBeInViewport({ratio:1});
  const before=normalize(await page.locator('main').innerText());
  await page.emulateMedia({media:'print'});
  expect(normalize(await page.locator('main').innerText())).toBe(before);
  for(const block of await page.locator('main h2,main h3,main p').all())await expect(block).toBeVisible();
  await noOverflow(page);
  await page.emulateMedia({media:'screen'});
  await page.goto(siteUrl+'/en/why-us.html');
  await expect(page.locator('link[href*="process-stages.css"]')).toHaveCount(0);
});
