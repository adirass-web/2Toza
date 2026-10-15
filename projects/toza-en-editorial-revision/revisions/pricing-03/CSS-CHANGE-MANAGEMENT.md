# CSS ownership for the Pricing proposal

The new Pricing design is a review-only prototype. Its CSS must be scoped to the page and must not restyle Home, Why Toza or the protected Assessment.

Use files by ownership rather than one file for every visual section:

| Owner | Responsibility | Change check |
| --- | --- | --- |
| Shared identity/base | Colours, fonts, page width, typography, focus and print defaults | Representative pages and existing exact-copy gates |
| Shared header/navigation | Header, mobile menu and navigation states | Keyboard and mobile-menu checks |
| Shared footer | `footer-compact.css`; footer spacing and links | Footer desktop/mobile comparison |
| Pricing page | Page hierarchy, price presentation, comparison matrix, journey and secondary disclosures | Pricing desktop/mobile, complete commercial associations and exact proposed copy |
| Shared components | Only components actually reused across pages | All consumers checked when changed |

For this pass, keep existing published base/header assets unchanged. The footer already has its own versioned module. Give the Pricing prototype a `.pricing-03` root, a page-specific stylesheet and local SVG symbols. Put layout, matrix, journey and responsive rules in clearly named sections within that owned stylesheet; split a reusable component into a separate file when another page genuinely needs it.

Do not split every paragraph or section into a separate CSS file. That creates a large dependency graph without isolating responsibility. Page and component ownership gives a clearer review boundary.

Use logical CSS properties, shared colour/font values, native table semantics, visible icon labels, native expandable details and reduced-motion/print rules. Never make icon counts the sole statement of people, devices or keys. Prefer diagrams that explain the client's next decision over decorative funnels.

Each proposed change should name its owning file, affected pages, source-copy fingerprint and verification. Version a changed served asset; preserve archived evidence rather than replacing baseline hashes with the new output. Production integration remains separate from this prototype review.
