# Direction A: Private bank (round 2)

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

**Language-ready base.** `src/_data/i18n/en.json` holds `lang`, `dir`, nav, buttons, footer, and the copy of shared components. `src/src.11tydata.js` picks the locale. Adding Hebrew means `he.json` and a `src/he` folder with `locale: "he"`.

**Phone length (390x844).** Home 5.92 screens (was 7.3), Separation 5.76, Pricing 3.30.

**Page weight** (excluding portrait): Home 116 KB, Separation 114 KB, Pricing 89 KB. Limit 400 KB.

**RTL test.** Temporary Home and Pricing pages with `dir="rtl"`, a Hebrew paragraph and English strings, screenshotted at 390 and 1440 (`rtl-*.png`), then removed. The sticky header, menu, portrait frame offset, door arrows, link arrows, price columns and the buttons order all flip; no horizontal overflow. The built CSS has no physical left/right properties and the templates have no `ml/mr/pl/pr/text-left`. The drawings are wrapped in `dir="ltr"` on purpose, so they do not mirror.

**Checks.** `npm run build && npm run check` pass.

**Remaining gaps**
- 8 `[draft]` blocks await owner approval (see provenance).
- Home subline: 2a has two versions; confirm which one.
- Links to unbuilt pages still point to `#`.
- Hebrew not built; English words inside RTL text show misplaced full stops, expected until Hebrew copy exists.
- Contrast was checked by token ratios, not a tool.
- Real-device check of the plain portrait on low-end Android is still open.
