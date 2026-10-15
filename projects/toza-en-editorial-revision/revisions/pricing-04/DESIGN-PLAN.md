# Pricing 04 visual design plan

Status: design plan only, before the new Pricing and visual microcopy freeze. No UI code or production files changed. Public guidance is subordinate to the owner brief, Toza facts and exact proposed copy. Read `RESEARCH.md` and the pinned [Anthropic frontend-design skill](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design/SKILL.md) directly for this plan.

## Design proposition

Show the work a person receives: relevant digital connections become a specific understanding of risk and priorities; if the person separately chooses hardening, those priorities become agreed settings, compatible hardware keys and practiced habits. The visual centerpiece is a substantial illustrated service progression. Contact is a small entry point, and the decision after Assessment is a clear interruption between paid stages. Neither receives the same visual weight as the work itself.

The earlier equal-box journey explained sequence but barely depicted value. This pass replaces abstract step cards with object-based scenes: a method example of digital access; a practical summary of risk and ordered priorities; then an agreed setup, supplied keys and hands-on practice. The six-row core comparison stays concise; fuller specifications remain accessible.

## Compact token system

| Token | Value | Role |
| --- | --- | --- |
| Paper | `#f5f3ed` | Existing Toza background |
| Ink | `#202b29` | Primary words, device outlines and key shapes |
| Muted | `#54615b` | Secondary explanation |
| Line | `#c8cec6` | Structural connections and comparison separators |
| Panel | `#e8ebe3` | Grouped scope and reference surfaces |
| Action | `#234f46` | Contact controls and deliberate decisions |

Source Sans 3 remains the sole family, self-hosted, regular and semibold. Display 38–52px, section headings 26–30px, core product prices 28–36px, comparison text 16–18px, diagram labels at least 15px on phones. Text stays left aligned, generally below 75 characters per line. Exact frozen words will determine final wrapping; labels are not turned into decorative all-caps headings. Existing compact shared footer stays unchanged.

## Page arrangement

A price-led main offer introduces the work, with full hardening prices visually primary. A neutral contact action is available immediately. The compact comparison lets visitors identify coverage differences; the main illustrated progression then makes the Assessment and hardening tangible. Reference terms follow without interrupting the first decision path.

```text
Main hardening offer + full prices             Request private conversation
Brief exact proposition                       Jump to scope comparison

                     Personal Shield          Inner Circle Shield
Coverage comparison  1 person / 2 devices      4 people / 8 devices
                     supplied keys / units of work / network / exact conditions
                     common individual protection standard + inclusions

Private conversation: fit, urgency, arrangements; no purchase commitment
Written offer → acceptance and payment → paid Assessment

+--------------------------- PAID ASSESSMENT ---------------------------+
| relevant access-map method example    | personal threat model         |
| device/account/recovery/data objects  | specific risks and priorities |
| meaningful connecting paths          | practical next-step summary   |
|                                      | ₪3,600 / typically four hours |
+----------------------------------------------------------------------+
                 YOUR SEPARATE DECISION — no automatic continuation
+--------------------------- AGREED HARDENING --------------------------+
| devices + accounts + supplied keys    | practice: sign-in / recovery  |
| implemented changes and testing       | sharing / permissions         |
| distinct time units for Personal/Inner| teaching, verification, record|
+----------------------------------------------------------------------+
Conditional credit ledger immediately with its full eligibility rule

Full specification / detailed method / urgent / additions / boundaries
Private conversation contact controls and first-message/privacy links
Compact existing footer
```

Final order, wording and exact number of matrix rows must follow the copy expert's frozen Pricing and `VISUAL-COPY.md`; this wireframe is an arrangement proposal, not substitute public copy. No diagram labels or actionable text are invented by the render adapter.

## Scope objects in the comparison

People and the devices Toza works on form one visual grouping. Use a recognisable person silhouette, a phone and an alternate-device silhouette; exact words retain the PC/iPad/second-phone allowance. Personal shows one person's two-device grouping. Inner shows a group of four, with the same two-device allowance attached to each person. Grouped count labels remain visible and authoritative; do not make a visitor count eight tiny drawings.

Supplied physical keys get a distinct visual grouping and a model-neutral key shape. Two supplied keys for Personal and eight, two per person, for Inner must be visually unambiguous. Use the copy expert's exact proposed Yubico label. Do not draw branded product photos or a connector that implies an approved SKU, protocol, NFC, FIPS, universal compatibility or supplied phones/computers. A physical-key object should look different from a device under review.

