# Toza — next editorial and design execution plan

Date: 12 October 2026, Israel. Status: **OWNER-APPROVED PLAN — Batch A candidate work authorized under D-032; later batches remain scheduled.**

This plan continues the recorded backlog after the four-page release. It does not accept unseen replacement wording. Each new exact-copy version and rendered preview must pass its corresponding approval gate; publication requires release authorization for that batch. The authorization used to publish #55 applies to that completed release.

## 1. Starting point and source of the plan

Production baseline: `6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f`, PR #55. Maintenance #53 is included through `e78a85c66ac001455ae7759e5346c3a14f6113d6`. Home, Pricing, Separation and They Know Something are published with approved EN-04 wording. Seven other English pages retain their prior accepted wording. PR #54 remains open/draft at its original head and is not the vehicle for this work.

The priority order comes from these actual documents:

- `V:/TOZA hardening biz/conversion-research/07-LANDING-PAGES-ICP-AND-SITE-ALIGNMENT.md`, 10 October: remaining page roles and Wave 1/Wave 2 priorities.
- `V:/TOZA hardening biz/conversion-research/05-TESTED-RANKED-PLAN.md`, 10 October: measured presentation problems, lightweight enquiry baseline, and interviews explicitly optional.
- `V:/TOZA hardening biz/design-reassessment/RANKED-DESIGN-GAPS.md`: later reading-burden and artisan-brand refinements.
- `V:/TOZA hardening biz/design-reassessment/PREVIEW-SKILLS-AND-ROLES.md`: selected CRO/design roles and external skill sources.
- Project `AGENTS.md`, locked architecture, doctrine, execution instructions, calibration, decision delta, v3 specification and accepted manifests.
- `docs/four-page-copy-preview/RELEASE.md` and #55's final published-and-verified PR record.

Some older documents still carry proposal, local-only or pre-release labels. Preserve their historical meaning. Use later explicit owner decisions and the deployed baseline to determine what is complete. Do not rerun the original six-phase editorial project as though the accepted corpus were still unapproved.

### Recommended approach

Use **small staged batches**: Why Toza + How Toza helps; then Business + Inheritance + Attorneys; then FAQ/corpus alignment. Apply visual refinements to the current system once the relevant page hierarchy is settled. This limits conflicting copy changes and makes owner review manageable.

Alternatives considered:

| Approach | Benefit | Cost / limitation |
|---|---|---|
| Staged batches — recommended | Clear dependencies, compact reviews, independently releasable improvements | Multiple bounded review/release cycles |
| Rewrite all remaining pages together | One corpus-wide editing pass | Larger approval burden and harder diagnosis of drift |
| Pause site work until customer interviews | Could add useful independent evidence | Participants are unavailable; contradicts the saved non-blocking research decision |

## 2. Assumptions and fixed authority

The audience remains Israel-based private individuals, mostly female, mid-high income through HNW; any gender may need the service. Some clients do not know they face relevant digital risks. A dispute or known intrusion is not required. Attorney/adviser readers are a distinct referral audience. Hebrew adaptation remains a later workstream.

The central persuasive argument remains concrete: private information can be used against a person; access can outlast the trust or arrangements that created it; expert interpretation, agreed technical changes and personal teaching give the client more deliberate control. Make both pain and improvement explicit. Quiet premium expression must retain this meaning.

Preserve all current service facts through the accepted manifests and current Pricing source, including prices/VAT, device/person/network scope, keys, support, credit, urgency, completion, records and exclusions. The Assessment remains hands-on inspection/diagnosis with approved urgent first aid where safely possible within scope, independently useful and separately purchased from full hardening. Conversation remains qualification without technical work. Personal threat modelling remains a method, not a newly promised formal deliverable.

Preserve credential control, approval of material changes, participant confidentiality/consent, practical habits and teaching, and the approved no-monitoring/no-security-software statements. No invented Toza results, prevalence, exclusivity, guarantees, invisible changes, forensic attribution or legal advice. Owner-reported mechanisms are firsthand input with limits, not permission to publish attack recipes or claim commonness.

