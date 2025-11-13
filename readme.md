# RFI 2.0 Project Research and Plan

## 📁 File Structure

### Main Pages
- **`index.html`** - Landing page/Development portal that links to all project resources
- **`homepage.html`** - The live RFI form (production-ready)
  - Contains the optimized 2-step form with smart autocomplete features
  - Integrated with program-data.js for dynamic program selection
  - Mobile-optimized with immediate start timeline option
- **`rfi-v2-report.html`** - Comprehensive competitive analysis & recommendations
  - Research findings and UX best practices
  - Competitive analysis of WGU, SNHU, Purdue, Walden
  - Implementation guidelines and expected ROI

### Supporting Files
- **`styles.css`** - Main stylesheet for the RFI form
- **`homepage-styles.css`** - Additional homepage-specific styles
- **`form.js`** - Form logic, validation, and smart features
- **`homepage.js`** - Homepage-specific JavaScript
- **`program-data.js`** - Program catalog data
- **`thank-you.html`** - Post-submission confirmation page

### Documentation
- **`readme.md`** - This file (project overview and research)
- **`IMPLEMENTATION_GUIDE.md`** - Technical implementation guide
- **`AUTOCOMPLETE_FEATURES.md`** - Smart autocomplete features documentation
- **`PROJECT_SUMMARY.md`** - Project summary and key decisions
- **`rfi-report.md`** - Markdown version of the analysis

### Recommended Viewing Order
1. Start at `index.html` for navigation
2. View `homepage.html` to see the live form
3. Read `rfi-v2-report.html` for strategy and recommendations
4. Check `AUTOCOMPLETE_FEATURES.md` for technical features

---

## 🎉 Latest Updates - UX AI Enhancements (Nov 2025)

**The RFI form now includes intelligent UX AI features to help users complete the form successfully!**

### What's New:
- ✨ **Smart Contextual Help System** - Floating help button with step-specific guidance
- 💡 **Intelligent Field Assistance** - Email suggestions, name validation, phone formatting
- 📊 **Progress Encouragement** - Milestone celebrations and completion time estimates
- 🛡️ **Enhanced Validation** - Friendly, helpful error messages with examples
- 💾 **Auto-Save & Recovery** - Never lose progress with automatic data persistence
- 🤝 **Abandonment Detection** - Offers help when users seem stuck or inactive
- 📈 **Field Analytics** - Tracks user struggles and offers targeted assistance
- ♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation
- 📱 **Mobile Optimized** - Seamless experience on any device

### Documentation:
- **[UX_AI_ENHANCEMENTS.md](UX_AI_ENHANCEMENTS.md)** - Complete feature documentation
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Comprehensive testing guide

---

## Introduction

The Request for Information (RFI) form is a crucial lead-generation tool for UAGC's prospective students. It allows visitors to select an academic program of interest and submit their contact details to receive more information. Improving the RFI experience can boost conversion rates and lead quality, as even small usability gains can translate into more enrollments. 

This research compiles user behavior data, market best practices, and internal insights (such as the Suggested Dropdown Order for programs) to guide the RFI 2.0 project. The goal is to design a two-step, user-friendly form (built and tested in Cursor) that increases completions, helps users find programs faster, and aligns with UAGC's brand and technical requirements.

---

## User Behavior Analysis of Current RFI

Understanding how users currently interact with the RFI form will inform our redesign. Key behavioral metrics to examine include:

### Drop-Off Rates per Step
If available, funnel data should be analyzed to see at which step users abandon the form. For example, what percentage of users who start selecting a program do not complete the form? 

Industry benchmarks indicate that around **65.99% of users** who begin a form will complete it, meaning roughly one-third drop off. Every additional field can increase drop-off – as one study noted, at five questions the drop-off rate is ~2%, at ten questions ~4%, growing with more fields. Our current form has many fields, so a multi-step approach will distribute fields and potentially reduce abandonment.

### Most/Least Selected Areas of Interest
By reviewing analytics or enrollment data, we should identify which program categories users select most often and which are rarely chosen. This can guide the order and grouping of options in the dropdown. 

