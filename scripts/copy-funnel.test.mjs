import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseDocument,DomUtils} from 'htmlparser2';
const root=process.env.SITE_ENV==='production'?'_site-production':'_site';
const facts=JSON.parse(readFileSync('src/_data/facts.json'));
const contact=JSON.parse(readFileSync('src/_data/contact.json'));
const norm=s=>s.replace(/\s+/g,' ').trim();
function assertBefore(html, phrase, boundary) {
 const phraseIndex=html.indexOf(phrase),boundaryIndex=html.indexOf(boundary);
 assert.notEqual(phraseIndex,-1,`required text exists: ${phrase}`);
 assert.notEqual(boundaryIndex,-1,`comparison boundary exists: ${boundary}`);
 assert.ok(phraseIndex<boundaryIndex,`${phrase} appears before ${boundary}`);
}
test('hierarchy assertion rejects absent text, absent boundary and reversed order',()=>{
 assert.throws(()=>assertBefore('tier','missing','tier'),/required text exists/);
 assert.throws(()=>assertBefore('expert','expert','missing'),/comparison boundary exists/);
 assert.throws(()=>assertBefore('tier expert','expert','tier'),/appears before/);
});
for(const slug of ['', 'pricing/','separation-divorce/','business-dispute/','inheritance-conflict/'])test(`${slug||'home'} explains first contact and preserves channel destinations`,()=>{
 const dom=parseDocument(readFileSync(`${root}/en/${slug}index.html`,'utf8'));
 const ids=DomUtils.findAll(n=>n.attribs?.id,dom.children).map(n=>n.attribs.id);
 assert.equal(new Set(ids).size,ids.length,'unique IDs');
 const main=DomUtils.findOne(n=>n.name==='main',dom.children,true),text=norm(DomUtils.textContent(main));
 assert.equal(text.split('For your first message,').length-1,1);
 assert.ok(text.includes('Contact may be visible on your device or account.'));
 for(const [channel,label] of [['whatsapp','Message on WhatsApp'],['signal','Message on Signal']]){
  const links=DomUtils.findAll(n=>n.name==='a'&&norm(DomUtils.textContent(n))===label,main.children);
  assert.equal(links.length,slug===''?2:1);
  for(const link of links)assert.equal(link.attribs.href,contact[channel].url);
 }
 assert.ok(DomUtils.findOne(n=>n.name==='a'&&n.attribs.href==='/en/faq/#a2',main.children,true));
});
test('expert and buying sequence appear before situation and tier comparison',()=>{
 const home=readFileSync(`${root}/en/index.html`,'utf8');
 assertBefore(home,'assess exposure and carry out agreed protection','id="situations"');
 assert.equal((home.match(/Dr\. Lior Tabansky works with you/g)||[]).length,1);
 const pricing=readFileSync(`${root}/en/pricing/index.html`,'utf8');
 for(const phrase of ['You remain present, control your credentials','Free private conversation →','You keep the written exposure summary','testing, personal teaching and a private dated record'])assertBefore(pricing,phrase,'class="pricing-option');
 assert.equal(facts.prices.personalShield-facts.prices.assessment,facts.prices.balanceShield);
 assert.ok(pricing.includes(`work begins within ${facts.credit.windowDays} days of assessment completion`));
 assert.ok(pricing.includes('that leaves ₪28,000 to pay.'));
 assert.ok(pricing.includes('Approved urgent first aid may be included where safe and within the agreed scope.'));
});
