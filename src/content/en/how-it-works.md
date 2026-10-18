---
page: how-it-works
title: How it works — Toza
description: "Assess, Harden, Verify: how Toza works on your devices and accounts in person. The first step is {price:assessment} and counts toward protection."
permalink: /en/how-it-works/index.html
lang: en
dir: ltr

# Pages v2 (strategy/PAGES-pricing-howitworks-outline.md, owner-approved; stages section dropped on owner
# instruction). Order: the method, the first visit, what you keep, after the work, one price line, contact.
# New and moved lines: strategy/copy/PAGES-V2-COPY.md.
blocks:
  - type: hero
    heading: Talk through your concerns. Then make the changes together.
    lead: You do not have to work out what is wrong before you meet. Toza assesses your devices and accounts with you, hardens them around your risks and tests the changes.
    byline: none
    promise: true
    actions: [whatsapp, signal, callback]

  - type: method-statement
    id: method
    heading: The method.
    statement: "{shared:method}"
    points:
      - "{shared:common.engagement_in_person}"
      - Toza explains each material change and its effects before you approve it.
      - "{shared:common.tested}"

  - type: details
    id: first-visit
    heading: The first visit.
    heading_visible: true
    items:
      - label: What happens
        text: "{shared:common.first_visit}"
      - label: How long
        text: "{shared:common.half_day}"
      - label: Before the visit
        text: Preparation instructions are sent directly.
      - label: Your credentials
        text: "{shared:common.your_credentials} {shared:common.sign_in}"

  - type: specimen
    ref: specimen
    id: keep
    heading: What you keep.
    items:
      - Your phone, computer, accounts and home network, hardened around your risks.
      - A private dated record of the work, one for each person.

  - type: text
    id: after
    heading: After the work.
    body: |-
      Every tier includes a follow-up visit after about four weeks.

      Every tier includes questions answered by WhatsApp or Signal within one working day, for {fact:questionLineDays} days.

      {shared:offers.care}

  - type: price-summary
    items:
      - name: "{shared:labels.first_step}"
        price_key: assessment
        note: "{shared:offers.assessment.credit_short}"
    link:
      label: "{shared:pricing.heading}"
      href: /en/pricing/
      kind: more

  - type: contact
    ref: contact
---
