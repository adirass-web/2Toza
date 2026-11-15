# English launch baseline

Recorded 14 November 2026 for branch `launch/english-mvp`. Product baseline: `codex/toza-preview-integration` at `4bde3e9303ad89435efcbb1fd6ac0d95220bbabe`; plan commit `57d8e89`. Checked remote heads: `build/g` at `7081277d3160d4e4c6ef4df1ad43617c3de064db` and `main` at `553eddcd14078df21056fa7b743beb461c924799`. Recheck before release.

## Newer main material

Main commit `553eddc` adds five portrait files, preserved under `assets/img/portraits/` in this branch. Its change to the legacy shared hero is not applied: the approved English preview has a separate locked About template, so applying that change there would alter the selected presentation. Main's portrait README records the owner's 8 November selection for the website; confirm how that newer selection should apply to the locked About page before release.

## Baseline checks

On the product baseline plus the copied portrait assets: `npm ci --cache /tmp/toza-npm-cache`, `npm run build`, `npm run check` and `node scripts/check-content.mjs` passed. Approved-English check: 183 assertions, no errors. Content parity: 100% both ways. Warnings: two existing colour literals and one literal `30 days` in Conditions. The build emits 13 root/English pages and three design-study HTML files in `/assets/previews/`; the latter must be excluded from the production artifact.

## Routes

English content: `/en/`, `/en/about/`, `/en/attorneys/`, `/en/business-dispute/`, `/en/conditions/`, `/en/exposure/`, `/en/faq/`, `/en/how-it-works/`, `/en/inheritance-conflict/`, `/en/pricing/`, `/en/separation-divorce/`, `/en/they-know-something/`. Root `/` redirects to `/en/`. Existing English legacy redirects are listed in `_redirects`.

Frozen VIP baseline `63cda10` includes English and Hebrew page slugs: `attorneys`, `business-dispute`, `commercial-spying`, `faq`, `index`, `inheritance-clash`, `leaving-controlling-relationship`, `not-it-support`, `pricing`, `private-exposure-assessment`, `private-investigator`, `separation-divorce`, `they-know-something`, `what-happens-during-the-visit`, and `why-us`. Include both published extension and extensionless forms when inventorying and mapping current legacy URLs; inspect live production before finalizing redirects. This frozen source is not proof of current live routes.

## Deployment evidence and limitations

The candidate's `.github/workflows/deploy-preview.yml` can deploy `main`, `design/**`, and PR builds to the `toza-v2` Pages project. Frozen VIP commit `63cda10` contains `.github/workflows/deploy.yml`, triggered by pushes to `main`, targeting `toza-site`. The exact current production writer, branch settings, project bindings, previous deployment and live domains require read-only verification before cutover; the frozen file is evidence of a writer to investigate, not proof it is still active. HTTP access to `https://toza-site.pages.dev/` returned a proxy CONNECT 403 in this environment, so current content and redirect responses were not verified. No deployment or production configuration was modified.

## Profile-aware verification commands

The checks select `_site` by default and `_site-production` when `SITE_ENV=production`; production checks require `SITE_URL=https://toza-site.pages.dev`. After building each profile, verify the corresponding artifact with:

```sh
npm run build
npm run check
node scripts/check-content.mjs
npm run check:links
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run build
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run check
SITE_ENV=production SITE_URL=https://toza-site.pages.dev node scripts/check-content.mjs
SITE_ENV=production SITE_URL=https://toza-site.pages.dev npm run check:links
npm run test:production-checks
```

`test:production-checks` requires both builds and temporarily corrupts and restores only the production output, proving the production copy, facts and link checks do not silently inspect a stale preview. Browser checks also select the output through `SITE_ENV`.
