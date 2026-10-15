# Toza — publication plan for the accepted English copy

Date: 4 October 2026. Status: **IMPLEMENTED IN PREVIEW under D-026 — production release pending.**

The owner accepted the copy at `aeb65a51adc3217844be9c465de69a875084b8e4` and requested a further review followed by a publishing plan. This plan preserves that wording and builds on the existing site. Design recommendations below are proposals, not recovered owner decisions. Facts about the repository are labelled separately from work still to verify.

## Implementation update — 4 October 2026

The owner authorized implementation and chose English-first launch with temporary withdrawal of Hebrew marketing pages. The targeted approach below is implemented on the existing branch/PR, preserving accepted copy. Local verification and independent adversarial review pass; see planning/2026-10-04-implementation-gates.md. Earlier proposal/permission language below is historical context and is superseded by D-026. Main merge/deployment still await the rendered preview and final release gate.

## 1. Recommendation and alternatives

**Recommended: integrate the accepted copy into the existing design system, with targeted layout improvements.** Keep Eleventy, Nunjucks, Cloudflare Pages, the existing font assets, palette, responsive foundation and contact channels. Adapt page composition to the accepted headings and content rather than squeezing new text into the old sales sections. This gives the new positioning a suitable presentation with limited technical change.

| Approach | Benefit | Trade-off |
|---|---|---|
| Targeted layout and content integration — recommended | Preserves the foundation; supports the new page roles and contact flow | Requires deliberate work on shared contact, tables and long-page hierarchy |
| Literal text replacement in existing sections | Smallest initial diff | Existing cards, duplicated footer and obsolete section structure do not match the approved content |
| Full visual redesign or platform migration | Allows a different visual identity | Adds scope without evidence that the current foundation needs replacement |

Planning method: the existing Toza strategy and shared-placement specifications govern the content. The brainstorming skill's context-first comparison informs the proposed design approach. No prototype or visual preference is represented as owner-approved.

## 2. What exists — verified in repository source

| Foundation | Evidence | Implication |
|---|---|---|
| Eleventy 2 / Nunjucks, static output `_site` | `package.json`; `.eleventy.js` | Keep the generator and deployment format. Editorial Markdown is a specification, not currently a rendering input. |
| Shared document shell, menu, contact footer, metadata and schema | `src/_includes/layouts/vault.njk`; `src/_includes/schema-org.njk` | Integrate shared content centrally; avoid duplicate page/footer contact sections. |
| Self-hosted Playfair Display, Inter and Hebrew font assets; dark and light palettes; responsive and reduced-motion rules | `assets/css/vault.css`; `assets/css/fonts.css`; `assets/fonts/` | Reuse the visual language and accessibility groundwork. Actual contrast, wrapping and motion behaviour still need rendered QA. |
| Existing founder portrait | `assets/img/dr-tabansky-portrait-square-640.webp`; `src/en/why-us.njk` | Reuse the real portrait. No new testimonial or institutional-logo proof is needed. |
| English and Hebrew route templates | `src/en/`; `src/he/`; `.eleventy.js` ignores only Russian | README's English-only statement is stale. English-only drafting must not silently decide Hebrew publication. |
| GitHub verification and production deployment | `.github/workflows/ci.yml`; `.github/workflows/deploy.yml` | Branch CI verifies; a push to main invokes production deployment after checks. Keep review and release separate. |
| Route/copy/RTL checks and Playwright | `scripts/`; `tests/rtl.spec.cjs`; `playwright.config.cjs` | Extend these checks for English and the new route set; preserve relevant RTL safeguards. |
| Configured site URL and project | `src/_data/site.json`; deployment workflow | Repository points to `https://toza-site.pages.dev`, project `toza-site`. Verify the actual production deployment/domain before release; no custom-domain change is proposed. |

GitHub main was `5f8fbb8b21563fee3c1c802fe4c9914f74ede029` when inspected. The accepted editorial commit was ahead by 47 commits, behind by zero, with no production-source changes in that comparison. Main is reported protected. Recheck these facts when implementation starts.

This is source inspection, not a live-site visual or infrastructure audit. The existing build and browser suite were not run here: dependencies and `_site` are absent in this editorial checkout. Read-only Hebrew-copy, Leaving-alignment and CI-contract checks passed; the RTL verifier stopped at its missing-built-page prerequisite. That is not evidence of a rendered RTL defect.

## 3. Design and layout

Retain the warm neutral palette, restrained gold accent and serif/sans hierarchy. Let the human voice and named expert carry the service's distinction. Use readable text widths, comfortable paragraph spacing and fewer competing visual treatments. Preserve both colour modes and reduced-motion support; evaluate the decorative background against the longer hero in preview.

**Brand:** use lowercase Latin `toza` for the wordmark, `Toza` in running text and the accepted accessible name. The current header displays `Toza`; update its wordmark casing. Inspect the existing seal artwork for legacy lettering before retaining it. Do not redraw or reinterpret it without a design decision.

