# Toza EN Revision Decision Delta

Status: **LIVE decision register**
Purpose: record substantive decisions made during EN-02-v1 revision so the future `TOZA-EN-COPY-SPEC-v3.md` can be generated from an explicit decision trail.

Do not record ordinary line edits, punctuation, or minor wording changes.

## Baseline ratified decisions

| ID | Date | Decision | Authority | Affected areas | Status |
|---|---|---|---|---|---|
| D-001 | 2026-10-04 | Private Exposure Assessment price is ₪3,600 including VAT. | Owner | All EN pages, structured copy, future spec | Locked |
| D-002 | 2026-10-04 | Assessment scope is one main phone plus one other device: PC, iPad or second phone. | Owner | Assessment, Pricing, FAQ, Process, situation pages | Locked |
| D-003 | 2026-10-04 | Public duration language is “at least two hours in person; typically four,” while completion remains outcome-based around agreed intake, mapping, diagnosis and approved urgent first aid. | Owner | Assessment, Pricing, FAQ, Process, situation pages | Locked |
| D-004 | 2026-10-04 | Inner Circle Shield is approved current product architecture, from ₪42,000 including VAT, using the EN-02-v1 group scope. | Owner | Pricing, FAQ, Process, shared service descriptions, relevant pages | Locked |
| D-005 | 2026-10-04 | Eligible Assessment credit may apply to Personal Shield, Inner Circle Shield or Bespoke Private Protection under current conditions. | Owner | Pricing, FAQ, Assessment, Process, situation pages | Locked |
| D-006 | 2026-10-04 | PA-01-v2 / Initial Paid Visit remains protected approved copy during the 11-page revision phase. | Owner | Initial Paid Visit | Locked |
| D-007 | 2026-10-04 | Revision architecture is locked only after stress test; shared-copy review and a live decision-delta register are mandatory. | Owner | Revision workflow | Locked |

## Decision categories

Use one:
- **Commercial**
- **Service architecture**
- **Editorial doctrine**
- **Page role**
- **Terminology**
- **Protected phrase**
- **Shared copy**
- **Metadata**
- **Boundary/risk**
- **Workflow**

## New decision template

### D-XXX — [Short decision title]
- **Date:**
- **Category:**
- **Decision:**
- **Reason:**
- **Authority:**
- **Affected pages/components:**
- **Supersedes:**
- **Status:** Proposed / Approved / Locked / Reopened
- **Notes for v3 spec:**

## Revision rule

A substantive owner decision made during page review must be entered here before the affected page is considered fully locked.

This register is the bridge between page approval and the future consolidated v3 specification.

### D-008 — Required Code Review adversarial gate
- **Date:** 2026-10-04
- **Category:** Workflow
- **Decision:** Run Code Review as a required adversarial gate. Incorporate only findings consistent with current Toza authority and the locked harness. Resume at Why Toza; after it passes, continue Pricing → FAQ → What Happens → Shared Copy System.
- **Reason:** Keep an external adversarial check between the editorial candidate and further Phase 1 progression.
- **Authority:** Explicit owner instruction in the continuation request.
- **Affected pages/components:** Phase 1 revision candidates and Shared Copy System.
- **Supersedes:** Any assumption that internal editorial checks or CI success alone satisfy the required gate.
- **Status:** Historical locked decision; plugin-specific requirement superseded by D-009. Authority guardrails remain.
- **Notes for v3 spec:** A review pass is not owner approval of exact copy. Main and production templates remain out of scope.

### D-009 — Independent Toza red-team review replaces plugin gate
- **Date:** 2026-10-04
- **Category:** Workflow
- **Decision:** Proceed without the Code Review plugin. Use a separate reviewer applying the Toza red-team skill against current authority and the locked harness; document findings and their disposition before advancing through Why Toza → Pricing → FAQ → What Happens → Shared Copy System.
- **Reason:** The owner accepted the proposed independent-review substitution and instructed “proceed without it with guardrails.”
- **Authority:** Explicit owner continuation authorization following the proposed substitution.
- **Affected pages/components:** Phase 1 candidates and Phase 1.5 Shared Copy System.
- **Supersedes:** D-008's plugin-specific requirement only. D-008 remains a historical decision, superseded on that point.
- **Status:** Locked
- **Guardrails:** Current commercial authority and PA-01-v2 remain protected; no invented claims or Class A changes; preserve minimum trust payload; review metadata; record accepted/rejected findings; no self-approval, production-template edits, merge to main or deployment. Exact owner approval is still required before integration. Shared copy remains provisional until exact owner approval.
- **Notes for v3 spec:** An independent editorial pass makes a candidate READY FOR OWNER REVIEW, not APPROVED. It is not a Code Review plugin result.

### D-010 — Shared contact placement and reusable variants
- **Date:** 2026-10-04
- **Category:** Shared copy
- **Decision:** Proposed: use one contact destination per page; preserve the reviewed page-specific closing when it already carries the contact sequence; do not append a second full standard module. Use short linked or full privacy wording according to page role. Preserve neutral prefill, channel labels, minimum trust and page-specific boundaries.
- **Reason:** Prevent shared components from reversing the locked harness's page-level compression.
- **Authority:** Editorial proposal under the locked Shared Copy System brief; not an owner decision or approval of exact wording.
- **Affected pages/components:** Shared contact/footer, privacy variants, service/structured/reference descriptions and future page integration.
- **Supersedes:** Nothing approved; replaces no production content.
- **Status:** Proposed
- **Notes for v3 spec:** Incorporate only after exact approval of `05-shared-copy-system.md` and its placement map. Shared copy remains explicitly provisional. No change to service facts, contact destinations or public language availability is authorized.

### D-011 — Personal recognition before technical problem awareness
- **Date:** 2026-10-04
- **Category:** Editorial doctrine
- **Decision:** Why Toza must center personal situations. The gap between deliberate choices elsewhere in life and inherited phone/platform arrangements is a central premium insight. Potential clients may not understand that they need this unfamiliar service; they may have only a hunch and cannot be expected to identify or describe the underlying problem. Explain Toza's discovery, interpretation and intervention, with tangible tailored hardening and clear next steps.
- **Reason:** Owner feedback on Why Toza and Pricing, followed by the explicit reminder that Toza uncovers issues clients do not imagine and fixes problems they cannot describe.
- **Authority:** Direct owner instruction in this review.
- **Affected pages/components:** Why Toza, Pricing, later Home and situation pages; future shared language and consolidated specification.
- **Supersedes:** Draft emphasis on organizational crises and any assumption that the reader already recognizes a technical need. Refines the internal situation-aware/exposure-blind model; no change to the intended private-client market.
- **Status:** Approved direction; exact replacement wording pending
- **Notes for v3 spec:** Recognize uncertainty without treating it as evidence of compromise. Defaults are not inherently unsafe. Demonstrate discovery through ordinary access/recovery/sharing mechanisms without guaranteeing hidden findings. Owner feedback reopens the Why Toza note for selective rewriting (S1/C2); retain its personal voice. Assessment and separately accepted full-service hardening remain distinct.

### D-012 — FAQ accepted for now
- **Date:** 2026-10-04
- **Category:** Page role
- **Decision:** Preserve the current EN-02-v2 FAQ wording and length. Owner said: “FAQ is long, but let's accept it for now.”
- **Reason:** Accept the current detailed treatment rather than continuing compression.
- **Authority:** Direct owner review of the Phase 1 candidate.
- **Affected pages/components:** revisions/en-02-v2/03-faq.md, exact-copy block as present at commit 22c9c4bc2df92a232adf925989ef284a3a9e34b4.
- **Supersedes:** Pending owner review of that current FAQ candidate.
- **Status:** Approved for now, preserving the owner's qualification
- **Notes for v3 spec:** No change to body or metadata in this response. Later terminology recommendations do not silently reopen this accepted wording. No production integration, main merge or deployment authorization is inferred.

