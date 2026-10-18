################ quiet-instrument
# DIRECTION SHEET — The quiet instrument
seed 1650518005 · drawn 2026-10-18 · sector finance · tone quiet
Brief: Toza: private, in-person digital security for affluent Israeli individuals and families; one senior expert hardens your phone, computer and accounts with you present, by appointment

| | |
| --- | --- |
| Direction | The quiet instrument |
| Hero | Column on one line |
| Type | EB Garamond |
| Colour | Greys and mint |
| Sections | list (Two-ended rows, narrow column) → how-it-works (Pinned fragment, changing state) → about (Side facts, wide paragraph) → pricing (Prices like a menu) → contact (One field, nothing else) |
| Motion | Slow crossfade |
| Photographs | the "Fog and quiet" set, as atmosphere |

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
Radical understatement. Where every competitor shouts, this page almost whispers: a headline barely larger than body text, a narrow column, small exact demonstrations, and a great deal of untouched space. The restraint is the claim. It says the thing is simple, finished and sure of itself. This only works when it is carried through completely; one loud element breaks it. In the study, a tool for simple lists sold itself with a 27px headline and 12–14px copy and was one of the most confident pages in the set.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single column 440–560px wide, placed left of centre (starting at about 22% of the viewport width) or dead centre, running the whole page. The headline is the one large thing on the first screen: two lines at display size (5–7vw), medium weight, starting on the column's left edge and allowed to run wider than the column. The supporting paragraph follows at body size (17–19px) in the full ink. One small primary button and one text link. Below, each point is a short paragraph followed by a compact demonstration or image no wider than the column. Sections are separated only by space (96–140px). Nothing spans the full width until the footer, which is a single quiet line. The first screen is mostly empty and that emptiness is composed: the column's top edge sits at about 30% of the viewport height.

## 3. Type — EB Garamond
A humanist Garamond in roman and italic at two modest sizes, with no capitals and no bold. Suits set designers, antique dealers, wine, publishers and portfolios that whisper.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
```
- Display: **EB Garamond** — weight 400, italic for the title · tracking -0.01em · leading 1.1 · sentence case or all lowercase; the largest size stays near 40px
- Text: **EB Garamond** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One family, two weights. A display size for the headline (5–7vw), one heading size for section titles (about 32–40px), body at 17–19px, a small size for captions (14–15px). Leading 1.5 for text. Letter-spacing near zero. The typeface must be handsome at small sizes.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Greys and mint
```css
:root {
  --bg: #ffffff;
  --surface: #f3f3f3;
  --ink: #232323;
  --muted: #6e6e6e;
  --accent: #a1ffcb;
  --accent-ink: #232323;
  --field-1: #a1ffcb;  --field-1-ink: #232323;
  --field-2: #232323;  --field-2-ink: #ffffff;
}
```
White, near-black and two greys fill a board of flat tiles. Mint floods a few whole tiles (one statement, one figure, the closing call to action) and appears nowhere else.
Paper and two inks (full and soft). One accent used on exactly one element per screen.

## 5. Imagery
**This subject is software and there are no screenshots, so its pictures are its own interface.** Wherever this sheet says photograph, image or object, build a believable fragment of the product in HTML at real size (real labels, numbers that add up, one item hovered or selected), put the attribute `data-ui` on its root, and crop or scale it the way the blueprint treats a photograph: a full-bleed close crop, a tile, the fixed half of a split. Where a fragment makes no sense, use a flat colour field with type on it. Never a fake dashboard of grey bars, never a device frame. If the product works on something physical (ships, plants, buildings, a city), one real picture of that world can carry a section: find it with `node /home/claude/ext/taste-skill/skills/taste-skill/scripts/assets.mjs "<that world>"`, download it with `--get`, credit it on the page, and never let it pass for the product or its customers.

Precise rather than loud: cropped interface details at true size, and real photographs of the customer's world held to the column width, each doing one job. One short looping clip can sit at column width too. Never a large stock hero image.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Optional atmosphere, two at most, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text). The page does not need them.
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/279/1600/1000` — Still misty water fading into a soft pink-grey sky · mid tone · dusty pink, slate grey · calm area: all · native landscape · photo: Taylor Leopold
- `https://picsum.photos/id/302/1600/1000` — Lone marker post standing in still water wrapped in fog · light tone · pale grey, white · calm area: all · native landscape · photo: Billy Lam
- `https://picsum.photos/id/594/1600/1000` — Small boathouse at the end of a jetty on dark water at night · dark tone · black, deep purple, warm white · calm area: top · native landscape · photo: Aurélien bellanger
- `https://picsum.photos/id/465/1600/1000` — Dark rocky peak emerging from thick white cloud · light tone · white, charcoal, pale grey · calm area: left · native landscape · photo: Paula Vermeulen
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use at most two. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: sky-and-space, architecture, water — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Column on one line
A warm off-white page that is more than 80% empty. Everything hangs on one vertical alignment 27% in from the left edge, the start of column 4; nothing is centred and nothing sits to its left. A small logo mark sits on that alignment 56px from the top. About 220px lower the column begins, only 380px wide: a two-line headline at 27px in medium weight, line-height 1.25; one supporting sentence at 15px in the softer ink, line-height 1.5; then, 28px below, the single action as a near-black rectangular button with 4px corners and one text link with an arrow beside it. A sign-in text link sits alone in the top-right corner at 14px; there is no navigation bar. At the bottom edge the first demonstration peeks in on the same alignment: a flat panel one step darker than the page, 368px wide, its top 90px visible, holding two real rows of the product's interface at true size with a visible pointer. Mark the panel's root with data-ui. The right half of the screen is blank on purpose, and nothing spans the full width until the footer.

