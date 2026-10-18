# DIRECTION SHEET — The product performs
seed 1994588028 · drawn 2026-10-18 · redraws: 14 · sector finance · tone quiet
Brief: Toza: private, in-person digital security for affluent Israeli individuals and families; one senior expert hardens your phone, computer and accounts with you present, by appointment

| | |
| --- | --- |
| Direction | The product performs |
| Hero | Fragment on a shaped stage |
| Type | General Sans |
| Colour | Putty and black |
| Sections | list (Day tabs, banded agenda) → how-it-works (Drag through the stages) → about (Founder's letter) → pricing (Plans as a large table) → contact (One field, nothing else) |
| Motion | Shutter image |
| Photographs | the "Architecture" set, as atmosphere |

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
Software is most convincing when it is doing its job in front of you. Instead of describing features, put small, true, working fragments of the product on the page: the actual control, with real content, responding to the pointer. A colour picker's loupe reads the page's own background and prints its value. A list tool lets you tick an item right there. A type-scale plugin sets the page's own headings. Find the one interaction that is the product and make the hero that interaction; then show each further capability as another fragment at real size. No dashboard collage, no browser frame, no screenshots shrunk until unreadable.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Hero: a short plain headline (4–6vw, left-aligned, upper-left third) and one sentence; the rest of the first screen is the main fragment at actual interface size, sitting directly on the page or on one flat stage colour, large enough to read every label. The fragment is built in HTML and works. Below, capabilities are a single-column sequence, each a row of two parts on a 5/7 split: a two-line statement on one side and the relevant fragment on the other, with the fragments varying in size and shape so the column never becomes a zigzag of equal blocks. Fragments are cropped pieces of interface (a menu, a row, a control, a panel edge), not whole windows. One section pins a fragment while three short statements change it.

## 3. Type — General Sans
A grotesk with slightly geometric bowls, set bold and very large against plain 16px text with nothing in between. Suits studios, type and product launches, and finance or tech brands that lead with the name.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,700&display=swap" rel="stylesheet">
```
- Display: **General Sans** — weight 700 · tracking -0.02em · leading 0.9 · sentence case; sizes jump straight from 16px text to 10vw and larger
- Text: **General Sans** — 400 for body and lists, 500 for emphasis · leading 1.45 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
The marketing type matches the product's interface type so the fragments and the page feel like one thing. Headline modest; interface text at its true size (13–15px) inside fragments.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Putty and black
```css
:root {
  --bg: #dedad3;
  --surface: #d3cec6;
  --ink: #0a0a0a;
  --muted: #5c5852;
  --accent: #256f82;
  --accent-ink: #ffffff;
}
```
Warm putty covers the page and pure black handles all type and the main shapes. The only tint in the interface is teal, used for the one button or a single marker placed near the photographs.
Neutral ground. The product's own interface colours provide the colour. At most one flat stage colour behind fragments.

## 5. Imagery
**This subject is software and there are no screenshots, so its pictures are its own interface.** Wherever this sheet says photograph, image or object, build a believable fragment of the product in HTML at real size (real labels, numbers that add up, one item hovered or selected), put the attribute `data-ui` on its root, and crop or scale it the way the blueprint treats a photograph: a full-bleed close crop, a tile, the fixed half of a split. Where a fragment makes no sense, use a flat colour field with type on it. Never a fake dashboard of grey bars, never a device frame. If the product works on something physical (ships, plants, buildings, a city), one real picture of that world can carry a section: find it with `node /home/claude/ext/taste-skill/skills/taste-skill/scripts/assets.mjs "<that world>"`, download it with `--get`, credit it on the page, and never let it pass for the product or its customers.

The interface fragments are the main imagery: build them carefully with real labels, real numbers and sensible states (one hovered, one selected). Around them, two or three real pictures of the customer's world (found with scripts/assets.mjs), never stock of people at laptops.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Optional atmosphere, two at most, from the "Architecture" set (structure, lines, bridges, facades and building interiors). The page does not need them.
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/331/1600/1000` — Silhouette of a person standing beneath a steel-framed roof · dark tone · black, white, grey · black-and-white · calm area: bottom · native landscape · photo: Thong Vo
- `https://picsum.photos/id/618/1600/1000` — Curving glass and steel lattice roof in black and white · light tone · white, grey, black · black-and-white · native landscape · photo: Mika Ruusunen
- `https://picsum.photos/id/693/1600/1000` — Red suspension bridge tower rising from fog above rugged cliffs · mid tone · rust red, grey, dark teal · calm area: left · native landscape · photo: Rob Bye
- `https://picsum.photos/id/942/1600/1000` — White angular concrete building against a black sky · dark tone · black, white, pale grey · black-and-white · calm area: top · native landscape · photo: Carl Nenzen Loven
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use at most two. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: sky-and-space, fog-and-quiet, water — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Fragment on a shaped stage
A neutral ground. The headline occupies the upper-left third: two lines at clamp(52px, 5.2vw, 80px), medium weight, flush left on columns 1–6 at a 40px margin, starting 150px down. One supporting sentence at 18px, max 40ch, follows, then the single action as a small rectangular button. The rest of the screen belongs to one flat stage in a saturated colour: it spans columns 5–12, begins 42% down, and bleeds off the right and bottom edges. Its top-left corner is cut with the product's own shape using `clip-path` (a notch, a chamfer or a tab two columns wide), the only decoration on the page. On the stage, 56px in from its left and top edges, sits the main fragment of the interface at true size with labels at 13–15px, built in HTML and working: one panel or control about 620px wide, cropped by the bottom edge, never a whole window and never inside a browser or laptop frame. Mark its root with data-ui. Navigation is a plain row at 28px from the top: wordmark left and four text links right at 15px. Nothing overlaps the headline.

On a phone: The headline sits under the wordmark at 10vw on two lines, followed by the sentence at 16px and the button. The stage comes next at full width, bleeding off both sides and the bottom, its corner cut kept at 72px wide. The fragment sits 16px inside it at true size; if it is wider than the screen the right edge crops it rather than scaling it down.
Headline: A plain statement of what the product does in three to six words, two lines of up to about 16 characters each at 5.2vw.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. list — Day tabs, banded agenda (list)
A two-line heading at clamp(36px, 4vw, 60px), first line in the soft ink and second in full ink, with the booking button on the same row at the far right. 56px below, left: a 150px column of stacked day tabs, each a filled block 150 by 64px with 6px gaps showing the weekday at 16px and the date at 13px; the active tab takes the darkest fill with inverted text. Right, from 190px to the right margin: the day's sessions as alternating tone bands, each 76px tall with an 8px radius and 4px gaps, the two tones one step apart. Inside a band, on fixed column starts: the time at 20px with tabular figures, 20px from the left; the title at 18px in medium weight at 22%, with a one-line note at 13px in the soft ink under it; speaker names right-aligned at 14px beside up to three overlapping 32px round portraits.
On a phone: The heading stacks above a full-width button. Day tabs become a horizontal row of equal filled blocks, sticky under the top edge. Each band stacks time over title over speakers with 16px padding and grows to fit; portraits sit at the band's top-right corner.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

### 2. how-it-works — Drag through the stages (split)
A 50/50 split, 88svh tall: two flat fields meeting on a clean vertical edge, and one slider that drives both. Left field: the current stage as a clause of three to six words at clamp(40px, 4.6vw, 76px) on two lines, top-left from column 1, starting with its order word; it serves as the heading. Right field: one fragment of the product at true size, about 440px wide, centred, root marked data-ui, in the state that matches the clause. Along the bottom, crossing both fields inside 28px margins, a real range `<input>` with four stops: a solid track 8px tall, the part already passed in full ink, and a square thumb 32px across in the accent. Under the track, four stage names at 16px, the current one in full ink. Dragging, or the arrow keys, swaps the clause and the fragment's state with a 200ms crossfade; nothing depends on scroll.
On a phone: The fragment's field comes first, 46svh, the fragment at true size and cropped to its active region. The slider follows directly beneath on the seam, thumb 40px. Then the clause field: the clause at 9vw on two lines, with the four stage names under it in a two-by-two block at 15px.

### 3. about — Founder's letter (stack)
A letter in a centred column 520px wide with at least 160px of empty ground above and below. At the column's top-left, a round portrait 44px across. 28px below it, four or five short paragraphs at 16–17px with leading 1.55, each two to four lines and separated by one blank line, written in the first person. No heading. The sign-off is the writer's name at 22px in the text face's italic, with the role at 14px in the soft ink beneath it. One phrase in the letter may carry a flat marker-colour background. Variant for a page built as an object: the letter sits on a filled paper-colour sheet 640px wide with 60px padding on a contrasting ground, square corners, its bottom edge cut into small scallops with `clip-path`, and below a row of 5px round dots a tear-off strip 72px tall that carries the email address.
On a phone: The column takes the full width with 24px margins; text at 16px, portrait 40px. In the sheet variant the sheet spans edge to edge with 24px padding and keeps its shaped bottom edge; the tear-off strip stacks the email above a full-width button.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display General Sans, text General Sans) and their settings; capitals only where the type system sets them.

