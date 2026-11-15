import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyReleasePolicy } from './release-policy.mjs';

const owner = 'owner-example';
const sha = 'a'.repeat(40);
const valid = () => ({ owner, expectedSha: sha, mainSha: sha,
  environment: { protection_rules: [{type:'required_reviewers', reviewers:[{type:'User', reviewer:{login:owner}}]}] },
  secrets: { secrets: ['TOZA_PRODUCTION_ACCOUNT_ID','TOZA_PRODUCTION_API_TOKEN','TOZA_PRODUCTION_AUDIT_TOKEN'].map(name=>({name})) },
  approvals: [{ state:'approved', user:{login:owner}, environments:[{name:'production'}]}] });
test('release policy accepts the explicitly configured owner and environment secrets', () => assert.doesNotThrow(() => verifyReleasePolicy(valid())));
test('release policy rejects stale main and unexpected or additional reviewer', () => {
  let p=valid(); p.mainSha='b'.repeat(40); assert.throws(() => verifyReleasePolicy(p));
  p=valid(); p.environment.protection_rules[0].reviewers.push({type:'User',reviewer:{login:'other'}}); assert.throws(() => verifyReleasePolicy(p));
  p=valid(); p.approvals[0].user.login='other'; assert.throws(() => verifyReleasePolicy(p));
});
test('release policy requires each production environment secret by name', () => {
  const p=valid(); p.secrets.secrets=p.secrets.secrets.filter(s=>s.name!=='TOZA_PRODUCTION_API_TOKEN'); assert.throws(() => verifyReleasePolicy(p));
});
test('release policy rejects an absent owner and a later rejected approval', () => {
  let p=valid(); p.owner=''; assert.throws(() => verifyReleasePolicy(p));
  p=valid(); p.approvals.push({state:'rejected', user:{login:owner}, environments:[{name:'production'}]}); assert.throws(() => verifyReleasePolicy(p));
});