### D-013 — Outcome terminology and service presentation recommendations
- **Date:** 2026-10-04
- **Category:** Terminology
- **Decision:** Proposed: use concrete intervention verbs and explain hardening; use protection sparingly as purpose language, retain approved service names, and do not impose a corpus-wide ban. Make the optional Annual Shield Review and Priority Retainer visible in a separate pricing table. Keep material scope boundaries on Pricing with comprehensive detail in FAQ; identical facts do not require identical paragraphs.
- **Reason:** Owner questions 3–8 call for stronger outcomes, threat-modeling clarity, less vague protection language, visible annual review and a deliberate repetition policy.
- **Authority:** Editorial recommendations in response to owner questions; not approval of new commercial terms or final wording.
- **Affected pages/components:** Why Toza, Pricing and later shared-copy/terminology review.
- **Supersedes:** No approved service name or fact. In particular Bespoke Private Protection remains the named offer.
- **Status:** Proposed
- **Notes for v3 spec:** Owner has described threat assessment/modeling and a plan as service value. Translate the supported assessment, priorities and next steps into public copy; do not invent a separate written threat-model deliverable or move full hardening into the Assessment. “Highest possible standard in the commercial realm” is an unresolved proposed claim: its benchmark, scope and verification criteria are not defined. No such superlative is placed in candidate copy. A whole-digital-life or all-exposures promise is not implied by tailored work.

### D-014 — Settings, operational practices and teaching; no monitoring or security-software installation
- **Date:** 2026-10-04
- **Category:** Service architecture
- **Decision:** Toza's work includes hardening through settings, operational security practices and teaching the client. Toza does not monitor clients' devices and does not install security software on them.
- **Reason:** Owner explicitly identified these characteristics as important and asked whether they come through across the five candidates.
- **Authority:** Direct owner service clarification: “we do hardening in settings and OpSec and teach you. we don't monitor your device. we don't install any security software.”
- **Affected pages/components:** All five canonical/shared candidates, later pages, reference descriptions and future consolidated specification.
- **Supersedes:** Any assumption that the support-only no-monitoring sentence adequately expresses the service-wide fact, or that training only means operating a changed sign-in/recovery setup.
- **Status:** Approved service clarification; wording and placement pending revision
- **Notes for v3 spec:** Explain OpSec in ordinary language such as practical security habits, with supported examples. Keep security software specific; do not infer a prohibition on every installation, update, migration tool or diagnostic operation. Device examination during the authorized Assessment remains in scope. Do not invent a separate coaching product or shift full hardening into the Assessment. FAQ's accepted wording and PA-01-v2 remain unchanged pending separately identified amendments/consistency review.

### D-015 — Discussion of outcome framing, category explanation, contact and names
- **Date:** 2026-10-04
- **Category:** Page role
- **Decision:** Proposed for discussion: frame the process page around what the client gains, supported by its staged sequence; consolidate the strongest Not IT Support explanation into FAQ, with a short positive service explanation on Why Toza; replace redundant contact eyebrow/heading with a reason to act while retaining the current primary action; keep Personal Shield and Inner Circle Shield and clarify cybersecurity through nearby descriptors rather than renaming by default.
- **Reason:** Owner asked to discuss these four questions, including whether Cyber belongs in the names. These are questions, not final naming or architecture decisions.
- **Authority:** Editorial recommendations following owner questions and an independent read-only strategy critique.
- **Affected pages/components:** Shared navigation and contact, What Happens, FAQ, Why Toza, Not IT Support, service/reference naming.
- **Supersedes:** Nothing locked or approved. Request a private conversation remains the locked primary action. Current routes and service names remain.
- **Status:** Proposed
- **Notes for v3 spec:** No page merger, route retirement/redirect, product rename or locked architecture change is approved by this discussion. Preserve useful fair-comparison content if a merger is later chosen. Keep qualification separate from paid assessment; do not promise findings or fixes during free contact. See revisions/en-02-v2/review/owner-feedback-02-discussion.md.

### D-016 — Apply approved changes and revise around the client's gains
- **Date:** 2026-10-04
- **Category:** Page role
- **Decision:** Apply the recommendations discussed under D-015 and the D-014 service model, then use all four Toza skills for another five-candidate round addressing structure, headings and copy. Explain what becomes better for the client. Expand the full-engagement description beyond device/account settings to digital identities, data and relevant related access arrangements.
- **Reason:** Owner: “add also identities, data, and similar relevant items” and “I approve the changes, but do another round using the skills” to explain “what becomes better for the client,” including structure and headings.
- **Authority:** Explicit later owner approval and revision instruction.
- **Affected pages/components:** Why Toza, Pricing, FAQ, What Happens/How Toza helps, Shared Copy System, category-explanation destination and future consolidation.
- **Supersedes:** D-015's proposed status for the recommended direction; D-012's preservation restriction insofar as the approved FAQ merger, service-model clarification and outcome-led review require revision. Original architecture ownership of category distinction transfers from standalone Not IT Support to FAQ, with a short positive explanation on Why Toza. The standalone Not IT Support revision task is absorbed, not independently drafted again. The original locked architecture remains an historical baseline read alongside this explicit override.
- **Status:** Approved direction and discussed changes; new complete candidate wording requires exact review
- **Implementation:** Use How Toza helps as the process display label, retaining /en/what-happens-during-the-visit.html. Consolidate category explanation and fair comparison in FAQ, remove standalone Not IT Support from candidate navigation/reference directory, and record route integration separately. Keep Personal Shield and Inner Circle Shield, adding descriptive cybersecurity language rather than Cyber to the names. Strengthen the contact heading/reason to act while retaining Request a private conversation. No live routing, production or deployment changes are authorized.
- **Scope guardrail:** Identities/data make the service description complete; they do not create unlimited coverage, new forensic/data-recovery services, bulk migration, a formal threat-model artifact or additional devices. Service benefits must remain attached to their purchased stage. PA-01-v2 remains protected.
- **Notes for v3 spec:** Record settings, practical security habits and teaching as the intervention, with no device monitoring and no installation of security software. Explain practical gain before procedure. Preserve exact current commercial rules and factual boundaries. Previous candidate passes are historical; independently review the complete replacements under D-009.

### D-017 — Brand name, writing and pronunciation
- **Date:** 2026-10-04
- **Category:** Protected phrase
- **Decision:** Name: Toza. Owner-supplied origin: Japanese 閉ざす (tozasu), “to close shut.” Pronunciation: TOH-zah, identical in English, Hebrew and Russian. Latin-only writing: toza for the wordmark, Toza in running text. Never capitalize the entire brand name, transliterate it, translate it or use Hebrew/Russian brand forms in a lockup.
- **Reason:** Owner supplied the binding brand reference while authorizing the next texts.
- **Authority:** Explicit owner brand instructions.
- **Affected pages/components:** All visible copy, metadata, wordmark specifications, accessible naming and future language adaptation.
- **Supersedes:** Any inconsistent brand styling in unapproved copy or future artwork.
- **Status:** Approved
- **Notes for v3 spec:** Keep the name in Latin across languages. Record the supplied origin as brand background; it need not become a marketing claim or imply complete closure of every exposure. Existing technical filenames, source snapshots and locked historical document titles are not renamed. Pronunciation notation is not an uppercase brand wordmark.

