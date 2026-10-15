'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {parseDocument}=require('htmlparser2');
const D=require('domutils');
const {pages,renderPage}=require('./accepted-copy.cjs');
const clear=require('./clear-practice.cjs');
const narrative=require('./home-pricing-narrative.cjs');
// These regressions protect the published historical adapters, which still
// serve the eight unchanged pages. Marketing-02 uses a separate adapter.
const source=route=>renderPage(pages({historical:true}).find(p=>p.route===route),{presentation:false});
const tags=(n,name)=>D.findAll(e=>e.type==='tag'&&e.name===name,n.children||[]);
const cls=(n,name)=>D.findAll(e=>(e.attribs?.class||'').split(/\s+/).includes(name),n.children||[]);
const text=n=>D.textContent(n).replace(/\s+/g,' ').trim();
const section=(doc,id)=>D.findAll(e=>e.attribs?.id===id,doc.children)[0];
const blocks=n=>tags(n,'p').map(text);
const links=n=>tags(n,'a').map(a=>[text(a),a.attribs.href]);

test('Business keeps the complete Assessment, separate purchase paragraph and final links in source order',()=>{
  const original=section(parseDocument(source('business-dispute')),'put-the-technical-questions-in-experienced-hands');
  const rendered=section(parseDocument(clear.present(source('business-dispute'),'business-dispute')),'put-the-technical-questions-in-experienced-hands');
  assert.deepEqual(blocks(rendered),blocks(original));
  assert.deepEqual(links(rendered),links(original));
  assert.deepEqual(tags(rendered,'h2').map(text),tags(original,'h2').map(text));
  const assessment=cls(rendered,'business-assessment')[0],shield=cls(rendered,'business-shield')[0],detail=cls(rendered,'business-offer-detail')[0];
  assert.deepEqual(blocks(assessment),blocks(original).slice(0,4));
  assert.deepEqual(blocks(shield),[blocks(original)[4]]);
  assert.equal(tags(shield,'p').length,1);
  assert.equal(text(tags(shield,'strong')[0]),'Personal Shield');
  assert.match(text(shield),/Its scope and price require a separate decision; a group or unusually complex situation may need a different agreed service\.$/);
  assert.equal(tags(assessment,'h2').length,0);
  assert.deepEqual(detail.children.filter(n=>n.type==='tag').map(n=>n.attribs.class||n.name),['business-assessment','business-shield','p']);
});

test('Home groups only complete supporting paragraphs after the unchanged primary pair',()=>{
  const common=clear.present(source('index'),'index');
  const original=section(parseDocument(common),'situations');
  const rendered=section(parseDocument(narrative.present(common,'index')),'situations');
  assert.deepEqual(blocks(rendered),blocks(original));
  assert.deepEqual(links(rendered),links(original));
  const originalPair=cls(original,'situation-pair')[0],pair=cls(rendered,'situation-pair')[0];
  assert.equal(D.getOuterHTML(pair),D.getOuterHTML(originalPair));
  const supporting=cls(rendered,'situation-secondary')[0];
  assert.deepEqual(blocks(supporting),blocks(original).slice(-2));
  assert.equal(tags(supporting,'h3').length,0);
});

test('Business fails closed for missing, reordered or split commercial blocks',()=>{
  const original=source('business-dispute');
  const scope=original.match(/<p>The paid visit includes[\s\S]*?<\/p>/)[0];
  const summary=original.match(/<p>You receive a summary[\s\S]*?<\/p>/)[0];
  for(const malformed of [
    original.replace(scope,''),
    original.replace(scope,'TOZA_SWAP').replace(summary,scope).replace('TOZA_SWAP',summary),
    original.replace('Its scope and price require','</p><p>Its scope and price require'),
    original.replace('Typically four hours','Wrong Assessment label'),
  ])assert.throws(()=>clear.present(malformed,'business-dispute'),/Missing approved Business Assessment \/ Personal Shield block mapping/);
});

test('Home fails closed for absent or wrong supporting destinations',()=>{
  const common=clear.present(source('index'),'index');
  const inheritance=common.match(/<p><a href="\/en\/inheritance-clash.html">[\s\S]*?<\/p>/)[0];
  for(const malformed of [common.replace(inheritance,''),common.replace('/en/they-know-something.html','/en/pricing.html')]) {
    assert.throws(()=>narrative.present(malformed,'index'),/Missing approved Home supporting situation block mapping/);
  }
});
