# Direction A: Private bank (round 3)

**Foundation.** Tailwind v4 CLI with Flowbite 4 tokens remapped to the palette. The Flowbite forms layer is now off (`forms: false`), which removed every physical left/right rule it carried. No framework JS.

**Tokens** (unchanged). Ivory `#f7f2e8`, recessed `#ede5d3`, ink green `#11302a`, brass `#7d5f24` (`#cfae6a` on ink). Frank Ruhl Libre for headlines, Assistant for body, for English and Hebrew; both self-hosted, latin and hebrew subsets. Section padding is now 3.5rem on phone, 7rem on desktop.

**What changed this round (review fix list 1 to 10)**
1. Phone stages are compact rows: drawing at the inline start (120px), text beside it. Price facts flow as one dotted line on phone.
2. Portrait is 96px on Home and Separation; WhatsApp bottom at 552px and 478px.
3. Pricing columns use subgrid, so the three prices share one baseline.
4. Specimen has readable neutral entries; the label is unchanged.
5. The dated record shows "15 Oct 2026" in brass.
6. Inline links have a 45px or taller hit area (padding with matching negative margin).
7. RTL smoke test done (below).
8. `[draft]` copy is flagged in `design/dir-a-copy-provenance.md` only; pages carry no markers.
9. Portrait ships plain black and white; the sepia filter is gone.
10. The three drawings share one rendered stroke of 1.5px (non-scaling) at every size.

**Round 3 (owner edits)**
1. Deleted: "Two prices, both including VAT.", all "including VAT" labels, the World Bank credential line, the old Pricing note. No whole-word "VAT" in `_site`.
2. Specimen is a private document: toza logo letterhead, "Confidential" stamp, title "Exposure summary", subtitle, brass date, entries. Home heading above it: "What you take home after the first visit."
3. Method line verbatim in four places: large display lead of the stages block (Home, Separation), beside the profile link in Home block 4 (and the Separation credential section), above the tiers on Pricing.
4. New price strip (`pstrip.njk`): brackets under the stage columns on desktop (Assess; Harden + Verify), labelled rows on phone. Prices from facts via `ils`. Reused at the top of Pricing with the three stage names above.
5. Pricing: full-width "Start here" card (Assessment, credit line, conditions link), then Personal Shield, Inner Circle and a dark ink Bespoke card with a brass rule and "Individually scoped". Home and Separation price block: Assessment (Start here) and Personal Shield, plus a quiet "All protection tiers" link.
6. Phone Home: the "Or before anything happens" line now follows the four doors (grid order; desktop layout unchanged). To stay under 6 screens, phone section padding went from 3.5rem to 2.75rem and a few gaps were tightened.

**Language-ready base.** `src/_data/i18n/en.json` holds `lang`, `dir`, nav, buttons, footer, and the copy of shared components. `src/src.11tydata.js` picks the locale. Adding Hebrew means `he.json` and a `src/he` folder with `locale: "he"`.

**Phone length (390x844).** Round 3: Home 5.97, Separation 5.62, Pricing 3.91 (round 2: 5.92, 5.76, 3.30). Desktop: Home 5.45, Separation 5.18, Pricing 2.67.

**Page weight** (excluding portrait): Home 116 KB, Separation 114 KB, Pricing 89 KB. Limit 400 KB.

**RTL test.** Temporary Home and Pricing pages with `dir="rtl"`, a Hebrew paragraph and English strings, screenshotted at 390 and 1440 (`rtl-*.png`), then removed. The sticky header, menu, portrait frame offset, door arrows, link arrows, price columns and the buttons order all flip; no horizontal overflow. The built CSS has no physical left/right properties and the templates have no `ml/mr/pl/pr/text-left`. The drawings are wrapped in `dir="ltr"` on purpose, so they do not mirror.

**Checks.** `npm run build && npm run check` pass.

**Remaining gaps**
- 12 `[draft]` items await owner approval (see provenance).
- Home subline: 2a has two versions; confirm which one.
- Links to unbuilt pages still point to `#`.
- Hebrew not built; English words inside RTL text show misplaced full stops, expected until Hebrew copy exists.
- Contrast was checked by token ratios, not a tool.
- Real-device check of the plain portrait on low-end Android is still open.

**pricing-v2 branch.** Pricing proposal preview (P7/P8, 16 Oct 2026): three-tier Pricing page (subgrid rows span 4), first-step band, updated price strip, two-column Home/Separation price block, and a slim "Pricing proposal — preview for review" bar on every page. Phone: Home 5.76, Separation 5.40, Pricing 4.59 screens; desktop: Home 5.20, Separation 4.94, Pricing 2.89. Screenshots in `design/screenshots/pricing-v2/`.
