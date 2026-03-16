export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  category: string
  year: string
  role: string
  duration: string
  company: string
  team: string
  color: string
  accentColor: string
  thumbnail: string
  heroImage: string
  tags: string[]
  problem: string
  problemExpanded: string
  goals: { type: 'business' | 'user'; text: string }[]
  metrics: { label: string; value: string; description: string }[]
  researchInsights: { title: string; description: string; icon: string }[]
  processSteps: { phase: string; description: string; image?: string }[]
  features: { title: string; description: string; image?: string }[]
  decisions: { problem: string; solution: string; rationale: string }[]
  impact: { metric: string; value: string; change: string; positive: boolean }[]
  learnings: string[]
}

export const projects: Project[] = [
  {
    slug: 'meridian-banking',
    title: 'Meridian Banking',
    summary: 'Redesigning the core mobile banking experience for 2M+ users.',
    description:
      'A complete overhaul of Meridian Bank\'s mobile app—simplifying complex financial workflows into an intuitive, accessible experience that increased daily active usage by 34%.',
    category: 'Fintech · Mobile App',
    year: '2024',
    role: 'Lead Product Designer',
    duration: '8 months',
    company: 'Meridian Financial',
    team: '2 designers, 6 engineers, 1 PM',
    color: '#1A1A2E',
    accentColor: '#4A90D9',
    thumbnail: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    heroImage: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #020617 100%)',
    tags: ['Mobile Design', 'FinTech', 'iOS/Android', 'Design System'],
    problem:
      'Users were abandoning key financial tasks mid-flow due to cognitive overload.',
    problemExpanded:
      'Meridian\'s legacy mobile app had accumulated 7 years of feature additions without holistic design oversight. The information architecture was fragmented across 4 separate navigation systems, critical actions were buried 4–6 taps deep, and the app\'s accessibility score was critically low at 42/100. With a net promoter score of −8, the business was at risk of significant user churn to competitor apps.',
    goals: [
      { type: 'business', text: 'Increase daily active users by 20%' },
      { type: 'business', text: 'Reduce support call volume by 30%' },
      { type: 'business', text: 'Achieve App Store rating above 4.5★' },
      { type: 'user', text: 'Complete core transactions in under 3 taps' },
      { type: 'user', text: 'Understand account health at a glance' },
      { type: 'user', text: 'Trust that money transfers are secure and confirmed' },
    ],
    metrics: [
      { label: 'Target DAU increase', value: '+20%', description: 'Business KPI' },
      { label: 'Support volume reduction', value: '−30%', description: 'Operational goal' },
      { label: 'Accessibility target', value: 'AA', description: 'WCAG compliance' },
    ],
    researchInsights: [
      {
        title: 'Mental Model Mismatch',
        description:
          'Users think about money in terms of goals (save for a trip) not accounts (savings account #4421). The app spoke the bank\'s language, not theirs.',
        icon: '◎',
      },
      {
        title: 'Anxiety at Confirmation',
        description:
          'Eye-tracking studies showed users hovering on transfer confirmation screens for an average of 22 seconds—indicating low trust in the outcome.',
        icon: '◑',
      },
      {
        title: 'Hidden Value Features',
        description:
          '78% of users had never discovered the spending insights feature—one of the app\'s most powerful tools—because it required 5 taps to reach.',
        icon: '◐',
      },
    ],
    processSteps: [
      {
        phase: '01 — Discovery',
        description:
          'Conducted 24 contextual interviews, 3 diary studies over 2 weeks, and competitive analysis across 8 banking apps. Synthesized 340+ data points into 5 core user archetypes.',
      },
      {
        phase: '02 — Define',
        description:
          'Mapped the full journey for each archetype, identified 23 pain points, and prioritized a redesign scope targeting the top 8 high-impact, high-frequency flows.',
      },
      {
        phase: '03 — Ideate',
        description:
          'Ran 4 design sprints over 6 weeks. Produced 60+ concept sketches, narrowed to 3 architectural directions, and validated with 45-person usability study.',
      },
      {
        phase: '04 — Prototype',
        description:
          'Built high-fidelity interactive prototypes in Figma. Ran 3 rounds of moderated testing with 12 participants each, iterating between sessions.',
      },
      {
        phase: '05 — Deliver',
        description:
          'Produced 380 component specs, a comprehensive design system, and collaborated daily with engineering through a 16-week agile build.',
      },
    ],
    features: [
      {
        title: 'Goal-Based Home Dashboard',
        description:
          'The home screen now leads with financial goals—not account numbers. A single glance shows progress toward each goal with contextual nudges.',
      },
      {
        title: 'Instant Transfer with Confidence Layer',
        description:
          'Redesigned the transfer flow from 7 screens to 3, with a prominent confirmation animation that communicates success and security simultaneously.',
      },
      {
        title: 'Spending Pulse',
        description:
          'Surfaced spending insights directly on the home screen as a persistent, scannable module—no more hunting through nested menus.',
      },
      {
        title: 'Accessible by Default',
        description:
          'Every component was built to WCAG AA standards. Dynamic type, high-contrast modes, and voice-over optimization were core requirements, not afterthoughts.',
      },
    ],
    decisions: [
      {
        problem: 'Tab bar had 5 equal-weight items causing decision paralysis',
        solution: 'Reduced to 3 primary tabs with contextual bottom sheets for secondary actions',
        rationale:
          'Hick\'s Law: reducing choices directly reduces time-to-decision. Testing confirmed 40% faster task completion.',
      },
      {
        problem: 'Transaction history shown as a raw data table',
        solution: 'Intelligent grouping by merchant and goal with visual spending patterns',
        rationale:
          'Users don\'t care about raw data—they care about meaning. Grouping revealed patterns that raw lists obscured.',
      },
    ],
    impact: [
      { metric: 'Daily Active Users', value: '+34%', change: 'vs 20% target', positive: true },
      { metric: 'Support Call Volume', value: '−41%', change: 'vs 30% target', positive: true },
      { metric: 'App Store Rating', value: '4.8★', change: 'from 3.1★', positive: true },
      { metric: 'Task Completion Rate', value: '91%', change: 'from 67%', positive: true },
    ],
    learnings: [
      'The biggest design challenge wasn\'t the UI—it was organizational. Getting cross-functional alignment on a simplified IA required as much design work as the screens themselves.',
      'Accessibility improvements consistently improved usability for all users, not just those with disabilities. Designing for the margins improves the center.',
      'Shipping a v1 with intentional gaps was the right call. A focused, polished 70% beats a complete but mediocre 100%.',
    ],
  },
  {
    slug: 'solaris-design-system',
    title: 'Solaris Design System',
    summary: 'Building a scalable, token-based design system adopted by 40+ product teams.',
    description:
      'Solaris unified Helion\'s fragmented product suite—8 products, 3 platforms, 40+ teams—under a single, composable design language that cut design-to-dev handoff time by 60%.',
    category: 'Design Systems · SaaS',
    year: '2023',
    role: 'Design Systems Lead',
    duration: '6 months',
    company: 'Helion Software',
    team: '3 designers, 4 engineers, 1 PM, 1 content strategist',
    color: '#0D1B2A',
    accentColor: '#F4A261',
    thumbnail: 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
    heroImage: 'linear-gradient(135deg, #44403c 0%, #292524 50%, #1c1917 100%)',
    tags: ['Design Systems', 'Tokens', 'Component Library', 'Documentation'],
    problem:
      'Eight products had diverged into incompatible visual languages, creating a fractured user experience.',
    problemExpanded:
      'After a series of acquisitions, Helion operated 8 distinct SaaS products each with their own design language, component library, and no shared vocabulary. Engineers spent 40% of sprint time building one-off UI components. Designers couldn\'t move between products without learning a new visual system. Customers who used multiple Helion products experienced jarring context-switches. A design system was no longer optional—it was existential.',
    goals: [
      { type: 'business', text: 'Reduce UI component build time by 50%' },
      { type: 'business', text: 'Enable cross-product design consistency' },
      { type: 'business', text: 'Support all 8 products and 3 platforms' },
      { type: 'user', text: 'Consistent experience across all Helion products' },
      { type: 'user', text: 'Reduced cognitive load when switching products' },
      { type: 'user', text: 'Accessible across all product surfaces' },
    ],
    metrics: [
      { label: 'Handoff time reduction target', value: '−50%', description: 'Engineering velocity' },
      { label: 'Products to unify', value: '8', description: 'Product scope' },
      { label: 'Adoption target (year 1)', value: '80%', description: 'Team adoption' },
    ],
    researchInsights: [
      {
        title: 'The 80/20 Problem',
        description:
          '80% of product UIs were built from just 20% of component types. Identifying and prioritizing this core set was key to fast, high-impact adoption.',
        icon: '◎',
      },
      {
        title: 'Token Resistance',
        description:
          'Initial engineering resistance to design tokens dissolved when we showed a live demo of a theme switch—from light to dark to brand colors—in under 2 seconds.',
        icon: '◑',
      },
      {
        title: 'Documentation is the Product',
        description:
          'Teams that adopted Solaris quickly cited documentation quality as the primary reason. The system was only as good as its docs.',
        icon: '◐',
      },
    ],
    processSteps: [
      {
        phase: '01 — Audit',
        description:
          'Catalogued 1,200+ UI components across 8 products. Identified 240 unique patterns, 840 duplications, and 120 direct contradictions in visual language.',
      },
      {
        phase: '02 — Foundation',
        description:
          'Defined a semantic token architecture (Primitive → Semantic → Component tokens) covering color, typography, spacing, motion, and elevation.',
      },
      {
        phase: '03 — Core Components',
        description:
          'Built the 48 highest-frequency components first. Each component required 5 states, 3 sizes, dark/light mode, and full accessibility annotation.',
      },
      {
        phase: '04 — Documentation',
        description:
          'Wrote usage guidelines, do/don\'t examples, accessibility notes, and code snippets for every component. Launched internal documentation site.',
      },
      {
        phase: '05 — Adoption',
        description:
          'Embedded with 4 pilot teams for 8 weeks, gathering feedback and iterating rapidly. Published a public roadmap and held monthly office hours.',
      },
    ],
    features: [
      {
        title: '3-Tier Token Architecture',
        description:
          'Primitive tokens (raw values) → Semantic tokens (meaning) → Component tokens (usage). Changes cascade predictably without unintended side effects.',
      },
      {
        title: '48 Core Components',
        description:
          'Every component ships with full accessibility support, 5 interactive states, 3 size variants, and comprehensive Figma + React documentation.',
      },
      {
        title: 'Figma ↔ Code Sync',
        description:
          'Tokens are the single source of truth, flowing from Figma through a custom token pipeline to CSS variables and JS constants. No manual sync.',
      },
      {
        title: 'Living Documentation Site',
        description:
          'Interactive documentation built with the components themselves—so the docs are always accurate. Includes a component playground for exploration.',
      },
    ],
    decisions: [
      {
        problem: 'Teams wanted their brand colors in the system, creating infinite variants',
        solution: 'Semantic "brand slot" tokens that teams override at the application level',
        rationale:
          'The system provides the structure; teams provide the brand. This separation enabled genuine flexibility without system fragmentation.',
      },
      {
        problem: 'Engineering wanted CSS-only, design wanted Figma-first',
        solution: 'Token pipeline that generates both simultaneously from a JSON source of truth',
        rationale:
          'Neither side should own the system. JSON tokens are neutral—they compile to whatever consumers need.',
      },
    ],
    impact: [
      { metric: 'Handoff Time', value: '−62%', change: 'vs 50% target', positive: true },
      { metric: 'Team Adoption (Year 1)', value: '94%', change: 'vs 80% target', positive: true },
      { metric: 'UI Bug Reports', value: '−55%', change: 'consistency wins', positive: true },
      { metric: 'New Component Build Time', value: '−70%', change: 'from 2 days to 4 hours', positive: true },
    ],
    learnings: [
      'A design system is a product, and like all products, its success is defined by adoption, not existence. Marketing and community-building are as important as the system itself.',
      'Start with tokens, not components. The token architecture determines the ceiling of your system\'s scalability.',
      'The "contribution model" was the hardest problem. Eventually settled on a federated model: Solaris team owns foundations and core; product teams can propose and prototype new components via a structured RFC process.',
    ],
  },
  {
    slug: 'helio-health',
    title: 'Helio Health',
    summary: 'A patient-centered health portal that makes managing care feel human.',
    description:
      'Redesigned a clinical patient portal to reduce appointment no-shows by 28% and increase patient engagement with preventive care programs by 3×.',
    category: 'Healthcare · Web App',
    year: '2023',
    role: 'Senior Product Designer',
    duration: '4 months',
    company: 'Helio Health Systems',
    team: '2 designers, 5 engineers, 1 PM, 1 clinical advisor',
    color: '#0A2342',
    accentColor: '#2ECC71',
    thumbnail: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    heroImage: 'linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #042f2e 100%)',
    tags: ['Healthcare UX', 'Accessibility', 'Web App', 'Patient Experience'],
    problem:
      'Patients were disengaged from their own care because the portal spoke in clinical language.',
    problemExpanded:
      'Helio Health\'s patient portal was designed by and for clinical staff—not patients. Medical jargon filled every screen. Appointment scheduling required navigating a 9-step wizard. Test results appeared as raw lab values without context. The result was a 42% appointment no-show rate and essentially zero voluntary engagement with the preventive care features that could most improve patient outcomes.',
    goals: [
      { type: 'business', text: 'Reduce appointment no-shows by 25%' },
      { type: 'business', text: 'Increase preventive care program enrollment' },
      { type: 'business', text: 'Achieve HIPAA compliance and WCAG AA accessibility' },
      { type: 'user', text: 'Understand health information without medical training' },
      { type: 'user', text: 'Book appointments in under 2 minutes' },
      { type: 'user', text: 'Feel in control of their own health journey' },
    ],
    metrics: [
      { label: 'No-show reduction target', value: '−25%', description: 'Clinical KPI' },
      { label: 'Preventive program enrollment', value: '3×', description: 'Engagement goal' },
      { label: 'Accessibility', value: 'WCAG AA', description: 'Compliance requirement' },
    ],
    researchInsights: [
      {
        title: 'The Anxiety Spiral',
        description:
          'Patients who didn\'t understand test results reported elevated anxiety—and were less likely to follow up. Plain language summaries weren\'t just nice to have; they were clinical interventions.',
        icon: '◎',
      },
      {
        title: 'Scheduling as Gatekeeping',
        description:
          'The 9-step appointment wizard had a 68% abandonment rate. Most patients gave up at step 5 (insurance verification) and called the front desk instead—the most expensive channel.',
        icon: '◑',
      },
      {
        title: 'Trust Through Transparency',
        description:
          'Patients who could see their upcoming appointments, pending results, and care team members in a single view reported significantly higher trust scores.',
        icon: '◐',
      },
    ],
    processSteps: [
      {
        phase: '01 — Research',
        description:
          'Conducted 18 patient interviews across 3 demographic groups, shadowed 6 clinical staff sessions, and analyzed 12 months of portal usage data and abandonment events.',
      },
      {
        phase: '02 — Content Strategy',
        description:
          'Partnered with a health literacy specialist to rewrite 100% of user-facing copy. Reduced average reading level from Grade 14 to Grade 7 without losing clinical accuracy.',
      },
      {
        phase: '03 — Architecture',
        description:
          'Redesigned the information architecture around patient mental models (appointments, results, messages, profile) rather than clinical systems (EMR modules).',
      },
      {
        phase: '04 — Design & Test',
        description:
          'Three rounds of usability testing with 10 participants each. Special attention to older adults (65+) and low digital-literacy users who represented 40% of the patient population.',
      },
    ],
    features: [
      {
        title: 'Plain Language Results',
        description:
          'Lab results shown with a plain English summary, trend line, and "What this means for you" context—alongside the raw values for patients who want them.',
      },
      {
        title: '3-Step Appointment Booking',
        description:
          'Collapsed the 9-step wizard to 3 steps: Pick a reason → Choose a time → Confirm. Insurance is pre-filled from the patient\'s profile.',
      },
      {
        title: 'Care Dashboard',
        description:
          'A single screen showing upcoming appointments, outstanding results, active medications, and care team members. The "health at a glance" that patients had been asking for.',
      },
      {
        title: 'Smart Reminders',
        description:
          'Contextual reminders sent 48h and 2h before appointments, with one-tap rescheduling. Reduced no-shows before the reminder even reaches the redesigned portal.',
      },
    ],
    decisions: [
      {
        problem: 'Clinical team wanted to show all lab values; patients found it overwhelming',
        solution: 'Progressive disclosure: summary first, detail on demand',
        rationale:
          'Different users have different information needs. The design accommodates both without forcing clinical staff to dumb down the data.',
      },
      {
        problem: 'HIPAA requirements conflicted with our preferred frictionless login UX',
        solution: 'Biometric authentication (Face ID/Touch ID) as the default path, with MFA as fallback',
        rationale:
          'Security and convenience aren\'t opposites. Biometric auth is both more secure and more convenient than passwords for most users.',
      },
    ],
    impact: [
      { metric: 'Appointment No-Shows', value: '−28%', change: 'vs 25% target', positive: true },
      { metric: 'Preventive Enrollment', value: '+3.4×', change: 'vs 3× target', positive: true },
      { metric: 'Portal Session Length', value: '+180%', change: 'from 1.2 to 3.4 min avg', positive: true },
      { metric: 'Patient Satisfaction', value: '4.7/5', change: 'from 2.9/5', positive: true },
    ],
    learnings: [
      'Healthcare UX is where design stakes are highest. A confusing error message in a banking app costs money; in healthcare, it can cost health outcomes. That raised my bar permanently.',
      'Content strategy is UX. The most impactful change in this project wasn\'t a layout change—it was rewriting 100 screens of medical jargon into plain English.',
      'Designing for accessibility in healthcare meant designing for everyone. The 65+ usability testing sessions surfaced insights that improved the experience for 35-year-olds too.',
    ],
  },
  {
    slug: 'apex-commerce',
    title: 'Apex Commerce',
    summary: 'Eliminating checkout friction to recover $12M in abandoned cart revenue.',
    description:
      'A data-driven redesign of Apex\'s checkout flow that increased conversion by 23% and recovered $12M in annual cart abandonment revenue through surgical UX improvements.',
    category: 'E-commerce · UX Optimization',
    year: '2022',
    role: 'Product Designer',
    duration: '3 months',
    company: 'Apex Retail Group',
    team: '1 designer (me), 3 engineers, 1 PM, 1 data analyst',
    color: '#1A0A2E',
    accentColor: '#E74C3C',
    thumbnail: 'linear-gradient(135deg, #4c1d95 0%, #1e0a3c 100%)',
    heroImage: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 50%, #1e0a3c 100%)',
    tags: ['E-commerce', 'Conversion Optimization', 'A/B Testing', 'Data-Driven Design'],
    problem:
      'A 71% cart abandonment rate was costing Apex $17M annually in recoverable revenue.',
    problemExpanded:
      'Apex\'s checkout had been patched incrementally for 4 years. The result was a 7-step checkout requiring account creation before purchase, 3 different forms for address entry, and a payment page that looked different from the rest of the site—triggering security anxiety at the worst possible moment. Funnel analysis pinpointed exactly where users dropped: 38% at the account creation gate, 22% at address entry, and 11% at payment confirmation.',
    goals: [
      { type: 'business', text: 'Increase checkout conversion by 15%' },
      { type: 'business', text: 'Recover at least $8M in lost annual revenue' },
      { type: 'business', text: 'Reduce checkout time to under 90 seconds' },
      { type: 'user', text: 'Complete purchase without forced account creation' },
      { type: 'user', text: 'Trust that payment data is secure' },
      { type: 'user', text: 'Never lose a filled form to a page error' },
    ],
    metrics: [
      { label: 'Conversion improvement target', value: '+15%', description: 'Revenue KPI' },
      { label: 'Revenue recovery target', value: '$8M', description: 'Annual impact' },
      { label: 'Target checkout time', value: '< 90s', description: 'Speed goal' },
    ],
    researchInsights: [
      {
        title: 'The Account Wall',
        description:
          'Requiring account creation before purchase was the single highest-impact problem. 38% of abandoners left at exactly this point. Guest checkout was the #1 requested feature.',
        icon: '◎',
      },
      {
        title: 'Security Theater',
        description:
          'The payment page visual inconsistency wasn\'t just ugly—it triggered legitimate security concerns. 67% of surveyed abandoners cited "didn\'t feel secure" when asked why they left at payment.',
        icon: '◑',
      },
      {
        title: 'Form Fatigue',
        description:
          'Address entry required 8 fields across 3 forms. Auto-complete was disabled. Mobile users on small keyboards were typing their address 3 times across the flow.',
        icon: '◐',
      },
    ],
    processSteps: [
      {
        phase: '01 — Data Analysis',
        description:
          'Analyzed 90 days of funnel data, session recordings, and exit surveys across 2.3M checkout sessions. Built a quantified drop-off map that assigned dollar values to each friction point.',
      },
      {
        phase: '02 — Quick Wins',
        description:
          'Identified 6 low-effort, high-impact changes (guest checkout, address autocomplete, visual consistency) that could ship in 2 weeks as a fast-track experiment.',
      },
      {
        phase: '03 — Redesign',
        description:
          'Full checkout redesign: consolidated to 3 logical steps, added progress indicator, unified visual design with the rest of the site, and implemented smart defaults throughout.',
      },
      {
        phase: '04 — A/B Testing',
        description:
          'Ran sequential A/B tests: quick wins first (validated +14% conversion in week 1), then full redesign (additional +9%). Total: +23% conversion uplift validated.',
      },
    ],
    features: [
      {
        title: 'Guest Checkout as Default',
        description:
          'Account creation moved to the post-purchase thank you screen—where it converts at 3× the pre-purchase rate, with the benefit of "your order is in, want to track it?" as the hook.',
      },
      {
        title: 'Single-Page Checkout',
        description:
          'All 7 steps collapsed into a single, progressively revealed page. Progress is visible. No surprise new pages. No lost form state on back-button.',
      },
      {
        title: 'Smart Address Entry',
        description:
          'Google Places autocomplete fills the full address from a partial entry. Billing address defaults to shipping with a single checkbox. 3 forms became 1.',
      },
      {
        title: 'Trust Signals at Payment',
        description:
          'Security badge, accepted payment methods, and "256-bit encryption" messaging integrated directly into the payment form—not as footer afterthoughts.',
      },
    ],
    decisions: [
      {
        problem: 'Marketing wanted account creation required (for CRM data)',
        solution: 'Post-purchase account creation with order tracking as the incentive',
        rationale:
          'A completed purchase and a post-purchase account converts better than a forced pre-purchase wall. Marketing gets more accounts, and users get a frictionless checkout.',
      },
      {
        problem: 'Engineering wanted multi-page checkout (simpler to build)',
        solution: 'Single-page with async validation—required engineering investment but was non-negotiable',
        rationale:
          'The data was unambiguous: every page transition was a drop-off opportunity. The ROI on a more complex build was $12M annually.',
      },
    ],
    impact: [
      { metric: 'Checkout Conversion', value: '+23%', change: 'vs 15% target', positive: true },
      { metric: 'Annual Revenue Recovered', value: '$12M', change: 'vs $8M target', positive: true },
      { metric: 'Average Checkout Time', value: '67 seconds', change: 'from 4 min 12 sec', positive: true },
      { metric: 'Cart Abandonment Rate', value: '54%', change: 'from 71%', positive: true },
    ],
    learnings: [
      'Quantifying UX problems in dollar terms is the fastest path to organizational alignment. "The account creation wall costs us $6.5M annually" ends the debate faster than any UX rationale.',
      'The quick wins / full redesign sequencing was strategically important. Fast early wins built organizational trust and funded the patience needed for the bigger redesign.',
      'A/B testing is how you prove impact, not how you discover problems. The problems were clear from qualitative research. Testing just validated the solutions.',
    ],
  },
]

