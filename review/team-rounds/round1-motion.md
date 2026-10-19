# Round 1 — Motion designer

**Engine:** the free `motion` package (MIT, one pinned 12.x release, vendored, not loaded from a CDN at runtime), using vanilla `scroll()`, `animate()` and `inView()`. All pinning is native CSS `position: sticky`. **Why:** D50 names Motion's JS scroll functions. `scroll()` runs on the browser's native ScrollTimeline where it exists (off the main thread) and falls back to JS where it doesn't (Firefox), so we don't need two code paths. No smooth-scroll library (Lenis is struck): native scrolling keeps iOS, keyboard and assistive tech intact. Every effect is added only when `html.js` is present **and** `prefers-reduced-motion: no-preference`. Without either, the page is static and complete.

Tokens: `--ease-out: cubic-bezier(.22,1,.36,1)` · `--ease-io: cubic-bezier(.65,0,.35,1)` · durations 420 / 600 / 900 ms.

## 1. Concept
The page closes like a well-made drawer: hairlines settle, one image opens along the grid, and the boxes slide past and stay put. Every movement is slow, exact and finishes. Nothing loops except the dots.

## 2. Motion list (page order)

| # | Name | Trigger | What moves | Timing | Reduced motion | D56 |
|---|---|---|---|---|---|---|
| 1 | Header state | scroll past the hero | header background layer: opacity 0→1 (Primes hero) | 300 ms ease-out | instant | "Message" is always visible ✓ |
| 2 | Headline band wipe (P6) | `fonts.ready` (600 ms cap) + 150 ms | mint band per line, scaleX 0→1, then off; text clip `inset(0 100% 0 0)`→`inset(0)` at the band's peak | 420 + 420 ms per line, 90 ms stagger, ease-io; about 1.1 s in all | text shown, no band | buttons are never animated ✓ |
| 3 | Hero drift (P5) | scroll, hero 0→100% out | photo 110% tall: translateY 0→−5%, scale 1.06→1.00 | scrubbed | static | ✓ |
| 4 | Hairlines draw (C3/R5) | inView 20% | rules scaleX/scaleY 0→1 from the inline-start | 900 ms ease-out, once | drawn | ✓ |
| 5 | Pinned scene (D72) | scroll | see §4 | 4.7 screens | static stack | clip/transform only ✓ |
| 6 | Word reveal (A8, adapted) | scroll | "Hardening is Toza's own method, developed from public guidance of government security agencies and security vendors." words: opacity .3→1 | finished when the line reaches 55% of the viewport | full ink | not CTA copy ✓ |
| 7 | Sticky boxes (D71) | scroll | see §4 | native sticky | boxes stay in normal flow | position, not animation ✓ |
| 8 | Box enter (M1) | inView 15% | tier boxes: clip `inset(0 1.5%)`→`inset(0)`, contents translateY 16→0 + opacity | 600 ms ease-out, 80 ms stagger | static | prices are never hidden past the first view ✓ |
| 9 | Cropped wordmark (A9) | scroll through the close | giant *toza* translateX −4%→0, clipped by its box | scrubbed | static | ✓ |
| 10 | Ambient dots (A4) | in view + tab visible | canvas: static diagonal dither; mint radial glow drifts (24 s Lissajous), 30 fps cap, DPR ≤2 | loop, paused when off screen | one frozen frame | the allowed loop; sits beside the CTA, not behind it ✓ |

## 3. Decisions

