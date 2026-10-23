# Worktree ownership and integration registry

Coordinator: primary agent; planning and review: GPT-6.1 Sol; at most two GPT-6 Luna writers.

All entries are on the current cloud host. These paths do not imply availability in another chat or on Windows. Task branches start from the recorded accepted integration commit; the coordinator owns shared Git maintenance. Workers may commit only in their owned worktree.

| Task / issue | Branch | Worktree | Port | Writer / state | Base | PR |
|---|---|---|---|---|---|---|
| [P4 Home motion](https://github.com/adirass-web/2Toza/issues/7) | `build/g-p4-home-motion` | `/workspace/toza-worktrees/p04-motion` | 4104 | Luna implementation worker, reserved | `3dd5abb` | pending |
| [P5 Situation pages](https://github.com/adirass-web/2Toza/issues/8) | `build/g-p5-situations` | `/workspace/toza-worktrees/p05-situations` | 4105 | Luna page worker, reserved | `3dd5abb` | pending |
| [P6 How it works](https://github.com/adirass-web/2Toza/issues/9) | `build/g-p6-how-it-works` | `/workspace/toza-worktrees/p06-how-it-works` | 4106 | Unassigned, reserved | `3dd5abb` | pending |
| [P7 Pricing](https://github.com/adirass-web/2Toza/issues/10) | `build/g-p7-pricing` | `/workspace/toza-worktrees/p07-pricing` | 4107 | Unassigned, reserved | `3dd5abb` | pending |
| [P8 Attorneys and About](https://github.com/adirass-web/2Toza/issues/11) | `build/g-p8-attorneys-about` | `/workspace/toza-worktrees/p08-attorneys-about` | 4108 | Unassigned, reserved | `3dd5abb` | pending |
| [P9 FAQ and Conditions](https://github.com/adirass-web/2Toza/issues/12) | `build/g-p9-faq-conditions` | `/workspace/toza-worktrees/p09-faq-conditions` | 4109 | Unassigned, reserved | `3dd5abb` | pending |
| [Reconcile current sources and decisions](https://github.com/adirass-web/2Toza/issues/13) | `ops/current-reconciliation` | `/workspace/toza-worktrees/ops-current` | 4111 | Luna implementation_plan (completed; Sol reviewed) | `6c25fc2` | [#17](https://github.com/adirass-web/2Toza/pull/17) |
| [Validate once and deploy preview artifact](https://github.com/adirass-web/2Toza/issues/14) | `ops/verified-previews` | `/workspace/toza-worktrees/ops-ci` | 4112 | Luna validation_release_plan (completed; Sol reviewed) | `6c25fc2` | [#16](https://github.com/adirass-web/2Toza/pull/16) |
| [Parallel worktree coordination and prerequisites](https://github.com/adirass-web/2Toza/issues/15) | `ops/parallel-coordination` | `/workspace/toza-worktrees/ops-coordination` | 4113 | Primary coordinator under Sol planning (records implemented) | `6c25fc2` | [#17](https://github.com/adirass-web/2Toza/pull/17) |

Integration checkout: `/workspace/2Toza`, branch `build/g`, port 4100. Previous `build/g-p3-review` branch remains preserved at `465ed92`. Accepted P3 squash `6c25fc2`; approved illustration forward-port `3dd5abb535d144e37fa6dda0752686ec8dc2c767` is the initial P4–P9 base. P4–P9 branches/worktrees exist but are reserved, with no page implementation started. P4 and P5 have separate npm dependencies installed; P6–P9 remain reserved until activated. Install each worktree’s dependencies with `npm ci --cache /workspace/.cache/npm` when activated; never symlink node_modules or generated assets.

Candidate verification: detached `/workspace/toza-worktrees/qa-3dd5abb` at the illustration reconciliation commit, port 4190. Create a new `qa-<short-sha>` for a later candidate rather than pretending this one verifies it.

## Exclusive file ownership

- **P4 Home motion**: scripts/home-motion.*; scripts/site.js; styles/main.css; package.json/package-lock.json; Home box hooks only. Exclusive shared-code ownership while active.
- **P5 Situation pages**: Four situation content files and new situation-specific templates/styles only. No shared schemas/tokens/scripts without coordinator handoff.
- **P6 How it works**: src/content/en/how-it-works.md and page-specific template only.
- **P7 Pricing**: src/content/en/pricing.md and page-specific template only.
- **P8 Attorneys and About**: src/content/en/attorneys.md; src/content/en/about.md and page-specific templates only.
- **P9 FAQ and Conditions**: src/content/en/faq.md; src/content/en/conditions.md and page-specific templates only.
- **Reconcile current sources and decisions**: docs/CURRENT.md; docs/decisions.md; docs/build-g/SOURCES.md
- **Validate once and deploy preview artifact**: .github/workflows/ci.yml; .github/workflows/deploy-preview.yml
- **Parallel worktree coordination and prerequisites**: docs/build-g/WORKTREES.md; CLIENT-PREREQUISITES.md; evidence and proposed settings payload

Tokens, schemas, shared templates and common scripts have one active owner. Sol/coordinator must agree a component contract before dependent page writers edit them. P5 can draft disjoint page work after that contract; merge order remains P4 → P5 → P6 → P7 → P8 → P9. Reserved worktrees receive current `build/g` by merge before activation and after predecessors merge. No force pushes to published task branches.

Start an assigned server with `npm start -- --port=<port>`. Each active worktree owns node_modules, `_site`, generated assets, screenshots and local configuration; share only package/browser download caches. Stop only servers started by this task. Separate hosts use independent clones and unique remote branches, never a shared OneDrive Git directory.

## Verified isolation

[Evidence](evidence/worktree-isolation.json): simultaneous servers on ports 4111 and 4112 served Home/CSS/JS successfully. Filesystem inode checks proved distinct node_modules, `_site` and generated CSS/JS. Both used independent `npm ci` installs with a common download cache. These are local functional checks, not public previews.

PR6 preview used immutable URL `https://6f9138f3.toza-v2.pages.dev` for tested PR merge commit `32e52de01b90f06cd071dd1e8fe7198e0aaf38ee`; PR head `26b37cf` differs by design. Its movable alias is `https://ops-preserve-approved-illust.toza-v2.pages.dev`. CI PR16 merged at `4cacdb8`; [live artifact and deployment evidence](evidence/verified-preview-pr16.json) passed. New workflow preview aliases use `p-<PR number>` for PRs (CI task: `p-16`), or `b-<normalized-ref>-<hash10>` for pushes. The slug is lowercase ASCII alphanumeric/hyphens, at most 14 characters; hash10 is the first 10 characters of SHA-256 of the original ref. Actual checkout SHA and artifact provenance are recorded separately by CI; aliases alone are not acceptance evidence.

## Coordination and release

Use “Design, copyedit TOZA” as the coordination home and [CURRENT](../CURRENT.md) as the repository entry point. Historical chats/branches remain references. Windows inventory and writable-client Cloudflare setup remain [external prerequisites](CLIENT-PREREQUISITES.md), not completed consolidation. No production workflow has been added or invoked. At P10, require a protected production environment, serialize deployments under a production-specific concurrency group, use the validated candidate artifact, and record the rollback deployment before owner cut-over. After launch, make main the sole development base and retire build/g’s active integration role without deleting history.
