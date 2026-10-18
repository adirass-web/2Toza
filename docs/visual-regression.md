# Visual regression check

## What it protects
The site has been reviewed and approved as it looks today. The visual check takes pictures of every page
(11 pages, phone and desktop, plus Hebrew right-to-left views, the open phone menu, the FAQ and Conditions
sections opened by a link, and the page scrolled to the middle with the floating contact buttons showing)
and compares them with the approved pictures stored in `tests/visual/baseline/`. If anything looks different
and nobody approved it, the check fails. This stops a copy edit from quietly breaking the design, for example a
heading that now wraps onto three lines, or a changed spacing value.

## How a copy editor runs it
After editing content, in the project folder:

    npm run check:visual

It rebuilds the site, takes about 50 seconds, and prints either "Visual check passed" or a table of changed images.

## How to read a failure
The table lists each changed image, the percentage of pixels that differ, the change in page height, and why it failed.
A height change means the layout moved (text wrapped differently, a section grew). For each failed image, open
`tests/visual/diff/<name>.png`. It has three panels side by side: approved (left), current (middle), difference (right,
changed pixels in red). Only a change in the page height or more than 0.05% of pixels changing counts as failure,
so tiny anti-aliasing differences are ignored. Any real text change that alters the look is flagged on purpose: it is
your cue to look at it.

## How to approve an intended change
If the new look is what you want, run:

    npm run visual:approve

This rebuilds, rewrites the baselines and lists which ones changed. Then commit the updated PNG files with git. That
commit is the approval record: it shows who accepted the new look and when. Never run approve just to make a failure go away.

## Limits
- Run it on the same machine type each time (fonts and text rendering differ slightly between operating systems).
  The baselines were made on Linux with Chromium.
- It is not part of `npm run check` and not yet in CI for that reason. Adding it to CI later is optional and would need
  baselines generated on the CI system's own operating system (or a fixed Docker image).
- `tests/visual/current/` and `tests/visual/diff/` are scratch folders and are not committed.
