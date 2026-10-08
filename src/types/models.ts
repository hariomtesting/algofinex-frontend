/**
 * AlgoFinex — Core Application Domain Models (Strictly Typed)
 * Establishes shared, backend-aligned domain definitions without `any`.
 *
 * NOTE ON DATA PROVENANCE:
 * The indicator technical specifications, commission structures, and live pricing
 * are not yet finalized by backend/business owners. All models explicitly tag
 * placeholder content so it is never presented as confirmed fact.
 */

export type DataProvenance = "confirmed" | "placeholder" | "backend_supplied";

/**
 * Authenticated User Domain Model
 */
export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: string;
  readonly avatarUrl?: string;
  readonly tradingViewUsername?: string;
}

/**
 * Product Access & Entitlement Status
 * Explicit state machine for indicator provisioning.
 */
export type ProductAccessStatus =
  | "not_entitled"
  | "pending"
  | "provisioning"
  | "active"
  | "error";

export interface ProductCapability {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly provenance: DataProvenance;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly priceDisplay: string;
  readonly status: "available" | "coming_soon";
  readonly capabilities: readonly ProductCapability[];
  readonly provenance: DataProvenance;
}

export interface ProductAccess {
  readonly id: string;
  readonly userId: string;
  readonly productId: string;
  readonly productName: string;
  readonly tradingViewUsername?: string;
  readonly status: ProductAccessStatus;
  readonly accessGrantedAt?: string;
  readonly errorMessage?: string;
  readonly instructions: readonly string[];
  readonly supportContactUrl: string;
  readonly provenance: DataProvenance;
}

/**
 * 3-Day Session & Cohort Curriculum Models
 */
export type SessionEnrollmentStatus =
  | "not_enrolled"
  | "pending"
  | "confirmed"
  | "active"
  | "completed";

export interface SessionCurriculumDay {
  readonly dayNumber: string;
  readonly title: string;
  readonly description: string;
  readonly status: "completed" | "scheduled" | "upcoming";
  readonly duration?: string;
  readonly provenance: DataProvenance;
}

export interface Session {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly days: readonly SessionCurriculumDay[];
  readonly provenance: DataProvenance;
}

export interface SessionEnrollment {
  readonly id: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly sessionTitle: string;
  readonly status: SessionEnrollmentStatus;
  readonly enrolledAt?: string;
  readonly scheduledCohortDate?: string;
  readonly scheduleNotice?: string;
}

/**
 * Referral System Domain Model
 * Strict counts with zero fabricated financial or reward numbers.
 */
export interface Referral {
  readonly referralCode: string;
  readonly referralUrl: string;
  readonly totalInvites: number;
  readonly successfulInvites: number;
  readonly rewardStatus: string;
  readonly recentActivity: readonly ReferralActivityItem[];
  readonly provenance: DataProvenance;
}

export interface ReferralActivityItem {
  readonly id: string;
  readonly date: string;
  readonly event: string;
  readonly status: string;
}

/**
 * Help Desk & Support Ticket Models
 */
export type TicketCategory =
  | "Indicator Access"
  | "3-Day Session"
  | "Account"
  | "Payment"
  | "Other";

export type TicketStatus = "open" | "in_review" | "resolved";

export interface SupportTicket {
  readonly id: string;
  readonly subject: string;
  readonly category: TicketCategory;
  readonly message: string;
  readonly status: TicketStatus;
  readonly createdAt: string;
  readonly updatedAt?: string;
  readonly lastResponseAt?: string;
}

/**
 * Checkout & Order Domain Models
 */
export type OrderStatus = "draft" | "pending" | "completed" | "failed";

export interface OrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly priceDisplay: string;
}

export interface Order {
  readonly id: string;
  readonly items: readonly OrderItem[];
  readonly subtotalDisplay: string;
  readonly taxesDisplay: string;
  readonly totalDisplay: string;
  readonly status: OrderStatus;
  readonly tradingViewUsername?: string;
  readonly contactEmail: string;
  readonly createdAt: string;
}

/**
 * Authentication State Machine Union
 */
export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";

export interface AuthSession {
  readonly status: AuthStatus;
  readonly user: User | null;
  readonly token: string | null;
  readonly error?: string;
}
