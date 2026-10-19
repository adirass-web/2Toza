# Round 2 — Art Director

**1. Pinned scene. Changed my mind: I now back motion's version.** The four situation photos run in sequence inside the growing box, so the scene *becomes* the situations section. It goes hangers → window → parlour → stairwell, and ends full bleed on the stairwell's upper void, with "Or before anything happens. You don't need a known incident to begin." centred. It sits straight after the hero, then the tiers follow. Length is 4.0 screens at 1440 (shorter than 4.7: four holds of 0.55 each plus the growth steps) and 3.0 at 390. The first text, "Where this usually begins.", shows at 0%, which meets conversion's "statement by screen 2".
*Against (conversion):* "the situations depend on scrolling". The holds are reading time, the DOM order is the four situations, and reduced motion or no JS gives a static stack, so all four are scannable without swiping.

**2. Hero photos. Conceded to conversion:** H2 uses h-hero-wide, Primes-style uses Tamara.
*Against my own Round 1:* "same photo = fair comparison" no longer holds, because h-hero-wide has left the pin. Each hero now gets the photo that suits its shape: the panorama fits a 1440×450 band, and the portrait-ish Tamara fits a full screen.

**3. CTA persistence. Conceded.**
- At 1440 the header (56 px) has the wordmark on the left. On the right are WhatsApp (filled) · Signal · Call me back (compact, 15 px), then "Menu".
- At 390 there is a fixed bottom bar: three equal 48 px cells, safe-area padding, over a white ground with a 1 px top rule. The hero stack ends 72 px above it.
- Layout cost: the pinned scene's frame must leave 56 px top and 64 px bottom on the phone. I accept that.
*Against:* none. A second tap is a real loss.

**4. A4 dots. Keep, in one 50% cell beside the close, but not as Aspen's square dither.** Use round 2 px #232323 dots on stone #F3F1EC, 14% cover, on a regular 6 px lattice with no hatch, plus a ≤20% mint glow.
*Against "surveillance/binary":* the square diagonal dither is what reads as data. A sparse round lattice reads as linen or paper grain. If it still reads as code in the build, strike it.

**5. A7 odometer. Conceded: strike.** "Each price is fixed" beats motion in the tiers.

**6. P6 band wipe. Keep once, and drawn behind the glyphs** (z-index below the text, like a highlighter), so the headline is readable on every frame. Each line takes 420 ms.
*Against "hides the headline":* with the band under the text, nothing is ever hidden. If the build can't keep it under the text, it moves to "Where this usually begins."

**7. Tiers.**
- Row 1: "Fees" + intro in A–B, sticky. "Start here" as a mint 50% box in C–D (not sticky), with "Private Exposure Assessment" "₪4,000" "Counts in full toward your protection if you continue within 30 days." The mint is now free, since the pin ends on the photo.
- Row 2: A is an empty gap; Personal Shield, Personal Shield for Two and Inner Circle sit in B, C and D on one top edge. They slide **over** the sticky Fees box, so no price is ever covered and all three prices are compared in one view.
- I drop my offsets because they break price comparison.
- Fills: stone / sand / ink (conceded to colour).
- 390: motion's stacked deck (sticky at 64 + i×14 px).

**8. Palette. Conceded to colour:** stone #F3F1EC and sand #E4DFD6 instead of #E0E0E0, because the photos are amber, beige and warm black-and-white.

**9. Situations. My checkerboard is withdrawn for situations**, since they now live in the pin. D70/D71 boxes move to the tiers and the close. In the close: ink 50% panel ("Start with a private conversation." + the three buttons) · dot cell 25% · empty 25%, with the cropped *toza* in the footer. Phone: stacked, no carousel. I agree.

**10. Motion engine. No objection.** The conditions: native sticky for every pin, `motion` vendored at a pinned 12.x release, and the page complete without it.
