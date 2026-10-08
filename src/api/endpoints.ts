/**
 * AlgoFinex — Centralized API Endpoints Contract
 * Single source of truth for all backend route contracts.
 * Provisional paths designed for seamless REST / JSON backend alignment.
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH_SIGNUP: "/auth/signup",
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",

  // Products
  PRODUCTS_LIST: "/products",
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,

  // User Product Entitlements & TradingView
  USER_PRODUCT_ACCESS: "/users/me/product-access",
  USER_UPDATE_TRADINGVIEW: "/users/me/tradingview",

  // 3-Day Session & Cohort
  SESSIONS_LIST: "/sessions",
  SESSION_BY_ID: (id: string) => `/sessions/${id}`,
  USER_SESSION_ENROLLMENT: "/users/me/session-enrollment",

  // Referrals
  USER_REFERRALS: "/users/me/referrals",

  // Support Desk
  SUPPORT_TICKETS: "/users/me/support-tickets",
  SUPPORT_CREATE_TICKET: "/support-tickets",

  // Checkout & Ordering
  CHECKOUT_CREATE: "/checkout",
} as const;
