export interface User {
  id: string;
  email: string;
  name: string;
  role: 'trader' | 'pro' | 'admin';
  tradingViewHandle: string;
  tier: 'free' | 'session_active' | 'pro_subscriber' | 'lifetime';
  sessionExpiresAt?: string;
  createdAt: string;
}

export type ProductCategory = 
  | 'MARKET_STRUCTURE' 
  | 'LIQUIDITY' 
  | 'MOMENTUM_TREND' 
  | 'EXECUTION_CONFIRMATION'
  | 'VOLATILITY';

export interface ProductCapability {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  badge: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  version: string;
  supportedMarkets: string[];
  keyCapabilities: ProductCapability[];
  formulaLogic: string;
  howItWorks: string[];
  useCases: string[];
  faq: { question: string; answer: string }[];
  pineScriptType: 'Indicator v5' | 'Strategy v5';
  pricingTier: 'standard' | 'pro' | 'suite';
  nonRepainting: boolean;
  barCloseValidation: boolean;
}

export type SubscriptionPlan = 'monthly' | 'annual' | 'lifetime';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethodLast4: string;
  invoiceHistory: {
    id: string;
    date: string;
    amount: number;
    pdfUrl: string;
    status: 'paid' | 'failed';
  }[];
}

export interface ReferralTransaction {
  id: string;
  date: string;
  referredUser: string;
  plan: string;
  amount: number;
  commission: number;
  status: 'paid' | 'pending';
}

export interface ReferralData {
  referralCode: string;
  referralLink: string;
  commissionRate: number; // e.g. 25%
  totalReferred: number;
  activeSubscribers: number;
  totalEarned: number;
  pendingPayout: number;
  paidPayout: number;
  minimumPayoutThreshold: number;
  history: ReferralTransaction[];
}

export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed';

export interface PaymentIntentRequest {
  plan: SubscriptionPlan;
  email: string;
  tradingViewHandle: string;
  paymentMethod: 'card' | 'crypto';
  couponCode?: string;
}

export interface PaymentIntentResponse {
  paymentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  plan: SubscriptionPlan;
  receiptUrl?: string;
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_review' | 'resolved' | 'closed';

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support_engineer';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'tradingview_access' | 'indicator_settings' | 'billing' | '3day_session' | 'general';
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
