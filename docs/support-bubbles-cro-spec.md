# Support Bubbles CRO Test Specification

**Document Version:** 1.0  
**Last Updated:** March 5, 2026  
**Purpose:** Implementation guide for CRO test of contextual support bubbles on RFI forms  
**Reference Implementation:** `homepage.html` + `form.js`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [**Support Bubble Flow**](#2-support-bubble-flow)
   - [Phase 1 — Program Selection](#phase-1--program-selection)
   - [Phase 2 — Contact Information](#phase-2--contact-information)
3. [Component Overview](#3-component-overview)
4. [Smart Tip Container](#4-smart-tip-container)
5. [Floating Help Button](#5-floating-help-button)
6. [Help Modal](#6-help-modal)
7. [Field-Level Assistance](#7-field-level-assistance)
8. [Trigger Conditions Reference](#8-trigger-conditions-reference)
9. [Analytics & Tracking](#9-analytics--tracking)
10. [QA Checklist](#10-qa-checklist)

---

## 1. Executive Summary

### What Are Support Bubbles?

Support bubbles are a contextual help system designed to:
- Guide users through form completion
- Reduce form abandonment
- Provide just-in-time assistance
- Encourage users who are struggling

### Components

| Component | Purpose | Visibility |
|-----------|---------|------------|
| Smart Tip Container | Primary contextual messages | Appears on triggers |
| Floating Help Button | Persistent help access | Always visible |
| Help Modal | Detailed assistance | On-demand |
| Field Tooltips | Quick field hints | On hover/click |

### Form Flow

The form follows a **2-phase approach** before reaching the thank-you page:
- **Phase 1:** Program Selection (education level + degree program)
- **Phase 2:** Contact Information (name, email, phone, ZIP)
- **Complete:** Thank You Page (confirmation & next steps)

### Expected Impact

- **Primary Metric:** Form completion rate
- **Secondary Metrics:** Time to complete, field error rate, abandonment rate
- **Target Lift:** 5-15% improvement in form submissions

---

## 2. Support Bubble Flow

> **How to read this section:** Each item describes a **user action** followed by the **exact bubble** that appears. Bubbles are typed: 🔵 info · 🟢 success · 🟡 warning.

> **Two-phase journey:** Phase 1 (Program Selection) → Phase 2 (Contact Info) → Thank You Page

### Phase 1 — Program Selection

| # | User Action | → Bubble Response | Type |
|---|------------|-------------------|------|
| 1 | **Clicks / focuses anywhere inside the RFI form** (first interaction) | 👋 **Welcome!** — "Welcome! We'll help you every step of the way. 😊" | 🔵 info |
| 2 | **Clicks / focuses the Education Level dropdown** | 🎓 **Choosing Your Education Level** — "Select undergraduate for associate's or bachelor's degrees, or graduate for master's or doctoral programs." | 🔵 info |
| 3 | **Selects an Education Level** | ✨ **Progress Update** — "Great! Now select your {undergraduate/graduate} program." · *Select Your Degree becomes enabled* | 🟢 success |
| 4 | **Clicks / focuses the Select Your Degree dropdown** | 📚 **Select Your Degree Program** — "Choose the specific degree that matches your educational goals. Each program is designed for working adults and offers flexible online learning." | 🔵 info |
| 5 | **Selects a Degree Program** | ✨ **Progress Update** — "Excellent! 👏 You're halfway there. Just need your contact info." | 🟢 success |
| 6 | **Clicks Next with missing required fields** | ⚠️ **Required Fields Missing** — "Please complete all required fields before continuing." · *Scrolls to first error* | 🟡 warning |
| 7 | **Clicks Next with valid fields** | 🚀 **Progress Update** — "Almost done! 🚀 Last step — your contact information." · *Transitions to Phase 2* | 🟢 success |

---

### Phase 2 — Contact Information

| # | User Action | → Bubble Response | Type |
|---|------------|-------------------|------|
| 1 | **Clicks / focuses First Name field** | 👤 **Your First Name** — "Enter your legal first name as it appears on official documents." | 🔵 info |
| 2 | **Types numbers or special characters in a name field** | ⚠️ **Invalid Characters** — "Names should only contain letters, spaces, hyphens, and apostrophes." | 🟡 warning |
| 3 | **Clicks / focuses Email field** | 📧 **Email Address** — "We'll send program information and admission details to this email." | 🔵 info |
| 4 | **Clicks / focuses Phone field** | 📱 **Phone Number** — "An admissions counselor will contact you at this number to guide you through enrollment." | 🔵 info |
| 5 | **Clicks Submit with missing required fields** | ⚠️ **Required Fields Missing** — "Please complete all required fields." · *Scrolls to first error* | 🟡 warning |
| 6 | **Submits form successfully** | *No bubble — clear localStorage draft, redirect to thank-you page* | — |

### Ambient & Passive Behaviors

| Trigger | → Bubble Response | Type | Notes |
|---------|-------------------|------|-------|
| **Focuses a field 3+ times** without completing it | 🆘 **Need Help?** — Field-specific struggling message (e.g., "Not sure which degree? Our admissions counselors can help!") | 🟡 warning | Once per field per session |
| **30+ seconds on a field**, leaves it empty | 🆘 **Need Help?** — Field-specific struggling message | 🟡 warning | |
| **60 seconds of total inactivity** (no mouse, keyboard, click) | 🆘 **Need Assistance?** — "Still here? Need help completing the form? Click the help button (?)!" · *Red badge on floating help button* | 🟡 warning | Only if user has entered some data |
| **Returns to form with saved data** (within 7 days) | 💾 **Progress Restored** — "We restored your previous progress! Continue where you left off." | 🟢 success | Data auto-saves every 10s |
| **Clicks floating help button (?)** at any time | *Opens Help Modal* with phase-specific content | — | Phase 1: program guidance. Phase 2: contact info + privacy |

### Timing Rules

- **Info & success bubbles** auto-dismiss after **10 seconds**
- **Warning bubbles** persist until the user **manually closes** them
- Welcome bubble fires with a **1-second delay** and only **once per session**
- Only **one bubble visible** at a time — new bubbles replace the current one

---

## 3. Component Overview

### Component Hierarchy

| Component | Location | Relationship |
|-----------|----------|-------------|
| **Smart Tip Container** | Inside the RFI form, above the form fields | Displays contextual messages (info / success / warning) inline |
| **Form Fields with Tooltips** | Beside each field label | Small (?) icons that expand on hover/click to show field-specific help |
| **Floating Help Button** | Fixed, bottom-right corner of the viewport | Always visible; opens the Help Modal on click |
| **Help Modal** | Full-screen overlay (centered) | Step-specific comprehensive help content; triggered by the floating button |

### User Engagement Detection

**IMPORTANT:** Help messages only appear AFTER the user has engaged with the form (first focus or click on any form field). This prevents intrusive pop-ups on page load.

---

## 4. Smart Tip Container

### Purpose

The Smart Tip Container is the primary vehicle for contextual help messages. It appears at the top of the form and provides guidance, encouragement, and warnings.

### Structure

Each smart tip contains:
- An **icon** (emoji)
- A **title** (bold heading)
- A **message** (descriptive text)
- A **close button** (× in the top-right corner)

### Placement

- **Location:** Inside `.rfi-container`, above the form
- **Position:** Relative (flows with content)
- **Z-index:** Default (no overlay)

### Visual Variants

| Variant | CSS Class | Border Color | Background | Use Case |
|---------|-----------|--------------|------------|----------|
| Info | `.smart-tip-container.info` | `#007D8A` (river) | `#EFF8F9` | General tips, field help |
| Success | `.smart-tip-container.success` | `#10B981` | `#ECFDF5` | Encouragement, progress |
| Warning | `.smart-tip-container.warning` | `#F59E0B` | `#FEF3C7` | Errors, struggling users |

### Behavior Rules

| Rule | Value | Notes |
|------|-------|-------|
| Auto-dismiss (info/success) | 10 seconds | Timer starts on display |
| Auto-dismiss (warning) | Never | User must close manually |
| Animation in | `slideInDown 0.3s` | Slides down from top |
| Animation out | Immediate | No animation on close |
| Max visible | 1 | New tips replace existing |

### Message Content Templates

#### Welcome Message
| Icon | Title | Message | Type |
|------|-------|---------|------|
| 👋 | Welcome! | Welcome! We'll help you every step of the way. 😊 | info |

#### Field Help Messages

| Field | Icon | Title | Message |
|-------|------|-------|---------|
| educationLevel | 🎓 | Choosing Your Education Level | Select undergraduate for associate's or bachelor's degrees, or graduate for master's or doctoral programs. |
| degreeProgram | 📚 | Select Your Degree Program | Choose the specific degree that matches your educational goals. Each program is designed for working adults and offers flexible online learning. |
| firstName | 👤 | Your First Name | Enter your legal first name as it appears on official documents. |
| email | 📧 | Email Address | We'll send program information and admission details to this email. Make sure it's an address you check regularly. |
| phone | 📱 | Phone Number | An admissions counselor will contact you at this number to answer questions and guide you through the enrollment process. |
| state | 📍 | Your State | This helps us provide you with relevant program availability and state-specific information. |

#### Struggling User Messages

| Field | Message |
|-------|---------|
| educationLevel | Not sure which level? Choose undergraduate if you're starting or completing a bachelor's degree, or graduate if you already have a bachelor's and want an advanced degree. |
| degreeProgram | Not sure which degree is right for you? Our admissions counselors can help! For now, choose the one that sounds most interesting. |
| email | Need an email address? Consider creating a free Gmail, Outlook, or Yahoo account to use for your education journey. |
| phone | Enter your phone number in this format: (555) 123-4567. We'll only contact you about your educational opportunities. |
| state | Select the state where you currently live. This helps us provide you with relevant program information. |

#### Encouragement Messages

| Trigger | Message | Type |
|---------|---------|------|
| Education level selected | Great choice! 🎯 Now let's find your perfect program. | success |
| Program selected | Excellent! 👏 You're halfway there. Just need your contact info. | success |
| Phase 1 completed | Almost done! 🚀 Last step — your contact information. | success |

#### Error & Warning Messages

| Icon | Title | Message | Type |
|------|-------|---------|------|
| ⚠️ | Required Fields Missing | Please complete all required fields before continuing. Look for the red error messages below. | warning |
| ⚠️ | Invalid Characters | Names should only contain letters, spaces, hyphens, and apostrophes. | warning |
| 🆘 | Need Assistance? | Still here? Need any help completing the form? Click the help button (?) if you have questions! | warning |
| 💾 | Progress Restored | We restored your previous progress! You can continue where you left off. | success |

---

## 5. Floating Help Button

### Purpose

A persistent, always-visible button that provides access to comprehensive help at any time.

### Appearance

A circular button with a white question-mark icon on a dark blue gradient background. Includes a hidden notification badge (red "!" dot) that becomes visible during inactivity/abandonment triggers.

### Placement

| Property | Desktop | Mobile |
|----------|---------|--------|
| Position | Fixed | Fixed |
| Bottom | `var(--spacing-xl)` (~32px) | `var(--spacing-md)` (~16px) |
| Right | `var(--spacing-xl)` (~32px) | `var(--spacing-md)` (~16px) |
| Size | 56px × 56px | 48px × 48px |
| Z-index | 1000 | 1000 |

### Visual States

| State | Appearance |
|-------|------------|
| Default | Blue gradient background, white icon |
| Hover | Scale 1.1, enhanced shadow |
| Active | Scale 0.95 |
| With Badge | Red notification dot with "!" pulsing |

### Badge Behavior

The notification badge appears when:
- User has been inactive for 60+ seconds
- User has form data entered but hasn't completed
- Badge pulses with animation to draw attention

### Click Action

Opens the Help Modal (see Section 5).

---

## 6. Help Modal

### Purpose

Provides comprehensive, step-specific help content in an overlay modal.

### Structure

The modal contains three sections:
- **Header:** Title ("📋 Form Assistance") + close button (×)
- **Body:** Dynamic content that changes based on the current step
- **Footer:** Contact phone number (1-866-711-1700)

### Modal Behavior

| Behavior | Implementation |
|----------|----------------|
| Open trigger | Click on floating help button |
| Close triggers | Click overlay, click × button, press Escape |
| Animation in | `scaleIn 0.3s` + `fadeIn 0.2s` |
| Body scroll | Should be locked when open |
| Focus trap | Recommended for accessibility |

### Content by Step

#### Phase 1 Content (Program Selection)

- **Area of Interest guidance:** "Choose the field you want to study — this could be related to your current career or a new field you want to explore."
- **Degree Program guidance:** "After selecting an area, choose the specific degree. Consider your career goals, bachelor's vs. master's, and programs that match your interests."
- **Popular Programs list:** Business (MBA, Accounting), Healthcare (RN to BSN), Education (Early Childhood), Technology (IT, Cybersecurity)

#### Phase 2 Content (Contact Information)

- **Why we need it:** Send program information, answer enrollment questions, explain financial aid options, guide through application
- **Privacy assurance:** "Your information is secure and will only be used by UAGC for educational opportunities. We won't share it with third parties."
- **What happens next:**
  1. Email with program details
  2. Admissions counselor call within 1-2 business days
  3. Answer questions and help start the enrollment journey

---

## 7. Field-Level Assistance

### Purpose

Provide quick, inline help for specific form fields without disrupting the user flow.

### How Tooltips Work

Each form field with a tooltip has a small (?) icon next to its label. Clicking or hovering the icon reveals a popover with a title and brief help text. The popover includes proper ARIA attributes for accessibility.

### Tooltip Behavior

| Platform | Trigger | Close |
|----------|---------|-------|
| Desktop | Hover OR click | Mouse leave, click outside, Escape |
| Mobile | Click/tap only | Click outside, Escape, tap close button |

### Tooltip Positioning

| Platform | Position | Behavior |
|----------|----------|----------|
| Desktop (769px+) | Centered above the trigger icon | Fixed width, appears with a small gap above |
| Mobile (<769px) | Centered horizontally, full-width | Spans nearly the full screen width for readability |

---

## 8. Trigger Conditions Reference

### Complete Trigger Matrix

| Trigger Event | Component | Type | Timing | Condition |
|--------------|-----------|------|--------|-----------|
| First field interaction | Smart Tip | info | 1s delay | User has engaged with the form for the first time |
| Focus on field | Smart Tip | info | Immediate | User has already engaged with the form |
| >2 attempts on field | Smart Tip | warning | Immediate | User has focused the same field more than 2 times |
| >30s on empty field | Smart Tip | warning | On blur | User spent 30+ seconds on a field and left it empty |
| Education level selected | Smart Tip | success | Immediate | After valid selection |
| Program selected | Smart Tip | success | Immediate | After valid selection |
| Phase 1 completed | Smart Tip | success | Immediate | On phase transition (Phase 1 → Phase 2) |
| 60s inactivity | Smart Tip + Badge | warning | After timeout | Has form data, not submitted |
| Form data restored | Smart Tip | success | Immediate | On page load with saved data |
| Validation error | Smart Tip | warning | On validation | Form is invalid and user has engaged |
| Invalid characters in name | Smart Tip | warning | On input | Non-letter characters detected in name fields |
| Click help button | Help Modal | — | Immediate | Always |
| Hover/click tooltip trigger | Tooltip | — | Immediate | Always |

### Timing Constants

| Constant | Value | Description |
|----------|-------|-------------|
| Welcome message delay | 1 second | Pause before first welcome bubble after engagement |
| Smart tip auto-dismiss | 10 seconds | How long info/success bubbles stay visible |
| Inactivity threshold | 60 seconds | Time before abandonment help fires |
| Field struggle time | 30 seconds | Time on a field before it's considered a struggle |
| Tooltip close delay | 100 ms | Brief delay before tooltip hides on mouse leave |
| Auto-save interval | 10 seconds | How often form data is saved to localStorage |
| Saved data expiry | 7 days | How long saved form data persists |

### Field Attempt Tracking

- Track the number of times a user focuses each field
- If a field has been focused **more than 2 times** without completing it, show the struggling-help bubble for that field
- Tracking is per-field and per-session

---


## 9. Analytics & Tracking

### Event Tracking Schema

| Event Name | Data Fields | When Fired |
|------------|-------------|------------|
| form_viewed | phase, variation | Page load |
| form_engaged | timeToEngage | First interaction |
| welcome_message_shown | — | After engagement |
| field_help_shown | field, helpType | Focus on field |
| struggling_help_shown | field, attempts | >2 attempts on field |
| abandonment_help_offered | phase, timeOnPage | 60s inactivity |
| help_modal_opened | phase | Click help button |
| tooltip_opened | tooltipId | Hover/click tooltip |
| smart_tip_closed | tipType, autoOrManual | Tip dismissed |
| phase_completed | phase, educationLevel, program | Phase 1 → Phase 2 transition |
| form_submitted | timeToComplete, helpInteractions | Successful submit |
| validation_error_shown | field, errorType | Validation failure |

### Key Metrics

| Metric | Type | Definition |
|--------|------|------------|
| Form Completion Rate | Primary | Submissions / Unique Visitors |
| Time to Complete | Secondary | Avg seconds from load to submit |
| Phase 1 Drop-off | Secondary | % who don't advance to Phase 2 |
| Help Interaction Rate | Secondary | % who interact with help system |
| Field Error Rate | Secondary | Errors per submission attempt |
| Abandonment Rate | Secondary | % who leave with partial data |

### Data Layer Integration

All events should be pushed to the `window.dataLayer` array for GA4 consumption. Each event object should include the event name and associated data fields from the schema above.

---

## 10. QA Checklist

- [ ] Smart tip container appears correctly on all triggers
- [ ] Smart tip auto-dismisses after 10 seconds (info/success)
- [ ] Warning tips persist until manually closed
- [ ] Floating help button is visible and clickable
- [ ] Help badge appears after 60s inactivity
- [ ] Help modal opens and closes correctly
- [ ] Help modal content changes by step
- [ ] Tooltips work on hover (desktop) and click (mobile)
- [ ] All events fire to GA4
- [ ] Mobile responsive design works
- [ ] Accessibility: focus states, ARIA labels
- [ ] No JavaScript errors in console
- [ ] Performance: no visible lag or jank
- [ ] Print stylesheet hides all support bubble elements
- [ ] Form still submits correctly with support bubbles active

---

## Appendix A: File References

| File | Purpose |
|------|---------|
| `homepage.html` | Reference implementation HTML |
| `form.js` | Reference implementation JS |
| `styles.css` | Reference implementation CSS |
| `program-data.js` | Program data for dropdowns |

## Appendix B: Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Arizona Blue | `#0C234B` | Primary, headers |
| Arizona Red | `#AB0520` | Accents, badges |
| CTA Gold | `#E8A93E` | Primary CTAs, "Request Info" buttons |
| River | `#007D8A` | Info tips |
| Success Green | `#10B981` | Success tips |
| Warning Orange | `#F59E0B` | Warning tips |

## Appendix C: Contact

For questions about this specification, contact:
- **Product:** [Product Manager]
- **Development:** [Tech Lead]
- **Analytics:** [Analytics Lead]

---

*End of Document*
