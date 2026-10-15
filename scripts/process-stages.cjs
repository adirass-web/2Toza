// D-033: group the approved Process steps; preserve every node's wording and order.
const {parseDocument} = require('htmlparser2');
const D = require('domutils');
const serialize = require('dom-serializer').default;
const cls = (root, name) => D.findAll(n => (n.attribs?.class || '').split(' ').includes(name), root.children || []);
const element = html => parseDocument(html).children[0];
const stages = [
  ['decide-whether-toza-fits-before-you-buy', 2],
  ['your-paid-assessment-inspection-diagnosis-and-urgent-first-aid', 3],
  ['have-the-agreed-setup-hardened-around-your-life', 3],
];
function present(template) {
  const start = template.indexOf('<section');
  const directives = [];
  const doc = parseDocument(template.slice(start).replace(/\{%[\s\S]*?%\}/g, token => {
    directives.push(token); return `<!--TOZA_DIRECTIVE_${directives.length - 1}-->`;
  }));
  const sections = cls(doc, 'copy-section');
  let stepNumber = 0;
  for (const [id, count] of stages) {
    const section = sections.find(n => n.attribs.id === id);
    if (!section) throw Error('Missing approved Process stage: ' + id);
    section.attribs.class += ' process-stage';
    const detail = cls(section, 'section-detail')[0];
    const children = [...detail.children];
    let step, found = 0;
    for (const node of children) {
      if (node.name === 'h3') {
        const number = ++stepNumber;
        if (!D.textContent(node).startsWith(number + '. ')) throw Error('Approved Process step order changed');
        step = element(`<div class="process-step" data-process-step="${number}"></div>`);
        D.prepend(node, step);
        found++;
      }
      if (step) D.appendChild(step, node);
    }
    if (found !== count) throw Error('Approved Process step grouping changed');
  }
  const assessment = sections.find(n => n.attribs.id === stages[1][0]);
  const lastStep = cls(assessment, 'process-step')[2];
  const paragraphs = lastStep.children.filter(n => n.name === 'p');
  if (paragraphs.length !== 3 || !D.textContent(paragraphs[0]).startsWith('You receive a clear summary') || !D.textContent(paragraphs[1]).startsWith('The initial visit completes')) throw Error('Missing Assessment summary or separate purchase boundary');
  paragraphs[0].attribs.class = 'process-summary';
  paragraphs[1].attribs.class = 'process-decision';
  sections.find(n => n.attribs.id === stages[2][0]).attribs.class += ' process-full-engagement';
  return template.slice(0, start) + serialize(doc).replace(/<!--TOZA_DIRECTIVE_(\d+)-->/g, (_, i) => directives[Number(i)]);
}
module.exports = {present};
