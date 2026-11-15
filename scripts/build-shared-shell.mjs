// Derive the legacy-page shell stylesheet from the Home stylesheet's shell rules.
// This keeps the approved Home header as the single source of truth.
import { readFileSync, writeFileSync } from 'node:fs';
import postcss from 'postcss';
const source = postcss.parse(readFileSync('styles/approved-en.css', 'utf8'));
const output = postcss.root();
const shell = /\.(?:site-header|masthead|brand(?:-descriptor)?|primary-nav|nav-pending|destination-language|header-actions|header-contact|language-switch|skip-link|approved-footer)(?![\w-])/;
function copy(node, parent) {
  if (node.type === 'rule') {
    if (node.selector === ':root') {
      const root = node.clone();
      root.walkDecls('--color-on-photo', decl => decl.remove());
      parent.append(root);
      return;
    }
    const selectors = node.selectors.filter(s => shell.test(s));
    if (selectors.length) parent.append(node.clone({ selector: selectors.join(',') }));
  } else if (node.type === 'atrule' && node.name === 'media') {
    const media = node.clone({ nodes: [] });
    for (const child of node.nodes || []) copy(child, media);
    if (media.nodes.length) parent.append(media);
  }
}
for (const node of source.nodes) copy(node, output);
writeFileSync('approved-en-assets/css/shared-shell.css', `/* Generated from styles/approved-en.css by scripts/build-shared-shell.mjs. */\n${output.toString()}\n`);
