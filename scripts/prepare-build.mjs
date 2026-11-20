import { rmSync } from 'node:fs';
const profile = process.env.SITE_ENV || 'preview';
if (!['preview', 'production'].includes(profile)) throw new Error('SITE_ENV must be preview or production');
if (profile === 'production' && process.env.SITE_URL !== 'https://tozasecurity.com') throw new Error('SITE_URL must be https://tozasecurity.com for production');
rmSync(profile === 'production' ? '_site-production' : '_site', { recursive: true, force: true });