### 4. pricing — Plans as a large table (table)
Two to four plans compared in a table whose type is far larger than a table usually gets. The first column (columns 1–4) lists what is compared, in words, at 22px. Each plan takes an equal share of columns 5–12. The header row gives each plan's name at about 3vw bold, left-aligned, with its price directly beneath at the same size in the regular weight and the period at 16px. Body rows are 22px with 20px padding; cells answer in words or numbers (“Unlimited”, “3 seats”, “Not included”), never with ticks. Every second row has a background tone one step from the ground, spanning all columns. The recommended plan is marked only by its whole column sitting on the accent tone from header to last row. The final row holds one rectangular button per plan. A two-to-four-word heading sits in the top-left cell.
On a phone: Plans stack as separate blocks. Each opens with the plan name and price at 9vw, then its rows as pairs: the compared item in the softer ink, the answer beneath in the full ink, both at 17px. The recommended plan's block sits on the accent tone. A full-width button ends each block.

### 5. contact — One field, nothing else (stack)
The whole section is one prompt and one field in a column 520px wide, on the page's text column line or centred, with 200px of empty ground above and 160px below. The prompt is two lines at one size, 24–28px in medium weight: the first line in the soft ink, the second in full ink. 28px below, a single input 520px wide and 64px tall with a 12px radius, filled with the lightest tone on the page so it is the only bright surface in view; no outline at rest and a 2px inner ring in the accent on focus. Inside the right end of the field, 8px from its edge, a round submit button 44px across with an arrow and an accessible name. 16px below the field, one line at 13px says what happens next. 72px lower, three label and value rows at 14px: email, phone, address.
On a phone: The column fills the width with 20px margins. Prompt at 22px. The field stays one row, 60px tall, with the arrow button inside its right end. The three label and value rows stack with the label above each value and 20px between them.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Fidelity. A fragment with believable content and a real hover state is more interesting than any illustration. Spend the effort there.

