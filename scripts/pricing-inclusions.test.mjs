import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {parseDocument,DomUtils} from 'htmlparser2';
const root=process.env.SITE_ENV==='production'?'_site-production':'_site';
const html=readFileSync(`${root}/en/pricing/index.html`,'utf8'), dom=parseDocument(html);
const main=DomUtils.findOne(n=>n.name==='main',dom.children,true);
const text=DomUtils.textContent(main).replace(/\s+/g,' ');
test('full inclusions retain allowance, network and support limits',()=>{
 for(const phrase of ['Up to three everyday devices','Up to six everyday devices, shared within the tier','Up to twelve everyday devices, shared within the tier','A private dated record','Historical archives and bulk data migration are scoped separately.','accessible settings and authorized administration','within one working day','starts when the protection work is complete'])assert.ok(text.includes(phrase),phrase);
 const inclusions=DomUtils.findAll(n=>n.name==='details'&&n.attribs?.class==='pricing-inclusions',main.children);
 for(const item of inclusions){const t=DomUtils.textContent(item);assert.match(t,/supplied, configured and tested/);assert.match(t,/about four weeks/)}
});
test('category copy accompanies a small static unified icon selection',()=>{
 for(const category of ['Browsers','Email','Messaging','Social and dating','Password managers'])assert.ok(text.includes(category),category);
 for(const brand of ['Chrome','Safari','Gmail','Instagram','Facebook','Tinder','LinkedIn','1Password','Outlook'])assert.ok(!text.includes(brand),'no visible brand '+brand);
 const names=['chrome','safari','gmail','whatsapp','instagram','facebook','tinder','linkedin'];
 for(const name of names)assert.match(html,new RegExp(`icons/tabler/brand-${name}.svg`));
 const manifest=JSON.parse(readFileSync('approved-en-assets/icons/tabler/manifest.json','utf8'));
 assert.equal(manifest.version,'3.52.0');assert.ok(manifest.icons.length<25);
 assert.match(readFileSync('approved-en-assets/icons/tabler/LICENSE','utf8'),/MIT License/);
 const contact=readFileSync('src/_includes/approved-en/contact-icons.njk','utf8');
 for(const name of ['whatsapp','signal'])assert.ok(contact.includes(`icons/tabler/brand-${name}.svg`));
 assert.ok(readdirSync('approved-en-assets/icons/tabler').length<27);
});
