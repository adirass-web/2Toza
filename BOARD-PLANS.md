# Board plans — directions 2, 3, 4 (for approval)

18 Oct 2026. Scope cut to three directions (D21): 1 Dossier and 5 Conversation are dropped.
Every board shows the same content: header, hero, situation doors. Each is built at desktop 1440 and phone 390, and carries its own wordmark proposal.

## Copy used (verbatim, `main@b3efb35`)
- **Nav:** Situations · How it works · Pricing · FAQ · Message · Menu
- **H1:** Before private information becomes leverage.
- **Lead:** Private conversations, finances and plans can become leverage over you. Toza assesses and hardens your phone, computer and accounts with you, in person.
- **Actions:** WhatsApp · Signal · Call me back. Direct links from contact.json; the first tap opens the channel.
- **Promise:** In person · With you present · You control your credentials
- **Doors:**
  - Where this usually begins.
  - Separation or divorce / What still connects your digital lives.
  - Business or founder dispute / Where personal and business access still meet.
  - Inheritance conflict / Family arrangements that outlived the trust.
  - Someone knows something / Private information has surfaced. Start with what can be checked.
  - Or before anything happens. You don't need a known incident to begin.

Arrangement only. Strings may be broken across lines; a string may be split into its own parts (e.g. the promise line as three lines). No words are added or changed.

## Shared quality floor
- Self-hosted OFL fonts that have a Hebrew companion.
- Logical CSS properties only.
- WCAG AA contrast, visible focus, 44px tap targets, reduced motion respected.
- Phone fold at 390×844 shows the H1, the lead and the WhatsApp button.
- No page-load fade on every section. At most one orchestrated moment per board.

---

## 2 · Plates — a monograph you turn page by page

**Idea:** The site behaves like a printed art monograph. Each statement gets a full-screen plate. Type plates alternate with photo plates, and the type itself is the image.

**The one bold thing:** the H1 set across the whole first plate, about 11vw, one phrase per line, filling the plate edge to edge.

**Palette**
| Name | Hex |
|---|---|
| Plaster (cool white) | `#ECEDEA` |
| Ai (Japanese indigo, all type) | `#1E2A4A` |
| Ai-light (rules, secondary text) | `#5B6687` |
| Photo plate ground | `#C9CCC6` |

No accent colour. Contrast comes from scale, not colour.

**Type:** Noto Serif Display (light, high contrast) for H1 and door titles; Noto Serif for text. Hebrew companion: Noto Serif Hebrew. One family.

**Layout**
```
DESKTOP 1440                          PHONE 390
┌──────────────────────────────┐      ┌────────────┐
│ toza          nav    Message │      │ toza  Menu │
│                              │      │ Before     │
│ Before private               │      │ private    │
│ information                  │      │ information│
│ becomes                      │      │ becomes    │
│ leverage.                    │      │ leverage.  │
│ lead (col 7–11)  [WhatsApp]  │      │ lead       │
│ promise, 3 lines  Signal …   │      │ [WhatsApp] │
├──────────────────────────────┤      ├────────────┤
│ [P1 photo plate, full bleed] │      │ [P1]       │
├──────────────────────────────┤      ├────────────┤
│ Where this usually begins.   │      │ heading    │
│ Separation | Business  (2×2, │      │ 4 doors,   │
│ Inheritance| Someone    half-│      │ one per    │
│ plates, large serif titles)  │      │ screen-half│
│ Or before anything happens…  │      │ aside      │
└──────────────────────────────┘      └────────────┘
```
Left-aligned on a 12-column grid. Text sits in columns 7–11, against the giant H1 in columns 1–12. Scroll-snap between plates on desktop only.

**Photos:** P1 (woman walking) full bleed between hero and doors; P3 (hands) as a narrow inset in the doors plate. Both are marked placeholders.

**Wordmark sketches**
- **a.** `toza` in Noto Serif Display light, with the letters tracked tight until the counters nearly touch (shut).
- **b.** `toza` with 閉ざす set small and vertical beside it, like a colophon.
- **c.** `toza` with the bowl of the `a` closed into a full ring.

**Risk:** a long scroll on phone. This board shows only the first two plates.

---

## 3 · Still life — tailored objects, warm light

**Idea:** Craft and tailoring. The phone lies face-down on a wooden table, lit like a still-life photograph. The page borrows the vernacular of a tailor's workroom: woven labels and tacking stitches.

**The one bold thing:** the hero is one large photograph (P2, phone face-down on the table), with the H1 set into its dark negative space.

**Palette**
| Name | Hex |
|---|---|
| Walnut (ground) | `#2A221E` |
| Tobacco (panels) | `#4A3B30` |
| Linen (text) | `#E6E0D5` |
| Indigo thread (one accent: stitches, focus, primary button) | `#4C5E8C` |
| Steel (secondary text) | `#A3A9B0` |

