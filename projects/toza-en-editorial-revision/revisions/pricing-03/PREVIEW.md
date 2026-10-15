# Review the Pricing proposal

Open `preview/index.html` locally, or serve the preview folder:

```sh
cd /workspace/toza-execution/projects/toza-en-editorial-revision/revisions/pricing-03
node preview/build.cjs
python3 -m http.server 8794 --bind 127.0.0.1 --directory preview
```

Then view `http://127.0.0.1:8794/`. This is a local, review-only prototype, not a published website. The Python server must be run in an execution environment with authorized local network access.

To repeat the local browser checks, leave the server running and use:

```sh
PLAYWRIGHT_BROWSERS_PATH=/workspace/.cache/ms-playwright node preview/check.cjs
```

The build uses the already installed Markdown parser and browser tooling under `/workspace/toza-release/node_modules`; it does not install packages or load remote assets. Font, logo and current shared styles are copied into `preview/assets`. Non-Pricing source links remain their exact canonical paths, so they resolve on the real website rather than within this single-page prototype; the WhatsApp/Signal controls retain the current canonical destinations. Do not send a test message as part of review.

Review artifacts:

- `preview/screenshots/pricing-1440-full.png` and `pricing-1440-viewport.png`
- `preview/screenshots/pricing-390-full.png` and `pricing-390-viewport.png`
- `preview/screenshots/pricing-320-full.png` and `pricing-320-viewport.png`
- `preview/screenshots/matrix-1440.png`, `matrix-390.png`, `matrix-320.png`
- `preview/screenshots/journey-1440.png`, `journey-390.png`, `journey-320.png`
- `preview/checks.json`: local designer checks, not an independent approval
- `preview/build-manifest.json`: frozen inputs, metadata and output fingerprint

For comprehension review, ask a reader to identify the full Personal/Inner price, the first payment, conditions for the remaining payment, per-person device allowance, included network difference and the separate decision after Assessment. Record correct answers, uncertainties and willingness to request a suitable conversation. Later production measurement should count qualified enquiries and paid Assessments/full engagements, with a recorded baseline; screenshots and word count alone do not establish commercial improvement.
