UAGC RFI 2.0 Implementation & Competitive Analysis

Introduction

The Request for Information (RFI) form on the University of Arizona Global Campus (UAGC) website is the first point of contact for many prospective students. It collects leads for admissions, helps visitors find programs and builds credibility. However, the current form suffers from high drop‑off rates, long completion times and poor mobile usability. Additionally, UAGC recently reorganised its academic offerings into two new colleges—the College of Integrated Learning and the College of Professional Advancement—making it necessary to rethink how programs are presented.

This report combines insights from our market research, the existing RFI 2.0 implementation report, and a competitive analysis of peer universities. Sections on internal revenue projections, detailed Salesforce field mapping, Google Analytics configurations and campaign tracking have been omitted to focus on user experience and external benchmarks.

Current Challenges

User behaviour & pain points

Analysis of the current RFI revealed several friction points:
	•	Low completion rate: The form converts about half of visitors, below the education‑industry benchmark of ~66 %. Many users abandon the form during program selection, where they are confronted with a long, unsorted list of degrees.
	•	Mobile friction: Mobile users complete the form at significantly lower rates than desktop users and spend roughly a minute longer searching for a program. Tapping small dropdowns and scrolling through long lists on a phone is cumbersome.
	•	Information overload: Users see many fields at once, causing confusion and anxiety. Our user testing highlighted comments like “I can’t tell if this is a legitimate university” and “There’s so much text, I don’t know where to start,” indicating a lack of clarity and trust.
	•	Vague program hierarchy: Programs aren’t clearly grouped; undergraduate and graduate degrees appear together, and some programs don’t fit neatly into existing “Areas of Interest,” leaving users unsure where to look.

Data quality & lead routing

Because the existing RFI doesn’t ask for degree level or other qualifying questions until late in the process, many leads arrive incomplete. Admissions teams must follow up to determine whether a prospect is seeking an associate’s, bachelor’s or master’s degree. Military status and RN licensing are not collected, making it harder to route leads to the right counselors.

These challenges underscored the need for a simplified, two‑step form that collects key qualifying data up front and guides users through program selection.

Research‑backed design principles

Our redesign draws on best practices from form design literature and market data:
	•	Multi‑step forms convert better: Breaking a long form into smaller steps reduces cognitive load and increases completion. Studies show multi‑step forms can convert 86 % higher than single‑page forms【23†L246-L251】.
	•	Filtering by degree level: Users struggle with lists over ten items; a level‑first filter improves selection speed by roughly 37 % and cuts the program list in half【20†L277-L285】.
	•	Mobile‑first design: More than half of RFI visitors use mobile devices. The form must use a vertical layout, large tap targets, appropriate HTML5 input types and fast load times to succeed.
	•	Qualifying questions: Including optional questions—such as military affiliation or RN license status—helps admissions staff route leads and tailor follow‑up communications. Competitors consistently ask for military status and program‑specific qualifications.
	•	Clear value proposition and trust signals: Successful forms emphasise what users gain (e.g., personalised program information, scholarship guidance) and reassure them that data is secure【4†L5-L8】.

Competitive analysis

To benchmark UAGC’s RFI against industry peers, we examined request‑information forms at Southern New Hampshire University (SNHU), Western Governors University (WGU), Walden University and Purdue University Global. These institutions were chosen for their large online portfolios and reputation for strong digital recruitment.

Southern New Hampshire University (SNHU)

SNHU’s request‑information form is hosted on inquiry.wgu.edu but branded for SNHU and asks visitors to complete several fields in one step. The form begins by asking “How would you like to attend?” followed by “Select a Degree Level,” “Select an Area of Study” and “Select a Program.” After program details, users enter personal contact information (first name, last name, phone, email, street address, city, state, ZIP) and must answer “Have you served in the U.S. Military or are you a military dependent?” by selecting “Yes” or “No.” The CTA button reads “Get Info”.

