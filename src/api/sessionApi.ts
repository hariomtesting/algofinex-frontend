/**
 * AlgoFinex — Session & Curriculum Domain API
 * Contract:
 *   GET /sessions
 *   GET /sessions/:id
 *   GET /users/me/session-enrollment
 */

import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { Session, SessionEnrollment } from "../types/models";
import {
  GetSessionsResponseData,
  GetSessionByIdResponseData,
  GetSessionEnrollmentResponseData,
} from "../types/contracts";
import { MOCK_SESSION, mockSessionEnrollmentState } from "./mockDataStore";
import { ENV } from "../config/env";

export const sessionApi = {
  /**
   * GET /sessions
   */
  async getSessions(): Promise<readonly Session[]> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 150));
      return [MOCK_SESSION];
    }

    const response = await apiClient.get<GetSessionsResponseData>(
      API_ENDPOINTS.SESSIONS_LIST,
      { requiresAuth: false }
    );
    return response.sessions;
  },

  /**
   * GET /sessions/:id
   */
  async getSessionById(id: string): Promise<Session> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 150));
      return MOCK_SESSION;
    }

    const response = await apiClient.get<GetSessionByIdResponseData>(
      API_ENDPOINTS.SESSION_BY_ID(id),
      { requiresAuth: false }
    );
    return response.session;
  },

  /**
   * GET /users/me/session-enrollment
   */
  async getUserSessionEnrollment(): Promise<SessionEnrollment> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 200));
      return mockSessionEnrollmentState;
    }

    const response = await apiClient.get<GetSessionEnrollmentResponseData>(
      API_ENDPOINTS.USER_SESSION_ENROLLMENT
    );
    return response.enrollment;
  },
};
