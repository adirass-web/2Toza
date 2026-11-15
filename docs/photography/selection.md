# Photography selection and geometry record

Date: 15 November 2026. Candidate source SHA: `59e11d1e62bbb17167f70cefce106049063d31bf` (preview baseline). Status: **geometry proposed; no owner approval or photograph selection recorded**. No published templates, CSS or photographic assets change at this checkpoint.

The supplied plan points to `docs/superpowers/specs/2026-11-15-photography-upgrade-brief.md`; that file is absent from this checkout. The attached plan and image-layout research guide this preparation. The research recommendation does not constitute approval.

## Review artifacts

Run `npm run build`, then `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-photography.mjs`. Captures use Chromium, reduced motion, a 900px viewport height and widths 320, 390 and 1440. The helper loads existing lazy photographs for complete references, then inserts grey labeled geometry only in the browser DOM. It never edits published sources. Baseline metrics use the unchanged existing performance gate, without these review DOM edits.

Artifacts are ignored, under `.artifacts/photography/`:

- `home-{320,390,1440}-current.png`: full current Home reference including all three scenes.
- `{separation-divorce,business-dispute,inheritance-conflict,about}-{320,390,1440}-current.png`: every existing photographic page that a future shared-element migration affects.
- `{pricing,how-it-works}-{320,390,1440}-current.png`: unchanged insertion-page baselines.
- `{pricing,how-it-works}-{320,390,1440}-proposed.png`: full-page geometry proposals, with existing copy and contact controls.
- `{pricing,how-it-works}-{320,390,1440}-composition.png`: detail crops of the comparison or supporting article.
- `review-{390,1440}.png`: side-by-side Home reference and both proposed slots.
- `geometry.json`: browser-measured image dimensions, positions, crop styles, intrinsic attributes and proposed slots.
- `performance-preview.txt`, `asset-sizes.json`: raw measurement evidence.

These are layout compositions, not crop approval: no new photographs appear. Inspect full-page versions for page context. Compare proposed pages beside Home's current composition.

## Existing placement inventory

Shared root gutter is `clamp(22px,5vw,78px)`. Home hero/scenes and Situation hero photographs bleed to their existing wrapper edges. Photos are centered unless stated. Existing missing intrinsic dimensions are recorded for later contract migration, not corrected here.

| Slot | Container, maximum and gutter | Desktop / phone geometry | Loading and text |
|---|---|---|---|
| Home hero | Full viewport; zero image gutter, no max | 3:2; contain; 1440×960 / 390×260 | High priority; width/height 1536×1024; existing title overlay/scrim |
| Home separation | Scene full width; photo 65% desktop, 94% phone, right aligned | Scene height clamp 780–1040px around 92vh; image 92% high; phone 1.14:1; cover | Lazy; title panel overlaps; no intrinsic attributes |
| Home business | Photo 72% desktop, 91% phone, left aligned | Scene as above; image 94% high, top 5%; phone 1.08:1; cover | Lazy; offset title panel; no intrinsic attributes |
| Home inheritance | Photo 62% desktop, 94% phone, right aligned | Scene as above; image 91% high, top 3%; phone 1.14:1; cover | Lazy; offset title panel; no intrinsic attributes |
| Three Situation-page heroes | Full viewport; title width min(100% − 40px,1280px) | Image fills hero; desktop min-height clamp(400px,58vw,768px); phone ≤640px min-height 464px; cover | High priority; scrim and title overlay; no intrinsic attributes |
| About portrait | Existing max-72ch wrapper inside max-1240px main and shared gutter | Square, max320px; observed 320px desktop / 296px at390 | Auto loading; 640×640 attributes; separate biography; contains identifying portrait |

Sources: `styles/approved-en.css`, `approved-en-assets/css/en-continuation.css`, `situation-pages.css`, `locked-supporting.css` and corresponding Nunjucks templates. Home scene sources and the three Situation hero sources are the same `sit-{1,2,3}-900.jpg`, each 900×1500. About source is 640×640. Home hero declares 1536×1024 and has 900/1536 WebP candidates. Browser `naturalWidth` for a density-adjusted responsive candidate can differ from source-file pixels; do not treat it as an original-file dimension.

