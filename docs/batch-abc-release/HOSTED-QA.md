# Hosted preview QA

Status: PREPARED, waiting for the CI-confirmed restricted preview URL and final deployment commit. No hosted pass or screenshots are claimed yet.

`EXPECTED-BUILD.json` records the current public build, accepted-source fingerprints and all 11 rendered semantic fingerprints from the passing integration QA. The two checked CSS files are `clear-practice.css` and `visual-refinements.css`. The protected Assessment and unchanged Pricing, Separation and They Know Something pages are included in the complete HTML comparison. No `_site` file or production indexing header was changed to prepare these helpers.

Run the following with the immutable preview URL returned by the deployment provider and its complete 40-character commit SHA:

```powershell
node docs/batch-abc-release/verify-hosted.cjs --url https://DEPLOYMENT.toza-site.pages.dev/ --commit FULL_SHA
node docs/batch-abc-release/capture-hosted.cjs --url https://DEPLOYMENT.toza-site.pages.dev/ --commit FULL_SHA
```

The verifier requires exact HTML after CRLF/LF normalization only, exact DOM text/order/links/metadata, production canonicals, route-scoped CSS, exact CSS bytes, static security headers, a single exact global `X-Robots-Tag: noindex, nofollow`, extension aliases and the eight retired GET/HEAD variants returning 410 with exactly `noindex`. The retired function's existing security-header contract is checked separately; it does not currently emit Permissions-Policy. Provider commit provenance must be confirmed by the release orchestrator, since HTML does not independently identify the deployed Git commit.

The capture helper uses the real extensionless hosted routes after Pages alias redirects. It prepares fresh desktop/mobile openings, full pages and affected-region shots for the seven changed routes and protected Assessment, four widths for Home/Business, FAQ/Process first-message navigation, purchase-stage boundaries, keyboard/menu/contact/Back, print and reduced motion. It sends no messages. Final screenshots must be personally inspected before this report receives a rendered verdict. The separate existing 78-check hosted runtime gate is owned by the root integrator.

Limits: Chromium and CSS-pixel viewports; no Safari, physical-device, assistive-technology or customer validation. These read-only helpers neither publish nor merge anything. Main remains outside this preview-only scope.
