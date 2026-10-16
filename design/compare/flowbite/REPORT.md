# Flowbite 4.0.2 (MIT, free core) build report

Branch `design/lib-flowbite`. Screenshots in this folder (`home|separation-divorce|pricing` x `m` 390 / `d` 1440, plus `-rtl`, plus `home-m-menu-open.png`). `run.json` holds the raw axe/overflow run (`node scripts/compare-shots.mjs flowbite`).

**Components used.** Navbar with CTA + collapse (header). Footer with logo. Buttons default/outline (hero, contact, header CTA). Jumbotron structure (hero). Card + pricing card (price-summary, tiers, offer, specimen document). List group with links (situation-doors), list group (recognition). Large badge (tags). Stepper timeline (stages dots/hairline). Features list with check icons (tiers, offer). Typography links/paragraphs/lists (text, method-statement, specimen lists). Text, price-strip: utilities only (no Flowbite component exists).

**Accordion.** Not on these three pages, so no accordion JS. For the FAQ later I would keep native `<details>`: it needs no JS and is keyboard-usable; Flowbite's accordion is button+JS with the same result.

**Custom CSS: 3 rules** in `styles/custom.css` (global brass focus outline; same on dark sections; `vector-effect` on stage drawings). Portrait frame, subgrid tiers, layout all done with utilities. Not counted: 8 `@font-face` in main.css, and `styles/legacy-pages.css`, the old styles frozen for the 8 hand-built bodies (scoped to `body.legacy`, delete with the last hand-built page).

**Size.** CSS 12.2 KB gzip with legacy (9.1 KB without; old build 9.6 KB). JS 1.4 KB gzip: `scripts/flowbite-lite.js` bundles only Flowbite's collapse (esbuild, new devDependency); full `flowbite.min.js` would be 29.4 KB. Without JS the mobile menu stays closed (footer carries the links).

**Template lines.** 12 blocks 228 + macros 46 + header 28 + footer 20 = 322.

**Checks.** build OK. `check`: facts 88 amounts, noindex 12 pages, tokens current, colour literals 0 in 0 files. `check:content`: parity 100% both ways. Grep: no physical-direction classes, no colour literals, no arbitrary `[…]` values in new files.

**axe** (wcag2a/aa, 2.1, 2.2 AA, best-practice; 3 pages): 0 violations. No horizontal overflow at 390 or 1440, LTR or RTL. No external requests.

**RTL.** Everything mirrors: header, portrait frame, arrows, stage order and timeline, price strip, buttons order. Stage drawings stay unmirrored by design (`dir="ltr"` wrapper, as in Direction A). Only English-in-RTL punctuation looks off, as before.

**Tokens added** (`tokens.json`): Flowbite remap widened (body = text colour, body-subtle = muted; fg-brand, neutral-*, dark*, default*, buffer*), Tailwind scales `text-hero-*`, `text-h2`, `leading-*`, `tracking-*`, `max-w-wrap`, `px-gutter`, `py-section`. `theme-color` meta now reads the token (`src/_data/tokens.mjs`).

**Data gaps.** None needing copy. Notes: `price-strip.label` is rendered as a hidden h2 (old page showed no heading); `record_date` is one string (old split "15" / "Oct 2026"); hero byline variants `full`/`short` pick portrait crop.

**Where Flowbite fought Direction A.** Its focus is `ring` + `outline-none` (replaced by one global outline). Components assume rounded boxed cards, so doors and recognition are boxed lists instead of hairline rows. No timeline/price-strip/specimen component. Docs use `text-white`; token names used instead. Flowbite's `--leading-none: 1px` forced a `leading-numeral` token. Eleventy swallowed a Nunjucks compile error silently (caught by parity check).

**Commit:** see `git log -1` on `design/lib-flowbite`.
