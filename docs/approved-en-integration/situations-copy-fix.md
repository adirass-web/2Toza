# Situation descriptions and full-page links

4 November 2026. Owner reported missing copy under the situation blocks and asked to change it. The prior Home implementation rendered photo/title only and did not carry over the lead copy already present on the full repository situation pages. Existing dedicated situation pages already had substantial copy; they were not empty.

## Fix

Home now reads the exact resolved first hero lead for Separation/divorce, Business dispute and Inheritance conflict from existing `siteContent` source pages. No newly written claims or rewritten locked prose. Each title links to its existing full route. The text sits under the title on the existing grey reading panel; approved photographs and alternating physical sequence are retained.

Changed UI source: `src/_includes/approved-en/en-situations-cta.njk` and `approved-en-assets/css/en-continuation.css`. Test/source mapping: `situation-copy-source-map.json`, updated Home allocation fixture and focused assertions. Dedicated situation pages, full Pricing, FAQ, Conditions, Hebrew behavior and legacy assets are unchanged. No merger/production action.

## Verification

Build and npm check pass117assertions. New checks cover3exact source leads and3canonical title links; existing protected outputs pass exact-byte mode. Legacy content parity remains100%. Six responsive widths3203603907689601440 pass new copy/links, photo loading/placement, overflow, no-JS channels and skip focus; scoped axe0violations0incomplete. SOL inspected desktop/mobile situation captures: readable body text below headings and restrained overlap. Final reports/captures are in the original review workspace `aspen-compositions/captures/situation-copy-fix/`.

Preview publication and independent review recorded below when complete.

## Published and verified

Preview: https://6088309d.toza-v2.pages.dev/en/#situations . Deployment6088309d-5293-4f18-9b18-0397a3624d3a is Preview on `codex-situation-copy-20261104`. All20selected routes/assets, including the3full situation destinations, returned200, matched final local SHA256 and carried noindex/nofollow/noarchive/nosnippet. Production-filtered record confirms841bb44a-975c-4ac1-acaa-ddb80e774e67 remains onmain. Evidence: situations-copy-remote-verification.json, situations-copy-deployments.json, situations-copy-production.json and situations-copy-artifact-manifest.json.

Independent scoped LUNA review found no blockers: exact existing leads, correct clickable title routes, readable390/1440panels, approved photo alternation, protected outputs unchanged. No new copy was invented. Build,117focused assertions, exact-byte protected mode and final6width browser checks pass; scoped axe has0violations0incomplete. Source code remains uncommitted/unmerged in the managed worktree. Stop for owner review; no production change.
