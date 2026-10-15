# PR 59 origin equality — focused independent review

**PASS — ready to commit/push for final exact-head CI and CodeQL.** No required issue. Reviewed only the single uncommitted allowlist assertion after `dc05b398a6426bd92e33c5f82ab5f445ca0a6c6c`. Final hosted script SHA-256: `37e82c32503c80dd115246b03c446623e5e676969b9c7653932fb888b29b1db0`.

Replacing the literal array membership test with `targetOrigin === origin || targetOrigin === productionOrigin` preserves its exact-string semantics for the two fixed owned origins. It performs no substring matching, URL input widening or coercion. Fourteen values tested equivalent outcomes; only the two literal strings passed. Deceptive prefix/suffix hosts, added path/port/slash, wrong scheme, boxed string, null/undefined and number were rejected.

Focused synthetic checks confirm both preview and production foreign redirects still fail before foreign contact. Preview wrong-token and raw asset mutations remain failures. Final syntax and CI-contract checks pass. No source/UI, normalization, headers, routes, timeout, credential or deployment behavior changed.

The saved real hosted artifact `PR59-FINAL-HOSTED-CHECKS.json` at prior head `dc05b39` records PASS for eleven HTML files, 58 raw assets and 78 route checks. Independently checked all 69 comparison entries: compared hashes equal build hashes; assets remain raw; production raw Home hash is the preserved baseline `b8b58403fe660a6168833eca80bdd55db2cc845b365abb6c9ddc72c9441432b7`, with `providerAlreadyOnProduction: false`. That actual evidence belongs to the prior head.

The revised head must still pass its own real hosted job and CodeQL. This semantic review does not claim the alert is already cleared or authorize merge/production publication.
