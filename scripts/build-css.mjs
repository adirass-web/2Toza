// Builds assets/css/site.css = Pico v2 (lean SCSS build) + Open Props sizes + styles/site.css, minified.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { transform } from "lightningcss";

const pico = execFileSync("npx", ["sass", "--no-source-map", "--style=compressed", "styles/pico-lean.scss"], { encoding: "utf8" });
const props = readFileSync("node_modules/open-props/sizes.min.css", "utf8");
const fonts = readFileSync("styles/fonts.css", "utf8");
const site = readFileSync("styles/site.css", "utf8");
const { code } = transform({
  filename: "site.css",
  code: Buffer.from([fonts, pico, props, site].join("\n")),
  minify: true,
  targets: { chrome: 100 << 16, safari: 15 << 16, firefox: 100 << 16 },
});
mkdirSync("assets/css", { recursive: true });
writeFileSync("assets/css/site.css", code);
console.log(`site.css ${code.length} bytes`);
