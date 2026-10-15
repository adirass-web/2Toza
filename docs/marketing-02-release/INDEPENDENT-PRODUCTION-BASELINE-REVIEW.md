# Production baseline branch — independent design assessment

**Design acceptable; final implementation and hosted verdict pending.** Commit `3881881` reached the preview normalization but failed the production probe because the exact pinned block was absent. That does not establish either raw baseline equality or another token; no actual production behavior is assumed.

A production response can be accepted directly when its raw SHA-256 equals the preserved main Home fingerprint. Set `providerAlreadyOnProduction: false` only after that equality succeeds. Otherwise accept only one same exact pinned insertion immediately before the sole closing body, remove it at byte level and require the remaining full payload to equal the preserved baseline. Record `providerAlreadyOnProduction: true` only after those conditions succeed. Missing/unknown/changed production differences remain errors; capture only public production HTML diagnostically when needed.

The preview exception remains supported by the observed real preview artifact, with the full 214-byte literal/hash pinned. It permits no different token, script, count, placement or other HTML delta. Every asset remains raw exact; headers, routes, status, origin and PR-head checks remain unchanged. Production baseline continuity is a separate proof and must not be described as corroborating provider presence on production in the raw-equal branch.

Required wording changes include release documentation, console output, assertions and evidence strings referring to “production-corroborated provider insertion.” Describe the observed pinned preview insertion and independently verified production baseline instead. This changes no source/UI, analytics setting or production content.

Focused final tests should verify raw-production baseline success and false presence flag; pinned-production baseline success and true presence flag; unexpected raw production content, changed token, duplicate/moved block and foreign redirect failure; preview other HTML and asset mutation failure; no PASS evidence on failure. Actual served output remains pending.

## Final implementation disposition — supersedes design-only status above

**PASS — ready to commit/push and run the real exact-head hosted gate.** No remaining required issue in the reviewed correction. Actual hosted verification and production state remain pending; this review authorizes no production publication.

Reviewed three uncommitted files after `3881881`: hosted checker, preview artifact upload path and release documentation. The unchanged CI contract is pinned as context. Exact final fingerprints:

| File | SHA-256 |
| --- | --- |
| `.github/workflows/preview.yml` | `5660214c4df1995c4b6b6a6b9bd89c8000b1c017825af33ef77e31a2e81c2cbd` |
| `scripts/verify-ci-contract.mjs` | `ab4cee8d5de39c1c351b7818bbd1513c34f363b881b7a56d4e3402a279d321a2` |
| `scripts/verify-hosted-marketing-02.mjs` | `b0dde2d065c2d77eb05bc1a9a6af99ce4295cb33b3591a8ef57b2a04e38f8b72` |
| `docs/marketing-02-release/RELEASE.md` | `fe50a8346b7a7d71bd035a5110b41cfb00af4579530ad7b61f3fd4af6a20d779` |

The production probe accepts raw SHA-256 equality with the preserved main Home baseline before setting `providerAlreadyOnProduction: false`. Otherwise it captures only public production HTML, final URL and baseline digest for diagnosis; then the exact same pinned block must be removed in the exact same count/placement and the remaining byte hash must equal that baseline before presence is set true. Unknown raw bytes, tokens, duplicate/moved blocks and other baseline differences fail. No generic production normalization is introduced.

Preview removal remains limited to the previously observed 214-byte literal, with full expected-source byte comparison afterwards. Assets remain raw exact. Existing PR-head, fetch/status/origin/redirect limits, security headers, noindex/nofollow and route gates remain intact. Only the public production mismatch artifact path was added to the existing upload step; credential scope is unchanged. Release wording now distinguishes the observed preview insertion from separate production baseline continuity.

A minor conditional-console issue found in review is resolved: a raw-equal preview run that requires no production probe no longer claims production continuity verified. Console success claims that proof only when the corroboration object exists.

Independent syntax and CI-contract checks passed. Eighteen focused synthetic mutation cases passed expected outcomes: raw preview success without production probe; normalized preview with raw production baseline success/false presence flag; normalized preview with pinned production baseline success/true flag; unknown raw production bytes, changed production token/baseline, duplicate or moved production block, foreign production redirect; wrong/duplicate/moved preview block, extra preview HTML or closing body; changed asset; pin in expected source; missing indexing header; routing failure. Every failure exited nonzero without emitting PASS evidence; no foreign origin was contacted. Successful synthetic cases verified eleven HTML entries, 58 raw asset entries and raw/build/compared hashes.

The final conditional-console change was retested in all three success forms. Evidence: `PR59-PRODUCTION-BASELINE-MUTATION-TESTS.json`, with final script fingerprint and explicit synthetic scope. HTTP, the production fixture/baseline and route subprocess were mocked; actual production equality/presence and hosted parity are **not** established by these tests. The real job must still obtain that evidence against its exact committed PR head.