Key takeaways: SNHU uses a hierarchy of attendance type → degree level → area of study → specific program, ensuring users see only relevant programs. They also collect a full address and include a military question, which aids lead routing. All fields appear at once, which may contribute to cognitive load, but the step‑wise filter by level and area provides clarity.

Western Governors University (WGU)

WGU’s inquiry form is a three‑step wizard. On the first step, users enter first name, last name and email, then select “Which college interests you the most?” from a dropdown listing WGU’s colleges (e.g., Business, Teaching, Health & Nursing). A “Next step” button (labeled “1 of 3”) advances to subsequent steps. Later steps collect additional details (not shown in the first step) before final submission.

Key takeaways: WGU prioritises ease of entry—only three fields appear initially—and segments users by college rather than program. The multi‑step flow reduces perceived effort and builds momentum. WGU also includes explicit consent language and offers a direct phone contact (866‑225‑5948) at the top for users who prefer to speak with an advisor.

Walden University (waldenu.edu)

Walden’s request‑info page uses an embedded form that appears after the programme listings. It first asks users to choose a Degree Type from options such as Doctoral Degrees, Master’s Degrees, Bachelor’s Degrees, Education Specialist, Certificate Programs or Non‑Degree Options ￼. Next, users select an Area of Study (e.g., Business & Management, Counseling, Criminal Justice, Education, Health & Health Sciences, Information Technology, Nursing, Psychology, Public Policy & Administration, Social Work & Human Services) ￼. A Program dropdown populates based on the previous selections, offering dozens of specific degrees and certificates ￼. Finally, the form collects First Name, Last Name, Phone Number, Email and asks whether the user or their spouse is an active or retired U.S. military service member ￼. Nursing applicants are also prompted with “Do you have an ADN or will you graduate soon?” to determine RN status ￼.

Key takeaways: Walden’s form is comprehensive yet structured. It uses a level‑first filter (degree type), then area, then program. The military and nursing questions are conditional qualifiers. Consent language emphasises that users agree to receive calls, emails and texts, and provides a phone number for those who wish to request information without consenting ￼.

Purdue University Global (purdueglobal.edu)

Purdue Global’s request‑info form begins with an Area of Study menu listing categories such as Aviation, Business, Communication, Criminal Justice, Education, Fire and Emergency Management, Health Sciences, Human Services, Information Technology, Law Programs, Legal Studies, Nursing, Professional Studies, Psychology and Applied Behaviour Analysis, Public Policy and Special Military Programs ￼. Users then select a Degree and a Program of Study ￼. After program selection, the form requests first name, last name, email and phone and asks “How soon are you looking to start your degree?” with choices ranging from “ASAP to 30 days” to “3+ months” or “Not sure” ￼. A checkbox lets users indicate if they, their spouse or their parents are active duty, reservists or veterans of the U.S. Military ￼. Clicking “NEXT” submits the first part and triggers a consent popup explaining that Purdue Global and Kaplan North America may contact them via various channels ￼.

Key takeaways: Purdue Global organises programs by area of study and degree, then gathers contact information. They include a start‑time question to gauge enrollment urgency and a military‑affiliation checkbox. The form emphasises compliance with consent laws and offers alternative phone contact for those who do not wish to opt in ￼.

Synthesis of competitor best practices

The competitor analysis reveals common patterns:
	1.	Hierarchical selection: All competitors filter programs through two or three levels—typically Degree Level or Area of Study first, followed by a specific program. This approach shortens lists and guides users.
	2.	Multi‑step or progressive disclosure: WGU and Purdue Global break the form into steps, while SNHU and Walden display all fields but maintain a logical order. Multi‑step flows reduce cognitive load and allow early capture of basic contact info.
	3.	Targeted qualifying questions: Each form asks segment‑specific questions—military affiliation (SNHU, Walden, Purdue), RN license (Walden) or college interest (WGU). These qualifiers improve lead routing and tailor follow‑ups.
	4.	Consent and trust messaging: Clear statements about privacy, opt‑out options and the fact that consent is not required for enrollment appear in all forms ￼ ￼.
	5.	Mobile‑friendly design: Though not visible in static code, competitor forms employ large fields and responsive layouts. WGU uses a full‑width, mobile‑optimised vertical layout with large tap targets.

