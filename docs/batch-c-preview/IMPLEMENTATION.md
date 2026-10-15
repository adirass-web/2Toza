# Batch C local implementation

Date: 13 October 2026. Branch: `codex/toza-trust-process-refinement`. Baseline: `9b128422c55d3a91f71bc7d2f241809460429245`. Authority: D-038 and EN-07/ACCEPTANCE.md, following the owner’s “approve. proceed”.

## Implemented scope

Added a fifth additive approval record in `scripts/accepted-copy.cjs`, whitelisted only for FAQ and How Toza helps. All prior manifest/route/hash/fingerprint and protected Assessment checks remain active. Batch A’s Process stage-map file, original copy source and provenance hashes remain unchanged; D-038 authorizes only the later contact-link addition.

`npm run sync:copy` changed only `src/en/faq.njk` and `src/en/what-happens-during-the-visit.njk`. Each gains one native link, labelled **What should I send in the first message?**, in its existing contact ending. FAQ points to `#what-should-i-send-in-the-first-message`; Process points to `/en/faq.html#what-should-i-send-in-the-first-message`. The existing question/disclosure and hash handling provide the destination; no CSS, client JavaScript, global layout, dependency, shared surface or service fact was changed.

## Approved authority and strict assertions

| Route | Exact approved SHA-256 |
|---|---|
| faq | `1128e453d6edd13c5c9cbca026239b8c2176fbcce64db686d0b495257e1e5eea` |
| what-happens-during-the-visit | `55a6c0e3c2c26475fd843f4f822a6ff77c6798e14af28b6f821ea40d638fe8dd` |

`scripts/verify-copy-amendment.cjs` now validates the literal two approved route/path/hash records, exact overlay selection, unique paragraph occurrence and placement in contact. Removing only the exact inserted Markdown paragraph reconstructs each entire prior payload, including metadata, byte for byte after the existing LF normalization. It additionally checks all old links plus exactly one new target, original link order, all headings/anchors, numeric facts and tables. The existing guidance question must remain unique. Previous EN-04, Batch A, Batch B and protected Assessment assertions remain active. The former original-source assertions for FAQ/Process are replaced by these narrowly approved complete-payload reconstruction assertions.

## Fresh baseline and preservation evidence

A fresh clean build before edits captured all eleven HTML byte hashes in `preintegration-baseline.json` and raw target HTML files in `preintegration/`. The snapshot directory’s `.gitattributes` disables text conversion and textual diffs for these HTML evidence files. Historical Batch A/B preservation scripts were not executed because their former unchanged-page scopes include targets approved in later batches.

`unchanged-pages.json` records nine untouched HTML byte hashes and templates unchanged against the baseline, including accepted Batch A/B pages and protected Assessment. All five prior approval manifests, protected/historical source fingerprints, Assessment source and accepted Process stage map match the baseline after the project’s CRLF-to-LF normalization.

For the two changed pages, removing the exact rendered link plus the renderer’s one additional blank separator reconstructs the complete prior generated template and rendered HTML after CRLF-to-LF normalization. This is a normalized content comparison, not a claim that the changed pages have identical raw bytes. FAQ’s preintegration checkout body used CRLF; regenerated output uses LF. Raw snapshot hashes remain unchanged and explicitly recorded. No content other than the approved link changes.

