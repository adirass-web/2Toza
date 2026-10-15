'use strict';
// Add preview indexing policy to the existing global rule without replacing its headers.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const target = path.resolve(__dirname, '../_site/_headers');
const original = fs.readFileSync(target, 'utf8');
assert.equal((original.match(/^\/\*\s*$/gm) || []).length, 1, 'Exactly one global header rule required');
assert(!/^\s*X-Robots-Tag:/im.test(original), 'Preview indexing already configured');
const updated = original.replace(/^\/\*\r?$/m, '/*\n  X-Robots-Tag: noindex, nofollow');
assert.notEqual(updated, original, 'Global rule must receive preview policy');
const globalRule = updated.match(/^\/\*\r?\n((?:[ \t]+[^\r\n]+\r?\n)+)/m)?.[1];
assert(globalRule, 'Global header block must exist');
for (const header of [
  'X-Robots-Tag: noindex, nofollow',
  'X-Frame-Options: DENY',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()'
]) assert(globalRule.includes(header), 'Preview must preserve ' + header);
fs.writeFileSync(target, updated);
console.log('PREVIEW HEADERS VERIFIED: noindex added; all global security headers preserved.');
