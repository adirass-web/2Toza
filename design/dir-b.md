# Direction B: Boutique law

**Foundation.** Pico CSS v2 compiled from its SCSS source with only the modules used (layout, typography, links, buttons, figure, accordion, nav, accessibility): 44 KB raw, 6.8 KB gzip, no JS. Open Props supplies the size scale (`--size-*`). Our layer (`styles/site.css`) sets tokens, grid and components. `npm run build` compiles Pico, adds fonts and layer, minifies with lightningcss to `assets/css/site.css` (58 KB raw, 9.5 KB gzip), then runs Eleventy. Heebo (400/700/800) is self-hosted from @fontsource/heebo; Latin and Hebrew subsets use `unicode-range`, so Hebrew files load only when needed (the ₪ sign pulls the Hebrew subset).

**Tokens.** Paper `#fbfaf8`, ink `#000`, muted `#4a4743`, oxblood accent `#6a1b27`, hairline `#cfcac3`, tint `#f2efea`. Type: Heebo 800 headlines at -0.03 to -0.04em tracking (h1 clamp 34-84px), 17px/1.55 body, 15px small text, small-caps labels in oxblood. Spacing: 12-column grid, 24px gutter, 1240px maximum, section padding 44-104px. Zero radius, 1px rules (black between sections, hairline inside).

**Components.** Sticky header with a `<details>` mobile menu (no JS) and a Message button; hero with founder figure; numbered section frame (number and label in columns 1-3, content in 4-12); situation doors (ruled list, whole row is a link); Assess/Harden/Verify strip with three inline-SVG line drawings (laptop, phone and summary sheet; two security keys; dated record); credential block; specimen document card with the required label; price block; three-column comparison; contact block; compact footer.

**Notes.** Logical properties only, so RTL should work. Visible focus, 44px or larger tap targets, no horizontal overflow at 390px. Pricing page copy outside 2a (hero, reassurance line) is marked `[draft]` in HTML comments.

**Page weight** (uncompressed transfer from a plain static server, portrait excluded): Home 119 KB, Separation 118 KB, Pricing 108 KB; about 50 KB gzipped. Portrait adds 13.5 KB. Most of it is fonts (about 36 KB for Latin 400/700/800, plus 5 KB per Hebrew weight in use) and CSS.

**Known gaps.** FAQ, Conditions, attorneys, Privacy and Terms links point to `#`. The Home subline follows 2a verbatim and runs to 27 words. The Pico dark scheme is disabled (`data-theme="light"`). No Hebrew page yet. Pricing hero text and some Pricing spec lines are the author's drafts.
