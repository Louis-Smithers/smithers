export interface TierCopy {
  name: string;
  tagline: string;
  priceFrom: string;
  body: string;
  outcomes: string[];
  typical: string;
}

export interface StepCopy {
  t: string;
  d: string;
}

export interface CaseStudyCopy {
  client: string;
  meta: string;
  tier: string;
  rating: number;
  teaser: string;
  headline: string;
  before: string;
  shipped: string;
  metricPrimary: string;
  metricPrimaryFrom: string;
  metricPrimaryTo: string;
  metricSecondary: string;
  quote: string;
  attribution: {
    name: string;
    role: string;
    company: string;
  };
  tools: string[];
}

export interface TeamMemberCopy {
  initials: string;
  name: string;
  role: string;
  specialty: string;
  tools: string[];
}

export interface FaqItemCopy {
  q: string;
  a: string;
}

export interface WorkflowNodeCopy {
  tool: string;
  label: string;
}

export interface SoundFamiliarScenario {
  label: string;
  inputText: string;
  inputAction: string;
  brokenNodes: WorkflowNodeCopy[];
  fixedNodes: WorkflowNodeCopy[];
  errorNodeIndex: number;
  brokenOutput: string;
  fixedOutput: string;
}

export interface Translations {
  header: {
    logo: string;
    nav: {
      services: string;
      stack: string;
      how: string;
      faq: string;
      contact: string;
    };
    cta: string;
    langSwitcher: string;
  };
  hero: {
    eyebrow: string;
    h1Pre: string;
    h1Em: string;
    sub: string;
    ctaBook: string;
    ctaHow: string;
  };
  logoStrip: {
    label: string;
    chips: string[];
  };
  problem: {
    sectionTitle: string;
    intro: string;
    pains: string[];
  };
  marquee: {
    items: string[];
  };
  soundFamiliar: {
    sectionTitle: string;
    fixedTitle: string;
    scenarios: SoundFamiliarScenario[];
    ctaLine: string;
    fixedCtaLine: string;
    ctaButton: string;
    fixingText: string;
    fixedCtaButton: string;
  };
  services: {
    sectionTitle: string;
    intro: string;
    priceCaption: string;
    tiers: TierCopy[];
  };
  stack: {
    sectionTitle: string;
    intro: string;
    footer: string;
  };
  how: {
    sectionTitle: string;
    orderLabels: string[];
    steps: StepCopy[];
  };
  caseStudies: {
    sectionTitle: string;
    intro: string;
    banner: string;
    beforeLabel: string;
    shippedLabel: string;
    resultLabel: string;
    toolsLabel: string;
    ratingLabel: string;
    studies: CaseStudyCopy[];
  };
  team: {
    sectionTitle: string;
    intro: string;
    members: TeamMemberCopy[];
  };
  faq: {
    sectionTitle: string;
    items: FaqItemCopy[];
  };
  contact: {
    h2Pre: string;
    h2Em: string;
    body: string;
    contactLabel: string;
    contactName: string;
    contactRole: string;
    emailLabel: string;
    phoneLabel: string;
    cta: string;
  };
  footer: {
    copy: string;
    nav: {
      services: string;
      how: string;
      faq: string;
      contact: string;
    };
  };
}
