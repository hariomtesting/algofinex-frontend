/**
 * AlgoFinex — API Service Facade (Delegates to Modular Domain APIs)
 * Preserved for backward-compatibility while UI components consume domain APIs.
 */

import { authApi } from "./authApi";
import { productApi } from "./productApi";
import { accessApi } from "./accessApi";
import { sessionApi } from "./sessionApi";
import { referralApi } from "./referralApi";
import { supportApi } from "./supportApi";
import { checkoutApi } from "./checkoutApi";
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
import {
  LoginRequest,
  SignupRequest,
  CreateSupportTicketRequest,
} from "../types/contracts";

export type LoginCredentials = LoginRequest;
export type SignupPayload = SignupRequest;
export type SupportTicketInput = CreateSupportTicketRequest;

export const ApiService = {
  getCurrentUser: (): Promise<User | null> => authApi.getCurrentUser(),
  login: (credentials: LoginCredentials) => authApi.login(credentials),
  signup: (payload: SignupPayload) => authApi.signup(payload),
  logout: () => authApi.logout(),

  getProducts: (): Promise<readonly Product[]> => productApi.getProducts(),
  getProductAccess: (): Promise<ProductAccess> => accessApi.getProductAccess(),
  updateTradingViewUsername: (username: string): Promise<ProductAccess> =>
    accessApi.updateTradingViewUsername({ tradingViewUsername: username }),

  getSession: (): Promise<Session> => sessionApi.getSessionById("sess_3day_01"),
  getSessionEnrollment: (): Promise<SessionEnrollment> =>
    sessionApi.getUserSessionEnrollment(),

  getReferralData: (): Promise<Referral> => referralApi.getUserReferrals(),

  getSupportTickets: (): Promise<readonly SupportTicket[]> =>
    supportApi.getUserTickets(),
  submitSupportTicket: (input: SupportTicketInput): Promise<SupportTicket> =>
    supportApi.createTicket(input),

  async createCheckout(productId: string): Promise<Order> {
    const result = await checkoutApi.createCheckoutSession({
      productId,
      tradingViewUsername: "sterling_trader",
      contactEmail: "alex@sterlingtrading.io",
    });
    return result.order;
  },

  async requestIndicatorAccess(payload: { tradingViewUsername: string; email?: string }) {
    await accessApi.updateTradingViewUsername({ tradingViewUsername: payload.tradingViewUsername });
    return {
      success: true,
      tradingViewUsername: payload.tradingViewUsername,
      status: "provisioned" as const,
    };
  },

  async enrollInSession(payload: { name: string; email?: string }) {
    return {
      success: true,
      name: payload.name,
      status: "received" as const,
    };
  },

  async submitSupportInquiry(inquiry: { email?: string; message?: string }) {
    await supportApi.createTicket({
      subject: "Public Website Inquiry",
      category: "Other",
      message: inquiry.message || "General inquiry",
    });
    return {
      success: true,
      status: "received" as const,
    };
  },
};