| Route | Result | Baseline HTML SHA-256 | Final HTML SHA-256 |
|---|---|---|---|
| why-us | BYTE IDENTICAL | `25e8bc4309a45b44a8d91d5efc615743cf25b40ca294576122c213590db228c2` | `25e8bc4309a45b44a8d91d5efc615743cf25b40ca294576122c213590db228c2` |
| pricing | BYTE IDENTICAL | `0bf00a845db4e8a6ff5988abc2a3069dbc5e536f1e4ba3223100a8f874776b7c` | `0bf00a845db4e8a6ff5988abc2a3069dbc5e536f1e4ba3223100a8f874776b7c` |
| faq | APPROVED LINK; normalized reversal PASS | `520282b1e1e1a8b019beded7351d9269cf5b9f748b245803182572ad1c5ab066` | `da70667ce323f44e1550565219084eea8c165150e61fc7fb0f361c4d47440a64` |
| what-happens-during-the-visit | APPROVED LINK; normalized reversal PASS | `61d576e0ac6decc365e7f5aa7da42fbdacc040c4bf4251fdf6133129e5a7b7d9` | `e71b4951ba6ae20f97aefa4d724b451c27bcba6ad1a418e64abf60ad2be007c5` |
| index | BYTE IDENTICAL | `5f606eb9e5357f58a44bd52d8b331fbce12e568adb7c62b067e4c926c82b52d0` | `5f606eb9e5357f58a44bd52d8b331fbce12e568adb7c62b067e4c926c82b52d0` |
| separation-divorce | BYTE IDENTICAL | `6cfde8e51f46e9352905e2d234c442ca96d0d2462808e1096c7fb7ed42624520` | `6cfde8e51f46e9352905e2d234c442ca96d0d2462808e1096c7fb7ed42624520` |
| business-dispute | BYTE IDENTICAL | `d262826c2fdb3ff34b8c287b0847a64bf5371bcab24f517b5662e99cc21d6c16` | `d262826c2fdb3ff34b8c287b0847a64bf5371bcab24f517b5662e99cc21d6c16` |
| they-know-something | BYTE IDENTICAL | `d0ef73da8aae36059b18670250ca736815a1c32e41eb9ea695917fcb1747ce0a` | `d0ef73da8aae36059b18670250ca736815a1c32e41eb9ea695917fcb1747ce0a` |
| inheritance-clash | BYTE IDENTICAL | `7d37118aa7065746074fa4f1c0688902d16379e5d8b5d07a9fc293bd66d30410` | `7d37118aa7065746074fa4f1c0688902d16379e5d8b5d07a9fc293bd66d30410` |
| attorneys | BYTE IDENTICAL | `f533bb0550bc69f1be5f0277fad4ac09cba42b5fb55f05e0494b21e2cbf8d002` | `f533bb0550bc69f1be5f0277fad4ac09cba42b5fb55f05e0494b21e2cbf8d002` |
| private-exposure-assessment | BYTE IDENTICAL | `7f7ca1bd9531ec394a6008af5989002e1f65baeace88c9d44391cd3fcf4892ae` | `7f7ca1bd9531ec394a6008af5989002e1f65baeace88c9d44391cd3fcf4892ae` |

## Actual executed gates

| Gate | Result |
|---|---|
| Fresh preintegration `npm run build` | PASS, 11 pages |
| `node --check scripts/verify-copy-amendment.cjs` | PASS |
| `npm run sync:copy` | PASS, only two approved templates changed |
| `node scripts/accepted-copy.cjs --check` | PASS, all authority and generated-template fidelity |
| `node scripts/verify-copy-amendment.cjs` | PASS, strict exact-link additions and retained earlier assertions |
| Fresh postintegration `npm run build` | PASS, 11 pages |
| `npm run verify:all` | PASS, exit 0: accepted authority/template, publication, presentation, amendment, Hebrew copy, retirement, RTL, public links/anchors/languages and CI contracts |
| `npm run audit:tools` | PASS existing policy: nine affected packages, two documented unpatched upstream advisories, no additional advisories |
| `npm run test:audit-policy` | PASS, six of six tests |
| Baseline/final parity and authority checks | PASS, nine raw untouched routes; two normalized full reversals; all prior approval/source/stage-map checks |
| Final artifact fingerprint recheck | PASS, 11 of 11 |
| `git diff --check` | PASS |

Audit residuals remain GHSA-vfj7-8cjw-p6xm (braces) and GHSA-hp3w-g68c-fv3c (sprintf-js). No vulnerability-free audit claim or package upgrade is made. Modern-web-guidance search and HTML retrieval informed the existing native anchor pattern. The four project Toza skills and prior architecture/doctrine/execution rules remain applicable with later owner-approved authority.

## Stable handoff

The final full-verification build is stable. The implementation worker performs no further clean build or generation after notifying root. Root owns the existing 56-test browser suite; separate reviewers own independent source and actual desktop/mobile rendering. Their results belong in their current review/capture records and are not inferred from this implementation report.

Local integration only: no commit, push, PR #54 change, main merge or deployment performed by this worker. Owner review and separate publication authorization remain later gates.