Likely popular choices align with broader industry trends – fields like **business, healthcare, and psychology** consistently attract high interest. At UAGC, programs under Business or Health (e.g. Health Care Administration) are probably top picks, while niche categories (e.g. certain Liberal Arts or very specialized programs) might see fewer selections. 

Knowing the extremes will help us prioritize popular categories at the top of the list and ensure even low-interest options are still findable.

### Device Usage (Mobile vs Desktop)
We will examine the split of users on mobile devices versus desktop when using the RFI form. UAGC's audience includes working adults who may often use mobile; it's crucial the form is mobile-optimized. 

General data shows mobile traffic is at least on par with desktop – globally, mobile has exceeded 50% of web traffic. In higher-ed lead forms, about **50% of visitors use mobile**, but mobile form completers convert slightly less often (around 43% completion on mobile vs. 47% on desktop on average). This indicates our mobile experience might be a current pain point. 

By simplifying fields and using a responsive design, RFI 2.0 aims to narrow that gap. We'll also consider mobile-specific behaviors (like tap-friendly dropdowns and minimal typing) to improve the mobile completion rate.

### Implications
If current data (from Google Analytics or form tracking) is available for these points, we will use it to set baselines. For example:
- If we discover a significant drop-off at the program selection step, we might streamline that interaction
- If 70% of prospects choose three top categories (say Business, IT, Health), we may list those options first in the dropdown
- If mobile users comprise 60% of traffic but have a 20% lower completion rate than desktop, then mobile-first improvements are a priority

---

## Success Metrics for RFI 2.0

To evaluate the success of the RFI 2.0 redesign, we will define clear metrics and goals:

### 1. Increased Form Completion Rate
**Primary Metric:** The percentage of users who complete and submit the RFI out of those who start it. 

Our aim is to raise this completion rate by making the form easier and faster to finish. For example, if the current completion rate is (hypothetically) 50%, we might target an increase to 60% or more. This will be measured via analytics funnels. 

A multi-step design should help achieve this, as multi-step forms with one question per step have been shown to **convert 86% higher** than single-page forms with many questions.

### 2. Higher Quality Leads
We define quality leads as inquiries more likely to progress toward enrollment (e.g. meeting basic qualifications and showing genuine interest). While quality is harder to quantify in real-time, proxies include:

**More Qualified Responses:**
- Adding a question like "Are you a member of the military?" can help tailor follow-up (military-affiliated students might get specialized advisors)
- A "Licensed RN?" question (for nursing programs) ensures we capture necessary info for those specific programs
- We will track if these additional data points lead to more personalized and effective follow-ups
- By letting users self-select their exact program of interest (instead of a vague area), we get more specific leads who know what they want

**Down-funnel Conversion:**
- Over time, we'll look at what percentage of RFI 2.0 leads convert to applications or enrollments, compared to the old form leads
- An increase there would signify more qualified or better-nurtured leads
- This may require integration with CRM data (Salesforce) to measure, but it's an ultimate success indicator beyond the form itself

### 3. Shorter Time to Program Match
**Usability Metric:** Reflecting how quickly a user can find a program that interests them and submit the form. 

The new Suggested Dropdown Order and grouping of programs are intended to reduce the cognitive load in selecting a degree. We will measure:
- Average time on page or time to complete the form
- A reduction in this time (without drop in conversions) indicates users are finding what they need faster
- Fewer clicks or scrolls to get to one's program
- If possible, we'll use session recording or form analytics to see if users are pausing or struggling on the dropdown

The goal is a smoother, quicker selection process that gets the user matched to a program in less time. This not only improves user satisfaction but also means less chance to abandon midway.

### 4. User Satisfaction (Qualitative)
Although not listed explicitly by the user, it's worth noting we can gather feedback via an optional post-form survey or usability tests. Positive feedback or fewer complaints about the form can be a soft success metric. 

For instance, if many users previously dropped with comments like "couldn't find my program" or "form was too long," a drop in those issues post-redesign is a success sign.

