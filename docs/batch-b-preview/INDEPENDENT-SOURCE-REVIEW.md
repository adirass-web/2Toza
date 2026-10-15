# Batch B independent source and authority review

12 October 2026. **PASS for the local preview source gate. Zero required findings.** This review grants no publication permission and does not approve the rendered result on the owner's behalf.

Reviewed the stable working-tree implementation on `codex/toza-trust-process-refinement` against Batch A baseline `c85f7fee6c8bb11e97711d33a93c2037a6ae876d`, after the explicit stable handoff and final build. The reviewer did not author the candidates, acceptance record, loader, templates, verifier or captures. This report is the only file written by this reviewer.

## Authority and scope

Read project AGENTS, locked architecture, doctrine, execution instructions, decision delta through D-036, consolidated v3, the approved 12 October execution plan, all four project Toza skills, the complete three EN-06 candidates, their additive acceptance manifest, ACCEPTANCE.md and historical independent review. Later D-020 governs public duration; D-035 accepts exact Batch B payloads; D-036 authorizes their local integration. Historical pending-owner labels are superseded records, not instructions to rewrite accepted copy or evidence of missing approval.

Scope is clean. The production-source delta is one additive acceptance-loader record and four approved paragraphs across three generated templates. The verification delta replaces an obsolete original-source expectation with stricter, explicit Batch B assertions. No CSS, JavaScript, layout, dependency, workflow, routing, contact destination, shared copy or browser test was changed. Accepted Batch A presentation and copy remain intact.

## Independent preservation checks

These checks were executed by this reviewer against the current files, rather than inferred from the earlier editorial PASS.

| Route | Exact approved SHA-256 reproduced | Changed source blocks, one-based |
|---|---|---|
| business-dispute | `9b469754dfd77fd463aab82e8f87aacf6e90b18dd5c85d41e05c2496e6706c82` | 9 and 25; 35 of 37 retained |
| inheritance-clash | `cca5d87db669ebf86ca1a8267604e6e5e9a5b481bc11af0a3ba265f16bb63b34` | 9; 38 of 39 retained |
| attorneys | `2d27f1dcc9ce69bee3faa1573e0243dc555e6607e226761195eae2e8f9762894` | 10; 38 of 39 retained |

For each target, source block counts are unchanged. Template front matter, complete heading markup and ordered anchor destinations/labels match the baseline. All metadata, prices, device scope, duration, purchase distinctions, authority/consent, exclusions and contact text outside the four approved paragraphs remain exact.

All eight other English templates match the baseline after CRLF-to-LF normalization. All eight other built HTML files match their preintegration snapshot byte hashes: Why, Pricing, FAQ, Process, Home, Separation, They Know Something and protected Assessment. This independently confirms preservation of both Batch A routes and PA, as well as the four-page release.

For the three changed routes, independently reversed each complete approved paragraph in the current built HTML. The result reconstructs the entire corresponding preintegration HTML with only CRLF-to-LF normalization. Thus the changed output contains no additional wording, metadata, shared markup or presentation change. The first raw-byte attempt exposed regeneration's line-ending change on these target pages; normalization alone resolves it. The eight unaffected outputs need no normalization and remain byte-identical.

Independently checked all 46 tracked historical approval, EN-05 and Batch A artifacts against the baseline with LF-only normalization. No historical acceptance or protected source was edited. `assertAuthority()` passes all historical accepted blocks, original source fingerprints, PA, the successive amendments and the complete Process stage map. `git diff --check` passes.

## Implementation and gate challenge

The loader's new record permits exactly `business-dispute`, `inheritance-clash` and `attorneys`. Existing route-list comparison and per-entry exact hash checks remain active; all earlier amendments retain validation even when a later approved source overlays a route. No new browser/runtime Markdown execution is introduced. The existing renderer still escapes Markdown input and generates ordinary templates.

The new verifier requires each target's effective source to equal the approved EN-06 payload. Every literal before and after paragraph must occur exactly once, and reversing the four nominated changes must recover each complete original accepted payload. Headings/anchors, links/counts and numeric facts are also checked. The three routes are removed from the generic original-source loop only after these narrow checks; the remaining original-source assertions still protect FAQ, Process and PA. Existing EN-04 and Batch A assertions are unchanged.

Executed directly:

- `node scripts/accepted-copy.cjs --check`: PASS.
- `node scripts/verify-copy-amendment.cjs`: PASS.
- `node scripts/verify-presentation.cjs`: PASS, all eleven pages, table associations, protected PA order and shared identity.
- Independent source/template/built-output comparisons described above: PASS.

