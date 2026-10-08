/**
 * AlgoFinex — Environment Configuration
 * Centralized, type-safe environment variable access with robust fallbacks.
 *
 * NOTE: Never expose backend secrets, private API keys, or database credentials
 * in client-side Vite environment variables (VITE_*).
 */

interface EnvConfig {
  readonly apiBaseUrl: string;
  readonly useMock: boolean;
  readonly isDev: boolean;
  readonly isProd: boolean;
}

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
const rawUseMock = import.meta.env.VITE_USE_MOCK;

export const ENV: EnvConfig = {
  // If no base URL is defined, defaults to empty string (relative API paths or mock adapter)
  apiBaseUrl: typeof rawBaseUrl === "string" ? rawBaseUrl.trim().replace(/\/$/, "") : "",

  // Default to mock simulation in dev if explicit flag is omitted or set to "true"
  useMock: rawUseMock !== undefined ? rawUseMock === "true" || rawUseMock === "1" : true,

  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
