# Approved stronger Home / Pricing — local preview

10 October 2026. Local implementation complete; review results linked below. Owner approved the main reviewed Home/Pricing copy with “approved, go build.” This is **not a release**. PR #54, main and production remain unchanged.

Branch: `codex/toza-approved-copy-preview`, based on `c5e7e243764605463cd0b6e05fa33b115240729d`.

Live local pages while the preview server is running:
- [Home](http://127.0.0.1:8793/en/)
- [Pricing](http://127.0.0.1:8793/en/pricing.html)
- [Desktop/mobile review gallery](http://127.0.0.1:8793/_preview/)

## What changed

- Rendered the exact approved main copy and metadata through an additive acceptance amendment. Original EN-02 packets, historical manifest, locked harness and protected Assessment remain unchanged. Unselected alternatives are retained separately.
- Adapted presentation to new headings and the consolidated Assessment section; both hero paragraphs remain intact.
- Home now leads with the explicit personal stakes, then the complete practical benefit and separate-purchase qualification, followed by detailed risk, personal method and the paid Assessment. Moving whole sections brought the benefit/qualification within two 390×844 screens without hiding or cutting copy or reducing text size.
- Pricing retains the first-visit fee in the first mobile screen, six visible comparison rows and adjoining full credit conditions. New introductory paragraphs are preserved.
- Added scoped styling for the new method section and longer outcome passage. Versioned only the changed Home/Pricing CSS asset. No new imagery, tracking, dependencies or contact destinations.
- Added an exact-copy commercial amendment check to the normal verification path. Template generation now avoids rewriting unchanged files.

## Completed local gates

- Offline clean dependency installation using the existing lockfile. No dependency or lockfile changes; offline install output is not a fresh vulnerability assessment. Dependency maintenance remains separate.
- `npm run verify:all`: PASS. Includes source hashes, template fidelity, rendered block inventory and table associations, amendment's unchanged commercial terms, protected Assessment order, all eleven English routes, metadata, links/anchors, retained Hebrew legal pages, withdrawn marketing languages and CI contract.
- `npm run test:rtl-visual`: **50/50 PASS**, desktop/mobile Chromium. Covers 320–1440-width reflow, keyboard/menu/skip, contact visibility on 390×667, disclosures, deep links, print restoration, reduced motion and table semantics.
- All nine unaffected English HTML files are **byte-identical** to the PR #54 checkout's build. See [comparison](unchanged-pages.json). Historical sources and protected Assessment remain unchanged.
- [Independent source and authority review](INDEPENDENT-REVIEW.md).
- [Independent rendered design review](DESIGN-REVIEW.md): PASS to show owner. Reviewer inspected actual captures and separate live Chromium sessions. Non-blocking observations remain about long mobile Pricing reading and inherited show-all control placement/wording.
- Additional Codex CLI outside-voice attempt was unavailable: CLI 0.145.0 rejected its configured model as requiring a newer CLI. No CLI review verdict is claimed; separate agent source and rendered reviews supply the independent gates. No tool/config upgrade was made.

These are local engineering/editorial/design checks, not customer testing, conversion evidence, physical-phone/Safari testing or complete accessibility certification. GitHub/hosted-preview/edge-runtime/production checks require a later release instruction and were not run for this isolated local build.

## Captures

| Page | Desktop, 1440×900 | Mobile, 390×844 | Full pages |
|---|---|---|---|
| Home | [Opening](home-desktop.png) | [Opening](home-mobile.png) | [Desktop](home-desktop-full.png) · [Mobile](home-mobile-full.png) |
| Pricing | [Opening](pricing-desktop.png) | [Opening](pricing-mobile.png) | [Desktop](pricing-desktop-full.png) · [Mobile](pricing-mobile-full.png) |

[Complete Home benefit/qualification on mobile](home-mobile-outcome.png)

## Reproduce

From this checkout: `npm ci`, `npm run sync:copy`, `npm run verify:all`, `npm run test:rtl-visual`. Use `npm start` for a fresh Eleventy local server; the 8793 review server in this session serves the built `_site` directly. `node docs/approved-copy-preview/build-gallery.cjs` creates the local-only screenshot gallery after a build. A clean build removes this generated gallery; it is never part of the normal publication build.

Later release work should preserve the separate dependency-maintenance flow, resolve how this new branch supersedes or stacks on PR #54, and rerun gates at the final reviewed head. No merge or deployment permission is inferred from this preview approval.

## Later approved preview

The subsequent owner-approved four-page copy refinement is recorded in [four-page-copy-preview](../four-page-copy-preview/README.md). This document and its images retain the earlier two-page build record. The running `/_preview/` gallery now displays the four-page version.
