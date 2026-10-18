################ split-stage
# DIRECTION SHEET — The split stage
seed 1005600014 · drawn 2026-10-18 · sector health · tone quiet
Brief: Toza: private, in-person digital security for affluent Israeli individuals and families; one senior expert hardens your phone, computer and accounts with you present, by appointment

| | |
| --- | --- |
| Direction | The split stage |
| Hero | Menu column, sticky photograph |
| Type | Literata |
| Colour | Olive on bone |
| Sections | list (Two-ended rows, narrow column) → how-it-works (Itinerary on a slip) → about (Founder's letter) → pricing (Prices like a menu) → contact (Photo strip, three-cell bar) |
| Motion | Slow crossfade |
| Photographs | the "People" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Half the screen never moves. One side is a fixed photograph (or object, or product view) that stays in place for the whole visit; the other side is a calm scrolling column with everything you need to read. The fixed half keeps the feeling present while the reader gets on with the facts, like sitting in the room while reading the menu. As sections pass, the fixed image may quietly change to the one that matches.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Desktop: a two-column page, 50/50 or 45/55. One column is `position: sticky; top: 0; height: 100svh` and holds a single photograph filling it edge to edge, or the object centred on a flat field. The other column scrolls and holds all content in a single narrow measure (max 46ch) with comfortable padding (48–72px): name and one-line description first, then sections separated by generous space, then contact and footer. Headings in the scrolling column are modest (32–44px). The column grounds differ: photograph on one side, flat paper colour on the other, meeting at a clean vertical edge. On a phone the fixed half becomes a 60svh image at the top that stays sticky behind the first section, then releases.

## 3. Type — Literata
A sturdy screen-reading serif with a large x-height; headings are simply the text face at medium weight and a larger size. Suits essays, reports, newsletters and knowledge products.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet">
```
- Display: **Literata** — weight 500 with optical sizing on · tracking -0.02em · leading 1.05 · sentence case
- Text: **Literata** — 400 for body, 600 for emphasis, italic for titles · leading 1.6 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A text-first setting: a readable serif or a calm sans at 17–19px, with one display size for the name. Left-aligned throughout.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Olive on bone
```css
:root {
  --bg: #ecebe7;
  --surface: #e1dfd9;
  --ink: #38450f;
  --muted: #5d683a;
  --accent: #38450f;
  --accent-ink: #ecebe7;
  --field-1: #38450f;  --field-1-ink: #ecebe7;
}
```
A bone page with every word, large or small, in one olive green; the footer inverts to a solid olive field with bone text. Photography supplies all other colour, and the button is the same olive, filled.
The paper colour of the reading column is chosen against the photograph: a tone taken from its shadows or its lightest area. One ink, optionally one accent ink for links and the action.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /home/claude/ext/taste-skill/skills/taste-skill/scripts/assets.mjs "health"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

One excellent portrait-orientation photograph for the fixed half, plus three or four more that crossfade in as their sections arrive. Small inline photographs in the reading column are optional and should be few.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "People" set (figures, silhouettes and portraits, mostly unposed)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/338/1600/1000` — Person in a hooded coat seen from behind facing a misty sea · mid tone · slate blue, grey, charcoal · calm area: left · native landscape · photo: Patryk Sobczak
- `https://picsum.photos/id/669/1600/1000` — Person in a mustard jacket and grey beanie seen from behind in fog · light tone · mustard, pale grey, white · calm area: left · native landscape · photo: Luke Pamer
- `https://picsum.photos/id/473/1600/1000` — Person in dark clothes standing on a jetty facing misty mountains · mid tone · slate blue, black, pale grey · calm area: right · native landscape · photo: Todd Quackenbush
- `https://picsum.photos/id/1009/1600/1000` — Back of a person's head beneath a wide pale blue sky · light tone · pale blue, soft white, dark brown · calm area: top · native portrait · photo: Christopher Campbell
- `https://picsum.photos/id/91/1600/1000` — Person in dark jacket holding a vintage twin-lens camera, monochrome · mid tone · grey, black · black-and-white · native landscape · photo: Jennifer Trovato
- `https://picsum.photos/id/726/1600/1000` — Person in a red jacket standing in a snowy, misty landscape · light tone · white, pale grey, red · calm area: bottom · native landscape · photo: Caleb George
- `https://picsum.photos/id/1005/1600/1000` — Person in a scarf seen from behind, looking at the sea at dusk · mid tone · warm sand, dark brown, pale peach · calm area: left · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/1006/1600/1000` — Person sitting on a rocky overlook above misty forested hills · mid tone · dusky purple, olive green, grey · calm area: top · native landscape · photo: Vladimir Kudinov
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, coast, mountain, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Menu column, sticky photograph
The viewport is two panels of equal width with a 12px gap between them and 12px outer margins, both with a 20px radius. Right panel: one photograph of the place filling it edge to edge (object-fit: cover), set to position: sticky; top: 12px; height: calc(100svh - 24px), so it stays put while the left side scrolls. A solid bar in the paper colour, 56px tall, lies across the photograph's bottom edge inside the panel and carries opening hours on the left and the address on the right at 15px. Left panel: a filled paper-colour sheet set like a menu card, everything centred. Its top row holds the wordmark, about 300px wide, in the centre with one text link either side. Below, at 34% of the height, the headline in a light serif at clamp(40px, 3.6vw, 56px) on two lines in the accent ink, max 18ch per line. Under it one sentence at 17px, max 40ch, then the single action as a solid rectangle in the accent ink. The lower quarter of the sheet is empty before the first section begins.

On a phone: The photograph comes first as a rounded panel 56svh tall on 12px margins, sticky at the top so the paper sheet slides up over its lower part. The hours bar stays on the photograph's bottom edge. The sheet holds the wordmark centred at 46% of the width, the headline at 9vw on two lines, the sentence and a full-width action.
Headline: A warm 3-6 word line in a light serif, at most 34 characters, centred on two lines.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Literata, text Literata) and their settings; capitals only where the type system sets them.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. list — Two-ended rows, narrow column (list)
A list in one narrow column, 520px wide, starting at 22% of the viewport width or centred. Every row is 34–38px tall with no box and nothing drawn between rows. Each row has two ends: at the left, a 16px round image (a face, a logo, a colour dot) followed after 8px by the name at 15–16px in full ink; at the far right of the column, a short value at 13px in the soft ink (a date, a price, a domain, an opening time) with tabular figures. Entries that need a sentence run to two lines at the left, and the value aligns with the first line. Groups are separated by 40px of space and begin with one plain word in the soft ink at the same size. A heading of two to four words at 24–28px in medium weight sits 32px above the first row. Holds 10–40 rows.
On a phone: The column fills the width with 20px margins. Rows are 44px tall for touch; the left image stays 16px. Long values wrap beneath the name at 13px, left-aligned with it, and the row grows. Group spacing is 32px.

### 2. how-it-works — Itinerary on a slip (table)
The process is printed as an itinerary or receipt. One paper-coloured slip 420–480px wide stands on a contrasting flat ground at columns 7–11; its bottom edge is a zigzag cut with clip-path and its top edge is straight. The heading, two to four words at clamp(40px, 4.4vw, 68px), sits in columns 1–5 with a 30ch paragraph, top-aligned with the slip. On the slip, in the text face at 16px with tabular figures: stages grouped under time headings that carry the order ('Monday', 'Midweek', 'Friday'), each heading in bold with 28px above it. Under a heading, two to four rows; each row has what happens on the left, a duration or time on the right, and a leader of round 4px dots between. The final row is inverted, paper-coloured text on a full-width ink bar 44px tall, and states the result: what the reader holds at the end and the total time.
On a phone: The heading and paragraph come first. The slip follows at full width minus 16px margins, keeping its zigzag bottom edge. Rows keep left text, dots and right value on one line; long descriptions wrap under the left text. The inverted final row stays full width.

### 3. about — Founder's letter (stack)
A letter in a centred column 520px wide with at least 160px of empty ground above and below. At the column's top-left, a round portrait 44px across. 28px below it, four or five short paragraphs at 16–17px with leading 1.55, each two to four lines and separated by one blank line, written in the first person. No heading. The sign-off is the writer's name at 22px in the text face's italic, with the role at 14px in the soft ink beneath it. One phrase in the letter may carry a flat marker-colour background. Variant for a page built as an object: the letter sits on a filled paper-colour sheet 640px wide with 60px padding on a contrasting ground, square corners, its bottom edge cut into small scallops with `clip-path`, and below a row of 5px round dots a tear-off strip 72px tall that carries the email address.
On a phone: The column takes the full width with 24px margins; text at 16px, portrait 40px. In the sheet variant the sheet spans edge to edge with 24px padding and keeps its shaped bottom edge; the tear-off strip stacks the email above a full-width button.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Literata, text Literata) and their settings; capitals only where the type system sets them.

### 4. pricing — Prices like a menu (list)
Prices set the way a good menu sets them. A heading of two to three words at 32–40px sits in columns 1–3. Columns 5–12 hold the list in two text columns with a 64px gap. Items are grouped under plain group names at 24px in medium weight with 48px above each group. Each item is a row: the name at 19px on the left, the price at the same size on the right on the same baseline, with tabular figures and the currency sign shown only once per group; beneath the name, one line of description at 16px in the softer ink, no wider than 36ch. Rows are 22px apart. Name and price are joined only by empty space (flex with `justify-content: space-between`), with no dot leaders and no lines. One small photograph (4:5, three columns wide) may sit under the heading in the left zone.
On a phone: One column. The heading at 28px, then the photograph at 60% width if used. Each item keeps name left and price right on one line at 17px, with its description beneath in the softer ink. Group names at 20px with 40px above.

### 5. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
A full-height photograph always in view, against a quiet, well-set column of text.

## 10. How this direction goes wrong
The reading column must be genuinely well typeset, since it is half the page. Do not put cards or grids in it. Check that the fixed image crops well at short viewport heights. In blind tests the commonest complaint was monotony: several screens of the same split with only the text changing. Change what the reading half holds from section to section (a list, a large figure, a table, a full-colour panel, a drawing) and let at least one section break the split and run full width.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Le Petit Bleu** (One Page Love, studied score 7.8) `opl-le-petit-bleu`
  Idea: The cafe's teal-and-white stripes become the whole system: one teal ink on cream, everything boxed in thin double outlines like printed menu cards, beside a permanently visible photo of the room.
  Hero: Viewport split 50/50 with 12px gaps. Left: a cream panel with a thin pale-teal outline and rounded corners. Inside, a second outlined box is the nav bar: two-line hamburger left, teal brush-script logo about 300px wide centred, a caps order link right. Below, a two-line light serif headline at about 3.5vw, centred, in teal, then two centred stacks, each a bold caps label, a serif line and a solid teal button wrapped in a second thin outline. Right: a full-height rounded photo of a striped booth, with an outlined hours bar across its top, three slide dots bottom-left and a white address card bottom-right.
  Worth taking: Print everything in one brand ink on cream, including body text, rules and buttons, and let photographs supply the other colours.
- **Flowjam** (One Page Love, studied score 6.8) `opl-flowjam-2`
  Idea: A persistent frosted sidebar card holds the pitch and buttons while a soft-serif content column scrolls past it; beyond that there is no idea stronger than proof by logos and videos.
  Hero: Grainy off-white page. A tall rounded card about 26% of the viewport wide is pinned at the left and runs off the bottom; frosted over blurred pink and yellow flowers, it holds the logo, a two-line serif tagline, a short blurb and two pill buttons in hot pink and charcoal. The main column starts 32% from the left: a hot-pink pill badge, a three-line serif headline at 4.2vw, then a paragraph whose first sentence is grey and the rest black. A lone charcoal pill button floats far right at mid-height. Below: a heart icon with a proof line, then the top of a four-column logo grid with dotted borders.
  Worth taking: Pin a narrow card with logo, one-line pitch and both actions beside the scrolling content, so the call to action never leaves the screen and no top nav is needed.
- **Zara Webb** (One Page Love, studied score 8) `opl-zara-webb`
  Idea: A one-woman newborn-care practice presented like a hand-made keepsake: a mascot rabbit, scalloped and flower-shaped cut-outs, candid film photographs.
  Hero: Split exactly in half. Left, on cream: two-line mono caps nav stacks sit at the column's top-left and top-right with a handwritten script logo centred between them. Centred below, a five-line headline in a condensed serif, each line broken to one to three words so the block forms a ragged lozenge; then a three-line 16px sans paragraph and an outlined pill button in mono caps. A line-drawn rabbit on a skateboard rides a hairline at the column's bottom-right. Right: a candid flash photograph bleeds off the top and right edges and stops at 92% height; a lilac pill button and a round chat icon overlay its top-right corner.
  Worth taking: Mask photographs into soft custom shapes (a four-petal flower, a scalloped egg) and let their container crop them.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to /home/claude/radical-work/.taste-skill/direction.json · reprint with `node draw.mjs --show`
################ product-performs
