// Shared helpers for browser gates: a static server for _site and the Playwright loader.
// Playwright comes from node_modules (CI) or PLAYWRIGHT_MODULE (agent sandbox).
import { createServer } from "node:http";
import { siteDir } from "../util.mjs";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json" };

export async function serve(dir = siteDir()) {
  // Resolve only files discovered under the build root; never interpret a request
  // path as a filesystem path, and do not follow symlinks out of the root.
  const files = new Map();
  const collect = (directory, urlPrefix = "") => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      const url = `${urlPrefix}/${entry.name}`;
      if (entry.isDirectory()) collect(file, url);
      else if (entry.isFile()) {
        files.set(url, file);
        if (entry.name === "index.html") {
          files.set(`${urlPrefix}/`, file);
          if (urlPrefix) files.set(urlPrefix, file);
        }
      }
    }
  };
  collect(dir);
  const server = createServer((req, res) => {
    let path;
    try { path = decodeURIComponent(req.url.split("?")[0]); }
    catch { res.writeHead(400); res.end("bad request"); return; }
    const f = files.get(path);
    if (!f) { res.writeHead(404); res.end("not found"); return; }
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
export function pagePaths(dir = siteDir()) {
  const out = [];
  const walk = (d) => { for (const n of readdirSyncSafe(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith(".html") && !p.slice(dir.length + 1).replace(/\\/g, "/").startsWith("assets/previews/")) out.push("/" + p.slice(dir.length + 1).replace(/\\/g, "/").replace(/index\.html$/, "")); } };
  walk(dir);
  return out.sort();
}
import { readdirSync } from "node:fs";
const readdirSyncSafe = (d) => { try { return readdirSync(d); } catch { return []; } };

// Themes the site currently ships: light always; dark once tokens/CSS declare it.
export function themes() {
  const css = existsSync("styles/tokens.css") ? readFileSync("styles/tokens.css", "utf8") : "";
  return /data-theme=["']?dark/.test(css) ? ["light", "dark"] : ["light"];
}
