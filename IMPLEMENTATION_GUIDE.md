# RFI 2.0 Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing, testing, and deploying the RFI 2.0 form.

---

## 📁 File Structure

```
RFI - Research/
├── readme.md                    # Project research and planning document
├── IMPLEMENTATION_GUIDE.md      # This file
├── index.html                   # Main form HTML
├── styles.css                   # Form styling (mobile-first)
├── form.js                      # Form logic and validation
└── program-data.js              # Program mappings by category
```

---

## 🚀 Quick Start

### 1. Update Program Data

**File:** `program-data.js`

Replace the placeholder Salesforce Program IDs (`a0Axxxxxxxxxxxxxxx`) with actual 18-character IDs from your Salesforce instance.

```javascript
{
    name: 'Bachelor of Arts in Business Administration',
    programId: 'a0A5f000000XyZ1EAK',  // ← Replace with real ID
    level: 'undergraduate'
}
```

**How to find Salesforce Program IDs:**
1. Navigate to your Salesforce instance
2. Go to the Program object records
3. Copy the 18-character ID from the URL or record details
4. Update each program in `program-data.js`

### 2. Configure API Endpoint

**File:** `form.js` (Line 7)

Update the `apiEndpoint` to point to your Lead API:

```javascript
const CONFIG = {
    apiEndpoint: 'https://api.uagc.edu/v1/leads',  // ← Update this
    enableAnalytics: true,
    testMode: false  // Set to true for testing
};
```

### 3. Update Brand Colors (Optional)

**File:** `styles.css` (Lines 8-14)

Customize the CSS variables to match UAGC's exact brand colors:

```css
:root {
    --color-primary: #003366;      /* Update to exact UAGC Blue */
    --color-primary-dark: #002347;
    --color-primary-light: #0055A6;
    --color-secondary: #C41E3A;    /* Update to exact UAGC Red */
    --color-secondary-dark: #A01729;
}
```

### 4. Add Privacy Policy Link

**File:** `index.html` (Line 287)

Update the privacy policy link URL:

```html
<a href="https://www.uagc.edu/privacy-policy" target="_blank" class="privacy-link">
    Privacy Policy
</a>
```

---

## 🧪 Testing

### Local Testing

1. **Enable Test Mode**
   
   In `form.js`, set:
   ```javascript
   testMode: true
   ```
   This will simulate API calls without actually submitting data.

2. **Open in Browser**
   
   Simply open `index.html` in your browser. No server required for testing.

3. **Test Scenarios**

   ✅ **Step 1 Validation:**
   - Try clicking "Continue" without selecting an area
   - Select an area, verify programs populate
   - Select a Nursing program, verify RN question appears

   ✅ **Step 2 Validation:**
   - Try submitting with empty required fields
   - Test invalid email format
   - Test invalid phone number (not 10 digits)
   - Test phone formatting (should auto-format to (555) 123-4567)

   ✅ **Navigation:**
   - Click "Back" button to return to Step 1
   - Verify progress bar updates correctly
   - Verify form data persists when going back

   ✅ **Conditional Logic:**
   - Select "Bachelor of Science in Nursing (RN to BSN)"
   - Verify RN license question appears
   - Select non-nursing program
   - Verify RN question disappears

   ✅ **Mobile Responsiveness:**
   - Test on mobile device or use browser DevTools
   - Verify layout stacks vertically on small screens
   - Test touch interactions
   - Verify mobile keyboard types (tel, email)

4. **Check Console Logs**
   
   Open browser DevTools (F12) and check console for:
   - Form initialization message
   - Analytics events
   - Form data output (in test mode)

### Browser Testing

Test on these browsers (minimum):
- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

### Accessibility Testing

1. **Keyboard Navigation**
   - Tab through entire form
   - Verify all fields are reachable
   - Test Enter key to submit
   - Verify no keyboard traps

2. **Screen Reader**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify labels are announced
   - Verify error messages are announced
   - Check ARIA attributes

3. **Color Contrast**
   - Use WebAIM Contrast Checker
   - Verify text meets WCAG AA standards (4.5:1 ratio)

---

## 🔧 Configuration Options

### Analytics Integration

The form supports Google Analytics 4 out of the box.

**Events tracked:**
- `form_viewed` - When form loads
- `area_selected` - When user selects area of interest
- `program_selected` - When user selects degree program
- `step_completed` - When Step 1 is completed
- `form_submitted` - When form is submitted
- `form_conversion` - When submission succeeds
- `form_error` - When submission fails

**To disable analytics:**
```javascript
const CONFIG = {
    enableAnalytics: false  // Set to false
};
```

### URL Parameters for Campaigns

The form supports URL parameters for tracking and pre-population:

**Partner Tracking:**
```
https://www.uagc.edu/rfi?partner_id=ABC123&partner_name=MilitaryPartner
```

**Pre-select Area:**
```
https://www.uagc.edu/rfi?area=business
```
This will automatically select "Business" and populate the programs.

---

## 📤 Deployment

### Pre-Deployment Checklist

- [ ] All Salesforce Program IDs are updated
- [ ] API endpoint is configured correctly
- [ ] Test mode is disabled (`testMode: false`)
- [ ] Brand colors match UAGC guidelines
- [ ] Privacy policy link is correct
- [ ] All browsers tested
- [ ] Accessibility testing completed
- [ ] Mobile testing completed
- [ ] Analytics tracking verified

