import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url);
const {validatePhoto}=require('./lib/photo.cjs');
const valid={src:'/approved-en-assets/photos/sit-1-900.jpg',srcset:'/approved-en-assets/photos/sit-1-900.jpg 900w',sizes:'100vw',width:900,height:1500,alt:'',variant:'scene',priority:'lazy'};
test('explicit empty alt is valid',()=>assert.equal(validatePhoto(valid).alt,''));
for(const key of Object.keys(valid)) test(`requires ${key}`,()=>{const p={...valid};delete p[key];assert.throws(()=>validatePhoto(p),new RegExp(key));});
for(const [key,value] of [['width',0],['height',-1],['width',1.5],['alt',null],['variant','unknown'],['priority','urgent'],['src','https://example.com/a.jpg'],['src','/approved-en-assets/../secret.jpg'],['src','/approved-en-assets/photos/missing.jpg'],['srcset','https://example.com/a.jpg 900w'],['srcset','/approved-en-assets/photos/missing.jpg 900w'],['sizes',''],['srcset','/approved-en-assets/photos/sit-1-900.jpg 0w'],['srcset','/approved-en-assets/photos/sit-1-900.jpg 900w, /approved-en-assets/photos/sit-1-900.jpg 900w']]) test(`rejects ${key}: ${value}`,()=>assert.throws(()=>validatePhoto({...valid,[key]:value})));
for(const dir of ['_site','_site-production']) test(`${dir}: shared contract on all existing photos`,()=>{
 const {parseDocument}=require('htmlparser2');
 for(const slug of ['', 'separation-divorce','business-dispute','inheritance-conflict','about','lp/separation','lp/business-account-privacy']){
  const doc=parseDocument(readFileSync(`${dir}/en/${slug?slug+'/':''}index.html`,'utf8'));
  const photos=[];const walk=n=>{if(n.name==='img' && /(?:photos\/|portraits\/)/.test(n.attribs.src||''))photos.push(n.attribs);for(const c of n.children||[])walk(c);};walk(doc);
  assert.equal(photos.length,slug===''?4:1);
  for(const p of photos){assert.ok(p['data-photo-variant']);assert.ok('alt' in p);assert.ok(+p.width>0 && +p.height>0);assert.ok(p.srcset);assert.ok(p.sizes);assert.ok(['eager','lazy'].includes(p.loading));assert.ok(['high','auto'].includes(p.fetchpriority));assert.equal(p.loading,p['data-photo-variant']==='scene'?'lazy':'eager');assert.equal(p.fetchpriority,['hero','situation-hero'].includes(p['data-photo-variant'])?'high':'auto');}
 }
});

test('macro escapes alt and retains direct-child img',()=>{
 const nunjucks=require('nunjucks');const env=new nunjucks.Environment(new nunjucks.FileSystemLoader('src/_includes'),{autoescape:true});env.addFilter('validatePhoto',validatePhoto);
 const html=env.renderString('{% from "approved-en/photo.njk" import photo %}{{ photo(p) }}',{p:{...valid,alt:'"<script>alert(1)</script>'}});
 assert.match(html,/alt="&quot;&lt;script&gt;/);assert.doesNotMatch(html,/<(?:picture|figure|script)\b/);
});

test('template rendering rejects a malformed photo',()=>{
 const nunjucks=require('nunjucks');const env=new nunjucks.Environment(new nunjucks.FileSystemLoader('src/_includes'),{autoescape:true});env.addFilter('validatePhoto',validatePhoto);
 const p={...valid};delete p.alt;
 assert.throws(()=>env.renderString('{% from "approved-en/photo.njk" import photo %}{{ photo(p) }}',{p}),/photo alt: required/);
});
