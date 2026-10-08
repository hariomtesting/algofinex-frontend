/**
 * AlgoFinex — Product Access & Entitlements Domain API
 * Contract:
 *   GET  /users/me/product-access
 *   POST /users/me/tradingview
 */

import { apiClient, ApiClientError } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { ProductAccess } from "../types/models";
import {
  GetProductAccessResponseData,
  UpdateTradingViewRequest,
  UpdateTradingViewResponseData,
} from "../types/contracts";
import { mockProductAccessState, updateMockProductAccess } from "./mockDataStore";
import { ENV } from "../config/env";

export const accessApi = {
  /**
   * GET /users/me/product-access
   * Retrieves current user's entitlement and TradingView provisioning state.
   */
  async getProductAccess(): Promise<ProductAccess> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 200));
      return mockProductAccessState;
    }

    const response = await apiClient.get<GetProductAccessResponseData>(
      API_ENDPOINTS.USER_PRODUCT_ACCESS
    );
    return response.access;
  },

  /**
   * POST /users/me/tradingview
   * Submits or updates TradingView handle for script provisioning.
   */
  async updateTradingViewUsername(payload: UpdateTradingViewRequest): Promise<ProductAccess> {
    if (!payload.tradingViewUsername || !payload.tradingViewUsername.trim()) {
      throw new ApiClientError("TradingView username is required", 400, "VALIDATION_ERROR");
    }

    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 350));
      return updateMockProductAccess({
        tradingViewUsername: payload.tradingViewUsername.trim(),
        status: "provisioning",
      });
    }

    const response = await apiClient.post<UpdateTradingViewResponseData>(
      API_ENDPOINTS.USER_UPDATE_TRADINGVIEW,
      payload
    );
    return response.access;
  },
};
