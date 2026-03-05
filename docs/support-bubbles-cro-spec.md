# Support Bubbles CRO Test Specification

**Document Version:** 1.0  
**Last Updated:** March 5, 2026  
**Purpose:** Implementation guide for CRO test of contextual support bubbles on RFI forms  
**Reference Implementation:** `homepage.html` + `form.js`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Component Overview](#2-component-overview)
3. [Smart Tip Container](#3-smart-tip-container)
4. [Floating Help Button](#4-floating-help-button)
5. [Help Modal](#5-help-modal)
6. [Field-Level Assistance](#6-field-level-assistance)
7. [Trigger Conditions Reference](#7-trigger-conditions-reference)
8. [CSS Implementation](#8-css-implementation)
9. [JavaScript Implementation](#9-javascript-implementation)
10. [Analytics & Tracking](#10-analytics--tracking)
11. [QA Checklist](#11-qa-checklist)

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

### Expected Impact

- **Primary Metric:** Form completion rate
- **Secondary Metrics:** Time to complete, field error rate, abandonment rate
- **Target Lift:** 5-15% improvement in form submissions

---

## 2. Component Overview

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  RFI Form Container                                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Smart Tip Container (contextual messages)         │  │
│  │  #smartTipContainer                                │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Form Fields with Tooltips                         │  │
│  │  .tooltip-trigger + .tooltip-content               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Floating Help   │  ← Fixed position, bottom-right
│  Button          │
│  .smart-help-button
└──────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Help Modal (overlay)                                    │
│  .help-modal-overlay > .help-modal                       │
└─────────────────────────────────────────────────────────┘
```

### User Engagement Detection

**IMPORTANT:** Help messages only appear AFTER the user has engaged with the form. This prevents intrusive pop-ups on page load.

```javascript
// User is considered "engaged" after first interaction
let userEngaged = false;

// Engagement is detected on:
// - Focus on any form field
// - Click on any form field
```

---

## 3. Smart Tip Container

### Purpose

The Smart Tip Container is the primary vehicle for contextual help messages. It appears at the top of the form and provides guidance, encouragement, and warnings.

### HTML Structure

```html
<div id="smartTipContainer" class="smart-tip-container" style="display: none;">
    <div class="smart-tip-content">
        <div class="smart-tip-icon">💡</div>
        <div class="smart-tip-text">
            <strong class="smart-tip-title">Tip Title</strong>
            <p class="smart-tip-message">Helpful message content here.</p>
        </div>
        <button class="smart-tip-close" onclick="this.closest('.smart-tip-container').style.display='none'">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
</div>
```

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
```javascript
{
    title: '👋 Welcome!',
    message: 'Welcome! We\'ll help you every step of the way. 😊',
    icon: '👋',
    type: 'info'
}
```

#### Field Help Messages
```javascript
const helpMessages = {
    'educationLevel': {
        title: 'Choosing Your Education Level',
        message: 'Select undergraduate for associate\'s or bachelor\'s degrees, or graduate for master\'s or doctoral programs.',
        icon: '🎓'
    },
    'degreeProgram': {
        title: 'Select Your Degree Program',
        message: 'Choose the specific degree that matches your educational goals. Each program is designed for working adults and offers flexible online learning.',
        icon: '📚'
    },
    'firstName': {
        title: 'Your First Name',
        message: 'Enter your legal first name as it appears on official documents.',
        icon: '👤'
    },
    'email': {
        title: 'Email Address',
        message: 'We\'ll send program information and admission details to this email. Make sure it\'s an address you check regularly.',
        icon: '📧'
    },
    'phone': {
        title: 'Phone Number',
        message: 'An admissions counselor will contact you at this number to answer questions and guide you through the enrollment process.',
        icon: '📱'
    },
    'state': {
        title: 'Your State',
        message: 'This helps us provide you with relevant program availability and state-specific information.',
        icon: '📍'
    }
};
```

#### Struggling User Messages
```javascript
const strugglingMessages = {
    'educationLevel': 'Not sure which level? Choose undergraduate if you\'re starting or completing a bachelor\'s degree, or graduate if you already have a bachelor\'s and want an advanced degree.',
    'degreeProgram': 'Not sure which degree is right for you? Our admissions counselors can help! For now, choose the one that sounds most interesting.',
    'email': 'Need an email address? Consider creating a free Gmail, Outlook, or Yahoo account to use for your education journey.',
    'phone': 'Enter your phone number in this format: (555) 123-4567. We\'ll only contact you about your educational opportunities.',
    'state': 'Select the state where you currently live. This helps us provide you with relevant program information.'
};
```

#### Encouragement Messages
```javascript
const encouragementPoints = [
    { trigger: 'area_selected', message: 'Great choice! 🎯 Now let\'s find your perfect program.' },
    { trigger: 'program_selected', message: 'Excellent! 👏 You\'re halfway there. Just need your contact info.' },
    { trigger: 'step_completed', message: 'Almost done! 🚀 Last step - your contact information.' }
];
```

#### Error/Warning Messages
```javascript
// Validation error
{
    title: '⚠️ Required Fields Missing',
    message: 'Please complete all required fields before continuing. Look for the red error messages below.',
    icon: '⚠️',
    type: 'warning'
}

// Invalid name characters
{
    title: '⚠️ Invalid Characters',
    message: 'Names should only contain letters, spaces, hyphens, and apostrophes.',
    icon: '⚠️',
    type: 'warning'
}

// Abandonment help
{
    title: '🤔 Need Assistance?',
    message: 'Still here? Need any help completing the form? Click the help button (?) if you have questions!',
    icon: '🆘',
    type: 'warning'
}

// Form data restored
{
    title: '💾 Progress Restored',
    message: 'We restored your previous progress! You can continue where you left off.',
    icon: '💾',
    type: 'success'
}
```

---

## 4. Floating Help Button

### Purpose

A persistent, always-visible button that provides access to comprehensive help at any time.

### HTML Structure

```html
<div class="smart-help-button" title="Need help? Click for assistance">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="help-badge" style="display: none;">!</span>
</div>
```

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

```javascript
// Show badge
const helpBadge = document.querySelector('.help-badge');
if (helpBadge) {
    helpBadge.style.display = 'block';
}
```

### Click Action

Opens the Help Modal (see Section 5).

---

## 5. Help Modal

### Purpose

Provides comprehensive, step-specific help content in an overlay modal.

### HTML Structure

```html
<div class="help-modal-overlay" onclick="closeHelpModal()">
    <div class="help-modal" onclick="event.stopPropagation()">
        <div class="help-modal-header">
            <h3>📋 Form Assistance</h3>
            <button class="help-modal-close" onclick="closeHelpModal()">×</button>
        </div>
        <div class="help-modal-body">
            <!-- Dynamic content based on current step -->
        </div>
        <div class="help-modal-footer">
            <p class="help-contact">Need more help? Call us at <strong>1-866-711-1700</strong></p>
        </div>
    </div>
</div>
```

### Modal Behavior

| Behavior | Implementation |
|----------|----------------|
| Open trigger | Click on floating help button |
| Close triggers | Click overlay, click × button, press Escape |
| Animation in | `scaleIn 0.3s` + `fadeIn 0.2s` |
| Body scroll | Should be locked when open |
| Focus trap | Recommended for accessibility |

### Content by Step

#### Step 1 Content (Program Selection)
```html
<h4>Step 1: Program Selection</h4>
<div class="help-section">
    <p><strong>Area of Interest:</strong> Choose the field you want to study. This could be related to your current career or a new field you want to explore.</p>
    <p><strong>Degree Program:</strong> After selecting an area, choose the specific degree. Consider:</p>
    <ul>
        <li>Your career goals</li>
        <li>Bachelor's (undergraduate) vs. Master's (graduate) programs</li>
        <li>Programs that match your interests</li>
    </ul>
</div>
<div class="help-section">
    <h5>Popular Programs:</h5>
    <ul>
        <li><strong>Business:</strong> MBA, Business Administration, Accounting</li>
        <li><strong>Healthcare:</strong> Nursing (RN to BSN), Healthcare Administration</li>
        <li><strong>Education:</strong> Early Childhood Education, Educational Leadership</li>
        <li><strong>Technology:</strong> Information Technology, Cybersecurity</li>
    </ul>
</div>
```

#### Step 2 Content (Contact Information)
```html
<h4>Step 2: Contact Information</h4>
<div class="help-section">
    <p>We need your contact information so our admissions team can:</p>
    <ul>
        <li>Send you detailed program information</li>
        <li>Answer your questions about enrollment</li>
        <li>Help you understand financial aid options</li>
        <li>Guide you through the application process</li>
    </ul>
</div>
<div class="help-section">
    <p><strong>Your Privacy:</strong> We value your privacy. Your information is secure and will only be used by UAGC for educational opportunities. We won't share it with third parties.</p>
</div>
<div class="help-section">
    <h5>What Happens Next?</h5>
    <ol>
        <li>You'll receive an email with program details</li>
        <li>An admissions counselor will call you within 1-2 business days</li>
        <li>They'll answer your questions and help you start your journey</li>
    </ol>
</div>
```

---

## 6. Field-Level Assistance

### Purpose

Provide quick, inline help for specific form fields without disrupting the user flow.

### Tooltip Trigger HTML

```html
<label for="fieldName" class="form-label required">
    Field Label
    <button type="button" 
            class="tooltip-trigger" 
            data-tooltip="fieldName"
            aria-expanded="false"
            aria-describedby="tooltip-fieldName">
        <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </button>
</label>

<div id="tooltip-fieldName" 
     class="tooltip-content" 
     role="tooltip" 
     aria-hidden="true">
    <div class="tooltip-header">Tooltip Title</div>
    <div class="tooltip-section">
        <p>Tooltip content here...</p>
    </div>
</div>
```

### Tooltip Behavior

| Platform | Trigger | Close |
|----------|---------|-------|
| Desktop | Hover OR click | Mouse leave, click outside, Escape |
| Mobile | Click/tap only | Click outside, Escape, tap close button |

### Tooltip Positioning

```css
/* Desktop: Above the trigger */
.tooltip-content {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 12px;
}

/* Mobile: Centered, full-width */
@media (max-width: 768px) {
    .tooltip-content {
        width: calc(100vw - 32px);
        left: 50%;
        transform: translateX(-50%);
    }
}
```

---

## 7. Trigger Conditions Reference

### Complete Trigger Matrix

| Trigger Event | Component | Type | Timing | Condition |
|--------------|-----------|------|--------|-----------|
| First field interaction | Smart Tip | info | 1s delay | `userEngaged` becomes true |
| Focus on field | Smart Tip | info | Immediate | `userEngaged === true` |
| >2 attempts on field | Smart Tip | warning | Immediate | `fieldAttempts[fieldId] > 2` |
| >30s on empty field | Smart Tip | warning | On blur | `interactionTime > 30000 && field.value === ''` |
| Education level selected | Smart Tip | success | Immediate | After valid selection |
| Program selected | Smart Tip | success | Immediate | After valid selection |
| Step 1 completed | Smart Tip | success | Immediate | On step transition |
| 60s inactivity | Smart Tip + Badge | warning | After timeout | Has form data, not submitted |
| Form data restored | Smart Tip | success | Immediate | On page load with saved data |
| Validation error | Smart Tip | warning | On validation | `!isValid && userEngaged` |
| Invalid characters in name | Smart Tip | warning | On input | Regex match for invalid chars |
| Click help button | Help Modal | - | Immediate | Always |
| Hover/click tooltip trigger | Tooltip | - | Immediate | Always |

### Timing Constants

```javascript
const TIMING = {
    welcomeMessageDelay: 1000,      // 1 second after engagement
    smartTipAutoDismiss: 10000,     // 10 seconds for info/success
    inactivityThreshold: 60000,     // 60 seconds for abandonment
    fieldStruggleTime: 30000,       // 30 seconds on empty field
    tooltipCloseDelay: 100,         // 100ms delay on mouse leave
    savedDataExpiry: 7 * 24 * 60 * 60 * 1000  // 7 days
};
```

### Field Attempt Tracking

```javascript
// Track attempts per field
let fieldAttempts = {};

// Increment on focus
function handleFieldFocus(field) {
    const fieldId = field.id || field.name;
    fieldAttempts[fieldId] = (fieldAttempts[fieldId] || 0) + 1;
    
    // Show struggling help if > 2 attempts
    if (fieldAttempts[fieldId] > 2) {
        showStrugglingHelp(field);
    }
}
```

---

## 8. CSS Implementation

### Required CSS Variables

```css
:root {
    /* Colors */
    --arizona-blue: #0C234B;
    --arizona-red: #AB0520;
    --cta-gold: #E8A93E;
    --cta-gold-hover: #D4952F;
    --river: #007D8A;
    --color-text: #333333;
    --color-text-light: #6b7280;
    --color-border: #e5e7eb;
    --color-bg-light: #f9fafb;
    --color-primary-light: #1a3a6b;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* Typography */
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    
    /* Effects */
    --border-radius: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --transition: all 0.2s ease;
}
```

### Smart Tip Container CSS

```css
/* Base Container */
.smart-tip-container {
    position: relative;
    width: 100%;
    background-color: #EFF8F9;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 2px 8px rgba(0, 125, 138, 0.15);
    margin-bottom: var(--spacing-lg);
    animation: slideInDown 0.3s ease-out;
    border-left: 4px solid var(--river);
}

/* Variants */
.smart-tip-container.info {
    border-left-color: var(--river);
    background-color: #EFF8F9;
}

.smart-tip-container.success {
    border-left-color: #10B981;
    background-color: #ECFDF5;
}

.smart-tip-container.warning {
    border-left-color: #F59E0B;
    background-color: #FEF3C7;
}

/* Animation */
@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Content Layout */
.smart-tip-content {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
}

.smart-tip-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.smart-tip-text {
    flex: 1;
}

.smart-tip-title {
    display: block;
    font-size: var(--font-size-base);
    font-weight: 700;
    color: #0C234B;
    margin-bottom: var(--spacing-xs);
}

.smart-tip-message {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    line-height: 1.5;
    margin: 0;
}

/* Close Button */
.smart-tip-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: var(--color-text-light);
    transition: var(--transition);
    flex-shrink: 0;
}

.smart-tip-close:hover {
    color: var(--color-text);
}

/* Mobile Responsive */
@media (max-width: 640px) {
    .smart-tip-container {
        margin-bottom: var(--spacing-md);
        border-radius: var(--border-radius-md);
    }
    
    .smart-tip-content {
        padding: var(--spacing-sm) var(--spacing-md);
        gap: var(--spacing-sm);
    }
    
    .smart-tip-icon {
        font-size: 20px;
    }
}
```

### Floating Help Button CSS

```css
.smart-help-button {
    position: fixed;
    bottom: var(--spacing-xl);
    right: var(--spacing-xl);
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, var(--arizona-blue) 0%, var(--color-primary-light) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(12, 35, 75, 0.3);
    transition: var(--transition);
    z-index: 1000;
    color: white;
    border: none;
}

.smart-help-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(12, 35, 75, 0.4);
}

.smart-help-button:active {
    transform: scale(0.95);
}

.smart-help-button svg {
    width: 28px;
    height: 28px;
}

/* Notification Badge */
.help-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background-color: var(--arizona-red);
    color: white;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
}

/* Mobile */
@media (max-width: 640px) {
    .smart-help-button {
        bottom: var(--spacing-md);
        right: var(--spacing-md);
        width: 48px;
        height: 48px;
    }
    
    .smart-help-button svg {
        width: 24px;
        height: 24px;
    }
}
```

### Help Modal CSS

```css
.help-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: var(--spacing-md);
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.help-modal {
    background-color: white;
    border-radius: var(--border-radius-lg);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.help-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 2px solid var(--color-border);
    background: linear-gradient(135deg, var(--arizona-blue) 0%, var(--color-primary-light) 100%);
}

.help-modal-header h3 {
    margin: 0;
    font-size: var(--font-size-xl);
    color: white;
}

.help-modal-close {
    background: none;
    border: none;
    font-size: 32px;
    line-height: 1;
    cursor: pointer;
    color: white;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    border-radius: var(--border-radius);
}

.help-modal-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.help-modal-body {
    padding: var(--spacing-xl);
}

.help-modal-body h4 {
    color: var(--arizona-blue);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-md);
    margin-top: 0;
}

.help-modal-body h5 {
    color: var(--arizona-red);
    font-size: var(--font-size-base);
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
}

.help-section {
    margin-bottom: var(--spacing-lg);
}

.help-section p {
    margin-bottom: var(--spacing-sm);
    line-height: 1.6;
    color: var(--color-text);
}

.help-section ul,
.help-section ol {
    margin-left: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}

.help-section li {
    margin-bottom: var(--spacing-xs);
    line-height: 1.6;
    color: var(--color-text);
}

.help-modal-footer {
    padding: var(--spacing-lg) var(--spacing-xl);
    background-color: var(--color-bg-light);
    border-top: 1px solid var(--color-border);
    border-bottom-left-radius: var(--border-radius-lg);
    border-bottom-right-radius: var(--border-radius-lg);
}

.help-contact {
    margin: 0;
    text-align: center;
    color: var(--color-text);
    font-size: var(--font-size-sm);
}

.help-contact strong {
    color: var(--arizona-blue);
    font-weight: 700;
}

/* Mobile */
@media (max-width: 640px) {
    .help-modal {
        max-height: 95vh;
    }
    
    .help-modal-header,
    .help-modal-body,
    .help-modal-footer {
        padding: var(--spacing-md);
    }
}
```

### Tooltip CSS

```css
.tooltip-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 6px;
    vertical-align: middle;
}

.tooltip-trigger .info-icon {
    color: #0056B3;
    transition: color 0.2s ease;
}

.tooltip-trigger:hover .info-icon,
.tooltip-trigger:focus .info-icon {
    color: #003d82;
}

.tooltip-content {
    display: none;
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    padding: 16px;
    width: 320px;
    max-width: calc(100vw - 32px);
    font-size: 14px;
    line-height: 1.5;
}

.tooltip-content.show {
    display: block;
    animation: tooltipFadeIn 0.2s ease;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tooltip-header {
    font-size: 1rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #0056B3;
}

.tooltip-section {
    margin-bottom: 12px;
}

.tooltip-section:last-child {
    margin-bottom: 0;
}

.tooltip-section strong {
    display: block;
    color: #0056B3;
    font-weight: 600;
    margin-bottom: 6px;
}

.tooltip-section ul {
    margin: 0;
    padding-left: 20px;
    list-style-type: disc;
}

.tooltip-section li {
    margin-bottom: 6px;
    color: #4B5563;
}

/* Mobile tooltip positioning */
@media (max-width: 768px) {
    .tooltip-content {
        width: calc(100vw - 32px);
        left: 50%;
        transform: translateX(-50%);
    }
    
    .tooltip-content.show {
        animation: tooltipFadeInMobile 0.2s ease;
    }
    
    @keyframes tooltipFadeInMobile {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    .tooltip-close {
        display: block;
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6B7280;
        padding: 0;
        width: 24px;
        height: 24px;
        line-height: 1;
    }
}
```

---

## 9. JavaScript Implementation

### Core Functions

```javascript
/**
 * Show smart tip notification
 * @param {string} message - The message content
 * @param {string} title - The tip title
 * @param {string} icon - Emoji icon
 * @param {string} type - 'info' | 'success' | 'warning'
 */
function showSmartTip(message, title = 'Tip', icon = '💡', type = 'info') {
    const tipContainer = document.getElementById('smartTipContainer');
    if (!tipContainer) return;
    
    // Don't show tips until user has engaged
    if (!userEngaged) return;
    
    tipContainer.className = `smart-tip-container ${type}`;
    tipContainer.innerHTML = `
        <div class="smart-tip-content">
            <div class="smart-tip-icon">${icon}</div>
            <div class="smart-tip-text">
                <strong class="smart-tip-title">${title}</strong>
                <p class="smart-tip-message">${message}</p>
            </div>
            <button class="smart-tip-close" onclick="this.closest('.smart-tip-container').style.display='none'">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    tipContainer.style.display = 'block';
    
    // Auto-hide after 10 seconds unless it's a warning
    if (type !== 'warning') {
        setTimeout(() => {
            tipContainer.style.display = 'none';
        }, 10000);
    }
}

/**
 * Show contextual help modal
 */
function showContextualHelp() {
    const helpContent = getContextualHelpContent();
    
    const helpModal = `
        <div class="help-modal-overlay" onclick="closeHelpModal()">
            <div class="help-modal" onclick="event.stopPropagation()">
                <div class="help-modal-header">
                    <h3>📋 Form Assistance</h3>
                    <button class="help-modal-close" onclick="closeHelpModal()">×</button>
                </div>
                <div class="help-modal-body">
                    ${helpContent}
                </div>
                <div class="help-modal-footer">
                    <p class="help-contact">Need more help? Call us at <strong>1-866-711-1700</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.id = 'helpModalContainer';
    modalContainer.innerHTML = helpModal;
    document.body.appendChild(modalContainer);
    
    // Track analytics
    trackEvent('help_modal_opened', { step: currentStep });
}

/**
 * Close help modal
 */
function closeHelpModal() {
    const modalContainer = document.getElementById('helpModalContainer');
    if (modalContainer) {
        modalContainer.remove();
    }
}

/**
 * Setup engagement detection
 */
function setupEngagementDetection() {
    const formFields = form.querySelectorAll('input, select, textarea');
    
    const handleFirstInteraction = () => {
        if (!userEngaged) {
            userEngaged = true;
            
            // Show welcome message after user starts interacting
            setTimeout(() => {
                showSmartTip(
                    'Welcome! We\'ll help you every step of the way. 😊',
                    '👋 Welcome!',
                    '👋',
                    'info'
                );
            }, 1000);
            
            // Start activity tracking for abandonment detection
            setupActivityTracking();
        }
    };
    
    // Listen for first interaction
    formFields.forEach(field => {
        field.addEventListener('focus', handleFirstInteraction, { once: true });
        field.addEventListener('click', handleFirstInteraction, { once: true });
    });
}

/**
 * Setup activity tracking for abandonment detection
 */
function setupActivityTracking() {
    let inactivityTimer;
    
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        
        // If inactive for 60 seconds, offer help
        inactivityTimer = setTimeout(() => {
            offerAbandonmentHelp();
        }, 60000);
    };
    
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    
    resetInactivityTimer();
}

/**
 * Offer help when user seems to be abandoning
 */
function offerAbandonmentHelp() {
    if (!userEngaged) return;
    
    // Check if form has any data
    const hasData = document.getElementById('educationLevel').value || 
                    document.getElementById('firstName').value || 
                    document.getElementById('email').value;
    
    if (hasData) {
        showSmartTip(
            'Still here? Need any help completing the form? Click the help button (?) if you have questions!',
            '🤔 Need Assistance?',
            '🆘',
            'warning'
        );
        
        // Show help badge
        const helpBadge = document.querySelector('.help-badge');
        if (helpBadge) {
            helpBadge.style.display = 'block';
        }
        
        trackEvent('abandonment_help_offered', { step: currentStep });
    }
}

/**
 * Initialize tooltip functionality
 */
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    tooltipTriggers.forEach(trigger => {
        const tooltipId = trigger.getAttribute('data-tooltip');
        const tooltipContent = document.getElementById(`tooltip-${tooltipId}`);
        
        if (!tooltipContent) return;
        
        // Click handler
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = tooltipContent.classList.contains('show');
            
            // Close all other tooltips
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                if (t !== tooltipContent) {
                    t.classList.remove('show');
                    t.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Toggle this tooltip
            tooltipContent.classList.toggle('show');
            trigger.setAttribute('aria-expanded', (!isExpanded).toString());
            tooltipContent.setAttribute('aria-hidden', isExpanded.toString());
            
            if (!isExpanded) {
                trackEvent('tooltip_opened', { tooltip: tooltipId });
            }
        });
        
        // Hover handlers for desktop
        if (window.matchMedia('(min-width: 769px)').matches) {
            trigger.addEventListener('mouseenter', () => {
                tooltipContent.classList.add('show');
                trigger.setAttribute('aria-expanded', 'true');
                tooltipContent.setAttribute('aria-hidden', 'false');
            });
            
            trigger.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!tooltipContent.matches(':hover')) {
                        tooltipContent.classList.remove('show');
                        trigger.setAttribute('aria-expanded', 'false');
                        tooltipContent.setAttribute('aria-hidden', 'true');
                    }
                }, 100);
            });
            
            tooltipContent.addEventListener('mouseleave', () => {
                tooltipContent.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
                tooltipContent.setAttribute('aria-hidden', 'true');
            });
        }
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tooltip-trigger') && !e.target.closest('.tooltip-content')) {
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                t.classList.remove('show');
                t.setAttribute('aria-hidden', 'true');
            });
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                t.classList.remove('show');
            });
        }
    });
}
```

---

## 10. Analytics & Tracking

### Event Tracking Schema

```javascript
// All events to track during the test
const trackingEvents = {
    // Page events
    'form_viewed': {
        step: 1,
        variation: 'control|variant_a|variant_b'
    },
    
    // Engagement events
    'form_engaged': {
        timeToEngage: 'ms'
    },
    
    // Help system events (Variant A/B only)
    'welcome_message_shown': {},
    'field_help_shown': {
        field: 'fieldId',
        helpType: 'info|warning'
    },
    'struggling_help_shown': {
        field: 'fieldId',
        attempts: 'number'
    },
    'abandonment_help_offered': {
        step: 'number',
        timeOnPage: 'ms'
    },
    'help_modal_opened': {
        step: 'number'
    },
    'tooltip_opened': {
        tooltip: 'tooltipId'
    },
    'smart_tip_closed': {
        tipType: 'info|success|warning',
        autoOrManual: 'auto|manual'
    },
    
    // Progress events
    'step_completed': {
        step: 1,
        educationLevel: 'undergraduate|graduate',
        program: 'programName'
    },
    
    // Conversion events
    'form_submitted': {
        timeToComplete: 'seconds',
        helpInteractions: 'number'
    },
    
    // Error events
    'validation_error_shown': {
        field: 'fieldId',
        errorType: 'required|invalid'
    }
};
```

### Key Metrics

| Metric | Type | Definition |
|--------|------|------------|
| Form Completion Rate | Primary | Submissions / Unique Visitors |
| Time to Complete | Secondary | Avg seconds from load to submit |
| Step 1 Drop-off | Secondary | % who don't advance to Step 2 |
| Help Interaction Rate | Secondary | % who interact with help system |
| Field Error Rate | Secondary | Errors per submission attempt |
| Abandonment Rate | Secondary | % who leave with partial data |

### Data Layer Integration

```javascript
// Push to data layer for analytics
function pushToDataLayer(eventName, eventData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...eventData,
        experimentVariation: window.optimizelyVariation || 'control'
    });
}
```

---

## 11. QA Checklist

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
