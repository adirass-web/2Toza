# PR 59 hosted-gate incremental independent review

**Verdict: PASS — scoped follow-up is ready to commit and push for exact-head hosted CI.** No remaining required findings. This is implementation review readiness, not proof that the new hosted gate has run successfully, and does not authorize production merge or deployment.

## Reviewed scope

Base HEAD: `95e87a04083a8e3ac602bb9883b74af18dbf99f0`. Reviewed exactly the four uncommitted files below. Editorial sources, public assets, build output, prior rendering checks and production workflow were outside this incremental change; broad unchanged tests were not repeated.

| File | Reviewed SHA-256 |
| --- | --- |
| `.github/workflows/preview.yml` | `1ab184eb08271795345a7ce2535e776c97454010c4e0da2ff3864b10a63bcdba` |
| `scripts/verify-ci-contract.mjs` | `ab4cee8d5de39c1c351b7818bbd1513c34f363b881b7a56d4e3402a279d321a2` |
| `scripts/verify-hosted-marketing-02.mjs` | `1325667935e5a823b92fd4cf5fa64b0ccb5ccc54f76edbdb5dffa361101ac1e3` |
| `docs/marketing-02-release/RELEASE.md` | `d72e7a6493478f52faec9a3635be4b220f15bad84fdea25e88143d26ba26d607` |

## Findings and disposition

- **Resolved required correction:** the first implementation followed redirects automatically before checking final origin. The final fidelity fetch uses manual redirects, validates each destination against the fixed preview origin before requesting it, accepts at most five same-origin redirects, cancels accepted redirect bodies, and shares one 15-second abort signal across the chain. Legitimate Pages HTML aliases remain supported.
- **No remaining blocker, major or moderate finding:** the step follows deployment, is conditional on the reviewed marketing branch within the existing same-repository three-branch job gate, and checks the exact checked-out PR head against trusted workflow `PREVIEW_HEAD_SHA`. Evidence distinguishes that head from the GitHub workflow event SHA. It receives no deployment token; the deployment credential remains scoped to the existing deployment step. Production remains main-only.
- **Fail-closed result:** successful status, exact local-build bytes, retained final preview origin, noindex/nofollow and the four specified security headers are required for all eleven HTML pages and all built assets. The existing 78-route gate must then complete successfully. PASS JSON is written only after all these conditions pass. No user/event URL is interpolated into fetch targets or shell code; the preview destination is a fixed owned isolated origin, and paths come from accepted pages and local build assets.
- **Bounded execution:** git revision lookup is limited to ten seconds; each fidelity request/redirect chain to fifteen seconds; readiness retries have a bounded propagation window (a final in-flight request may extend beyond its 45-second retry deadline); requests run in batches of six; the route subprocess is capped at two minutes. The README correctly describes bounded checking rather than a precise total duration.
- **Claim discipline:** the release paragraph describes the prospective gate and its failure behavior. It does not claim that hosted byte/header/asset verification already passed. The fixed branch alias can move; matching every fetched file to this exact-head build causes an intervening incompatible deployment to fail rather than be accepted as this build. Existing route-gate behavior is retained, including checking the external founder redirect manually without fetching that profile.

## Verification and limits

Independent `node --check scripts/verify-hosted-marketing-02.mjs` and `node scripts/verify-ci-contract.mjs` passed on the final hashes above. Initial local fault injections exercised altered bytes, missing headers, changed final origin, non-200 status, route-gate failure and PR-head mismatch; each failed without PASS evidence. Those tests preceded the redirect-only correction; unchanged assertions were inspected again in the final source.

Four focused redirect cases were rerun on the final script: same-origin alias succeeds; foreign target fails before contact; absent Location fails; excessive loop fails after the bounded chain. The alias reused its abort signal and cancelled its redirect body; the loop cancelled five accepted redirect bodies. All expected exits and evidence suppression assertions passed.

These are synthetic local HTTP/subprocess tests, explicitly labelled as such. They are not served-preview verification. Evidence:

- `PR59-HOSTED-GATE-FAULT-INJECTION.json`: initial fail-closed tests.
- `PR59-HOSTED-GATE-REDIRECT-TESTS.json`: final redirect tests.
- `MOCK-REDIRECT-*-CALLS.json`: recorded requests and cancellation counts.

The earlier connected-web check verifies 219 text blocks in order only. The actual raw HTML, all 58 asset byte comparisons, material headers and hosted 78-route gate must still pass in the newly committed exact-head preview job. No live hosted PASS is asserted by this review.
