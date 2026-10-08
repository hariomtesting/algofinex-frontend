/**
 * AlgoFinex — Centralized Route Definitions
 */

export const ROUTES = {
  // Public Routes
  HOME: "/",
  INDICATOR: "/indicator",
  SESSION: "/session",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHECKOUT: "/checkout",

  // Authenticated Application Routes
  DASHBOARD: "/dashboard",
  DASHBOARD_INDICATOR: "/dashboard/indicator",
  DASHBOARD_SESSION: "/dashboard/session",
  DASHBOARD_REFERRALS: "/dashboard/referrals",
  DASHBOARD_SUPPORT: "/dashboard/support",
  ACCOUNT: "/account",
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
