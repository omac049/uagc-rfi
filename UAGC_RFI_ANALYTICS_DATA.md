# UAGC RFI Analytics Data
## Source: GA4 Real Data (Last 30 Days)
**Data Pull Date:** November 14, 2025

---

## 1. Overall RFI Form Performance

### Key Metrics
| Metric | Events | Unique Users |
|--------|--------|--------------|
| **Form Starts (All)** | 115,260 | 81,437 |
| **Form Submits (All)** | 84,230 | 27,913 |
| **RFI Starts** | 44,283 | 33,562 |
| **RFI Step 1 Completed** | 31,580 | 21,738 |
| **RFI Submits** | 18,665 | 8,608 |
| **RFI Abandons** | 18,782 | 13,396 |
| **RFI Errors** | 9,653 | 3,947 |

### Calculated Completion Rates
- **RFI Completion Rate:** 42.1% (18,665 submits / 44,283 starts)
- **Step 1 to Submit:** 59.1% (18,665 / 31,580)
- **Error Rate:** 21.8% (9,653 errors / 44,283 starts)
- **Abandonment Rate:** 42.4% (18,782 / 44,283)

---

## 2. Device-Specific Performance

### Mobile
| Metric | Events | Unique Users |
|--------|--------|--------------|
| Form Starts | 64,948 | 53,543 |
| RFI Starts | 23,752 | 19,514 |
| RFI Submits | 12,517 | 5,804 |
| RFI Errors | 6,021 | 2,191 |
| RFI Abandons | 4,926 | 3,828 |

**Mobile Completion Rate:** 52.7% (12,517 / 23,752)

### Desktop
| Metric | Events | Unique Users |
|--------|--------|--------------|
| Form Starts | 48,880 | 26,461 |
| RFI Starts | 19,963 | 13,553 |
| RFI Submits | 5,927 | 2,671 |
| RFI Errors | 3,512 | 1,699 |
| RFI Abandons | 13,685 | 9,446 |

**Desktop Completion Rate:** 29.7% (5,927 / 19,963)

### Tablet
| Metric | Events | Unique Users |
|--------|--------|--------------|
| Form Starts | 1,430 | 1,106 |
| RFI Starts | 567 | 459 |
| RFI Submits | 220 | 116 |
| RFI Errors | 120 | 57 |
| RFI Abandons | 171 | 125 |

**Tablet Completion Rate:** 38.8% (220 / 567)

---

## 3. Session & Engagement Metrics

| Device | Avg Session Duration | Engagement Rate | Sessions | Users |
|--------|---------------------|-----------------|----------|-------|
| **Desktop** | 884 sec (14.7 min) | 40.2% | 548,723 | 217,472 |
| **Mobile** | 453.5 sec (7.6 min) | 36.3% | 683,628 | 328,941 |
| **Tablet** | 458 sec (7.6 min) | 30.3% | 20,572 | 9,855 |

### Key Findings
- Desktop users spend **95% more time** per session than mobile (14.7 min vs 7.6 min)
- Desktop has **higher engagement rate** (40.2% vs 36.3%)
- BUT **Mobile has better RFI completion** (52.7% vs 29.7%)
- Mobile represents **55.3% of all traffic** but **53.6% of RFI submits**

---

## 4. Device Comparison: Desktop vs Mobile

| Metric | Mobile | Desktop | Gap |
|--------|--------|---------|-----|
| **Completion Rate** | 52.7% | 29.7% | **+23 pts (Mobile WINS)** |
| **Session Duration** | 7.6 min | 14.7 min | -7.1 min |
| **Engagement Rate** | 36.3% | 40.2% | -3.9 pts |
| **Error Rate** | 25.3% | 17.6% | +7.7 pts |
| **Traffic Share** | 55.3% | 44.3% | +11 pts |

### Surprising Insight
**Mobile users complete RFIs at a HIGHER rate than desktop users** despite:
- Shorter session times
- Higher error rates
- Lower overall engagement

