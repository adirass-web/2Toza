# Production preparation — 15 November 2026

## Recommendation: keep the repository and deploy a verified artifact

The current English candidate is `codex/toza-english-mvp-20261114` at `59e11d1`, not `main`. Its existing `Verify` workflow builds both profiles, runs checks and packages `production.tar.gz` with SHA-256 provenance. `Owner production release` downloads that exact archive without rebuilding; it requires a successful push run on the current `main` SHA and the configured owner’s production-environment approval. Keep this architecture. Research documents, source templates, npm packages, tests, Git history and unused branches never need to be uploaded to the web host.

A new source repository is not required to reduce production files. It would duplicate branch protection, secrets, release approvals, CI, pinned legacy-baseline access and rollback setup. Retain this repository as the source of truth and use a static artifact as the deployment boundary. Existing release prerequisites and owner cutover remain in `docs/english-release-runbook.md`.

## What lives where

| Material | Purpose | Web hosting requirement |
|---|---|---|
| `src/`, `content/`, `styles/`, `tokens/`, `.eleventy.js`, build scripts and package lock | Build source, content and dependencies | Build only |
| `approved-en-assets/`, `assets/` | Published assets mixed with older alternatives | Only referenced runtime assets plus licenses |
| `docs/`, `research/`, `reference/`, `design/`, tests | Decisions, experiments and verification | None |
| `_site/` | Noindex preview output | Preview only |
| `_site-production/` | Production-profile static output | Existing CI deploys this exact directory |
| `.github/workflows/` | Verification and deployment controls | CI only |

## Local minimal bundle

`scripts/export-production.mjs` prepares a reviewable static bundle without changing source, workflows, branches or hosted sites. Run from the repository root after a fresh build:

```sh
npm ci
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run build
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run check
SITE_ENV=production SITE_URL=https://toza-site.pages.dev node scripts/check-content.mjs
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run check:links
node --test scripts/export-production.test.mjs
node scripts/export-production.mjs .artifacts/production-export
node scripts/check-links.mjs .artifacts/production-export/site
```

Choose a new destination each time: the exporter refuses to overwrite an existing directory. `site/` contains all built HTML, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, attribution/license files and the transitive local asset references found in HTML, CSS, SVG and JavaScript. It follows `srcset`, CSS fonts, canonical-origin Open Graph images, SVG href references and literal root asset URLs in scripts. Unreferenced image originals, older illustrations and unused styles/fonts are omitted. Nothing is removed from the repository or original build.

`manifest.json`, outside `site/`, records each exported path, byte size and SHA-256, plus omitted paths and the checkout’s HEAD. HEAD identifies the checkout only; it does not attest build freshness, a clean working tree, tests or CI approval. Keep the manifest with the bundle, not in the web root.

The exporter rejects symlinks, missing referenced files (including extensionless asset URLs) and preview indexing controls. Missing navigation links are allowed only for an exact declared 3xx redirect to an existing local destination. Wildcards, redirect chains, external targets and rewrites are deliberately not supported as missing-file exemptions. It is scoped to the current static site: dynamically assembled JavaScript asset URLs, external CSS imports and future runtime loaders require a reviewed extension or explicit retention before use. Existing JavaScript was inspected for this task; no dynamic asset loader was found. Follow export with link checks, browser/network checks and the project’s full release gates. Asset reachability is not proof of accessibility, visual acceptance or licensing.

**This trimmed local bundle is not the existing CI-verified release artifact.** Do not substitute it into the owner release workflow. To adopt pruning for production later, run the export *before* all CI checks, point every check at the trimmed build, and package that exact checked tree using the existing provenance contract. That is a separately reviewable release-pipeline change.

## If a new repository is desired

A static distribution repository can contain only the reviewed `site/` contents; keep its manifest as a release attachment and link back to the source SHA and verification run. Disable any competing writer to the same hosting project before owner cutover. A distribution repo cannot regenerate the website: edits belong in this source repository and generate a new verified artifact. Do not copy `.git`, `node_modules`, source documents, credentials or a deployment workflow that can accidentally activate on the new repo.

For an independently maintainable *source* repository, perform a separate extraction with the lockfile, build inputs, test fixtures, attribution and CI intact, then verify from a clean checkout. Merely copying current HTML into a new repo is a static distribution, not a maintainable source migration.

## Checkpoints

- Repository/build/deploy inspection: complete; existing artifact-based release is the recommended approach.
- Export implementation: local review utility; no production workflow changed.
- Local verification and measured sizes: recorded in `.artifacts/production-prep-report.md` for this working session.
- Full CI verification, owner acceptance and production cutover: not performed by this preparation task.

## Measured local checkpoint

Fresh production build from checkout HEAD `59e11d1e62bbb17167f70cefce106049063d31bf` on 15 November 2026:

| Output | Files | Bytes (uncompressed disk payload) |
|---|---:|---:|
| Original production build | 107 | 12,673,593 |
| Local trimmed review export | 77 | 1,073,496 |
| Omitted unused files | 30 | 11,600,097 |

This is a 91.5% reduction in hosted disk payload, not a claim about page-load transfer: browsers already request only referenced resources. The largest omissions are unused PNG originals and illustration/portrait alternatives. All 15 HTML documents remain byte-for-byte copies, with the current active portrait and hero variants retained.

Fresh checks passed: production build; facts/indexing/tokens and 298 approved-copy checks; content parity; 488 links across 15 pages in both original and trimmed outputs; seven exporter contract tests; Chromium at 390/1440px across all 15 documents (30 visits) with scrolling to trigger lazy images, zero failed/error HTTP responses and zero broken images. The browser check exercised local static serving, not Cloudflare redirects/headers, live contact delivery, keyboard acceptance, accessibility or full performance gates. The export was not deployed, and no new repository was created.
