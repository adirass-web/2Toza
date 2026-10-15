# Generates styles/basecoat-subset.css: Basecoat base + only the components the site uses (Vega style).
import re
want = ["Accordion", "Button", "Badge", "Card"]
root = "node_modules/basecoat-css/dist/"
src = open(root + "styles/vega.css").read()
body = src[src.index("{") + 1: src.rindex("}")]
chunks = re.split(r"(?m)^  /\* ([A-Za-z ]+) \*/\n", body)
sections = {"Accordion": chunks[0]}
for n, c in zip(chunks[1::2], chunks[2::2]): sections[n.strip()] = c
out = ['@import "./%s";' % "../node_modules/basecoat-css/dist/base/base.css"]
for n in want:
    out.append(open(root + "components/%s.css" % n.lower()).read())
out.append("@layer components {\n" + "\n".join(sections[n] for n in want) + "\n}")
open("styles/basecoat-subset.css", "w").write("\n".join(out))
