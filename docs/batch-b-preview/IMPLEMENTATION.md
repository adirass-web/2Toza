# Batch B local implementation

Date: 12 October 2026. Branch: `codex/toza-trust-process-refinement`. Baseline: `c85f7fee6c8bb11e97711d33a93c2037a6ae876d`. Authority: D-035 exact-copy acceptance and D-036 local implementation approval.

## Implemented scope

Added a fourth additive amendment record in `scripts/accepted-copy.cjs`, restricted to `business-dispute`, `inheritance-clash` and `attorneys`. All previous amendment records, route allowlists, historical hash/fingerprint checks, protected Assessment validation and Process stage-map validation remain active.

`npm run sync:copy` changed only the three approved generated templates: two Business paragraphs, one Inheritance paragraph and one Attorneys paragraph. Existing presentation, CSS, JavaScript, shared copy, metadata, links and service facts remain unchanged. Historical pending-owner labels in candidate wrappers are superseded by EN-06/ACCEPTANCE.md and are not public copy.

## Approved payloads

| Route | Exact-copy SHA-256 |
|---|---|
| business-dispute | `9b469754dfd77fd463aab82e8f87aacf6e90b18dd5c85d41e05c2496e6706c82` |
| inheritance-clash | `cca5d87db669ebf86ca1a8267604e6e5e9a5b481bc11af0a3ba265f16bb63b34` |
| attorneys | `2d27f1dcc9ce69bee3faa1573e0243dc555e6607e226761195eae2e8f9762894` |

All three literal approval hashes match both the additive manifest and the complete extracted approved blocks, including metadata. Normalization is CRLF to LF, exact-copy block extraction, trim at block end and one final LF.

## Fresh baseline and parity

Before changing the loader, a clean `npm run build` saved all eleven `_site/en/*.html` files to `preintegration/` and their byte hashes to `preintegration-baseline.json`. `unchanged-pages.json` records the current comparisons. Baseline snapshot integrity and final verified-build hashes pass for all eleven pages. The eight unaffected routes have identical HTML bytes and unchanged source templates against the baseline commit. They include both accepted Batch A pages and protected PA.

| Route | Result | Baseline HTML SHA-256 | Final HTML SHA-256 |
|---|---|---|---|
| why-us | BYTE IDENTICAL | `25e8bc4309a45b44a8d91d5efc615743cf25b40ca294576122c213590db228c2` | `25e8bc4309a45b44a8d91d5efc615743cf25b40ca294576122c213590db228c2` |
| pricing | BYTE IDENTICAL | `0bf00a845db4e8a6ff5988abc2a3069dbc5e536f1e4ba3223100a8f874776b7c` | `0bf00a845db4e8a6ff5988abc2a3069dbc5e536f1e4ba3223100a8f874776b7c` |
| faq | BYTE IDENTICAL | `520282b1e1e1a8b019beded7351d9269cf5b9f748b245803182572ad1c5ab066` | `520282b1e1e1a8b019beded7351d9269cf5b9f748b245803182572ad1c5ab066` |
| what-happens-during-the-visit | BYTE IDENTICAL | `61d576e0ac6decc365e7f5aa7da42fbdacc040c4bf4251fdf6133129e5a7b7d9` | `61d576e0ac6decc365e7f5aa7da42fbdacc040c4bf4251fdf6133129e5a7b7d9` |
| index | BYTE IDENTICAL | `5f606eb9e5357f58a44bd52d8b331fbce12e568adb7c62b067e4c926c82b52d0` | `5f606eb9e5357f58a44bd52d8b331fbce12e568adb7c62b067e4c926c82b52d0` |
| separation-divorce | BYTE IDENTICAL | `6cfde8e51f46e9352905e2d234c442ca96d0d2462808e1096c7fb7ed42624520` | `6cfde8e51f46e9352905e2d234c442ca96d0d2462808e1096c7fb7ed42624520` |
| business-dispute | APPROVED COPY CHANGE | `6e6801f39a360e9e92488693d7f7b57b7e6ec80cd016580a3e8bfb6ba717c67d` | `d262826c2fdb3ff34b8c287b0847a64bf5371bcab24f517b5662e99cc21d6c16` |
| they-know-something | BYTE IDENTICAL | `d0ef73da8aae36059b18670250ca736815a1c32e41eb9ea695917fcb1747ce0a` | `d0ef73da8aae36059b18670250ca736815a1c32e41eb9ea695917fcb1747ce0a` |
| inheritance-clash | APPROVED COPY CHANGE | `d31f9bd74390a31430667ee9d8c1c3d19091d6affc1785c23e4c53f9a55131c7` | `7d37118aa7065746074fa4f1c0688902d16379e5d8b5d07a9fc293bd66d30410` |
| attorneys | APPROVED COPY CHANGE | `e53fa9719f9a345a1205c0f819c57b3ddb4f7d3fdaadff045e5ff7708cfbf430` | `f533bb0550bc69f1be5f0277fad4ac09cba42b5fb55f05e0494b21e2cbf8d002` |
| private-exposure-assessment | BYTE IDENTICAL | `7f7ca1bd9531ec394a6008af5989002e1f65baeace88c9d44391cd3fcf4892ae` | `7f7ca1bd9531ec394a6008af5989002e1f65baeace88c9d44391cd3fcf4892ae` |

