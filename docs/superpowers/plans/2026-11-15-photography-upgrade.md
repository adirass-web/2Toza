# Toza Photography Upgrade Implementation Plan

> **For agentic workers:** Use `superpowers:subagent-driven-development` for implementation and scoped review. Use `superpowers:verification-before-completion` at every completion checkpoint. Track progress with the checkboxes below.

**Execution status (15 November 2026):** Preparation started from remote English MVP `59e11d1`; see `docs/photography/execution-checkpoint.md` and `docs/photography/selection.md`. Geometry remains proposed. The referenced brief is unavailable. Separate-chat statements below are historical handoff context, not current tool capability claims.

**Goal:** Add a small, coherent photographic set that brings precision, practical protection and relief to Pricing and one supporting section.

**Architecture:** Formalize the existing native image markup as one shared Nunjucks element with controlled layout variants. Keep Home/Situation geometry as the authority. A separate chat searches and selects two photographs against frozen slot specifications. Integrate only approved local derivatives. No new image service or browser dependency.

**Tech stack:** Eleventy/Nunjucks, existing CSS and Motion, local responsive image assets, Playwright/axe and existing CI.

**Spec:** `docs/superpowers/specs/2026-11-15-photography-upgrade-brief.md`

**Layout decision and tools:** `docs/photography/image-layout-research.md`

**Separate-chat handoff:** `docs/photography/image-search-chat-handoff.md`

## Global constraints

- Home Hero and existing Situation photographs remain the visual reference and stay unchanged.
- Keep the grey palette, typography, whitespace, Personal Shield emphasis, approved copy and commercial facts.
- Default first placements: the featured Personal Shield tile on Pricing, and an assessment/method image on How it works. Confirm the second placement at the composition checkpoint before product edits.
- Use free, commercially usable real photos. Record exact provenance and check relevant people/property restrictions. Do not imply Toza staff, clients, premises or endorsements.
- Keep initial transfer <=1.2 MB, target LCP <=2.5 seconds (existing CI fails above 3 seconds), CLS <=0.05 and JavaScript <=60 KB gzip.
- Preserve no-JavaScript content, reduced motion, responsive crops, 44px contacts, all legacy IDs and print behavior. Preview stays noindex; production cutover remains owner-run.

## Review focus

1. Phone crops remove the useful subject or leave an awkward fragment: check actual 320/390px compositions.
2. Photographs look unrelated to Home or imply an actual client engagement: reject at selection review.
3. A photo or its motion reduces price readability or blocks contact controls: check static, animated and scrolled states.
4. A new download or missing intrinsic size harms LCP/CLS: measure cold mobile loads and throttled delivery.
5. Blocked images, JavaScript failure or printing hides essential content: test failure, no-JS and PDF output.

## Task 0 — Freeze one site-wide image standard

**Files:** `docs/design-system.md`; `docs/photography/selection.md`.

**Decision proposed after Nimble research:** Reuse native `figure`/`picture`/`img` through one shared element. Free Flowbite/HyperUI snippets add no required capability. This recommendation is not recorded as owner approval.

- [x] Inventory photographic placements across the English site, including Home, Situation pages and the About portrait.
- [x] Record each slot's container, gutter, maximum width, desktop/mobile ratio, crop, bleed, text relationship and loading priority.
- [x] Adopt the controlled variant table in `docs/photography/image-layout-research.md` as the proposed contract.
- [x] Show geometry-only desktop/mobile compositions for Pricing and the supporting slot, beside the current Home reference.
- [ ] Obtain owner approval of the shared standard, two slot specifications and supporting placement before photo selection.
- [ ] Record the approved version in `docs/design-system.md` and `docs/photography/selection.md`.

**Checkpoint 0:** One shared element governs photographic geometry. Each new slot has fixed constraints before search. Existing photographs remain unchanged.

## Task 1 — Establish the reference and baseline

**Outputs:** `docs/photography/selection.md`; ignored captures under `.artifacts/photography/`.

- [x] Record the candidate SHA. Capture every page whose photographic markup will migrate at 390/1440px with reduced motion.
- [x] Record affected-page LCP, CLS, transfer, image dimensions and CSS/JS size using existing performance checks.
- [x] Identify actual insertion points, mobile aspect ratios, focal-point needs and whether each image is informative or atmospheric.
- [x] Check that both placements add useful visual meaning without hiding the comparison, copying the same photo or adding a gallery.

**Checkpoint 1:** The record identifies two slots, their purpose and baseline metrics. No product files changed.

## Task 2 — Image search and selection in a separate chat

**Input:** `docs/photography/image-search-chat-handoff.md`, the approved standard and two frozen slot specifications from Checkpoint 0.

**Outputs:** `docs/photography/selection.md`; contact sheets and compositions under `.artifacts/photography/`. No product changes.