export type Experience = {
  company: string
  role: string
  duration: string
  period: string
  description: string
  details: string[]
  logo: string
}

export const experiences: Experience[] = [
  {
    company: 'Stripe',
    role: 'Senior Product Designer',
    duration: '2 years',
    period: 'Jan 2022 — Present',
    description:
      'Leading design for Stripe\'s merchant dashboard—the primary surface for 500K+ businesses managing billions in payment volume.',
    details: [
      'Redesigned the Stripe Dashboard\'s core analytics experience, increasing feature adoption by 41%',
      'Led the design of Stripe Tax, a new product line that reached $10M ARR in its first year',
      'Established design review culture and mentored 3 junior designers',
      'Collaborated with Research, Engineering, and Product to build a unified design language for Stripe\'s merchant surfaces',
    ],
    logo: 'S',
  },
  {
    company: 'Airbnb',
    role: 'Product Designer',
    duration: '2 years',
    period: 'Mar 2020 — Dec 2021',
    description:
      'Designed host tools and guest discovery features for one of the world\'s most beloved consumer products.',
    details: [
      'Redesigned the Host Dashboard, improving host satisfaction scores by 28% in post-launch surveys',
      'Led the "Flexible Dates" search feature from 0→1, which contributed to a 15% increase in search-to-booking conversion',
      'Designed and shipped 12 A/B tests with a combined positive impact across key conversion metrics',
      'Partnered closely with the Airbnb Design Language System team to contribute 8 new components',
    ],
    logo: 'A',
  },
  {
    company: 'Google',
    role: 'UX Designer',
    duration: '2 years',
    period: 'Jul 2018 — Feb 2020',
    description:
      'Part of the Google Pay team, designing payment and financial experiences reaching hundreds of millions of users globally.',
    details: [
      'Designed the Google Pay transaction history redesign, shipped to 180M+ users',
      'Led accessibility audit and improvements across the Google Pay Android app',
      'Contributed to the Material Design 3 guidelines for financial applications',
      'Collaborated with teams in San Francisco, London, and Singapore on cross-platform feature consistency',
    ],
    logo: 'G',
  },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  avatar: string
  avatarColor: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Alex consistently delivers work that balances aesthetic excellence with functional clarity. On the Meridian project, they didn\'t just redesign screens—they transformed how our entire product team thinks about users. The 34% DAU increase speaks for itself, but the cultural change in how we build is the lasting impact.',
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'Meridian Financial',
    avatar: 'SC',
    avatarColor: 'bg-slate-700',
  },
  {
    quote:
      'Working with Alex on Solaris was the best design collaboration I\'ve experienced in 10 years of engineering. They have a rare ability to translate abstract design principles into concrete, implementable decisions. The token architecture they defined has fundamentally changed how fast our teams ship.',
    name: 'Marcus Rivera',
    role: 'Principal Engineer',
    company: 'Helion Software',
    avatar: 'MR',
    avatarColor: 'bg-stone-700',
  },
  {
    quote:
      'Alex has an exceptional ability to translate complex user needs into elegant solutions. What impressed me most was how they handled the competing priorities of clinical accuracy and plain language in the Helio Health project. The result didn\'t compromise on either—it achieved both.',
    name: 'Dr. Priya Patel',
    role: 'Chief Medical Officer',
    company: 'Helio Health Systems',
    avatar: 'PP',
    avatarColor: 'bg-teal-700',
  },
  {
    quote:
      'I\'ve worked with many designers who are great at craft but struggle with the business side. Alex speaks both languages fluently. They quantified our checkout problem in dollars before touching Figma, which gave us the executive buy-in to do the work properly. That\'s rare.',
    name: 'Jordan Lee',
    role: 'CEO',
    company: 'Apex Retail Group',
    avatar: 'JL',
    avatarColor: 'bg-purple-700',
  },
  {
    quote:
      'Alex was the design lead I always wished I had access to earlier in my career. They make the work look effortless, but what\'s visible is just the surface of their process. The thinking, the research, the iteration—it\'s remarkably rigorous. I\'d work with them again without hesitation.',
    name: 'Yuna Kim',
    role: 'Product Manager',
    company: 'Stripe',
    avatar: 'YK',
    avatarColor: 'bg-indigo-700',
  },
]

