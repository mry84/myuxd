# CORPORATE DUMP™
*Product Story — Anonymous Workplace Restroom Review Platform*

---

## AT A GLANCE

| | |
|---|---|
| **Role** | Solo Product Designer + AI-Directed Developer |
| **Timeline** | ~45 days, concept to App Store submission |
| **Stack** | React Native · Expo SDK 54 · Firebase Firestore · Google Maps/Places API · Google AdMob · EAS Build |
| **Tools** | Claude · Claude Code |
| **Key Outcomes** | 20 TestFlight builds shipped · Submitted to App Store July 4, 2026 · Full light/dark theme system with semantic token architecture · 30 seeded field reports establishing institutional voice · corporatedump.com live on Vercel · Complete design system documented |

---

## Overview

Corporate Dump is an anonymous workplace restroom review platform built on the thesis that bathroom quality is a reliable proxy for company culture. Think Glassdoor meets Yelp, but for toilets. The app was designed and shipped solo by a Senior UX Designer over approximately 45 days using React Native, Firebase, and AI-directed development via Claude Code.

---

## Project Materials

- **View Design System →** — `assets/docs/corporatedump/ds.pdf` (8 pages, opens in a new tab)

---

## The Problem

Workplace culture is notoriously difficult to measure honestly. Glassdoor reviews are tied to professional reputation and often sanitized. Employee surveys are filtered through HR. But the bathroom tells the truth. A company that doesn't maintain its restrooms doesn't maintain its people.

There was no product that treated this signal seriously — or absurdly seriously enough to be interesting.

---

## The Design Challenge

Build a product that:
- Felt completely institutional while being inherently ridiculous
- Worked in a single hand, in a stall, in under two minutes
- Protected user anonymity completely
- Generated data valuable enough to build a real index from

---

## The Core Design Principle

*The organization never laughs. The user laughs.*

Every design decision flowed from this. Corporate Dump doesn't wink at the user. It presents itself as a completely serious regulatory and research institution dedicated to documenting workplace restroom infrastructure. The humor emerges entirely from the contrast between the deadpan institutional voice and the subject matter.

This distinction was protected aggressively throughout development. Features that broke the illusion were rejected. Copy that felt like a joke was rewritten to feel like a filing.

---

## Product Decision Filter

Every feature was evaluated against three questions:

1. Does this strengthen the illusion?
2. Does it help someone browse or submit a field report?
3. Does it make future data more valuable?

Features that failed all three were cut. Features that passed all three — even unglamorous ones like Edit and Delete — were prioritized for exactly the reasons they weren't exciting. Edit improves data quality. Delete improves legal posture. Both strengthen user trust.

---

## Key UX Decisions

### Submit as a full page, not a bottom sheet

The original submit flow used a bottom sheet modal — standard pattern, contextually appropriate. It was replaced with a full navigation page with a header and back button. Reason: the submit form had grown to include GPS auto-tagging, five rating categories, a floor/location note, and a field notes area. A bottom sheet was no longer appropriate for that cognitive load. The full page also solved a keyboard interaction problem where the field notes area was obscured.

### No explicit close buttons

Every modal in the app dismisses by tapping outside. No X buttons anywhere. This decision was made after recognizing that X buttons were adding visual noise and implying an escape hatch the product didn't need. The app is one layer deep from every tab. There is nowhere the user is trapped.

### GPS auto-tag with graceful fallback

Location tagging on submissions was designed with three states: auto-match within 500 meters (silent, no friction), manual pick from a list (for remote submitters), and skip entirely. The user is never asked a question they can't answer. The flow degrades gracefully without ever blocking submission.

### Cold-start UX

Launching with no data is a known failure mode for review apps. Corporate Dump solved this with 30 seeded field reports written in the app's exact institutional voice, sequenced so high-quality reports appear every 2–5 cards. These reviews don't just fill the feed — they establish the culture. They teach users how a Corporate Dump field report sounds before they write their first one.

### Commode toggle

Light/dark mode was implemented as "Commode?" with the subtitle "Light or dark. Read the room." The toggle required building a complete theme system from scratch — both palettes, semantic color tokens, and a live mutation pattern that re-themes the entire app without remounting the navigation tree.

---

## Accessibility

A dedicated accessibility audit identified and corrected:
- All Space Mono and Georgia font sizes increased by 1pt across 17 files
- Dark mode text ramp lightened for contrast against near-black backgrounds
- Light mode grays and yellows darkened for contrast
- Unverified badge color tokenized with separate dark/light values
- FAB glow replaced with subtle neutral drop shadow
- Back chevron enlarged for easier tapping

---

## The Brand Voice

Corporate Dump developed its own vocabulary:

| Generic | Corporate Dump |
|---|---|
| Review | Field Report |
| Delete | Strike from the Record |
| Post | Log / Deposit |
| User | Operative |
| Error | The tribunal has been notified |
| Success | Logged to the permanent record |

Consistency of voice became one of the product's defining characteristics. Every loading state, error message, success dialog, and empty state was audited to ensure it could have come from the same fictional institution.

---

## Technical Implementation

The app was built entirely by a UX Designer using AI-directed development. Key technical achievements:

- React Native / Expo SDK 54 with file-based routing
- Firebase Firestore for real-time anonymous data
- Google Maps / Places API for GPS auto-tagging
- Google AdMob for post-submission interstitials and feed banner slots
- EAS Build for iOS distribution via TestFlight (20 builds shipped)
- Full light/dark theme system with semantic token architecture
- Geolocation-based facility discovery and ranking
- Anonymous device ID for review ownership without accounts
- Weighted ticker algorithm using Hacker News-style time decay

---

## Results

- 20 TestFlight builds shipped across ~45 days
- Submitted to the App Store July 4, 2026
- Fully functional iOS app with real Firebase data
- Complete design system documented in an 8-page PDF
- Product philosophy codified and version-controlled
- corporatedump.com live on Vercel with Terms and Privacy pages
- 30 seeded field reports establishing institutional voice at launch

---

## What I'd Measure Next

- **Day 1 / Day 7 / Day 30 retention** — the baseline signal for whether the product has real legs beyond the novelty of the concept
- **Submit rate vs. browse rate** — what percentage of users submit a field report versus read only? Low submit rate signals friction or audience mismatch
- **GPS auto-tag success rate** — how often does the silent 500-meter match succeed versus requiring manual input? High fallback rate may indicate the geo-matching radius needs tuning
- **Session length and return frequency** — is anyone coming back, or is this a one-visit curiosity? Return behavior determines whether the feed and discovery surfaces need investment
- **Field report quality over time** — do organic user submissions match the institutional voice established by seeded content, or does the tone drift? Voice drift is a product problem, not a copy problem

---

## Reflections

**AI-directed development changes the designer's role, not the designer's responsibility.** Claude Code wrote the code. Every product decision, every copy choice, every UX tradeoff was made by a human who understood what the product was trying to be.

**The copy is the design.** In a product where the interface is intentionally simple, the writing carries the personality. The vocabulary list, the empty states, the error messages — these are design artifacts as much as the color tokens or the component library.

**Ship early and adjust.** The app went from concept to App Store submission in under 45 days. Real user behavior will determine what gets built next. The data decides.

---

*Stack: React Native · Expo SDK 54 · Firebase Firestore · Google Maps/Places API · Google AdMob · EAS Build*  
*Tools: Claude · Claude Code*  
*Timeline: June–July 2026*  
*Corporate Dump™ v2.0 — © 2026 Corporate Dump, Inc. All deposits reserved.* 🚽
