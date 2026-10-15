# Batch C — independent adversarial corpus review

Date: 13 October 2026. Reviewed baseline: `b1f88a081e6c88d8256d0f921e6bcf17e847e02b`, local branch `codex/toza-trust-process-refinement`. Scope: D-037 / approved 12 October plan, Batch C. Independent reviewer did not draft the public copy or edit its sources.

## Executive verdict

**G3 PASS — the two complete link-only candidates are READY FOR OWNER REVIEW. Public-promise consistency PASS.** One moderate baseline contact-guidance placement finding is addressed by the reviewed candidates. No blocker, major claim defect or unresolved commercial/factual decision was found. Preserve FAQ length, all current service facts and the protected Assessment. No general corpus rewrite is justified.

The independent first pass found no necessary semantic rewrite. After the editor identified C-01, the reviewer inspected the exact shared placement instruction, current generated contact/disclosure markup and hash behavior independently. That evidence supports the narrow finding below. This is a source-based editorial/access judgment, not a report of customer testing or executed browser interaction.

## Authority and complete read scope

Read project `AGENTS.md`, locked architecture, doctrine, execution instructions, decision register through D-037, consolidated v3, page-by-page calibration, the historical `source/TOZA_EN_COPY_REVIEW.md`, approved execution plan and all four project Toza skills. The Red Team skill supplies this gate; Editor, Strategy and Copywriter constrain changes and ownership. Later decisions supersede historic public minimum-duration wording, dispute-only positioning, conditional full-service value and the old standalone Not IT Support task. Historical calibration diagnoses are not automatically defects in later accepted copy.

Read every full effective payload, including metadata, through `scripts/accepted-copy.cjs` `pages()` and verified `assertAuthority()`:

| Route | Current authoritative source beneath `projects/toza-en-editorial-revision/` |
|---|---|
| Home | `revisions/en-04/06-home.md` |
| Pricing | `revisions/en-04/02-pricing.md` |
| Separation | `revisions/en-04/07-separation-divorce.md` |
| They Know Something | `revisions/en-04/09-they-know-something.md` |
| Why Toza | `revisions/en-05/01-WHY-TOZA-CANDIDATE.md` |
| Business | `revisions/en-06/01-BUSINESS-CANDIDATE.md` |
| Inheritance | `revisions/en-06/02-INHERITANCE-CANDIDATE.md` |
| Attorneys | `revisions/en-06/03-ATTORNEYS-CANDIDATE.md` |
| FAQ | `revisions/en-02-v2/03-faq.md` |
| Process / How Toza helps | `revisions/en-02-v2/04-what-happens.md`; approved EN-05 map is presentation-only |
| Private Exposure Assessment | `approved/pa-01-v2-effective.md`, protected S0/C0 |

Also read the accepted shared `revisions/en-02-v2/05-shared-copy-system.md`, active `src/_data/i18n/en.json`, `src/_includes/layouts/vault.njk`, `contact-channels.njk`, `schema-org.njk`, root `llms.txt`, `assets/js/site.js`, acceptance/presentation adapters, `.eleventy.js` and `_redirects`. Current shared data overrides old fallback strings in the layout. Unused library variants and historical/provisional notes are not extra live paragraphs. No current public mismatch is inferred from those historical labels.

All source locations below are repository-relative; `P/` means `projects/toza-en-editorial-revision/`.

## Findings and disposition

### C-01 — Moderate: contact destinations lack a direct route to existing first-message guidance

**Authority:** accepted shared copy says, “FAQ and How Toza helps already carry first-message guidance earlier on the same page; their contact destination must retain access to that guidance.” (`P/revisions/en-02-v2/05-shared-copy-system.md:267`). Its placement table retains brief endings and explicitly avoids duplicate full contact modules (lines 256–257).

**Observed source:** FAQ's closing begins “Send a short, neutral message through WhatsApp or Signal.” (`P/revisions/en-02-v2/03-faq.md:230`). Its generated contact section (`src/en/faq.njk:160`) has channels but no link to the guide. “Do not send passwords, recovery codes, screenshots, legal documents, intimate material or details, or detailed allegations in that first message.” remains in the earlier answer (`P/revisions/en-02-v2/03-faq.md:84`), rendered inside a closed `details` element at `src/en/faq.njk:75–77`.

Process's closing says “Send a short, neutral message through WhatsApp or Signal. We will confirm fit and the next step before you decide about the paid visit.” (`P/revisions/en-02-v2/04-what-happens.md:126`; generated contact `src/en/what-happens-during-the-visit.njk:68`). Its warning remains visible in Step 1 at source line 50 / generated line 25, but the closing supplies no route back to it.

