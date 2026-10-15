# Batch C independent rendered review

**PASS — zero required visual or interaction corrections.** Reviewed the approved EN-07 FAQ and Process integration after the explicit final clean-build handoff. Authority: D-038 and `revisions/en-07/ACCEPTANCE.md`. Captured on 13 October 2026 Israel time; runner timestamp `2026-10-12T21:41:26.579Z`. Independent local Chromium browser review; the reviewer did not implement the two approved copy additions.

[Local comparison gallery](http://127.0.0.1:8796/_preview/) · [Actual gallery overview](review-gallery.png) · [Browser checks](capture-checks.json) · [Gallery checks](gallery-checks.json)

## Rendered result

The new question is a compact, underlined supporting link immediately above the existing WhatsApp and Signal actions. The green WhatsApp button remains the strongest action; the guidance link does not resemble a purchase step or replace a contact control. Its spacing and bronze keyboard outline fit the current Clear Practice design. Both contact sections retain their existing introduction and ordinary reading order.

I follow the question from FAQ and see its existing answer opened near the top of the viewport. The neutral suggested message is readable, followed by the complete instruction about passwords, recovery codes, screenshots, legal documents, intimate material and allegations. Following the question from Process produces the same open FAQ answer. Browser Back brings me to the original contact section. Tab moves from the guidance link to WhatsApp and then Signal, so reading guidance remains optional.

All eight fresh contact/guidance screenshots were opened with `view_image`: two source pages × desktop/mobile × before/after link activation. Openings, full-page captures, short-phone contact/guidance/action-focus views, menu-focus views, print-contact captures and the gallery overview were also visually inspected. This verdict uses actual images and interactions, not metrics alone.

| Source page | Desktop contact / opened guidance | Mobile contact / opened guidance |
|---|---|---|
| FAQ | [Contact](faq-desktop-contact.png) · [Answer opened by its self-link](faq-desktop-guidance.png) | [Contact](faq-mobile-contact.png) · [Opened answer](faq-mobile-guidance.png) |
| How Toza helps | [Contact](process-desktop-contact.png) · [Answer opened by its cross-page link](process-desktop-guidance.png) | [Contact](process-mobile-contact.png) · [Opened answer](process-mobile-guidance.png) |

The existing page openings remain calm and readable. FAQ still presents its question groups and expand-all control; Process retains its three prominent commercial stages and eight subordinate steps. The added link introduces no competing panel, warning banner, decorative card, image or motion. Scoped heuristic design judgment: **B+**; AI-pattern judgment: **A**. These are reviewer opinions, not customer or conversion measurements. Required quick fixes: **none**.

## Actual browser gates

- **320 / 390 / 768 / 1440px, both source pages:** actual keyboard Enter and pointer click from contact, not direct target navigation alone. FAQ uses `#what-should-i-send-in-the-first-message`; Process uses `/en/faq.html#what-should-i-send-in-the-first-message`. Each target resolves to the correct question, with its native details element open and both answer paragraphs visible. The opened question starts approximately 28px below the viewport top.
- **History and contact:** Browser Back restores the original route and `#contact`. The hero CTA reaches contact again. Both channel buttons are visible/reachable and retain `_blank` with `noopener noreferrer`; their exact existing URLs are recorded in the checks. No messaging app was opened and no message was sent.
- **Keyboard:** real Tab reaches the visible skip link, Enter focuses main, Tab reaches the primary hero CTA, and the next contact Tab reaches the new question. The question and both messaging actions have visible focus. This traversal passed at all four widths.
- **390 × 667:** menu opens with Enter, Tab exposes visible navigation focus, Escape closes it and restores trigger focus. Both guidance paths and Browser Back are usable on the short phone. Channel focus remains visible. [FAQ short contact](faq-short-contact.png), [FAQ answer](faq-short-guidance.png), [Process short contact](process-short-contact.png), [Process answer](process-short-guidance.png).
- **Layout/assets:** all eight width checks have document width equal to scroll width, exactly one H1 and no broken images. No page exceptions, console errors, loaded-asset HTTP errors or failed requests occurred during the flows. Local content links respond HTTP 200 and same-page targets exist.
- **Print:** print media plus the existing before/after-print hooks show all content sections and open all details, retaining guidance text, service information and the fee. Actual print-contact screenshots were inspected. This is print-media/runtime evidence, not physical printing or PDF pagination verification.
- **Reduced motion:** preference active, document scroll behavior `auto`, zero active CSS animations on both routes.
- **Gallery:** all eight primary images load; working-contact/guidance/full/short-phone/print image links respond HTTP 200. Real Tab/Enter reaches each page panel and its working-contact link. No gallery overflow at 320/390/768/1440. `review-gallery.png` is an actual browser screenshot.

At 390px the FAQ contact block is about 488px tall and Process about 409px tall. Both complete contact blocks, the new supporting link and both channel buttons fit within the tested 667px viewport once contact is reached. Ordinary scrolling remains available for the surrounding long pages. No extra compulsory step or obstruction was observed.

## Scope and reproduction

Applied the previously read local design-review and Playwright instructions, the current owner-selected `DESIGN.md`, and [fresh Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) for relevant keyboard/focus/layout/motion checks. This is a scoped local integration review, not a full generic-guideline or accessibility certification.

Saved **27 fresh browser PNGs**, including eight primary contact/answer captures, four openings, four full pages, ten short-phone/print/menu views and the actual gallery overview. No production source, copy, template or stylesheet was edited by this reviewer. No commits, push, PR #54 change, merge or deployment.

Limits: actual Chromium on the local machine only. No Safari, physical-device, assistive-technology, native browser zoom, external-message delivery, public edge/runtime, customer-conversion or physical-printing claim. Exact source/payload preservation and the existing broader browser suite are separate root gates.

After a stable final build:

```powershell
node docs/batch-c-preview/capture.cjs
node docs/batch-c-preview/serve.cjs
node docs/batch-c-preview/capture.cjs --gallery
```

Port 8796 already runs in a hidden loopback-only process, PID 21988. Do not start a duplicate listener. It maps `/_preview/` to Batch C files under `docs/batch-c-preview` and working routes to `_site`, without writing into `_site/_preview` or changing the older Batch A/B galleries. The next gate is owner review of this rendered local result.