The protected PA-01-v2 remains S0/C0. Historical corpus and manifests remain immutable. New approved versions use additive records. Existing Home/Pricing/Separation/They Know wording changes only if a specific new proposal is separately approved.

## 3. Model tiers and responsibilities

These are proposed routing preferences using model IDs exposed in this session, not claims about comparative accuracy, prices or availability on another host. Confirm supported models and reasoning settings at execution. If a preferred model is unavailable, use the current workhorse with a fresh independent reviewer and report the substitution.

| Tier | Preferred model / reasoning | Assignments | Limits |
|---|---|---|---|
| T1 — strategic and adversarial | `gpt-6-astra`, high; xhigh for a difficult authority/claim conflict | Page strategy, founder-proof interpretation, sales/UX challenge, final independent copy red team, consequential release review | Does not invent facts or grant owner approval |
| T2 — production workhorse | `gpt-6.1-sol`, high for copy/implementation; medium for bounded integration | Drafts, ten-sweep editing, information architecture, frontend work, browser QA, PR preparation and integration | Writer cannot supply its own independent approval |
| T3 — mechanical support | `gpt-6-luna`, low/medium | Read-only file inventories, source tables, diff summaries, link/check-result inventories, report formatting | No final authority judgment, persuasive rewriting, approval, credential handling or merge/deploy decisions |

Default to T2 for most work. Use T1 when the task depends on judgment rather than volume: reconciling founder credibility with client benefit, legal/authority implications, or challenging a polished argument. Prefer executable assertions over paying any tier to estimate whether facts match.

Escalate T2 to T1 when there is an unresolved interpretation affecting a public promise, repeated failure to preserve a qualification, two unsuccessful correction cycles, or material disagreement between reviewers. Repeated stylistic preference alone does not justify more models or rewriting.

### Team structure

Use four simultaneous slots at most: integrator plus three specialists. Sequence strategy → writing → editing → independent review; parallelize only independent page work or independent reviews.

- **Integrator / lead editor:** owns authority, batch plan, cross-page consistency, approval state and merge readiness.
- **Strategist / sales-UX lead:** owns each page's argument, proof map, reader journey, density budget and section map.
- **Writer or frontend implementer:** owns explicitly assigned candidate files or presentation modules. Workers must respect other edits and never revert them.
- **Independent reviewer:** receives the actual current artifact, source authorities and verification evidence; has not written the copy/layout being reviewed. Produce findings before fixes.

During implementation, use a frontend owner and a separate browser/visual reviewer. These are AI specialist roles; do not describe them as external human experts, customer interviews or market validation. No new user-owned chat is needed for routine subtasks.

## 4. Skill selection

| Work | Required / selected skill | How it is used |
|---|---|---|
| Page strategy | Project `toza-copy-strategy` | All 14 required outputs: authority, objective, arrival/departure, argument, proof, boundaries, emotion, premium signal, architecture, cuts, CTA, prohibited claims, factual questions |
| Drafting | Project `toza-copywriter` | Write only from the settled page brief; preserve current authority |
| Editing | Project `toza-editor` | Sequential ten sweeps: clarity, voice, relevance, proof, specificity, emotion, friction, prestige, density, human credibility; metadata afterward |
| Independent copy gate | Project `toza-copy-red-team` | Authority, credibility, risk, premium, repetition, founder value, scope and CTA challenges |
| Plan/layout preparation | `brainstorming`, `design-consultation` | Use the existing approved business/design brief and scoped choices; avoid restarting general discovery |
| HTML/CSS/client JS | `modern-web-guidance` before implementation | Check current applicable guidance; preserve the existing Eleventy/Nunjucks foundation |
| Actual rendered design review | `design-review`, `web-design-guidelines` | Inspect the current preview on multiple widths, including component semantics and interaction |
| Browser QA | `qa-only`, `playwright` and existing repo suites | Real rendered interaction evidence; report failures, fix in the owning implementation task |
| Source/PR review | `review` | Base-branch diff, gate integrity and independent adversarial inspection |
| Publication | `land-and-deploy`, GitHub connector; Code Review diagnostics where available | Reviewed-head checks, merge authorization, main-only deployment and live verification |
| Optional future aggregate analytics | `analytics-tracking` | Only after a separately approved measurement design; manual counts do not need tracking code |

