import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function site(files, callback) {
  const root = mkdtempSync(join(tmpdir(), 'toza-links-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      const file = join(root, name); mkdirSync(join(file, '..'), { recursive: true }); writeFileSync(file, content);
    }
    return callback(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
const run = root => spawnSync(process.execPath, ['scripts/check-links.mjs', root], { encoding: 'utf8' });
test('resolves relative paths from directory and html URLs including assets and fragments', () => {
  site({ 'index.html': '<a href="/en/#part">part</a>', 'en/index.html': '<h1 id="part">Hello</h1><a href="../assets/item.svg">image</a><a href="page.html#section">page</a>', 'en/page.html': '<a href="../assets/item.svg">image</a><h1 id="section">Section</h1>', 'assets/item.svg': '<svg/>' }, root => assert.equal(run(root).status, 0, run(root).stderr));
});
test('reports missing assets and missing anchors', () => {
  site({ 'index.html': '<a href="/missing.png">x</a><a href="/en/#nope">x</a>', 'en/index.html': '<h1 id="yes">Hi</h1>' }, root => { const result = run(root); assert.equal(result.status, 1); assert.match(result.stderr, /missing\.png/); assert.match(result.stderr, /nope/); });
});