Time is shown with a clear unit beside a clock/calendar object. The typically four-hour Assessment belongs only to the initial paid stage. Personal's typical 7–14 work hours exclude that Assessment; Inner's 2–4 working days stay distinct. The included primary/possible-second day and authoritative support conditions remain in full specifications. The shared network difference is shown through a router with a network line and exact scope label, not a stronger-security badge.

Core matrix cells have short exact words. Common hardening, contingent migration, teaching and verification are grouped once, rather than repeated at length in two columns. Shared treatment must not silently hide individual/private record or group-completion support differences; complete specifications remain available. Full price versus conditional remaining balance is always explicit. The credit rule appears before any remaining-balance ledger, including for direct anchor entry.

## The memorable service graphic

The access-map scene has a few labelled objects whose connecting lines illustrate what Toza considers together: the person's relevant devices, identities/accounts, recovery and data access. It is a clearly captioned **method example**, using exact visual microcopy. It does not show invented names, messages, an attacker, a breach, risk scores, traffic-light verdicts, forensic findings or a new promised formal report. Structural connections explain relationships without suggesting that every illustrated path exists for this client.

Beside the map, a compact summary object uses the exact labels for specific risk assessment, priorities and next steps. No fictional risk findings fill it. The independent value of that practical summary and approved safe first aid remain visible in ordinary words, not behind an illustrative object or disclosure.

The hardening scene depicts agreed settings/access changes, supplied compatible keys and practice. Small sign-in, recovery, sharing and permissions situations supply tangible examples of OpSec teaching. No shield enclosing all data, padlock on every account or before/after exposure score suggests complete protection. Testing and verified applicable work appear as work labels, rather than certification seals.

A separate owner-decision line visibly interrupts movement from Assessment to hardening. Any line or arrow after it is conditional. It does not show that every prospect completes the next stage. Bespoke stays accessible in exact different-scope terms, rather than being erased by a diagram of only two standard products.

## Actions and restraint

Each scene answers what the visitor needs, what they gain and the worthwhile next action, following the selected CRE planner. The first actual action is a private conversation through the existing neutral WhatsApp/Signal controls. Any repeated action uses the same contact destination and exact copy. There is no checkout, booking simulation, fake payment control, forced step completion, lead gate or extra data capture.

The main illustration is readable without animation. A restrained user-triggered reveal may expose additional diagram explanation only if exact microcopy supplies a meaningful label; it must not replace visible material facts. No automatic step cycling or particle/network animation is planned. Native disclosures handle the full specification and secondary method/urgent/follow-up/boundary details. Deep links open their targets; print expands all text and restores previous states afterward.

## Mobile and ownership

At 320px and 390px, keep the two product cells side by side under full-width row-label bands with persistent product names, explicit header associations and 16px body text. The substantial scenes stack in source order, with object drawings re-composed for the smaller width rather than shrinking a desktop access map into unreadable labels. The paid-stage price/time and voluntary decision remain immediately associated with each scene.

All new rules belong to a `.pricing-04` page module and local SVG components. Existing base, fonts, header identity and compact footer are copied unchanged into a standalone review folder. No global refactor, previous Pricing-03 overwrite or production integration. The build records frozen copy, visual microcopy, HTML and asset fingerprints. Screenshots and checks cover desktop, 390px and 320px, full core/full specification consistency, conditional credit at direct entries, visible Assessment value, SVG labels, keyboard, disclosure links, print and horizontal overflow.

## Self-critique before code

A reusable SaaS tier grid or three equal icon cards would again tell rather than show. The purposeful departure is the larger digital-access-to-practiced-setup progression and distinct physical object groupings. The quiet paper/green/type combination is retained because it is Toza's approved identity, not chosen as a generic template. Borders encode scope, group membership, decisions and paid-stage boundaries; decorative accent labels, shadows and gradients are omitted.

The illustration must earn its space: a reviewer should identify the threat model, resulting specific risk assessment, supplied keys, work time and practical OpSec without decoding long paragraphs. A layout that looks sophisticated but cannot communicate those facts fails this brief. Designer checks and expert review are not evidence of increased sales. Comprehension and qualified-enquiry/purchase measurement follow the separate evaluation in `RESEARCH.md`.
