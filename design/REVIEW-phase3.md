# Phase 3 review: three design directions

Independent review, 15 Oct 2026. Basis: all 36 screenshots, each built `_site/`, and my own Playwright run at 390×844 (fold, tap targets, contrast of every text node against its real background, overflow, transfer size, CSS properties). Copy taken as given (R-1); no worktree edited.

## Scorecard (1–5)

| Criterion | A Private bank | B Boutique law | C Quiet modern adviser |
|---|---|---|---|
| 1. "Quiet private adviser" register, 5-second trust | **5** | 3 | 3 |
| 2. Hierarchy and restraint | **4** | 3 | 4 |
| 3. Phone first screen | 4 | 4 | 4 |
| 4. Real objects and specimen | 4 | 4 | 4 |
| 5. Price presentation | **5** | 4 | 3 |
| 6. Brief compliance | 4 | 4 | 3 |
| 7. Accessibility and performance | 4 | **5** | 3 |
| 8. Hebrew/RTL readiness | **5** | 4 | 3 |
| 9. Craft (fewer defects scores higher) | **4** | 3 | 3 |
| **Total (of 45)** | **39** | 34 | 30 |

## Measurements (phone 390×844)

| | A | B | C |
|---|---|---|---|
| Fold: H1, subline (25 words), portrait, WhatsApp | all visible; WA bottom 564px | all visible; WA 535px | all visible; WA 553px |
| Phone portrait size (2a asks ≥96px) | 84px | 84px | 96px |
| Home length | **7.3 screens** (budget 6) | 6.4 | 6.1 |
| Body text / primary CTA contrast | 13.8:1 / 12.7:1 | 20.1:1 / 20.1:1 | 7.1:1 / 7.8:1 |
| Text nodes below AA | 0 | 0 | 0 |
| Targets under 44px | inline text links 23px tall (How it works, Professional profile, About, Prices and conditions) | "Prices and conditions" 24px | logo 36px tall |
| Horizontal overflow | 0 | 0 | 0 |
| Transfer, portrait excluded | 96–107 KB | 105–116 KB | 190–196 KB |
| External requests | none | none | none |
| WA/Signal links `_blank` + `noopener` | all | all | all |
| Physical CSS left/right (mostly framework leftovers) | 11 | 20 (Pico nav and forms) | 9 |

All three keep one h1 per page, proper landmarks, visible focus (A switches its focus ring to light brass on the dark bands), and `#` only on links to pages not built yet. No direction shows press, testimonials or scarcity. No boundary sentence appears outside the FAQ.

## Direction A: Private bank

**Strengths**
- The register is right. Warm ivory, Frank Ruhl Libre at 80px, the portrait framed with an offset hairline, and ink-green bands read as a private bank or family office, not a cyber vendor (`home-d-fold.png`). Of the three, this is the one a divorcing executive would trust in five seconds.
- One statement per screen. Each band carries one heading and one idea; the situation doors are quiet index rows with brass arrows, not cards (`home-d-full.png`).
- The best price presentation. ₪3,600 and ₪14,000 sit at 60px in the serif with "including VAT" small beside them, ruled lists below, and a calm credit line (`home-d-full.png`, `pricing-d-full.png`). Prices feel published, not sold.
- The line objects on the dark band are restrained and fit the style, with brass detail on the dated record folder.
- Hebrew is ready. Frank Ruhl Libre and Assistant are both native Israeli typefaces with Hebrew subsets already shipped, and the CSS uses logical properties.
- Lightest of the three (about 100 KB).

**Defects**
- The phone Home runs to 7.3 screens. The three-stage band stacks tall drawings (`home-m-full.png`).
- The phone portrait is 84px; 2a §4 asks for at least 96px.
- On desktop Pricing the price baselines do not line up: "Private Exposure Assessment" wraps to two lines and pushes ₪3,600 about 36px below the other two prices (`pricing-d-fold.png`).
- The specimen is mostly grey placeholder bars, so it says "document" without showing what a client gets (`home-d-full.png`).
- The dated record carries no visible date.
- Inline text links have a 23px hit area.

## Direction B: Boutique law

**Strengths**
- Strict and confident: a 12-column grid, numbered sections, oxblood small-caps labels and black rules (`home-d-full.png`). It reads as serious and very legible.
- The strongest accessibility numbers (20:1) and very few undersized targets.
- The best object drawings. The dated record shows "15 Oct 2026", which makes "dated" real, and the keys are drawn as actual keys (`home-d-full.png`).
- The specimen content is concrete: "Agree the sequence for the shared cloud", "Move the recovery number".

