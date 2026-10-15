# Toza

Eleventy/Nunjucks marketing site deployed to the existing Cloudflare Pages project toza-site.

## English edition

The accepted English copy, authority and release gates live in projects/toza-en-editorial-revision/. The D-026 release publishes eleven English marketing pages. Hebrew marketing source is preserved but temporarily unpublished; Russian remains unpublished. Hebrew terms/privacy documents remain at the root and are labelled as Hebrew. This publication choice does not change service-language availability.

The Clear Practice visual system, approved logo and self-hosted Source Sans 3 implement the owner's round 2 A selection. See DESIGN.md. The authentic portrait and contact channels are retained. Wordmark: toza; running text: Toza. No new intake or payment system is part of this release.

## Development and checks

- Use Node 24 (.nvmrc), then npm ci installs the locked tools.
- npm run test:audit-policy and npm run audit:tools check the build-tool audit regression policy. Two unpatched upstream advisories remain explicitly reported; see docs/build-tool-maintenance.md for their scope and upgrade rationale.
- npm run sync:copy reproduces the accepted English templates. Do not hand-edit generated copy or alter accepted blocks without owner approval. See presentation ownership below.
- npm run build cleans only generated _site before building, preventing unpublished files surviving a rebuild.
- npm run verify:all checks accepted-source fingerprints, generated templates, published routes, links, schema facts, retained Hebrew source and legal RTL, and CI/deploy constraints. Historical he-* command names are retained for workflow compatibility.
- Install the pinned Playwright Chromium browsers, then npm run test:rtl-visual runs desktop/mobile English and retained legal checks.
- npm run verify:pages starts lockfile-pinned Wrangler 4.150.0 on an available loopback port, runs all 78 Pages route/status/content checks, and stops its process tree. Run after a build; CI runs this gate before deployment. Diagnostics are saved to .wrangler/pages-runtime-check.log.
- npm run pages:dev starts a persistent local Pages runtime on port 8788. For an existing or hosted runtime, node scripts/verify-pages-runtime.mjs uses TOZA_RUNTIME_URL (default http://127.0.0.1:8788).

Pages normalizes .html aliases to extensionless URLs; canonicals and sitemap follow those final URLs. Shared CSS/JS URLs are versioned because assets have long immutable cache lifetimes.

## Source and presentation ownership

- `scripts/accepted-copy.cjs` resolves approved sources and additive acceptance amendments, verifies authority and generates templates. Accepted Markdown and approval fingerprints control wording and metadata; presentation adapters do not supply new copy.
- Pricing-04 uses `scripts/pricing-layout.cjs`, `assets/css/pricing-04.css` and `assets/js/pricing-04.js`. The Pricing-only adapter implements its approved comparison, labelled graphics, disclosures and contact paths.
- Home and Why Toza use `scripts/marketing-layout.cjs` and `assets/css/marketing-02.css` for their accepted marketing-02 presentation.
- Supporting pages retain their existing `scripts/clear-practice.cjs` / `scripts/home-pricing-narrative.cjs` adapters; Process additionally uses `scripts/process-stages.cjs`. These historical adapters remain part of the effective render path, not a reason to restyle unrelated pages.
- Shared identity, typography and navigation remain in `src/_includes/layouts/vault.njk` and the existing shared assets. The compact footer has its own `assets/css/footer-compact.css`. Page CSS stays scoped to its page family; shared changes need cross-page verification.

## Release

The current content release is [PR #60](https://github.com/adirass-web/VIP/pull/60), published as `91e52ee8a8b6d9191a609c5353ac068445bc7147` on 15 October 2026: accepted Pricing-04, with the ten other pages and compact shared footer preserved. Merge-specific production checks verified 11 pages, 61 assets and 78 routes. See [publication evidence](docs/pricing-04-release/RELEASE.md) and [current project status](projects/toza-en-editorial-revision/state/CURRENT-STATUS.md). [PR #59](https://github.com/adirass-web/VIP/pull/59) is the preceding baseline; PR #54 remains untouched. Later line edits belong to a separate revision, preserving the accepted Pricing-04 inputs.

General PR verification does not deploy. The separate preview workflow permits only these same-repository branches, checked out at their exact PR head, with fixed noindex destinations:

| PR branch | Preview destination |
|---|---|
| `codex/toza-approved-copy-preview` | `four-page-release` |
| `codex/toza-trust-process-refinement` | `trust-process-release` |
| `codex/toza-marketing-02-release` | `marketing-02-release` |
| `codex/toza-pricing-04-release` | `pricing-04-release` |

A reviewed merge to main triggers production deployment using the installed, lockfile-pinned Wrangler. Verify the merge-specific deployment, live content/assets, headers, routes and responsive interactions before recording a release as published. Historical branch permissions do not authorize unrelated content changes or merges.

Canonical editorial instructions and skills live in the [editorial project](projects/toza-en-editorial-revision/README.md); docs/editorial and root skills provide compatibility links. See the [post-release maintenance record](docs/post-release-maintenance.md) for cleanup disposition and remaining upstream advisories.

Historical approvals, reviewed alternatives, research and prototypes remain under `projects/toza-en-editorial-revision/revisions/`; release evidence remains under the corresponding `docs/*-release` and preview folders. They document provenance rather than override later acceptance amendments. In particular, Pricing-03 remains the prior reviewed proposal; Pricing-04's accepted source/visual labels and owner-review snapshot are preserved alongside its research. The [#55 release record](docs/four-page-copy-preview/RELEASE.md), [#57 PR](https://github.com/adirass-web/VIP/pull/57) and [#59 release evidence](docs/marketing-02-release/RELEASE.md) remain historical references.

The focused presentation regressions run with `node --test scripts/visual-refinements.test.cjs`. CI retains the synchronize trigger. Local Pages checks use compatibility date 2026-10-06, wait for actual English HTML and require the complete 78-check success marker. Older authorized preview branches must incorporate the current maintenance base to use the installed runtime; there is no floating-tool fallback or gate bypass.
