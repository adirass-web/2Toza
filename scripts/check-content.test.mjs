// Regression coverage for P3's layout-aware content validation. Mutations live
// only in an isolated fixture, never in the working checkout.
import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

test("content validation enforces layout support, required actions and visible copy", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const fixture = mkdtempSync(join(tmpdir(), "toza-content-"));
  try {
    for (const dir of ["scripts", "content", "src", "_site"])
      cpSync(join(root, dir), join(fixture, dir), { recursive: true });
    symlinkSync(join(root, "node_modules"), join(fixture, "node_modules"), process.platform === "win32" ? "junction" : "dir");
    const home = join(fixture, "src/content/en/home.md");
    const original = readFileSync(home, "utf8");
    const check = () => {
      const result = spawnSync(process.execPath, ["scripts/check-content.mjs"], { cwd: fixture, encoding: "utf8" });
      assert.ifError(result.error);
      return { status: result.status, output: result.stdout + result.stderr };
    };
    assert.equal(check().status, 0, "the built P3 fixture must pass first");

    writeFileSync(home, original.replace("layout: box", "layout: unknown"));
    let result = check();
    assert.equal(result.status, 1);
    assert.match(result.output, /unsupported layout "unknown" for hero/);

    // The legacy hero still requires actions; only the photo layout omits them.
    writeFileSync(home, original.replace("    layout: box\n", ""));
    result = check();
    assert.equal(result.status, 1);
    assert.match(result.output, /hero\)\.actions: missing required field/);

    writeFileSync(home, original.replace("statement: \"{shared:method}\"", "statement: This sentence is absent from the rendered page."));
    result = check();
    assert.equal(result.status, 1);
    assert.match(result.output, /content copy not in built HTML: "This sentence is absent from the rendered page\."/);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test("link validation resolves nested filesystem pages as URLs and rejects broken links", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const fixture = mkdtempSync(join(tmpdir(), "toza-links-"));
  try {
    mkdirSync(join(fixture, "en", "about"), { recursive: true });
    writeFileSync(join(fixture, "index.html"), '<a href="/en/about/#details">About</a>');
    writeFileSync(join(fixture, "en", "about", "index.html"), '<h1 id="details">About</h1><a href="/">Home</a>');
    const check = () => spawnSync(process.execPath, [join(root, "scripts/check-links.mjs"), fixture], { cwd: root, encoding: "utf8" });
    const valid = check();
    assert.ifError(valid.error);
    assert.equal(valid.status, 0, valid.stdout + valid.stderr);
    assert.match(valid.stdout, /links OK: 2 internal links/);
    writeFileSync(join(fixture, "index.html"), '<a href="/missing/">Missing</a>');
    const broken = check();
    assert.equal(broken.status, 1);
    assert.match(broken.stderr, /no such page/);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
