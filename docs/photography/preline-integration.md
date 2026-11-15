# Direct Preline integration checkpoint

15 November 2026. Implementation commit: `abd4f12`, based on `cf509e3`. The owner requested using Preline without MCP and later requested a standalone HyperUI pricing comparison before deciding the pricing direction. The implementation remains a local review candidate; no deployment or vendor switch is implied.

## Implemented

- `src/_includes/approved-en/grid.njk`: shared caller macro for card and image/text grids.
- `approved-en-assets/css/content-grid.css`: shared responsive composition without a browser runtime.
- Pricing: three cards on wide screens, single column below 1280px to preserve readable long service descriptions and contact clearance. Personal Shield remains visually emphasized. Native full-inclusion disclosures, fixed prices, limits, contacts and legacy IDs remain.
- About: the existing portrait alongside the introduction from 900px, stacked below. The portrait stays square and at most 320px wide. The remaining article keeps its reading column.
- Home, Situation pages and How it works retain their existing layouts. No new stock photographs or vendor sample content were imported. Future photo-bearing sections can reuse the grid after asset selection.

Sources, adaptations and shipped license notices: `docs/third-party/preline.md`. The standalone pricing assessment is complete in `pricing-component-comparison.md`. HyperUI remains plan B; the current implementation stays a review candidate.

## Verification

Both preview and production build/check/content/link/pricing checks pass. Content parity is 100%; the production link check covers 490 links in 15 pages. Six existing pricing/inclusions tests pass. No assertions were weakened; one test label was renamed from bento to card grid.

Both profiles passed the existing accessibility gate: 60 runs each, zero reported violations. The harness includes synthetic light/dark runs; this does not establish a supported user-facing dark mode. Both profiles passed the existing 15-page performance gate.

| Profile/page | LCP ms | CLS | Initial transfer KiB | JS gzip KiB |
| --- | ---: | ---: | ---: | ---: |
| Preview Pricing | 1092 | 0 | 150 | 6 |
| Preview About | 1192 | 0 | 165 | 0 |
| Production Pricing | 1076 | 0 | 150 | 6 |
| Production About | 1188 | 0 | 166 | 0 |

These are local Chromium measurements under the existing throttled gate, not deployed performance guarantees. Responsive screenshots and checks cover 320/390/768/1024/1440px. The existing contact gate additionally covers 1101/1200px. Both profiles pass actual Pricing PDF checks with JavaScript disabled and the contact overlap/contrast checks. Independent review found no material issue in the implementation.

Evidence is local under `.artifacts/preline/`: source extracts, implementation and review reports, build/check logs, full-page screenshots, grid-detail screenshots and geometry. Firefox/WebKit, manual screen-reader acceptance and live deployment acceptance are not claimed.

Both profiles also passed the existing motion gate and production responsive-grid/no-JavaScript checks. The refreshed minimal local export contains 80 files / 1,078,564 bytes and passes 490 links across 15 pages; it remains a local review artifact, not a CI-approved release.
