# Round 2 — Motion designer

**1. Pinned scene**
- **Position:** I've changed my mind. One photo, **h-hero-wide** (hand placing the phone), as the art director proposed. It runs between the situations and the tiers.
  - The situations now have their own boxes (point 9), so four photos in the pin would show every situation twice.
  - The art director's rule of one photo per role then rules out s2 and s4 too.
  - The wide panorama is the image that gains most as the clip widens column by column.
- **Length:** the owner adopted ~4.7 screens, so I keep it, but with conversion's condition: text on screen at every hold.
  - Screens 0–0.6: the frame draws in, with the method line (A8) in cols C–D.
  - By screen 1.6: the box opens in B with "Where this usually begins." still visible.
  - By screen 3.4 at the latest: "In person · With you present · You control your credentials" over the photo at full bleed.
  - **Phone:** 2.5 screens, text above the box.
- **Answer to conversion ("4.7 screens without text tires"):** the tiring part is the empty scroll, not the length. Here no hold is without text, and the full-bleed statement lands by screen 3.4. If the owner accepts shorter, I'll compress to 3.5 with the same keyframes.
- **Answer to the softness objection (922 px source):** clip-path plus a counter-scale ending at 1.00 never upsamples the image beyond its cover size. The softness at full bleed is the same as any full-bleed use, which D68 accepts.

**2. Hero photos.** **Tamara in both** (art director).
- **Answer to conversion:** a side-by-side test is only valid if one variable changes. Different photos would test the photos, not the layouts. h-hero-wide still gets its full-screen moment in the pin.

**3. CTA persistence.** I've changed my mind: **conversion is right.**
- **1440:** after the hero, the sticky header carries WhatsApp / Signal / Call me back compactly; "Menu" stays.
- **390:** a fixed bottom bar with the three buttons, painted from load. It never hides on scroll, never animates in, and sits on the top z-layer.
- **Answer to the art director:** "Message" is a second tap, and the brief says first tap. The bar uses no motion, so it costs the design nothing.

**4. A4 dots.** **Keep, adapted:**
- round 1.5 px dots, sparse and evenly spaced, in #8C8880 on stone (not black squares in a diagonal dither);
- only the mint glow drifts;
- one 50% box in the close.
- **Answer to conversion ("surveillance/binary"):** that reading comes from the dense square dither, which this adaptation removes. Conversion already conceded "one still dot field in a gap cell". This is that field plus a glow.

**5. A7 odometer.** **Strike** (unchanged).
- **Answer to the art director:** "Each price is fixed and agreed in writing before work begins." A rolling digit says the opposite, and an aria-label doesn't fix the visual message.

**6. P6 band wipe.** I've changed my mind: **strike it on the hero H1, run it once on "Where this usually begins."** (conversion's offer).
- **Answer to the art director and colour:** no masking method keeps the hero H1 fully visible while a band passes over it, and it is the line she reads first. On the section title the same mint band costs nothing.
- The hero still has P5 drift (scale 1.06 → 1.00) as its motion.

**7. Tiers block.** I've changed my mind: **no pinning inside the tiers.**
- D71 is met by the situation labels (point 9) and the pin.
- "Start here" stays as a full-width band before the tiers: static, never sticky, never covering a price.
- **Phone:** I drop my stacked-deck idea. The 14 px offsets would cover prices. Tiers are a plain stack.
- Tier entry is M1 only (clip `inset(0 1.5%)` → `inset(0)`, 600 ms), and prices are visible from the first frame of the clip.
- **Fills:** colour's stone/sand/ink, with the art director's +0.2/+0.4 vh offsets (static, no motion cost).
- **Answer to my Round 1 self:** pinning "Fees" helped composition, not comparison. Conversion is right that prices must be read side by side, unmoving.

**8. Palette extras.** **Warm stone #F3F1EC / sand #E4DFD6** (colour).
- **Answer to the art director:** cool #E0E0E0 next to the amber photos looks like a placeholder. The dot field also reads softer on stone.

**9. Situations.** **No objection:** a 4-column checkerboard with sticky labels. This becomes the main D71 move.
- Sticky `top` = header height + 24 px.
- The ink box in column A releases when the mint cell arrives.
- **Phone:** a stacked list, no carousel. The sticky text box sits under the header and clears the bottom bar (`bottom` safe area + bar height).

**10. Engine.** **Vendored `motion` vanilla** (`scroll` / `animate` / `inView`), one pinned 12.x release. Native sticky does the pinning; no Lenis, no snap.
- **Anticipated objection ("CSS scroll-driven animations alone"):** Firefox still lacks them by default. `scroll()` uses native ScrollTimeline where it exists and falls back to JS elsewhere, in one code path.
- Without JS or with reduced motion: a static, complete page.
