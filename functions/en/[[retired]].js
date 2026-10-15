// Only these retired URLs reach this function; _routes.json keeps other routes static.
export function onRequest(context) {
  const pathname = new URL(context.request.url).pathname.replace(/\/$/, '');
  if (!['/en/leaving-controlling-relationship', '/en/leaving-controlling-relationship.html'].includes(pathname)) return context.next();
  const body = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>This page has been retired.</title></head><body><main><h1>This page has been retired.</h1><p>This service page is no longer available.</p></main></body></html>';
  return new Response(context.request.method === 'HEAD' ? null : body, {status:410, headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'strict-origin-when-cross-origin'}});
}
