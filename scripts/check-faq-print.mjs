// Verify nested closed FAQ answers in actual print output without JavaScript.
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { serve, loadPlaywright } from './lib/serve.mjs';

const temporary = mkdtempSync(path.join(os.tmpdir(), 'toza-faq-print-'));
const server = await serve();
const browser = await loadPlaywright().chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
try {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(server.base + '/en/faq/', { waitUntil: 'networkidle' });
  for (const id of ['a1', 'c1']) {
    assert.equal(await page.locator(`#${id}`).evaluate(e => e.open), false, `${id} must start closed`);
  }
  assert.equal(await page.locator('#c1').evaluate(e => e.closest('[data-secondary]').open), false, 'secondary group must start closed');
  const firstSentences = await page.locator('#a1 > div p, #c1 > div p').evaluateAll(nodes => nodes.map(n => n.textContent.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/)[0]));
  assert.equal(firstSentences.length, 2, 'both sample answers must exist');
  const document = path.join(temporary, 'faq.pdf');
  await page.pdf({ path: document, format: 'A4', printBackground: true });
  const text = execFileSync('pdftotext', ['-layout', document, '-'], { encoding: 'utf8' }).replace(/\s+/g, ' ');
  for (const sentence of firstSentences) assert.ok(text.includes(sentence), `FAQ PDF omits answer: ${sentence}`);
  console.log('FAQ PDF includes primary and nested closed answers with JavaScript disabled.');
} finally {
  await browser.close(); server.close(); rmSync(temporary, { recursive: true, force: true });
}
