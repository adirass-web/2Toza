---
page: conditions
title: Conditions — Toza
description: "Toza's prices and commercial terms on one printable page: the first step, protection tiers, Annual Care, urgent visits and payment."
permalink: /en/conditions/index.html
lang: en
dir: ltr
labels:
  toc: Sections

blocks:
  - type: hero
    heading: Prices and conditions.
    lead: Every engagement is carried out by Dr. Lior Tabansky in person, at your home or office, with you present and in control of your credentials. Each price is fixed and agreed in writing before work begins.
    byline: none
    actions: []
    note: Terms as of 16 October 2026.
    print: true

  - type: terms-section
    id: prices
    nav_label: Prices
    heading: Prices
    price_table:
      caption: Prices by service
      head: [Service, For, Price]
      rows:
        - label: Private Exposure Assessment (first step)
          for: Everyone starts here
          price_key: assessment
        - label: Personal Shield
          for: One person
          price_key: personalShield
        - label: Personal Shield for Two
          for: You and one other person
          price_key: shieldForTwo
        - label: Inner Circle
          for: A household of up to four
          price_key: innerCircle
        - label: Larger households, several residences or household staff
          for: One fixed price, set after the first step
          price_key: largerFrom
          price_format: "from {amount}"
        - label: Annual Care, one person
          for: Past clients
          price_key: annualCareOne
          price_format: "{amount} a year"
        - label: Annual Care for two
          for: Past clients
          price_key: annualCareTwo
          price_format: "{amount} a year"
        - label: Annual Care, household of up to four
          for: Past clients
          price_key: annualCareHousehold
          price_format: "{amount} a year"
        - label: Urgent visit surcharge
          for: Added to the agreed service price
          price_key: urgentSurcharge
        - label: Urgent visit surcharge, weekend or holiday
          for: Replaces the ordinary surcharge
          price_key: urgentSurchargeWeekend
    notes: All prices include VAT.

  - type: terms-section
    id: first-step
    nav_label: The first step
    heading: "The first step: Private Exposure Assessment"
    items:
      - "Covers {fact:assessmentScope}, with the relevant identities, accounts, apps, permissions, recovery routes and shared services."
      - "Half a day in person, typically four hours. The visit completes the agreed intake, access mapping, diagnosis and approved urgent first aid, including removing a malicious app or profile where that can be done safely."
      - "Four hours is a guide; the visit completes its agreed scope."
      - "You receive a written exposure summary of what was reviewed, found and changed, what remains and the next steps, whether or not you continue."
      - "For Personal Shield for Two and Inner Circle, the first step covers the first person's devices. The other people are reviewed within the tier."

  - type: terms-section
    id: thirty-day
    nav_label: The 30-day rule
    heading: The 30-day rule
    items:
      - "The {price:assessment} counts in full toward a tier whose work begins within {fact:credit.windowDays} days of completion of the first step. You then pay the balance."
      - "Balances: Personal Shield {price:balanceShield} · Personal Shield for Two {price:balanceTwo} · Inner Circle {price:balanceInnerCircle}."
      - "After day {fact:credit.windowDays}, the tier is charged at its full price."
      - "Moving up a tier: if the first step shows the next tier is needed, you pay that tier's price less the {price:assessment} already paid, within the same {fact:credit.windowDays} days."
      - "The first step counts once per engagement, also for a group."
      - "Larger households: the fixed price is set in writing after the first step, from {price:largerFrom}, and the {price:assessment} counts toward it on the same {fact:credit.windowDays}-day terms."

  - type: terms-section
    id: tier-choice
    nav_label: When a household needs more
    heading: When a household needs more
    items:
      - "If the first step shows more than a tier includes, such as more people or devices, a second home, staff or company devices, Dr. Tabansky proposes the next tier, with its full allowance, before any work begins."
      - "Beyond Inner Circle, he sets one fixed price in writing."
      - "Each tier has one fixed price for everything within its allowance."
      - "Agreed additions are separate, and any added scope or price is agreed in writing before that work begins."

  - type: terms-section
    id: allowances
    nav_label: Allowances in every tier
    heading: Allowances in every tier
    items:
      - "Everyday devices (phone, computer, tablet or second phone): up to {numword:devicesPerPerson} per person, shared within the tier. Personal Shield {numword:devicesPerPerson}, Personal Shield for Two {numword:devicesPerPerson*2}, Inner Circle {numword:devicesPerPerson*4}."
      - "Security keys, supplied, configured and tested: Personal Shield {numword:securityKeys.personalShield}, Personal Shield for Two {numword:securityKeys.shieldForTwo}, Inner Circle {numword:securityKeys.innerCircle}."
      - "One home network and router, in addition to the devices. The work covers accessible settings and authorized administration. Replacement hardware, further connected devices and additional locations are quoted separately."
      - "Essential migration covers identity, recovery routes and critical-service access where needed. Historical archives and bulk data migration are scoped separately."
      - "A follow-up visit after about four weeks."
      - "Questions answered by WhatsApp or Signal for {fact:questionLineDays} days (see [the {fact:questionLineDays}-day question line](#question-line))."
      - "Coordination with your lawyer or family office, if you authorize it."
      - "A private dated record for each person; home-network work is recorded separately."
      - "Inner Circle adds a review visit at twelve months."

  - type: terms-section
    id: question-line
    nav_label: "The {fact:questionLineDays}-day question line"
    heading: "The {fact:questionLineDays}-day question line"
    items:
      - "Questions answered by WhatsApp or Signal within one working day, for {fact:questionLineDays} days from completion of the tier's work."
      - "For questions and guidance about the work done. New work is agreed and priced separately; urgent needs go through an urgent visit."
      - "After the {fact:questionLineDays} days, the line can continue through Annual Care."

  - type: terms-section
    id: annual-care
    nav_label: Annual Care
    heading: Annual Care
    items:
      - |-
        For past clients, after the {fact:questionLineDays}-day question line. Twelve months of:

        - Questions answered by WhatsApp or Signal within one working day, as before
        - A check visit in person: devices, accounts, recovery settings and keys re-checked, and your dated record updated
        - A new or replaced phone or computer set up the same way
        - A replacement security key if one is lost or broken
        - First available appointments
        - Coordination with your lawyer or family office, if you authorize it
      - "{price:annualCareOne} a year for one person, {price:annualCareTwo} for two, {price:annualCareHousehold} for a household of up to four. Paid yearly in advance."
      - "The term starts the day the {fact:questionLineDays}-day question line ends."
      - "For a household of up to four, Annual Care covers up to two new or replaced devices and up to two replacement keys. For Inner Circle, the first Care term moves the check visit to about month six; the twelve-month review stays."
      - "Further keys and any replacement router are charged at cost. Added devices are scoped separately."
      - "Joining: within {numword:annualCare.joinWindowMonths} months of the question line ending. After that, we start again with a first step ({price:assessment}), which counts in full toward Annual Care within {fact:credit.windowDays} days."
      - "Renewal: at the published price at the time. The invoice is sent 30 days before the term ends, and the line stays open for 14 days while it is settled."
      - "Scoped and priced separately: new people; a new or second home; company devices or staff; devices beyond the original allowance; any incident, such as a suspected compromise; urgent visits, on the [urgent terms](#urgent) below."

  - type: terms-section
    id: urgent
    nav_label: Urgent visits
    heading: Urgent visits
    items:
      - "Availability is confirmed before you pay."
      - "For an accepted urgent booking, arrival is within four hours of both Toza's acceptance and receipt of payment. The clock starts when both conditions are met."
      - "The four hours are an arrival commitment; the visit then runs its agreed course."
      - "Surcharge {price:urgentSurcharge}, added to the agreed base service price. At weekends or holidays the surcharge is {price:urgentSurchargeWeekend}, replacing the ordinary surcharge. Other charges apply only if separately agreed."

  - type: terms-section
    id: payment
    nav_label: Payment before work
    heading: Payment before work
    items:
      - "Every paid service follows three steps: a written scope and price (the work, inclusions, exclusions, price, agreed additions and payment terms); your explicit acceptance; receipt of payment. The work is then scheduled."
      - "This applies to the first step, each tier or its balance, Annual Care and any agreed addition."
      - "The first conversation is free and commits you to nothing."

  - type: contact
    heading: Questions about these terms?
    actions: [whatsapp, signal, callback]
    note:
      label: "Privacy, boundaries and other questions: FAQ"
      href: /en/faq/
      kind: more
---
