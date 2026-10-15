'use strict';
// Presentation mapping for the frozen marketing-02 Home and Why sources.
// Pricing uses its own approved adapter; historical sources remain intact.
const {parseDocument} = require('htmlparser2');
const D = require('domutils');
const serialize = require('dom-serializer').default;
const find = (n, fn) => D.findAll(fn, n.children || []);
const tags = (n, name) => find(n, x => x.type === 'tag' && x.name === name);
const cls = (n, name) => find(n, x => (x.attribs?.class || '').split(/\s+/).includes(name));
const element = html => parseDocument(html).children[0];
const text = n => D.textContent(n).replace(/\s+/g, ' ').trim();
const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const move = (node, parent) => { if (!node || !parent) throw Error('Missing marketing layout block'); D.appendChild(parent, node); };
function group(nodes, className) { const n = element(`<div class="${className}"></div>`); nodes.forEach(x => move(x, n)); return n; }
const jumps = {
  index: [['personal-shield','Personal Shield'],['assessment','Threat assessment'],['situations','Your situation'],['contact','Contact']],
  'why-us': [['experience','Experience'],['methods','Methods'],['assessment','Assessment to protection'],['contact','Contact']],
};
function present(template, route) {
  if (!jumps[route]) throw Error('Unexpected marketing route: ' + route);
  const start = template.indexOf('<section');
  const prefix = template.slice(0, start).replace(/body_class: "([^"]+)"/, 'body_class: "marketing-page $1"');
  const directives = [];
  const markup = template.slice(start).replace(/\{%[\s\S]*?%\}/g, token => {
    directives.push(token); return '<!--TOZA_DIRECTIVE_' + (directives.length-1) + '-->';
  });
  const doc = parseDocument(markup);
  cls(doc, 'field').forEach(D.removeElement);
  const hero = cls(doc, 'copy-hero')[0], wrap = cls(hero, 'wrap')[0];
  const lead = group([...wrap.children], 'hero-lead'); move(lead, wrap);
  if (route === 'index') move(element('<figure class="marketing-portrait"><img src="/assets/img/dr-tabansky-portrait-square-640.webp" width="640" height="640" alt="Portrait of Dr. Lior Tabansky" decoding="async"><figcaption data-presentation-ui>Dr. Lior Tabansky, founder of Toza</figcaption></figure>'), wrap);
  const index = element('<nav class="page-index wrap" aria-label="On this page" data-presentation-ui></nav>');
  for (const [id, label] of jumps[route]) {
    if (!find(doc, n => n.attribs?.id === id).length) throw Error('Missing marketing destination: ' + id);
    move(element(`<a href="#${id}">${escape(label)}</a>`), index);
  }
  D.append(hero, index);
  const sections = cls(doc, 'copy-section');
  for (const section of sections) {
    const body = cls(section, 'copy-body')[0], heading = tags(body, 'h2')[0];
    const rest = body.children.filter(n => n !== heading);
    move(group([heading], 'section-title'), body);
    const detail = group(rest, 'section-detail'); move(detail, body);
    if (section.attribs.id === 'assessment') section.attribs.class += ' copy-offer';
    if (tags(detail, 'table').length) section.attribs.class += ' has-tables';
    if (section.attribs.id === 'contact') {
      // Keep source paragraphs in order; put the existing channel controls
      // immediately after the introduction so they remain easy to reach.
      const channel = detail.children.find(n => n.type === 'comment' && directives[Number(n.data.match(/TOZA_DIRECTIVE_(\d+)/)?.[1])] === '{% include "contact-channels.njk" %}');
      const intro = detail.children.find(n => n.name === 'p');
      if (!channel || !intro) throw Error('Missing marketing contact introduction/channels');
      D.append(intro, channel);
      const guidance = tags(detail, 'h3').find(n => n.attribs?.id === 'contact-guidance');
      if (guidance) {
        const remaining = []; for (let n = guidance.next; n; n = n.next) remaining.push(n);
        const disclosure = element('<details class="supporting-detail contact-guidance"><summary></summary><div class="detail-content"></div></details>');
        D.prepend(guidance, disclosure);
        move(guidance, tags(disclosure, 'summary')[0]);
        remaining.forEach(n => move(n, cls(disclosure, 'detail-content')[0]));
      }
    }
    if (section.attribs.id === 'service-details') {
      const disclosure = element('<details class="section-disclosure"><summary></summary></details>');
      move(heading, tags(disclosure, 'summary')[0]); move(detail, disclosure);
      D.removeElement(cls(section, 'section-title')[0]); move(disclosure, body);
      section.attribs.class += ' is-disclosure';
    }
  }
  cls(doc, 'table-hint').forEach(D.removeElement);
  for (const table of tags(doc, 'table')) {
    table.attribs.role = 'table';
    const head = tags(table, 'thead')[0], body = tags(table, 'tbody')[0];
    if (!head || !body) throw Error('Missing marketing table headers/body');
    const headers = tags(head, 'th').map(text);
    head.attribs.role = body.attribs.role = 'rowgroup';
    tags(table, 'tr').forEach(n => { n.attribs.role = 'row'; });
    tags(table, 'th').forEach(n => { n.attribs.role = n.attribs.scope === 'row' ? 'rowheader' : 'columnheader'; delete n.attribs.style; });
    for (const row of tags(body, 'tr')) tags(row, 'td').forEach((cell, i) => {
      cell.attribs.role = 'cell'; delete cell.attribs.style;
      D.prependChild(cell, element(`<span class="mobile-col" aria-hidden="true" data-presentation-ui>${escape(headers[i+1])}</span>`));
    });
  }
  return prefix + serialize(doc).replace(/<!--TOZA_DIRECTIVE_(\d+)-->/g, (_, i) => directives[Number(i)]);
}
module.exports = {present};
