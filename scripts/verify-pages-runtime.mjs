// Run against `wrangler pages dev _site`; the static browser server cannot test edge routing.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const {pages} = require('./accepted-copy.cjs');
const base = process.env.TOZA_RUNTIME_URL || 'http://127.0.0.1:8788';
const fetchPath = (p, options={}) => fetch(base+p, {...options,signal:AbortSignal.timeout(10000)});
let count=0;
async function redirect(p,status,target) {
  const response=await fetchPath(p,{redirect:'manual'});
  assert.equal(response.status,status,p);
  const location=new URL(response.headers.get('location'),base);
  assert.equal(location.pathname+location.hash,target,p+' destination'); count++;
}
await redirect('/',302,'/en/');
await redirect('/he',302,'/en/');
await redirect('/he/',302,'/en/');
for(const p of pages()) for(const extension of ['', '.html']) await redirect('/he/'+(p.route==='index'?'index':p.route)+extension,302,'/en/');
for(const p of ['commercial-spying','private-investigator','not-it-support','leaving-controlling-relationship']) for(const extension of ['', '.html','/']) await redirect('/he/'+p+extension,302,'/en/');
await redirect('/ru/',302,'/en/');
for(const [old,target] of [['commercial-spying','/en/business-dispute.html'],['private-investigator','/en/they-know-something.html'],['not-it-support','/en/faq.html#how-toza-differs']]) {
  for(const extension of ['', '.html', '/', '.html/']) await redirect('/en/'+old+extension,301,target);
  const response=await fetchPath('/en/'+old+'.html'); assert.equal(response.status,200,old+' final destination'); count++;
}
await redirect('/en/founder.html',301,'/'); // external profile's origin is checked separately
const founder=await fetchPath('/en/founder.html',{redirect:'manual'});
assert.equal(new URL(founder.headers.get('location')).origin,'https://cyberdrtabansky.com');
await redirect('/en/whats-included.html',301,'/en/what-happens-during-the-visit.html');
for(const suffix of ['', '/', '.html', '.html/']) for(const method of ['GET','HEAD']) {
  const response=await fetchPath('/en/leaving-controlling-relationship'+suffix,{redirect:'manual',method});
  assert.equal(response.status,410,'retirement '+suffix);
  assert.equal(response.headers.get('x-robots-tag'),'noindex');
  const body=await response.text();
  assert(method==='HEAD'?body==='':body.includes('This page has been retired.')&&body.includes('This service page is no longer available.'));
  assert(!/href=|contact|WhatsApp|Signal/.test(body)); count++;
}
for(const p of pages()) {
  const alias='/en/'+(p.route==='index'?'':p.route+'.html');
  const response=await fetchPath(alias); assert.equal(response.status,200,alias);
  const finalPath=new URL(response.url).pathname;
  const expected='/en/'+(p.route==='index'?'':p.route);
  assert.equal(finalPath,expected,alias+' final path');
  const html=await response.text();
  assert(html.includes('rel="canonical" href="https://toza-site.pages.dev'+expected+'"'),alias+' canonical');count++;
}
for(const p of ['terms','privacy']) {
  const response=await fetchPath('/'+p+'.html');assert.equal(response.status,200);
  assert((await response.text()).includes('<html lang="he" dir="rtl">'));count++;
}
const css=await fetchPath('/assets/css/clear-practice.css?v=clear-practice-2');assert.equal(css.status,200);
assert((await css.text()).includes('.copy-table'));count++;
assert.equal((await fetchPath('/missing-route-for-quality-gate',{redirect:'manual'})).status,404);count++;
console.log('PAGES RUNTIME VERIFIED: '+count+' route, status, content and asset checks');
