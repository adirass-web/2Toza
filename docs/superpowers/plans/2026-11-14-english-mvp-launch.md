# Toza English MVP Launch Implementation Plan

> For agentic workers: use superpowers:subagent-driven-development, task reviews and a final branch review.

**Goal:** Prepare the approved English site for public launch at https://toza-site.pages.dev, with a tested preview, verified release artifact and owner-run cutover.

**Architecture:** Start from `codex/toza-preview-integration` 4bde3e9; adapt reusable checks from `build/g` 7081277. Produce isolated preview and production builds from the same SHA. Preserve approved content and appearance.

**Tech stack:** Eleventy, Nunjucks, Node.js, Cloudflare Pages, GitHub Actions, Playwright and axe.

## Global constraints

- Preserve approved English copy, prices, photographs, layout, contact controls and 12 content routes. No new Hebrew, analytics, forms or redesign.
- Default to noindex preview. Production is indexable, canonical host https://toza-site.pages.dev. Existing Hebrew URLs redirect temporarily to equivalent English pages.
- Owner executes production cutover. No production deploy, DNS change or shared branch merge as part of preparation.
- Keep design-study HTML out of production output; retain source files.

## Tasks

### Task 1: Establish release baseline

- Create isolated branch, reconcile newer main asset additions, inventory existing English and legacy URLs and deployment writers.
- Verify baseline build, check and content parity; record current heads and any unavailable account evidence.

### Task 2: Quality checks

- Port/adapt links, anchors, axe and performance checks from build/g; fix relative HTML URL resolution. Keep English approved-copy, facts and parity checks. Write reports to ignored build artifacts.
- Add browser dependencies and CI setup; ensure checks cover all rendered pages and actual presentation modes.
- Verify directory-relative and HTML-relative URLs, missing assets and anchors; review task diff independently.

### Task 3: Launch build and site fixes

- Define SITE_ENV=preview|production (default preview), require SITE_URL=https://toza-site.pages.dev for production. Clean outputs between profiles.
- Preview keeps noindex headers/meta and robots disallow. Production removes indexing blocks, includes per-page canonicals, descriptions, share metadata and sitemap of 12 English routes; preserve security headers.
- Replace local preview footer with Toza and route links; exclude design-study HTML from production. Root redirects /en/; preserve legacy EN 301 redirects; map existing HE URLs to matching English via 302; unknown URLs return 404 with English navigation.
- Compress hero into responsive images preserving image/crop; fix confirmed functional, accessibility and overflow defects. Preserve locked copy and approved commercial facts.
- Add meaningful tests before behavior changes; verify both profiles, output routes and content, then independent review.

### Task 4: Release workflow

- Produce verified preview and production artifacts from same source SHA, record checksums, deploy only verified preview to toza-v2. Prepare manually triggered serialized production workflow for owner-approved environment targeting existing toza-site; never deploy production automatically on merge.
- Document previous deployment, old deployment writer and rollback; make owner-run cutover and post-release checks concrete. Never modify production during preparation.
- Verify workflow configuration and artifact provenance without deploying production; independent review.

### Task 5: Final acceptance

- Run facts, copy parity, routes, redirects, assets, anchors and preview/production indexing checks.
- Axe all English pages at 390/1440, zero serious/critical; review lesser findings. Keyboard, no-JS, reduced motion; widths 320/390/768/1024/1440; Chromium, Firefox and WebKit smoke tests for navigation, contact, FAQ and Conditions.
- Target LCP <=2.5s (CI <=3s), CLS <=0.05, JS <=60KB gzip, initial transfer <=1.2MB.
- Conduct whole-branch review; document actual evidence, unperformed tests and remaining external prerequisites. Owner confirms copy, phone contact, preview and recorded accessibility-statement question before cutover.

## Owner decisions, 14 November

- Place the selected graphite portrait above the About biography; retain its approved copy.
- Redirect old pages without an exact equivalent to the closest relevant English page. Compare legacy deep links and anchors through mapped redirects, documenting unavoidable gaps.
- Fix performance before launch. Necessary minor accessibility and responsive visual fixes are authorized; ask before changing approved prose or commercial facts.
- Publish the verified noindex preview when checks pass. Owner retains production cutover.
- For the accessibility statement, research official Israeli requirements. Existing WhatsApp and Signal number is the accessibility contact; service is at client-selected locations; no accessibility coordinator has been appointed. Draft accurate wording for owner review, without claiming unverified conformance.
