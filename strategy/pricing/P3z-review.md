# P3z — Independent review of P3 product architecture

15 Oct 2026. The reviewer did not write P1–P3. This review follows R-1 and the owner direction.

## Verdict: approve with changes

Architecture A is right: the Assessment is a separate first step, the value metric is people protected, Inner Circle is the visible anchor, and Bespoke stays unpriced. The arithmetic is correct. The gaps are in the fences, the per-person add-on, two alternatives that conflict with owner direction, and a test plan too heavy for one person.

**Recomputed from P2:**
- Inner Circle per person: 42,000 / 4 = 10,500 (0.75x Shield).
- Add-on ladder: 24,500 / 35,000, then +7,000 for the fourth person and the network.
- Credit as a share of the price: 26% / 8.6%.
- Bespoke floor: 63,200 / 80,100 gross, which is 1.9x Inner Circle.

All correct. **One error in the rule:** "round up to the next ₪10,000" turns 80,100 into **₪90,000**, not the ₪80,000 tested in H4.

## Required changes

1. **Drop Alternatives B and C.** B removes Inner Circle and C merges it with Bespoke. Both contradict the owner's three tiers. Keep one line saying "considered, excluded by owner direction", and remove them from decision 1.
2. **Mark the new fences as [Owner decision required].** Three fences read as settled structure but are not in the fact base:
   - "a second person moves you to the household route": the fact base says extra people are quoted individually;
   - "more than four people goes to Bespoke": the fact base lets Inner Circle add people, devices or locations by quote;
   - "more than one location".
3. **Fix the network contradiction.** The Shield→Inner Circle fence includes "or the shared home network", but the Shield row says network work is "scoped separately". Make the network a scoped add-on to Shield, so the fence counts people only.
4. **Keep allowances pooled.** The fact base gives "eight personal devices, eight security keys" for four people. "Two each" is a new restriction: it fails, for example, a parent with three devices and a child with one. Write "8" unless the owner decides otherwise.
5. **Resolve the per-person contradiction.** P3 says not to show a per-person figure for Inner Circle, then proposes ₪10,500, which is exactly that figure, as the add-on. If the add-on matches Inner Circle's per-person price, Inner Circle's only remaining advantage is "network plus a fourth person for ₪7,000".
   - Test **₪11,500–12,500 instead, working figure ₪12,000**: two people ₪26,000, three ₪38,000, fourth person plus network +₪4,000. Inner Circle dominates more clearly and margin is protected.
   - Yield on P2 placeholders, assuming about 14.5 h per extra person because travel is shared (my placeholder): ₪10,500 gives about ₪570 net/h, barely above Shield's ₪550; ₪12,000 gives about ₪660.
   - The extra person's inclusions (devices, keys, record, support) are owner decisions.
   - Cannibalisation risk: moderate.
6. **Bespoke overreach.** "Every person and place included" should read "the people and places you agree". The scope is agreed in writing.
7. **Clean up the grid.**
   - Replace the seven "Agreed" cells with one merged cell: "Set out in writing after the first visit".
   - Change "Record: Yours" to "One".
8. **Drop H4.** 5–7 people per arm show nothing, and its rule is inverted. Publish a "from" figure only after time logs confirm the floor.
9. **Reduce the test plan** (see below).
10. **Cite or remove the unexplained references** "P5" and "V-007".

## Coherence and top tier

People protected passes the value test once changes 3 and 4 are made. The fact-based situation trigger should lead Bespoke. Inclusions (b) and (d) give Bespoke a reason to exist; (c) and (e) need costing first. Showing no figure for now is right: the floor rests on placeholder hours, and "from ₪42,000" already anchors.

## Messaging

Mostly on register. Four edits:
- "rebuilt": use "hardened", which is the fact and is calmer;
- "honest picture": use "clear picture";
- "people closest to you": use "the people you live with", which is less cliché;
- "usual starting point": this implies data that does not exist; remove it unless the owner confirms it.

The VAT sentence on Conditions fits the owner's rule. llms.txt still says "including VAT" four times.

## Test plan realism

A 25–30 minute interview cannot fit 16 Van Westendorp questions, three ladders, a two-person card and a Bespoke split. Among 10–15 respondents, 3–5 will be two-person households, so "≥50%" can mean two people.

Keep only:
- (a) time logs for 5 Assessments and 3 Shields;
- (b) Van Westendorp on Assessment and Shield, plus Gabor-Granger on Shield and the two-person card;
- (c) past enquiries counted by household size, with what was quoted (stronger evidence for H2);
- (d) the H3 funnel over 3–6 months.

Treat on-site tests as directional only.

## Owner decisions, prioritised (12 down to 7)

1. **Confirm Architecture A**: First step band, three tiers, people as the metric, Bespoke unpriced, all current prices held. Replaces old decisions 1 and 11.
2. **Fences**:
   - second person: add-on or quote?
   - network for one person: scoped add-on?
   - Inner Circle beyond four people: extras or Bespoke?
   - allowances: pooled or per person?

   New; absorbs old decision 10.
3. **Household add-on**: test ₪12,000 against ₪10,500 and set its inclusions, or keep "quoted individually". Old decision 6.
4. **Names**: use "Inner Circle" everywhere, with the formal name once in Conditions, and keep "Bespoke Private Protection". Old decisions 2 and 3.
5. **Bespoke inclusions**: approve (a), (b) and (d) now; cost (c) and (e) first. Old decision 5.
6. **Bespoke price display**: scoped for now; revisit after time logs, with the rounding rule corrected. Old decision 4.
7. **Test programme**: approve the reduced plan, and supply the P2 §4 inputs, starting with time logs and enquiry history.

**One batch of presentation defaults:**
- working days on Pricing, hours in Conditions (old 7);
- VAT sentence on Conditions and in llms.txt (old 8);
- credit detail on Conditions only (old 9);
- urgent surcharge unchanged (old 12).
