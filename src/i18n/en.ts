import type { Translations } from "./types";

export type { Translations };

export const en: Translations = {
  // Header
  header: {
    logo: "Smithers",
    nav: {
      services: "Services",
      stack: "Stack",
      how: "How it works",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: "Book a call",
    langSwitcher: "EN / FR",
  },

  // Hero
  hero: {
    eyebrow: "Est. Montreal",
    h1Pre: "Operations and automation for small businesses that have",
    h1Em: "outgrown duct tape.",
    sub: "We untangle the CRMs, spreadsheets, and Zapier flows your team relies on, and ship systems that quietly work.",
    ctaBook: "Book a call",
    ctaHow: "See how we work",
  },

  // Logo strip
  logoStrip: {
    label: "Industries we ship in",
    chips: [
      "Professional services",
      "E-commerce",
      "Healthcare",
      "Real estate",
      "Trades",
      "SaaS & tech",
    ],
  },

  // Problem
  problem: {
    sectionTitle: "Sound familiar?",
    intro:
      "The same six problems show up in nearly every small business we meet. None of them are catastrophic on their own. Together, they quietly cost you weeks every year.",
    pains: [
      "A CRM nobody updates",
      "14 spreadsheets that should be one database",
      "Zapier flows held together by hope",
      "Reports that take 3 hours and tell you nothing",
      "Onboarding that depends on one person's memory",
      "“We should really do something with AI,” sitting on a Post-it",
    ],
  },

  // Marquee
  marquee: {
    items: [
      "A CRM nobody updates",
      "14 spreadsheets that should be one database",
      "Zapier flows held together by hope",
      "Reports that take 3 hours and tell you nothing",
      "Onboarding that depends on one person's memory",
      "“We should really do something with AI” on a Post-it",
    ],
  },

  // Services
  services: {
    sectionTitle: "How we work with you",
    intro:
      "Three engagement shapes. Pick the one that fits the work, or start small and grow into the next.",
    priceCaption: "All prices CAD. Discovery call is free.",
    tiers: [
      {
        name: "Requests",
        tagline: "Small, well-scoped fixes.",
        priceFrom: "From $150 CAD/hr · Pay only for time used",
        body: "For when something specific is broken or missing: a stuck automation, a data cleanup, a quick report. You send the request, we scope it tight, and we ship within hours or days.",
        outcomes: [
          "Bug fixes in your existing tools",
          "Small automations",
          "Data cleanup and migrations",
          "Ad-hoc reports",
        ],
        typical: "Hours to a few days",
      },
      {
        name: "Missions",
        tagline: "Defined projects with a clear outcome.",
        priceFrom: "$5,000-$50,000 CAD · Fixed price, written scope",
        body: "Bigger work that needs scoping, design, and rollout. You get a Mission Overview before we start so you know exactly what you're paying for.",
        outcomes: [
          "CRM rebuilds",
          "End-to-end automation",
          "Custom internal tools",
          "AI workflows that actually ship",
        ],
        typical: "2-8 weeks",
      },
      {
        name: "Advisory & Support",
        tagline: "A second opinion on speed dial.",
        priceFrom: "From $2,000 CAD/mo · Cancel anytime",
        body: "Ongoing strategy, troubleshooting, and sanity checks over Slack, email, or video. For founders who want a sharp operator in their corner without hiring one.",
        outcomes: [
          "Strategic guidance",
          "Tool selection and architecture review",
          "Vendor and hire vetting",
          "On-call troubleshooting",
        ],
        typical: "Monthly retainer",
      },
    ],
  },

  // Stack
  stack: {
    sectionTitle: "The stack we know",
    intro:
      "We work fluently with the platforms small businesses already rely on, and we build custom when off-the-shelf doesn’t fit.",
    footer:
      "Already on a stack we don’t list? Send it over: most platforms speak the same APIs, and we’ve probably touched it.",
  },

  // How it works
  how: {
    sectionTitle: "How it works",
    steps: [
      { t: "Intro call", d: "30 minutes. We listen, you vent." },
      {
        t: "Diagnosis",
        d: "We map what you have, what’s broken, and what’s worth fixing first.",
      },
      {
        t: "Proposal",
        d: "A short Mission Overview with scope, price, and timeline. No surprises.",
      },
      {
        t: "Build & handoff",
        d: "We ship, document, and train your team so the system survives us leaving.",
      },
    ],
  },

  // Case Studies
  caseStudies: {
    sectionTitle: "Work that shipped",
    intro:
      "Small businesses across Canada, typically 5-50 people, often founder-led. Here’s what shipping looks like in practice.",
    beforeLabel: "Before",
    shippedLabel: "What we shipped",
    resultLabel: "Result",
    toolsLabel: "Tools used",
    ratingLabel: "Rated {n} out of 5",
    studies: [
      {
        client: "Bellwether Law",
        meta: "Professional services · 15 people",
        tier: "Mission",
        rating: 5,
        teaser: "Stopped doing the work that wasn't lawyering.",
        headline: "8 hrs/wk → 45 min/wk on intake",
        before:
          "Intake admin took partners 8 hours a week and leads slipped between Clio, email, and a shared spreadsheet.",
        shipped:
          "A Clio-first intake pipeline with Zapier triggers, an auto-generated conflicts check, and a single source-of-truth dashboard for the partner group.",
        metricPrimary: "−7.25 hrs/wk",
        metricPrimaryFrom: "8",
        metricPrimaryTo: "45 min",
        metricSecondary: "Zero leads lost in 6 months post-launch.",
        quote:
          "We stopped doing the work that wasn’t lawyering. The first month paid for the engagement.",
        attribution: {
          name: "Daniel Reyes",
          role: "Managing Partner",
          company: "Bellwether Law",
        },
        tools: ["Clio", "Zapier", "Google Sheets"],
      },
      {
        client: "North & Pine Goods",
        meta: "E-commerce (DTC) · 8 people",
        tier: "Mission + Advisory",
        rating: 5,
        teaser: "Returns from three days down to half a shift.",
        headline: "3 days → 4 hrs on returns",
        before:
          "Returns lived in a Gmail inbox, refunds got lost between Shopify and QuickBooks, and Klaviyo flows fired off stale customer data.",
        shipped:
          "Custom returns portal in Retool over Supabase, two-way Shopify to QuickBooks sync, and rebuilt Klaviyo segments fed from clean customer records.",
        metricPrimary: "3 days → 4 hrs",
        metricPrimaryFrom: "3 days",
        metricPrimaryTo: "4 hrs",
        metricSecondary:
          "~$12,000/mo in refunds previously stuck in limbo, now closing within a business day.",
        quote:
          "I stopped manually moving money between systems. That alone was worth the rebuild.",
        attribution: {
          name: "Émilie Lavoie",
          role: "Founder",
          company: "North & Pine Goods",
        },
        tools: ["Retool", "Supabase", "Shopify", "QuickBooks", "Klaviyo"],
      },
      {
        client: "Coastline Physio",
        meta: "Healthcare (multi-clinic) · 30 people",
        tier: "Mission",
        rating: 5,
        teaser: "No-shows cut in half, an afternoon back per clinic.",
        headline: "No-shows: 22% → 9%",
        before:
          "No-shows were costing four figures a week. Front-desk staff spent mornings phoning patients with appointment reminders.",
        shipped:
          "Airtable scheduling layer with Twilio SMS reminders, intake-form pre-fill from prior visits, and a clinic-by-clinic no-show dashboard the director actually reads.",
        metricPrimary: "22% → 9%",
        metricPrimaryFrom: "22%",
        metricPrimaryTo: "9%",
        metricSecondary:
          "~$80,000/year in recovered appointment revenue across four clinics.",
        quote:
          "The reminders run themselves. My front desk got an afternoon back.",
        attribution: {
          name: "Dr. Anika Chen",
          role: "Clinical Director",
          company: "Coastline Physio",
        },
        tools: ["Airtable", "Twilio", "n8n"],
      },
      {
        client: "Meridian Commercial",
        meta: "Commercial real estate · 22 people",
        tier: "Mission + Advisory",
        rating: 5,
        teaser: "Agents stopped fighting the system and started using it.",
        headline: "Lead-to-tour: 5 days → 36 hrs",
        before:
          "Listings lived in a HubSpot bent into a shape it wasn’t meant for, plus three spreadsheets the agents argued about.",
        shipped:
          "HubSpot rebuilt around the actual brokerage workflow, plus a Retool + Supabase listing portal agents and clients both use. AI-assisted listing-description drafts on top.",
        metricPrimary: "5 days → 36 hrs",
        metricPrimaryFrom: "5 days",
        metricPrimaryTo: "36 hrs",
        metricSecondary:
          "Agents reclaiming ~6 hrs/wk of listing admin each.",
        quote:
          "Our agents stopped fighting the system and started using it. Pipeline visibility tripled.",
        attribution: {
          name: "James MacIntyre",
          role: "Principal",
          company: "Meridian Commercial",
        },
        tools: ["HubSpot", "Retool", "Supabase", "OpenAI"],
      },
    ],
  },

  // Team
  team: {
    sectionTitle: "The team",
    intro:
      "A small senior team. You’ll work directly with the people building your system, no account-manager handoffs.",
    members: [
      {
        initials: "ED",
        name: "Erico Di Teodoro",
        role: "Lead Strategist",
        specialty: "Diagnosis, scoping, and lead on every Mission.",
        tools: ["Strategy", "Mission scoping", "Architecture"],
      },
      {
        initials: "CT",
        name: "Camille Tremblay",
        role: "Automation Engineer",
        specialty: "Bilingual EN/FR. Lives in Zapier, Make, and n8n.",
        tools: ["Zapier", "Make", "n8n", "API integrations"],
      },
      {
        initials: "MO",
        name: "Marcus Okafor",
        role: "Full-Stack Builder",
        specialty: "Ships the custom internal tools and AI workflows.",
        tools: ["Retool", "Supabase", "TypeScript", "OpenAI", "Anthropic"],
      },
      {
        initials: "PS",
        name: "Priya Shah",
        role: "CRM & RevOps Specialist",
        specialty: "Rebuilds CRMs that teams actually use.",
        tools: ["HubSpot", "Salesforce", "Pipedrive", "Reporting"],
      },
    ],
  },

  // FAQ
  faq: {
    sectionTitle: "Frequently asked",
    items: [
      {
        q: "What does Smithers actually do?",
        a: "Smithers is a Canadian operations and automation consultancy for small businesses. We come in when your tools have outgrown the way you set them up: tangled CRMs, sprawling spreadsheets, half-built Zapier flows, manual reports, and we replace them with systems that quietly do the work. Engagements range from one-off fixes to multi-week builds to ongoing advisory.",
      },
      {
        q: "Where is Smithers based and who do you work with?",
        a: "Smithers is based in Montreal, Quebec, and works remotely with small businesses across Canada. Our typical client is a 5 to 50 person company, often founder-led, somewhere between ‘we made it work’ and ‘we can’t keep doing it this way.’ We work most often in professional services, e-commerce, healthcare, real estate, and trades.",
      },
      {
        q: "How is Smithers different from a regular consulting firm or agency?",
        a: "Traditional consulting firms write slide decks and leave. Agencies build something and bill you forever to maintain it. Smithers is a small senior team that scopes tight engagements, ships working systems, documents them, and trains your team to own what we build. We’re paid to make ourselves unnecessary on each project, not to embed indefinitely.",
      },
      {
        q: "What tools and platforms do you work with?",
        a: "We work fluently with the platforms most small businesses already rely on: CRMs like HubSpot, Salesforce, and Pipedrive; data and ops tools like Airtable, Notion, and Monday; automation platforms like Zapier, Make, and n8n; databases and internal tooling like Supabase and Retool; and commerce and finance tools like Stripe, QuickBooks, and Shopify. We also build custom internal tools when off-the-shelf doesn’t fit. For AI work, we ship LLM-powered workflows using the OpenAI and Anthropic APIs.",
      },
      {
        q: "How much does it cost to work with Smithers?",
        a: "Requests (small, scoped fixes) are billed hourly or in small fixed-price blocks. Missions are fixed-price projects scoped from a written Mission Overview, typically ranging from $5,000 to $50,000 CAD depending on complexity. Advisory and support retainers start at $2,000 CAD per month. The intro call is free, and you’ll always see scope and price in writing before any paid work starts.",
      },
      {
        q: "How long does a typical Mission take?",
        a: "Most Missions run between 2 and 8 weeks from kickoff to handoff. Shorter Missions are usually a single automation or tool build; longer ones involve rebuilding a CRM, stitching together multiple systems, or shipping an AI workflow end-to-end. We scope every Mission with a written timeline before you commit, so you know what you’re paying for and when it lands.",
      },
      {
        q: "Do you work with companies outside Canada?",
        a: "Yes. Smithers is Canadian and serves Canadian small businesses primarily, but we take on US clients case by case when the project is a good fit. All of our work is remote, so geography matters less than time zone overlap and a clear scope.",
      },
      {
        q: "Will my team be able to maintain what you build after you’re gone?",
        a: "Yes. Every Mission ends with written documentation and a training session for the people on your team who will own the system. We build for handoff, not lock-in: the goal is that your team can extend, debug, and operate what we built without needing to call us back.",
      },
      {
        q: "Can you help us figure out where AI fits in our business?",
        a: "Yes, but only where it earns its keep. We’ve shipped AI workflows for customer support triage, document extraction, lead qualification, and internal knowledge search. We’ll also tell you when AI is the wrong answer and a simpler automation or a better-designed spreadsheet would do the job for a fraction of the cost.",
      },
      {
        q: "How do I get started?",
        a: "Book a free 30-minute discovery call. We’ll listen to what’s broken, ask a few questions, and tell you honestly whether Smithers is the right fit. If it is, we move to a short diagnosis and a written proposal. If it isn’t, we’ll point you somewhere better. Email e@smithers.app or call 514-806-0510 to set it up.",
      },
    ],
  },

  // Contact
  contact: {
    h2Pre: "Let’s see if we’re",
    h2Em: "a fit.",
    body: "Thirty minutes, no slides, no pitch. Tell us what’s broken and we’ll tell you, honestly, whether Smithers is the right team to fix it, and if we’re not, where to look instead.",
    contactLabel: "Your point of contact",
    contactName: "Erico Di Teodoro",
    contactRole: "Lead Strategist",
    emailLabel: "Email",
    phoneLabel: "Phone",
    cta: "Book a call",
  },

  // Footer
  footer: {
    copy: "© Smithers. Built in Montreal, working across Canada.",
    nav: {
      services: "Services",
      how: "How it works",
      faq: "FAQ",
      contact: "Contact",
    },
  },
};