The amendment and presentation verifiers remain required by `scripts/verify-hebrew-build.mjs`, which remains in `npm run verify:all`. No existing test or gate was disabled, weakened or converted to an unconditional pass.

Five adversarial mutations were executed entirely in memory: changed approved paragraph, changed title metadata, changed device allowance, changed fee and added unauthorized paragraph. Each produces an AssertionError. For this challenge, hash validation was deliberately isolated away and the fake candidate/effective source were kept equal, proving that the new literal reconstruction checks themselves reject drift rather than merely relying on the earlier hash check. No accepted file was modified for these tests.

Reviewed source fingerprints at handoff (raw SHA-256):

| File | SHA-256 |
|---|---|
| `scripts/accepted-copy.cjs` | `376fd9f9bc8fabe7fd86f55f601aadfb1500ff73350d18758681ebaf4d155c18` |
| `scripts/verify-copy-amendment.cjs` | `fc970743384aab4947ff170467bc6acf47d5bd5d49b6ce21484b5dc8d24511e0` |

## Public-promise challenge

Business still describes possible confidential exposure without asserting misconduct. Concrete shared-access/sign-in/recovery work remains in the separately agreed Personal Shield paragraph; lawful authority, scope, material approval and no corporate-security/investigation boundaries remain exact. No company-wide remediation or uninterrupted-service guarantee appears.

Inheritance still concerns the client's own correspondence and finances, with conditional access and explicit limits on estate entitlement and another person's accounts. Attorneys retains client authorization, consent to disclosure, counsel's legal role and the non-forensic/non-evidence boundary. Clearer technical decision-making is supported by explanation and approval, not a promised legal result.

All three retain nontechnical qualification, paid hands-on Assessment and voluntary separately purchased hardening. The Assessment fee, VAT, two-device allowance, typical duration, qualified urgent first aid and independently useful summary are unchanged. Direct senior delivery, client presence, credentials, permission and practical teaching remain the operating proof. No new service fact, scarcity, accusation, guarantee, formal deliverable or hidden purchase commitment was introduced. No copy rewrite or owner fact decision is required.

## Evidence boundaries and stale-artifact disposition

The historical EN-06 79-check draft result and earlier independent review were read as provenance only. The draft checker intentionally excludes later acceptance records and was not rerun as an implementation gate. The historical Batch A checker also treats these three routes as unchanged and writes its old result file; it was not used for Batch B. Fresh `preintegration-baseline.json` and current built bytes supply the preservation evidence above.

Read the current implementation record and browser-suite log. Team evidence reports final `npm run verify:all` exit 0, existing browser suite 56/56, audit policy PASS with the same two documented upstream advisories, and audit-policy tests 6/6. The reviewer independently read the browser completion and current capture-check PASS, but did not rerun the full team suites. Audit PASS is not a claim that the dependency tree has no vulnerabilities.

This is an independent Toza source/authority and adversarial implementation review. The installed generic review skill was read, but its required `checklist.md` is absent from both installed skills roots; full generic `/review` workflow completion is not claimed. The required fresh project review was still performed under current owner authority. Actual visual inspection and interaction assessment belong to the separate rendered review; this report does not claim browser, physical-device, Safari, assistive-technology or customer validation.

**Required findings: 0. Unresolved authority conflicts: 0.** Local preview source gate passes. No push, PR #54 change, merge or deployment was performed by this reviewer or authorized by this report.

## Archival staging recheck

Before the local commit, reviewed the sole archival attributes addition at `preintegration/.gitattributes`: `*.html -text -diff`. The rule is scoped to HTML snapshots in that archive directory and its descendants. It prevents Git line-ending conversion of the captured baseline bytes; it changes no production template, accepted payload, test or browser behavior.

Independently read all eleven snapshot blobs from the Git index using `git show :<snapshot-path>`, hashed their raw bytes and compared each with `preintegration-baseline.json`: **11/11 PASS**. `git check-attr --cached` confirms `text` and `diff` are unset for these eleven snapshots, while both remain unspecified for the sampled production template, browser test and sibling preview gallery. `git diff --cached --check` passes. The binary archive diff setting does not replace source review: the complete relevant source diff and snapshot content comparisons were already inspected above. No additional finding; the source verdict remains PASS. Browser tests were not repeated for this archive-only change.