### D-018 — Continue the remaining editorial texts
- **Date:** 2026-10-04
- **Category:** Workflow
- **Decision:** Proceed to the next texts using the current canonical candidates and provisional Shared Copy: Home → Separation and Divorce → Business and Founder Dispute → They Know Something → Inheritance Conflict → For Attorneys. Apply current client-gain/service-model/brand direction and independent review under D-009.
- **Reason:** Owner instructed “Proceed to next texts.”
- **Authority:** Explicit continuation request.
- **Affected pages/components:** Remaining Phase 2/3 texts and consistency checks.
- **Supersedes:** Waiting for another instruction to begin those texts. Does not imply exact approval of previously unseen wording.
- **Status:** Approved workflow
- **Notes for v3 spec:** Keep PR #51 open for editorial review. No merge, main change, production integration or deployment. Not IT Support is already absorbed under D-016. Exact complete-copy approval still precedes the consolidated replacement specification.

### D-019 — Deliberate hardening as positive value; demonstrate expert intervention
- **Date:** 2026-10-04
- **Category:** Positioning
- **Decision:** Remove “If broader work is justified” as the sales premise for full hardening. Present a setup deliberately fitted to the client's circumstances as valuable without a known incident or urgent finding. Show expert interpretation of interconnected access and hands-on changes; examples illustrate the need without becoming an attack guide.
- **Reason:** Owner says people deserve better than defaults and the current simple examples understate Toza's expertise. Prospects may not imagine or be able to describe the underlying issue.
- **Authority:** Direct owner editorial feedback and revision instruction in the ongoing review.
- **Affected pages/components:** Eleven current candidates, shared descriptions and future consolidation.
- **Supersedes:** Conditional value framing in unapproved candidates, including doctrine/spec language where it makes full-service value depend on finding a fault. Locked files remain historical and are read with this explicit override.
- **Status:** Approved direction; exact replacement wording pending review.
- **Boundaries:** A value proposition is not a finding that every client is compromised or requires another purchase. Assessment conclusions remain open; describe priorities and recommended next steps, not a predetermined sale. Defaults are not universally unsafe. No exclusive-secret/no-search-can-find-it claim, guaranteed hidden finding, attack recipe, new deliverable or broader device/data scope. Separate agreed scope, price and voluntary purchase remain. Protected PA-01-v2 is not reopened for positioning changes.

### D-020 — Shorter public Assessment duration wording
- **Date:** 2026-10-04
- **Category:** Duration / Class A public-service statement
- **Decision:** Use “Typically four hours” as the public Assessment duration, paired with the Private Exposure Assessment name where appropriate. Remove the public “at least two hours” formulation from revised body, metadata, reusable descriptions and reference copy.
- **Reason:** Owner explicitly requested shortening “At least two hours in person. Typically four.” to “Private Exposure Assessment, Typically four hours.”
- **Authority:** Explicit later owner instruction.
- **Affected pages/components:** All candidate duration occurrences and a separately identified duration-only amendment for the three protected PA-01-v2 occurrences.
- **Supersedes:** D-003 and locked architecture/doctrine/AGENTS public-duration wording only. These historical files and the source snapshot remain unchanged.
- **Status:** Approved public wording; exact placement pending candidate review.
- **Commercial interpretation:** The typical duration is not a fixed cap, hourly purchase or trigger for an extra charge. Agreed intake, mapping, diagnosis and approved urgent first aid still define completion. This shortening does not change the operational minimum, price, scope, in-person delivery or urgent-arrival terms. No overtime policy is invented.
- **Protected-copy treatment:** Record the three exact duration substitutions separately; do not structurally or stylistically rewrite PA-01-v2 or mutate the source corpus. Other protected wording remains for the later consistency gate.

### D-021 — Apply the approved founder, privacy, trust and naming recommendations
- **Date:** 2026-10-04
- **Category:** Editorial direction and shared copy
- **Decision:** Apply the preceding discussion's recommendations and supplied examples: warmer founder hero/note, digital security and privacy, active service language, purpose followed by non-exhaustive situation examples, confidential handling with verified founder background, and full-name-first/short-name-later usage. Separate pre-booking qualification from the paid Assessment in Pricing.
- **Authority:** Owner: “All the rest - approved,” alongside explicit requests for further warmth, paid-visit clarity and genuinely short cards.
- **Supersedes:** Discussion-only status of those recommendations; current unapproved wording where it conflicts. This is not blanket approval of future unseen replacements.
- **Status:** Approved recommendations and presented excerpts; assembled replacements await exact review.
- **Boundaries:** No highest-level or absolute-confidentiality guarantee. Professional background belongs to Dr. Tabansky, not a claimed global Toza client history. No institutional endorsement inferred. Pricing tables, product facts, full disclosure and protected-copy boundaries remain.

### D-022 — Warmer, bolder voice and unmistakable hands-on Assessment
- **Date:** 2026-10-04
- **Category:** Positioning and page structure
- **Decision:** Rewrite Home and the rest of the persuasive copy for warmth, empathy and engagement. Recognize private-life stakes and the burden of working out unfamiliar access; show care through direct listening, explanation and implementation. Make the paid Assessment's inspection, diagnosis and approved urgent first aid explicit.
- **Authority:** Owner: “you must rewrite this and the rest”; the paid visit “includes inspection and often first aid fixes,” with an instruction to discuss and resolve the ambiguity.
- **Supersedes:** Cool “digital setup should fit your life” treatment and report-only impressions of the first paid service. Does not change commercial stages.
- **Status:** Approved revision direction; exact replacements pending.
- **Resolution:** The free conversation has no technical inspection. The paid visit examines relevant devices, accounts and access, diagnoses and makes approved urgent fixes where safely possible within scope. Full hardening remains a separately purchased engagement. Public copy describes the actual intervention without adding an unsupported frequency statistic or promise of a fix on every visit.
- **Guardrails:** Bolder language does not authorize invented misconduct, urgency, feelings, guaranteed privacy or universal insecurity of defaults. Inspection is not unrestricted review of private content. No new service facts or protected-page rewrite.

### D-023 — Short marketing cards alongside full reference descriptions
- **Date:** 2026-10-04
- **Category:** Shared copy
- **Decision:** Create genuinely short presentation versions with action, client benefit, essential scope/price and a detail link. Retain detailed descriptions as a separate reference tier. Cards include relevant “from,” separate-purchase and post-full-service eligibility qualifications.
- **Authority:** Explicit owner instruction to create short presentation versions.
- **Affected pages/components:** Shared Copy System, future presentation cards and their placement instructions.
- **Status:** Approved component direction; exact cards pending review.
- **Boundaries:** Cards are not substitutes for canonical Pricing or written terms. No automatic deployment, generated schema publication, changed prices or new inclusions. The existing shared system remains provisional until exact approval.

### D-024 — Exact acceptance of the current English copy
- **Date:** 2026-10-04
- **Category:** Workflow / exact copy approval
- **Decision:** The owner accepts all eleven current candidate exact-copy blocks, including metadata and Shared Copy, at commit aeb65a51adc3217844be9c465de69a875084b8e4. Shared Copy is no longer provisional. The already authorized three-substitution protected duration amendment is retained; no other PA rewrite is inferred.
- **Authority:** Owner: “I accept the copy.”
- **Supersedes:** Pending exact-review/provisional status of this accepted version and its incorporated direction/excerpts. Historical review records describe their own earlier state.
- **Status:** APPROVED exact copy. Hashes and sources are recorded in approved/acceptance-manifest.json.
- **Boundaries:** Acceptance does not authorize unrequested stylistic cuts, protected PA reopening, translation, production-template edits, main merge or deployment. Non-public implementation annotations inside Shared Copy are not webpage text; their former pending labels are superseded by this acceptance.