**Home:** present the accepted hero as distinct paragraphs rather than one long italic subtitle. Keep the existing content order: recognition and expert help; connected access; paid Assessment explanation; stronger security and teaching; situation routes; paid offer; client control; contact. Use the two primary situation routes with stronger visual weight and the two supporting routes more quietly. Make the Assessment's price, two-device scope and typical duration readily scannable. Do not insert all six service cards or additional duplicated summaries into Home. The review's optional Assessment-repetition cut requires separate wording approval before changing this accepted sequence.

**Why Toza:** use an editorial founder-note layout with the existing portrait, readable single-column prose and the accepted signature/caption. Make the three client-gain sections easy to scan without presenting the note as a pricing grid. Keep the professional-profile link explicit and external.

**Pricing:** separate Before you book, paid Assessment and full engagement visually. Give the first paid visit a clear offer panel; keep its first-aid qualifications beside the promise. Present the accepted Personal/Inner Circle comparison as a semantic table with readable row headers and a mobile treatment that retains every label and value. Put optional Annual Review/Retainer together after the full-service comparison. Keep credit and urgent-fee tables distinct. Avoid a recommended-plan badge or changing purchase labels to Book now.

**FAQ:** retain all approved questions and answers. Use grouped native disclosure elements and the existing expand/collapse mechanism where suitable. Preserve `#how-toza-differs`, `#privacy` and `#boundaries`; visiting a deep link must reveal the relevant content. Comparison tables remain readable and reachable by keyboard. Do not hide essential prices or purchase conditions behind disclosure controls on Pricing or the Assessment page.

**How Toza helps:** retain the approved eight-step sequence, visually grouped into before purchase, paid Assessment and full engagement. A vertical sequence suits the longer explanations better than forcing eight equal cards into the existing three-column component. Keep the gains in the headings.

**Situation pages:** preserve their different mechanisms and boundaries. Use a restrained reading layout, concise offer panel and one closing contact section. Do not turn four distinct pages into the same grid of generic cards.

**Attorneys:** retain a professional reading layout, visible authority/disclosure section and links to service detail. Referral contact remains distinct from authorizing work or receiving findings.

**Protected Assessment:** lay out its approved text with the three authorized duration substitutions only. A clear offer panel, scope list, benefit blocks and urgent table can improve scanning without rewriting its headings or body. Resolve its specified link labels to the approved destinations.

**Short cards:** use only where they help discovery; exact versions come from Shared Copy. Keep action/benefit first, essential scope and price together, and the detail link last. Cards do not replace the canonical product detail. Do not display the detailed reference paragraphs beneath them. Adding a card to a page that already explains that service requires a duplication check.

**Contact/footer:** render exactly one `id="contact"` and one complete closing contact sequence per page. Preserve the page-specific first-person closing on Why Toza. FAQ and Process already give guidance earlier; follow Shared Copy's placement map. The footer beneath contact carries navigation/legal/identity, not another pitch or trust-line duplicate. Keep the approved neutral message. Test channel links without sending messages; verify actual Signal prefill behaviour rather than assuming WhatsApp parameters work there.

## 4. Content-to-template mapping

| Accepted source | Existing target |
|---|---|
| `01-why-toza.md` | `src/en/why-us.njk` |
| `02-pricing.md` | `src/en/pricing.njk` |
| `03-faq.md` | `src/en/faq.njk` |
| `04-what-happens.md` | `src/en/what-happens-during-the-visit.njk` |
| `05-shared-copy-system.md` | `src/_data/i18n/en.json`, shared layout/components, schema descriptions and `llms.txt` |
| `06-home.md` | `src/en/index.njk` |
| `07-separation-divorce.md` | `src/en/separation-divorce.njk` |
| `08-business-founder-dispute.md` | `src/en/business-dispute.njk` |
| `09-they-know-something.md` | `src/en/they-know-something.njk` |
| `10-inheritance-conflict.md` | `src/en/inheritance-clash.njk` |
| `11-for-attorneys.md` | `src/en/attorneys.njk` |
| Protected PA-01-v2 + duration amendment | `src/en/private-exposure-assessment.njk` |

Use the consolidated v3 manifest to verify exact text. Packet titles, review status, provenance, `Metadata`/`Hero` labels, portrait instructions and shared placement notes are editorial instructions; do not print them as page prose. Map title, description and social description into front matter. Convert declared Markdown anchors into real HTML IDs and links into actual hrefs. Rendering and whitespace may change; wording and material qualifiers may not change silently.

## 5. Technical integration sequence

