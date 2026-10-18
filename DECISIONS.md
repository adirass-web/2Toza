# Decisions and handoff — design/radical

| ID | Date | Decision |
|---|---|---|
| R-01 | 2026-10-18 | Spec v0.3 approved by Arnulf Damerau (SPEC.md D1–D20). |
| R-02 | 2026-10-18 | Copy frozen at 2toza main @ b3efb35 (after V-045/V-046). |
| R-03 | 2026-10-18 | Boards: Home hero + situation doors, desktop 1440 and phone 390, one wordmark proposal each. |
| R-04 | 2026-10-18 | Scope 2, 3, 4; tasteskill v2 as design engine; PFD motion rule; free stock photos; HE+EN single families; dark palette redrawn (SPEC D21–D28). |

## Handoff (18 Oct 2026, ~14:15)
**Done:** boards 2, 3 and 4 built in `site/`, plus the comparison page. Checks: copy parity pass; taste lint 0 FAIL.
**Next:** owner review on the preview; pick one or two directions; then the next spec (pages, stack, Hebrew, final photography).

**Inspector results.** The FAILs left after fixes are accepted:
- `still-page`: decision D23.
- `few-pictures`: the boards carry 2 to 6 photos across two sections, against a floor of 4 set for whole pages.
- Board 3 also has an `eyebrow` FAIL: the kanji under the wordmark sits above the headline at tablet width.

**Warnings, defended:**
- *leverage*: frozen copy.
- The em dash in the page title: frozen copy.
- Soft-grey secondary lines on phones.
- Font-size count on the boards includes the wordmark sheet.

**Redraws:**
- Palette for direction 4: 7 redraws, rejecting dark grounds, red, and grounds too close to board 3's olive-on-bone.
- Section `list` for directions 3 and 4, because the dealt blueprints did not fit four situations:
  - board 3: "Statement, table pushed right";
  - board 4: "Sticky photograph, active list".

**Photos:** credits are on `site/index.html`. Placeholders for review only. The women in them are mostly under 35; free stock offers few 35–55.

**Sample/production notes on boards:** wordmark sheets and credit lines (`data-copy-exempt`).

## 18 Oct 2026 — study F (D45)
- Owner: "You keep keeping internal symmetrical shapes. All 4 situations are symmetrical. Parallels." Angle studies A–E all used parallelograms, trapezoids or rotated rectangles.
- Interpretation shown to the owner and approved ("build a single study, F"): no parallel edges, every shape different, bleed off viewport and across sections, cuts leaning one way, text level.
- Built as `site/b2-angle-f/` from `scripts/make-angle-variants.py` (desktop: 24-column grid 112vw wide, clipped at the viewport; phone: varied cuts on the existing 2×2).
- Checked at 1024, 1440, 1920 and 390 px; copy parity passes; no horizontal scroll.
- Next: owner review of F. If F is the direction, port it into board 2 and retire A–E.

## 18 Oct 2026, 18:18 — pause (D46)
- Owner: "F is too much. Let's pause. I will find sites that I like."
- Session handoff: `HANDOFF-2026-10-18.md`.
