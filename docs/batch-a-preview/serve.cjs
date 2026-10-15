'use strict';
const {createSiteServer}=require('../../tests/helpers/site-server.cjs');
const server=createSiteServer();server.listen(8794,'127.0.0.1',()=>console.log('Batch A local preview: http://127.0.0.1:8794/_preview/'));
server.on('error',error=>{console.error(error);process.exit(1)});