1. **Establish the implementation baseline.** Refresh current main and release status read-only, retain a known production deployment/commit, then create an isolated integration branch when implementation is authorized. Keep the editorial history and accepted-copy hashes available. Do not merge PR #51 merely to publish: its changes are editorial documents.
2. **Resolve the release-language scope.** Recommended planning scope is the accepted English set. The existing Hebrew pages contain the previous prices, device scope and absolute privacy claims. Before launch, choose either an approved Hebrew parity update or an explicitly authorized temporary withdrawal of the affected Hebrew marketing pages. Do not silently leave contradictory offers publicly linked, or silently remove Hebrew/service-language availability. Russian remains unpublished under the current configuration. This is a release decision, not permission to translate now.
3. **Refactor only the shared surfaces required by the copy.** Introduce a controlled page-owned/default contact component, preserve locale boundaries, update English labels and neutral messaging, and correct actual-language labels on Hebrew legal notices. Reuse existing styling/components where they fit. New shared CSS must not regress Hebrew pages retained in the release.
4. **Integrate the English pages and metadata.** Work from the mapped sources. Remove replaced sections rather than leaving old copy beneath new content. Keep founder portrait/profile behaviour. Do not add a form, chatbot, CRM, new tracking or payment flow to this release.
5. **Synchronize secondary public surfaces.** Update English structured descriptions, offers and `llms.txt` from accepted Shared Copy. Preserve Inner Circle's starting-price meaning; never publish a zero or fabricated price for individually quoted work. Review every locale using shared schema before release. Replace stale Assessment/Inner Circle prices, booked-within credit language and no-cloud/no-logs claims in emitted public output. Keep FAQ structured content aligned with visible answers; do not add unsupported claims or promise search enhancements.
6. **Implement route changes as one coherent set.** Proposed EN 301s: Commercial Spying → Business Dispute; Private Investigator → They Know Something; Not IT Support → FAQ `#how-toza-differs`. Preserve the existing founder/whats-included redirects. Remove retired routes from sales links, sitemap and public reference directory. For Leaving a Controlling Relationship, recommend a genuine 410 response with the accepted neutral retirement text in Shared Copy and no sales redirect. Its wording is already accepted; approval of the response status and route implementation remains part of the publication plan. A real 410 needs an appropriate Pages Function/response implementation, not a made-up `_redirects` status rule. Apply any corresponding Hebrew changes only under the chosen language decision.
7. **Reconcile URL declarations and asset freshness.** Update sitemap, canonical/OG URL and hreflang for the routes/locales actually published. The current layout emits EN/HE alternates mechanically; replace that assumption where availability differs. Preserve the root's current EN destination unless separately changed. Verify configured production domain against the actual account before release. `_headers` currently gives assets a one-year immutable cache lifetime while CSS/JS have fixed filenames; version any changed asset URLs or adjust the caching strategy deliberately, then test a returning browser so it receives the new layout.
8. **Extend, do not bypass, verification.** The existing route assertions require fifteen EN and fifteen HE templates, including retired pages. Update them to the approved publication manifest and test old-route responses. Add English copy/metadata/offer checks, unique IDs/contact, internal links/anchors, accessible tables/disclosures, and no editorial annotations in HTML. Scope stale-claim checks to generated public content rather than immutable historical specs.
9. **Review a non-production preview.** Prefer a local preview for initial owner layout review. A remote preview can be manually authorized later; current CI explicitly forbids PR preview deployment, so do not quietly alter that contract. Cloudflare preview URLs are public by default and normally carry noindex; verify the actual headers if one is used. [Cloudflare preview documentation](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
10. **Release only the reviewed implementation.** Run the complete build/check/browser suite on the final commit, obtain final publication approval, then use the existing main-triggered workflow. Capture deployment ID and verify the served pages and redirects. If a material regression appears, use the recorded successful production deployment as the rollback target and reconcile Git afterward. Preview deployments are not rollback targets. [Cloudflare rollback documentation](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Cloudflare `_redirects` rules do not apply to requests handled by Pages Functions. Test the retirement response and redirects on the actual preview/release runtime, not only the local static server. [Cloudflare redirect documentation](https://developers.cloudflare.com/pages/configuration/redirects/).

## 6. Acceptance criteria for the implementation

- Accepted text, metadata, prices, scope, duration, credit, keys, days and support survive rendering with their qualifiers intact.
- One visible H1 and one contact target per page; no duplicated closing pitch, broken anchors, obsolete CTA or old public promise left in schema/reference output.
- All eleven retained English pages render; approved retired routes return their intended redirects/status; sitemap and language alternatives match the release.
- Desktop and mobile review covers Home, Pricing, FAQ, Why Toza, Assessment and a situation page, followed by a full-route smoke check. Check narrow screens, zoom, both colour modes, keyboard navigation, menu, disclosures, table readability, focus and reduced motion. Extend Playwright beyond its current Hebrew-centred coverage.
- Preserve current performance characteristics: self-hosted fonts, appropriate portrait dimensions, limited scripts. Compare before/after loading and layout stability; do not invent a performance score or claim field results without measurement.
- The build, updated content/route contracts and browser checks pass. Stale expectations are revised explicitly, not disabled to obtain a green result.
- Actual contact links, production domain, deployment and rollback target are verified. No test message is sent without authorization.

## 7. Review points remaining

The owner can review the optional editorial observations without reopening the accepted set. Before implementation, approve the proposed layout approach. Before publication, resolve existing Hebrew exposure and the retirement response, approve the rendered preview and authorize the release. The configured domain can remain as-is if account verification confirms it; a custom domain is not a prerequisite introduced by this plan.

No design, integration, route mutation, main merge or deployment has been performed in this planning round.
