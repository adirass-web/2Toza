# English MVP release runbook

The owner executes production cutover. Preview: `toza-v2`; production: existing `toza-site`; canonical URL: https://tozasecurity.com. Do not use this runbook until the final approved site, accessibility statement, remaining manual accessibility checks, and owner acceptance are complete.

## Prerequisites

1. Confirm actual Cloudflare account, project names, project production branch, domains, redirects, current deployment and credentials through a read-only account query. Record the current production deployment ID and URL and verify it is available for rollback. The managed environment used to prepare this branch could not reach Pages (proxy 403), `gh auth status` reported an invalid token and Wrangler was not authenticated. Historical evidence: frozen VIP commit `63cda10` contains `.github/workflows/deploy.yml` targeting `toza-site`; this is not proof it is the active writer. Identify the actual current writer before cutting over.
2. Configure repository Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The token must have access to the existing `toza-site` Pages project. Confirm its scope before release; the workflow fails if either secret or project access is missing. This release uses repository-level credentials and has no GitHub production-environment approval gate.
3. Merge the reviewed candidate to `main` under the repository's existing rules. Wait for a successful **Verify** push run on that exact `main` SHA; a pull-request run or older SHA cannot be released. Find its run ID and artifact `toza-verified-<run ID>-<attempt>`; artifacts expire after 30 days. Verify includes tests and creates both preview and production archives from the same checkout.
4. Confirm the immutable noindex `toza-v2` preview is the intended version. Owner verifies appearance, WhatsApp and Signal on a real phone, approved content and accessibility-statement wording. Confirm legacy redirect mappings, including Hebrew and anchors, against current production and known external backlinks; only the frozen legacy baseline was audited.
5. Make a final record of the current `toza-site` deployment ID, custom-domain bindings and old deployment writer. Immediately before cutover, disable the old writer through its actual owner-controlled repository/workflow and confirm it cannot overwrite `toza-site`. Do not delete old source or deployment.

## Owner cutover

1. On GitHub Actions, run **Owner production release** on `main`, supplying the successful Verify push run ID and exact 40-character `main` commit SHA. The workflow checks the run, provenance and artifact digest, then checks that `main` still equals the verified commit immediately before deploying the downloaded production archive to `toza-site`. It does not rebuild. An inaccessible API, missing secret, failed project check or changed main stops the release.
2. Record the new Cloudflare deployment ID, release SHA, Verify run and artifact digest.
3. Verify HTTPS and the main English routes, pricing and contact channels; check `robots.txt`, `X-Robots-Tag`, canonical URLs and `/sitemap.xml`; test root, legacy English and Hebrew redirects, key FAQ fragments and an unknown 404. Confirm the prior writer remains disabled.

## Rollback

If core routes or contact channels fail, or production indexing settings are incorrect, use the Cloudflare Pages dashboard to roll back `toza-site` to the recorded prior successful production deployment. Confirm the live URL and routes return to the expected prior behavior and keep competing deployment writers disabled until the owner selects the next action. Record the incident, rollback deployment ID and result. If a dashboard rollback is unavailable, an authorized owner may redeploy the retained prior verified production artifact using the account's approved method; do not reconstruct an old release from an unverified working tree.
