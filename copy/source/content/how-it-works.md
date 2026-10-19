---
page: how-it-works
title: How it works — Toza
description: "Assess, Harden, Verify: how Toza works on your devices and accounts in person. The first step is {price:assessment} and counts toward protection."
permalink: /en/how-it-works/index.html
lang: en
dir: ltr

blocks:
  - type: hero
    heading: Talk through your concerns. Then make the changes together.
    lead: You do not have to work out what is wrong before you meet. Toza assesses your devices and accounts with you, hardens them around your risks and tests the changes.
    byline: none
    promise: true
    actions: [whatsapp, signal, callback]

  - type: steps
    heading: Three stages, one method.
    lead: Each stage has its own result.
    keep_label: You keep
    items:
      - key: assess
        name: "{shared:stages.names.assess}"
        image_alt: "{shared:stages.image_alts.assess}"
        heading: "{shared:stages.headings.assess}"
        body: "The first step starts with your situation: what changed, what concerns you, which accounts matter and who previously had legitimate access. Toza then examines how your devices, identities and accounts are connected, and what those connections allow."
        keep: A written exposure summary of what was reviewed, found and changed, what remains, and your next steps in order.
      - key: harden
        name: "{shared:stages.names.harden}"
        image_alt: "{shared:stages.image_alts.harden}"
        heading: "{shared:stages.lines.harden}"
        statement: "{shared:method}"
        body: The work can include closing unwanted access, strengthening sign-in and recovery, and changing sharing permissions. Toza explains each material change and its effects before you approve it.
        keep: Your phone, computer, accounts and home network, hardened around your risks.
      - key: verify
        name: "{shared:stages.names.verify}"
        image_alt: "{shared:stages.image_alts.verify}"
        heading: "{shared:stages.lines.verify}"
        body: Toza works with you on granting access, sharing information, signing in and recovering accounts. You learn how to use the changed arrangements in daily life. Every tier includes a follow-up visit after about four weeks.
        keep: A private dated record of the work, one for each person.
    record_date: "{shared:stages.record_date}"

  - type: offer
    tag: "{shared:labels.start_here}"
    heading: A senior check-up of your digital life.
    name: "{shared:offers.assessment.name}"
    price_key: assessment
    body: Half a day in person, urgent first aid on the spot, and a written exposure summary you keep whether or not you continue.
    items:
      - "Covers {fact:assessmentScope}."
      - Urgent first aid with your approval, including removing a malicious app or profile where that can be done safely.
    credit: "{shared:offers.assessment.credit}"
    link:
      label: "{shared:labels.conditions}"
      href: /en/conditions/
      kind: more

  - type: tiers
    detail: summary
    heading: Then the protection that fits your household.
    tiers:
      - name: "{shared:offers.shield.name}"
        price_key: personalShield
        for: For one person.
      - name: "{shared:offers.two.name}"
        price_key: shieldForTwo
        for: "{shared:offers.two.for}"
      - name: "{shared:offers.inner.name}"
        price_key: innerCircle
        for: "{shared:offers.inner.for}"
    notes:
      - The first step is included. {shared:common.price_fixed}
      - "Every tier includes questions answered by WhatsApp or Signal within one working day, for {fact:questionLineDays} days."
      - "{shared:offers.care}"
    link:
      label: "{shared:labels.all_tiers}"
      href: /en/pricing/
      kind: more

  - type: contact
    ref: contact
---
