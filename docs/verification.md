# Verification Model

This document outlines the verification architecture and operating policy for Jokkoo.

---

## 1. Verification Tiers

Jokkoo defines two verification tiers:

### Tier 1: Phone Verified (Active)
- **Status:** Active in production.
- **Badge text:** `Phone verified`.
- **Styling:** Soft green verified pill (`bg-verified-soft text-verified`) with a checkmark icon.
- **Meaning:** We confirmed that the phone number provided belongs to the person who registered on Jokkoo and that they can receive calls and WhatsApp messages on it.
- **Explicit non-claims:** Phone verification is **not** an assessment or check of legal identity, government registry, trade qualifications, licensing, background, or quality of workmanship.

### Tier 2: Identity Verified (Reserved)
- **Status:** Reserved for a possible future opt-in tier.
- **Current state:** Not exposed or rendered in the consumer-facing interface. Sample data and initial onboarding remain exclusively on Tier 1 (or unverified `none`).
- **Anticipated model:** In-person or official document-based verification (e.g. Gambian National ID Card, Passport, or formal Business Registration).

---

## 2. Planned Manual Verification Flow (Phone Verified)

The planned administrative workflow for phone verification operates as follows:

1. **Registration / Submission:**
   The professional registers via the `/join` onboarding form, providing their operational details, phone number, and WhatsApp contact number.
2. **Initiation via WhatsApp:**
   The professional taps a "Verify on WhatsApp" link that pre-fills a verification code sent directly to Jokkoo's official WhatsApp business contact.
3. **Admin Review & Confirmation:**
   A Jokkoo administrator verifies receipt of the inbound message from that exact number, validates responsiveness, and manually updates the professional's status in the database to `phone`.
4. **Badge Activation:**
   Once confirmed, the profile displays the `Phone verified` badge across directory listings, search cards, and profile headers.

---

## 3. Known Limitations & Policy Safeguards

- **Scope of Trust:** A verified phone number proves only control of that specific SIM card or WhatsApp account at the moment of verification.
- **Consumer Transparency:** All public touchpoints where verification is displayed must carry or link to the standard notice:
  > *"Phone verified means we confirmed the number belongs to the person who registered. It is not a check of identity, qualifications or workmanship."*
- **Dispute & Delisting:** Any report of misrepresentation or unreachable contact results in the immediate revocation of the badge and profile review.