Previously selected online CRO and frontend-design sources remain optional supporting frameworks. Read and pin the relevant source revision before reuse; do not claim an uninspected current version or install whole collections. Toza authority overrides framework suggestions for urgency, testimonials, guarantees or recommended-plan badges. No model or generic skill can reopen protected copy.

## 5. Phase 0 — establish the next batch baseline

**Owner:** integrator, T2; T1 for actual conflicts.

1. Inspect current remote main, PR/release status and clean local state. Confirm #55 is still the deployed baseline or account for any newer merged changes.
2. Resolve page sources through the current acceptance loader/manifests. Do not read EN-02 as current authority for the four EN-04 routes.
3. Save accepted-source hashes, metadata/link inventories, protected Assessment hash, table/terms register and baseline screenshots for the affected pages.
4. Record only genuine unresolved authority conflicts. Historical doctrine's dispute-only framing and terminology cannot undo later proactive/privacy/hardening decisions.
5. Plan candidate storage under `revisions/en-05/` for this next round. This path is proposed; create it when drafting is authorized. Keep exact-copy payloads distinct from review notes.
6. For implementation, create or reuse an isolated branch from current main. Proposed name: `codex/toza-trust-process-refinement`. Do not use #54. Record the specifically authorized implementation scope before editing generated templates.

**Gate G0:** known baseline, sources and authority; no unquarantined factual conflict; assigned file ownership; protected/unchanged surfaces listed. Deliver `00-BRIEF.md` and a baseline/fact register.

## 6. Batch A — Why Toza and How Toza helps

### A1. Why Toza: trust that explains the value of this expert

**Proposed intervention:** S1/C1–C2, subject to the actual findings. Retain the personal note and first-person voice. Existing accepted copy already explains direct delivery, client benefit and teaching; diagnose the remaining gap before writing.

**Strategist T1; writer/editor T2; independent red team T1.**

- Identify which current passages explain why Dr. Tabansky's judgment matters to this person's private life, and which only repeat the service or biography.
- Connect relevant verified experience to interpretation, priorities, dependencies and the actual changes performed. Preserve the explicit professional-profile link and authentic portrait.
- Improve warmth and personal consequence where supported. Avoid converting the note into a catalogue of danger scenarios or generic credentials.
- Distinguish direct professional experience from results delivered by the new Toza business. Verify any newly proposed credential at its original source; quarantine unsupported additions.
- Keep the opening's client relevance, founder rationale, client-gain sections, client control and clear contact path. Use fewer repeated explanations when a canonical link supplies adequate detail.

**Acceptance task:** a headings/opening scan shows why this person, what becomes better, what work is performed and how to start. A reader does not have to infer the value from a biography. The evaluator must cite the exact visible passages; this is a heuristic, not a customer test.

### A2. How Toza helps: make the service experience easy to follow

**Proposed intervention:** S2 for presentation; C0 initially, then only C1/C2 where the layout cannot resolve a concrete omission. The approved page already has three stage headings and eight steps. Improve their visual relationship before proposing new wording.

**Service/UX lead T2 with T1 challenge; frontend T2; independent rendered review T2.**

