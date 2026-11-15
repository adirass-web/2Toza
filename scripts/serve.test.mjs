import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request } from 'node:http';
import { serve } from './lib/serve.mjs';

test('server only serves indexed build files, rejecting traversal and symlinks', async () => {
  const parent = mkdtempSync(join(tmpdir(), 'toza-serve-'));
  const root = join(parent, 'site'); mkdirSync(root);
  writeFileSync(join(root, 'index.html'), 'site');
  writeFileSync(join(parent, 'secret.txt'), 'secret');
  symlinkSync(join(parent, 'secret.txt'), join(root, 'link.txt'));
  const server = await serve(root);
  const get = (path) => new Promise((resolve, reject) => {
    const req = request(server.base + path, res => { let body = ''; res.on('data', d => body += d); res.on('end', () => resolve({ status: res.statusCode, body })); });
    req.on('error', reject); req.end();
  });
  try {
    assert.deepEqual(await get('/'), { status: 200, body: 'site' });
    assert.equal((await get('/link.txt')).status, 404);
    assert.equal((await get('/%2e%2e%2fsecret.txt')).status, 404);
    assert.equal((await get('/%')).status, 400);
  } finally { server.close(); rmSync(parent, { recursive: true, force: true }); }
});
