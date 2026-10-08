/**
 * AlgoFinex — Shared API Request & Response Contracts
 * Shared contracts agreed upon between Frontend and Backend engineers.
 * Every endpoint has explicit Request, Response, and Error definitions.
 *
 * NOTE: Where backend behavior is unknown or pending business decisions,
 * it is explicitly tagged: "TODO — backend confirmation required".
 */

import {
  User,
  Product,
  ProductAccess,
  Session,
  SessionEnrollment,
  Referral,
  SupportTicket,
  TicketCategory,
  Order,
} from "./models";

/**
 * Standard Normalized Error Shape
 */
export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly fieldErrors?: Record<string, readonly string[]>;
    readonly requestId?: string;
  };
}

// -------------------------------------------------------------
// 1. AUTH CONTRACTS
// -------------------------------------------------------------

/**
 * POST /auth/login
 * Auth Required: No
 * Success Status: 200 OK
 * Expected Errors: 400 (Validation), 401 (Invalid credentials), 429 (Rate limit)
 */
export interface LoginRequest {
  readonly email: string;
  readonly password?: string;
}

/**
 * POST /auth/signup
 * Auth Required: No
 * Success Status: 201 Created
 * Expected Errors: 400 (Validation), 409 (Email exists), 422 (Weak password)
 */
export interface SignupRequest {
  readonly name: string;
  readonly email: string;
  readonly password?: string;
}

/**
 * Auth Success Response (cookie or token-based)
 * TODO — backend confirmation required: confirm if session cookie is issued or bearer token returned
 */
export interface AuthResponseData {
  readonly user: User;
  readonly token?: string; // Optional if backend chooses HttpOnly cookies
  readonly expiresAt?: string;
}

/**
 * POST /auth/logout
 * Auth Required: Yes
 * Success Status: 200 OK (or 204 No Content)
 */
export interface LogoutResponseData {
  readonly loggedOut: boolean;
}

/**
 * GET /auth/me
 * Auth Required: Yes
 * Success Status: 200 OK
 * Expected Errors: 401 (Unauthorized / Session expired)
 */
export interface CurrentUserResponseData {
  readonly user: User | null;
}

// -------------------------------------------------------------
// 2. PRODUCT CONTRACTS
// -------------------------------------------------------------

/**
 * GET /products
 * Auth Required: No
 * Success Status: 200 OK
 */
export interface GetProductsResponseData {
  readonly products: readonly Product[];
}

/**
 * GET /products/:id
 * Auth Required: No
 * Success Status: 200 OK
 * Expected Errors: 404 (Not found)
 */
export interface GetProductByIdResponseData {
  readonly product: Product;
}

// -------------------------------------------------------------
// 3. ACCESS & TRADINGVIEW CONTRACTS
// -------------------------------------------------------------

/**
 * GET /users/me/product-access
 * Auth Required: Yes
 * Success Status: 200 OK
 * Expected Errors: 401 (Unauthorized)
 */
export interface GetProductAccessResponseData {
  readonly access: ProductAccess;
}

/**
 * POST /users/me/tradingview
 * Auth Required: Yes
 * Success Status: 200 OK (or 202 Accepted if async provisioning queued)
 * Expected Errors: 400 (Invalid username), 401 (Unauthorized), 409 (Username linked to other account)
 */
export interface UpdateTradingViewRequest {
  readonly tradingViewUsername: string;
}

export interface UpdateTradingViewResponseData {
  readonly access: ProductAccess;
}

// -------------------------------------------------------------
// 4. SESSION & CURRICULUM CONTRACTS
// -------------------------------------------------------------

/**
 * GET /sessions
 * Auth Required: No
 * Success Status: 200 OK
 */
export interface GetSessionsResponseData {
  readonly sessions: readonly Session[];
}

/**
 * GET /sessions/:id
 * Auth Required: No
 * Success Status: 200 OK
 * Expected Errors: 404 (Not found)
 */
export interface GetSessionByIdResponseData {
  readonly session: Session;
}

/**
 * GET /users/me/session-enrollment
 * Auth Required: Yes
 * Success Status: 200 OK
 * Expected Errors: 401 (Unauthorized)
 */
export interface GetSessionEnrollmentResponseData {
  readonly enrollment: SessionEnrollment;
}

// -------------------------------------------------------------
// 5. REFERRAL CONTRACTS
// -------------------------------------------------------------

/**
 * GET /users/me/referrals
 * Auth Required: Yes
 * Success Status: 200 OK
 * Expected Errors: 401 (Unauthorized)
 * TODO — backend confirmation required: formalize commission formulas, referral terms, and payout mechanisms
 */
export interface GetReferralsResponseData {
  readonly referral: Referral;
}

// -------------------------------------------------------------
// 6. SUPPORT CONTRACTS
// -------------------------------------------------------------

/**
 * GET /users/me/support-tickets
 * Auth Required: Yes
 * Success Status: 200 OK
 * Expected Errors: 401 (Unauthorized)
 */
export interface GetSupportTicketsResponseData {
  readonly tickets: readonly SupportTicket[];
}

/**
 * POST /support-tickets
 * Auth Required: Optional (can submit logged in or via public contact)
 * Success Status: 201 Created
 * Expected Errors: 400 (Validation / missing message), 429 (Rate limit)
 */
export interface CreateSupportTicketRequest {
  readonly subject: string;
  readonly category: TicketCategory;
  readonly message: string;
}

export interface CreateSupportTicketResponseData {
  readonly ticket: SupportTicket;
}

// -------------------------------------------------------------
// 7. CHECKOUT CONTRACTS
// -------------------------------------------------------------

/**
 * POST /checkout
 * Auth Required: Optional
 * Success Status: 200 OK (or 201 Created)
 * Expected Errors: 400 (Missing contact or TV handle), 422 (Invalid payment intent)
 * TODO — backend confirmation required: payment provider selection (Stripe / custom / crypto / invoice)
 */
export interface CheckoutRequest {
  readonly productId: string;
  readonly tradingViewUsername: string;
  readonly contactEmail: string;
}

export interface CheckoutResponseData {
  readonly order: Order;
  readonly paymentProvider?: string; // TBD by backend
  readonly paymentRedirectUrl?: string; // TBD by backend
  readonly requiresPayment: boolean;
}
