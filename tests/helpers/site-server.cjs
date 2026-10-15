const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..", "_site");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function localPath(pathname) {
  let relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  if (!relative || relative.endsWith("/")) {
    relative = path.posix.join(relative, "index.html");
  } else if (!path.posix.extname(relative)) {
    relative = path.posix.join(relative, "index.html");
  }

  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null;
  return candidate;
}

function createSiteServer() {
  return http.createServer((request, response) => {
    let pathname;
    try {
      pathname = new URL(request.url, "http://127.0.0.1").pathname;
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }

    let target;
    try {
      target = localPath(pathname);
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }
    if (!target) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    fs.stat(target, (error, stats) => {
      if (error || !stats.isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      if (request.method === "HEAD") {
        response.end();
        return;
      }
      fs.createReadStream(target).pipe(response);
    });
  });
}

module.exports = { createSiteServer };
