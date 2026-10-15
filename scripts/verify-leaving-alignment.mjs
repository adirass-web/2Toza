import { assert, readText } from './verify-utils.mjs';
// Exercise the actual Pages Function without changing the repository's CJS convention.
const {onRequest} = await import('data:text/javascript;base64,' + Buffer.from(readText('functions/en/[[retired]].js')).toString('base64'));
for (const suffix of ['', '/', '.html', '.html/']) {
  for (const method of ['GET', 'HEAD']) {
    const response = await onRequest({request:new Request('https://toza-site.pages.dev/en/leaving-controlling-relationship' + suffix, {method}),next:()=>{throw Error('Retired route fell through');}});
    assert(response.status === 410, 'Retired route must return 410');
    assert(response.headers.get('x-robots-tag') === 'noindex', 'Retirement indexing guard');
    const body = await response.text();
    assert(method === 'HEAD' ? body === '' : body.includes('This page has been retired.') && body.includes('This service page is no longer available.'), 'Retirement response wording');
    assert(!/href=|contact|WhatsApp|Signal/.test(body), 'Retired response must have no sales CTA');
  }
}
assert(await onRequest({request:new Request('https://toza-site.pages.dev/en/pricing.html'),next:()=> 'static'}) === 'static', 'Function intercepted retained page');
const routes = JSON.parse(readText('_routes.json'));
assert(!routes.include.includes('/*') && !routes.include.includes('/en/*'), 'Functions must not swallow static redirect rules');
console.log('RETIREMENT RESPONSE VERIFIED; EDGE ROUTING REQUIRES RUNTIME GATE');
