# Photography discovery — 15 November 2026

Repository baseline: `6a64cc2`. Status: **six source-verified discovery candidates; visual selection blocked**. No candidate is recommended or owner-approved. No downloaded original, source dimensions, approved crop, derivative, contact sheet or final page composition is available. No product template or published asset changed during discovery.

## Visual direction and geometry

The local Home hero and business scene were inspected with `view_image`. The hero uses warm brown natural materials, soft background detail and an ordinary phone in a believable setting. The business scene uses restrained dark blue and amber light. New images should support that quiet everyday context. Search descriptions alone cannot establish a match.

The intended slots remain Personal Shield (`card`) and the assessment explanation on How it works (`section`). Both use provisional 3:2 cover geometry, no overlay or bleed. The older selection record's desktop Pricing width of 452px predates the Preline three-card grid and must not be reused. The implementation must supply current measured widths and final slot approval before crop selection. Phone Pricing widths of 172/242px are historical measurements, also subject to recheck. No geometry was changed to fit these sources.

## Six candidates

Each source page explicitly identifies the image as free under the standard [Unsplash License](https://unsplash.com/license), rather than Unsplash+. Source-page evidence was retrieved on 2026-11-15 through Parallel; its indexed acquisition dates are below. That retrieval is not an original-file download. CDN dimensions in search results describe a transformed search image, **not verified original dimensions**.

| ID / intended slot | Exact source and photographer | Publication / evidence acquisition | Search image / original dimensions | Status and next inspection |
| --- | --- | --- | --- | --- |
| P1 / Pricing | [TK0kQP476cU — devices on a desk](https://unsplash.com/photos/devices-like-laptops-tablets-and-phones-are-on-a-desk-TK0kQP476cU), Jakub Żerdzicki | 2025-06-24 / 2026-11-15 | Search 3000×2001; original unknown | `candidate`. Source camera: Sony ILCE-7RM3A. Check whether the tablet/laptop/phone arrangement feels like an everyday scene or a decorative device collage. |
| P2 / Pricing | [fRETO_A-pz8 — phone beside laptop](https://unsplash.com/photos/a-cell-phone-sitting-on-a-desk-next-to-a-laptop-fRETO_A-pz8), Peter Kalonji | 2023-10-27 / 2024-10-20 | Search 3000×3662; original unknown | `candidate`. Source describes a Notion student template. Inspect screen branding/text carefully. Portrait source requires a substantial 3:2 crop; reject if the device relationship is lost. |
| P3 / Pricing | [kH8_s_sugss — phone on wooden table](https://unsplash.com/photos/a-cell-phone-sitting-on-top-of-a-wooden-table-kH8_s_sugss), appshunter.io | 2024-10-25 / 2025-07-28 | Search 3000×2000; original unknown | `candidate`. Source camera: Fujifilm X-Pro3. Inspect phone UI, brand marks and whether the frame reads at the small card width. |
| M1 / How it works | [VSx2aKAj1HY — notebook, glasses, pen and laptop](https://unsplash.com/photos/a-desk-with-a-notebook-glasses-pen-and-a-laptop-VSx2aKAj1HY), Fiona Murray-deGraaff | 2023-05-12 / 2026-11-13 | Original and uncropped search dimensions unknown | `candidate`. Source describes a white-background flatlay with calendar. Check warmth, any visible dates/text and whether the stationery remains legible as objects on phone. |
| M2 / How it works | [8KTTE5274EQ — notebook and pen on wooden table](https://unsplash.com/photos/a-notebook-and-pen-on-a-wooden-table-8KTTE5274EQ), Kelly Sikkema | 2022-06-01 / 2026-10-21 | Original and uncropped search dimensions unknown | `candidate`. Source camera: Nikon D500. Inspect natural light, blank versus written pages, room context and 3:2 crop. This is a useful different-subject lead to inspect beside a device photo; it is not a selected pair. |
| M3 / How it works | [F6_mI0aGdZU — laptop, glasses and notepad](https://unsplash.com/photos/a-desk-with-a-laptop-glasses-and-a-notepad-F6_mI0aGdZU), Fiona Murray-deGraaff | 2023-05-12 / 2026-11-07 | Original unknown; third-party search derivative 2560×1707 | `candidate`. Alternate from the same photographer/session as M1; compare actual framing before choosing either. Third-party derivative is discovery evidence only and was not downloaded or adopted. |

P1–P3 came from Parallel Image Search `search_e5c85b5c37387531ac38417b862299c4`. M1 came from `search_93e1ff64ab8650b72a3d7f90a2793a1e`; M2 from `search_a2727c27fd3b33bb14833efbcc2002fc`; M3 was also surfaced by Parallel Web Search and exact-ID image search `search_291774be67ecf845ed63c1ddcf2fc805`. The latter returned third-party copies, so the original Unsplash source controls provenance. Parallel session: `session_c120cc9bcb93ad3e5535dd22ce771c8c`.

## Commercial permission and limits

Primary Unsplash guidance says its images can be used for most commercial projects, with no required attribution or contributor permission. It specifically permits an image on a website selling a product or service. Credit is appreciated. This supports the copyright-license basis for ordinary website use, but does not certify the pictured subject's separate rights.

- [Commercial projects](https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects), retrieved 2026-11-15; indexed acquisition 2026-11-14.
- [Websites selling services / product resale restriction](https://help.unsplash.com/en/articles/2612317-can-i-use-unsplash-images-as-part-of-a-product-to-sell), same dates. Do not sell unaltered photos or photo products as if this were a resale license.
- [Releases and trademarks](https://help.unsplash.com/en/articles/2612329-releases-and-trademarks), same dates. Copyright permission does not resolve recognizable people, private property, brands, screens or depicted copyrighted work. Unsplash does not guarantee every image's release coverage.

No candidate's visible logos, people, screen content, private details or property-release requirements have been cleared through pixel inspection. Avoid any Toza staff, client, premises or endorsement implication. Source titles and camera metadata are evidence of provenance; they do not independently prove that a file is an unaltered real photograph. Visual review remains required.

## Blocker and recovery

The workspace network proxy returned `403 Forbidden` while establishing HTTPS connections to `images.unsplash.com`. The failure occurred through Python and curl, with additional network permission, and once with `require_escalated`. The escalation was permitted; this was an upstream network failure, not an automatic approval rejection. Direct networking could not resolve the host.

Firecrawl retrieved the M2 source page and returned a page screenshot URL, but no inline image. Its generated screenshot could not be downloaded because the proxy also returned 403 for `storage.googleapis.com`. Native web open could access neither image URL. Firecrawl interaction timed out after 35 seconds. Exact-ID native image search returned an unrelated collection screenshot, so it was not accepted as candidate review. No unrelated storage service was used to relay assets.

Continue by downloading the six original free assets through a working authorized network route into `.artifacts/photography/candidates/`. Record file hashes, actual source dimensions and download date. Inspect every file beside Home; reject weak subjects or rights issues. Then generate a browser contact sheet and desktop/320/390px crops inside current measured geometry. Recommend a coherent pair only after those checks. Obtain the owner's explicit image and crop decision before integration. Candidate discovery is advanced; photograph selection is incomplete.
