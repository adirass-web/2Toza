import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function verifyReleasePolicy({ owner, expectedSha, mainSha, environment, secrets, approvals }) {
  if (typeof owner !== 'string' || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(owner)) throw new Error('Configured production owner login is missing or invalid');
  if (!/^[0-9a-f]{40}$/.test(expectedSha || '') || mainSha !== expectedSha) throw new Error('Current main does not match the verified commit');
  const required = (environment.protection_rules || []).filter(rule => rule.type === 'required_reviewers');
  const reviewers = required.flatMap(rule => rule.reviewers || []);
  if (required.length !== 1 || reviewers.length !== 1 || reviewers[0].type !== 'User' || reviewers[0].reviewer?.login?.toLowerCase() !== owner.toLowerCase()) throw new Error('Production environment must require the configured owner as its sole eligible reviewer');
  const secretNames = new Set((secrets.secrets || []).map(secret => secret.name));
  for (const name of ['TOZA_PRODUCTION_ACCOUNT_ID','TOZA_PRODUCTION_API_TOKEN','TOZA_PRODUCTION_AUDIT_TOKEN']) if (!secretNames.has(name)) throw new Error(`Missing production environment secret: ${name}`);
  const productionReviews = Array.isArray(approvals) ? approvals.filter(approval => (approval.environments || []).some(env => env.name === 'production')) : [];
  if (productionReviews.some(approval => approval.state?.toLowerCase() === 'rejected') || !productionReviews.some(approval => approval.state?.toLowerCase() === 'approved' && approval.user?.login?.toLowerCase() === owner.toLowerCase())) throw new Error('Production environment lacks unambiguous recorded approval by the configured owner');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [envFile, secretsFile, approvalsFile, mainFile] = process.argv.slice(2);
  const read = file => JSON.parse(readFileSync(file, 'utf8'));
  try {
    verifyReleasePolicy({ owner: process.env.PRODUCTION_OWNER, expectedSha: process.env.EXPECTED_SHA, mainSha: read(mainFile).object?.sha, environment: read(envFile), secrets: read(secretsFile), approvals: read(approvalsFile) });
    console.log('Production release policy verified');
  } catch (err) { console.error(err.message); process.exitCode = 1; }
}
