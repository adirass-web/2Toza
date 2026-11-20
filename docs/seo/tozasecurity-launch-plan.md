# tozasecurity.com: SEO launch plan

Status: planning, 18 November 2026. Implement after production host and deployment are verified. Keep every preview noindex.

1. **Domain and indexing:** Confirm Cloudflare zone, DNS, certificate and apex are active. Select apex `https://tozasecurity.com` as canonical and decide whether `www` redirects there. Confirm production pages return 200, production robots permits crawling, sitemap uses the canonical host, preview has noindex and old site URLs redirect appropriately. Verify independently using external HTTP/TLS tools.
2. **Search Console:** Verify ownership using Cloudflare DNS, submit `https://tozasecurity.com/sitemap.xml`, inspect representative URLs, monitor coverage and indexing. Do not request broad indexing until canonical and redirect checks pass.
3. **On-page:** Review titles and unique descriptions for Home, Pricing, About, How it works and each situation. Match actual searches and approved claims; don't rewrite based solely on character counts. Check one H1 per page, descriptive links, alt text and mobile performance. Keep privacy and regulated claims accurate.
4. **Structured data:** Add Organization/ProfessionalService and relevant service markup only after confirming legal entity, contact details, operating area and profile URLs. Validate with Google's tools; don't add fabricated reviews or FAQ rich-result expectations.
5. **Discovery and measurement:** With owner-approved privacy approach, configure analytics/conversion measurement for messaging-link clicks without recording message contents. Establish a baseline and verify consent requirements before deploying tags. Monitor Search Console impressions, clicks, index coverage and qualified enquiries, not rankings alone.
6. **Content roadmap:** Validate search intent and customer language for personal digital security, separation, business disputes and inheritance before prioritizing new content. Document sources and expert review; preserve discretion and avoid unsubstantiated guarantees.
7. **Operations:** Check Core Web Vitals in field data after sufficient traffic; review broken links, accessibility, security headers, DNS and certificate renewals. Check page content and indexing after every deployment. Keep rollback details and review domain auto-renewal.

No business addresses, customer data, ratings, structured claims or geographic scope have been invented. Third-party console setup and analytics changes require the owner's connected account and appropriate access.

## Prelaunch evidence, 18 November

The production build has 13 unique sitemap URLs; each corresponds to an existing page with one absolute canonical on `https://tozasecurity.com`. Production robots refers to that sitemap. Preview pages carry noindex, but preview robots currently disallows crawling: a crawler blocked by robots may not see noindex, so review preview crawl/access policy rather than treating these controls as equivalent. See Google's canonical and noindex documentation: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls and https://developers.google.com/search/docs/crawling-indexing/block-indexing.

Local synthetic accessibility completed 60 runs with zero violations, and the existing local performance gate passed its budgets. These are lab checks, not public Core Web Vitals. Public field LCP, INP and CLS require real user data after deployment; assess the 75th percentile against current https://web.dev/articles/vitals guidance. The Web Performance and Playwright CLI local run was unthrottled on localhost, so it cannot establish real-world performance or optimization savings. External TLS, redirects and final-host metadata need verification after domain activation.