Additional parity checks passed: all historical accepted source fingerprints and PA source; all four prior approval manifests unchanged from baseline; all changed-route front matter and anchor href/label inventories unchanged. Historical Batch A artifacts and its old check-unchanged script were preserved. That historical script was not executed because its old nine-route scope now includes the three authorized Batch B targets.

## Actual quality results

| Executed gate | Result |
|---|---|
| Node runtime | 24.14.1 |
| Preintegration clean build | PASS, 11 English HTML pages |
| `npm run sync:copy` | PASS, only three generated templates changed |
| `node scripts/accepted-copy.cjs --check` | PASS, accepted authority and template fidelity |
| Postintegration clean build | PASS, 11 English HTML pages |
| `node scripts/verify-presentation.cjs` after build | PASS, 11 exact-copy pages, table associations, protected PA order, shared identity |
| `npm run verify:all` final run | PASS, exit 0; publication/source, presentation, amendment, Hebrew mirror, retirement, RTL, links/anchors/language discovery and CI contracts |
| `npm run audit:tools` | PASS existing policy: 9 affected packages, 2 documented unpatched upstream advisories, no additional advisories |
| `npm run test:audit-policy` | PASS, 6/6 tests |
| Fresh baseline/authority/metadata/link parity | PASS; 8 untouched route byte comparisons and 11 final-build fingerprints |

The audit retains GHSA-vfj7-8cjw-p6xm (braces) and GHSA-hp3w-g68c-fv3c (sprintf-js). No dependency or package-lock upgrade was included; this is not a vulnerability-free audit claim.

The first full verification exposed an existing hardcoded original-source expectation for Batch B in `scripts/verify-copy-amendment.cjs`. The root integrator updated that separate owned verifier with strict literal four-paragraph reverse assertions: exact effective source, unique occurrences and complete reconstruction of each original approved payload, plus unchanged headings, links and facts. Final `npm run verify:all` passed using those assertions. A presentation check run before the postintegration build saw old `_site` output; the fresh-build rerun passed. Neither failure was bypassed.

## Stable handoff and remaining review

The final `npm run verify:all` build is stable; no further build or generation is performed after the handoff. Root owns the browser suite and rendered evidence, and the independent reviewer owns actual source/rendered review. Their results belong in their separate current review records; they are not inferred from source fidelity here.

This work is local preview implementation. No commit, push, PR #54 change, main merge or deployment was performed by the implementation worker. Publication remains on hold for the owner’s later release instruction.