- Map existing steps 1–2 to first conversation/offer; 3–5 to paid Assessment; 6–8 to separately agreed full engagement.
- Use one coherent vertical sequence and clear stage grouping. Avoid eight equal cards, repeated mini-pitches or a diagram that implies mandatory continuation.
- Keep the first visit's inspection, diagnosis, urgent-first-aid qualification and summary visible together. Preserve the summary's independent value even if no further service is bought.
- Show what full hardening and teaching enable in daily life, using current exact wording. Make separate acceptance and current credit conditions clear where mentioned.
- Keep adjustment support and optional later services distinct. Preserve scope, consent, client credential control and urgent arrival terms.
- If a stage heading, caption or outcome sentence genuinely needs new words, present that exact proposed unit for approval. A new visual label counts as wording.

**Acceptance task:** the current rendered page lets an evaluator correctly identify what contact includes, what the Assessment includes and costs, what requires another agreement, what the client approves, what remains usable/learned afterward, and how to request contact. Each answer must be traceable without opening optional detail for an essential qualification.

### A3. Batch A copy gate and owner packet

**G1 — strategy:** all 14 strategy outputs complete; single page job; section decisions KEEP/SHORTEN/LINK/MOVE/DELETE/REWRITE; proof and boundaries settled. No draft handed off with an unresolved public-promise conflict.

**G2 — editorial:** ten sweeps, metadata review, exact numeric/commercial checks, link inventories and cross-page repetition map. Preserve distinctive page voices. Zero unresolved blocker/major copy defect. Optional observations are logged without automatically reopening everything.

**G3 — independent review:** challenge risk/benefit clarity, founder proof, service-stage boundaries, scope, privacy, fear/overclaiming and quiet premium character. Accept only findings consistent with present authority. Fix and recheck required findings on the current candidate.

**G4 — owner exact-copy approval:** maximum five change bullets per page, full exact proposed copy including metadata, material before/after passages and only unresolved decisions. Offer alternatives only for a meaningful unresolved choice; keep unselected variants outside accepted payloads. Record approval and additive hashes before integration.

## 7. Batch B — Business, Inheritance and Attorneys

Start after Batch A's language and stage logic are settled. Each page keeps its own mechanism, emotional setting and job. Strategy briefs and source analysis can run in parallel; final corpus alignment is sequential.

| Page | Proposed intervention | Required improvement | Distinct boundary / QA focus |
|---|---|---|---|
| Business / Founder Dispute | S1–S2/C2 selectively | Show how personal devices, identities and delegated/shared business access can expose private decisions and confidential information; show performed hardening and considered changes | Authority to change access, continuity/dependencies; no corporate fraud investigation, ownership adjudication or enterprise audit promise |
| Inheritance Conflict | S1–S2/C2 selectively | Connect family help and accumulated access to the client's privacy and deliberate choices; preserve warmth and avoid presuming hostile relatives | Client's own authorized environment; no entitlement to an estate or another person's accounts/data |
| For Attorneys | S1/C1–C2 selectively | Make referral triggers, client benefit, consent, coordination and appropriate next action immediately scannable | Referral is not client consent; findings shared only with authorization; record is not evidence/certification or legal strategy |

**Models:** T1 strategy/red team; T2 writing/editing/implementation; T3 fact/link inventories. **Skills:** the same four Toza skills, then design/browser/release skills for approved implementation.

For Attorneys moves ahead only if the owner identifies attorney referrals as the immediate acquisition priority. Otherwise use Business → Inheritance → Attorneys. This is an explicit scheduling assumption, not a claim about measured lead sources.

**Deliverables:** three complete candidate packets, page differentiation test, protected-fact comparison and updated cross-page terminology/links. Apply G1–G4 to each page. Do not clone Separation's narrative onto the other situations.

## 8. Batch C — FAQ, shared surfaces and corpus alignment

**Owner:** lead editor T2; T1 independent challenge where public promises are involved. **Skills:** Toza Editor and Red Team; Copy Strategy/Copywriter only for an authorized wording change.

