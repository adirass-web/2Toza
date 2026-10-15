# Direction A: Private bank

**Foundation.** Tailwind CSS v4 (CLI, purged, 39 KB minified) with the Flowbite 4 default theme and plugin. Taken from Flowbite: its semantic colour tokens (`brand`, `heading`, `body`, `neutral-primary`, `default`) remapped to our palette, the button and accordion-free card/list patterns, and the forms base. No Flowbite JS shipped; the mobile menu is a `<details>`. `npm run build` builds CSS, then Eleventy.

**Tokens.**
- Colour: paper ivory `#f7f2e8`, recessed ivory `#ede5d3`, ink green `#11302a`, text `#1d2723`, muted `#525d57`, brass `#7d5f24` (text-safe, 5:1), brass-light `#cfae6a` (on ink), rule `#cfc4aa`.
- Type: Frank Ruhl Libre 400 headlines, Assistant 400/600 body, both self-hosted (latin + hebrew woff2, 8 files, about 77 KB; the hebrew subset also carries the shekel sign). Body 18px/1.6. Display 42px on phone, 80px on desktop. H2 clamp 30 to 44px.
- Spacing: 4.5rem section rhythm on phone, 7rem on desktop; 76rem container; 3px radius; 1px hairlines.
- Logical properties throughout (`ps-`, `pe-`, `inset-inline-*`, `border-e`), so RTL needs only `dir="rtl"`.

**Components** (`src/_includes`): header (sticky, details menu), footer, hero with framed portrait, situation "doors" (index rows, not cards), three-stage band with inline SVG objects (laptop, phone and summary sheet; two keys; dated record folder), specimen document card, price block, credential line, contact block, two CTA partials. All CTAs are direct `target="_blank" rel="noopener"` links from `contact.json`; prices come only from `facts.json` through `ils`.

**Pages.** `/en/` (6 blocks), `/en/separation-divorce/` (2a section 5 verbatim), `/en/pricing/` (hero, three columns, credit line, contact). `/` links to `/en/`.

**Checks.** `npm run build && npm run check` pass. No horizontal overflow at 390 or 1440. Phone fold on Home and Separation: headline, 25-word subline, founder portrait with name, WhatsApp button, Signal and Call me back.

**Page weight** (transferred bytes excluding portrait, uncompressed): Home 107 KB, Separation 105 KB, Pricing 96 KB. Limit 400 KB.

**Known gaps.**
- `[draft]` copy, marked by an HTML comment on Pricing and flagged here: pricing hero, column taglines, "Larger or different needs are quoted individually", and the Home price heading "Two prices, both including VAT."
- Links to unbuilt pages (FAQ, Conditions, For attorneys, About, How it works) point to `#`.
- Hebrew not built or tested; Frank Ruhl Libre and Assistant both have Hebrew glyphs.
- Portrait is black and white; a light CSS sepia tone warms it to the palette.
- Specimen text is 16px, so it is a little crowded on narrow phones.
- No contrast tool was run; contrast was checked by token ratios only.
