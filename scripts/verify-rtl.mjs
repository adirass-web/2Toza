import {
  assert,
  assertBanned,
  assertIncludes,
  htmlFor,
  readJson,
  readText,
  routes,
  sourceFor,
} from "./verify-utils.mjs";

const localeData = readJson("src/he/he.11tydata.json");
assert(localeData.locale === "he", "Hebrew directory data must declare locale=he");
assert(localeData.lang === "he", "Hebrew directory data must declare lang=he");
assert(localeData.dir === "rtl", "Hebrew directory data must declare dir=rtl");
assert(localeData.og_locale === "he_IL", "Hebrew directory data must declare og_locale=he_IL");

const layout = readText("src/_includes/layouts/vault.njk");
assertIncludes(layout, '<html lang="{{ lang }}" dir="{{ dir }}">', "Shared layout");
assertIncludes(layout, 'hreflang="he"', "Shared layout Hebrew alternate");
assertIncludes(layout, 'david-libre-hebrew-500-normal.woff2', "Shared layout Hebrew font preload");

const css = readText("assets/css/vault.css");
assertIncludes(css, "body:dir(rtl)", "RTL stylesheet");
assertIncludes(css, ":dir(rtl)", "RTL stylesheet");
assertIncludes(css, "unicode-bidi:isolate", "LTR isolation stylesheet");
assertIncludes(css, ".btn .bidi-ltr{margin-inline:.35rem}", "RTL CTA spacing stylesheet");
assertIncludes(css, "inset-inline-start", "RTL logical placement stylesheet");
assertIncludes(css, "inset-inline-end", "RTL logical placement stylesheet");
assertIncludes(css, ".sit:hover .arr:dir(rtl)", "RTL arrow override");
assert(!/\[dir\s*=\s*["']?rtl/i.test(css), "Use :dir(rtl), not a broad [dir=rtl] selector in shared CSS");
assertBanned(
  /(?:margin|padding|border)-(?:left|right)\s*:|(?:^|[;{])\s*(?:left|right)\s*:|text-align\s*:\s*(?:left|right)/m,
  css,
  "Shared stylesheet directional declarations",
);

for (const route of routes) {
  const source = sourceFor("he", route);
  assert(source.includes('class="bidi-ltr"'), `he/${route}: mixed-direction values must use .bidi-ltr`);
  assert(
    !/<\/bdi>\s*—\s*<bdi class="bidi-ltr">₪/.test(source),
    `he/${route}: keep a product name, dash, and price in one isolated LTR run`,
  );
}

const mixedFixture = readText("tests/fixtures/rtl-mixed.txt").trim();
assert(mixedFixture === "שלום John 050-1234567 ₪1,234", "RTL fixture must stay canonical and reviewable");

// D-026: archived Hebrew source safeguards above remain; legal pages remain published.
for (const name of ["terms", "privacy"]) {
  const legal = readText(`_site/${name}.html`);
  assertIncludes(legal, '<html lang="he" dir="rtl">', `Built Hebrew ${name}`);
  assertIncludes(legal, 'padding-inline-start', `${name} logical list spacing`);
}

console.log("RTL CONTRACT VERIFIED");
