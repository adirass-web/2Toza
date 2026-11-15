import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import postcss from 'postcss';

test('FAQ and Conditions styles use design tokens for non-print colors', () => {
  const css = readFileSync('approved-en-assets/css/reference-pages.css', 'utf8');
  const root = postcss.parse(css);
  const violations = [];
  root.walkDecls((decl) => {
    let parent = decl.parent;
    while (parent) {
      if (parent.type === 'atrule' && parent.name === 'media' && /\bprint\b/i.test(parent.params)) return;
      parent = parent.parent;
    }
    if (/#[\da-f]{3,8}\b|\brgba?\(/i.test(decl.value)) violations.push(`${decl.source.start.line}: ${decl.prop}: ${decl.value}`);
  });
  assert.deepEqual(violations, []);
});
