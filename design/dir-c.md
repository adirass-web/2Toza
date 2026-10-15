# Direction C: Quiet modern adviser

**Foundation.** Tailwind CSS v4 (CLI) plus Basecoat (`basecoat-css`, Vega style). From Basecoat: its shadcn token variables (remapped to our palette), base layer, and the Button, Card, Badge and Accordion component CSS only. `scripts/trim-basecoat.py` generates `styles/basecoat-subset.css`, so unused components never ship. No Basecoat JS; the mobile menu is a `<details>`. `npm run build` = Tailwind build to `assets/css/main.css` (gitignored), then Eleventy.

**Tokens.**
- Colour: page #f5f6f7, cards #ffffff, ink #14191c, muted text #4f5a61, border #dfe3e6, deep teal #0b5c5c (hover #0a4747), teal wash #e8f1f1. Light only.
- Type: Inter variable (Latin) with Heebo 400/600 declared for Hebrew (fetched only when Hebrew text appears). H1 34 to 56px/600, tracking -0.022em; H2 26 to 36px; body 17px/1.6.
- Spacing and shape: 16/32px gutters, 56/88px section padding, 72rem max width, 12px radius, one soft card shadow, hairline borders.

**Components.** Sticky header with `<details>` menu; hero with founder figure (row on phone, large card on desktop); contact buttons (WhatsApp primary, Signal, Call me back, 46px tall); situation door list (one bordered panel, rows are links); three-stage cards with inline SVG line objects (phone, laptop and summary sheet; two security keys; dated record with check); HTML specimen document with the required illustrative label; price cards (Basecoat card); credential line; contact block; footer. Logical properties throughout.

**Pages.** `/en/` (six blocks), `/en/separation-divorce/` (2a section 5 verbatim), `/en/pricing/` (three columns, credit line, contact). `/` links to `/en/`. Placeholder copy is marked `[draft]` in HTML comments: pricing hero, Inner Circle bullets, "quoted individually" line.

**Checks.** `npm run build && npm run check` pass. No horizontal overflow at 390 or 1440.

**Page weight** (uncompressed, excluding the portrait): about 195 to 200 KB per page. Breakdown: Inter latin 48 KB, Inter latin-ext 85 KB, CSS 36 KB (about 6 KB gzipped), logo and HTML about 25 KB.

**Known gaps.**
- Inter latin-ext loads because of the shekel sign (U+20AA); subsetting it would save about 80 KB.
- Home subline uses the 25-word draft, without the 2z closing phrase "around your own circumstances", to stay inside the phone fold limit.
- Links to FAQ, Conditions, attorneys and the three other situations point to `#`.
- The pricing hero is plain, with empty space on the right at desktop.
- No dark mode and no Hebrew or RTL build yet.
