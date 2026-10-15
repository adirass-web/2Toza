# Pricing-04 production presentation

The owner approved the exact Pricing-04 copy, visual microcopy and reviewed rendering for deployment on 15 October 2026. This integration changes Pricing presentation only; the frozen proposal and review evidence remain intact.

## Implementation

- `scripts/pricing-layout.cjs` exports `render(page)` and `renderBody(source, channels)`. It guards the owner-approved Pricing and visual-copy fingerprints, derives the reviewed composition, and checks metadata against the approved source. It never reads generated `_site` output. The accepted-copy adapter owns selection and calls this helper only for the Pricing-04 amendment.
- `src/en/pricing.njk` is generated with the existing vault layout, canonical Pricing URL, approved metadata, `pricing_04: true` and `accepted-page pricing-page pricing-04` classes. The real shared header, navigation, schema and footer remain the site owners. Review-only header/noindex chrome is not emitted.
- `assets/css/pricing-04.css?v=pricing-04-1` derives from the approved page module. Container widths are owned by `main .wrap`, preserving the shared header/footer geometry. The vault layout includes this stylesheet only for Pricing-04. Original shared styles/fonts are unchanged.
- `assets/js/pricing-04.js?v=pricing-04-1` adds only repeated-same-hash disclosure opening on main-content links. Existing `site.js` remains the single navigation, hash-change and print-state owner. Loading the prototype's entire print script as well would create duplicate print listeners, so it is deliberately not loaded.
- The real `contact-channels.njk` include retains the existing neutral WhatsApp/Signal destinations and labels. The approved `#contact` is a heading anchor within `.p-contact`, so Pricing-specific tests use the actual contact container and assert both controls rather than an empty selector loop.

The source body matches the approved visual composition and all 93 ordered text blocks. A narrow accessibility correction adds `scope="col"` to the two right-aligned urgent-table amount headers, which the prototype's `<th>`-only expression missed. This changes attributes only; every heading, cell, amount, link and source order stays exact. All seven main comparison rows have explicit row/product header associations.

## Verification

- `npm run build`: PASS.
- `node scripts/verify-pricing-04.cjs`: PASS — 93 ordered blocks, complete reviewed words and links, table cells/counts/metadata, and 79 prior output files unchanged.
- `npm run test:rtl-visual`: **56 passed**, desktop-dark and mobile-light, no skips. Existing non-Pricing assertions remain. Pricing cases now exercise the approved seven-row/native-header comparison, counted people/devices/keys, two real contact actions, paid-stage acceptance and payment, conditional credit, direct Assessment scope, independent summary, safe first aid, OpSec labels, group privacy/records, urgent trigger, disclosure keyboard/deep links, same-hash reopening and print-state restoration.
- A separate actual-shell check at 1440, 390 and 320px verified one main landmark, complete ordered copy, object counts, no overflow/errors/duplicate IDs, actual mobile navigation keyboard behavior, direct Assessment allowance/group mapping, repeated credit links and print restoration. The Pricing header/footer markup **and geometry** exactly match the unchanged Home shared shell at each width. Pricing assets are absent on Home.

Local actual-shell evidence: `/workspace/toza-release-evidence/pricing04-production-presentation/`, including `checks.json`, six production screenshots and `BROWSER.log`. The existing browser suite also captures accepted Pricing screenshots for desktop-dark and mobile-light under its test-results artifacts. These are implementation/release checks, not evidence of improved sales.

## Preserved boundaries

The protected Assessment and the other ten published English HTML pages remain unchanged. No new purchase UI, service fact, source wording, price, scope, credential-control rule, hardware SKU or guarantee is introduced. Pricing-03 and the exact Pricing-04 prototype are preserved as historical evidence. Future owner line edits belong to the next explicitly reviewed version.
