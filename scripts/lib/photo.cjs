const {existsSync,statSync,realpathSync}=require('node:fs');
const {resolve,sep}=require('node:path');
const root=resolve(__dirname,'../..');
const variants=new Set(['hero','scene','situation-hero','section','card','portrait']);
function localSource(src,field){
 if(typeof src!=='string'||!/^\/(?:approved-en-assets\/photos|assets\/img\/portraits)\/[a-zA-Z0-9_/-]+\.(?:webp|jpg|jpeg|png|avif)$/.test(src)||src.includes('..'))throw new Error(`photo ${field}: expected local photographic source`);
 const path=resolve(root,'.'+src);
 if(!path.startsWith(root+sep)||!existsSync(path)||!statSync(path).isFile()||!realpathSync(path).startsWith(root+sep))throw new Error(`photo ${field}: source does not exist locally`);
}
function validatePhoto(photo){
 if(!photo||typeof photo!=='object')throw new Error('photo: expected properties');
 for(const key of ['src','srcset','sizes','width','height','alt','variant','priority'])if(!Object.hasOwn(photo,key))throw new Error(`photo ${key}: required`);
 if(typeof photo.alt!=='string')throw new Error('photo alt: explicit string required');
 for(const key of ['width','height'])if(!Number.isInteger(photo[key])||photo[key]<=0)throw new Error(`photo ${key}: positive integer required`);
 if(!variants.has(photo.variant))throw new Error('photo variant: unknown');
 if(!['high','eager','lazy'].includes(photo.priority))throw new Error('photo priority: unknown');
 localSource(photo.src,'src');
 if(typeof photo.srcset!=='string'||!photo.srcset.trim())throw new Error('photo srcset: required');
 const widths=new Set();for(const entry of photo.srcset.split(',')){
  const match=entry.trim().match(/^(\S+) ([1-9]\d*)w$/);if(!match)throw new Error('photo srcset: expected width descriptors');
  localSource(match[1],'srcset');if(widths.has(match[2]))throw new Error('photo srcset: duplicate width');widths.add(match[2]);
 }
 if(typeof photo.sizes!=='string'||!photo.sizes.trim())throw new Error('photo sizes: required');
 if(photo.className!==undefined && typeof photo.className!=='string')throw new Error('photo className: expected string');
 return {...photo,loading:photo.priority==='lazy'?'lazy':'eager',fetchpriority:photo.priority==='high'?'high':'auto'};
}
module.exports={validatePhoto};