These best practices informed our RFI 2.0 design decisions.

Recommended RFI 2.0 design

Based on user feedback, form‑design research and the competitor study, UAGC’s new RFI should adopt the following structure:

Step 1 – Program selection
	1.	Degree Level: A simple radio or dropdown with Undergraduate, Graduate (and optionally Certificate).
	2.	Area of Study: After level is selected, display a curated list of disciplines appropriate to that level—e.g., Business, Education, Health & Human Services, Psychology, Criminal Justice, Liberal Arts, Science & Math.
	3.	Specific Program: Populate this dropdown dynamically based on the chosen level and area. This prevents users from wading through a 70‑program list and mirrors competitor filtering strategies.
	4.	Conditional questions: Display the “Are you currently a licensed RN?” question only when a nursing program is selected【46†L17-L20】. Include a universal military affiliation question (“Are you a member of the U.S. Military, a veteran or a military dependent?”) as SNHU, Walden and Purdue Global do ￼ ￼.

Step 2 – Personal information
	1.	First Name and Last Name
	2.	Email (with validation)
	3.	Phone (with phone‑number formatting)
	4.	State of residence (for regulatory compliance and regional advising)
	5.	Consent checkbox with clear TCPA language, similar to competitor forms ￼

Design considerations
	1.	Multi‑step wizard: Break the form into two pages with a progress indicator (“Step 1 of 2”). This reduces cognitive load and aligns with WGU’s three‑step design.
	2.	Mobile‑first layout: Use a single column, generous spacing and large buttons to improve mobile completion. Input fields should use proper HTML5 types (email, tel).
	3.	Clear value proposition: Include a short headline (“Get information about your future”) and bullet points highlighting online flexibility, transfer credit acceptance, military friendliness and quick start dates, as competitor forms do.
	4.	Trust badges: Display accreditation (e.g., WSCUC logo) and a privacy notice near the form to increase legitimacy. Competitors emphasise security and accreditation to build trust.
	5.	Tailored follow‑up: Capture degree level and program early so admissions teams can assign leads to the right counselors and tailor automated emails. Military and RN qualifiers enable specialised support.

Success metrics and testing

To validate the new form, UAGC will measure:
	•	Completion rate: Aim to improve overall form completion to 60 % or higher. A/B test the new multi‑step design against the current single‑page form.
	•	Time to submit: Target a reduction from ~4 minutes to under 2 minutes. Measure time from form start to submission on both mobile and desktop.
	•	Lead quality: Monitor downstream metrics (inquiry‑to‑application and application‑to‑enrollment rates) to ensure more qualified leads. Check the percentage of leads with complete contact data and program details.
	•	Mobile vs. desktop performance: Track device‑specific conversion rates. A successful mobile redesign should narrow the gap between mobile and desktop completions.

Conclusion

The RFI 2.0 project aims to modernise UAGC’s lead‑generation funnel by aligning with user expectations, industry best practices and competitor innovations. Our research shows that prospective students respond better to forms that:
  • Use multi‑step, progressive disclosure to reduce cognitive load;
  • Ask for degree level and filter programs accordingly;
  • Collect qualifying data like military status or professional licensure;
  • Provide clear value propositions and trust indicators;
  • Optimise for mobile users.

Competitor analysis confirms these trends. SNHU filters by attendance type, degree level and area of study before asking for personal details. WGU’s three‑step wizard captures essential information incrementally. Walden and Purdue Global both require users to pick a degree level, an area of study and a specific program ￼ ￼, while also asking targeted questions such as military affiliation and RN status ￼ ￼. By adopting similar strategies—and simplifying program selection to Graduate versus Undergraduate first—UAGC can significantly improve the user experience, increase completion rates and deliver higher‑quality leads.