**Challenge and conclusion:** the guidance is present on both pages; there is no missing warning in the corpus or broken existing anchor. Merely being earlier on the page is weaker than retaining access from the contact destination when hero/header links jump directly there. FAQ is the stronger case because the warning is collapsed. `assets/js/site.js:41–52` reveals the targeted element/ancestor disclosures; `#contact` does not reveal or point to the earlier FAQ answer. The specific accepted placement requirement supports a small access correction on both closings. This is not an invented safety prerequisite, public-promise contradiction or reason to duplicate the whole warning catalogue.

**Disposition:** agree with editor C-01. Propose one compact link at each closing to existing guidance. Preserve its complete answer, existing contact text, channels, neutral prefill and a single contact target. Reusing an approved question label does not itself approve a new placement; show exact candidate insertion for owner approval before implementation. No factual/commercial owner decision is needed. Process's current C0 implementation is not silently reopened: any additive link is an explicitly identified new unit.

### C-02 — Minor observation, no correction: summary wording foregrounds urgent findings

The editor compares “what urgent exposure we found” in FAQ (`P/revisions/en-02-v2/03-faq.md:106`) and “what urgent exposure was found” in Process (`P/revisions/en-02-v2/04-what-happens.md:76`) with broader “what was reviewed, found and changed” in Home (`P/revisions/en-04/06-home.md:68`).

**Disposition:** preserve current wording. Surrounding inspection/diagnosis, remaining issues and next steps prevent an urgent-only service reading. FAQ explicitly admits a proactive client at line 44. PA retains the same urgent-summary language at `P/approved/pa-01-v2-effective.md:44`; its positioning exception is explicit current authority. There is no omitted promised deliverable or factual conflict to resolve. Do not propagate a stylistic replacement into PA.

### C-03 — Minor internal provenance observation, outside public-copy correction

The v3 table still points Business, Inheritance and Attorneys to EN-02 (`P/TOZA-EN-COPY-SPEC-v3.md:26`, `:28`, `:29`), while its latest top amendment note covers Batch A (`:5`). The accepted Batch B manifest and resolver correctly identify the EN-06 sources. The table is historical in context, but an additive Batch B pointer would make later source discovery easier.

**Disposition:** nonblocking internal index housekeeping only. Current authority is not unresolved: D-035/D-036 and the additive loader govern. Do not alter accepted payloads, old manifests or the historical table to remedy this. The present report's effective-source map supplies the Batch C pointer. No factual owner decision.

## Ten adversarial tests

| Test | Result and evidence |
|---|---|
| 1. Authority conflict | PASS. Numeric facts, scope and stage promises align in current Pricing, FAQ, Process, PA, structured offers and reference summary. Historic duration/dispute-only wording is superseded, not a live conflict. |
| 2. Premium-brand failure | PASS. Named in-person work, explained dependencies, precise scope, approval and teaching supply value. No luxury claims, SaaS plans or unsupported scarcity are required. |
| 3. HNW reader | PASS as editorial judgment. Current prose discusses consequential access without explaining a reader's life back to them. FAQ's greater detail serves its reference role. No customer evidence is claimed. |
| 4. Cybersecurity clichés | PASS. No material generic cyber-war/“world-class”/“peace of mind” promise in the effective corpus. Product names remain approved, including Bespoke Private Protection. |
| 5. AI-language | PASS with ordinary density limitations. Repeated scope and consent phrases are operational consistency. Situation mechanisms and founder first-person voice prevent a cloned persuasive argument. |
| 6. Fear/manipulation | PASS. Home says information “can” be used against a person and explicitly says access “does not establish misuse” (`EN-04/06-home.md:44`). Situation pages retain non-attribution and authority limits. Urgency depends on accepted availability and payment, not emotional pressure. |
| 7. Credibility attack | PASS. No guaranteed discovery/removal, hidden change, formal threat-model deliverable, forensic attribution, legal advice or unlimited coverage. Existing founder experience is not expanded into a Toza results history. |
| 8. Founder access | PASS. Why ties understanding to priorities and consequences before approval (`EN-05/01-WHY-TOZA-CANDIDATE.md:74`), not just biography. Its existing professional profile link remains at line 88. |
| 9. Density/repetition | PASS except C-01's access relationship. Canonical detail and minimum trust repeat where needed; no required deletion. C-01 should be solved with a link, not another full ending. |
| 10. Conversion-funnel smell | PASS. One contact destination per page, qualification without purchase, explicit acceptance/payment and voluntary full engagement. No guarantee, manufactured scarcity or recommended-plan pressure. |

## Fixed terms and minimum trust

