# English design system

The approved Home page is the visual reference for the English site. Its light palette uses grey surfaces, dark text and white. Frank Ruhl Libre is the reading and heading font. Assistant is the font for navigation, labels and controls. The build contains dark token values, but the site does not expose a theme control. Dark-theme support is not established.

## Tokens and builds

`tokens/tokens.json` is the source of truth for design tokens. `scripts/build-tokens.mjs` generates both `styles/tokens.css` and `styles/approved-en-tokens.css`. Both files are tracked. Do not edit them directly.

When a token changes, update `tokens/tokens.json`. Run `npm run build:css` to regenerate both files. Run `node scripts/build-tokens.mjs --check` to detect stale outputs. CI runs `node --test scripts/design-tokens.test.mjs` before the build so that regeneration cannot hide stale files.

The `@theme` declarations provide the palette, font and semantic color variables to Tailwind and page styles. Use semantic variables such as `--color-paper`, `--color-ink` and `--color-rule` for shared surfaces and rules. `styles/approved-en.css` contains Home's layout, shell and shared geometry variables, including the reading width and page gutter.

## Shared elements

The English templates use `src/_includes/approved-en/header.njk`, `footer.njk` and `contact-icons.njk`. The header, footer and contact controls share the Home design. Contact controls use 44-pixel targets, visible focus and a solid background. Page content must leave room for the fixed controls.

`npm run build:approved-en` compiles `styles/approved-en.css` to `approved-en-assets/css/main.css`. It also runs `scripts/build-shared-shell.mjs`. That script derives `approved-en-assets/css/shared-shell.css` from the Home shell rules for pages using the legacy base layout. These compiled files are build outputs. Change the Home source rather than editing the generated shell.

Pricing has page-specific rules in `approved-en-assets/css/pricing.css`. FAQ and Conditions use `approved-en-assets/css/reference-pages.css` for their page structure, disclosures and print behavior. Their palette rules use shared color tokens. Preserve their hash targets and native disclosures when changing these styles.

The selected Tabler SVGs are static assets under `approved-en-assets/icons/tabler`. Their source and license are recorded alongside the assets. No browser icon library is required. The shared WhatsApp and Signal controls retain accessible names.

`scripts/restrained-motion.js` applies one-time Motion effects to Home situations and Pricing options. Content remains available without JavaScript. Reduced-motion settings disable the effects. Keep prices, links and contact controls usable before motion starts.

## Verify changes

Run `npm run build` for the default preview profile. Run `npm run check` and `npm run check:links`. Run `npm run check:content` to check content parity.

Run the production profile with `SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run build`. Use the same environment variables with `npm run check` and `npm run check:links`. Preview output is in `_site`; production output is in `_site-production`.

Run `npm run test:pricing` and `npm run test:pricing-inclusions` for Pricing changes. Run `node --test scripts/check-shared-shell.test.mjs` for shell changes. Run `node --test scripts/reference-colors.test.mjs` for FAQ and Conditions palette changes.

Run `npm run check:a11y` and `npm run check:perf` against each build profile. Run `npm run check:motion`, `npm run check:pricing-contact` and `npm run check:pricing-print` for affected behavior. Run `node scripts/check-shared-shell-browser.mjs` for shell changes. These checks need Playwright Chromium; the Pricing print check also needs `pdftotext`. To use system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its path.

Review keyboard focus, contact targets, responsive layouts, no-JavaScript content, reduced motion and print output. Automated axe checks do not replace manual screen-reader review. Use `docs/english-release-runbook.md` for release prerequisites and cutover.

## Proposed photographic standard — checkpoint review, 15 November 2026

Status: proposed, awaiting owner geometry approval. Existing Home, Situation and About compositions remain the authority. This section does not approve new assets or change published markup. Evidence, source measurements and slot decisions are in `docs/photography/selection.md`.

Use one future native Nunjucks `figure` / `picture` / `img` element and one photographic CSS source. Keep existing wrappers. Do not introduce a browser runtime or template framework. Logos and SVG icons remain outside this element.

| Variant | Container and crop | Relationship to text |
|---|---|---|
| `hero` | Existing full-width Home wrapper; 3:2, contain | Preserve existing title overlay and scrim |
| `scene` | Existing offset Home wrappers; desktop geometry unchanged; phone 1.14:1, business 1.08:1; cover | Preserve existing title panels and bleed |
| `situation-hero` | Full-width existing wrapper; existing responsive height; cover, centered | Preserve existing scrim and title |
| `section` | Existing content width; proposed 3:2, cover | Contained, outside text; no overlay |
| `card` | Featured Personal Shield tile, inside existing padding; proposed 3:2, cover | Below audience, above summary; outside disclosure |
| `portrait` | Existing About wrapper; square, maximum 320px | Preserve identifiable portrait and adjacent biography |

The future element requires a local fallback, intrinsic width/height, explicit alt (empty permitted), known variant, responsive sources, accurate `sizes` and loading priority. Default below-fold photographs to lazy loading; prioritize only the actual LCP image. Record focal positions in image data. Use mobile art direction only when approved crop evidence requires it. Keep essential prices, scope and contacts in HTML. Failed images must retain their reserved space. No new per-page ratios or viewport bleed without revising the contract.

The proposed new card and section share 3:2 but have different container widths. The section is proposed after the assessment explanation on How it works, before “Then, separately agreed protection.” Neither its location nor this standard has owner approval yet. Photo discovery and integration remain pending the composition checkpoint.

## Shared photographic element — existing placements

`src/_includes/approved-en/photo.njk` now renders existing photographic images. Import its `photo` macro and pass one properties object. The macro emits a direct child `img`. Existing figures, scrims, captions, grids and CSS keep their approved geometry. Logos and icons use their existing markup.

The `validatePhoto` Eleventy filter checks the properties during template rendering. Its implementation is `scripts/lib/photo.cjs`. A missing or invalid property stops the build.

| Property | Contract |
|---|---|
| `src` | Existing local photographic file under `/approved-en-assets/photos/` or `/assets/img/portraits/` |
| `srcset` | Existing local files with positive, unique width descriptors; one candidate is valid |
| `sizes` | Explicit, nonempty source-size expression matching the existing container |
| `width`, `height` | Positive integer intrinsic dimensions |
| `alt` | Explicit string; use an empty string for an atmospheric image |
| `variant` | `hero`, `scene`, `situation-hero`, `portrait`, `card` or `section` |
| `priority` | `high` for the page's LCP photograph; `lazy` below the fold; `eager` for the existing portrait |
| `className` | Optional existing image class |

`high` maps to eager loading and high fetch priority. `eager` maps to eager loading and automatic fetch priority. `lazy` maps to lazy loading, automatic fetch priority and asynchronous decoding. The portrait keeps its existing eager behavior because it appears at the start of About. Home scenes stay lazy. Only Home and Situation hero photographs receive high fetch priority.

Current Situation files are 900×1500 JPEGs; their source sets contain one candidate. The Home hero retains its existing 900/1536 WebP candidates and 1536×1024 dimensions. The portrait retains its 640×640 WebP. Existing CSS keeps all current centered focal positions. No derivatives or new photographic placements are added by this migration.

The `card` and `section` names reserve contract variants. They do not approve a photograph or add layout rules. Their proposed placements remain subject to the approval record above. New geometry must use one photographic CSS source when those placements are implemented.

Run `node --test scripts/photos.test.mjs` after building both profiles. The tests cover invalid contracts, local files, attribute escaping, direct child markup and both profiles' existing photographs.
