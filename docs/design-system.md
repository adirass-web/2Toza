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