**Type:** Bellefair (refined display serif with its own Hebrew) for H1 and door titles; Rubik Light for text (has Hebrew).

**Layout**
```
DESKTOP 1440                          PHONE 390
┌──────────────────────────────┐      ┌────────────┐
│ [label: toza]   nav  Message │      │ label Menu │
│┌────────────────────────────┐│      │[P2 photo,  │
││ P2 photo, phone face-down, ││      │ cropped]   │
││ lit from the side          ││      │ H1         │
││            Before private  ││      │ lead       │
││            information     ││      │ [WhatsApp] │
││            becomes leverage││      └────────────┘
│└────────────────────────────┘│
│ lead · actions · promise     │
├ - - - - - - (stitch) - - - - ┤
│ Where this usually begins.   │
│ Separation…    │ Business…   │  two columns, stitch rules
│ Inheritance…   │ Someone…    │  between rows
│ Or before anything happens…  │
└──────────────────────────────┘
```
Left-aligned. The doors are a two-column list divided by indigo tacking-stitch rules (a dashed line drawn as stitches). No cards.

**Photos:** P2 is the hero. Marked placeholder: dark frame and caption.

**Wordmark sketches**
- **a.** `toza` on a woven garment label (small rectangle, folded edge), with 閉ざす stitched in thread beside it.
- **b.** `toza` in Bellefair, underlined by one tacking stitch that ends in a knot (the thread closed off).
- **c.** A square label monogram `t`, for small sizes.

**Risks:** dependence on the real photograph; and dark warm ground is a known AI default, kept here only because it is a still-life photo setting. Fallback: a linen-ground version.

---

## 4 · Access map — the web that closes shut (*tozasu*)

**Idea:** Ordinary access drawn as a diagram. The hero shows what connects to you, and the connections close shut.

**Discovery:** 閉 (the first character of 閉ざす) is built on 門, "gate, door". The situation doors are literally doors.

**The one bold thing:** a hero diagram labelled only with words from the lead: *Private conversations · finances · plans · phone · computer · accounts · you*. On load, the lines draw once in cobalt (open access), then close and settle to slate, a closed shape. This is the board's single motion; it is skipped with reduced motion.

**Palette**
| Name | Hex |
|---|---|
| Fog (ground) | `#EEF1F0` |
| Slate (text, closed lines) | `#1C2B33` |
| Cobalt (open access lines, primary button) | `#2347C6` |
| Mist (grid, secondary text) | `#8E9AA0` |
| White (panels) | `#FFFFFF` |

**Type:** IBM Plex Sans (text and H1, at a clear scale), IBM Plex Sans Hebrew. No monospace.

**Layout**
```
DESKTOP 1440                          PHONE 390
┌──────────────────────────────┐      ┌────────────┐
│ toza mark     nav    Message │      │ mark  Menu │
│ H1 (col 1–5)  │ diagram      │      │ H1         │
│ lead          │ (col 6–12)   │      │ lead       │
│ [WhatsApp]    │  you ── phone│      │ [WhatsApp] │
│ Signal · Call │  │  ╲ accounts│     │ diagram    │
│ promise       │  plans ─ …   │      │ (compact)  │
├──────────────────────────────┤      ├────────────┤
│ Where this usually begins.   │      │ 4 doors,   │
│ 4 doors in a row, each with a│      │ stacked,   │
│ small 門-shaped line drawing │      │ glyph left │
│ above title + line           │      │            │
│ Or before anything happens…  │      │ aside      │
└──────────────────────────────┘      └────────────┘
```
Left-aligned. Each door glyph is an unlabelled abstract drawing of an open gate. Hover or focus closes it, which shows that the door responds.

**Photos:** none.

**Wordmark sketches**
- **a.** `toza` in Plex Sans medium, with the `o` and `a` as two nodes joined by one closing line.
- **b.** A mark drawn from 門 reduced to strokes, with the gap shut by a single bar, beside `toza`.
- **c.** `toza` with 閉ざす as a small set line.

**Risk:** a diagram can feel technical or "cyber". Mitigation: wide spacing, no grids of dots, no glowing nodes, no padlocks.

---

## Check against generic defaults (changes made)
- **Plates:** dropped the numbered plates from spec v0.3; the content is not a sequence.
- **Still life:** moved off the current site's ivory and brass to walnut and indigo; one stitched rule instead of hairline-rule broadsheet styling.
- **Access map:** no monospace labels, no acid or neon accent, no grid of dots.
- **All three:** no all-caps eyebrows and no `→` appended to links. The only middle dots are inside the verbatim promise line.

## Build order after approval
1. Fonts (subset, self-hosted).
2. Board 2.
3. Board 3.
4. Board 4.
5. Comparison page.

Each board gets a screenshot and visual check at 1440 and 390, the copy check, and a push to the preview. You review after each board.