- Align limited terminology, changed section links and stage explanations after A/B. Preserve accepted FAQ length unless a specific redundant unit is proposed for removal.
- Check shared contact/trust wording, navigation, footer, structured descriptions and `llms.txt` for actual consequences of approved changes. Do not rewrite unchanged surfaces simply for stylistic uniformity.
- Retain one complete contact ending per page; verify sensitive first-message guidance and channel destinations.
- Recheck all eleven English pages for contradictions, semantic duplication, recognisable page roles and metadata/body agreement. Retain the proactive client invitation.
- Run protected Assessment consistency/link checks only; flag an issue instead of silently editing it.
- Preserve retired-route responses, Hebrew withdrawal, retained Hebrew legal pages and Russian publication status.

**Gate:** zero unresolved public-promise contradiction; exact approved sources identified; all anchor destinations resolve; no unapproved propagation into Home/Pricing/Separation/They Know or protected PA. Any changed shared copy requires exact approval because it affects multiple pages.

## 9. Visual refinement workstream

Run a fresh gap check against the deployed #55 baseline before choosing a visual change. The earlier design rankings describe an older site; they are not automatic proof of remaining defects.

**Art direction:** T1 for concept/critique; T2 for design and frontend. **Skills:** design-consultation, modern-web-guidance, design-review and web-design-guidelines. Toza Red Team checks commercial meaning affected by layout.

Priorities:

1. Reduce search effort on the affected pages: essential meaning visible, distinct stage groups, readable section lengths, supporting details that are clearly secondary. Retain existing semantic tables/disclosures where they work.
2. Extend the approved fitted-panel identity through precise alignment, proportions and a small number of purposeful joins. Preserve the warm light/green system, authentic founder portrait and current font foundation.
3. Give situation entry points a consistent scanning treatment if the current live review still finds uneven prominence. Do not make every visitor select a dispute.
4. Consider one authentic, consented working photograph only if it helps prospects imagine the service. Ambient normal people using smartphones are permitted; no private screen content, fabricated client proof or generic security/digital imagery. A photography need is an asset request, not a release blocker by default.

Artisan, tailored precision and Japanese aesthetic restraint should emerge through composition, not decorative cultural motifs. Avoid shields, locks, cyber grids, fake seals, new visual territories, unnecessary runtime libraries and blanket animation.

**Deliverables:** annotated block map; one coherent desktop/mobile preview; a side-by-side variant only for a specific unresolved layout choice; current screenshots and defect report. Do not create broad variants merely to generate choice.

**Gate:** accepted wording and material qualifiers preserved; visible stage/offer relationships; no overlap or clipped controls; readable at narrow widths and zoom; independent actual-render inspection. User approves the rendered result before production release.

## 10. Implementation and QA gates for each releasable batch

| Gate | Evidence required | Failure handling |
|---|---|---|
| G5 — reproducible integration | Approved additive manifest; `npm run sync:copy`; exact source/template/body/metadata checks; protected hash; commercial table and term comparisons | Fix adapter or authority mapping; never edit accepted text to make a check pass |
| G6 — local build/interaction | Clean install when toolchain/lockfile requires it; audit policy; `npm run verify:all`; existing browser suite; focused regression for new behavior | Diagnose actual failure; no loosened tests or assertions without justified review |
| G7 — independent rendered QA | Current desktop/mobile screenshots plus 320/390/768/1440 widths; 390×667 contact; keyboard/menu/skip/focus; disclosure/deep links; print; reduced motion; comparison semantics; no page/asset errors or overflow | Reviewer cites actual route/viewport/behavior; implementation owner fixes and affected gates rerun |
| G8 — owner preview | Working local/hosted preview, desktop/mobile evidence, exact change summary and material remaining tradeoffs | Resolve the presented result before asking for publication approval |
| G9 — PR/release readiness | Separate accurate PR; final reviewed SHA; current main; passing GitHub CI/CodeQL; Code Review diagnostics if available; zero unresolved required finding; hosted checks | Hold merge on failing gates or stale review; fix and review the changed delta |
| G10 — production verification | Merge-specific deployment success; live routes, approved HTML/assets, indexing/security headers, protected routes, contact links and desktop/mobile renders | Investigate; if materially broken, propose/perform an authorized reviewed revert preserving independent maintenance |