| Topic | Independent consistency result |
|---|---|
| Assessment | ₪3,600 VAT included; main phone plus one PC/iPad/second phone; typically four hours; outcome-based agreed intake, mapping, diagnosis and safe approved urgent first aid. Summary remains useful without continuation. FAQ lines 88–110; Pricing lines 45–59; protected PA lines 17–46. |
| Personal Shield | ₪14,000 VAT included; one person and the same two-device rule; two supplied/configured/tested compatible keys; essential migration, teaching, verification/private dated record; primary working day plus second if needed. Pricing comparison lines 73–83, FAQ lines 118–132. |
| Inner Circle | From ₪42,000 VAT included; four people/eight personal devices/eight keys; one extra shared network/router; remaining-group mapping in full engagement. Individual/private and shared-network records; disclosure only by each participant's consent. Pricing lines 73–97, FAQ lines 142–162. |
| Network/expanded work | Accessible settings and authorized administration; replacement hardware, extra connected devices/locations and expanded people/devices require agreed separate scope/price. No enterprise audit or entitlement promise. |
| Support/later work | Personal 14 days, issues directly related to Toza changes, no remote control; group 14 days from group completion covering four people and included network. Annual Review/Retainer individually quoted after completed full service, separate from support. Pricing lines 83–112; FAQ lines 134–190. |
| Credit | Full ₪3,600 toward Personal/Inner Circle/Bespoke if service begins within 14 days after initial completion; booking alone insufficient; once per group; additions separate. Balances ₪10,400 / starting ₪38,400. Pricing lines 116–123; FAQ lines 168–172; PA lines 60–64. |
| Urgency | Confirm availability before payment; accepted Central Israel four-hour arrival clock begins after acceptance AND payment receipt, not first message or completion. ₪4,800 ordinary / replacement ₪6,000 weekend-holiday; Assessment totals ₪8,400 / ₪9,600, VAT included; outside-area terms agreed first. Pricing lines 127–134; FAQ lines 176–184; PA lines 70–77. |
| Privacy/control | Presence, credential control, approval before material changes, no ongoing credential retention/remote control; qualified dataset/cloud/ordinary lawful record wording. Participant consent and adviser authorization remain distinct. FAQ lines 194–226 and protected PA lines 79–85. |
| Service model | Agreed hardening plus practical habits/teaching, no monitoring/security-software installation. Assessment examination is not monitoring or unlimited content inspection. PA is protected; absence of a later explicit no-monitoring sentence is not a contradiction. |
| Three stages | Qualification has no inspection/diagnosis/technical work; paid Assessment has independent value; broader hardening has its own acceptance/scope/price. Process lines 46–54, 70–88; FAQ lines 72–110; all situation endings and offer bridges align. |
| Unknown risks / proactive client | A known intrusion, dispute or ability to identify the fault is not required. Home line 74, Why lines 46/66, FAQ line 44 and `llms.txt:5` retain the invitation. No guaranteed hidden discovery is implied. |

Every page gives relevant local presence/control/scope/purchase information and links to canonical detail. Why supplies enough Assessment/full-service distinction without reproducing every price. Attorneys adds referral and disclosure authority. The C-01 link proposal improves access to an existing contact instruction; it does not expand the trust payload into another service manual.

## Cross-page repetition and differentiation

| Material | Disposition |
|---|---|
| Assessment name/fee/scope/duration/summary | Must repeat at local buying points; keep concise and link full detail. |
| Credential control, approval, lawful authority, no monitoring/software | Must repeat sufficiently for independently reached pages; equivalent wording need not be identical. |
| Qualification, neutral first message, acceptance/payment | Keep one complete ending or approved brief variant per page; preserve Why's personal voice and Attorneys' referral wording. C-01 supplies a missing route to guidance for brief endings. |
| Credit, urgent fees, network/support detail | Pricing comparison and FAQ question-specific detail perform different jobs. Situation links already avoid reproducing the full tables. No new cuts. |
| Shared full contact/privacy text, six cards, reference descriptions | Placement alternatives/reference tiers, not cumulative page copy. Do not count unused library blocks as live repetition. |

Title-removal differentiation passes for the situation pages: Separation discusses chosen family access and its effects; Business links private/work identities and continuing business dependencies; They Know starts from unexplained surfaced information without attributing it; Inheritance keeps family-help arrangements and estate entitlement separate. Business says “A dispute does not itself authorize changes to company systems or another person's accounts” (`EN-06/01-BUSINESS-CANDIDATE.md:69`). Inheritance says “it does not decide ownership or legal entitlement to family or estate information” (`EN-06/02-INHERITANCE-CANDIDATE.md:51`). Attorneys says “A referral does not authorize access to devices, accounts or findings” (`EN-06/03-ATTORNEYS-CANDIDATE.md:49`). These are consequential differences, not renamed copies of Separation.

Home's risk is concrete, but it also says “You can choose a more secure, more private digital life before you notice a problem” (`EN-04/06-home.md:32`) and gives performed hardening/teaching at lines 48–52. `scripts/home-pricing-narrative.cjs` places the full-service benefit section before the deeper risk section. Quiet premium does not require weakening that approved benefit/risk argument. Why's first-person judgment and senior continuity remain a different trust job. No restyling or new benefit promise is justified.

