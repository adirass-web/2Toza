# Round 1 — Colour & Type (light version, Study G)

## 1. Concept
White paper and warm stone take the amber, beige and black-and-white of the photographs; one ink carries every word, and mint appears only as a single cell and a few small marks.

## 2. O20 palette (Aspen base, warmed; continuity with board 2)
| Token | Hex | Use |
|---|---|---|
| `--ground` | #FFFFFF | page, H2 hero text block, gaps between boxes |
| `--stone` | #F3F1EC | box fill A: situation text boxes, Personal Shield |
| `--sand` | #E4DFD6 | box fill B: Personal Shield for Two, pinned-scene text plate |
| `--ink` | #232323 | all text, buttons, box fill C: Inner Circle, closing panel |
| `--muted` | #5C5A56 | "for" lines, situation sub-lines, labels, footer |
| `--muted-inv` | #B8B4AC | muted text on ink |
| `--accent` | #A1FFCB | mint: one cell + 6 px marks, P6 band |
| `--hairline` | #CFCAC1 | C1/R5 frame lines, 1 px rules (decorative only) |
| `--node` | #8C8880 | 6 px frame nodes; A8 start colour |
| `--btn` / `--btn-ink` | #232323 / #FFFFFF | WhatsApp, Signal, Call me back (all three filled on the closing panel, inverted: #FFFFFF on #232323 → #232323 on #FFFFFF) |

Contrast (WCAG 2.x, computed):
- ink on ground 15.72 · on stone 13.92 · on sand 11.84 · on mint 13.23
- muted on ground 6.88 · on stone 6.10 · on sand 5.19
- white / mint on ink 15.72 / 13.23 · muted-inv on ink 7.61
- button text 15.72
- node #8C8880 on white 3.53. Used only as the start state of A8, where the text is ≥24 px (large text passes at 3:1); never for small text.
- hairline 1.63. Decorative only, never the only edge of a control.
- Primes hero: white text over a gradient going to rgba(0,0,0,.62) under the text. Even on the white tablecloth, the worst-case pixel becomes #616161, so white on it is about 6.1:1.

Not Odyssée cream/navy: cream turns the amber photos sepia; navy reads as a bank.

## 3. Type scale (Bona Nova 400 / 400 italic; 700 not used on Home)
| Role | Size | LH | Style |
|---|---|---|---|
| H1 Primes hero | clamp(2.75rem, 1.2rem + 6.2vw, 6.5rem) ≈104 px @1440, 46 px @390 | .96 | italic, −.02em |
| H1 H2 hero (on white) | clamp(2.5rem, 1.4rem + 3.4vw, 4.25rem) | 1.04 | italic |
| Section heads ("Where this usually begins.", "Fees", "Start with a private conversation.") | clamp(1.75rem, 1.2rem + 1.6vw, 2.75rem) | 1.1 | italic (O11: small; the images carry the scale) |
| Pinned statement (C6) | clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem) | 1.15 | italic |
| Tier names | clamp(1.5rem, 1.2rem + .9vw, 2rem) | 1.1 | italic |
| Prices | clamp(2.25rem, 1.5rem + 2.2vw, 3.75rem) | 1.0 | **roman**, lining + tabular figures, −.01em |
| Situation titles | clamp(1.25rem, 1.1rem + .5vw, 1.5rem) | 1.2 | roman |
| Body / items | clamp(1.125rem, 1.06rem + .3vw, 1.25rem) | 1.5 | roman; never below 17 px (Bona Nova has a small x-height) |
| Labels ("Start here", "First step", hero promise line) | .875rem | 1.3 | `font-variant-caps: all-small-caps`, +.06em, muted |

- **Italic vs roman.** Italic is the voice: headlines, tier names, situation sub-lines and the wordmark. Roman is the facts: body, items, prices, buttons, labels.
- **Prices.** "₪32,000" is set as one string in one size. The ₪ comes from the Hebrew subset, which needs U+20AA in the unicode-range, and the italic Hebrew file must also be declared. Prices sit on the first baseline of their box and never animate.
- **Labels.** No `smcp` in the subset → uppercase .75rem, +.12em, still Bona Nova.
- **Wordmark.** 2 rem in the header. Over the Primes photo it is #FFFFFF, with 閉ざす at 70% white. It is cropped giant (A9) in the closing ink panel.

