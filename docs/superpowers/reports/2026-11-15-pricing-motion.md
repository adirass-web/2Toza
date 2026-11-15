# Restrained Home and Pricing motion

Task 3 implementation. Reused the existing build/g `7081277` Motion `animate`/`inView` pattern and exact package version 14.6.0. This is a small integration adapter, not a scroll or animation engine. MIT notices for bundled Motion components and Framer Motion are copied into `assets/licenses`.

## Behavior

- Only Home and Pricing load the isolated motion entry. Home animates its three situation images; Pricing animates each comparison option once. Hero, long reading content and contact controls are static.
- Reveals use 8px vertical movement, opacity .85 to 1, 400ms ease-out, no loops or number changes. Static document starts fully visible. Content stays readable and clickable during enhancement.
- Reduced-motion startup stays static. Changing the preference cancels/reset animations and does not replay visited elements. Before printing cancels running reveals.
- Shared navigation underline and native disclosure-chevron feedback use a 150ms token, only under no-preference. Focus outlines remain immediate.

## TDD and checks

RED: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/check-restrained-motion.mjs` failed on missing `/assets/js/restrained-motion.js` reference after static/no-JS/reduced baseline passed. GREEN: `npm run check:motion` now passes on both preview and production. The real-browser check covers no-JS visibility/contact access, reduced-motion startup, readable animation frames, changing preference, cancellation, once-only playback and absence of page errors.

- `npm run test:profiles`: 3 passing.
- Both profiles: facts/indexing/approved checks (301 preview, 296 production), content parity 100%, links (479 preview, 474 production) pass.
- `npm run test:launch-pages`: 10 passing; production corruption: 3; legacy-anchor regression: 1.
- Both profiles: motion browser check passes; preview no-JS PDF check passes.
- Production Chromium axe: 30 runs, 0 violations.
- Production mobile performance: all 15 routes within budget. Home LCP 1440ms, CLS .011, 369KB, JS3.8KB gzip. Pricing LCP1072ms, CLS0,148KB, JS6KB gzip.
- Home/Pricing at320/390/768/1024/1440:10 cases with no overflow. Captures `/tmp/motion-{home,pricing}-{390,1440}.png`; mobile Pricing inspected.
- `git diff --check` passes.

## Size and limits

Isolated motion entry:9655 bytes minified /3868 gzip. Existing site entry unchanged7411 bytes /2249 gzip. Approved main CSS48958→49252 bytes; gzip10178→10328. Only Home/Pricing request the new entry; no framework code imported into Home. Runtime motion dependency is pinned14.6.0 (the project's existing version on build/g).

Firefox/WebKit and manual screen-reader acceptance remain unverified. No preview publication or production change was performed by this task.

## Final-review cleanup

Removed the later duplicated coordination sentence and Conditions link from Larger households/care, retaining the scope/support version with the specific allowances link. Regression test first failed with two occurrences and now requires exactly one of each. The exact Pricing fixture changed only by removing those duplicate sentences.

Pricing tests were previously run transitively by `test:launch-pages`; CI now invokes `test:pricing` and `test:pricing-inclusions` explicitly for preview and production, while `test:launch-pages` is narrowed to its named suite, preventing duplicate runs. Both profiles' Pricing tests (3), inclusion tests (2) and approved checks (300 preview/295 production) pass; profile builds (3 tests) and diff whitespace check pass.
