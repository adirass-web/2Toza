import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseDocument,DomUtils} from 'htmlparser2';
const root=process.env.SITE_ENV==='production'?'_site-production':'_site';
const html=readFileSync(`${root}/en/pricing/index.html`,'utf8');
const dom=parseDocument(html),main=DomUtils.findOne(n=>n.name==='main',dom.children,true);
const text=DomUtils.textContent(main).replace(/\s+/g,' ').trim();
test('pricing uses Home shell and protection-first structure',()=>{
 assert.match(html,/class="site-header"/); assert.match(html,/pricing-comparison/);
 assert.ok(html.indexOf('id="protection"')<html.indexOf('id="assessment"'));
 assert.doesNotMatch(text,/Three stages and their prices|Call me back/);
 for(const phrase of ['Choose protection for one person, two people or your household.','Prices include VAT.','whose work begins within 30 days of assessment completion'])assert.ok(text.includes(phrase),phrase);
});
test('all options keep complete approved inclusions in native disclosures',()=>{
 const disclosures=DomUtils.findAll(n=>n.name==='details'&&n.attribs?.class==='pricing-inclusions',main.children);
 assert.equal(disclosures.length,3);
 for(const d of disclosures){assert.match(DomUtils.textContent(d),/Full inclusions/);assert.match(DomUtils.textContent(d),/60 days/)}
 for(const price of ['32000','45000','70000','4000']) assert.match(html,new RegExp(`value="${price}"`));
 for(const id of ['main-content','contact','full-specification','credit','assessment','personal-shield','personal-shield-for-two','inner-circle'])assert.match(html,new RegExp(`id="${id}"`));
});
