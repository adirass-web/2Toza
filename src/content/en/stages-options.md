---
# Design review page (not linked from navigation, noindex like every page).
# Three options for the stages section, for the owner to choose from. The
# review-intro and review-note blocks are review scaffolding only. Every new
# line is listed for approval in strategy/copy/STAGES-OPTIONS-COPY.md.
page: stages-options
title: Stages options — Toza
description: Three design options for the stages section, for review.
permalink: /en/stages-options/index.html
lang: en
dir: ltr
float_contact: false

blocks:
  - type: review-intro
    heading: Stages section, three options
    line: Each option replaces the "Three stages, one person" section. Same facts and prices, three different ways of showing them. Choose one, or name what to combine.

  # ---------- Option A: timeline / progress rail ----------
  - type: review-note
    id: option-a
    label: Option A
    line: "Timeline: the method as a dated course, with what you keep at each point."

  - type: stages-timeline
    heading: What happens, and when.
    lead: Toza works in three stages, always in this order. Each one leaves you with something in hand.
    keep_label: You keep
    items:
      - key: assess
        marker: Day 1, half a day in person
        name: "{shared:stages.names.assess}"
        line: Toza builds your threat model, puts your risks in order and gives urgent first aid on the spot.
        keep: A written exposure summary, whether or not you continue.
        price_label: "{shared:labels.first_step}"
        price_key: assessment
      - key: harden
        marker: "Within {fact:credit.windowDays} days, if you continue"
        name: "{shared:stages.names.harden}"
        line: Devices, accounts, recovery and home network rebuilt around your risks. Each change explained before you approve it.
        keep: "Security keys, supplied and configured: {factword:securityKeys.personalShield}, {factword:securityKeys.shieldForTwo} or {factword:securityKeys.innerCircle}, by tier."
      - key: verify
        marker: Follow-up visit after about four weeks
        name: "{shared:stages.names.verify}"
        line: Every change tested and checked, and you learn to run it yourself.
        keep: A private, dated record of the work.
      - key: questions
        marker: "For {fact:questionLineDays} days"
        name: Question line
        line: Ask Toza by WhatsApp or Signal. Answers come within one working day.
      - key: care
        marker: Each year after, if you choose
        name: Annual Care
        line: A yearly check visit, new phones set up the same way, and the question line kept open.
        price_key: annualCareFrom
        price_format: "From {amount} a year"
    bracket:
      from: harden
      to: verify
      label: "Harden and Verify are one fixed price, set by the people protected, from {price:personalShield}."

  # ---------- Option B: decision tree / flowchart ----------
  - type: review-note
    id: option-b
    label: Option B
    line: "Decision path: one first step, then a choice you make with the written summary in hand."

  - type: stages-tree
    heading: One step first. Then your decision.
    lead: The first step stands on its own. What follows is your choice, made with Toza's written findings in front of you.
    start:
      name: "{shared:labels.first_step}"
      line: Half a day in person with Toza, with urgent first aid on the spot.
      price_key: assessment
    result:
      name: Your exposure summary
      line: What was reviewed, found and changed, and your next steps in order.
    decision: Then you decide.
    stop:
      name: Stop here
      line: The summary is yours to keep. Nothing further is due.
    go:
      name: "Continue within {fact:credit.windowDays} days"
      line: "The {price:assessment} counts in full toward the tier you choose."
    choices_label: Choose by the people protected.
    choices:
      - name: "{shared:offers.shield.name}"
        for: One person
        price_key: personalShield
      - name: "{shared:offers.two.name}"
        for: You and one other person
        price_key: shieldForTwo
      - name: "{shared:offers.inner.name}"
        for: Up to four people
        price_key: innerCircle
      - name: Larger households
        for: More people, homes or staff
        price_key: largerFrom
        price_format: "From {amount}"
    then:
      - name: "{shared:stages.names.harden}"
        line: Toza's own method, distilled from the published security guidance of government agencies and security vendors, applied to your risks.
      - name: "{shared:stages.names.verify}"
        line: Every change tested, taught to you, and kept in a private dated record.
      - name: Annual Care
        line: "After the {fact:questionLineDays}-day question line, if you choose."
        price_key: annualCareFrom
        price_format: "From {amount} a year"

  # ---------- Option C: progress / state track ----------
  - type: review-note
    id: option-c
    label: Option C
    line: "State ledger: what changes in each part of your digital life, and which stage changes it."

  - type: stages-track
    heading: What changes, and where.
    lead: Five parts of your digital life, as they stand today and as Toza leaves them.
    stages:
      - key: assess
        name: "{shared:stages.names.assess}"
        line: Risks found and put in order.
      - key: harden
        name: "{shared:stages.names.harden}"
        line: Rebuilt around those risks.
      - key: verify
        name: "{shared:stages.names.verify}"
        line: Tested, and taught to you.
    before_label: Before
    after_label: After
    marks_label: Worked on in
    marks_key: Filled marks show which stages work on each part.
    rows:
      - area: Devices
        before: Set up over the years, settings left as they came.
        after: Settings rebuilt around your risks and tested.
        stages: [assess, harden, verify]
      - area: Accounts
        before: Passwords and sign-ins nobody has reviewed.
        after: Stronger sign-in, with security keys on the accounts that matter.
        stages: [assess, harden, verify]
      - area: Recovery
        before: Recovery routes through old numbers or other people.
        after: Recovery routes you control, tested with you.
        stages: [assess, harden, verify]
      - area: Home network
        before: The router as it was installed.
        after: Rebuilt around your risks and checked.
        stages: [harden, verify]
      - area: Who has access
        before: Access granted years ago and still open.
        after: The access you chose to keep, and no other.
        stages: [assess, harden, verify]
    coda: "Then a follow-up visit after about four weeks, {fact:questionLineDays} days of answered questions, and Annual Care from {price:annualCareFrom} a year."
---