## Page scores

Heuristic scores, 1–5, for the current baseline; not market validation or a measured conversion result. Scores do not authorize rewrites. PA is scored only as a consistency/reference check.

| Page | Clarity | Differentiation | Premium | Human credibility | Emotional precision | Restraint | Proof | Density | Next step | Consistency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | 5 | 5 | 4 | 5 | 4 | 4 | 4 | 4 | 5 | 5 |
| Why | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 5 | 5 |
| Pricing | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 5 | 5 |
| FAQ | 5 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | 4 | 5 |
| Process | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | 5 |
| Separation | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 5 | 5 |
| Business | 5 | 5 | 4 | 5 | 4 | 5 | 4 | 4 | 5 | 5 |
| They Know | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 5 | 5 |
| Inheritance | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 5 | 5 |
| Attorneys | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 5 | 5 |
| Protected PA | 5 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | 5 | 5 |

## Shared and protected verdicts

Navigation, footer identity, primary action, WhatsApp/Signal destinations and neutral prefill remain aligned with accepted shared copy. English legal links accurately identify Hebrew. Active structured organisation/offer descriptions retain separate paid stages, VAT, fixed versus starting prices and group qualifications. `llms.txt` retains proactive eligibility, full-service limits, credit/urgent conditions and privacy boundaries. A/B changed persuasive paragraphs, not these facts; there is no justified shared/structured/reference rewrite.

Protected PA remains **PROTECTED / NO CHANGE**. Price, scope, typical duration, completion, credit, urgent arithmetic, metadata and adapter-provided contact/Pricing/Process links align. Its conditional recommendation and summary wording are authorized exceptions. No new no-monitoring paragraph or style correction is proposed.

Retired Not IT Support now points to FAQ's comparison; other replacement/retirement and Hebrew/Russian publication controls remain source-consistent. This review does not claim to have retested live redirects or hosted statuses.

## Verification and release boundary

Independently executed `node scripts/accepted-copy.cjs --check`: **PASS**, accepted/protected hashes and all generated templates. Independently parsed the eleven current adapter outputs: **97 internal body/page-index route/fragment links checked, zero missing destinations, exactly one contact target on each page**. This count excludes shared layout navigation/footer; it is not a browser check or hosted-link claim. Editor/mechanical inventories have different scopes and should not be summed with this count.

No approved source, manifest, template, asset, protected page, PR #54, main or deployment setting was edited by this reviewer. No enquiry was sent. Release, hosted preview and actual browser/assistive-technology validation are outside this editorial verdict.

## Candidate gate

Read the settled `00-BRIEF.md`, complete saved `04-FAQ-CANDIDATE.md` and `05-PROCESS-CANDIDATE.md`, including metadata, and `06-EDITORIAL-REVIEW.md` after the independent diagnosis. Rechecked both complete payloads independently with the repository exact-block/LF extraction convention.

| Candidate | Exact reviewed SHA-256 | Addition |
|---|---|---|
| FAQ | `1128e453d6edd13c5c9cbca026239b8c2176fbcce64db686d0b495257e1e5eea` | `[What should I send in the first message?](#what-should-i-send-in-the-first-message)` at candidate line 230 |
| Process | `55a6c0e3c2c26475fd843f4f822a6ff77c6798e14af28b6f821ea40d638fe8dd` | `[What should I send in the first message?](/en/faq.html#what-should-i-send-in-the-first-message)` at candidate line 126 |

For each candidate, removing that one insertion and its blank-line separator reconstructed the entire current approved payload exactly. Complete metadata was identical. In-memory rendering through the current adapter put exactly one guidance link in the contact section and retained the existing shared channel include. The target is the existing FAQ `details` ID; the current hash-reveal code supports opening it. No source/template was saved by that rendering check, and no fresh candidate browser result is claimed.

The cross-page Process link is acceptable: it names and reaches the canonical first-message answer directly, rather than sending the reader to a generic FAQ page or adding another warning. Step 1 remains complete and visible in the existing Process sequence. The neutral question fits the current voice, adds no service promise or compulsory step, and does not change the primary action. The existing staged purchases, approval/credentials, price/scope, support, credit, urgency, record and consent boundaries therefore retain their full wording.

**Final disposition: C-01 addressed in the two exact draft candidates; C-02 retain/no change; C-03 optional internal pointer only. Zero unresolved blocker, major, required candidate correction or factual owner decision. G3 PASS / READY FOR OWNER REVIEW for the complete two-page candidate payloads above.** Public integration has not occurred, so this does not claim the baseline access issue is already fixed in the preview. Exact owner approval, authorized additive acceptance/integration and later rendered checks remain subsequent gates. The other nine pages, accepted shared library, metadata and protected PA require no change. No release approval is inferred.
