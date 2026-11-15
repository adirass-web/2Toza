import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

test('legacy anchor audit fails on missing anchors and unmapped destinations', () => {
  const root=mkdtempSync(join(tmpdir(),'toza-legacy-audit-'));
  try {
    const old=join(root,'old'),site=join(root,'site');
    mkdirSync(join(old,'en'),{recursive:true});mkdirSync(join(site,'en','new'),{recursive:true});
    writeFileSync(join(site,'_redirects'),'/en/old.html /en/new/ 301\n');
    writeFileSync(join(old,'en','old.html'),'<a href="#present">ok</a>');
    writeFileSync(join(site,'en','new','index.html'),'<main id="present"></main>');
    const run=()=>spawnSync(process.execPath,['scripts/audit-legacy-anchors.mjs',old,site],{encoding:'utf8'});
    assert.equal(run().status,0,'valid redirected anchor must pass');
    writeFileSync(join(old,'en','old.html'),'<a href="#missing">bad anchor</a>');
    let result=run();assert.notEqual(result.status,0,'missing anchor must fail');assert.match(result.stdout,/#missing/);
    writeFileSync(join(old,'en','old.html'),'<a href="/en/absent.html#missing">missing page</a>');
    result=run();assert.notEqual(result.status,0,'unmapped destination must fail');assert.match(result.stdout,/absent.html/);
  } finally {rmSync(root,{recursive:true,force:true});}
});