### D-025 — Post-acceptance full review and publication planning
- **Date:** 2026-10-04
- **Category:** Workflow
- **Decision:** Locate and use today's actual specifications and adapted skills for another review; after copy acceptance, plan publication, including design, layout and technical steps, using the existing solid foundation.
- **Authority:** Explicit owner instruction following acceptance; later status question asks where the original numbered plan stands.
- **Scope:** Complete Phase 4 protected consistency and Phase 5 full-corpus editorial review, then compile Phase 6 v3 from accepted sources. Prepare a concrete publication plan; no production implementation is requested in this instruction.
- **Result:** Independent D-009 review PASS with optional density/positioning observations and no public-promise conflict. Accepted wording remains unchanged. The consolidated spec records protected PA's permitted positioning exception. Publication design and language/route choices remain proposals.
- **Compression note:** Report actual results honestly: situation pages are materially shorter; Home and Process have smaller reductions. Exact acceptance governs present wording and does not permit further cuts merely to meet a length target.

### D-026 — Implement the accepted English site with staged release gates
- **Date:** 2026-10-04
- **Authority:** Owner: “Can we start Implementation and publication? step by step with quality gates”; then “Launch English first; temporarily unpublish Hebrew marketing pages”.
- **Decision:** Begin the targeted integration described in planning/2026-10-04-publication-plan.md, preserving the existing Eleventy/Nunjucks/Cloudflare foundation and exact accepted copy. Production-source changes are now authorized for implementation; this supersedes the earlier copy-only scope for this phase.
- **Language:** Temporarily withdraw Hebrew marketing routes and their discovery links with temporary redirects to English. Preserve Hebrew source for later adaptation and preserve the Hebrew legal documents, accurately labelled. Russian remains unpublished. This does not change service-language availability.
- **Routes:** Implement the plan's retained English route set, three permanent replacement redirects and neutral 410 retirement response, including extensionless aliases.
- **Branch:** Continue on editorial/toza-copy-harness and the existing unmerged PR #51, as required by project instructions. Do not alter main during implementation.
- **Gates:** Accepted-source fingerprints and rendered-copy fidelity; clean build and publication contracts; mobile/desktop accessibility and interaction checks; independent adversarial review under D-009 and available Code Review CI diagnostics; owner preview and final release approval before main merge/deployment.
- **Boundary:** No accepted wording changes, translation, platform migration, new tracking, payment flow or remote preview deployment is inferred. Historical source and locked harness remain immutable.

### D-027 — Implement and publish the selected round 2 A design
- **Date:** 2026-10-09
- **Authority:** Owner preferred round 2 A and asked whether to deploy before further work; then instructed “do it” with GitHub after the proposed implementation, PR preview, quality checks and release flow.
- **Decision:** Apply A consistently to all eleven English routes on the existing foundation, then publish through a reviewed GitHub PR after copy, responsive layout, accessibility, interaction and deployment-preview gates pass. Use codex/toza-clear-practice from deployed main; the editorial-only branch restriction no longer governs this presentation release.
- **Scope:** Warm light visual system, stable reading layout, restrained disclosure of supporting copy, responsive semantic tables, authentic portrait and approved logo. Preserve every accepted prose block, metadata, commercial term and row association. The protected Assessment retains its block order and full visibility. No translation, new tracking, payment flow or platform migration.
- **Release:** Same-repository branch-only noindex Cloudflare preview is now authorized. Merge through GitHub with expected-head validation; production continues to deploy only from main. User's “do it” authorizes this release after the agreed checks, without another routine confirmation.
- **Review:** Independent adversarial review under D-009, with only findings consistent with current authority incorporated. Prior production commit 818ddbfeccad9d37f7eb310dd01b4edff581082a is the rollback reference.

### D-028 — Use the approved fitted-panel Toza logo
- **Date:** 2026-10-09
- **Authority:** Owner in the separate brand workstream: “OK give it to the repo and brief our designers to use it”; approval verified from that task's human message.
- **Decision:** Use the delivered outlined lowercase wordmark and fitted-panel symbol in the site header/footer, and the optical-size micro mark as favicon. Assets and designer brief reside in assets/brand/toza and this project's brand directory.
- **Boundary:** Latin-only toza wordmark / Toza running text. Preserve the supplied geometry, font rights notice and meaningful spacing; no shield/cyber motifs or transliteration. This approval changes visual identity, not service facts or accepted body copy.

### D-029 — Approve stronger Home/Pricing copy and build an isolated preview
- **Date:** 2026-10-10
- **Authority:** After receiving both complete reviewed packets, annotated alternatives and the recommendation to use the main Home and Pricing versions, the owner said: “approved, go build”.
- **Decision:** Accept the exact main versions, including metadata, in `revisions/en-03/06-home.md` and `revisions/en-03/02-pricing.md`. The four alternative units remain unselected, retained for possible later tests. The amendment manifest records the two exact hashes; historical EN-02 source, acceptance manifest, locked harness and protected Assessment remain immutable.
- **Positioning:** Concrete risk of private information being used against the client, including ordinary access, personal knowledge, trust and independent retained copies. Personal threat modelling is a method, not a new formal deliverable. Concrete hardening and practical habits follow risk; quiet premium character comes from direct individual expert delivery. No prevalence claim, exclusive capability, investigation, unlimited scope or guaranteed removal is added.
- **Facts:** All commercial/service facts remain unchanged. Assessment remains hands-on and independently useful; full hardening remains a separate purchase. The old-copy example does not extend device/archive scope; business work remains at the personal-device/identity intersection within authority and agreed scope.
- **Implementation:** Use isolated local branch `codex/toza-approved-copy-preview` from `c5e7e243764605463cd0b6e05fa33b115240729d`, retaining the approved Home/Pricing narrative design as the starting point. Adapt presentation and test expectations to the approved new blocks; no stylistic copy edits while building. Earlier editorial-branch restriction yields to this explicitly authorized separate implementation. Update this branch's generated templates only.
- **Gates:** Exact approved-copy hashes and rendered blocks/metadata/table associations; unchanged other nine English pages and protected Assessment; build/publication contract; responsive, keyboard/contact/disclosure/print checks; independent implementation and rendered-design review.
- **Boundary:** Do not change PR #54, push a new PR, merge, alter main or deploy. Show desktop/mobile local preview for review. Publication remains a later instruction.

### D-030 — Accept four targeted refinements and build a local preview
- **Date:** 2026-10-10
- **Authority:** Owner: “Approved. Build these four pages into the local preview, run the quality gates, and show me desktop and mobile. Keep service facts unchanged. Don’t change PR #54 or deploy.”
- **Decision:** Accept all four complete reviewed round-02 exact-copy blocks, including metadata: Home, Pricing, Separation and Divorce, and They Know Something. Sources are revisions/en-04; fingerprints are in approved/acceptance-amendment-2026-10-10-round-02.json.
- **Review:** Toza strategy, copywriter, ten editor sweeps and a separate red-team review completed before approval. Two They Know Something ambiguities were corrected and independently rechecked: unverified original concern and separation of first-visit information from full hardening.
- **Positioning:** Make shared/delegated access recognisable, explain dependency judgment as paid value, and connect hardening to deliberate personal access choices. No service or commercial facts change. Historical copy is inspiration, not market validation.
- **Implementation:** Continue in codex/toza-approved-copy-preview from 09a534e. Integrate only these four approved blocks, adapt presentation and relevant validation as needed, preserve Home's benefits-before-detailed-risk order and Pricing's early fee visibility. Keep prior accepted sources, both prior manifests, locked harness and protected Assessment immutable.
- **Gates:** Approved exact hashes and rendered body/metadata/table associations; seven other English pages unchanged; build and publication contracts; desktop/mobile reflow, contact, keyboard, disclosures and print checks; independent source/authority and rendered review.
- **Boundary:** Local preview only. Do not change PR #54, push, merge, change main or deploy. This supersedes earlier draft-only status for these four exact blocks; it does not authorize further wording edits during implementation.

