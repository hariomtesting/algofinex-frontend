/**
 * AlgoFinex — Central API Client Abstraction
 *
 * Architecture:
 *   UI -> Domain API -> ApiClient -> Backend
 *
 * AUTH STORAGE ARCHITECTURE NOTE:
 * AUTH STORAGE = BACKEND DECISION, NOT A FRONTEND INVARIANT.
 * Preferred production architecture: HttpOnly, Secure, SameSite-aware server-managed session cookies.
 * Transport requests default to `credentials: "include"`.
 * Any alternative (such as Bearer tokens in Authorization headers) is fully encapsulated
 * within injectable AuthTokenStorage adapters and never exposed to UI or domain services.
 */

import { ENV } from "../config/env";

export interface ApiErrorPayload {
  readonly code: string;
  readonly message: string;
  readonly fieldErrors?: Record<string, readonly string[]>;
  readonly requestId?: string;
}

/**
 * Normalized application error thrown by ApiClient.
 */
export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly fieldErrors?: Record<string, readonly string[]>;
  public readonly requestId?: string;

  constructor(
    message: string,
    status: number = 500,
    code: string = "INTERNAL_ERROR",
    fieldErrors?: Record<string, readonly string[]>,
    requestId?: string
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.requestId = requestId;
  }

  public isAuthError(): boolean {
    return this.status === 401;
  }

  public isPermissionError(): boolean {
    return this.status === 403;
  }

  public isValidationError(): boolean {
    return this.status === 400 || this.status === 422;
  }

  public isNotFoundError(): boolean {
    return this.status === 404;
  }

  public isConflictError(): boolean {
    return this.status === 409;
  }

  public isRateLimitError(): boolean {
    return this.status === 429;
  }

  public isServerError(): boolean {
    return this.status >= 500;
  }
}

/**
 * Pluggable Token Storage Adapter Interface
 */
export interface AuthTokenStorage {
  getToken(): string | null;
  setToken(token: string | null): void;
  clearToken(): void;
}

/**
 * Default Storage: Cookie-Session Storage
 * Session management is handled automatically by the browser via HttpOnly cookies.
 */
export class CookieSessionStorage implements AuthTokenStorage {
  getToken(): string | null {
    return null; // Cookies are transmitted automatically by browser
  }
  setToken(_token: string | null): void {}
  clearToken(): void {}
}

/**
 * Optional Storage: In-Memory Token Storage (For ephemeral Bearer token setups)
 */
export class MemoryTokenStorage implements AuthTokenStorage {
  private memoryToken: string | null = null;
  getToken(): string | null {
    return this.memoryToken;
  }
  setToken(token: string | null): void {
    this.memoryToken = token;
  }
  clearToken(): void {
    this.memoryToken = null;
  }
}

/**
 * Optional Storage: LocalStorage Token Storage (If backend mandates client persistence)
 */
export class LocalStorageTokenStorage implements AuthTokenStorage {
  private key = "afx_client_token";
  getToken(): string | null {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  }
  setToken(token: string | null): void {
    try {
      if (token) localStorage.setItem(this.key, token);
      else localStorage.removeItem(this.key);
    } catch {}
  }
  clearToken(): void {
    this.setToken(null);
  }
}

export interface RequestOptions extends RequestInit {
  readonly params?: Record<string, string | number | boolean | undefined>;
  readonly requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private tokenStorage: AuthTokenStorage;

  constructor(baseUrl: string = ENV.apiBaseUrl, storage: AuthTokenStorage = new MemoryTokenStorage()) {
    this.baseUrl = baseUrl;
    this.tokenStorage = storage;
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/$/, "");
  }

  public setTokenStorage(storage: AuthTokenStorage): void {
    this.tokenStorage = storage;
  }

  public getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  public setToken(token: string | null): void {
    this.tokenStorage.setToken(token);
  }

  public clearToken(): void {
    this.tokenStorage.clearToken();
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const fullUrl = this.baseUrl ? `${this.baseUrl}${cleanEndpoint}` : cleanEndpoint;
    if (!params) return fullUrl;

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }

    const queryString = searchParams.toString();
    return queryString ? `${fullUrl}?${queryString}` : fullUrl;
  }

  private mapHttpStatusToCode(status: number): { code: string; defaultMessage: string } {
    switch (status) {
      case 400:
        return { code: "VALIDATION_FAILED", defaultMessage: "Invalid request payload submitted." };
      case 401:
        return { code: "UNAUTHORIZED", defaultMessage: "Session invalid or expired. Please sign in." };
      case 403:
        return { code: "FORBIDDEN", defaultMessage: "You do not have permission to access this resource." };
      case 404:
        return { code: "NOT_FOUND", defaultMessage: "The requested resource could not be found." };
      case 409:
        return { code: "CONFLICT", defaultMessage: "Resource conflict occurred." };
      case 422:
        return { code: "UNPROCESSABLE_ENTITY", defaultMessage: "Request semantic validation failed." };
      case 429:
        return { code: "RATE_LIMITED", defaultMessage: "Too many requests. Please wait a moment." };
      case 500:
        return { code: "INTERNAL_SERVER_ERROR", defaultMessage: "An unexpected server error occurred." };
      case 502:
      case 503:
      case 504:
        return { code: "SERVICE_UNAVAILABLE", defaultMessage: "Service temporarily unavailable." };
      default:
        return { code: `HTTP_${status}`, defaultMessage: `Request failed with status ${status}.` };
    }
  }

  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, requiresAuth = true, headers: customHeaders, ...initOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (requiresAuth) {
      const token = this.tokenStorage.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const mergedHeaders = {
      ...headers,
      ...(customHeaders as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        credentials: "include", // Supports HttpOnly cookies by default
        ...initOptions,
        headers: mergedHeaders,
      });

      if (!response.ok) {
        const { code: fallbackCode, defaultMessage } = this.mapHttpStatusToCode(response.status);
        let errorPayload: Partial<ApiErrorPayload> = {};

        try {
          const json = await response.json();
          if (json && typeof json === "object") {
            if ("error" in json && typeof json.error === "object") {
              errorPayload = json.error;
            } else {
              errorPayload = json;
            }
          }
        } catch {
          // Response body was not JSON
        }

        throw new ApiClientError(
          errorPayload.message || defaultMessage,
          response.status,
          errorPayload.code || fallbackCode,
          errorPayload.fieldErrors,
          errorPayload.requestId
        );
      }

      if (response.status === 204) {
        return undefined as unknown as T;
      }

      const json = await response.json();
      return json as T;
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        throw err;
      }
      const message = err instanceof Error ? err.message : "Network connection failed";
      throw new ApiClientError(message, 0, "NETWORK_ERROR");
    }
  }

  public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
