import { rmSync } from 'node:fs';
const profile = process.env.SITE_ENV || 'preview';
if (!['preview', 'production'].includes(profile)) throw new Error('SITE_ENV must be preview or production');
if (profile === 'production' && process.env.SITE_URL !== 'https://toza-site.pages.dev') throw new Error('SITE_URL must be https://toza-site.pages.dev for production');
rmSync(profile === 'production' ? '_site-production' : '_site', { recursive: true, force: true });
