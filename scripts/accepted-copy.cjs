// Accepted Markdown is editorial authority, not a browser/runtime dependency.
// This adapter produces ordinary Nunjucks templates; --check detects drift.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const root = path.resolve(__dirname, '..');
const project = 'projects/toza-en-editorial-revision/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8').replace(/\r\n/g, '\n');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const manifest = JSON.parse(read(project + 'approved/acceptance-manifest.json'));
// Later approvals overlay the effective sources without replacing historical validation.
const amendments = [
  {path:'approved/acceptance-amendment-2026-10-10.json', routes:['index','pricing']},
  {path:'approved/acceptance-amendment-2026-10-10-round-02.json', routes:['index','pricing','separation-divorce','they-know-something']},
  {path:'approved/acceptance-amendment-2026-10-12-batch-a.json', routes:['why-us']},
  {path:'approved/acceptance-amendment-2026-10-12-batch-b.json', routes:['business-dispute','inheritance-clash','attorneys']},
  {path:'approved/acceptance-amendment-2026-10-13-batch-c.json', routes:['faq','what-happens-during-the-visit']},
  {path:'approved/acceptance-amendment-2026-10-14-marketing-02.json', routes:['index','why-us','pricing']},
  {path:'approved/acceptance-amendment-2026-10-15-pricing-04.json', routes:['pricing']},
].map(record=>({...record, manifest:JSON.parse(read(project+record.path))}));
const amendedSources = new Map(amendments.flatMap(record=>record.manifest.entries.map(entry=>[entry.route,entry])));
// Historical tests protect the approvals before marketing-02, regardless of
// how many later exact-copy amendments are added.
const historicalSources = new Map(amendments.slice(0,amendments.findIndex(record=>record.path==='approved/acceptance-amendment-2026-10-14-marketing-02.json')).flatMap(record=>record.manifest.entries.map(entry=>[entry.route,entry])));
const exact = p => read(project + p).split('## Exact revised copy\n\n')[1].split('\n## Unresolved red-team issues')[0].trimEnd() + '\n';
const sourceFor = entry => entry.format === 'raw-markdown' ? read(project + entry.path) : exact(entry.path);
function assertAuthority() {
  for (const entry of manifest.entries) if (hash(exact(entry.path)) !== entry.sha256) throw Error('Accepted copy changed: ' + entry.path);
  for (const entry of manifest.sourceFingerprints) if (hash(read(project + entry.path)) !== entry.sha256Lf) throw Error('Protected source changed: ' + entry.path);
  if (hash(read(project + manifest.protectedAssessment.path)) !== manifest.protectedAssessment.sha256) throw Error('Protected Assessment changed');
  for (const amendment of amendments) {
    const routes=amendment.manifest.entries.map(entry=>entry.route).sort();
    if (JSON.stringify(routes)!==JSON.stringify([...amendment.routes].sort())) throw Error('Unexpected copy amendment scope: '+amendment.path);
    for (const entry of amendment.manifest.entries) {
      if (entry.format !== undefined && (entry.format !== 'raw-markdown' || !['approved/acceptance-amendment-2026-10-14-marketing-02.json','approved/acceptance-amendment-2026-10-15-pricing-04.json'].includes(amendment.path))) throw Error('Unexpected source format: ' + entry.path);
      if (hash(sourceFor(entry)) !== entry.sha256) throw Error('Approved amendment changed: ' + entry.path);
    }
    if (amendment.manifest.visualCopy) {
      const entry=amendment.manifest.visualCopy;
      if (amendment.path!=='approved/acceptance-amendment-2026-10-15-pricing-04.json' || entry.path!=='revisions/pricing-04/VISUAL-COPY.md') throw Error('Unexpected visual-copy amendment');
      if (hash(read(project+entry.path))!==entry.sha256) throw Error('Approved visual copy changed');
    }
    if (amendment.manifest.presentation) {
      const entry = amendment.manifest.presentation;
      if (entry.route !== 'what-happens-during-the-visit' || entry.copySource !== 'revisions/en-02-v2/04-what-happens.md') throw Error('Unexpected presentation amendment scope');
      // The raw review fingerprint remains provenance; CRLF-to-LF is the only
      // permitted normalization, so Git checkout line endings cannot alter CI.
      if (hash(read(project + entry.path)) !== entry.sha256Lf) throw Error('Approved stage map changed');
      if (hash(exact(entry.copySource)) !== entry.copySha256) throw Error('Protected Process wording changed');
    }
  }
}
const mapping = [
  ['01-why-toza', 'why-us'], ['02-pricing', 'pricing'], ['03-faq', 'faq'],
  ['04-what-happens', 'what-happens-during-the-visit'], ['06-home', 'index'],
  ['07-separation-divorce', 'separation-divorce'], ['08-business-founder-dispute', 'business-dispute'],
  ['09-they-know-something', 'they-know-something'], ['10-inheritance-conflict', 'inheritance-clash'],
  ['11-for-attorneys', 'attorneys'], [null, 'private-exposure-assessment'],
];
const md = new MarkdownIt({ html: false, typographer: false });
const escape = md.utils.escapeHtml;
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function getPage(sourceName, route, {historical = false} = {}) {
  const amended = (historical ? historicalSources : amendedSources).get(route);
  const source = amended ? sourceFor(amended) : sourceName ? exact('revisions/en-02-v2/' + sourceName + '.md') : read(project + manifest.protectedAssessment.path);
  const metadata = {};
  const head = source.split(/#{2,3} Hero\n\n/)[0].replace(/\*\*/g, '');
  for (const [label, key] of [['Title', 'title'], ['Description', 'description'], ['Social description', 'og_description']]) {
    const value = head.match(new RegExp('^' + label + ': (.+)$', 'm'));
    if (!value) throw Error('Missing metadata ' + route + ': ' + label);
    metadata[key] = value[1];
  }
  let body = source.split(/#{2,3} Hero\n\n/)[1].trim();
  // These three lines are explicit image/link annotations, not public paragraphs.
  body = body.replace(/^Portrait caption: .+\n\n/m, '').replace(/^Portrait alt text: .+\n\n/m, '').replace(/^External link to cyberdrtabansky.com\.\n\n/m, '');
  // Protected PA uses specified link labels, rather than Markdown links.
  if (!sourceName) {
    body = body.replace(/\*\*Request a private conversation\*\*/g, '[Request a private conversation](#contact)')
      .replace('**See pricing**', '[See pricing](/en/pricing.html)')
      .replace('**How the work proceeds**', '[How the work proceeds](/en/what-happens-during-the-visit.html)')
      .replace('## Start with a private conversation', '## Start with a private conversation {#contact}');
  }
  // A contact marker specifies channel controls, not a literal sentence to print.
  body = body.replace(/\n\*\*Request a private conversation: WhatsApp \/ Signal\*\*\s*$/, '');
  const parts = body.split(/\n(?=## )/);
  const hero = parts.shift();
  return { sourceName, route, source, metadata, hero, sections: parts, marketing: amended?.format === 'raw-markdown', pricing04: amended?.path === 'revisions/pricing-04/pricing.md' };
}
const pages = (options = {}) => mapping.map(args => getPage(...args, options));
function renderMarkdown(markdown) {
  let html = md.render(markdown);
  html = html.replace(/<h([23])>(.*?) \{#([\w-]+)\}<\/h\1>/g, '<h$1 id="$3">$2</h$1>');
  html = html.replace(/<a href="(https:\/\/cyberdrtabansky.com(?:\/en\/)?)">/g, '<a href="$1" target="_blank" rel="noopener noreferrer">');
  return html;
}
function renderTables(html, sectionId) {
  let count = 0;
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, table) => {
    table = table.replace(/<th(\s[^>]*)?>/g, '<th scope="col"$1>');
    table = table.replace(/<tbody>([\s\S]*?)<\/tbody>/g, (_, rows) => '<tbody>' + rows.replace(/<tr>\s*<td([^>]*)>([\s\S]*?)<\/td>/g, '<tr><th scope="row"$1>$2</th>') + '</tbody>');
    return `<p class="table-hint">Scroll to compare →</p><div class="copy-table" role="region" aria-labelledby="${sectionId}" tabindex="0" data-table="${++count}"><table>${table}</table></div>`;
  });
}
function renderPage(page, {presentation = true} = {}) {
  if (presentation && page.pricing04) return require('./pricing-layout.cjs').render(page);
  const { route, metadata } = page;
  const permalink = route === 'index' ? '/en/index.html' : '/en/' + route + '.html';
  // Pages normalizes .html aliases to extensionless URLs with a 308.
  const canonical = 'https://toza-site.pages.dev/en/' + (route === 'index' ? '' : route);
  const fm = { layout: 'layouts/vault.njk', permalink, slug: route === 'index' ? '' : route, page_id: route, ...metadata, canonical, body_class: 'accepted-page ' + route + '-page' };
  if (presentation && page.marketing) fm.marketing_layout = true;
  if (presentation && route === 'what-happens-during-the-visit') fm.process_stages = true;
  let html = Object.entries(fm).map(([key, value]) => key + ': ' + JSON.stringify(value)).join('\n');
  html = '---\n' + html + '\n---\n{# Generated by scripts/accepted-copy.cjs. Change layout in the adapter; accepted wording remains locked. #}\n';
  let hero = renderMarkdown(page.hero).replace(/^<p>([\s\S]*?)<\/p>/, '<p class="hero-kicker">$1</p>');
  hero = hero.replace(/<a href="#contact">/g, '<a class="btn" href="#contact">');
  hero = hero.replace(/<p>(In person ·[^<]+|One senior expert ·[^<]+)<\/p>/g, '<p class="trust">$1</p>');
  html += `<section class="hero copy-hero"><div class="field" id="hero-field" aria-hidden="true"></div><div class="wrap">${hero}</div></section>\n`;
  if (route === 'faq') html += '<div class="wrap faq-tools"><button type="button" class="btn ghost" data-faq-toggle-all aria-expanded="false" data-open-label="Expand all answers" data-close-label="Collapse all answers">Expand all answers</button></div>\n';
  for (const section of page.sections) {
    const [heading, ...rest] = section.split('\n');
    const label = heading.replace(/^## /, '').replace(/ \{#[\w-]+\}$/, '');
    const explicitId = heading.match(/\{#([\w-]+)\}/)?.[1];
    const id = explicitId || slugify(label);
    const contact = id === 'contact';
    let content = renderMarkdown(rest.join('\n'));
    if (route === 'faq' && !contact) {
      content = content.replace(/<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g, (_, question, answer) => `<details id="${slugify(question)}"><summary>${question}</summary><div class="faq-answer">${answer}</div></details>`);
    }
    content = renderTables(content, id + '-heading');
    if (route === 'index' && id === 'situations') {
      content = content.replace(/(<h3>[\s\S]*?<\/h3>\s*<p>[\s\S]*?<\/p>)/g, '<article class="situation-card">$1</article>');
      content = content.replace(/(<article[\s\S]*<\/article>)/, '<div class="situation-pair">$1</div>');
    }
    const offer = content.includes('₪3,600 including VAT</strong>') && content.includes('Typically four hours');
    const classes = ['copy-section', route === 'faq' && !contact ? 'faq' : '', contact ? 'copy-contact' : '', offer ? 'copy-offer' : ''].filter(Boolean).join(' ');
    if (route === 'private-exposure-assessment' && contact) content = content.replace(/<p><a href="#contact">Request a private conversation<\/a><\/p>\s*$/, '');
    html += `<section class="${classes}" id="${id}" aria-labelledby="${id}-heading"><div class="wrap copy-body"><h2 id="${id}-heading">${escape(label)}</h2>\n`;
    if (route === 'why-us' && label === 'A personal note') {
      html += '<div class="founder-layout"><figure class="portrait"><img src="/assets/img/dr-tabansky-portrait-square-640.webp" width="640" height="640" alt="Portrait of Dr. Lior Tabansky" loading="lazy" decoding="async"><figcaption>Dr. Lior Tabansky, founder of Toza</figcaption></figure><div>' + content + '</div></div>';
    } else html += content;
    if (contact) html += '{% include "contact-channels.njk" %}\n';
    html += '</div></section>\n';
  }
  if (!presentation) return html;
  if (page.marketing) return require('./marketing-layout.cjs').present(html, route);
  const common = require('./home-pricing-narrative.cjs').present(require('./clear-practice.cjs').present(html, route), route);
  return route === 'what-happens-during-the-visit' ? require('./process-stages.cjs').present(common) : common;
}
function sync(check = false) {
  assertAuthority();
  for (const page of pages()) {
    const target = 'src/en/' + page.route + '.njk';
    const expected = renderPage(page);
    if (check) { if (read(target) !== expected) throw Error('Rendered source drift: ' + target); }
    else if (!fs.existsSync(path.join(root, target)) || read(target) !== expected) fs.writeFileSync(path.join(root, target), expected);
  }
  console.log(check ? 'ACCEPTED SOURCES AND TEMPLATE FIDELITY VERIFIED' : 'Accepted English templates synchronized');
}
if (require.main === module) sync(process.argv.includes('--check'));
module.exports = { read, exact, project, pages, mapping, md, assertAuthority, renderMarkdown, renderPage, sync };