## 4. Decisions
**O15**
- A4 dots: keep. Decision: ink dither on stone, mint glow ≤20%, only behind the closing panel's upper edge. Why: allowed loop, and it gives the light ground texture. Risk: text must sit off the densest dots; ink on 12% dot cover stays above 11:1.
- A6 3D mark: strike. Why: a spinning wordmark is a gimmick, and the vertical kanji breaks in 3D. Risk: none.
- A7 odometer: strike for prices. Why: rolling digits say "variable", but the copy says "Each price is fixed". Risk: less motion in the tiers block.
- A8 word reveal: adapt, on the method line only, going #8C8880 → ink, large size. Why: one considered sentence, read slowly. Risk: the mid-state sits at 3.5:1 and is legal only at ≥24 px.
- A9 cropped type: keep, with the wordmark only (exempt from copy freeze). Why: scale without new strings. Risk: unreadable as a word, which is fine because the header carries the name.

**O16**
- P5 drift: keep, at scale 1.06 max. Why: quiet life in the photo. Risk: softness in a 1620 px photo (accepted, D68).
- P6 band: adapt to a mint band, once, H1 only; the buttons are visible from frame 0. Why: carries the accent into motion. Risk: mint over a warm photo can look acidic, so keep it ≤400 ms.
- P7 no bar: adapt. White wordmark and links over the photo, then a white bar with ink text after the hero. Why: legibility after the photo. Risk: links over a bright area need the top gradient (rgba(0,0,0,.35)).

**O17**
- O1, O2, O9, O11: keep.
- O3 square corners: keep, and drop b2's 2 px radius.
- O4 stacked images: strike. Why: it conflicts with the two-hero test.
- O6 cards: adapt without the "(1)." numerals, which would be new strings. Risk: less sense of sequence.
- O7: keep on phone only.
- O8 small and tall pair: keep for hangers (small) and window (tall). Why: both are dark photos, so they balance a light row.

**O18**
- C3 lines draw in: keep, once.
- C7 count-up: strike (same reason as A7).
- R2 small marks: keep. Mint 6 px squares before labels.
- R5 frames: keep, hairline #CFCAC1 with nodes #8C8880.

**O19 (pinned scene)** Decision: fill it with the stairwell (s4), with "Where this usually begins." on a sand plate. Why: its beige grows out of the white without a seam and leads into the situations. Risk: at full screen the figures come close to a "close-up face" (D12/D36), so crop to the upper void.

**O20** Decision: palette as §2. Why: board 2 continuity (mint, D38), AA everywhere, warm stones match the photos. Risk: mint against warm photos, so it is kept to a minimum.

## 5. D70 boxes and R2
- **Situations row:** stone text boxes (25%) alternate with photo boxes, and white gaps are left open. The mint cell (25%, pinned per D71) holds "Or before anything happens. You don't need a known incident to begin." This is the only mint area on the page.
- **Tiers:** depth follows household size: Personal Shield on stone, Personal Shield for Two on sand, Inner Circle on ink (white text, muted-inv "for" line).
- **First step:** "Private Exposure Assessment" sits on white inside a hairline frame.
- **Closing:** an ink panel holds the three buttons in white.
- **R2 marks:** a 6 px mint square sits before the labels "Start here" and "First step". A 1 px mint bar slides in at the top of the tiers block. On light grounds mint is never used for text.

**Page share @1440:**

| Section | Screens |
|---|---|
| Hero | 1.0 |
| Pinned scene | 4.7 |
| Situations | 1.4 |
| Tiers | 1.6 |
| Closing | 0.9 |
| Footer | 0.3 |
| **Total** | **≈9.9** |

**@390:** the pinned scene shortens to about 2.5 screens, the boxes stack full width, and colours stay the same.


## 6. Non-negotiables / concessions
Non-negotiable:
1. AA on every text state, including over photos (gradient ≥.62).
2. Prices are static, roman, lining figures, with no odometer or count-up.
3. Mint is used as one box plus small marks, never as text on a light ground.

I'd concede:
- the exact stone and sand hexes
- ink vs sand for Inner Circle
- the band colour in P6
- the stairwell vs the parlour for O19 (the parlour would need ink text on a plate)
