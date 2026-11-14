// Verify actual no-JavaScript print output, not merely computed screen visibility.
// Requires Chromium (Playwright or PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) and Poppler's pdftotext.
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { serve, loadPlaywright } from './lib/serve.mjs';
const temporary = mkdtempSync(path.join(os.tmpdir(), 'toza-pricing-print-'));
const server = await serve();
const { chromium } = loadPlaywright();
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
try {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(server.base + '/en/pricing/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.pricing-inclusions').count(), 3, 'all three tier disclosures must exist');
  assert.equal(await page.locator('details[open]').count(), 0, 'disclosures must start closed');
  const expected = await page.locator('.pricing-inclusions p, .pricing-inclusions li, .pricing-method p').allTextContents();
  assert.ok(expected.length >= 10, 'full tier inclusions and method text must exist');
  const document = path.join(temporary, 'pricing.pdf');
  await page.pdf({ path: document, format: 'A4', printBackground: true });
  const text = execFileSync('pdftotext', ['-layout', document, '-'], { encoding: 'utf8' }).replace(/\s+/g, ' ');
  // Compare each sentence, allowing layout whitespace introduced by PDF extraction.
  for (const body of expected) for (const sentence of body.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/)) {
    assert.ok(text.includes(sentence), `Printed inclusions omit: ${sentence}`);
  }
  console.log('Pricing PDF includes all closed disclosure content with JavaScript disabled.');
} finally {
  await browser.close(); server.close(); rmSync(temporary, { recursive: true, force: true });
}
