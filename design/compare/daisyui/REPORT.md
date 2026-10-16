# daisyUI 5 build report

**Library:** daisyUI 5.7.50 (MIT) on Tailwind 4.3.3. CSS only. One theme `toza`, all values `var(--token)`. Components included: badge, button, card, divider, dropdown, footer, hero, link, list, menu, navbar, skeleton, stat, status.

**Components per block:** header navbar + menu + dropdown(details); footer footer + menu; hero hero + btn; situation-doors list; recognition list; text/method-statement link; stages divider(horizontal, between stages) + flex list, nested price-strip; price-strip divider + stats; price-summary card + badge; offer card + badge; tiers card (subgrid) + list; specimen card + badge + skeleton; contact hero + btn.

**Custom CSS:** 11 commented rules in `styles/custom.css` (16 selectors): wrap, section, hero grid rows, portrait frame, portrait crop, drawing stroke, focus ring, focus on dark, reduced motion, markdown spacing/lists, markdown links. `styles/legacy.css` holds the old rules for the 8 hand-built pages only (transitional, not counted).

**Size:** CSS 15.4 KB gzip (86 KB raw; daisyUI emits every responsive variant of each included component). JS 0.

**Templates:** 321 lines (12 blocks + 3 drawings + macros 271, header 34, footer 16).

**Checks:** build OK. `npm run check` OK (my files 0 literals; 12 warnings remain in the three old drawing includes still used by 6 untouched pages). `check:content` parity 100% both ways. Grep: no ml/mr/pl/pr/left/right/text-left/right, no colour literals, no arbitrary `[..]` values in templates or custom.css. `meta theme-color` now comes from `src/_data/theme.js` (reads tokens).

**axe-core (3 pages x 390/1440):** 0 violations. 44px targets measured: all controls pass (door rows via stretched link).

**RTL smoke:** all pages mirror (grid, list arrows, portrait frame, stage order, bands). No overflow. Not mirrored by design: stage drawings and the dated label (dir=ltr).

**Data/labels the components needed but lacked:** none. Not rendered: hero `print` button (needs JS; unused on these 3 pages, flagged for conditions).

**Where daisyUI fought Direction A:** (1) inverse (ink) sections: with one theme every button/link/divider/stat needs explicit on-dark utilities; a second inverse theme with `data-theme` would remove them. (2) timeline (tried) mis-lays drawing/text; replaced by flex + horizontal divider. (3) Stages/price-strip brackets approximated by divider+stats, columns no longer align exactly. (4) status colours (info/success/warning/error) have no Toza tokens, mapped to ink/brass. (5) CSS carries ~86 KB raw from responsive component variants. (6) List separators are 5% tint by default, overridden to the rule token. (7) display h1 smaller at 1024 than before (fluid token).

Tokens added: `shape.*` (radius-box/field/selector, size-field 0.28125rem for 45px controls, size-selector, border), display font-size. Screenshots: this folder; `axe.json`; script `scripts/compare-shots.mjs`.
