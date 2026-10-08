/**
 * AlgoFinex — Core Content & Configuration
 * Editorial, disciplined product copy.
 * Philosophy: Discipline over noise.
 */

export interface BrandConfig {
  readonly name: string;
  readonly tagline: string;
  readonly subheadline: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface IndicatorCapability {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
}

export interface IndicatorProductConfig {
  readonly name: string;
  readonly headline: string;
  readonly summary: string;
  readonly capabilities: readonly IndicatorCapability[];
}

export interface WorkflowStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface SessionDay {
  readonly day: string;
  readonly title: string;
  readonly description: string;
}

export interface SessionConfig {
  readonly monument: string;
  readonly title: string;
  readonly summary: string;
  readonly curriculum: readonly SessionDay[];
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: "ALGOFINEX",
  tagline: "TRADE WITH CLARITY.",
  subheadline: "Professional trading tools for a more structured approach to the market.",
};

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Showcase", href: "#showcase" },
  { label: "Workflow", href: "#workflow" },
  { label: "3-Day Session", href: "#session" },
  { label: "Access", href: "#access" },
  { label: "FAQ", href: "#faq" },
];

export const INDICATOR_PRODUCT: IndicatorProductConfig = {
  name: "THE INDICATOR",
  headline: "A clearer way to read the market.",
  summary: "Visual tools designed to provide chart clarity and support a disciplined approach to technical analysis on TradingView.",
  capabilities: [
    {
      index: "01",
      title: "Market View",
      description: "Visual tools designed to help organize market information directly on the chart.",
      badge: "Market View",
    },
    {
      index: "02",
      title: "Context",
      description: "Chart-based references for interpreting changing market conditions.",
      badge: "Context",
    },
    {
      index: "03",
      title: "Decision Process",
      description: "Designed to support a more structured approach to chart analysis.",
      badge: "Decision Process",
    },
  ],
};

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    step: "01",
    title: "Observe",
    description: "Start with the market context.",
  },
  {
    step: "02",
    title: "Interpret",
    description: "Review the information visible on the chart.",
  },
  {
    step: "03",
    title: "Decide",
    description: "Apply your own trading rules and risk parameters.",
  },
  {
    step: "04",
    title: "Review",
    description: "Evaluate the decision and execution afterward.",
  },
];

export const SESSION_CONFIG: SessionConfig = {
  monument: "3 DAYS.",
  title: "A focused introduction to the AlgoFinex approach.",
  summary: "A structured curriculum designed to introduce disciplined chart reading, execution habits, and daily process.",
  curriculum: [
    {
      day: "01",
      title: "Foundation",
      description: "Core chart principles, contextual orientation, and disciplined risk awareness.",
    },
    {
      day: "02",
      title: "Execution",
      description: "Applying chart tools in practice and building consistent interpretation routines.",
    },
    {
      day: "03",
      title: "Process",
      description: "Constructing structured daily habits and reviewing decisions objectively.",
    },
  ],
};

export interface PricingTier {
  readonly id: string;
  readonly name: string;
  readonly badge?: string;
  readonly isPrimary: boolean;
  readonly description: string;
  readonly priceDisplay: string;
  readonly priceSubtext: string;
  readonly includedFeatures: readonly string[];
  readonly ctaLabel: string;
  readonly actionType: "indicator" | "session";
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "indicator",
    name: "ALGOFINEX INDICATOR",
    badge: "PRIMARY PRODUCT",
    isPrimary: true,
    description: "Visual tools designed to provide chart clarity and support a disciplined approach to technical analysis on TradingView.",
    priceDisplay: "[PLACEHOLDER — PRICING TO BE SPECIFIED]",
    priceSubtext: "Commercial terms and licensing details provided upon official release.",
    includedFeatures: [
      "[PLACEHOLDER — PRICING & TERMS TO BE CONFIRMED]",
      "TradingView script access",
      "Setup documentation & user guide",
      "Direct onboarding support",
    ],
    ctaLabel: "GET ACCESS",
    actionType: "indicator",
  },
  {
    id: "session",
    name: "3-DAY SESSION",
    badge: "GUIDED CURRICULUM",
    isPrimary: false,
    description: "A focused guided introduction covering foundational chart orientation, analytical consistency, and daily trading habits.",
    priceDisplay: "[PLACEHOLDER — PRICING TO BE SPECIFIED]",
    priceSubtext: "Cohort scheduling and enrollment terms provided upon official release.",
    includedFeatures: [
      "[PLACEHOLDER — PRICING & TERMS TO BE CONFIRMED]",
      "3-day structured educational curriculum",
      "Daily execution routines & review habits",
      "Participant onboarding support",
    ],
    ctaLabel: "JOIN SESSION",
    actionType: "session",
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-1",
    question: "What is AlgoFinex?",
    answer: "AlgoFinex develops TradingView analytical tools and provides structured education designed to encourage disciplined, rules-based market analysis.",
  },
  {
    id: "faq-2",
    question: "How do I access the indicator?",
    answer: "Submit your TradingView username at checkout. Script access permissions and setup documentation are provisioned directly to your account.",
  },
  {
    id: "faq-3",
    question: "What is the 3-Day Session?",
    answer: "The 3-Day Session is an educational curriculum covering foundational chart orientation, analytical consistency, and structured daily habits.",
  },
  {
    id: "faq-4",
    question: "How does checkout work?",
    answer: "Select your preferred access option, provide your contact details and TradingView username, and complete your order. You will receive an immediate confirmation with next steps.",
  },
  {
    id: "faq-5",
    question: "When will I receive access?",
    answer: "Once your order is processed, indicator permissions are assigned to your TradingView account and onboarding documentation is delivered to your email.",
  },
  {
    id: "faq-6",
    question: "How can I contact support?",
    answer: "You can reach our team anytime through the Support Desk in your workspace or by emailing support@algofinex.com for guidance on setup and onboarding.",
  },
];
