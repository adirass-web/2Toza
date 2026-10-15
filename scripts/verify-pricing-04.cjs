'use strict';
// Current Pricing fidelity is checked against the exact owner-reviewed render,
// not against a reconstructed list of selected claims.
const fs=require('node:fs');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const {parseDocument}=require('htmlparser2');
const D=require('domutils');
const md=new(require('markdown-it'))({html:false,typographer:false});
const project='projects/toza-en-editorial-revision/revisions/pricing-04/';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const find=(n,p)=>D.findAll(p,n.children||[]);
const tags=(n,name)=>find(n,x=>x.name===name);
const norm=n=>D.textContent(n).replace(/\s+/g,' ').trim();
const cls=(n,c)=>find(n,x=>(x.attribs?.class||'').split(/\s+/).includes(c));
function verify(page) {
  assert(page.pricing04 && page.route==='pricing','Current Pricing-04 authority');
  const preview=fs.readFileSync(project+'preview/index.html','utf8').replace(/\r\n/g,'\n');
  assert.equal(hash(preview),'5f1569faa2e8d1563310e09b5a24c0b32f5f07ae4e550177be257fe0f690606f','Exact accepted review rendering');
  const expected=tags(parseDocument(preview.toString()),'main')[0];
  const doc=parseDocument(fs.readFileSync('_site/en/pricing.html','utf8'));
  const actual=tags(doc,'main')[0];
  assert.equal(norm(actual),norm(expected),'Every approved source/visual word and its order; no extra public copy');
  const links=n=>tags(n,'a').map(a=>[norm(a),a.attribs.href,a.attribs.target||'',a.attribs.rel||'']);
  assert.deepEqual(links(actual),links(expected),'All approved Pricing source/contact links in order');
  const sourceBlocks=md.parse(page.source.split('## Hero\n\n')[1],{}).filter(t=>t.type==='inline').map(t=>norm(parseDocument(md.renderInline(t.content.replace(/ \{#[\w-]+\}/g,'')))));
  assert.equal(sourceBlocks.length,93,'Complete accepted source block count');
  let cursor=0;const text=norm(actual);
  for(const block of sourceBlocks){const at=text.indexOf(block,cursor);assert(at>=0,'Complete ordered source block: '+block);cursor=at+block.length;}
  const rows=n=>tags(n,'tr').map(r=>r.children.filter(x=>['th','td'].includes(x.name)).map(norm));
  assert.deepEqual(rows(actual),rows(expected),'Every commercial table cell and its row/column association');
  const core=cls(actual,'p-core')[0];
  assert.equal(tags(tags(core,'tbody')[0],'tr').length,7);
  for(const [row,c,counts] of [[1,'p-people',[1,4]],[2,'p-device-groups',[2,8]],[3,'p-key-groups',[2,8]]]) {
    const cells=tags(tags(tags(core,'tbody')[0],'tr')[row],'td');
    assert.deepEqual(cells.map(cell=>tags(cls(cell,c)[0],'svg').length),counts,'Actual counted '+c);
  }
  for(const node of tags(actual,'svg'))assert(node.attribs['aria-hidden']==='true'&&node.attribs.focusable==='false','Decorative SVG access');
  const metas=new Map(tags(doc,'meta').map(n=>[n.attribs.name||n.attribs.property,n.attribs.content]));
  assert.equal(norm(tags(doc,'title')[0]),page.metadata.title);
  assert.equal(metas.get('description'),page.metadata.description);
  assert.equal(metas.get('og:description'),page.metadata.og_description);
  assert.equal(tags(actual,'details').length,8,'Accepted native disclosures');
  assert.equal(cls(actual,'p-credit-condition').length,2,'Eligibility before and after comparison');
  const baseline=JSON.parse(fs.readFileSync('docs/pricing-04-release/BASELINE-OUTPUT.json'));
  for(const [file,sha] of Object.entries(baseline))if(file!=='en/pricing.html')assert.equal(hash(fs.readFileSync('_site/'+file)),sha,file+': unchanged published output');
  console.log('PRICING-04 VERIFIED: 93 ordered blocks, exact full reviewed text/links, all table cells, quantities, metadata; 79 prior files unchanged.');
}
module.exports={verify};
if(require.main===module){const a=require('./accepted-copy.cjs');a.assertAuthority();verify(a.pages().find(p=>p.route==='pricing'));}
