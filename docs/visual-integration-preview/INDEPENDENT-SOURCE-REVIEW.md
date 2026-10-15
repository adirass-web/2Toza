# Independent source review — approved visual integration

Date: 2026-10-13
Reviewer: independent UX/CRO and source review agent
Baseline: `2bc8f90` (`docs: review remaining visual gaps with same-copy concepts`)
Authority: D040; accepted-copy resolver and effective eleven-page authority; approved `FOCUSED-PLAN.md` and rendered concepts
Verdict: **PASS — no required source changes found.** This is a source review for the local preview, not authorization to publish.

## Scope and evidence

Reviewed the production diff in `scripts/clear-practice.cjs`, `scripts/home-pricing-narrative.cjs`, `src/_includes/layouts/vault.njk`, generated Home and Business templates, the new `assets/css/visual-refinements.css`, and `scripts/visual-refinements.test.cjs`. Also reviewed the proposed deployment plan at `projects/toza-en-editorial-revision/planning/2026-10-13-batch-abc-visual-deployment-plan.md`.

The reviewer independently ran the four focused tests: **4/4 pass**. `accepted-copy.cjs` authority assertion passed. A separate read-only comparison against HEAD checked all eleven generated templates in document order: heading, paragraph, list item, table-cell and caption text; ordered link text and destinations; and frontmatter metadata. All comparisons passed. The nine templates outside Home and Business were also identical after line-ending normalization.

No existing verifier, browser test, package manifest, lockfile or GitHub workflow changed in this integration. The focused tests are an additional manually executed suite; this review does not claim that existing CI automatically runs them.

## Copy, commercial meaning and route isolation

Business preserves the generic section heading outside the two groups. The Assessment group contains the existing visit label, ₪3,600 including VAT, inspection paragraph and independent summary paragraph in their original order. The complete Personal Shield paragraph follows in its own group. Its separate scope and price decision, including the complex or group situation qualification, remains attached to that paragraph. The existing final Assessment and pricing links remain last and unchanged. Emphasizing the existing words “Personal Shield” does not introduce copy or remove its qualification.

Home preserves the proactive introduction, primary pair, existing H3 roles, and original order. It wraps the two existing supporting paragraphs together, retaining their words and destinations. It does not invent supporting headings, promote the supporting choices to the primary heading hierarchy, or make the entire paragraph a new interactive control.

These changes preserve the accepted distinction between the paid Assessment and separately agreed hardening. They do not promise full hardening inside the Assessment price, guarantee an outcome, introduce urgency, or change professional authority. The protected Private Exposure Assessment template is unchanged. The other eight unchanged routes are Why Us, Pricing, FAQ, Process, Separation/Divorce, Surfaced Information, Inheritance and Attorneys.

## Adapter and style review

The Business adapter requires six paragraph-only blocks, verifies their expected sequence, verifies the label and fee exactly, verifies the complete Personal Shield ending qualification, and verifies both final link destinations. Unexpected target structure fails with an explicit mapping error. The Home adapter requires the expected introduction and primary pair followed by exactly the two approved supporting paragraphs, each with its expected destination. Unknown supporting content fails rather than being silently grouped by position alone.

The new tests exercise full paragraph and link order, intact primary-pair HTML, the Business group boundary and qualification, and representative malformed or missing target blocks. Existing tests and authority checks were not weakened. These guards supplement the authoritative copy and presentation gates; they are not a replacement for those gates or for visual review.

The shared layout requests `/assets/css/visual-refinements.css?v=visual-refinements-1` only on Home and Business. The asset has its own versioned URL. Selectors are scoped to the intended route and component; they use existing palette and type tokens. The production Home selector targets the actual `#situations` section. The Business narrow-width rules preserve the approved reading measure while extending the pale surface outward, including the smaller-gutter breakpoint. There is no new script, dependency, font, hidden qualification, reordered content, fixed-height clipping or animation.

Native links and headings remain native. No new focusable wrapper or altered keyboard order is introduced. Relevant interface-guidance checks here concern semantics, focus preservation, reflow and visible qualification; generic copy-style preferences do not override accepted Toza copy. Browser verification remains necessary for focus appearance, actual wrapping, zoom, print and rendered equivalence.

## Deployment-plan challenge

The plan correctly treats publication as a later, separately authorized action. It identifies the existing preview workflow's restricted branch condition; a skipped preview is not considered success. Any future workflow adjustment must narrowly admit the intended branch while preserving same-repository/head validation, secret handling, preview noindex/security controls and main-only production deployment.

It keeps optional maintenance PR #56 separate, requires refreshing main and reviewing the final combined diff, and accounts for expected A/B/C content changes separately from this two-route visual change. It requires hosted verification, owner review of rendered output, an explicit later publication decision, exact-head checks, post-merge live verification and a reviewed rollback. No deploy, push, merge, PR #54 action or maintenance merge is authorized by this review.

## Limits and handoff

This verdict covers the inspected integration source and the independently executed checks above. The root agent owns the broad build, audit and verification gates; the QA agent owns fresh integrated browser captures and checks. Earlier docs-only concept pixels were reviewed and approved, but they are not evidence that the integrated build renders identically. This document makes no new integrated pixel, real-device, Safari, assistive-technology, customer-testing or measured-conversion claim.

No required source finding remains. Release readiness still depends on the fresh integrated visual/quality evidence and the explicit publication authorization described in the deployment plan.