### D-031 — Publish the four-page release after separate maintenance
- **Date:** 2026-10-12
- **Authority:** Owner authorized a separate four-page GitHub PR, review/release gates and publication if all pass; separately approved releasing maintenance PR #53 first.
- **Result:** PR #53 merged as e78a85c66ac001455ae7759e5346c3a14f6113d6, then PR #55 as 6c525f8d948709e3e8b7ea6f6c75abc9d8e5e56f. Final source, independent review, 52 browser checks, hosted preview and 78 live edge checks passed. Production parity/indexing/security headers and eight desktop/mobile renderings passed. Evidence is recorded in PR #55 and docs/four-page-copy-preview/RELEASE.md.
- **Boundary:** This release is complete. PR #54 remains unchanged. Known build-tool advisory residuals remain documented under the reviewed maintenance policy; no clean-audit claim. This authorization does not grant future batch publication.

### D-032 — Approve the next execution plan and start Batch A candidates
- **Date:** 2026-10-12
- **Authority:** Owner: “Approved. Start Batch A using the planned model tiers, skills and team. Draft Why Toza and the How Toza helps stage map, keep service facts unchanged, and show me the changes after independent review. Do I need to change model tiers or you do? Don’t deploy yet.”
- **Decision:** Use planning/2026-10-12-next-editorial-design-execution-plan.md. Start Why Toza targeted candidate drafting and the How Toza helps stage/section map. Apply the four project Toza skills; use Astra for strategy and independent review, Sol for drafting/editing and stage mapping, Luna for mechanical inventories. The orchestrator assigns the requested tiers; no user model-setting change is needed for these delegated tasks.
- **Scope:** Draft/review only, based on deployed main 6c525f8. How Toza helps begins with C0 wording and a proposed grouping of its existing eight steps into its existing three stages. Any newly proposed public wording is identified separately. Current commercial/service facts and protected Assessment remain fixed.
- **Branch:** Use isolated local codex/toza-trust-process-refinement for the approved batch and en-05 candidate artifacts. This explicit approval of the new plan supersedes the historical editorial-only branch restriction for this scoped work.
- **Boundary:** New exact copy and the stage map await owner approval after independent review. No generated-template, asset, acceptance-manifest, PR #54, main, merge or deployment change is authorized. Later batches remain planned, not executed by this instruction.

### D-033 — Accept Batch A copy and stage map for local implementation
- **Date:** 2026-10-12
- **Authority:** Owner: “Approved. Build Batch A into the local preview using this copy and stage map. Keep service facts unchanged, run the quality gates and independent review, and show me desktop and mobile. Don’t deploy yet.”
- **Decision:** Accept the exact Why Toza candidate, including unchanged metadata, with hash 53ee848c5a5247777c51d46ac1c8a20bc6e2430abd375bfe81ede4a019cad575. Accept the How Toza helps stage map as a C0 presentation specification; its public source remains EN-02-v2 and its wording/order/visibility are preserved. Additive approval record: approved/acceptance-amendment-2026-10-12-batch-a.json.
- **Scope:** Continue on codex/toza-trust-process-refinement. Integrate the two approved Why paragraphs and presentation-only stage grouping for Process. Adapt the acceptance loader, generation, narrowly scoped styling and verification as needed. Preserve all service/commercial facts, historical sources/manifests and protected PA. Nine other English pages remain unchanged.
- **Gates:** Current exact sources and reproducible templates; copy/metadata/links/table associations; protected order; unchanged other pages; existing audit/build/browser gates; focused stage visibility/order/keyboard/print checks; fresh independent implementation and rendered review; desktop/mobile local gallery.
- **Boundary:** Local preview only. No push, PR #54 change, main merge or deployment. Later batches remain scheduled. Owner approval of the rendered result remains a later gate.

### D-034 — Continue to Batch B candidate drafting
- **Date:** 2026-10-12
- **Authority:** After the reviewed Batch A local preview was presented, the owner instructed: “Proceed to next”.
- **Decision:** Continue the approved 12 October execution plan with Batch B: Business and Founder Dispute → Inheritance Conflict → For Attorneys. Apply the planned model tiers and four Toza skills, preserve service facts, and present complete candidates after independent review.
- **Scope:** New en-06 candidate artifacts on the existing isolated codex/toza-trust-process-refinement branch, based on local Batch A commit c85f7fe and deployed baseline 6c525f8. Batch A accepted copy and current local rendering remain preserved. No corporate investigation, estate entitlement, forensic/evidentiary or legal-service claim is added.
- **Boundary:** This advances drafting/review, not publication. Batch B exact wording remains unapproved until owner review; no template/asset/acceptance-manifest, PR #54, main, merge, push or deployment change is authorized. The deployment hold persists.

### D-035 — Accept the complete Batch B candidate payloads
- **Date:** 2026-10-12
- **Authority:** Owner: “I ,the owner approve complete candidate payloads”.
- **Decision:** Accept the three complete EN-06 exact-copy payloads, including metadata: Business and Founder Dispute, Inheritance Conflict and For Attorneys. Additive fingerprints are recorded in approved/acceptance-amendment-2026-10-12-batch-b.json; revisions/en-06/ACCEPTANCE.md supersedes historical pending-owner labels.
- **Facts and gates:** The reviewed four-paragraph change set is unchanged. G1 strategy, G2 ten editorial sweeps, G3 independent PASS with zero required findings and 79/79 mechanical draft checks preceded approval. All service/commercial facts, prior accepted sources and protected Assessment remain preserved.
- **Boundary:** This records exact-copy acceptance. Runtime-loader integration and the desktop/mobile preview are subsequent implementation work; no template, asset, PR #54, main, push, merge or deployment change is made by this acceptance. Publication remains on hold.

### D-036 — Build approved Batch B into the local preview
- **Date:** 2026-10-12
- **Authority:** Owner: “Approved. Build Batch B into the local preview using the approved copy. Keep service facts unchanged, run the quality gates and independent review, and show me desktop and mobile. Don’t change PR #54 or deploy yet.”
- **Decision:** Integrate the three exact approved EN-06 payloads through the additive Batch B amendment and acceptance loader on codex/toza-trust-process-refinement. Generate only Business, Inheritance and Attorneys templates. Preserve the existing design, accepted Batch A implementation, all service facts and protected Assessment.
- **Gates:** Exact approved fingerprints and body/metadata/link fidelity; eight other English routes unchanged; audit policy, build and verification contracts; browser/responsive/contact/keyboard/print checks; fresh independent source and actual-render reviews; desktop/mobile local evidence.
- **Boundary:** Local implementation only. No PR #54 change, push, main merge or deployment. Rendered owner review precedes a later release instruction.

### D-037 — Continue to Batch C alignment review
- **Date:** 2026-10-13
- **Authority:** After the reviewed Batch B local preview was presented, the owner instructed: “proceed”.
- **Decision:** Continue the approved execution plan with Batch C: FAQ, shared surfaces and the full eleven-page English corpus. Apply the Toza Editor and independent Red Team, with mechanical fact, source and link inventories. Diagnose actual inconsistencies before drafting; a no-change result is valid.
- **Scope:** Review artifacts under revisions/en-07 on codex/toza-trust-process-refinement, based on local Batch B commit b1f88a0. Approved A/B and EN-04 wording stays fixed during review. Retain accepted FAQ length unless a specific redundant unit is justified; protected Assessment receives consistency/link checks only. Any proposed new shared or page wording awaits exact owner approval before integration.
- **Boundary:** This advances the next alignment stage, not publication. No production-source, acceptance-manifest, asset, PR #54, main, push, merge or deployment change is authorized by this continuation. The deployment hold remains in force.