## 10. How this direction goes wrong
A fake interface made of grey bars and circles is the worst outcome; if you cannot build a believable fragment, change direction. Mark each fragment's root element with the attribute data-ui: inside it the product's own conventions apply (1px control borders, small radii, a shadow on its open menu) and the inspector leaves them alone; outside it the house rules hold as usual. data-ui is for cropped fragments only, never for a page wrapper. Do not put the fragment in a browser or laptop frame.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Dabbit** (One Page Love, studied score 7.8) `opl-dabbit`
  Idea: The colour picker demonstrates itself on the page: its loupe sits in the hero reading the site's own background hex, and every feature is shown as a real fragment of the app.
  Hero: Near-black viewport split exactly in half by a one-pixel vertical hairline. Left half: a small chrome four-petal logo top-left at a 40px margin, then two thirds of empty dark, then everything else anchored bottom-left: a one-line 30px medium-weight headline, three lines of grey 18px copy, a light pill button beside an outlined pill, and a tiny note. Right half: a 450px rounded square with a thin iridescent border, the app's loupe, empty except for a centre crosshair dot and a small chip reading the hex of the page's own background. Eight pastel dots and lozenges drift across the top-right like spilled swatches.
  Worth taking: Make the hero demo sample the page itself: the tool reports the site's own background value, proving the product without a screenshot.
- **Uni** (One Page Love, studied score 7.2) `opl-uni`
  Idea: The product lives in the laptop notch, so the page's navigation is a black notch and the hero is a laptop outline whose notch opens into the app.
  Hero: White page with the hero as a rounded-corner panel inset 24px on all sides, filled with a grainy pastel gradient (pink-peach centre, sky blue down the right edge, orange lower-left). A black pill 300×44px sits top-centre like a laptop notch, holding only the app icon; it is the entire nav. Centred below: a hand-scrawled caps eyebrow, a two-line 48px (3.3vw) headline, two white pill download buttons side by side, one line of tiny grey reassurance. The bottom 40% is a thick black outline of a laptop screen, 960px wide, cropped by the fold, its notch expanded into a dark input bar playing the demo.
  Worth taking: Shape the navigation like the product's own hardware habitat (here a black notch pill) so the nav itself demonstrates the product.
- **Sharplink** (Awwwards Site of the Day, studied score 7.6) `aww-sharplink`
  Idea: A crypto treasury presented as precision hardware: chrome machined parts and glass capsules rendered in 3D on deep blue, overlaid with dashed machine-vision tracking boxes.
  Hero: Full-bleed video of exploded brushed-metal components floating on a navy-to-cobalt gradient, covered by a web of thin white dashed lines and small square tracking markers. Logo top-left on a 2% margin; top-right a segmented strip of five dark rectangular tabs in narrow uppercase plus an arrow square. The headline is top-left, two lines at 6.1vw in regular weight with -0.03em tracking, starting 18% down. Under it two stacked rectangular buttons: white with a blue arrow square attached, then a translucent dark one. Bottom row: a stock-exchange badge at left, a three-line lead paragraph at about 1.3vw starting 26% across, and bottom-right a translucent dark news card about 30% wide.
  Worth taking: Overlay a 3D render with thin dashed lines and tiny square markers linking its parts, as if a vision system were tracking the object.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to /home/claude/radical-work/.taste-skill/direction.json · reprint with `node draw.mjs --show`
