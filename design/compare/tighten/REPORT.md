# Tighten pass (branch system/tighten)

Page heights (px, scrollHeight), before → after, all 11 pages:

| Page | Desktop before→after | Phone before→after |
|---|---|---|
| home | 4884 → 4372 | 4979 → 4661 |
| separation-divorce | 4410 → 3256 | 4674 → 3950 |
| business-dispute | 4614 → 3461 | 4880 → 4156 |
| inheritance-conflict | 4513 → 3388 | 4802 → 4078 |
| they-know-something | 4813 → 3608 | 5065 → 4317 |
| pricing | 2718 → 2526 | 3912 → 3690 |
| faq | 5524 → 4472 | 6726 → 2363 |
| conditions | 6479 → 5918 | 9685 → 3508 |
| how-it-works | 4358 → 4006 | 4975 → 4705 |
| about | 3061 → 2669 | 2956 → 2674 |
| attorneys | 4247 → 3535 | 4370 → 3984 |

**Items.** 1 Tokens `section-padding` 2.75→2rem, `section-padding-wide` 7→4.5rem (a36d6fe). 2 Method line once, leading stages; separate method-statement removed from the four situation pages (f657e29). 3 Stages `variant: compact`, 8rem drawings, tight row; stages block 1041→719 desktop (77ef106). 4 Contact 399→263 desktop, 514→388 phone; footer 145→129 desktop, 245→153 phone, same five links (c6eb8b9). 5 FAQ closed by default, phone groups collapsible (b072ff7). 6 Conditions two columns (sections with more than 4 clauses), phone collapsible, print unchanged (549321e). 7 Float buttons `title` = aria-label string (ea4aeb2).

**Fields.** stages: new optional `variant` (full|compact); `statement` now optional (was required). faq_item `open` removed (all 6 uses deleted).

**JS.** site.js gzip 1748 → ~2030 B.

**Checks.** build, check, check:content (parity 100%) pass; anchors: 0 missing vs main; axe: 0 violations except one pre-existing target-size on FAQ (#g nav link partially covered by the float button at the captured scroll); no overflow; no external requests; RTL at 390 (faq, conditions, separation-divorce) mirrors; JS off: FAQ and Conditions fully open; print PDF (design/compare/tighten/conditions-print.pdf): 9 sections, single column, made from a 390 viewport with sections collapsed.