### D-038 — Accept and locally integrate Batch C guidance links
- **Date:** 2026-10-13
- **Authority:** Following the complete reviewed candidate packet, the owner instructed: “approve. proceed”. The packet identified exact-copy approval followed by local integration and rendered QA as the next steps.
- **Decision:** Accept complete EN-07 FAQ and Process payloads, including unchanged metadata and the one added contact-guidance link each. Approved hashes are recorded in approved/acceptance-amendment-2026-10-13-batch-c.json. Historical pending-owner labels are superseded by revisions/en-07/ACCEPTANCE.md.
- **Implementation:** Continue local integration on codex/toza-trust-process-refinement from 9b12842. Add the two approved overlays, generate FAQ/Process templates, and adapt strict verification to permit only the approved additions. Preserve all existing words/facts, nine other English routes, previous approvals, shared runtime/structured/LLMS surfaces and protected Assessment. Process C0 is superseded only for its added contact link; the approved stage map and stage content stay unchanged.
- **Gates:** Exact payload and template/metadata fidelity; removal of only the approved links reconstructs prior payloads; nine unchanged HTML routes; build/audit policy/browser suites; actual FAQ answer opening and return/contact behavior at desktop/mobile widths; fresh independent source and rendered reviews.
- **Boundary:** Local preview only. No PR #54 change, push, main merge or deployment. Owner review of the rendered result and separate release authorization remain later gates.

### D-039 — Continue to the visual-refinement gap review
- **Date:** 2026-10-13
- **Authority:** After the reviewed Batch C local result was presented, the owner instructed: “proceed”.
- **Decision:** Advance the next saved-plan workstream: a fresh current-site visual-gap assessment and focused refinement plan. Apply the existing business/design brief, accepted Clear Practice system and fitted-panel identity. Use actual current local and published-baseline captures with independent art-direction and UX/CRO perspectives.
- **Scope:** Planning/evidence under docs/visual-refinement-review from local d8a2924. Keep all approved copy, facts and protected Assessment fixed. Distinguish resolved historical findings from remaining observations; rank concrete layout/hierarchy/reading-effort/brand opportunities with responsive and approval gates. No general brand restart or new marketing wording.
- **Boundary:** This authorizes review and a concrete proposed visual plan, not unreviewed production-layout changes or publication. No PR #54 change, push, main merge or deployment. Specific rendered refinements remain subject to the recorded design/preview gates.

### D-040 — Integrate both approved visual refinements locally
- **Date:** 2026-10-13
- **Authority:** Owner: “Approved. Integrate both refinements into the local preview, keep the accepted copy unchanged, run the quality gates and independent review, and show me desktop and mobile. Plan deployment.”
- **Decision:** Accept the reviewed Home supporting-row and Business purchase-group concepts in docs/visual-refinement-review at 2bc8f90. Integrate their presentation through the existing adapters on codex/toza-trust-process-refinement. Preserve primary/supporting hierarchy, all accepted words, metadata, block/link order, current palette/type, and Business's complete separate-scope/price qualification. Retain the corrected original mobile reading measures.
- **Gates:** Exact accepted-source and rendered-copy fidelity; protected Assessment and nine unrelated English routes unchanged; reproducible sync/build, verification, audit policy and browser suites; fresh actual desktop/mobile and narrow-width interactions; independent adversarial source and rendered review.
- **Boundary:** Local implementation and preview plus a concrete deployment plan. No PR #54 change, push, main change, merge or deployment. Prior A/B/C approvals remain in force; this decision adds no commercial facts or new wording.

### D-041 — Prepare the separate reviewed batch PR and hosted preview
- **Date:** 2026-10-13
- **Authority:** After the integrated desktop/mobile result, passing local gates and deployment plan were presented, the owner instructed: “proceed”.
- **Decision:** Advance the deployment plan's PR and restricted hosted-preview stage for the settled A/B/C changes plus approved Home/Business refinements, from local b81da1a on codex/toza-trust-process-refinement. Push the reviewed branch and create a separate PR targeting current main. Prepare narrowly scoped workflow/contract changes for this exact same-repository branch and PR-head checkout, noindex/security-header preservation, focused regressions and the 78 Pages checks.
- **Maintenance:** PR #56 remains separate and deferred absent its own release instruction. Do not merge it or copy its dependency/documentation changes into this batch. Current main is 6c525f8; record the explicit preview-tool version and rerun current gates.
- **Gates:** Final-diff independent adversarial review, unchanged protected/accepted facts, current local checks, GitHub CI/CodeQL and Code Review diagnostics on the reviewed head; hosted HTML/assets/route/header/indexing fidelity plus fresh desktop/mobile and interaction evidence. Address only findings consistent with present Toza authority.
- **Boundary:** This advances preparation and owner review of a concrete hosted release candidate. It does not authorize main merge or production publication. PR #54 stays untouched. Present the final reviewed SHA, PR and hosted preview before the batch publication decision.

### D-042 — Publish the reviewed PR #57 batch
- **Date:** 2026-10-13
- **Authority:** Owner: “I approve, proceed with The deployment plan”.
- **Decision:** Publish reviewed head 62857d1 through GitHub expected-head validation. PR #57 merged as d993322, with the identical reviewed Git tree. Merge-specific production workflow 38379886644 and live content/assets/indexing/security/78-route/desktop-mobile checks passed. Full release evidence resides in V:/TOZA hardening biz/release-evidence/pr57/production. PR #54 and PR #56 were untouched.


### D-043 — Lower the shared footer
- **Date:** 2026-10-13
- **Authority:** Owner: “make the footer much lower”.
- **Decision:** Add space between final page content and the shared English footer: 160px desktop, 96px at the existing 640px mobile breakpoint. Preserve footer words/links and all approved main-page content, including protected Assessment. Version the changed shared stylesheet for cache freshness; retain exact asset assertions at the new version.
- **Scope:** Local preview on codex/toza-footer-spacing from deployed d993322. No pricing/service-fact change or unrelated redesign. PR reconciliation is read-only; do not close/merge PR #54 or PR #56 through this instruction. Show desktop/mobile result before any subsequent publication stage.

### D-044 — Reconcile PR #56 against current main
- **Date:** 2026-10-13
- **Authority:** Owner: “PR #56: reconcile before merging”.
- **Decision:** Reconcile the existing maintenance PR against published d993322, pin Wrangler 4.150.0 to match the successful production tool, retain #57 workflow safeguards, and refresh operational guidance without changing accepted authority or public output.
- **Gates:** Fresh locked installation, audit policy/live audit, exact-copy build verification, focused regressions, browser tests, runtime success/failure checks, byte-for-byte public-output comparison and independent review. Update the existing PR through a normal push; verify exact-head GitHub checks.
- **Boundary:** No merge, deployment, PR #54 change, footer-preview integration, branch deletion or service-fact change. D-043 belongs to the separate local footer preview and is not part of this maintenance PR.


### D-045 — Publish reviewed maintenance PR #56
- **Date:** 2026-10-13
- **Authority:** Owner: “Approved. Merge PR #56 through the GitHub flow, verify deployment and the live site, and keep PR #54 and the footer preview separate.”
- **Decision:** Expected-head merge a70f384 as 7844b84 with identical reviewed Git tree. Production workflow 38386253114 and live eleven-page fidelity, exact CSS/JS, headers, 78 routes and desktop/mobile interactions passed. Evidence resides in V:/TOZA hardening biz/release-evidence/pr56-deployment. Public output and accepted authority remain unchanged. PR #54 and footer preview were separate.

