# Independent cleanup assessment — 15 October 2026

Read-only assessment before Pricing-04 integration freeze. This is a cleanup recommendation, not release acceptance or permission to delete branches. Implementation was already changing during inspection; observations below distinguish the pre-integration committed tree `0f665db21a5ca6716c5ae098dad8ce3c15f8adc7` from work in progress.

## Recommended concrete scope

1. Reconcile current entrypoints after the actual release. Root README and project README still call #57 / `d993322` current; CURRENT-STATUS correctly records #59 but still calls Pricing-04 unapproved. Update these current summaries, authority links, rendering ownership and release/preview commands. Preserve dated historical release documents. State the actual deployed revision only after hosted checks, and distinguish the approved integration from an already verified deployment.
2. Make approval epochs explicit in `scripts/accepted-copy.cjs`. `historicalSources = amendments.slice(0,-1)` currently means “everything before Marketing-02.” Appending Pricing-04 changes that meaning and breaks historical EN-04 checks. Use an explicit named historical cutoff/selection; retain fingerprints for every original amendment and protected Assessment. Permit raw Markdown only for specifically approved manifests, not for arbitrary future entries.
3. Give Pricing one active presentation owner. The new `scripts/pricing-layout.cjs` can own the approved source and visual labels; dispatch Pricing-04 before Marketing-02, leaving Home/Why on their existing exact renderer. Conditional Pricing CSS/JS should appear only on Pricing. Preserve legacy rendering helpers while historical/published routes still depend on them. Do not introduce a runtime dependency on prototype generated HTML, mutable `_site`, workstation paths or external services.
4. Separate historical approval validation from current output validation. Active `verify-marketing-02.cjs` assumes effective Pricing is the old frozen source and contains five tables. Preserve validation of that historical approval, but validate current Home/Why against their still-effective frozen sources and current Pricing against its new approved source/visual manifest and composition. Preserve historical EN-04 / Batch A/B/C checks. Add the current release's full-file preservation baseline for all ten other English pages and every prior public asset/routing/legal file, with only the precisely authorized Pricing changes/new assets admitted.
5. Update the hosted release gate's baseline and release naming deliberately. `verify-hosted-marketing-02.mjs` corroborates production against a pre-#59 Home hash. New release verification must corroborate the actually published prior release, retaining raw-byte checks, exact pinned provider exception, owned-origin restrictions, security/noindex checks, exact PR-head checkout and complete hosted routing checks. Reusing a proven helper is reasonable; renaming must update CI-contract assertions and fixed isolated preview destination consistently. Do not widen the preview allowlist as general cleanup.
6. Keep transients ignored. `_site`, node_modules, browser output, Playwright reports and `.wrangler` are already ignored. Do not blanket-ignore approved proposal/release evidence or delete it simply because it was generated. New reproducible evidence can be stored once with a manifest/index rather than copied into multiple active-looking packets.

## Preserve rather than delete

- The tracked document/proposal set inspected contains 465 files (~60.9 MB), dominated by 283 PNGs (~57.9 MB). This is evidence of past exact approvals and renderings, not proof of dead files. Prefer a current release index and explicit historical labels. Any later evidence relocation needs an inventory, stable links, hash preservation and source/dependency review; it is not needed for this release.
- `docs/marketing-02-release/BASELINE-OUTPUT.json` is read by active checks today. Historical preintegration HTML, manifests, canonical instructions, skills, original source snapshots and approved amendments must remain immutable. Replace active references with a new baseline rather than rewriting the old baseline.
- `vault.css` remains relevant to 404/legal/retained verification. Legacy assets passed through by Eleventy are public bytes; deleting them would expand the authorized Pricing-only change. No shipped asset deletion is recommended here.
- Review-only Pricing-03 / Pricing-04 prototypes are accepted-history evidence. Production must not import their transient build output as authority; retaining them does not publish them because Eleventy input is `src` and passthrough assets are explicit.

## Branch/worktree disposition

The following local worktrees were clean at inspection except the intentionally active Pricing integration in `/workspace/toza-release`:

| Worktree / branch | Observed revision | Disposition |
| --- | --- | --- |
| `/workspace/toza-release` / `editorial/toza-copy-harness` | `0f665db` plus active integration | Keep; current work. Its remote counterpart is a separate older editorial branch and must not be overwritten by assuming matching names mean matching history. |
| `/workspace/toza-pr59-production-qa` / `codex/toza-pr59-production-check` | `bba96a8` | Keep pending specific reconciliation; contains two commits beyond observed `origin/main`, including crawler-rule verification correction. |
| `/workspace/VIP` / `work` | `6c525f8` | Keep; registered checkout. Its revision is an ancestor of observed `origin/main`, but that alone does not authorize worktree removal. |
| local `codex/toza-post-release-maintenance` | `52120af` | Keep pending patch/PR comparison; not an ancestor of observed `origin/main`. Squash/cherry-pick history must be assessed before deletion. |

Remote-tracking refs include backup/archive and numerous historical branches. These are a local snapshot, not fresh evidence of remote PR state or safe deletion. No branch, remote ref, PR or worktree deletion is proposed. A future explicit branch cleanup should compare actual remote heads, PR state, distinct patches and user ownership before presenting a bounded deletion list.

## Disposition

The safe practical cleanup is to reconcile current entrypoints, make approval epochs/render ownership explicit and replace stale *active* release assumptions with precise current gates. Preserve historical sources/evidence, existing public files and registered worktrees. Final release review remains pending the parent's integration freeze and actual verification results.