Current browser baseline is **52 tests**, not a future target that must be preserved numerically. Add only meaningful regression coverage required by actual changes. Unchanged protected-page order and table associations remain strict. A PASS refers to the actual executed check and current artifact; missing Safari, physical-device or assistive-technology coverage is reported, never invented.

Review must inspect test/gate changes as well as production code. Code Review's available connector supplies CI diagnostics; independent source review remains required. Prior screenshots or source inspection cannot stand in for inspecting the current rendered preview.

Use the existing audit policy, including its explicit upstream residuals. Reassess new advisories or changed affected versions; do not call the dependency tree vulnerability-free. No unrelated toolchain upgrade is bundled into editorial work by default.

Release checks include the existing 78 edge-route/status tests, hosted parity/indexing/header checks and new page-specific behavior where appropriate. Preview stays noindex, same-repository and restricted to the authorized branch at the PR head; preparation preserves security headers in one global rule. Production remains main-only. Test channel navigation without sending enquiries.

Group approved changes into a batch PR once they share a settled source and preview. Do not automatically merge all batches under the earlier #55 authorization. Once the owner explicitly authorizes a batch's publication after passing gates, proceed without requesting the same approval again.

## 11. Enquiry baseline in parallel

**Owner:** business owner, with T2 assistance creating an empty template. T3 can total nonsensitive aggregates. Start with a manual weekly count, using the recorded plan; tracking code is optional later.

Suggested fields: week, actual enquiries, qualified enquiries, Assessments booked, Assessments completed, full engagements accepted, source if volunteered (otherwise unknown), and a short nonsensitive objection/category code. Use consistent definitions; do not count contact clicks as leads or interest as paid work.

Deliver an empty template and definitions only. Keep real client records in an appropriate private business system, outside the public repository. Avoid copying message contents, names, intimate facts, credentials, case allegations or personal identifiers into model prompts or analytics events.

Review repeated questions and stage outcomes when actual enquiries accumulate. Low volume supports qualitative learning, not fabricated conversion forecasts or arbitrary A/B significance thresholds. A quiet period without relevant traffic does not establish copy failure. Interviews remain optional and do not block A/B/C or launch.

If aggregate contact events are later useful, propose their purpose, data fields, retention and privacy implications under analytics-tracking before implementation. Do not install tracking, CRM, forms, session recording or marketing pixels through this editorial plan.

## 12. Deliverables, review rhythm and stopping rules

Recommended review sequence:

1. **Packet A:** Why Toza candidate + How Toza helps section/stage map; exact wording changes only where demonstrated necessary.
2. **Preview A:** approved copy/presentation, desktop/mobile and current QA; separate PR/release only when authorized.
3. **Packet B:** Business, Inheritance, Attorneys, with page-specific before/after and consistent facts.
4. **Alignment packet:** FAQ/shared-source changes, full-corpus findings and protected-page no-change verdict.
5. **Visual packet:** remaining observed gap, precise proposed refinement and actual preview, with no new wording hidden in captions or controls.
6. **Operational template:** empty enquiry baseline and definitions, supplied alongside the editorial work.

Stop a page's iteration when it performs its agreed job, has sufficient supported proof and client benefit, preserves material boundaries, passes independent review and receives exact approval. Do not generate fresh copy solely because another model prefers a different sentence. Reopen only for a recorded defect, contradiction, owner direction or actual emerging business evidence.

Report blockers promptly with the evidence and smallest required decision. Do not impose interviews, new photography, generic SEO work or a brand restart as hidden prerequisites. Hebrew localisation and broader acquisition/SEO planning remain separate future scopes.

**Definition of done:** each released batch has approved exact sources, recorded decisions, reproducible templates, current independent review, actual responsive/browser evidence, accurate PR, successful deployment and live verification. The plan's first execution deliverable is Packet A; all later work follows its declared dependencies and gates.