This suggests mobile form design is actually working well, but there's opportunity to reduce errors.

---

## 5. Landing Page Performance (Top RFI Pages)

| Landing Page | Total Users | Bounce Rate |
|--------------|-------------|-------------|
| `/apply-now` | 229,142 | 84.5% |
| `/` (homepage) | 44,198 | 50.8% |
| `/request-information/thank-you` (Thank You) | 84,612 | 51.6% |
| `/military` | 16,470 | 76.6% |

### RFI Success Page
- **84,612 users** reached `/request-information/thank-you` (thank you page)
- This aligns with **18,665 RFI submit events** (suggests multiple visits/confirmations)

---

## 6. Drop-Off Analysis (Funnel)

| Stage | Events | Users | Drop-Off |
|-------|--------|-------|----------|
| **Start RFI** | 44,283 | 33,562 | - |
| **Complete Step 1** | 31,580 | 21,738 | **28.7%** |
| **Submit** | 18,665 | 8,608 | **40.9%** |
| **Abandon** | 18,782 | 13,396 | 42.4% |
| **Errors** | 9,653 | 3,947 | 21.8% |

### Critical Drop-Off Points
1. **Step 1 → Step 2:** 28.7% abandon (12,703 events lost)
2. **Step 2 → Submit:** 40.9% abandon (12,915 events lost)
3. **Errors during process:** 21.8% experience errors

---

## 7. Top Site Events (Overall)

| Event Name | Total Events | Unique Users |
|------------|--------------|--------------|
| page_view | 2,750,888 | 549,499 |
| experience_impression | 1,128,045 | 268,355 |
| user_engagement | 1,036,845 | 285,846 |
| session_start | 1,008,493 | 546,864 |
| scroll | 888,690 | 187,831 |
| first_visit | 720,021 | 511,047 |

---

## 8. Key Recommendations Based on Real Data

### 🔴 Priority 1: Reduce Step 2 Drop-Off (40.9%)
- Highest abandonment point in the funnel
- Focus on simplifying contact information collection
- Add progress indicators to show "almost done"

### 🟡 Priority 2: Fix Mobile Errors (25.3% vs 17.6% desktop)
- Mobile users are COMPLETING more but EXPERIENCING more errors
- Likely field validation, keyboard issues, or button sizing
- Fix mobile UX to capitalize on strong mobile completion rate

### 🟢 Priority 3: Reduce Step 1 Abandonment (28.7%)
- Program selection causing 12,703 event losses
- Consider education level filter first (Undergrad/Grad)
- Implement better program discovery/filtering

### 💡 Insight: Mobile is Not the Problem
Contrary to typical assumptions, **mobile users complete RFIs 77% MORE than desktop** (52.7% vs 29.7%). The issue is ERROR rates on mobile, not completion rates. Fix the errors, and mobile could be our strongest channel.

---

## 9. Competitive Benchmarking Context

### Industry Standards (From Competitive Analysis)
- **Multi-step forms:** 50% of competitors use 2-3 steps
- **Progress indicators:** 50% show "Step X of Y"
- **Military question:** 75% include it
- **Education level filter:** 75% lead with Undergrad/Grad

### UAGC vs Competitors
| Feature | UAGC | Competitors | Status |
|---------|------|-------------|--------|
| Multi-step design | ✅ 2 steps | ✅ 50% use multi-step | **MATCHES** |
| Progress indicator | ❌ No | ✅ 50% have it | **GAP** |
| Military question | ✅ Yes/No | ✅ 75% have 4-option | **PARTIAL** |
| Education filter | ❌ No | ✅ 75% have it | **GAP** |

---

## Data Source & Methodology
- **Tool:** Google Analytics 4 (GA4)
- **Date Range:** Last 30 days (October 15 - November 14, 2025)
- **Events Tracked:** Form interactions, submissions, errors, abandons
- **Devices:** Desktop, Mobile, Tablet, Smart TV
- **Metrics:** Event counts, unique users, session duration, engagement rate, bounce rate
