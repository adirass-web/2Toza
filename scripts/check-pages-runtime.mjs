// Start only a local Pages runtime, run the real routing gate, and stop our process tree.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logPath = path.join(root, '.wrangler/pages-runtime-check.log');
fs.mkdirSync(path.dirname(logPath), { recursive: true });
fs.writeFileSync(logPath, '');
const reservation = net.createServer();
reservation.listen(0, '127.0.0.1');
await once(reservation, 'listening');
const port = reservation.address().port;
await new Promise(resolve => reservation.close(resolve));
const url = `http://127.0.0.1:${port}`;
const runtime = spawn(process.execPath, [
  path.join(root, 'node_modules/wrangler/bin/wrangler.js'),
  'pages', 'dev', '_site', '--ip', '127.0.0.1', '--port', String(port),
  '--compatibility-date', '2026-10-06', '--show-interactive-dev-session=false',
], {
  cwd: root,
  env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
  detached: process.platform !== 'win32',
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
let spawnError;
let gate;
let stopping;
function stopRuntime() {
  return stopping ??= (async () => {
    if (process.platform === 'win32') {
      if (runtime.pid && runtime.exitCode === null && runtime.signalCode === null) {
        const stop = spawn('taskkill', ['/pid', String(runtime.pid), '/t', '/f'], { stdio: 'ignore' });
        await once(stop, 'exit');
      }
    } else if (runtime.pid) {
      try { process.kill(-runtime.pid, 'SIGTERM'); } catch (error) { if (error.code !== 'ESRCH') throw error; }
      await delay(500);
      try { process.kill(-runtime.pid, 'SIGKILL'); } catch (error) { if (error.code !== 'ESRCH') throw error; }
    }
  })();
}
for (const [signal, code] of [['SIGINT', 130], ['SIGTERM', 143]]) {
  process.once(signal, async () => {
    gate?.kill('SIGTERM');
    try { await stopRuntime(); } finally { process.exit(code); }
  });
}
runtime.on('error', error => { spawnError = error; });
for (const stream of [runtime.stdout, runtime.stderr]) stream.on('data', chunk => {
  fs.appendFileSync(logPath, chunk);
  output = (output + chunk.toString()).slice(-8192);
});

try {
  const deadline = Date.now() + 90_000;
  let ready = false;
  while (!ready) {
    if (spawnError) throw spawnError;
    if (runtime.exitCode !== null || runtime.signalCode !== null) throw Error('Local Pages runtime exited before readiness');
    if (Date.now() >= deadline) throw Error('Local Pages runtime did not serve the built English site within 90 seconds');
    try {
      const response = await fetch(url + '/en/', { signal: AbortSignal.timeout(2_000) });
      const html = await response.text();
      ready = response.status === 200 && html.includes('<html lang="en" dir="ltr">') && html.includes('id="main-content"');
    } catch { /* Connection refusal during startup is expected; the deadline remains authoritative. */ }
    if (!ready) await delay(200);
  }
  let gateOutput = '';
  gate = spawn(process.execPath, ['scripts/verify-pages-runtime.mjs'], {
    cwd: root, env: { ...process.env, TOZA_RUNTIME_URL: url }, stdio: ['ignore', 'pipe', 'inherit'], timeout: 120_000,
  });
  gate.stdout.on('data', chunk => {
    process.stdout.write(chunk);
    fs.appendFileSync(logPath, chunk);
    gateOutput = (gateOutput + chunk.toString()).slice(-8192);
  });
  const [code] = await once(gate, 'close');
  if (code === 0 && !gateOutput.split(/\r?\n/).includes('PAGES RUNTIME VERIFIED: 78 route, status, content and asset checks')) {
    throw Error('Local Pages gate did not verify all 78 checks');
  }
  process.exitCode = code ?? 1;
} catch (error) {
  console.error(error.message);
  console.error(output);
  process.exitCode = 1;
} finally {
  // Terminate only the process tree created above, including workerd descendants.
  await stopRuntime();
  console.log('Local Pages runtime log: .wrangler/pages-runtime-check.log');
}
