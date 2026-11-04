import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
execFileSync(process.execPath, [resolve('node_modules/@tailwindcss/cli/dist/index.mjs'), '-i', 'styles/approved-en.css', '-o', 'approved-en-assets/css/main.css', '--minify'], { stdio: 'inherit' });
