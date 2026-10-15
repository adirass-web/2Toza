# Toza — Clear Practice (direction A)

Owner selected round 2 A and authorized implementation and GitHub release on 2026-10-09. This is a presentation release on the existing Eleventy/Nunjucks/Cloudflare foundation. Exact accepted English copy remains authoritative.

## System

- Warm paper #f5f3ed, ink #202b29, muted text #54615b, green actions #234f46, panel #e8ebe3, restrained bronze #725528.
- Self-hosted Source Sans 3 regular/semibold, 18px reading text. Source Serif 4 is outlined in the approved logo, not a live font dependency.
- 900px reading column, paragraphs capped at 710px. One content order on desktop, tablet and phone; responsive changes affect spacing and table presentation.
- Approved fitted-panel symbol and lowercase toza lockup in assets/brand/toza. See the project brand/DESIGNER-LOGO-BRIEF.md. Do not substitute a shield, lock, cyber pattern or transliterated wordmark.
- Use the authentic founder portrait. No generated founder imagery, decorative security imagery, trackers or new external font requests.

## Hierarchy and disclosure

Home, Pricing and Separation lead with a short introduction, contact action and first paid visit. Supporting detail uses native, keyboard-accessible disclosures with a show-all control. Client-control statements, first-visit scope/price, core full-service prices/scope, and both Assessment-credit qualifications remain visible. Print expands all detail; anchor links reveal the relevant detail. FAQ retains its dedicated controls.

Pricing tables retain semantic row/column headers and their original row associations. Small screens show labelled cells in a stable sequence. The protected Private Exposure Assessment retains its complete block order and does not gain collapsed content.

## Maintenance and release gates

Edit scripts/clear-practice.cjs and assets/css/clear-practice.css for presentation. Run npm run sync:copy after adapter changes; generated src/en templates are not independent editorial sources. The presentation verifier compares accepted prose blocks and table rows to the built pages, and checks protected-page order.

Required gates: verify:all; browser tests for all English routes and retained Hebrew legal pages, keyboard/menu/disclosures/anchors/print, widths 320–1440; independent review under decision D-009; same-repository PR preview; exact-head GitHub checks; production smoke checks after merge. The prior production commit 818ddbfeccad9d37f7eb310dd01b4edff581082a is the rollback reference.

Hebrew marketing remains temporarily unpublished. Preserve legal routes and language labels. Future Hebrew design requires explicit reviewed copy and RTL QA.
