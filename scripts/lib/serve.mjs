// Shared helpers for browser gates: a static server for _site and the Playwright loader.
// Playwright comes from node_modules (CI) or PLAYWRIGHT_MODULE (agent sandbox).
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json" };

export async function serve(dir = "_site") {
  const server = createServer((req, res) => {
    let f = join(dir, decodeURIComponent(req.url.split("?")[0]));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); res.end("not found"); return; }
    res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

export function loadPlaywright() {
  const require = createRequire(import.meta.url);
  return require(process.env.PLAYWRIGHT_MODULE || "playwright");
}

// Every page of the built site, as URL paths ("/en/", "/en/faq/", ...).
export function pagePaths(dir = "_site") {
  const out = [];
  const walk = (d) => { for (const n of readdirSyncSafe(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n === "index.html") out.push("/" + p.slice(dir.length + 1).replace(/index\.html$/, "")); } };
  walk(dir);
  return out.filter((p) => p !== "/").sort();
}
import { readdirSync } from "node:fs";
const readdirSyncSafe = (d) => { try { return readdirSync(d); } catch { return []; } };

// Themes the site currently ships: light always; dark once tokens/CSS declare it.
export function themes() {
  const css = existsSync("styles/tokens.css") ? readFileSync("styles/tokens.css", "utf8") : "";
  return /data-theme=["']?dark/.test(css) ? ["light", "dark"] : ["light"];
}
