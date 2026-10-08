/**
 * AlgoFinex — Referral System Domain API
 * Contract:
 *   GET /users/me/referrals
 */

import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { Referral } from "../types/models";
import { GetReferralsResponseData } from "../types/contracts";
import { MOCK_REFERRAL } from "./mockDataStore";
import { ENV } from "../config/env";

export const referralApi = {
  /**
   * GET /users/me/referrals
   */
  async getUserReferrals(): Promise<Referral> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 180));
      return MOCK_REFERRAL;
    }

    const response = await apiClient.get<GetReferralsResponseData>(
      API_ENDPOINTS.USER_REFERRALS
    );
    return response.referral;
  },
};
