# Remote branch inventory — 12 October 2026

Baseline: main `6c525f8`. This inventory is a read-only snapshot of actual remote branch heads, not local tracking aliases. No branch was deleted. Ahead/behind counts describe commit ancestry; squash-merged branches can retain distinct commits. GitHub PR states were checked through the API after access became available. PR state alone does not prove that distinct commits are safe to discard.

Archive/backup refs and PR #54 remain protected. Review candidate branch purposes and exact tips before any later deletion.

| Branch | Tip | Ahead | Behind | Disposition | GitHub PR state |
|---|---|---:|---:|---|---|
| `archive/legacy` | `893836fa16276f4e51fb75f3476956bd8758166c` | 0 | 9 | Keep: explicit recovery history | No matching PR found |
| `backup/pre-css-redesign` | `29a273904004823e830f04d51ddb5b184039c9dd` | 0 | 71 | Keep: explicit recovery history | No matching PR found |
| `backup/pre-pricing-faq-css-2026-05-05` | `70945f6c3b528f9040e41165d6ff18d37c79862f` | 0 | 49 | Keep: explicit recovery history | No matching PR found |
| `chore/cloudflare-deploy-cleanup` | `e8885b8e40d5f6534704db98eb2d7fad5643d79b` | 2 | 6 | Keep: open PR; preserve pending work | [#45](https://github.com/adirass-web/VIP/pull/45) OPEN |
| `chore/pre-toza-main-cleanup` | `0866f2aec9f201cf0a0a2304f00d1ee1a02366e1` | 1 | 8 | Keep: inspect unique commits and PR disposition | [#43](https://github.com/adirass-web/VIP/pull/43) MERGED |
| `ci/simplify-toza-deploy` | `b10607fc8d23544241f77eb5b235ff8c94edc833` | 1 | 6 | Keep: inspect unique commits and PR disposition | No matching PR found |
| `codex/draft-final-text-for-4-lps` | `cbd6110435bf2bc79abb16e0f31973a8037fc00a` | 0 | 92 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#24](https://github.com/adirass-web/VIP/pull/24) MERGED |
| `codex/draft-final-text-for-4-lps-0maw9m` | `718bd77f66c6a99cd40a02a705623b29648b570a` | 1 | 93 | Keep: inspect unique commits and PR disposition | [#27](https://github.com/adirass-web/VIP/pull/27) CLOSED |
| `codex/draft-final-text-for-4-lps-idtnj8` | `ad9e1217f051b58bd35ded9569a41fad265b0a08` | 1 | 93 | Keep: inspect unique commits and PR disposition | [#25](https://github.com/adirass-web/VIP/pull/25) CLOSED |
| `codex/draft-final-text-for-4-lps-zq0mu2` | `9f308f4260f1a8937b3251235d51a88879decd2e` | 0 | 89 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#26](https://github.com/adirass-web/VIP/pull/26) MERGED |
| `codex/evidence-ledger-build` | `38bda0b23dad2286b5df1edbd1ad17def9592e7a` | 17 | 4 | Keep: open PR; preserve pending work | [#48](https://github.com/adirass-web/VIP/pull/48) OPEN |
| `codex/improve-landing-page-readability-and-layout` | `5c5d5531573886d45fffcce0e3ae12f0150ad196` | 0 | 87 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#28](https://github.com/adirass-web/VIP/pull/28) MERGED |
| `codex/improve-landing-page-readability-and-layout-pfv4u4` | `2852866258bd401f2dc71a7cd197737633b37d93` | 0 | 79 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#29](https://github.com/adirass-web/VIP/pull/29) MERGED |
| `codex/toza-approved-copy-preview` | `d39f6dbfd58a6c37c4d4fe531d461e898401ebcd` | 6 | 1 | Keep: #55 merged; source history remains distinct | [#55](https://github.com/adirass-web/VIP/pull/55) MERGED |
| `codex/toza-build-tool-maintenance` | `dda97c2360d146fb332d6ea835fdbcc250268cd8` | 2 | 2 | Keep: #53 merged; source history remains distinct | [#53](https://github.com/adirass-web/VIP/pull/53) MERGED |
| `codex/toza-clear-practice` | `613789fae5b033781623786cd1d28cdb5adf437d` | 2 | 3 | Keep: inspect unique commits and PR disposition | [#52](https://github.com/adirass-web/VIP/pull/52) MERGED |
| `codex/toza-home-pricing-narrative` | `c5e7e243764605463cd0b6e05fa33b115240729d` | 1 | 2 | Keep: open PR; preserve pending work | [#54](https://github.com/adirass-web/VIP/pull/54) OPEN |
| `codex/translate-and-match-html-layout-to-en-version` | `7ede8815fd1c19199b0e188c21f1fb3176923ddc` | 0 | 138 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#5](https://github.com/adirass-web/VIP/pull/5) MERGED |
| `codex/translate-and-match-html-layout-to-en-version-gkdwsv` | `b92e543111fbd4cacd0a81bf05a3d5bd8fe50e2f` | 0 | 139 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#6](https://github.com/adirass-web/VIP/pull/6) MERGED |
| `codex/translate-and-match-html-layout-to-en-version-whigt9` | `83440b9f744f5d2cb6e5592294432a6fc7bdee31` | 2 | 122 | Keep: inspect unique commits and PR disposition | [#11](https://github.com/adirass-web/VIP/pull/11) CLOSED |
| `css/mobile-first-rearchitecture` | `49641ae7b9fe9aae98ff1b6278e04d835ab3ec70` | 0 | 62 | Deletion candidate: no unique commits; confirm continued purpose before pruning | [#38](https://github.com/adirass-web/VIP/pull/38) MERGED, [#37](https://github.com/adirass-web/VIP/pull/37) MERGED, [#36](https://github.com/adirass-web/VIP/pull/36) MERGED, [#35](https://github.com/adirass-web/VIP/pull/35) MERGED, [#34](https://github.com/adirass-web/VIP/pull/34) MERGED, [#33](https://github.com/adirass-web/VIP/pull/33) MERGED, [#32](https://github.com/adirass-web/VIP/pull/32) MERGED, [#31](https://github.com/adirass-web/VIP/pull/31) MERGED, [#30](https://github.com/adirass-web/VIP/pull/30) MERGED |
| `deploy` | `7be5ddd2e19d6bfffebe5a1c64db1021ba72bf15` | 1 | 159 | Keep: inspect unique commits and PR disposition | No matching PR found |
| `design/controlled-clarity-build` | `4a39d3f783d613a33f62fc08c1389a9e5fc7b740` | 36 | 4 | Keep: open PR; preserve pending work | [#50](https://github.com/adirass-web/VIP/pull/50) OPEN |
| `design/controlled-clarity-direction` | `9cd376f1e7e6ddbcccf56ff39efc168ee5813bfc` | 16 | 4 | Keep: open PR; preserve pending work | [#49](https://github.com/adirass-web/VIP/pull/49) OPEN |
| `design/visual-upgrade` | `455aee617d5476c2d64f596fbb401a475e958e19` | 15 | 4 | Keep: inspect unique commits and PR disposition | No matching PR found |
| `editorial/toza-copy-harness` | `a2b3fc9d5c6e921db0c45e859b6b3e199b8d2026` | 49 | 4 | Keep: inspect unique commits and PR disposition | [#51](https://github.com/adirass-web/VIP/pull/51) MERGED |
| `feat/hebrew-rtl-mirror` | `5d3c2742bab0ded4c5c74a86a1c251fe606b919a` | 1 | 6 | Keep: inspect unique commits and PR disposition | [#46](https://github.com/adirass-web/VIP/pull/46) MERGED |
| `feat/why-toza` | `de779b0b437d820945a1710afd117aa75804e2b2` | 4 | 5 | Keep: inspect unique commits and PR disposition | [#47](https://github.com/adirass-web/VIP/pull/47) MERGED |
| `feature/eleventy-migration` | `ed466541bfaa3290f164568012557e84ebaaaa84` | 1 | 62 | Keep: inspect unique commits and PR disposition | [#40](https://github.com/adirass-web/VIP/pull/40) MERGED, [#39](https://github.com/adirass-web/VIP/pull/39) MERGED |
| `feature/toza-minimal-rebrand` | `bc1afdb27bc2d758750b664d4b45488b6b697faa` | 31 | 7 | Keep: inspect unique commits and PR disposition | [#44](https://github.com/adirass-web/VIP/pull/44) MERGED |
| `local/session-2026-06-10` | `2e6fa8ec610d0f519f60176904315e55f1c34660` | 0 | 48 | Deletion candidate: no unique commits; confirm continued purpose before pruning | No matching PR found |
| `vault-redesign` | `c86665fe5673b456bd6dd802855a7a032fc9003d` | 21 | 30 | Keep: inspect unique commits and PR disposition | [#42](https://github.com/adirass-web/VIP/pull/42) MERGED, [#41](https://github.com/adirass-web/VIP/pull/41) MERGED |
