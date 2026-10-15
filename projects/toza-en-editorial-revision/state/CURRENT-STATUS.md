# Current Project Status

Updated: 15 October 2026 (Asia/Jerusalem). **Pricing-04 is published and verified through PR #60, content-release merge 91e52ee. Production workflow 38692509885 verified all 11 pages, 61 assets and 78 routes. Exact accepted Pricing-04 is the baseline for later line edits; ten other pages and the compact footer remain unchanged. Documentation-only cleanup may advance main without changing this content.**

## Released baseline

| Release | Main commit | Scope |
|---|---|---|
| [#52](https://github.com/adirass-web/VIP/pull/52) | ed8d06aba134132b9832e46df2771fb0aaecbdba | Approved Clear Practice design and logo |
| [#53](https://github.com/adirass-web/VIP/pull/53) | e78a85c66ac001455ae7759e5346c3a14f6113d6 | Node 24, Eleventy 3, Playwright 1.64 and maintenance |
| [#55](https://github.com/adirass-web/VIP/pull/55) | 6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f | Home, Pricing, Separation and They Know Something |
| [#57](https://github.com/adirass-web/VIP/pull/57) | d9933223984cce6a5f3c56e80e9803aa92cca788 | Batch A/B/C copy, Process stages, Home rows and Business groups |
| [#56](https://github.com/adirass-web/VIP/pull/56) | 7844b8406e040605bd8169c7935810ea8a6e7947 | Maintenance and installed Pages runtime gate |
| [#58](https://github.com/adirass-web/VIP/pull/58) | 81a11a12c49eefd124c54bd2da227e0f815b083b | Shared footer spacing and cache version |
| [#59](https://github.com/adirass-web/VIP/pull/59) | b4e918eeaa045cdeb5e9efc8be650aaef9dc1d47 | Marketing-02 Home/Why/Pricing and compact shared footer |
| [#60](https://github.com/adirass-web/VIP/pull/60) | 91e52ee8a8b6d9191a609c5353ac068445bc7147 | Approved Pricing-04 visual comparison and paid-stage journey |

PR #56 merged as 7844b8406e040605bd8169c7935810ea8a6e7947 with unchanged public output. Production workflow 38386253114 and eleven-page content/header/asset, 78-route and desktop/mobile verification passed; see V:/TOZA hardening biz/release-evidence/pr56-deployment. The formerly separate footer release subsequently merged through #58; its production workflow 38388147576 succeeded, confirmed against current main on 14 October. This is deployment-history evidence, not a new full live-site inspection. #51 merged earlier. PR #54's useful presentation is superseded by #55/#57; its open draft is not a missing release. This reconciliation does not close or modify it.

## Effective accepted authority

The original EN-02 approval and protected Assessment remain fingerprinted in approved/acceptance-manifest.json. Additive authority applies in order:

- approved/acceptance-amendment-2026-10-10.json (EN-03).
- approved/acceptance-amendment-2026-10-10-round-02.json (EN-04: four pages).
- approved/acceptance-amendment-2026-10-12-batch-a.json (Why Toza and Process stage map).
- approved/acceptance-amendment-2026-10-12-batch-b.json (Business, Inheritance and Attorneys).
- approved/acceptance-amendment-2026-10-13-batch-c.json (FAQ and Process links).
- approved/acceptance-amendment-2026-10-14-marketing-02.json (published exact Home, Why Toza and targeted Pricing; D-049/D-050/D-053).
- approved/acceptance-amendment-2026-10-15-pricing-04.json (exact Pricing-04 copy, metadata and visual wording; D-055).

Use scripts/accepted-copy.cjs pages()/assertAuthority() to resolve effective sources. Historical packets and the v3 specification cannot undo later approvals. Service facts, original sources, manifests and protected Assessment remain unchanged. Eleven English pages are published; Hebrew marketing is retained but unpublished, legal documents remain accessible, and Hebrew/Russian localization is deferred.

## Published marketing-02 baseline and Pricing-04 release

The owner selected all three frozen pages, requested the compact footer and then explicitly instructed “publish PR #59”. Personal Shield's typical 7–14 work hours exclude the additional Assessment; included work days remain unchanged. The published Pricing retains its purchase-scope table and approved delivery matrix. See docs/marketing-02-release for the reviewed integration and /workspace/toza-release-evidence/PR59-PRODUCTION-RELEASE.md for publication evidence.

Reviewed head 829faf7 and merge b4e918e share Git tree 1ff5011cff65a3b1798c060ba31883526e0a0432. Production deployment 38576940753 and read-only live verification 38577883285 passed: eleven HTML pages, 59 assets, indexing/security headers, exact robots output and 78 routes. The footer occupied desktop area is 25.5% of its prior height. Seventy-five prior public files reconstruct their exact original hashes after removal of only the new footer stylesheet link from supporting-page HTML; main content and protected Assessment remain exact. The existing remote editorial/toza-copy-harness branch and PR #54 are preserved.

D-052 explicitly reopens Pricing only: copy specialists first, then layout/visual design, one main comparison with labelled vector icons, prospect decision diagram and modular CSS ownership. Independent source and rendered reviews pass; the complete owner packet, prototype, screenshots and immutable source fingerprints are stored in revisions/pricing-03. That Pricing-03 proposal awaited owner approval at D-052; D-054 and D-055 subsequently produced and accepted Pricing-04. D-053 publication of #59 did not itself substitute the then-unapproved proposal.

D-054 produced the reviewed Pricing-04 proposal, following the owner's “show don't tell” direction and official consumer-software tier research. Pricing-03 and Pricing-04 review packets remain historical evidence. Their original pending-approval labels describe the review moment; D-055 now supplies exact owner acceptance and publication authority.

The accepted source hashes are recorded in the new 2026-10-15 amendment. Production uses scripts/pricing-layout.cjs, assets/css/pricing-04.css and assets/js/pricing-04.js, with existing site.js retaining navigation and print ownership. Full main-text/link parity with the accepted review composition, all 93 ordered source blocks, seven comparison rows and actual quantities are checked. The exact Assessment allowance and remaining-group mapping stay visible. All 79 prior non-Pricing output files match #59; the ten other pages and protected Assessment remain exact. Independent release review and GitHub checks belong to docs/pricing-04-release. Reviewed head 940b182 and merge 91e52ee share tree f63a0bd74e96ac26904e238372677dd402d2354b. Hosted preview attempt 2 and merge-specific production both passed 72 file comparisons and all 78 routes; see docs/pricing-04-release/RELEASE.md. Later wording changes require a new revision.

## Release evidence and limits

PR #57 reviewed head 62857d15331f4c06e30d12ef2ada2d9133bc6379 and merge d993322 share the identical Git tree. The [production workflow](https://github.com/adirass-web/VIP/actions/runs/38379886644) succeeded. Recorded checks include eleven-page parity, exact Git-blob CSS, indexing/security headers, 78 live routes, 56 browser tests, four focused regressions and independent desktop/mobile inspection. Evidence resides in V:/TOZA hardening biz/release-evidence/pr57/production. This records prior release evidence rather than a new live-test claim.

The Code Review/GitHub 300-file PR-diff retrieval limit was recorded alongside complete local review. Two upstream advisories remain under the strict audit policy; this is not a vulnerability-free audit. Chromium checks do not establish Safari, physical-device, assistive-technology or conversion performance.

## PR #56 reconciliation

Development tooling, one shared 78-check gate and guidance are reconciled against #57. Retain its exact preview branch/SHA restrictions, indexing and security safeguards, focused regressions and synchronize trigger. Pin Wrangler 4.150.0, matching the recorded production tool, with local compatibility date 2026-10-06; do not change the production project compatibility setting.

Fresh install, audit, build, browser, runtime and public-output parity gates passed on a70f384. The owner separately authorized publication; PR #56 is now merged and verified. Do not bundle footer spacing, old #54 content, translations, service-fact changes or legacy-asset cleanup. No branch or PR deletion is authorized. A reviewed release revert must preserve independent maintenance; never force-reset main.
