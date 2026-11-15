import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateCss, readTokens } from './build-tokens.mjs';

test('both theme consumers are generated from the approved grey token source', () => {
  const generated = generateCss(readTokens());
  assert.match(generated, /--color-paper:\s*#e0e0e0\b/i);
  assert.match(generated, /--color-ink:\s*#232323\b/i);
  assert.match(generated, /--font-body:\s*"Frank Ruhl Libre"/);
  for (const file of ['styles/tokens.css', 'styles/approved-en-tokens.css']) {
    assert.equal(readFileSync(file, 'utf8'), generated, `${file} must match the canonical tokens`);
  }
});

test('generator check detects either stale consumer without rewriting it', async () => {
  const { mkdtempSync, mkdirSync, cpSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const root = mkdtempSync(join(tmpdir(), 'toza-token-check-'));
  try {
    for (const dir of ['scripts', 'styles', 'tokens']) mkdirSync(join(root, dir));
    cpSync('scripts/build-tokens.mjs', join(root, 'scripts/build-tokens.mjs'));
    cpSync('tokens/tokens.json', join(root, 'tokens/tokens.json'));
    const generated = generateCss(readTokens());
    const files = ['tokens.css', 'approved-en-tokens.css'];
    for (const name of files) writeFileSync(join(root, 'styles', name), generated);
    const check = () => spawnSync(process.execPath, [join(root, 'scripts/build-tokens.mjs'), '--check'], { encoding: 'utf8' });
    assert.equal(check().status, 0);
    for (const name of files) {
      const path = join(root, 'styles', name);
      writeFileSync(path, generated + '/* stale */');
      const result = check();
      assert.equal(result.status, 1, `${name} must fail`);
      assert.match(result.stderr, /stale/);
      assert.match(readFileSync(path, 'utf8'), /stale/, 'check must not rewrite');
      writeFileSync(path, generated);
    }
  } finally { rmSync(root, { recursive: true, force: true }); }
});
