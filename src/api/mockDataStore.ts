/**
 * AlgoFinex — Isolated Mock Data Store
 * Dedicated contract simulation storage for local development.
 *
 * NOTE ON DATA PROVENANCE:
 * All indicator specs and referral economics are labeled "placeholder" or "confirmed"
 * to maintain strict product truth until backend specifications are formalized.
 */

import {
  User,
  Product,
  ProductAccess,
  Session,
  SessionEnrollment,
  Referral,
  SupportTicket,
  Order,
} from "../types/models";

/**
 * Initial Mock User for Contract Testing
 * In unauthenticated state, this is not automatically logged in.
 */
export const MOCK_USER: User = {
  id: "usr_afx_8921",
  name: "Alex Sterling",
  email: "alex@sterlingtrading.io",
  createdAt: "2026-03-15T09:30:00Z",
  tradingViewUsername: "sterling_trader",
};

/**
 * Products Catalog
 */
export const MOCK_PRODUCTS: readonly Product[] = [
  {
    id: "prod_indicator_01",
    name: "AlgoFinex Indicator",
    slug: "indicator",
    description: "Visual tools designed to provide chart clarity and support a disciplined approach to technical analysis on TradingView.",
    priceDisplay: "Price shown at checkout",
    status: "available",
    provenance: "placeholder",
    capabilities: [
      {
        index: "01",
        title: "Market View",
        description: "Visual tools designed to help organize market information directly on the chart.",
        provenance: "placeholder",
      },
      {
        index: "02",
        title: "Context",
        description: "Chart-based references for interpreting changing market conditions.",
        provenance: "placeholder",
      },
      {
        index: "03",
        title: "Decision Process",
        description: "Designed to support a more structured approach to chart analysis.",
        provenance: "placeholder",
      },
    ],
  },
];

/**
 * Product Access & Entitlement
 * Demonstrates the "active" or configurable entitlement state.
 */
export let mockProductAccessState: ProductAccess = {
  id: "acc_ind_4021",
  userId: MOCK_USER.id,
  productId: "prod_indicator_01",
  productName: "AlgoFinex Indicator",
  tradingViewUsername: "sterling_trader",
  status: "active",
  accessGrantedAt: "2026-03-16T14:20:00Z",
  provenance: "placeholder",
  instructions: [
    "Open any chart on TradingView.com",
    "Click 'Indicators' on the top toolbar",
    "Navigate to the 'Invite-Only Scripts' section",
    "Select 'AlgoFinex Indicator' to add to your layout",
  ],
  supportContactUrl: "/dashboard/support",
};

export const updateMockProductAccess = (partial: Partial<ProductAccess>): ProductAccess => {
  mockProductAccessState = {
    ...mockProductAccessState,
    ...partial,
  };
  return mockProductAccessState;
};

/**
 * 3-Day Session Curriculum
 */
export const MOCK_SESSION: Session = {
  id: "sess_3day_01",
  title: "3-Day Session",
  subtitle: "A focused introduction to the AlgoFinex approach",
  summary: "A structured curriculum designed to introduce disciplined chart reading, execution habits, and daily process.",
  provenance: "placeholder",
  days: [
    {
      dayNumber: "01",
      title: "Foundation",
      description: "Core chart principles, contextual orientation, and disciplined risk awareness.",
      status: "completed",
      duration: "90 min",
      provenance: "placeholder",
    },
    {
      dayNumber: "02",
      title: "Execution",
      description: "Applying chart tools in practice and building consistent interpretation routines.",
      status: "scheduled",
      duration: "90 min",
      provenance: "placeholder",
    },
    {
      dayNumber: "03",
      title: "Process",
      description: "Constructing structured daily habits and reviewing decisions objectively.",
      status: "upcoming",
      duration: "90 min",
      provenance: "placeholder",
    },
  ],
};

export let mockSessionEnrollmentState: SessionEnrollment = {
  id: "enr_sess_1092",
  userId: MOCK_USER.id,
  sessionId: MOCK_SESSION.id,
  sessionTitle: MOCK_SESSION.title,
  status: "confirmed",
  enrolledAt: "2026-03-18T11:00:00Z",
  scheduleNotice: "Session access details will be delivered via email prior to live schedule.",
};

/**
 * Referral State
 * Strictly 0 invites for fresh baseline, no fabricated payouts or percentages.
 */
export const MOCK_REFERRAL: Referral = {
  referralCode: "STERLING2026",
  referralUrl: "https://algofinex.io/?ref=STERLING2026",
  totalInvites: 0,
  successfulInvites: 0,
  rewardStatus: "Program details to be announced by the business team.",
  recentActivity: [],
  provenance: "placeholder",
};

/**
 * Support Tickets In-Memory Store
 */
export let mockTicketsStore: SupportTicket[] = [
  {
    id: "tkt_8091",
    subject: "TradingView username confirmation",
    category: "Indicator Access",
    message: "Requested confirmation of script provisioning for my TradingView ID.",
    status: "resolved",
    createdAt: "2026-03-17T10:14:00Z",
    updatedAt: "2026-03-17T12:00:00Z",
    lastResponseAt: "2026-03-17T12:00:00Z",
  },
];

export const addMockTicket = (ticket: SupportTicket): void => {
  mockTicketsStore = [ticket, ...mockTicketsStore];
};

/**
 * Checkout Orders Store
 */
export const mockOrdersStore: Order[] = [];
