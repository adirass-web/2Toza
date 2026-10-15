// Independent content/association checks around the presentation adapter.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const {parseDocument}=require('htmlparser2');
const D=require('domutils');
const {pages,renderPage,assertAuthority}=require('./accepted-copy.cjs');
const find=(n,p)=>D.findAll(p,n.children||[]);
const text=n=>D.textContent(n).replace(/\s+/g,' ').trim();
function parse(html){
  const doc=parseDocument(html);
  const main=find(doc,n=>n.name==='main')[0]||doc;
  find(main,n=>n.attribs?.['data-presentation-ui']!==undefined||(n.attribs?.class||'')==='table-hint').forEach(D.removeElement);
  return main;
}
function blocks(root){return find(root,n=>['p','h1','h2','h3','li','th','td','figcaption'].includes(n.name)).map(n=>n.name+':'+text(n));}
function rows(root){return find(root,n=>n.name==='tr'&&n.parent?.name==='tbody').map(row=>row.children.filter(n=>['th','td'].includes(n.name)).map(text).join('\u0000')).sort();}
assertAuthority();
for(const page of pages()) {
  if(page.pricing04){require('./verify-pricing-04.cjs').verify(page);continue;}
  const base=parse(renderPage(page,{presentation:false}));
  const html=fs.readFileSync('_site/en/'+page.route+'.html','utf8');
  const actual=parse(html);
  const expected=blocks(base).map(block=>{
    const approvedSubheading={pricing:'Your initial fee counts toward the full service'}[page.route];
    return block==='h2:'+approvedSubheading?'h3:'+approvedSubheading:block;
  });
  assert.deepEqual(blocks(actual).sort(),expected.sort(),page.route+': exact copy blocks');
  assert.deepEqual(rows(actual),rows(base),page.route+': table value associations');
  if(page.route==='private-exposure-assessment')assert.deepEqual(blocks(actual),blocks(base),'Protected PA block order');
  if(page.route==='faq')assert.deepEqual(find(actual,n=>n.name==='summary').map(text),find(base,n=>n.name==='summary').map(text),'FAQ questions');
  assert(html.includes('/assets/css/clear-practice.css?v=clear-practice-2'),page.route+': shared design asset');
  assert(!html.includes('guilloche.js')&&!html.includes('class="mark seal"'),page.route+': retired visual decoration');
  assert(html.includes('/assets/brand/toza/toza-logo-ink.svg'),page.route+': approved logo');
}
console.log('PRESENTATION VERIFIED: 11 exact-copy pages; table associations; protected PA order; shared identity');
