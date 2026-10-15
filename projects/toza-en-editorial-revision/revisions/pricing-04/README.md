# Pricing 04 review prototype

This is a standalone, unpublished proposal. Open `preview/index.html`, or serve it locally:

```sh
cd /workspace/toza-release/projects/toza-en-editorial-revision/revisions/pricing-04
node preview/build.cjs
python3 -m http.server 8796 --bind 127.0.0.1 --directory preview
```

View `http://127.0.0.1:8796/`. The build uses the existing Markdown parser under `/workspace/toza-release/node_modules`; it installs nothing. Assets are copied locally and no external fonts or libraries load. The local server needs the executor's authorized network permission.

With that server running, repeat checks:

```sh
PLAYWRIGHT_BROWSERS_PATH=/workspace/.cache/ms-playwright node preview/check.cjs
```

Review `DESIGN.md`, the frozen `pricing.md` and `VISUAL-COPY.md` together. Read all six complete-reference and two inline method/implementation disclosures, and test deep links and keyboard focus. The exact credit condition is visible before and immediately after the core matrix. The compact method/summary and device/key/record/practice scenes preserve the independently useful Assessment, safe-first-aid/completion and voluntary continuation facts. Exact non-Pricing source links remain canonical paths; this single-page server does not host those other pages. Contact controls retain the real Toza destinations, so do not send a test message as part of review.

Screenshot files in `preview/screenshots` cover each of 1440px desktop, 390px and 320px mobile:

- `pricing-WIDTH-full.png` and `pricing-WIDTH-viewport.png`
- `matrix-WIDTH.png`
- `journey-WIDTH.png`: Assessment method and practical-summary illustration
- `hardening-WIDTH.png`: implementation and OpSec practice

The main comparison crops are captured from scroll zero so sticky headings do not obscure rows. `preview/build-manifest.json` records the source/visual/output fingerprints; `preview/checks.json` records local designer verification. Measured full-page heights (including header/footer) are 5,332 / 8,213 / 9,345px at 1440 / 390 / 320px; the main visible path is 864 words. These are smaller than the initial expanded Pricing-04 render but remain larger than Pricing-03. Independent review is separate. This is not a deployment preview or production release approval.
