# Toza — four-page approved-copy local preview

Local implementation: 11 October 2026 (Israel). Owner acceptance: D-030, 10 October 2026. This is a local preview, not a release.

Branch: `codex/toza-approved-copy-preview`, implementation baseline `09a534e`. PR #54 checkout remains at `c5e7e243764605463cd0b6e05fa33b115240729d`. No push, merge, main change or deployment.

[Desktop/mobile gallery](http://127.0.0.1:8793/_preview/)

| Working page | Desktop opening | Mobile opening | Full captures |
|---|---|---|---|
| [Home](http://127.0.0.1:8793/en/) | [1440×900](home-desktop.png) | [390×844](home-mobile.png) | [Desktop](home-desktop-full.png) · [Mobile](home-mobile-full.png) |
| [Pricing](http://127.0.0.1:8793/en/pricing.html) | [1440×900](pricing-desktop.png) | [390×844](pricing-mobile.png) | [Desktop](pricing-desktop-full.png) · [Mobile](pricing-mobile-full.png) |
| [Separation and Divorce](http://127.0.0.1:8793/en/separation-divorce.html) | [1440×900](separation-desktop.png) | [390×844](separation-mobile.png) | [Desktop](separation-desktop-full.png) · [Mobile](separation-mobile-full.png) |
| [They Know Something](http://127.0.0.1:8793/en/they-know-something.html) | [1440×900](they-know-desktop.png) | [390×844](they-know-mobile.png) | [Desktop](they-know-desktop-full.png) · [Mobile](they-know-mobile-full.png) |

Mobile detail views: [Home method](home-mobile-detail.png) · [Pricing privacy and credit](pricing-mobile-detail.png) · [Separation effects](separation-mobile-detail.png) · [Separate hardening](they-know-mobile-detail.png).

## What changed

- Integrated all four exact approved EN-04 blocks and metadata. Original EN-02 acceptance, EN-03 amendment, source corpus, locked harness and protected Assessment remain preserved and validated. The additive round-02 manifest supplies the current four-page overlay.
- Home retains the approved benefits-before-detailed-risk presentation. Pricing retains its early first-visit fee and existing comparison layout; the complete participant-privacy paragraph now appears directly after the visible comparison and before credit details.
- Separation uses explicit section IDs for its shortcuts and keeps effects, approval sequence and the no-invisibility qualification together and visible.
- They Know Something presents the complete Assessment, including its detail link and urgent-visit guidance, immediately before the separate full-hardening section. The exact accepted wording remains unchanged during implementation.
- Only four English templates were regenerated. No CSS, dependency, lockfile, contact-destination, tracking or deployment change.

## Quality gates

- `npm run verify:all`: PASS. Source fingerprints, historical and current exact-copy authority, template fidelity, rendered body/metadata, table associations, protected Assessment order, routes, links/anchors, language/publication and CI contracts.
- `npm run test:rtl-visual`: **52/52 PASS** after implementation, covering desktop/mobile Chromium, narrow widths, keyboard/menu/skip, disclosures/deep links, contact, print, reduced motion, comparison semantics, copy and purchase-stage grouping. Prior baseline: 50/50 PASS. No test failure was encountered.
- Seven other built English pages are **byte-identical** to the previous preview. [Comparison and fingerprints](unchanged-pages.json).
- Twenty current screenshots: opening and full-page desktop/mobile for each page, plus four mobile detail views. [Capture checks](capture-checks.json): no horizontal overflow, missing/failed assets or page errors at the two capture widths.
- Independent [source/authority review](INDEPENDENT-REVIEW.md): PASS. Independent [rendered design review](DESIGN-REVIEW.md): PASS. No required fixes remain.
- Local gallery's four page controls and screenshot assets: PASS. [Gallery check](gallery-check.json).
- `git diff --check`: PASS. Normal Windows line-ending conversion notices do not represent source-content drift; authority hashes explicitly normalize LF.

These gates establish local source and rendering fidelity. They are not customer tests, conversion evidence, physical-phone/Safari validation or complete accessibility certification. No hosted-preview, edge-runtime or production gate is claimed for this local-only instruction.

## Reproduce

From this checkout, with the existing dependencies installed:

```powershell
npm run sync:copy
npm run verify:all
npm run test:rtl-visual
node docs/four-page-copy-preview/check-unchanged.cjs
node docs/four-page-copy-preview/capture.cjs
node docs/four-page-copy-preview/build-gallery.cjs
```

The session's localhost server on 8793 serves the built `_site`. Alternatively run `npm start` and use its printed local address. The screenshot gallery is generated only after the clean site build and is not included by the normal publication build. `check-gallery.cjs` checks the session's 8793 gallery.

No further wording edits, PR #54 updates or deployment are inferred. A later release instruction must decide how to handle this branch and rerun applicable release gates at its final reviewed head.