**O15**
- A4 **Adapt:** one canvas, only in the closing contact box. It is the one loop allowed. Risk: battery drain if the pause-when-off-screen check is skipped.
- A6 **Strike:** a turning mark is a gimmick, and our mark is type, not a logo. Risk: none.
- A7 **Strike:** rolling digits make a fixed price read like a slot machine, which contradicts "Each price is fixed and agreed in writing before work begins." Prices are static. Risk: less motion in Pricing (Pricing gets #8 instead).
- A8 **Adapt:** the method line only, once. Risk: readers in a hurry see grey text, so it must finish by 55%.
- A9 **Adapt:** the *toza* wordmark only (exempt under D58). Risk: the crop can read as a rendering error if under 15% of it is cut.

**O16**
- P5 **Keep:** values in §5. Risk: softness on large screens (D68), so scale stays at 1.06 or below.
- P6 **Keep:** mint band, both heroes. Risk: hurts LCP if fonts stall, so the 600 ms cap is mandatory.
- P7 **Keep:** wordmark plus "Menu" and "Message" over the photo; a white layer fades in after the hero. Risk: contrast on bright parts of the photo, so a top gradient of 0→25% black.

**O17** Keep O1, O2, O3, O9, O11. **Strike O4**, because the pinned scene is the set piece and a 2 vh hero pushes the situations down. **O6 adapt**: card structure only. "(1)." and "2 : 4" are not in the copy deck. O7 and O8 are for the art director; neutral from motion. Risk: losing O4 loses the Odyssée feel.

**O18** Keep C3 (draws once), R2 (mint only as small marks and the band), R5 (the scene frame). **Strike C7**, same reason as A7. Risk: none.

**O19** **The four situation photos**, cross-fading inside the growing box. It ends full-bleed on the stairwell. Why: the scene *becomes* the situations section, and the stairwell's verticals rhyme with the grid. The hero photo would repeat itself, and the tier block can't grow without reflowing text. Risk: the situations depend on scrolling, but the DOM order and the reduced-motion/no-JS stack keep them fully readable.

**O20** Aspen base: white #FFFFFF / ink #232323 (15.4:1) / mint #A1FFCB used as a fill only (ink on mint is 13.2:1; mint on white is about 1.2:1, so never mint text). Risk: mint drifting toward "tech". The colour designer owns this.

## 4. Choreography

**D72 pinned scene (the situations).** The section is 470svh tall, with a sticky inner of 100svh, giving 370svh of scrubbed travel. The image layer is always full-viewport. "Growth" is `clip-path: inset()` snapping to grid nodes, and the image counter-scales 1.23→1.00 (M1). The holds (plateaus) are where reading happens.

| Progress | Frame / box (1440, 12 cols) | Text (cols 3–6) |
|---|---|---|
| 0–8% | hairlines draw; box closed at a node | "Where this usually begins." |
| 8–14% | box opens from its centre to cols 9–10 (about 225 px, 4:5); s1 | "Separation or divorce" + line |
| 14–28% | hold | — |
| 28–34% | grows to cols 8–11; s2 cross-fades in | "Business or founder dispute" + line |
| 34–48% | hold | |
| 48–54% | grows to cols 7–12; s3 | "Inheritance conflict" + line |
| 54–68% | hold | |
| 68–74% | grows to cols 5–12, full frame height; s4 | "Someone knows something" + line |
| 74–84% | hold | |
| 84–92% | grows to `inset(0)`, full bleed; hairlines go white at 40% | text out |
| 92–100% | bottom scrim fades in | "Or before anything happens. You don't need a known incident to begin." centred |

Text swaps use opacity plus a 12 px translateY over a 2% window. The header stays above the scene (z-index).

**390:** the scene is 420svh. Text sits in the top 40%; the box is in the lower part on a 4-column frame, growing 50%→75%→100% width→full bleed (three steps; s1+s2 share the first box). Use `svh` so the URL bar can't make it jump.

**D71 sticky boxes (pricing → close), 1440, 4 columns:** a 50% box with "Fees" and the intro sticks at `top: header`. Below it, the mint 25% "Start here" box sticks at `top: header + 50svh`. On the opposite side, Personal Shield (25%), Personal Shield for Two (25%) and Inner Circle (50%, ink) scroll past in a checkerboard with gaps, all three seen side by side. Then the close slides **over** the sticky boxes (it has a higher z-index). **390:** the tiers become a stacked deck: each one is sticky at `top: 64px + i×14px`, so the edge of the previous tier's name stays visible. The Fees box is not sticky.

## 5. Primes hero
P5 **keep**: the image is 110% tall at −5% top, translateY 0→−5% and scale 1.06→1.00 over the hero's exit. On phone, half the travel. P6 **keep**: values in row #2, mint #A1FFCB, two lines. It plays once per session (sessionStorage).

## 6. Non-negotiables and what I'd concede
1. WhatsApp / Signal / Call me back and the header "Message" are painted on the first frame, never animated, and never covered by the scene or a band.
2. Every motion is progressive: no JS or reduced motion means a static, complete page. Only transform, opacity and clip; no scroll hijacking.
3. The pinned scene has **holds** aligned to grid nodes, not a continuous scrub. Reading time is designed in.

**I'd concede:** A8 and A9 entirely; where the dots go; the band colour; scene length at 390 (down to 3.5 screens); one photo instead of four in the scene.
