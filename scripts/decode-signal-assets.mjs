// Signal design preview: photos live in the branch as base64 text payloads
// (design-assets/signal/*.b64) because the branch is authored via the GitHub
// API, which cannot carry binary blobs. This step decodes them into
// signal/assets/ before Eleventy passthrough-copies signal/ to _site/.
// Decoded output is gitignored; the .b64 files are the source of truth.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const SRC = "design-assets/signal";
const DEST = "signal";

if (!existsSync(SRC)) {
  console.log("signal assets: no payloads, skipping");
  process.exit(0);
}
let n = 0;
for (const f of readdirSync(SRC)) {
  if (!f.endsWith(".b64")) continue;
  const rel = f.replace(/\.b64$/, "").replaceAll("__", "/");
  const out = join(DEST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(readFileSync(join(SRC, f), "utf8"), "base64"));
  n++;
}
console.log(`signal assets: decoded ${n} files`);