export type MotionVideo = {
  id: string
  title: string
  category: string
  description: string
  duration: string
  color: string
}

export const motionVideos: MotionVideo[] = [
  {
    id: 'motion-01',
    title: 'Dashboard Transition System',
    category: 'UI Motion',
    description: 'A cohesive motion language for complex data dashboard transitions—fade, slide, and scale choreography.',
    duration: '0:45',
    color: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
  },
  {
    id: 'motion-02',
    title: 'Onboarding Flow Animation',
    category: 'Product Animation',
    description: 'Animated onboarding sequence using staggered reveals and morphing illustrations to guide new users.',
    duration: '1:20',
    color: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  },
  {
    id: 'motion-03',
    title: 'Micro-interaction Library',
    category: 'Microinteractions',
    description: 'A collection of 30+ micro-interactions: button states, loading indicators, success confirmations.',
    duration: '2:10',
    color: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    id: 'motion-04',
    title: 'Brand Identity Motion',
    category: 'Brand Motion',
    description: 'Logo animations and brand motion guidelines for a fintech startup—kinetic identity system.',
    duration: '0:55',
    color: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
  },
  {
    id: 'motion-05',
    title: 'Data Visualization Reveals',
    category: 'Data Animation',
    description: 'Animated chart and graph reveals with staggered bar/line animations for a financial dashboard.',
    duration: '1:35',
    color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  {
    id: 'motion-06',
    title: 'Mobile Navigation Patterns',
    category: 'UI Motion',
    description: 'iOS and Android navigation transition patterns—swipe, spring, and inertia-based interactions.',
    duration: '0:50',
    color: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  },
]

export const personalPhotos = [
  {
    id: 'photo-01',
    caption: 'Kyoto, Japan — 2023',
    color: 'from-orange-100 to-orange-200',
    textColor: 'text-orange-900',
  },
  {
    id: 'photo-02',
    caption: 'Hiking in Patagonia — 2022',
    color: 'from-sky-100 to-sky-200',
    textColor: 'text-sky-900',
  },
  {
    id: 'photo-03',
    caption: 'Design studio, SF — 2024',
    color: 'from-neutral-100 to-neutral-200',
    textColor: 'text-neutral-900',
  },
  {
    id: 'photo-04',
    caption: 'Amalfi Coast — 2023',
    color: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-900',
  },
  {
    id: 'photo-05',
    caption: 'Ceramics class — 2024',
    color: 'from-amber-100 to-amber-200',
    textColor: 'text-amber-900',
  },
]
