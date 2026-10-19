# Round 1 — Art Director

## 1. Concept
A white page ruled like a tailor's cutting table: a fine grid, a few boxes laid on it with deliberate empty cells, and one photograph slowly let out to full size.

## 2. Page order and screen share
Grid: 12 col, 10 px gap, 20 px margin. Boxes are 3 col (25%) or 6 col (50%). Phone: 4 col.

| Section | 1440 vh | 390 |
|---|---|---|
| Hero Primes-style | 1.00 | 100svh, text and buttons at the bottom |
| Hero H2 | 1.00 (photo 0.50) | photo 300 px, buttons above the fold |
| Situations | 3.00 | 1 col, text box sticky, photo slides under it |
| Pinned scene | 4.70 | 3.20, 4-col frame |
| Tiers | 1.50 | stacked, each sticky (+12 px) |
| Close + footer | 1.10 | 1.00, buttons full width |

Total ≈ 11.3 screens. After the hero, a white sticky header (56 px, 1 px #D0D0D0 rule) holds the wordmark, "Message" and "Menu", and stays above the pin layer.

## 3. Decisions
**O15**
- A4 dots: **adapt**. Only in one 50% box in the close, #232323 squares on #E0E0E0. Why: the one loop D56 allows near the CTA. Risk: GPU cost → static on reduced motion.
- A6 3D mark: **strike**. Why: it reads as a gadget and the vertical 閉ざす can't be read. Risk: none.
- A7 odometer: **adapt**. ₪32,000 / ₪45,000 / ₪70,000 roll once. Why: the only numbers that matter. Risk: screen readers → aria-label on the whole price.
- A8 word reveal: **adapt**. Method line only, starting from #8A8A8A. Why: it slows reading where we want it slow. Risk: low contrast mid-reveal.
- A9 cropped type: **adapt**. A 360 px *toza* cropped by the footer edge (the wordmark is exempt from D58). Risk: logo-wall feel → used once only.

**O16**
- P5: **keep**. Scale 1.08 → 1.0, ≤ 45 px. Why: depth without video. Risk: softness (D68, accepted).
- P6: **adapt**. Mint band, H1 lines only, once, 700 ms; the text is never hidden. Risk: the headline feels delayed.
- P7: **adapt**. No bar over the hero, white sticky bar after it. Risk: none, since "Message" persists.

**O17**
- O1, O2 (text from col 3, 24 px inset inside boxes), O3 (radius 0, buttons included): **keep**.
- O4: **strike**. Why: the pin already gives a full-screen moment. Risk: none.
- O6: **adapt**. The situations become boxes, with no "(1)." (not in the deck) and no carousel (it hides three of the four). Risk: a longer page.
- O7: **adapt**, close only. O8: **keep** (parlour 25% plus stairwell 50%). O9: **keep**, as the pin's end state.
- O11: **keep**. H1 64/76 px, titles 32 px, items 18 px; images carry the scale. Risk: it looks quiet next to Primes, which is intended.

**O18**
- C3: **keep** (scaleX/Y, 600 ms).
- C7: **strike** (there are no metrics in the deck).
- R2: **keep** (mint only as a 6 px square, the band and one box).
- R5: **keep** (1 px #D0D0D0 lines, 5 px #232323 nodes), in the pin and tiers only.

**O19: h-hero-wide (the hand placing the phone).** Why: it is the in-person moment, and the panorama improves as the box widens. Risk: the source is only 922 px tall → softness at full bleed (D68).

**O20: Aspen base.** Ground #FFFFFF, ink #232323 (15.6:1), secondary #5E5E5E (6.5:1), box grey #E0E0E0 (ink on it 12.0:1). Mint #A1FFCB is used as a box fill only (ink on it 13.2:1), never as text (1.2:1). Why: board 2 already uses it and the owner approved it. Risk: clinical feel → the photos bring the warmth.

## 4. Heroes: the Tamara photo for both
Using the same photo makes the owner judge composition, not photos. h-hero-wide moves to the pin.
- **Primes-style:** cover, object-position 50% 22%; gradient rgba(20,20,20,.72) → 0 at 55%. The H1 is 76 px/0.98, white, in two lines, x 64, baseline 72 px above the bottom. Cols 10–12 hold the lead, WhatsApp (white fill), Signal and Call me back, bottom-aligned to the H1. The proof line sits under the H1 at 14 px. Phone: position 28% 50%, H1 40 px.
- **H2:** a 1440×450 band from source y 330–960 (earring, hands, blurred phone, glass; face cropped out). The H1 is 64 px from col 3 at y 498; the lead and buttons sit in cols 10–12, top-aligned to it. Phone: a 300 px band around the phone, H1 36 px.

## 5. Boxes (D70/D71) and the pin (D72)
**Situations (cols A–D, 25% each)**
- A: ink box "Where this usually begins.", sticky for the whole section.
- Row 1: hangers 50% in B–C; a #E0E0E0 text box "Separation or divorce / What still connects your digital lives." in D, sticky.
- Row 2: "Business or founder dispute" in B, sticky; window 50% in C–D.
- Row 3: parlour 25% in B; C empty; "Inheritance conflict" in D, sticky.
- Row 4: "Someone knows something" in B, sticky; stairwell 50% in C–D.
- End: mint 50% in C–D, "Or before anything happens. You don't need a known incident to begin."; A releases here.

Each photo slides past its pinned label, and every row keeps at least one empty cell.

**Tiers**
- A, sticky: mint square, "Fees" and the intro line.
- B (grey), C (white with frame, +0.2 vh) and D (ink, +0.4 vh) hold the three tiers.
- Below them: "The first step is included. If you authorize it, Toza coordinates with your lawyer or family office." and "All protection tiers →".

**Pin (4,230 px of scroll)**
1. 0–0.6: the frame draws in (verticals at 25/50/75%, nodes at the crossings), and the method line reveals word by word in C–D.
2. 0.6–1.6: a box opens in B, clipping from the centre while the image scales 1.23 → 1.
3. 1.6–3.4: the clip widens B → B–C → A–D → full bleed, and the text fades out.
4. 3.4–4.2: "In person · With you present · You control your credentials" at 33 px, white, over a 40% scrim.
5. 4.2–4.7: release.

Only clip/transform/opacity are animated. Reduced motion: a static photo with both lines and no pin.

## 6. Non-negotiables
1. WhatsApp / Signal / Call me back above the fold in both heroes at 390, and "Message" visible on every screen, including the pin.
2. One photo per role, no repeats.
3. Real empty cells, and mint fills exactly one box.

**Concede:** pin length (down to 3.5), odometer, dots, band wipe, the O7 split, the tier offsets.
