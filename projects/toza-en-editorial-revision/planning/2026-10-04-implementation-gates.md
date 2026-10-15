# English implementation gates — 4 October 2026

Authority: D-026; exact copy baseline aeb65a51adc3217844be9c465de69a875084b8e4. Implementation baseline 4a5803b6ff2f1a861e6b398e3586f38e7c9647c4. Existing branch editorial/toza-copy-harness and PR #51 are reused; main is unchanged.

## What changed

Eleven retained English templates are generated from the accepted copy through scripts/accepted-copy.cjs. The adapter strips only packet/image/link instructions, resolves specified PA links, turns Markdown anchors into HTML IDs, wraps tables and FAQ answers, and attaches the accepted channel controls. It does not rewrite approved marketing wording. The only added interface labels are FAQ expand/collapse and a mobile table scrolling hint. Ordinary Nunjucks HTML remains the production input; Markdown conversion is an authoring/check dependency, not client code.

Shared navigation, Latin wordmark, footer identity and metadata are updated. Every page owns one closing/contact target. WhatsApp uses the accepted neutral message; Signal uses its existing bare contact link, without assuming support for WhatsApp prefill syntax. No message was sent. Existing seal and portrait assets are retained. Prices and scoped descriptions match Shared Copy, including Inner Circle's minimum-price schema and unpriced bespoke work.

Hebrew marketing source is retained but excluded from a clean build and temporarily redirected to English. Hebrew legal content remains unchanged; labels identify its language and canonical URLs follow platform normalization. Russian remains unpublished. Three replaced English pages have permanent redirects; Controlling Relationship has a genuine neutral 410 with no sales footer. Canonical/OG/language declarations and sitemap use extensionless URLs because Pages redirects the accepted .html aliases to them.

## Completed gates

1. **Baseline:** original build and all original content/route/RTL checks passed. Original browser suite could not start until the pinned browser was installed; no baseline visual-pass claim is made.
2. **Exactness:** all eleven accepted blocks, protected effective PA and fifteen immutable fingerprints pass. All eleven rendered page bodies and title/description/social metadata pass browser comparisons. No accepted source or protected commercial fact changed.
3. **Build/contracts:** npm run verify:all passes. Clean build emits exactly eleven English pages, no Hebrew/Russian marketing output, and retains legal pages. Links, anchors, IDs, schema prices, stale claims, sitemap and CI no-preview-deployment guard pass. Existing Hebrew source/RTL safeguards are retained separately from published legal RTL checks.
4. **Browser:** 36 tests pass in desktop dark and mobile light. Checks include 320/640/768/1024 reflow, keyboard skip/menu/Escape, FAQ individual/group deep links and expand/collapse, semantic scrollable tables, portrait, neutral channel URLs, missing-resource/page errors, reduced motion and versioned asset references. Screenshots cover Home, Pricing, FAQ, Why, Assessment and Separation. Manual visual inspection covered desktop Home and mobile Pricing/Why; other page screenshots remain in the QA artifacts.
5. **Runtime:** scripts/verify-pages-runtime.mjs passes 78 checks against local Wrangler Pages 4.147.0. Tests cover old/new routes, Hebrew withdrawal, GET/HEAD retirement, redirects/fragments, legal routes, final canonical URLs, CSS and 404. A static file server alone does not certify these behaviors.
6. **Adversarial review:** the independent D-009 reviewer found a P2: trailing-slash aliases of three replacement routes returned 404. All six aliases were added, the runtime restarted, and the reviewer independently confirmed 301s and FAQ fragments. Final verdict PASS; no other actionable defect from the reviewed diff. The available Code Review plugin provides CI diagnostics only; its results must match the implementation commit before release.

## Performance and scope limits

No client framework, third-party analytics, form, chatbot or payment integration was added. Fonts and portrait are unchanged. Asset source sizes (uncompressed; line-ending differences can affect counts):

| Asset | Baseline bytes | Candidate bytes |
|---|---:|---:|
| assets/css/vault.css | 24686 | 29438 |
| assets/js/guilloche.js | 2751 | 2751 |
| assets/css/fonts.css | 2885 | 2885 |
| assets/js/site.js | previously inline | 1983 |

CSS and the extracted small interaction script use new versioned URLs so existing immutable browser-cache entries do not mask the update. Repeat navigation is tested. No field Core Web Vitals or comparative network-timing result is claimed. Complete final performance preflight before production approval if layout changes follow preview review.

## Remaining release sequence

1. Review the rendered preview, especially long Home/Pricing heroes and mobile comparison scrolling. Accepted copy is preserved; a requested copy change must be separately recorded.
2. Verify GitHub checks on the final head, production domain/current deployment and actual rollback deployment ID; main commit 5f8fbb8b21563fee3c1c802fe4c9914f74ede029 is recorded but is not represented as a verified Cloudflare rollback deployment.
3. Obtain final publication approval for the reviewed implementation. Merge PR #51 using the existing main-triggered workflow, then observe build/deployment completion.
4. Run the route/content smoke checks against production, verify contact targets without sending messages, capture deployment ID and confirm Hebrew withdrawal. Roll back to the recorded successful production deployment if a material regression is found.

No main merge or deployment has occurred. CI and deploy workflow files remain unchanged; no remote preview was published.