On a phone: The alignment becomes the 24px left margin. The logo mark sits 32px from the top and the column starts at 30% of the height: headline at 24px on two lines, the sentence at 15px, then button and text link side by side. The demonstration panel spans the width between the margins and shows its top 120px above the fold. The sign-in link stays top-right.
Headline: A dry two-line statement at 27px, up to about 30 characters per line; it never grows larger at any width.

Adjusted for this page:
- It names colours (white, black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. list — Two-ended rows, narrow column (list)
A list in one narrow column, 520px wide, starting at 22% of the viewport width or centred. Every row is 34–38px tall with no box and nothing drawn between rows. Each row has two ends: at the left, a 16px round image (a face, a logo, a colour dot) followed after 8px by the name at 15–16px in full ink; at the far right of the column, a short value at 13px in the soft ink (a date, a price, a domain, an opening time) with tabular figures. Entries that need a sentence run to two lines at the left, and the value aligns with the first line. Groups are separated by 40px of space and begin with one plain word in the soft ink at the same size. A heading of two to four words at 24–28px in medium weight sits 32px above the first row. Holds 10–40 rows.
On a phone: The column fills the width with 20px margins. Rows are 44px tall for touch; the left image stays 16px. Long values wrap beneath the name at 13px, left-aligned with it, and the row grows. Group spacing is 32px.

### 2. how-it-works — Pinned fragment, changing state (pinned)
Two columns. Right, columns 7–12: a stage that is position: sticky; top: 14vh, holding one fragment of the real interface at true size on a single flat stage colour, about 520px square. Left, columns 1–5: three statements, each in its own block 80vh tall, so one is in view at a time. A statement is a two-line sentence at 28–32px that begins with its order word ('Paste a link.', 'Then pick the parts you want.', 'Share it when it looks right.') plus one supporting line at 16px. The statement nearest the viewport's centre is in full ink; the others sit at 30%. As each statement becomes active the fragment changes to the matching state: an empty field, a filled list with two rows selected, a finished result with its confirmation. Build the states in HTML and switch a class; do not swap screenshots. The heading, two to four words at 24–28px, sits above the first statement.
On a phone: The stage is sticky at the top, 46svh tall, the fragment fitted by cropping to its active region, not by shrinking its text. Statements scroll beneath it in blocks 60svh tall at 22px. The stage releases after the third statement.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 3. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

### 4. pricing — Prices like a menu (list)
Prices set the way a good menu sets them. A heading of two to three words at 32–40px sits in columns 1–3. Columns 5–12 hold the list in two text columns with a 64px gap. Items are grouped under plain group names at 24px in medium weight with 48px above each group. Each item is a row: the name at 19px on the left, the price at the same size on the right on the same baseline, with tabular figures and the currency sign shown only once per group; beneath the name, one line of description at 16px in the softer ink, no wider than 36ch. Rows are 22px apart. Name and price are joined only by empty space (flex with `justify-content: space-between`), with no dot leaders and no lines. One small photograph (4:5, three columns wide) may sit under the heading in the left zone.
On a phone: One column. The heading at 28px, then the photograph at 60% width if used. Each item keeps name left and price right on one line at 17px, with its description beneath in the softer ink. Group names at 20px with 40px above.

### 5. contact — One field, nothing else (stack)
The whole section is one prompt and one field in a column 520px wide, on the page's text column line or centred, with 200px of empty ground above and 160px below. The prompt is two lines at one size, 24–28px in medium weight: the first line in the soft ink, the second in full ink. 28px below, a single input 520px wide and 64px tall with a 12px radius, filled with the lightest tone on the page so it is the only bright surface in view; no outline at rest and a 2px inner ring in the accent on focus. Inside the right end of the field, 8px from its edge, a round submit button 44px across with an arrow and an accessible name. 16px below the field, one line at 13px says what happens next. 72px lower, three label and value rows at 14px: email, phone, address.
On a phone: The column fills the width with 20px margins. Prompt at 22px. The field stays one row, 60px tall, with the arrow button inside its right end. The three label and value rows stack with the label above each value and 20px between them.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Precision. With so little on the page, alignment, spacing and the exact size relationships are the design. Every element shares the column's left edge.

## 10. How this direction goes wrong
This is the one direction where a small headline is right; the inspector will not object, but do not mix it with a large display line. Emptiness must look decided: keep the column edges exact and the vertical rhythm even. Not suitable when the subject needs emotion or photography to sell. Quiet is not thin: the column must still deliver every piece of content the brief asks for, in full, at 16px or more in the full ink. In blind tests the quiet version lost every time it was quiet everywhere: a small headline beside an empty panel read as unfinished. Quiet means few things, not small things: the headline and the demonstration are large, and every screen holds content.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Rows** (One Page Love, studied score 7.5) `opl-rows`
  Idea: Radical understatement: a product about simple lists is sold with a 27px headline, 12px copy and a column of small live demos, each proving one interaction.
  Hero: Warm off-white page, almost empty. Everything hangs on one vertical line 27% in from the left. A small striped-letter logo mark sits there near the top; 220px lower comes a two-line headline at only 27px (under 2vw), then three lines of 13px body about 370px wide, then a near-black rectangular button with 4px corners beside a text link with an arrow. A single grey sign-in link sits in the top-right corner; there is no navigation bar. More than 80% of the viewport is blank. At the bottom edge the first feature module peeks in: grey demo panel left, short text column right.
  Worth taking: Set the headline at near-body size (under 2vw) and let empty space, not scale, give it importance.
- **Plastic** (One Page Love, studied score 7.1) `opl-plastic`
  Idea: A plain, quiet app page given one physical object: a photographed vinyl record cropped by the top-right corner of the viewport.
  Hero: Pale grey page with no navigation, only a bold wordmark with a small orange-red caps descriptor beneath it at top left (80px margin). A photographed black vinyl record with an orange-red label is cropped by the top-right corner, showing a quarter disc about 360px wide and tall, with an orange wire stand poking out below it. The headline is centred slightly above the middle in two lines at 74px (5.2vw), about 37% of the viewport wide, followed by a two-line 17px sentence and two black store badges side by side. Lower down, an award mark and a laurel-framed rating sit centred; the bottom fifth is empty.
  Worth taking: Crop one photographed physical object by a viewport corner so the hero has a subject without a centred mockup.
- **Tara** (One Page Love, studied score 7.2) `opl-tara`
  Idea: Two pastel circles, mint for saving and pink for spending, stand for the app's two accounts and recur as icon, inline dot, section colour and card gradient.
  Hero: Off-white field with no navigation, only a small bold wordmark top-left. The left column is vertically centred and starts about 8% in: a two-line headline in a wide heavy grotesk at roughly 6vw with tight leading, a grey one-line subhead beneath, then a pill-shaped email field about 400px wide with a black pill button nested inside its right end. The right half holds a 3D pair floating on the page colour: a mint-to-pink gradient bank card tilted about 30 degrees, overlapping a perspective-tilted phone showing a balance screen. Two small award badges are stacked on the right edge. Roughly half the viewport is empty.
  Worth taking: Assign each product concept a colour and a shape early (two pastel circles), then reuse it as bullet, inline punctuation dot and full section background.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to /home/claude/radical-work/.taste-skill/direction.json · reprint with `node draw.mjs --show`
################ split-stage