### D-046 — Publish the lower-footer change only after release gates
- **Date:** 2026-10-13
- **Authority:** Owner: “Now prepare a separate PR for the lower footer, run the same review and quality gates, and deploy if all pass. Keep the accepted copy unchanged and PR #54 separate.”
- **Decision:** Advance D-043's settled 160px desktop/tablet and 96px mobile footer margin, zero added print margin, and shared CSS cache-version change in a separate PR based on published 7844b84. Preserve every accepted word, fact, metadata field, link and content order; retain #56 maintenance and #57 authority.
- **Gates:** Fresh frozen install, strict audit, full accepted-copy/build/link/workflow contracts, focused regressions, 56 browser tests, 78 local Pages checks, footer geometry/keyboard/print and all-eleven-page fidelity, final independent adversarial review, exact-head GitHub CI/CodeQL, expected-head merge and merge-specific deployment/live verification. No PR #54 change, unrelated design or wording change.

### D-047 — Execute the reconciled marketing revision
- **Date:** 2026-10-13
- **Authority:** Later owner approval in chat 01a13506-1262-71f7-b131-228158262067, turn 01a13525-20e7-71d9-af0c-9dcd773c81d6, message 01a13525-24d0-7471-b630-55775410d5d7; current chat: “go do it” after reconciliation.
- **Decision:** Keep the exact Home H1 “Private information can be used against you.” Explain uncertainty about privacy, information locations/copies, available access and inference. Preserve established international expertise as principal proof; connect it to personal judgment and implementation. Toza is new; overseas providers are category benchmarks, not established local competitors. Produce verified proof, then Home/Why Toza/Pricing together, followed by supporting alignment.
- **Supersedes:** Historical phase ordering and Home benefits-before-detailed-risk presentation insofar as they conflict with the later stakes → uncertainty → expert judgment → agreed action progression; this chat's earlier Home/Process-first bounded prototype.
- **Scope:** Draft/review only under revisions/marketing-01 in an isolated connector-verified partial snapshot on editorial/toza-copy-harness. Current effective main is 81a11a1 with decisions through D-046. D-047 is a local proposed register addition; recheck numbering before eventual canonical integration.
- **Gates:** Four Toza skills, ten editorial sweeps, separate independent red-team review, complete exact-copy/metadata owner packet. Commercial facts, protected Assessment and accepted identity remain fixed.
- **Boundary:** Strategic and drafting authorization, not approval of unseen sentences. No accepted-manifest, production-template, PR #54, main, push, merge or deployment change. New exact approval precedes integration.
- **Status:** Approved direction and execution; candidate wording pending owner approval.


### D-048 — Lead with Personal Shield and risk-led protection
- **Date:** 2026-10-14
- **Authority:** Owner's detailed current-chat criticism of marketing-01; “NCSC UK, DoD US, NSA US” source clarification; “proceed” after discussion.
- **Decision:** Rebuild the connected Home/Why/Pricing around Personal Shield as the main offer with early ₪14,000 price. Restore discerning-client/defaults founder story and direct privacy challenge. Emphasize Assessment's personal threat model, relevant apps/devices/accounts/traces and resulting specific risk assessment/plan; urgent first aid remains included but subordinate. Use Toza and firm delivery language. Remove university-led proof and long change-order example; ground selected agency-practice claims in public guidance. Move detailed cautions into accessible supporting guidance while retaining material purchase/scope/client-control facts.
- **Supersedes:** Marketing-01's active proposal/readiness; Assessment-led selling hierarchy and CV/long hypothetical presentation. D-047's retained H1/high stakes and underlying service facts remain.
- **Scope:** New marketing-02 exact-copy candidates and review-only rendering, on editorial/toza-copy-harness in the isolated partial snapshot, based on main81a11a1. D-047/048 are local register additions; check numbering before canonical integration.
- **Facts:** Personal Shield base price remains fixed; Assessment still separate paid work with summary even without continuation and conditional credit. Risk assessment/next steps explain that summary; no extra named/formatted threat-model deliverable, forensic trace reconstruction, unlimited devices or guaranteed finding is created. Agency endorsement/employment/equivalence and global/local exclusivity are not established by the source names.
- **Gates/boundary:** Four Toza skills, ten sweeps and separate independent review; exact assembled copy/metadata acceptance precedes production integration. Protected Assessment S0/C0, accepted manifests, templates, identity, PR54 and live website remain unchanged. No publication authorization.
- **Status:** Approved direction and drafting execution; new exact wording pending review.

### D-049 — Accept the targeted Pricing candidate; select future comparison
- **Date:** 2026-10-14 (Asia/Jerusalem)
- **Authority:** Current-chat owner: “I approve, and the purchase-decision version as the eventual main comparison.” Owner also keeps the proposed hardening wording/discussion separate for now. Earlier explicit clarification: “Yes — Personal Shield only; Assessment is additional.”
- **Decision:** Accept revisions/marketing-02/future-pricing-pass/PRICING-TARGETED-CANDIDATE.md, SHA-256 e416b43f5936aaf448dca0966a2bbbec337ffb491f2d46179dfb2cd4c1e74a8e. This exact Pricing payload adds the delivery matrix, states typical Personal Shield work of 7–14 hours excluding Assessment while retaining included days, corrects urgent arrival wording and shortens the Pricing closing with existing FAQ guidance links.
- **Future selection:** Choose B, the purchase-decision version in DISCUSSION.md, for the eventual principal comparison in a separate future pass. The present scope table remains exact in the accepted Pricing payload. Selection does not apply a replacement now.
- **Boundary:** Keep the broader hardening explanation separate. Preserve all other current copy, protected Assessment, routes, identity and PR #54. This records exact Pricing-copy acceptance, not an instruction to merge or publish; the owner's next-step question is not a production deployment command. Do not infer new acceptance of other pages from this narrow approval.
- **Evidence:** TARGETED-PRESERVATION.json and independent REVIEW.md passed. Acceptance recorded in future-pricing-pass/OWNER-ACCEPTANCE.json. Fresh connector check found main still 81a11a12c49eefd124c54bd2da227e0f815b083b, canonical register through D-046, with production workflow 38388147576 successful. These local D-047–049 entries need numbering reconciliation during canonical integration.
- **Status:** Exact targeted Pricing copy accepted; future comparison selected but deferred; live integration/release remains to be prepared.

### D-050 — Integrate the frozen Home, Why Toza and targeted Pricing
- **Date:** 2026-10-14 (Asia/Jerusalem)
- **Authority:** Owner: “proceed” after the integration/preview/PR sequence; explicit release-scope reply: “Home, Why Toza and Pricing”.
- **Decision:** Integrate exactly marketing-02 Home/Why and the accepted targeted Pricing, including their metadata, through an additive acceptance amendment. This explicitly resolves D-049's prior narrow-page acceptance scope. Full raw-source fingerprints are in approved/acceptance-amendment-2026-10-14-marketing-02.json.
- **Scope:** Separate complete Git worktree from current main81a11a1 on local editorial/toza-copy-harness. Publish the review PR through the separate codex/toza-marketing-02-release branch, preserving the existing remote harness branch. Preserve eight supporting pages, protected Assessment, original manifests, client-controlled contact destinations, published identity/footer/maintenance and PR #54. Add only presentation mapping required by the frozen new sections and tightly scoped release checks/preview branch support.
- **Deferred:** Purchase-decision comparison B is selected for a future pass; keep the current exact scope table. Broader hardening wording/discussion stays separate. No further copy revision.
- **Gates:** Exact source/metadata/block/link/table fidelity; all-eight-page public-output preservation; build/link/route/CI/audit/browser checks; fresh desktop/mobile/keyboard/print and independent final release review; exact-head GitHub CI and isolated noindex preview.
- **Boundary:** Prepare and present a concrete reviewed PR/preview. No main merge or production deployment is authorized by this stage.