## Two proposed slots

**Pricing / Personal Shield — `card`.** Replace only the current decorative `.pricing-featured-art` icon cluster. Keep name, price and audience before it; summary and full-inclusions disclosure after it. Retain current tile padding and comparison grid. No bleed, captions or text overlay. Proposed ratio 3:2 across widths, cover with an asset-specific approved focal point. Atmospheric image, empty alt unless final selection conveys useful information. Purpose: make practical personal protection tangible through a coherent everyday-device scene. Reject a photograph that resembles evidence of an actual Toza client or makes the essential price/summary harder to scan.

**How it works / assessment — `section`.** Place after the complete “First, your personal threat model.” explanation and before “Then, separately agreed protection.” Keep the assessment price, written-summary terms and scope as HTML before the image. Use the existing `.locked-copy` content width, shared gutters, no bleed or overlays, 3:2 cover. Atmospheric image initially; final selection determines alt. Purpose: connect careful assessment and practical method, without implying pictured people are Toza staff or clients. The placement is a recommendation awaiting owner choice.

Both images require a useful central subject that survives 3:2 at 320px; leave optional context at edges. Avoid tiny screen text, confidential details, stock cybersecurity theatrics and near-duplicate subject matter. Proposed widths below are browser measurements, including existing fixed-contact clearance, not idealized viewport calculations. The section remains quite large on desktop; owner review may choose a smaller shared section cap before search.

## Preview performance baseline

Existing `npm run check:perf` passed all 15 pages. Chromium at390×844, fresh browser contexts, 4× CPU slowdown, 1.6Mbit/s down and 150ms latency. Single local run, initial transfer only; timing is environment-dependent. This is the unmodified preview profile, not a production or proposed-photo measurement.

| Page | LCP ms | CLS | Transfer KiB | JS gzip KiB |
|---|---:|---:|---:|---:|
| Home | 1308 | 0 | 368 | 3.8 |
| About | 1208 | 0 | 164 | 0 |
| Separation | 1300 | 0 | 209 | 0 |
| Business dispute | 1504 | 0 | 241 | 0 |
| Inheritance | 1900 | 0 | 266 | 0 |
| Pricing | 1096 | 0 | 149 | 6.0 |
| How it works | 1216 | 0 | 106 | 0 |

Budget remains initial transfer ≤1200KiB, target LCP ≤2500ms (existing gate fails >3000ms), CLS ≤0.05, JavaScript ≤60KiB gzip. Re-measure after approved integration. CSS/JS source and compressed sizes are recorded separately below.

## Approval record

- Shared native element and controlled variants: proposed, pending owner approval.
- Pricing card geometry and placement: proposed, pending owner approval.
- How it works section geometry and placement: proposed, pending owner approval.
- Photographs, provenance, license restrictions and focal crops: not selected; separate search chat follows approval.
- No asset integration, preview publication or production cutover performed here.

## Source asset sizes

| Asset | Bytes | Gzip bytes |
|---|---:|---:|
| `approved-en-assets/css/main.css` | 49351 | 10358 |
| `approved-en-assets/css/pricing.css` | 5555 | 1740 |
| `approved-en-assets/css/locked-supporting.css` | 2540 | 924 |
| `assets/js/site.js` | 7411 | 2249 |
| `assets/js/restrained-motion.js` | 9655 | 3868 |

Exposure has no photographic markup and is outside the proposed photo migration. About is a graphite portrait rather than a new stock-photo selection.

## Measured proposed slot dimensions

Viewport height900px; widths include all existing page and card padding. Rounded to0.1px. At320px the helper uses a small label to avoid imposing a text minimum on the 3:2 placeholder.

| Viewport | Pricing slot | How it works slot |
|---|---:|---:|
| 320px | 172.0 × 114.7px | 226.0 × 150.7px |
| 390px | 242.0 × 161.3px | 296.0 × 197.3px |
| 1440px | 452.0 × 301.3px | 891.8 × 594.5px |
