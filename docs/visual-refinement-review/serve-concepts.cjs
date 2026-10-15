'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {createSiteServer}=require('../../tests/helpers/site-server.cjs');const site=createSiteServer();
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://127.0.0.1').pathname;
  if(!pathname.startsWith('/_concept/')){site.emit('request',req,res);return}
  const relative=decodeURIComponent(pathname.slice('/_concept/'.length))||'concept-gallery.html',target=path.resolve(__dirname,relative);
  if(!target.startsWith(__dirname+path.sep)){res.writeHead(403).end();return}
  fs.stat(target,(error,s)=>{if(error||!s.isFile()){res.writeHead(404).end();return}res.writeHead(200,{'Content-Type':target.endsWith('.png')?'image/png':target.endsWith('.css')?'text/css; charset=utf-8':target.endsWith('.html')?'text/html; charset=utf-8':'application/json; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});if(req.method==='HEAD'){res.end();return}fs.createReadStream(target).pipe(res)})
});
server.listen(8797,'127.0.0.1',()=>console.log('Planning concepts: http://127.0.0.1:8797/_concept/'));
server.on('error',e=>{console.error(e);process.exit(1)});