### D-051 — Compact the shared footer

- **Date:** 2026-10-14.
- **Authority:** Owner screenshot and instruction: “the footer is too high. can be 1/4.”
- **Decision:** Compress desktop footer to approximately one quarter of the screenshot's occupied height, including its preceding gap. Use wrapping horizontal navigation and tighter spacing; retain readable mobile links, all footer words and destinations. Add a separately versioned footer-only stylesheet to the shared layout.
- **Boundary:** Supersedes the previously accepted footer dimensions only. Frozen Home, Why Toza, Pricing and protected Assessment copy remain exact; future comparison and hardening expansion stay deferred. Update PR #59 and preview for review; no production publication authorization.

### D-052 — Reopen Pricing copy, then visual presentation

- **Date:** 2026-10-14 (Asia/Jerusalem).
- **Authority:** Owner: “The Pricing page is long and unclear. Call experts to work only on the pricing page copy, then layout and visual design,” with a clearer side-by-side matrix, labelled vector people/device icons and a possible prospect process diagram; modular CSS suggested for consistent change management.
- **Decision:** Develop a new Pricing-only review proposal using separate copy and design specialists and independent review. The earlier selected purchase-decision comparison B can inform this new pass. Resolve copy and purchase logic before design. Preserve authoritative facts and all other page copy; the protected Assessment remains unchanged.
- **Scope:** Review-only artifacts in revisions/pricing-03, including complete copy/metadata, factual trace, exact diagram microcopy, modular page-scoped CSS, responsive prototype/screenshots and review. This does not substitute new Pricing into PR #59 or production.
- **Approval:** Exact assembled Pricing proposal remains pending owner review; no product/factual changes are authorized.
- **Reviewed proposal:** Pricing source 6ea8ed8951d2673048300b4dca3632c4ac23c97a3be73c0659bdb8f9ab299461; diagram dd238e0735c06726feaae309d480ba56c39be694c69cababf96907736e7d64af; HTML cb543c8d6e790152b32566cabdc522917ad21853cc7aabff5cf7390f33c0e816. Independent source and rendered reviews pass. Final owner packet and prototype are stored in revisions/pricing-03; no acceptance amendment or production overlay is added.

### D-053 — Publish verified PR #59

- **Date:** 2026-10-14 (Asia/Jerusalem).
- **Authority:** Owner: “publish PR #59”.
- **Decision:** Publish the verified head 829faf7efe59bf53cc5289db884a6d0067e42126, including approved Home, Why Toza, targeted Pricing and compact footer. Fresh CI/CodeQL, 56 browser checks, 78 local/hosted routes, 11 HTML and 59 asset comparisons passed before merge.
- **Result:** PR #59 merged as b4e918eeaa045cdeb5e9efc8be650aaef9dc1d47; its Git tree equals the reviewed head. Production workflow 38576940753 succeeded. Read-only live verification is recorded separately in release evidence.
- **Boundary:** The new D-052 Pricing proposal remains separate and unapproved. Publication authorizes neither its automatic integration nor further factual changes.

### D-054 — Research and demonstrate Pricing value visually

- **Date:** 2026-10-14 (Asia/Jerusalem).
- **Authority:** Owner: “The direction is good. The rule: show don't tell,” asking to show devices, hours, Yubico keys, threat model and OpSec training, and to study public best practices/books/skills for lead contact, Assessment purchase and subsequent hardening.
- **Decision:** Preserve Pricing-03 as a reviewed baseline. Research public guidance and develop Pricing-04 with visuals carrying quantities, scope, paid-stage value and the next action. Rework the four-cell process into a more tangible client journey. Use concise labels and accessible complete facts; keep Toza's quiet, precise character.
- **Scope:** Pricing only, review prototype and exact copy/microcopy proposal. Public methods support the work but cannot change authoritative fees, device scope, credit, timing, consent, deliverables or purchase boundaries. The owner-requested Yubico naming is a proposed brand label, not confirmation of a particular SKU or capabilities.
- **Approval:** Direction approved; exact new assembled copy/layout remains pending owner review. Published PR #59, Home, Why Toza and protected Assessment remain unchanged.
- **Later steering:** Owner explicitly requested a study of top consumer software tier presentations, covering business logic and design execution. Official 1Password, Proton, Apple iCloud+, Adobe Photography and Bitwarden pages were read; source hierarchy supports coverage-led choices, shared value and concise comparison with full reference. External rendered access was blocked, so competitor geometry is not claimed. Apply the suitable patterns to Pricing-04 and verify Toza's actual desktop/mobile rendering; preserve one-off payment, private contact and voluntary paid-stage boundaries.
- **Reviewed proposal:** Pricing source `7e251d413298476d566b767b2c8869b51d36c0c68032e084a9ddf72513378b25`; visual copy `b44941fd34d3101f40bdbf618bd70ff43fad66af90fbe47d73d1785e4f5cf64d`; final HTML `5f1569faa2e8d1563310e09b5a24c0b32f5f07ae4e550177be257fe0f690606f`; CSS `a33e565682c3e63ba1053ff5e1146d143da9b49a087190f81c89e861e7bedf10`. Independent copy, research and rendered reviews pass; the exact owner packet and source/output snapshot are in revisions/pricing-04. The Assessment's precise device allowance remains visible at direct paid-stage entry. All 70 verified published HTML/asset hashes are preserved. No acceptance amendment, production integration or publication is performed.

### D-055 — Accept and deploy Pricing-04, then tidy the repository

- **Date:** 2026-10-15 (Asia/Jerusalem).
- **Authority:** Owner: “ok deploy it @GitHub then clean up the repo. later will provide line edits for next version”. This follows the complete Pricing-04 owner packet and reviewed rendering.
- **Decision:** Accept exact Pricing-04 copy/metadata, visual labels including Yubico naming, and compact final composition; integrate it into the actual site shell and publish through GitHub after release verification. Add the narrow acceptance amendment dated 2026-10-15. Future line edits belong to a later accepted version.
- **Exact scope:** Pricing source `7e251d413298476d566b767b2c8869b51d36c0c68032e084a9ddf72513378b25`; visual source `b44941fd34d3101f40bdbf618bd70ff43fad66af90fbe47d73d1785e4f5cf64d`; reviewed HTML `5f1569faa2e8d1563310e09b5a24c0b32f5f07ae4e550177be257fe0f690606f`. Existing navigation, schema, compact footer, contact destinations, ten other pages and public assets remain exact. No model, connector or extra key capability is promised.
- **Release safeguards:** Full reviewed main-text/link parity, 93 ordered source blocks, seven comparison rows, actual object counts, precise direct-entry Assessment scope, native disclosure/print/mobile checks and exact-head GitHub verification. Compare all 79 prior non-Pricing files against #59. Add read-only hosted checks for the fixed preview and production destinations.
- **Cleanup:** Reconcile current documentation and stale active verification assumptions; retain historical approvals/review evidence and existing branches/worktrees. Reuse existing navigation/print ownership rather than duplicate handlers. Remove only task-owned transient output after evidence is retained.
- **Status:** Exact copy/layout and integration/publication authorized. Release execution and verification are recorded in docs/pricing-04-release and GitHub.

- **D-055 publication result:** PR #60 merged as `91e52ee8a8b6d9191a609c5353ac068445bc7147`, tree-identical to reviewed head `940b18209ae279dc807f697d70df37ac1d2ff1e3`. Production run `38692509885` passed 11-page/61-asset content/header/indexing and 78-route checks. Publication record and immutable artifact fingerprints are in docs/pricing-04-release/RELEASE.md and RELEASE.json. Post-publication cleanup reconciles current entrypoints and retains all approval/review history; no new line edits are included.
