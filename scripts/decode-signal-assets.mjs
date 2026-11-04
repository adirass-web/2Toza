// Signal design preview: photos live in the branch as base64 text payloads
// (design-assets/signal/*.b64) because the branch is authored via the GitHub
// API, which cannot carry binary blobs. Long payloads may be split into
// ordered chunks named NAME.b64.partNN (NN = 01, 02, ...) which are
// concatenated before decoding; chunks take precedence over a single
// NAME.b64 for the same target. This step decodes them into signal/assets/
// before Eleventy passthrough-copies signal/ to _site/.
// Decoded output is gitignored; the .b64 files are the source of truth.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const SRC = "design-assets/signal";
const DEST = "signal";

if (!existsSync(SRC)) {
  console.log("signal assets: no payloads, skipping");
  process.exit(0);
}

const singles = new Map(); // base name -> filename
const parts = new Map(); // base name -> [{n, filename}]
for (const f of readdirSync(SRC)) {
  const m = f.match(/^(.*\.b64)\.part(\d+)$/);
  if (m) {
    const list = parts.get(m[1]) ?? [];
    list.push({ n: parseInt(m[2], 10), filename: f });
    parts.set(m[1], list);
  } else if (f.endsWith(".b64")) {
    singles.set(f, f);
  }
}

let n = 0;
const targets = new Set([...singles.keys(), ...parts.keys()]);
for (const base of targets) {
  let b64;
  if (parts.has(base)) {
    b64 = parts.get(base)
      .sort((a, b) => a.n - b.n)
      .map((p) => readFileSync(join(SRC, p.filename), "utf8").trim())
      .join("");
  } else {
    b64 = readFileSync(join(SRC, singles.get(base)), "utf8");
  }
  const rel = base.replace(/\.b64$/, "").replaceAll("__", "/");
  const out = join(DEST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(b64, "base64"));
  n++;
}
console.log(`signal assets: decoded ${n} files`);