**Defects**
- Heebo 800 with tight tracking shouts. At 84px the hero reads as a Swiss agency or tech launch, not a quiet adviser (`home-d-fold.png`, `pricing-d-fold.png`). This is the opposite of "confidence through restraint".
- The specimen's solid black redaction bars look like a forensic dossier and pull toward the fear register.
- The phone H1 wraps in a narrow column ("becomes / leverage.") and leaves about 40% of the width empty (`home-m-fold.png`).
- On the desktop Separation hero there is a large unexplained gap between the subline and the buttons (`sep-d-fold.png`).
- The phone Pricing contact block has a WhatsApp button that is not full width, unlike every other block (`pricing-m-full.png`).
- Pico leaves the most physical left/right rules behind.

## Direction C: Quiet modern adviser

**Strengths**
- Clean and precise, with the clearest product logic.
- The phone portrait meets the 96px minimum.
- The specimen has the best content: "Shared family album, kept by choice" quietly expresses choice and control (`home-d-full.png`).
- The check mark on the record drawing reads "verified" at a glance.

**Defects**
- The register is software. Rounded 12px cards, soft shadows, a teal pill button and shadcn spacing read as a SaaS pricing page, especially on Pricing, which has three WhatsApp buttons inside cards (`pricing-d-full.png`). The brief explicitly rejects the cyber-vendor feel, and this sits close to it.
- Prices are small (36px), sit beside a second figure ("₪10,400 after the Assessment credit") and compete with bullets (`pricing-d-fold.png`). Home prices are compressed into one dotted line each (`home-d-full.png`).
- The desktop Separation hero swaps the large portrait for a card, "What a first visit looks at", which is not in 2a §5 and is not marked `[draft]` (`separation-divorce-d-fold.png`).
- The secondary buttons are ragged on phone: Signal and Call me back are content-width rather than an even pair (`home-m-fold.png`). In the desktop contact card, Call me back wraps to a second row (`home-d-full.png`).
- At about 196 KB per page it is twice the weight of A and B, because Inter latin-ext loads for the ₪ sign.
- Inter for Latin with Heebo for Hebrew is a mismatched pair, so the Hebrew site will look like a different brand.

## Recommendation

**Build on Direction A (Private bank). Borrow three elements:**
1. **From B:** a visible date on the dated record cover.
2. **From C:** the specimen content (readable neutral entries such as "Recovery email updated", "Old tablet signed out", "Shared family album, kept by choice", ordered next steps), in place of most of A's placeholder bars. Keep one redacted line, for "Your circumstances".
3. **From C:** the phone portrait at 96px or larger.

A is the only direction whose visual language does what the brief asks: restraint, the founder as the brand, and calm prices. It also has the best Hebrew path. B pulls toward loud, C toward software.

## Fix list for A before the owner sees it (priority order)

1. **Cut the phone Home to 6 screens or fewer.** On phone, show the three stages as compact rows (object about 72px at the inline start, text beside it) and reduce section padding from 4.5rem to about 3.5rem. Re-measure.
2. **Phone portrait at 96px or larger** on Home and Separation, and recheck that the WhatsApp button stays above the fold (it currently ends at 564px, so there is room).
3. **Align the Pricing columns on desktop:** use subgrid or a fixed title-block height so that ₪3,600, ₪14,000 and ₪42,000 share one baseline.
4. **Fill the specimen** with readable neutral entries (C's content, item 2 above). The visible label stays unchanged.
5. **Put a date on the dated record drawing** (B's treatment), using brass for the date on the dark band.
6. **Give inline text links a hit area of 44px or more** (How it works, Professional profile, About Dr. Tabansky, Prices and conditions, Questions about…) with padding-block, keeping the visual unchanged.
7. **Run an RTL smoke test:** a `dir="rtl"` build with one Hebrew paragraph. Remove or override the Flowbite physical-property leftovers (`padding-left/right`, `left:50%`) and check the sticky header, the portrait frame offset and the door arrows (they must flip).
8. **Flag the `[draft]` copy visibly for the owner:** the Pricing hero "Prices, published.", the column taglines, "Two prices, both including VAT." and "Larger or different needs are quoted individually." The owner should approve them knowingly, not by default.
9. **Check the portrait tone:** confirm the sepia filter does not muddy the photo on low-end Android screens. If it does, ship plain black and white.
10. **Stage-object consistency:** use one stroke weight across the three drawings.
