# Digital exposure illustration

Hand-authored SVG reconstruction of the approved generated PNG, designed for independent editing and animation. The PNG remains the approved visual reference; this SVG is a reviewable reconstruction rather than an automatic trace.

## Files

- `toza-digital-exposure-five-ws.svg`: self-contained static illustration; no scripts, raster images, external fonts, or dependencies.
- `../previews/digital-exposure.html`: noindex demonstration with a single reveal sequence, replay, five question filters, keyboard-accessible controls, and reduced-motion support. No production page is changed.

Open the preview through a same-origin HTTP server. For example, from the repository root: `python -m http.server 8123`, then open `/assets/previews/digital-exposure.html`. The SVG itself also works as an ordinary image.

## Editable structure

- `#phone`: handset outline and details.
- `#layer-1` to `#layer-4`: independent `.layer-motion` groups. `data-collapse` gives each layer's initial vertical offset in the reveal sequence.
- `#plane-1` to `#plane-4`: transparent information planes.
- `#category-{name}`: twelve icon, label, and leader groups, identified by `data-category`.
- `#connections`: fourteen independent paths. Each has `data-question` and `data-source`, for example `#connection-who-photos`.
- `#questions`: five outer label groups, `#question-who` through `#question-why`.
- Root CSS variables: `--ink`, `--muted`, `--line`, and `--paper`.

Labels remain real SVG text. Icons and phone are vector paths and shapes. The viewBox is `0 0 1600 1160`.

## Behavior

The static SVG always shows the full illustration. The preview progressively enhances it after loading: layers separate once when the illustration enters view, routes draw, then question labels appear. Selecting a question cancels the reveal and highlights only its source categories. Replay is explicit; there is no continuous loop. Reduced-motion preference shows the final state immediately and disables animation. Narrow screens contain horizontal scrolling within the illustration region to keep detail readable.

To animate or recolor individual SVG groups in a production page, inline the trusted SVG markup or use a same-origin object as this preview does. An ordinary img element displays the static asset but does not expose its internal elements to page scripts. Prefix the IDs if multiple inline instances are used on one page.

## Meaning

Connections are illustrative relationships, not claims that every app collects every category or that the data proves particular circumstances. “Why?” denotes inferred intentions. Access conditions vary. The locked TOZA sales copy and existing page templates are unchanged.

## Validation

Browser checks covered all five question filters, replay, cancellation after the selection transition, final settled state, reduced motion, mobile page overflow, JavaScript-disabled SVG rendering, all seventeen text labels within the viewBox, and no page errors. The diagram contains four layers, twelve categories, and fourteen routes.