- [ ] Open a separate user chat with the handoff prompt. This session cannot create a chat because no creation tool is exposed.
- [ ] Use Parallel Image Search for discovery and Nimble Search/Extract for source, license and template evidence.
- [ ] Search for three candidates per approved slot, beginning with free Unsplash assets.
- [ ] Record each candidate's photographer, source page, license URL/date, dimensions and relevant people/property restrictions.
- [ ] Inspect downloaded images visually. Search titles, metadata and URLs alone do not establish visual suitability or permission.
- [ ] Show six candidates beside the existing reference photography, including desktop/mobile crops within the frozen slot geometry.
- [ ] Recommend a coherent pair with a short rationale and explicit rejection reasons for alternatives.
- [ ] Obtain owner selection and crop approval in that chat. Record exact asset IDs, sources and decisions in the selection record.
- [ ] Return the approved pair, provenance and crops to the implementation chat for acceptance.

**Checkpoint 2:** The implementation chat verifies a complete handoff. Missing approval, provenance, dimensions or crop evidence blocks asset integration. Candidates stay outside published paths.

## Task 3 — Prepare approved assets and integrate

**Files:** local derivatives under `approved-en-assets/photos/`; create `src/_includes/approved-en/photo.njk` and `styles/photo.css`; affected templates and existing CSS entry points; `docs/design-system.md` for the approved rules. Keep source/licensing records in `docs/photography/selection.md`. Add contract tests in `scripts/photos.test.mjs`.

- [ ] Produce responsive derivatives at 480/900/1536px widths, stopping at the original size; use WebP with a supported source fallback. Add AVIF only if a meaningful measured saving justifies it.
- [ ] Store source originals outside published asset directories. Only approved derivatives/fallbacks ship. Record derivative dimensions and crop/focal-point choices in the selection record.
- [ ] Add failing contract tests in `scripts/photos.test.mjs`. Cover broken sources, dimensions, unknown variants and omitted required fields.
- [ ] Run `node --test scripts/photos.test.mjs`. Verify failure identifies missing contract behavior.
- [ ] Implement one native shared element using the approved contract. Do not import a template framework or add a browser runtime.
- [ ] Migrate photographic markup to that element while preserving each existing layout wrapper and approved crop.
- [ ] Keep logos and category/brand SVG icons outside the photographic element.
- [ ] Require explicit `alt`, intrinsic dimensions, local sources, `srcset`, `sizes`, variant and loading priority.
- [ ] Store focal positions in image data. Add a mobile source only when the approved crop requires art direction.
- [ ] Use one photographic CSS source for new geometry. Remove replaced declarations rather than stacking overrides.
- [ ] Lazy-load below-fold images. Prioritize only the actual LCP image.
- [ ] Keep meaningful content as HTML. Use concise contextual alt text for informative images or empty alt for atmospheric images. Preserve the real portrait for Dr. Tabansky.
- [ ] Keep the photo outside expandable inclusions so the essential comparison remains visible. Reuse existing restrained motion only where it serves hierarchy; add no new animation or icon runtime.
- [ ] Run `node --test scripts/photos.test.mjs` against both built profiles. Verify all cases pass without weakening copy parity.
- [ ] Document the approved photo rules, source provenance and credit placement. Commit the independently reviewable change.

**Checkpoint 3:** Both profiles build; facts and copy are preserved; only approved assets ship; scoped code/visual review has no unresolved material findings.

## Task 4 — Verify the built pages

- [ ] Run `npm run test:profiles`, `npm run check`, `node scripts/check-content.mjs`, `npm run check:links`, `npm run test:pricing`, and `npm run test:pricing-inclusions` against both profiles. Use `SITE_ENV=production SITE_URL=https://toza-site.pages.dev` for production commands.
- [ ] Run `npm run check:a11y`, `npm run check:perf`, `npm run check:motion`, `npm run check:pricing-contact`, and `npm run check:pricing-print` against each affected profile. Use system Chromium via `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when needed.
- [ ] Review screenshots at 320/390/768/1024/1440px: subject and useful details survive crops; text has adequate contrast; no overflow or fixed-control overlap; no unintended changes to Home, existing Situation compositions or the About portrait.
- [ ] Test keyboard navigation, JavaScript disabled, reduced motion and a failed image request. Prices, copy, disclosures and contact links remain usable, with image space reserved.
- [ ] Verify print/PDF keeps all Pricing inclusions legible; photos may be suppressed in print if they do not convey required information.
- [ ] Check hero/first-visible image behavior in Firefox and WebKit where available. Record unperformed checks explicitly rather than claiming cross-browser acceptance.
- [ ] Compare measured performance with Checkpoint 1. Optimize if any budget fails; do not relax limits to accommodate photos.

**Checkpoint 4:** Screenshot review and test evidence cover the final SHA; no unresolved crop, licensing, accessibility or performance issue blocks the preview.

## Task 5 — Publish the verified preview and hand off

- [ ] Push the reviewed candidate to the existing preview branch and let CI verify/package/deploy its exact noindex artifact.
- [ ] Confirm the Verify and preview jobs succeeded, record run ID, commit, artifact identity and immutable preview URL in `docs/photography/selection.md` or the release checkpoint.
- [ ] Open deployed Pricing and How it works; verify the selected images load, correct responsive derivatives/crops are used, and contact links and disclosures work. Check deployed preview indexing headers.
- [ ] Give the owner the preview and side-by-side before/after images. Owner visual acceptance is the final photography checkpoint; production cutover follows the existing release runbook.

**Done:** One documented image standard governs the site; the separate search chat supplies two approved, traceable photographs; Home's visual language is preserved; affected checks pass; the exact verified preview is available with documented limitations.
