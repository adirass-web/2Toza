import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

test('workflow deploys only the verified main artifact with matching digest', () => {
  const workflow = yaml.load(readFileSync('.github/workflows/deploy-production.yml','utf8'));
  const validate = workflow.jobs.validate.steps.find(s => s.id === 'run').run;
  const steps = workflow.jobs.deploy.steps;
  const verification = steps.find(s => s.name === 'Verify production artifact provenance and digest').run;
  const deploy = steps.find(s => s.name === 'Require existing production project and deploy');
  assert.match(validate, /\.event == "push".*\.head_branch == "main".*\.head_sha == \$sha.*\.conclusion == "success"/);
  assert.match(validate, /test "\$DISPATCH_SHA" = "\$EXPECTED_SHA"/);
  assert.match(verification, /sha256sum production\.tar\.gz/);
  assert.match(verification, /\.built_sha == \$sha.*\.source_branch == "main"/);
  assert.match(deploy.run, /refs?\/heads\/main|git\/ref\/heads\/main/);
  assert.match(deploy.run, /\.object\.sha/);
  assert.match(deploy.run, /release-bundle\/production/);
  assert.equal(workflow.jobs.deploy.environment, undefined);
  assert.equal(deploy.env.CLOUDFLARE_API_TOKEN, '${{ secrets.CLOUDFLARE_API_TOKEN }}');
  assert.equal(deploy.env.CLOUDFLARE_ACCOUNT_ID, '${{ secrets.CLOUDFLARE_ACCOUNT_ID }}');
});
