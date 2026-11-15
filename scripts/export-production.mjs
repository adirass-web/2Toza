// Export a local review bundle. This does not build, deploy, or replace CI provenance.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { Parser } from 'htmlparser2';
const origin = 'https://toza-site.pages.dev';
const controls = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml'];
export function exportProduction({ source = '_site-production', destination, sourceSha = null } = {}) {
  if (!destination) throw new Error('Pass a new destination directory');
  source = path.resolve(source); destination = path.resolve(destination);
  if (existsSync(destination)) throw new Error('Destination already exists; choose a new directory');
  if (destination.startsWith(source + path.sep)) throw new Error('Destination must be outside the source');
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error(`Refusing symlink: ${entry.name}`);
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile()) files.push(path.relative(source, file).split(path.sep).join('/'));
      else throw new Error(`Unsupported file: ${file}`);
    }
  }
  walk(source);
  const available = new Set(files), selected = new Set();
  const read = file => readFileSync(path.join(source, file), 'utf8');
  for (const file of controls) if (!available.has(file)) throw new Error(`Missing production control file: ${file}`);
  if (/X-Robots-Tag:\s*noindex/i.test(read('_headers')) || /Disallow:\s*\//i.test(read('robots.txt'))) throw new Error('Production output must not be noindex');
  if (!available.has('index.html')) throw new Error('Missing root index.html');
  // Only exact, single-hop local navigation redirects are supported here.
  // Wildcards, external targets and rewrite rules are not missing-file exemptions.
  const redirects = read('_redirects').split(/\r?\n/).map(line => line.trim().split(/\s+/))
    .filter(([from, to, status]) => from?.startsWith('/') && !/[*:]/.test(from) && to?.startsWith('/') && !to.startsWith('//') && /^(301|302|303|307|308)!?$/.test(status || ''));
  function reference(value, from, navigation = false) {
    if (!value || /^(?:#|data:|mailto:|tel:|javascript:)/i.test(value)) return;
    let url;
    try { url = new URL(value, `${origin}/${from}`); } catch { throw new Error(`Invalid URL ${value} in ${from}`); }
    if (url.origin !== origin) return;
    let name = decodeURIComponent(url.pathname).replace(/^\//, '');
    if (name.endsWith('/') || !name) name += 'index.html';
    if (!available.has(name) && available.has(name + '/index.html')) name += '/index.html';
    if (!available.has(name) && navigation) {
      const redirect = redirects.find(([route]) => route === url.pathname);
      if (redirect) return reference(redirect[1], from);
    }
    if (!available.has(name)) throw new Error(`Missing local reference: ${value} in ${from}`);
    add(name);
  }
  function add(file) {
    if (selected.has(file)) return;
    selected.add(file);
    if (!/\.(html|css|svg|js)$/i.test(file)) return;
    const text = read(file);
    if (/\.html$/i.test(file) && file !== '404.html' && /<meta\s+name=["']robots["'][^>]*noindex/i.test(text)) throw new Error(`Production page has noindex: ${file}`);
    if (/\.(html|svg)$/i.test(file)) {
      const parser = new Parser({ onopentag(tag, attrs) {
        for (const attr of ['src', 'href', 'poster', 'xlink:href']) if (attrs[attr]) reference(attrs[attr], file, attr === 'href' && ['a', 'area'].includes(tag));
        if (attrs.srcset) for (const item of attrs.srcset.split(',')) reference(item.trim().split(/\s+/)[0], file);
        if (tag === 'meta' && /^og:(image|url)$/.test(attrs.property || '')) reference(attrs.content, file);
      } }, { decodeEntities: true });
      parser.write(text); parser.end();
    }
    // CSS dependencies, including inline styles and SVG paint-server URLs.
    for (const match of text.matchAll(/url\(\s*["']?([^"'\s)]+)["']?\s*\)/g)) reference(match[1], file);
    if (/\.css$/i.test(file)) for (const match of text.matchAll(/@import\s+["']([^"']+)["']/g)) reference(match[1], file);
    // Current bundled JS has no dynamic asset loader; include literal local asset URLs.
    if (/\.js$/i.test(file)) for (const match of text.matchAll(/["'`](\/(?:assets|approved-en-assets)\/[^"'`\s]+)["'`]/g)) reference(match[1], file);
  }
  for (const file of files.filter(file => file.endsWith('.html')).sort()) add(file);
  for (const file of controls) add(file);
  // Attribution/license documents are deliberately retained even when not linked.
  for (const file of files.filter(file => /(?:^|\/)(?:licenses?|credits|sources)(?:\/|\.|$)/i.test(file))) add(file);
  const entries = [...selected].sort().map(file => {
    const data = readFileSync(path.join(source, file));
    return { path: file, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') };
  });
  const manifest = { schema: 1, kind: 'local-production-review-export', origin, sourceSha, files: entries,
    totalBytes: entries.reduce((n, file) => n + file.bytes, 0), omitted: files.filter(file => !selected.has(file)).sort() };
  mkdirSync(path.join(destination, 'site'), { recursive: true });
  for (const file of entries) {
    const target = path.join(destination, 'site', file.path);
    mkdirSync(path.dirname(target), { recursive: true }); copyFileSync(path.join(source, file.path), target);
  }
  writeFileSync(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const sourceSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const result = exportProduction({ destination: process.argv[2], sourceSha });
    console.log(`Exported ${result.files.length} files (${result.totalBytes} bytes); omitted ${result.omitted.length} unreferenced files. See manifest.json. Local review bundle only; CI verification is still required.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
