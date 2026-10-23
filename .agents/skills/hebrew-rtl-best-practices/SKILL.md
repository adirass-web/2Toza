---
name: hebrew-rtl-best-practices
description: Implement Hebrew web layouts, bidirectional content and direction-safe CSS within the approved Toza specification.
license: MIT
---

# Hebrew RTL implementation

Local adaptation of the user-provided MIT skill read in this session, formerly at `skill://user/6a57aa1e8d688191ab45671466a923d7/hebrew-rtl-best-practices`. Preserved locally because the cloud skill catalog is no longer available. This is implementation guidance, not a new visual specification.

- Follow the owner's approved typefaces, type roles, sizes, colours and layout. For Toza, body copy is at least 17px; do not replace Frank Ruhl Libre or Assistant with another font recommendation.
- Actual Hebrew pages set `<html lang="he" dir="rtl">`; changing CSS direction alone is insufficient. Do not change English pages to Hebrew during P3.
- Use logical CSS properties and Tailwind logical utilities: `margin-inline`, `padding-inline`, `inset-inline-start/end`, `text-align: start/end`, `ms/me`, `ps/pe`, `inset-s/e`. Avoid physical left/right layout properties.
- Flex row and CSS Grid already follow document direction. Do not add row-reverse merely to make RTL work.
- Use `:dir(rtl)` or Tailwind `rtl:` for meaningful directional transforms that logical properties cannot handle. Mirror navigation arrows; do not mirror logos, checkmarks, media controls or real-world object icons.
- Shadows, gradient angles, background positions, transform origins and translateX do not mirror automatically. Make direction-aware adjustments only when the approved interaction requires them.
- Format currencies and dates with the intended locale before isolating them. Wrap fixed-order numbers, phone numbers and URLs in an LTR isolate where needed; use `<bdi>` for unknown-direction content. Do not use bidi overrides on ordinary prose.
- Use `dir="auto"` for free-text inputs and textareas. Preserve native control semantics and labels.
- Hebrew letter-spacing stays normal. Do not apply tracked Latin label styling to Hebrew text. Use the prescribed Hebrew font subsets and test real wrapping.
- Test the actual Hebrew UI with mixed content such as `שלום John 050-1234567 ₪1,234`, especially prices, contact labels, dates, tables and shared links.
- Verify fixed and sticky controls, focus order, menus, overlays, scroll calculations and overflow at phone and desktop widths. Direction-flipped English is a layout smoke test, not validation of Hebrew content.
- P11 owns native Hebrew copy and the direction-aware scroll logic. Retain reduced-motion and JavaScript-free fallbacks while adapting it.
