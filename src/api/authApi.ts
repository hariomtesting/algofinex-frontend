/**
 * AlgoFinex — Authentication Domain API
 * Contract:
 *   POST /auth/signup
 *   POST /auth/login
 *   POST /auth/logout
 *   GET  /auth/me
 */

import { apiClient, ApiClientError } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { User } from "../types/models";
import {
  LoginRequest,
  SignupRequest,
  AuthResponseData,
  LogoutResponseData,
  CurrentUserResponseData,
} from "../types/contracts";
import { MOCK_USER } from "./mockDataStore";
import { ENV } from "../config/env";

export const authApi = {
  /**
   * GET /auth/me
   * Fetches current authenticated user profile using session cookie or token.
   */
  async getCurrentUser(): Promise<User | null> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 200));
      // In mock simulation, check if active session flag exists
      const hasMockSession = apiClient.getToken() !== null || sessionStorage.getItem("afx_mock_session") === "true";
      if (hasMockSession) {
        return MOCK_USER;
      }
      return null;
    }

    try {
      const response = await apiClient.get<CurrentUserResponseData>(API_ENDPOINTS.AUTH_ME);
      return response.user;
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        apiClient.clearToken();
        return null;
      }
      throw err;
    }
  },

  /**
   * POST /auth/login
   */
  async login(credentials: LoginRequest): Promise<AuthResponseData> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 350));
      if (!credentials.email || !credentials.email.includes("@")) {
        throw new ApiClientError("Please enter a valid email address", 400, "INVALID_CREDENTIALS");
      }
      const token = `afx_jwt_${Date.now()}`;
      apiClient.setToken(token);
      try {
        sessionStorage.setItem("afx_mock_session", "true");
      } catch {}
      const user: User = {
        ...MOCK_USER,
        email: credentials.email,
      };
      return { user, token };
    }

    const response = await apiClient.post<AuthResponseData>(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials,
      { requiresAuth: false }
    );
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  /**
   * POST /auth/signup
   */
  async signup(payload: SignupRequest): Promise<AuthResponseData> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 400));
      if (!payload.email || !payload.email.includes("@")) {
        throw new ApiClientError("Please enter a valid email address", 400, "INVALID_INPUT");
      }
      const token = `afx_jwt_${Date.now()}`;
      apiClient.setToken(token);
      try {
        sessionStorage.setItem("afx_mock_session", "true");
      } catch {}
      const user: User = {
        id: `usr_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        createdAt: new Date().toISOString(),
      };
      return { user, token };
    }

    const response = await apiClient.post<AuthResponseData>(
      API_ENDPOINTS.AUTH_SIGNUP,
      payload,
      { requiresAuth: false }
    );
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  /**
   * POST /auth/logout
   */
  async logout(): Promise<LogoutResponseData> {
    try {
      if (!ENV.useMock) {
        await apiClient.post<LogoutResponseData>(API_ENDPOINTS.AUTH_LOGOUT);
      } else {
        await new Promise((r) => setTimeout(r, 150));
        try {
          sessionStorage.removeItem("afx_mock_session");
        } catch {}
      }
    } finally {
      apiClient.clearToken();
    }
    return { loggedOut: true };
  },
};
