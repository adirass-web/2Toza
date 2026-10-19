# Study G (light) — independent review

Evidence: /home/claude/build/review/ (rv.json, bg-*.png, sits-head-1440.png, reduced-*/nojs-*.png) + /home/claude/build/s3/*.png. `npm run check`: pass (copy parity). No console errors. No horizontal overflow at 390/1024/1440/1920, on either page.

## Defects (ranked)

1. **BLOCKER: the situations heading shows twice with JS on.** css/study-g.css:150 `.pin-on .sits .head{display:none}` never matches, because JS puts `.pin-on` on `.sits` itself. Result: the static H2 "Where this usually begins." sits above the stage and the stage title repeats it, with about 140 px of dead space between them (sits-head-1440.png; same on phone). Fix: change the selector to `.sits.pin-on .head`.
2. **MAJOR: with JS on, screen readers get none of the situations.** `.sit-list` is `display:none` and `.stage` plus every `.cap` is `aria-hidden`. In the accessibility tree the section is just the H2: 4 situation titles, 4 lines and the "Or before anything happens" text are missing. Fix: keep `.sit-list` in the accessibility tree and hide it only visually (a `.visually-hidden` clip), or drop `aria-hidden` from `.cap` and `.closing`.
3. **MAJOR: the header collides with the hero text at 1440 (Primes).** `.over` (transparent) stays on until the hero's bottom edge passes the header. While the H1, lead, CTAs and promise scroll up under it, the header links print over them ("WhatsApp/Signal/Call me back" twice, overlapping; sits-head-1440.png). D81 needs the channel to stay legible. Fix: switch to white once `scrollY > 0` (or once the hero text box reaches the header), or give `.over` a dark gradient and fade out `.hero-primes .text` before it reaches the header.
4. **MAJOR: the open menu covers the contact links** (D81: "Header and bar sit above every pin and sticky box"). `.menu` z-index 60 > `.top` 50: with the menu open, an elementFromPoint test on the header WhatsApp link returns the menu. Escape does not close it, and focus is not moved or trapped. Fix: start `.menu` below the header (`inset-block-start:var(--header)`) or raise `.top` above it, add Escape-to-close and focus handling, and add `aria-modal`.
5. **MAJOR: the Primes H1 is undersized** against D79 (≈104 px). Measured 85 px at 1440 and 88 px at 1920 (`--t-h1-primes` max 5.5rem). Fix: `clamp(2.75rem, 1rem + 6.2vw, 6.5rem)` gives ≈104 px at 1440.
6. **MAJOR: the Primes phone crop shows a close-up profile face** (primes-390-0fold.png: cheek, ear and jaw fill the top half). This breaks the brief's photography rule. Fix: set object-position so the crop falls on shoulder, hands and phone (as in the H2 band), or use a different phone crop file.
7. **MAJOR: text below the D85 floor of 17 px for body.** Fee notes are 15.2 px (`.notes` .95rem), the H2-page promise line is 14 px (`.promise` .875rem), and header channel links and footer links are 16 px. Fix: set `.notes` and `.promise` to `var(--t-body)`; set `.top .ch` and `.foot ul` to 1.0625rem.
8. **MINOR: small tap targets on touch widths.** Header links are 29 px tall at 1024. Ghost buttons ("Signal", "Call me back") are 31 px tall at every width, including the 390 close panel. Fix: `min-block-size:44px` and inline-flex centring on `.top .ch` and `.btn.ghost`.
9. **MINOR: stage overlaps.** The progress ticks print over the mint plate's text at 1440 pin5 ("incident") and over the stairwell photo at 390. The hairline at y=18% crosses "begins." in the stage title (pin0 and pin2). Fix: fade `.progress` with `w[4]`, and place the title fully above `hy[0]`, or move `hy[0]` below the title.
10. **MINOR: frame lines draw across the photos.** `.frame` (z 3) is above `.layer` (z 1), so white or grey hairlines cut through the window and parlour images. Fix: put `.frame` below the layers, or clip the lines out of the photo box.
11. **MINOR: D82 deviations.** There is an extra "PRICING" label above "Fees" that D82 does not list. The tiers' bottom edges are ragged (heights 561/476/501 at 1440) because of `align-items:start`. Fix: remove the label, and stretch the tiers in row 2.
12. **MINOR: A4 dots blank under reduced motion and without JS** (0 pixels drawn). D87 says "frozen", not empty. Fix: draw one static frame before the `reduced` return, plus a CSS radial-dot background as the no-JS fallback.
13. **MINOR: RTL leaks.** Physical values remain: `transform-origin:left` (.mark, .frame .h, JS keyframes), `padding:1.5rem 1.5rem 1.5rem 0` (.fees-intro), `margin:-3px 0 0 -3px` (.frame .n), and a physical X translate in the JS stage. Fix: use `padding-inline-end:0`, `margin-inline-start` and `margin-block-start`, and an origin and sign of x that depend on direction.
14. **MINOR: link targets and labels.** The menu points "How it works" to #pricing and "FAQ" to #contact. Both the bottom bar `nav` and `<footer>` are labelled "Footer". Fix: label the bar "Contact".

## Matches the decisions

- Page order (D77) is as specified. Phone pin is 300vh (≤3 screens). Fees starts at about screen 6 at 1440 (total about 7.9 screens).
- The D78 scene runs hangers 25% → window 50% → parlour 75% and taller → stairwell full bleed, with the mint closing plate. It animates clip-path, transform and opacity only, and shows each photo once.
- D81: the phone bar is fixed from load, z 55, 130×63 targets, never animated, and nothing covered it in a scroll sweep at 390. The 1440 header is never covered by the pin.
- D84 palette is exact. Contrast checks: muted on sand 5.19, muted-inv on ink 7.61. Hero text over the photo is ≥4.75 at the 95th-percentile background, so it passes everywhere.
- D85 and D83: Bona Nova only. Prices are roman with lining and tabular figures, as static "₪32,000" strings. ₪ comes from the Hebrew subset.
- D82 colours: stone/sand/stone with a single mint box, nothing marked recommended. The phone layout is a plain stack.
- D90: under reduced motion and with no JS, the page is complete and static (situation list, tiers at opacity 1). Motion is vendored and deferred, and pinning uses native sticky.
- D88: none of the struck items are present. D89: the giant cropped wordmark is in place. D91: the review page has both heroes in iframes. Copy check passes.

---
## Fixes applied after this review (19 Oct, Claude)
- Blocker 1: selector fixed (`.sits.pin-on .head`); heading appears once.
- Major 2: static situations list kept for screen readers (visually hidden, not `display:none`).
- Major 3: header turns white as soon as the page scrolls; no overlap with hero text.
- Major 4: menu opens below the header (contact links stay visible), Escape closes it, focus moves in and back.
- Major 5: Primes H1 now ~99 px at 1440, 104 px at 1920 (fits two lines in 9 columns).
- Major 6: phone crop of the Primes hero re-cut to hands, phone and glass; no face.
- Major 7: notes, promise line, header and footer links now 17 px.
- Minor: 44–48 px tap targets for header, footer and text buttons; progress ticks fade with the closing plate; frame lines sit behind the photos; extra "Pricing" label removed (mint square now precedes "Fees"); tier boxes equal height; dot field has a static CSS fallback (no JS / reduced motion); band origin flips for RTL; menu/footer placeholder links set to "#"; bottom bar labelled "Message".
- Not changed: remaining left/right in JS translate (positional maths, not layout direction) — to revisit at the Hebrew stage.
