# PR 59 narrow provider-normalization independent review

**Verdict: PASS — ready to commit and push for exact-head hosted verification.** No remaining required code or documentation finding. The release paragraph now correctly identifies the fixed preview target and the read-only fixed production Home corroboration. Actual hosted PASS remains pending; no production publication is authorized.

Reviewed uncommitted script and release-documentation changes after `fc9c70a8a61ca2e900e6a16f0e4c03045c70ee24`. The unchanged workflow and CI contract are included below to pin the complete gate context:

| File | SHA-256 |
| --- | --- |
| `.github/workflows/preview.yml` | `faa01d8582169ef1f7e74d96510b4bece81f1fedf8e9f1a383563c2700da0256` |
| `scripts/verify-ci-contract.mjs` | `ab4cee8d5de39c1c351b7818bbd1513c34f363b881b7a56d4e3402a279d321a2` |
| `scripts/verify-hosted-marketing-02.mjs` | `d4cf566fba6c1fc49d335f6c27d67ad2a5f890afb63b1e5847822407546cfbd3` |
| `docs/marketing-02-release/RELEASE.md` | `57d30f88de5edb76e1c7df32205e162f2e1dbe90fb3aada88d700f3400d9832f` |

## Basis and scope

The real exact-head mismatch artifact independently establishes a single 214-byte provider insertion; byte-level removal reconstructs the complete local Home build. Literal SHA-256: `f41eec495ae60a06fee10f6470eaaca646917506aee9e020440a2a6e2c509f2f`. This exception addresses that observed delta only. It does not change client copy, analytics configuration, page assets, deployment credentials or the production workflow.

The implementation pins the full literal as a Buffer and asserts its hash. Expected source HTML cannot contain it. Raw-equal HTML passes directly; otherwise only one exact literal immediately before the sole closing body can be removed, by `Buffer.concat` over original byte slices. Every remaining byte must match the built file. No parsing, serialization, generic script stripping, whitespace normalization or text-only comparison occurs.

Before a normalized preview page can pass, the fixed production Home response must carry the same exact block in the same placement, and its remaining bytes must hash to the preserved original-main `BASELINE-OUTPUT.json` Home fingerprint. Missing/changed provider content or any production baseline drift fails. Production corroboration is cached only after this proof succeeds and recorded alongside raw and normalized hashes.

The only two fetch origins are fixed owned preview and production literals. Manual redirects must retain the selected origin; at most five redirects share the existing 15-second signal. No deployment token is introduced. Existing exact-head, preview status/final-origin, noindex/nofollow, security-header and 78-route assertions remain in place. All 58 built assets retain strict raw-byte comparison. Evidence records raw/build/compared hashes and whether the provider block was removed per file; production proof appears only when normalization is used.

## Focused independent checks

Syntax and CI contract pass. Thirteen local mutation cases passed expected outcomes:

- Raw-equal success checks all eleven HTML files and 58 assets without requesting production or marking normalization.
- Normalized success checks all eleven HTML files and 58 assets, one production corroboration, raw/build/compared hashes and per-file normalization flags.
- Wrong token, duplicate insertion, moved insertion, additional HTML and second closing body fail.
- Production wrong token, wrong baseline, missing insertion and foreign redirect fail; foreign origin is never contacted.
- Asset mutation and provider insertion in expected source fail.

Every failure exits nonzero without emitting PASS evidence. Machine-readable results: [PR59-NORMALIZATION-MUTATION-TESTS.json](PR59-NORMALIZATION-MUTATION-TESTS.json).

These are synthetic local tests: preview payloads derive from the real build, but HTTP, the production baseline fixture and route subprocess are mocked. They verify fail-closed logic and evidence construction. They do not establish actual production continuity or all-page hosted parity. The real exact-head job must still corroborate production, compare all served output and pass the hosted route gate. Earlier text extraction and local visual checks cannot substitute for that result.
