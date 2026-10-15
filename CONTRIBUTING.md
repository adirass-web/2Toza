# Contributing / Git workflow — Toza

Robust, reviewable process for this site.

## Branches
- **`main`** = production. Auto-deploys to the separate Cloudflare Pages project `toza-site` on every push. Never commit directly to `main`.
- Use short-lived feature branches, one per change.
- Open a PR into `main`; squash-merge when approved.

## Verification
- Every push to a non-`main` branch runs `Verify Toza site` automatically.
- Opening, reopening, or marking a PR ready for review also runs verification.
- Manual workflow dispatch is intentionally disabled.
- A merge to `main` reruns the full verification suite and deploys to Cloudflare Pages automatically.
- Verify JSON/config changes and inspect generated output for expected routes and content.
- Do not change layout, responsive behavior, accessibility, or i18n as part of copy-only changes.

## Current release constraints
- EN is the only published content tree.
- Fresh HE copy will be supplied and mirrored after EN is locked; RU follows HE.
- `Why Toza` stays local in both languages; only its clearly labelled professional-profile link points to https://cyberdrtabansky.com.
- There is no custom canonical domain yet; the current deployment target is the `toza-site` Cloudflare Pages project.
- Personal Shield and Inner Circle Shield remain part of the offer architecture.
