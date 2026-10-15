# Phase 3 — Design directions brief

Three competing directions, each built on an established open-source design system (V-013), not from scratch. Each goes on its own branch `design/dir-a|b|c` and deploys to `design-dir-x.toza-v2.pages.dev`. The owner picks one direction.

## Read first
- `strategy/BRIEF.md` (rules R-1, R-2, all decisions) — binding.
- `strategy/2a-message-architecture.md` — the copy source. Use its drafted copy verbatim where drafted; where not drafted, write minimal placeholder copy marked `[draft]`.
- `research/1a-benchmarks.md` (private banks, boutique law) and `research/1d-site-audit.md` (current site problems) — for intent.

## Scope per direction (same three pages)
1. **Home** `/en/` — all 6 blocks from 2a §4: (1) headline "Before private information becomes leverage." + subline + founder portrait + WhatsApp primary, Signal, Call me back; (2) four situation doors + proactive line; (3) Assess → Harden → Verify with real objects; (4) credential line + "Professional profile ↗" + illustrative summary specimen; (5) price block (two prices only); (6) contact block.
2. **Separation & Divorce** `/en/separation-divorce/` — the fully drafted page in 2a §5.
3. **Pricing** `/en/pricing/` — hero + three-column comparison (Assessment, Personal Shield, Inner Circle from ₪42,000) + credit line + contact block. Top of page quality matters most; the rest can be short.

Shared header (logo, Situations, How it works, Pricing, FAQ, primary Message button) and a compact footer (Pricing · FAQ · For attorneys · Conditions · Privacy · Terms). Links to pages not built yet may point to `#`.

## Hard requirements (all directions)
- **Data:** prices only from `src/_data/facts.json` via the `ils` filter; contact links only from `src/_data/contact.json`. `npm run build && npm run check` must pass.
- **First tap opens a channel:** WhatsApp / Signal / Call me back buttons are direct links (`target="_blank" rel="noopener"`). No `#contact` anchors as CTAs.
- **Phone first screen (390×844):** headline, ≤25 words, founder visible, primary button visible without scrolling.
- **R-2:** no boundary or warning sentences outside the FAQ. No press, testimonials, scarcity.
- **Founder:** `assets/img/dr-tabansky-portrait-square-640.webp`, the only photo. Logo: `assets/brand/toza-logo-ink.svg` (and `-reverse` on dark). Do not alter the logo.
- **Real objects without stock photos:** draw the devices, two security keys and the dated record as restrained inline SVG line drawings or simple CSS objects, consistent with the direction's style. No shields, padlocks, hackers, binary, globes.
- **Specimen:** an HTML/CSS document card of the practical summary (2a §6.5) with the visible label "Illustrative example. Your summary reflects your own circumstances."
- **Fonts self-hosted** (copy woff2 from `@fontsource*` packages into `assets/fonts/`); no external requests of any kind. No trackers.
- **RTL-ready:** logical CSS properties (`margin-inline`, `padding-inline-start`, `inset-inline`), no hard-coded left/right; chosen typefaces must have a Hebrew companion.
- **Accessibility:** WCAG AA contrast, ≥16px body, ≥44px tap targets, visible focus, semantic landmarks, one h1 per page.
- **Performance:** total page weight ≤ 400 KB excluding the portrait; CSS built/purged, no unused framework JS.
- `noindex` stays (base layout meta + `_headers`).

## The three directions

| | A — Private bank | B — Boutique law | C — Quiet modern adviser |
|---|---|---|---|
| Foundation | **Tailwind CSS v4 + Flowbite** components (MIT) | **Pico CSS v2 + Open Props** tokens (MIT) | **Tailwind CSS v4 + Basecoat** (shadcn/ui look for plain HTML, MIT) |
| Type | **Frank Ruhl Libre** headlines (serif, has Hebrew) + **Assistant** body (Hebrew) | **Heebo** only (sans, Hebrew), strong weight contrast | **Inter** + **Heebo** for Hebrew later |
| Palette | warm ivory paper, deep ink green/navy, restrained brass accent | near-white, true black text, one muted oxblood accent, hairline rules | neutral greys, crisp white cards, deep teal accent |
| Layout feel | editorial, generous whitespace, large portrait, quiet serif authority | strict Swiss grid, numbered sections, small-caps labels, rules and columns | precise, card-based, subtle borders and shadows, product clarity without "cyber" |
| Reference register (from 1a) | Lombard Odier, Pictet, C. Hoare & Co | Withers, Gavin de Becker | modern premium software / adviser |

## Deliverables per direction
1. Working Eleventy build on the branch (`src/`, `assets/`), checks passing.
2. Screenshots in `design/screenshots/dir-x/`: each page at 1440×900 (fold + full) and 390×844 (fold + full).
3. `design/dir-x.md` (≤400 words): foundation and what was taken from it, tokens (colours, type scale, spacing), component list, page weights, known gaps.
