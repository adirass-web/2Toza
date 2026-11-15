import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDocument, DomUtils } from 'htmlparser2';
import { siteDir } from './util.mjs';
const site=siteDir();
function page(file){return parseDocument(readFileSync(`${site}/${file}`,'utf8'));}
const routes=['en/index.html','en/pricing/index.html','en/about/index.html','en/exposure/index.html','en/how-it-works/index.html','en/separation-divorce/index.html','en/business-dispute/index.html','en/inheritance-conflict/index.html','en/attorneys/index.html','en/they-know-something/index.html','en/faq/index.html','en/conditions/index.html','en/accessibility/index.html','404.html'];
const attr=(n,k)=>n.attribs?.[k]||'';
test('English routes share Home masthead and footer navigation',()=>{
 for(const route of routes){const dom=page(route);const h=DomUtils.findOne(n=>n.name==='header'&&attr(n,'class').split(/\s+/).includes('site-header'),dom.children,true);assert.ok(h,`${route}: shared masthead`);const nav=DomUtils.findOne(n=>n.name==='nav'&&attr(n,'class').split(/\s+/).includes('primary-nav'),h.children,true);assert.ok(nav,`${route}: primary navigation`);const hrefs=DomUtils.findAll(n=>n.name==='a',nav.children).map(n=>attr(n,'href'));assert.deepEqual(hrefs,['/en/#situations','/en/how-it-works/','/en/pricing/','/en/faq/'],`${route}: links`);const footer=DomUtils.findOne(n=>n.name==='footer'&&attr(n,'class').split(/\s+/).includes('approved-footer'),dom.children,true);assert.ok(footer,`${route}: shared footer`);for(const href of ['/en/pricing/','/en/faq/','/en/attorneys/','/en/conditions/','/en/about/','/en/accessibility/'])assert.ok(DomUtils.findOne(n=>n.name==='a'&&attr(n,'href')===href,footer.children,true),`${route}: ${href}`);}
});
