# All 11 pages from content (branch system/all-pages)

**Stage 1.** Home doors and recognition: hairline rows (rule-colour top border per row, last row bottom border, no box/background/radius), arrow at end (mirrors in RTL), whole row is the link, min 44px; recognition has no arrow (items are not links). Tier and offer inclusions: no icons, ruled rows (`divide-default`).
**Stage 2.** business-dispute, inheritance-conflict, they-know-something, attorneys render from content (existing blocks only); old templates `permalink: false`.
**Stage 3.** New blocks `steps`, `letter`, `faq-group`, `terms-section` (documented in `src/_includes/blocks/README.md`). how-it-works, about, faq, conditions switched. `tiers` with `detail: summary` now renders Direction A ruled price rows. Hero print button is `data-print` (no inline script); new `scripts/site.js` (navbar collapse, print, FAQ expand-all, open `#hash` question) replaces `flowbite-lite.js`.
**Flowbite patterns:** flush accordion look on native `<details>` (steps/faq), table (prices, faq table), sidebar-style nav lists, stepper timeline on ink, list group, buttons, badge, card, navbar, footer.
**Stage 4.** `legacy-pages.css` import removed (file kept); `body.legacy` removed; Tailwind ignores `src/en` (`@source not`). Colour-literal debt 0.

**Custom CSS rules (custom.css):** 3 before, 16 after (focus 2, drawing 1, summary marker 1, md lists 2, section/clause/TOC counters 7, print root 3), each with a why-comment.
**Size gzip:** CSS 9.8 KB (was 12.2 with legacy), JS 1.6 KB.

**Checks:** build OK; `check` OK (colour literals 0); `check:content` parity 100% both ways, 11 pages; grep: no physical-direction classes, no literals, no arbitrary values in active templates/CSS (only in the unused old includes). `_redirects` targets all resolve.
**Anchors:** 48 old ids absent, all aria-labelledby helper ids (`h1`, `rec-h`, `stages-h`, `contact-h`, ...) plus `faq-toggle`; none is linked from any page. All real anchors kept (`#a`-`#g`, `#a1`..., `#urgent`, `#prices`, ...). `node scripts/check-anchors.mjs <old _site> _site`.
**axe** (wcag2a/aa, 2.1, 2.2, best-practice), 11 pages: 0 violations. No horizontal overflow (one found in how-it-works at 390 and fixed). No external requests. FAQ keyboard check with JS off: Enter opens a question. Conditions prints cleanly (PDF in folder).
**RTL** (390: faq, conditions, how-it-works): mirrors correctly; only English punctuation in RTL looks off, as before.
**Content gaps:** none. Notes: `@page` margins not set (no token); expand-all labels come from i18n (`t.ui.faq*`).

**Candidates for deletion (owner approval needed):** `styles/legacy-pages.css`; `scripts/flowbite-lite.js`, `assets/js/flowbite-lite.js`; old page templates `src/en/index.njk` and `src/en/*/index.njk` (10); old includes `contact-block, credential, cta-full, cta-hero, price-block, pstrip, specimen, stages` (the three `drawing-*` are still used); `scripts/compare-shots.mjs` (superseded by `all-pages-shots.mjs`).