**Tracking Plan:**
By defining these metrics upfront, the project can stay focused on outcomes. We will establish a tracking plan (Google Analytics events, or Cursor's built-in analytics if available) to capture form start, drop-off at each step, and form submission, segmented by device and other user attributes.

---

## Scope of the Redesign & Technology Considerations

The RFI 2.0 project will involve both front-end user experience changes and some behind-the-scenes adjustments. Below is the scope of what will (and won't) be redesigned or tested in this initiative:

### UI/UX – Form Fields and Flow
This is the core focus. We plan to implement a two-part form flow to reduce complexity on any single screen. The first part will focus on academic interest selection, and the second part will collect personal contact information.

**Step 1: Program Selection Fields**
Users will choose an Area of Interest (a broad category) and then a Specific Degree program within that category. This two-tier dropdown approach helps manage long lists.

Currently, the form already has "Area of Interest" and "Select Your Degree" fields; we will refine their content and order (see Suggested Dropdown Order below). We will also consider if the order of these two fields should be reversed (degree first vs. area first) based on what testing shows is more intuitive. 

Additionally, any program-specific qualifying question will be shown here – e.g., if a user selects a Nursing program, we could prompt the "Are you currently a licensed RN?" question (which is kept in the form for relevant programs). This ensures we gather necessary info upfront for certain programs.

**Step 2: Personal Information Fields**
This will include:
- Name (first and last)
- Email
- Phone
- State of residence
- A new question: "Are you a member of the military?"

These are essential contact and demographic details needed for follow-up. We will ensure each field is clearly labeled and necessary. The military question is added because it flags leads for specialized outreach or messaging. All personal data entered here will be carried through to lead submission.

**TCPA Consent:**
At the end of Step 2 (just before submission), the form will include the required consent checkbox for contacting the student (as per Telephone Consumer Protection Act compliance). This field ("I agree to the contact methods outlined…") is currently present and will remain mandatory. We will make it clear and easy to understand, to avoid confusion that could cause drop-off right at the end.

### Suggested Dropdown Order (Program Selection)
We will redesign the Area of Interest dropdown options based on the provided program alignment data and user behaviors. 

**The new primary categories suggested include:**
- Business
- Education
- Liberal Arts
- Health & Human Services
- Criminal Justice
- Information Technology
- Communication & Humanities
- Leadership
- Sciences & Mathematics
- Human & Behavioral Performance

These will likely replace or augment the current categories (which were fewer and a bit different, e.g. current form uses categories like Business, Education, Health Care, Information Technology, Liberal Arts, Social & Behavioral Science, etc.). 

**Rationale:**
The goal is to offer more precise groupings that align with the university's colleges and the way prospective students think of their field. For example:
- Splitting "Health" into Health & Human Services (broader, including wellness and admin programs) versus "Social & Behavioral Science" or "Health Care" in the old system
- Pulling out Leadership as its own category (since programs like Organizational Management or Leadership were previously buried under Business)

**Ordering Strategy:**
We will order these categories in a logical and user-friendly way – likely placing the most popular categories at the top (e.g., Business and Health & Human Services first, if those see the highest interest), rather than an alphabetical list.

**Dynamic Interaction:**
The specific program dropdown (`Select Your Degree`) will dynamically populate based on the chosen category. We have to be careful with this interaction: dependent dropdowns can confuse users if not clearly indicated, but we will label Step 1 and Step 2 of the form so it's obvious (e.g., first "Choose an area of study" then "Choose a program"). 

According to usability guidelines, extremely long single dropdowns are problematic because users can't see all options at once and have difficulty scrolling. Our two-step filter approach mitigates that by breaking 100+ programs into bite-sized lists. 

We will ensure that if a user changes their Area selection, the Degree field resets or updates accordingly (with perhaps a brief note like "Select a degree…"). This front-end behavior will be implemented and tested within Cursor.

### Backend Program Mapping Logic
The form's backend logic must map the selected program to the correct program identifier for our CRM (Salesforce). We have an internal reference (the "RFI Values sending to Lead API" CSV) that lists each field and whether it's sent to the Lead API. 

According to that document, both Area of Interest and Select Your Degree are sent and kept, and there is a hidden field for the `Program ID` (18-character Salesforce program ID) that likely auto-fills when a specific degree is chosen. 

**In RFI 2.0, we will:**
- Update this mapping if needed – for example, if we removed the "Degree Level" field (which was redundant and marked for deletion), we ensure that its absence doesn't break any logic
- Confirm that each program in the new dropdown structure still corresponds to a valid Salesforce Program ID behind the scenes
- Use the Program Alignments data we have to verify we haven't missed any active program in the new categories

Essentially, the backend will continue to receive: program name, program ID, and all user info as before, just with a cleaned-up field set. We might need to adjust how the form submits if we change the order of fields, but those are minor front-end tweaks – the API endpoint and payload format will remain the same unless there's a need to add a field (e.g., adding a `MilitaryStatus` field).

### Lead API & CRM Integration
The existing integration with Salesforce (via the Lead API) remains in scope but not substantially changed. We are not overhauling the CRM or switching APIs – we will use the same endpoint to post lead data. 

**However, part of the project will be verifying that new fields are captured and passed through:**

**Military Question Response:**
- The Lead API currently expects certain fields (as seen in the CSV mapping)
- We will include the military question response in the payload (ensuring Salesforce has a field for it, possibly a checkbox or picklist indicating military affiliation)
- This field was already planned to be kept for "military messaging" purposes, so presumably the CRM has a place for it

**Field Removal:**
- The removal of fields like "Degree Level" (which was just descriptive) will simplify the payload
- We should double-check if the Lead API or Salesforce was using that field at all
- Given it was marked "Delete" and noted as repetitive, it's likely safe to drop

**Lead Routing:**
- No changes to lead routing logic are planned in this phase
- For example, if Salesforce uses Program ID to route leads to counselors, that will continue as is
- We just need to ensure our form supplies the correct Program ID for each selection
- One thing to confirm: if we introduce new categories, does that affect any downstream logic? It shouldn't, since category is not typically sent to CRM – only the specific program and maybe source info are sent

**Email Integration:**
- Integration with marketing automation or email systems (like if an autoresponder email is sent on form submission) should be checked but is presumed to continue working since we're not changing form submission mechanics, just the UI

### Out of Scope (for now)
This project is primarily about the form itself. The following are **NOT included:**

- Broader marketing site changes or content changes beyond the form's context (aside from possibly updating any "Request Info" CTAs site-wide to point to the new form)
- Improvements to the lead nurturing process (like what happens after the lead is submitted in Salesforce), though the expectation is that higher-quality data from the form will aid those efforts
- Complete rebrand or website redesign – we're fitting the new form into the existing site framework

**Summary:**
RFI 2.0's scope is to revamp the form's user flow and field structure (frontend), use the provided data mapping to adjust any backend field handling, and ensure the Salesforce integration continues smoothly. We will leverage Cursor for developing and testing these changes in a controlled environment (potentially running an A/B test with the current form if feasible, see Testing section).

---

## Design Considerations and Best Practices

The redesign will adhere to both UAGC's brand guidelines and UX best practices for web forms, especially those targeting prospective students. Key design considerations include:

### Visual Style & Brand Alignment
The form's look and feel should match UAGC's branding (colors, typography, button styles as defined in our brand guidelines). For instance, UAGC likely uses a specific blue/red palette and fonts that we must apply to form buttons, progress indicators, etc. 

We will ensure the Submit button and any progress bar or section headers use the approved styles. Moreover, any imagery or icons used (perhaps a small info icon or a lock icon for privacy reassurance) should be from UAGC's design assets. 

**Consistency builds trust** – users should feel the form is a seamless part of the official UAGC site. We'll also ensure that the tone of the form text (field labels, placeholder text, help text) aligns with UAGC's voice: professional, clear, and encouraging. If brand guidelines specify UX patterns (for example, how form errors are displayed or how focus states look), we will implement those as well.

### One Step at a Time
As noted, a multi-step approach will be used to avoid overwhelming users. Research shows that presenting many questions on one page can feel like an "interrogation," whereas a conversational, step-by-step approach keeps users engaged. 

We will design the form such that Step 1 and Step 2 each feel manageable (only 2-3 inputs in Step 1, and 5-6 in Step 2, rather than ~8-9 all at once). We will include a progress indicator or at least a **"Step 1 of 2"** label, so users know there's a second part. This sets proper expectations and reduces anxiety about unknown length. 

We must be careful not to add too many steps either – our plan is just two steps, which should be optimal for this use case.

### Minimal Necessary Fields
We will only ask for information that is truly needed at this stage (lead generation). **Every extra field is a potential drop-off point.** 

In fact, studies have confirmed that shorter forms have higher conversion, and it's often the complexity of fields (not just quantity) that hurts completion. For RFI 2.0, we have actually removed one field ("Degree Level") that was previously on the form, because it was redundant (the degree name implies the level). 

We will double-check if any other fields can be removed without loss of functionality. For example, we might consider if phone number is absolutely required or if making it optional would boost completions – however, phone is likely important for admissions outreach, so we'll keep it required for now, but ensure it's clearly formatted and labeled. 

We will avoid any open-ended or unnecessary questions; everything should have a purpose tied to lead qualification or routing.

### Dropdown Usability
The program selection interface is a critical element. To improve usability:

**Area of Interest Dropdown:**
- Will list categories that are relatively broad
- We will likely preface it with a label like "Choose an area of study…" to guide users
- Using categorization is supported by UX guidelines when dealing with many options
- This prevents the issue of a single gigantic list that's hard to browse

**Select Your Degree Field:**
- Will appear (or become enabled) once an area is chosen
- It might be implemented as either a dependent dropdown or potentially as a list of links or tiles if we want a more visual approach
- (At least initially, a dropdown is simpler and keeps the layout compact; in future iterations, we could consider a more visual selection interface for programs)

**Accessibility:**
- We must ensure keyboard accessibility for these dropdowns (users should be able to tab and use arrow keys or type to search within the dropdown)
- Also on desktop, a user might expect to start typing a program name to jump to it – we'll enable that if possible
- On mobile, the dropdown should be large enough and possibly use the device's native picker for easier scrolling

**Search Functionality:**
- If the list of programs under an area is long, we might incorporate a search input at the top of the "Select Your Degree" dropdown (some forms do this for long lists)
- However, since the area filter narrows it, it may be manageable without an extra search
- We can decide this based on how many programs each category has (from the alignment data, the largest category is Business with ~17 programs, which is not too bad to scroll)

**Interaction Design:**
- Nielsen Norman Group suggests avoiding "interacting menus" where choices appear/disappear unpredictably
- In our case, the interaction (populating programs after an area is picked) should be understandable if done right
- We'll likely gray out or disable the program field until an area is selected, with a placeholder text like "Select Area first" to set expectation
- Once an area is picked, the program field becomes active
- This way, users are less likely to be confused by changing options – it's a clear sequence

### Form Copy and Motivation
We will improve the wording around the form to motivate users to complete it. Rather than a generic header, we can include a concise value proposition. 

For example, a heading like **"Secure Your Future – Request Info Today"** can frame the form positively, emphasizing what the user gains. This aligns with marketing best practices: focus on the benefit to the user (e.g., "Learn about programs that fit your career goals"). 

We should also ensure that each field has user-friendly wording. Instead of just "Phone" we could say "Phone Number (so we can text/call you with info)" – but within brevity and compliance needs. The tone should remain encouraging and not too clinical. 

Any helper text (like format hints for phone, or why we ask for state – presumably to assign a counselor or provide state-specific info) can be provided to reduce any hesitation in filling out.

### Mobile-First and Responsive Design
Given the high mobile usage, the form will be designed mobile-first. This means:

**Layout:**
- A vertical layout that avoids side-by-side fields (on a phone, one column is best)
- Large touch-friendly buttons and inputs
- Dropdowns should be at least the full width of the screen for easy tapping

**Input Types:**
- Using HTML5 input types to bring up appropriate keyboards (e.g., telephone keyboard for the phone field, email keyboard for email)

**Performance:**
- Ensuring that form components are lightweight and load quickly on mobile networks
- We will minimize any heavy scripts
- If using any icons or images (like a secure lock icon or university logo), we'll optimize their size

**Testing:**
- We'll test on various screen sizes. The Cursor environment can help simulate mobile views
- We'll also test actual devices if possible
- The design will account for iOS/Android differences in how pickers are displayed

**Progress Indicators:**
- As a plus, we can consider adding a progress bar or step labels that are fixed at top even on mobile, so the user always knows where they are in the process

### Accessibility
The form should be accessible to users with disabilities. We will:

- Use proper HTML labels and aria tags for assistive technologies
- Ensure color contrast of text and backgrounds follows standards (this should be covered by brand guidelines if followed)
- Enable keyboard navigation, as mentioned
- Ensure error messages (when a field is left blank or format is wrong) are announced to screen readers and displayed in an obvious way (e.g., red text under the field with a clear message)

An accessible form not only widens our audience but often improves general usability (for example, clearly labeled fields and intuitive focus order help everyone).

### Privacy and Trust
We will include a short privacy reassurance, since users are entrusting us with personal contact info. 

Typically, a line of text near the submission button or in the consent can say **"Your information is secure and will be used only by UAGC for educational opportunities"** (if that aligns with our privacy policy). We might link to the full privacy policy. 

This can reduce user anxiety, which is one of the factors affecting conversion. Since we already have a consent checkbox that outlines contact methods (calls, texts, etc.), that likely covers some of this. We will ensure that text is visible (not tiny fine print) and written clearly. Users should not be surprised by being contacted – we explicitly get their agreement.

### Performance Considerations
The form's technical performance is a UX consideration too. We should make sure that when a user selects an Area of Interest, the program list appears quickly (either preloaded or fetched via a fast API). Any sluggishness could frustrate users. 

If using Cursor's test framework, we might simulate slow connections to ensure it's still okay. Additionally, the form will be embedded likely on multiple pages (e.g., a modal, a dedicated page, or a sticky sidebar form). We have a field indicating the form type (like "sticky desktop" in the data) which implies variations. We should verify our design works in all contexts (embedded in homepage vs a landing page, etc.).

### Content Personalization
Not a core part of this project, but worth noting: the `Partner ID` and `Partner Name` fields in our data suggest the form might sometimes be used on partner pages (e.g., corporate partnerships, military pages) where those are pre-filled. 

RFI 2.0 should not break that. We should ensure that if a user is on a partner-specific landing page, the form still captures those hidden fields. And if any text should change (for example, if on a military outreach page, maybe the form's header could say "Military Students, Request Info"), we allow for that in design. This maintains consistency with marketing campaigns.

---

## Market Research Insights

To ensure RFI 2.0 is cutting-edge, we looked at how other institutions and general lead-generation forms optimize conversion. Here are some relevant findings from the market and research literature:

### Emphasize Value Proposition
Many universities frame their RFI forms not just as forms, but as an opportunity for the student. Phrases like "Get Information on Advancing Your Career" or "Find the Right Degree for You" are commonly featured. 

This approach, as recommended in marketing research, focuses on what the visitor gains by filling out the form. We will do similarly by adding a compelling headline or subtext. This makes the form feel less like a chore and more like the first step in a positive journey.

### Conversion Benchmarks
We learned that average web form conversion rates (view to submit) in education are often in the 2-10% range for cold traffic, but once a user starts the form, about two-thirds complete it on average. 

The top-performing forms, however, can achieve much higher completion rates by optimizing UX. For instance, multi-step forms, as noted earlier, significantly outperform one-step forms. Our goal is to be among those top performers by implementing similar multi-step design and continuous A/B testing.

### Field Count vs. Lead Quality Trade-off
Removing fields can boost sheer quantity of leads, but one must monitor lead quality. Some organizations find that adding one or two qualifying questions (though it slightly lowers conversions) can dramatically improve lead quality, which results in better ROI. 

In our case, adding the "Military?" question is a conscious choice: it may add a tiny bit of friction, but it filters a segment that can be handled in specialized ways (for example, military benefits or credit for service can be highlighted in follow-up). 

Market research in higher ed indicates that tailoring the outreach to a student's background (like military status) improves engagement. Thus, we expect this to yield more qualified conversations. If we find it harms conversion too much, we could consider making it optional or moving it to a later interaction, but initial expectation is it's worth asking upfront.

### Use of Interactive Elements
Some modern forms use interactive or dynamic elements to keep users engaged (for instance, progress bars with encouraging messages, or changing the form questions into a more quiz-like format). 

We've noted that for younger audiences (Gen Z, etc.), interactive form experiences can hold attention better than static forms. While we might not gamify the RFI, we will at least use a friendly tone and possibly micro-interactions (like a checkmark animation when a step is completed) to give a sense of accomplishment. These small touches, as seen on various SaaS signup forms, can make a difference in perception.

### Competitor Forms
We reviewed how some competing institutions structure their inquiry forms:

**Southern New Hampshire University (SNHU):**
- Has a prominent "Request Information" form that pops up and asks for program of interest, then contact info
- SNHU highlights their popular programs (they've publicly stated their most popular online undergrad programs are Psychology, Business, and Computer Science) which suggests they might even pre-select those or list them first for ease

**University of Phoenix:**
- Uses a multi-step wizard where you first pick your degree level and field, then your personal info in subsequent steps

These examples reinforce that our plan for RFI 2.0 is in line with industry practice: breaking the form into logical pieces and guiding the user to select a program from an organized list. 

Where possible, we'll incorporate the best aspects of these examples – e.g., an initial question that's easy to answer (like "What do you want to study?") to hook the user, as Phoenix does, or an autofill suggestion for city/state when you type ZIP (if relevant).

### Technical Trends
Many institutions are now using analytics and form optimization tools (like Formsort, Zuko, etc.) to continually improve forms. These tools have taught the industry that tracking each field's drop-off is important. 

For instance, if a particular field has a high abandonment rate, consider removing or rephrasing it. We will adopt a similar data-driven mindset. Post-launch, we'll monitor if any step of RFI 2.0 underperforms. Market data suggests that even a follow-up email to incomplete form users can recapture ~19% of them, but our first goal is to make the form so smooth that few abandon in the first place.

### Design Guidelines for Long Lists
The Nielsen Norman Group (NN/g) and Baymard Institute have published guidance on handling large option sets in forms. A key takeaway is to "resist the temptation to include too many items" in one control and consider alternative presentations. 

Following this, our approach of splitting into category → sub-list is validated. Another guideline is to provide an alternative to dropdown if the list is very long – for example, a separate page or modal that allows searching/browsing in a more spacious interface. 

If our dropdown approach still proves cumbersome (perhaps some categories like "Business" have a long list of degrees), we have a backup idea: include a **"Browse all programs"** link that opens a modal with all programs and a search bar. This was a solution proposed in UX discussions for large selection lists. Initially, we may not need this complexity, but it's good to note as a future enhancement if user testing reveals difficulty in finding programs.

### Summary
Market research confirms our direction: a shorter, friendlier, multi-step form is likely to improve results. We are incorporating proven ideas (like emphasizing user benefits, using two-step segmentation, and designing mobile-first) that have worked for others. This research-backed approach gives us confidence that RFI 2.0 will not only match but hopefully exceed the performance of typical university inquiry forms.

---

## Implementation & Testing Plan

With the research and design strategy in place, the next phase is to implement RFI 2.0 and test it thoroughly using the Cursor platform.

### Development in Cursor
We will build the new form interface in Cursor, taking advantage of its capabilities to rapidly prototype and iterate. 

- All form HTML/CSS/JS will be developed according to the design specifications discussed
- We'll use the provided data mappings (possibly as JSON or CSV imports) to populate dropdown options and ensure correctness
- Cursor's environment will allow us to simulate the form submission to the Lead API (likely using a staging endpoint or a mocked API during testing)
- We should also create a feature flag or test URL where RFI 2.0 is live, so that it can run in parallel with the current form for testing

### Quality Assurance
Once built, we will conduct QA testing covering:

**Field Validations:**
- Ensure required fields indeed prevent submission if empty and show an appropriate error
- Test email format validation, phone number formatting, etc.

**Conditional Logic:**
- If "Area of Interest" = X triggers any conditional question (like RN license question for nursing), verify that appears correctly
- Also test the military question appears for all users (since it's universal, not conditional)

**Integration Check:**
- Use test submissions to confirm data is received in Salesforce (or at least hits the Lead API with the correct payload)
- Each field from the CSV mapping that is marked "Yes/Keep" should be present
- For example, verify the Program ID is sending the right code for the chosen program, verify the Vendor or source fields are set properly (they mention a "uagc-homegrown" vendor in the CSV – that likely should remain unchanged to attribute the source)

**Cross-browser/Device Testing:**
- Test the form on modern browsers (Chrome, Firefox, Safari, Edge) and on mobile devices (both Android Chrome and iOS Safari)
- Check that the form is usable and looks correct in each
- Cursor's preview and possibly automated tests can aid this, but manual testing on actual devices is recommended for things like the mobile keyboard behavior for inputs

**Accessibility Testing:**
- Use tools or browser plugins to verify color contrast and screen reader flow
- Navigate the form with a keyboard alone to ensure no traps

**Performance:**
- Measure page load and form load times
- If the form is on the main page, ensure it doesn't significantly slow down page load
- We might leverage lazy-loading (load the form script after main content) if needed

### A/B Testing
We plan to run an A/B test to truly measure RFI 2.0's impact. Using Cursor's testing framework or an external A/B testing tool, we will split traffic between the existing RFI form (control) and the new RFI 2.0 (variant). 

This will be done for a sufficient period (e.g., a few weeks or until statistically significant results) to account for different traffic sources and cycles.

**During the test, we will track:**
- **Form start rate** – Are as many people clicking "Request Info" and starting the form in both versions? A big drop here for the new form would indicate an issue with how it's triggered or perhaps users intimidated by the new flow
- **Form completion rate** – The primary metric; we expect to see a higher rate in the new form
- **Lead quality indicators** – Perhaps measured later, but we can look at short-term proxies like how many leads answered "yes" to military or provided phone numbers
- **User behavior differences** – Like maybe time on form is lower in new one, which is good as long as completion is up

We will also monitor qualitative feedback. For instance, admissions counselors might note if the leads coming in mention anything about the form ("Oh, the form was easy" or if there were any complaints). Additionally, if we have any session recording tool, a few recordings of users on each version could be insightful to observe any hiccups.

### Iteration
Based on A/B test results and feedback, we will iterate. If the new form underperforms in some aspect, we'll diagnose why. 

For example:
- If completion didn't improve, was there a new friction point introduced? (Maybe the two-step was confusing or the military question deterred some users.)
- We can then tweak the design – perhaps by making the military question optional or moving it to a later page after submission (e.g., "thank you, please answer a couple more questions…" approach) if truly necessary
- Or if we see mobile still lagging, we might simplify the mobile UI further (maybe split into 3 steps on mobile if needed to keep each very short, etc.)

The beauty of using Cursor and a testing mindset is we can continually optimize with small changes.

### Launch Plan
Once RFI 2.0 proves its merit (say it shows a clear increase in completion rate and no drop in lead volume or quality), we will roll it out 100% to all users. 

This likely involves:
- Replacing the old form includes on the website with the new code
- Documentation for the admissions/marketing team on what changed (fields, data flow) so they are aware
- Close monitoring after full launch to ensure things continue smoothly

### Documentation
We will maintain a README (this document can evolve into that) for the project that includes:

- The final list of fields and their mappings to CRM (essentially an updated version of the CSV in narrative form)
- Any new configuration (e.g., new picklist values in Salesforce for the added fields)
- Testing results and metrics
- How to revert to the old form in case of emergency (always have a rollback plan, even if unlikely to need it)

---

## Conclusion

By following this implementation and testing plan, we aim to deliver a robust RFI 2.0 that has been validated in real-world conditions before full deployment. 

The end result will be a comprehensive improvement to the prospective student's experience – making it easier for them to request information and for UAGC to capture and serve those leads effectively. 

Each decision in this project is backed by data or best practices, which gives us a high confidence in success. The combination of user behavior insights, market research, and rigorous testing forms a strong foundation for RFI 2.0 to meet its goals of:
- ✓ Higher completion rates
- ✓ Better quality leads
- ✓ A smoother path for future UAGC students

---

## Citations & Data Sources

1. Nielsen Norman Group – Guidelines on form dropdown usability
2. UX StackExchange – Discussion on form conversion vs. number of fields
3. Formsort (2023) – Statistics on form completion rates and device usage
4. AffordableCollegesOnline – Popular online degree fields (health, business, psychology)
5. Internal UAGC RFI field mapping – Indicating removed vs. kept fields (e.g., Degree Level removed, Military question kept)
6. ThinkOrion – Tip on highlighting what user gains (CTA messaging)
7. SNHU public info – Noted popular programs among their students

---

*Document Last Updated: October 31, 2025*