### Deployment Steps

#### Option A: Embed in Existing Site

1. **Copy Files to Server**
   - Upload `index.html`, `styles.css`, `form.js`, and `program-data.js`
   
2. **Include in Page**
   ```html
   <!-- In your page <head> -->
   <link rel="stylesheet" href="/path/to/styles.css">
   
   <!-- Before closing </body> -->
   <script src="/path/to/program-data.js"></script>
   <script src="/path/to/form.js"></script>
   ```

3. **Add Form HTML**
   - Copy the `<div class="rfi-container">` section from `index.html`
   - Paste into your page where you want the form

#### Option B: Standalone Page

1. **Upload All Files**
   - Upload to your web server

2. **Configure URL**
   - Set up URL: `https://www.uagc.edu/request-information`

3. **Update CTAs**
   - Update "Request Info" buttons site-wide to point to new URL

#### Option C: Modal/Popup

If you want the form to appear in a modal:

1. **Add Modal Wrapper** (in your main page):
   ```html
   <div class="modal" id="rfiModal">
       <div class="modal-content">
           <!-- Paste RFI form here -->
       </div>
   </div>
   ```

2. **Trigger Button**:
   ```html
   <button onclick="document.getElementById('rfiModal').style.display='block'">
       Request Information
   </button>
   ```

### A/B Testing Setup

To run A/B testing between old form and RFI 2.0:

1. **Use Feature Flag or A/B Testing Tool** (e.g., Optimizely, Google Optimize)

2. **Split Traffic:**
   - 50% see current form (Control)
   - 50% see RFI 2.0 (Variant)

3. **Track Metrics:**
   - Form start rate
   - Form completion rate
   - Time to complete
   - Lead quality (via Salesforce follow-up)

4. **Run for Sufficient Duration:**
   - Minimum 2-3 weeks
   - Until statistical significance reached

### Rollback Plan

If issues arise after deployment:

1. **Immediate Rollback:**
   - Replace RFI 2.0 files with backup of old form
   - Update CTAs to point back to old form

2. **Monitor:**
   - Check Salesforce for lead flow
   - Monitor analytics for drop-off
   - Review error logs

---

## 🔍 Monitoring & Optimization

### Key Metrics to Track

**Form Performance:**
- Form start rate (views → starts)
- Step 1 completion rate
- Overall completion rate
- Average time to complete
- Mobile vs. Desktop completion rates

**Lead Quality:**
- Leads to applications ratio
- Leads to enrollments ratio
- Military-affiliated leads percentage

**Technical:**
- API response time
- Error rate
- Browser/device breakdown

### Post-Launch Optimization

**Week 1:**
- Monitor completion rates hourly
- Check for any technical errors
- Verify Salesforce integration

**Week 2-4:**
- Analyze user behavior (session recordings if available)
- Identify friction points
- Compare to baseline metrics

**Ongoing:**
- A/B test variations (e.g., copy changes, field order)
- Optimize for mobile if completion rate is lower
- Add/remove fields based on data

---

## 🐛 Troubleshooting

### Form Not Submitting

1. **Check Console for Errors**
   - Open DevTools (F12)
   - Look for JavaScript errors

2. **Verify API Endpoint**
   - Confirm endpoint URL is correct
   - Check network tab in DevTools
   - Verify CORS headers if cross-domain

3. **Check Validation**
   - All required fields filled?
   - Email format correct?
   - Phone number 10 digits?
   - TCPA consent checked?

### Programs Not Populating

1. **Check `PROGRAM_DATA` object**
   - Verify data structure
   - Check area key matches dropdown value

2. **Check Console**
   - Look for "Populated X programs" message
   - Check for JavaScript errors

### Styling Issues

1. **CSS Not Loading**
   - Verify `styles.css` path in `<link>` tag
   - Check for 404 errors in Network tab

2. **Conflicts with Site CSS**
   - Use more specific selectors
   - Or wrap form in unique class: `.rfi-2-0 .form-group`

### Mobile Issues

1. **Layout Problems**
   - Check viewport meta tag
   - Test with browser DevTools mobile emulation
   - Verify media queries are working

2. **Keyboard Issues**
   - Check input type attributes (tel, email)
   - Test on actual devices

---

## 📞 Support & Contacts

**Technical Issues:**
- Developer: [Your Name/Team]
- Email: [support@uagc.edu]

**Salesforce/API:**
- Salesforce Admin: [Name]
- API Documentation: [Link]

**Analytics:**
- Analytics Team: [Contact]
- GA4 Property ID: [ID]

---

## 📝 Change Log

### Version 2.0.0 (Initial Release)
- Two-step form design
- Mobile-first responsive layout
- Dependent dropdown logic
- Real-time validation
- Phone number auto-formatting
- Conditional RN license question
- Military status question
- TCPA consent
- Analytics tracking
- Partner/campaign URL parameters

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Monitor metrics for 2-4 weeks
2. ✅ Gather feedback from admissions counselors
3. ✅ Analyze A/B test results
4. ✅ Plan iteration based on data
5. ✅ Consider enhancements:
   - Program search functionality
   - Save progress feature
   - Multi-language support
   - Virtual assistant integration

---

*Document Last Updated: October 31, 2025*
