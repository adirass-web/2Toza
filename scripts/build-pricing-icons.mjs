// Build monochrome local CC0 brand icons from the lockfile-pinned Simple Icons package.
import { mkdirSync, writeFileSync } from 'node:fs';
import * as simpleIcons from 'simple-icons';

const names = {
  whatsapp: 'siWhatsapp',
  messenger: 'siMessenger',
  gmail: 'siGmail',
  googlechrome: 'siGooglechrome',
  safari: 'siSafari',
  instagram: 'siInstagram',
  facebook: 'siFacebook',
  googlephotos: 'siGooglephotos',
  icloud: 'siIcloud',
  waze: 'siWaze',
  googlemaps: 'siGooglemaps',
};
const output = new URL('../assets/img/pricing-icons/', import.meta.url);
mkdirSync(output, { recursive: true });
for (const [file, exportName] of Object.entries(names)) {
  const icon = simpleIcons[exportName];
  if (!icon) throw new Error(`Missing Simple Icons export: ${exportName}`);
  writeFileSync(new URL(`${file}.svg`, output), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#34413b" d="${icon.path}"/></svg>\n`);
}
