import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const env = { ...process.env, SITE_ENV: 'production', SITE_URL: 'https://tozasecurity.com' };
test('approved copy check catches corruption in production even with intact preview', () => {
  const file = '_site-production/en/exposure/index.html';
  const original = readFileSync(file, 'utf8');
  try {
    const changed = original.replace(/(<article[^>]*>)/, '$1<p>Unapproved changed copy.</p>');
    assert.notEqual(changed, original);
    writeFileSync(file, changed);
    const result = spawnSync(process.execPath, ['scripts/check-approved-en.mjs'], { env, encoding: 'utf8' });
    assert.notEqual(result.status, 0, 'production copy corruption must be detected');
    assert.match(result.stdout + result.stderr, /approved copy parity/);
  } finally { writeFileSync(file, original); }
});
test('facts check reads production output instead of preview', () => {
  const file = '_site-production/en/exposure/index.html'; const original = readFileSync(file, 'utf8');
  try {
    writeFileSync(file, original.replace('</main>', '<p>₪999,999</p></main>'));
    const result = spawnSync(process.execPath, ['scripts/check-facts.mjs'], { env, encoding: 'utf8' });
    assert.notEqual(result.status, 0, 'production facts corruption must be detected');
  } finally { writeFileSync(file, original); }
});
test('link check reads production output instead of preview', () => {
  const file = '_site-production/en/exposure/index.html'; const original = readFileSync(file, 'utf8');
  try {
    writeFileSync(file, original.replace('</main>', '<a href="/missing-release-page/">missing</a></main>'));
    const result = spawnSync(process.execPath, ['scripts/check-links.mjs'], { env, encoding: 'utf8' });
    assert.notEqual(result.status, 0, 'production link corruption must be detected');
  } finally { writeFileSync(file, original); }
});
