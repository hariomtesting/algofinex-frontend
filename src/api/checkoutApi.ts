/**
 * AlgoFinex — Checkout & Order Domain API
 * Contract:
 *   POST /checkout
 */

import { apiClient, ApiClientError } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { Order } from "../types/models";
import { CheckoutRequest, CheckoutResponseData } from "../types/contracts";
import { MOCK_PRODUCTS } from "./mockDataStore";
import { ENV } from "../config/env";

export const checkoutApi = {
  /**
   * POST /checkout
   * Prepares order intent with backend payment provider.
   */
  async createCheckoutSession(payload: CheckoutRequest): Promise<CheckoutResponseData> {
    if (!payload.tradingViewUsername || !payload.contactEmail) {
      throw new ApiClientError(
        "TradingView username and contact email are required",
        400,
        "VALIDATION_ERROR"
      );
    }

    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 450));
      const targetProduct = MOCK_PRODUCTS.find((p) => p.id === payload.productId) || MOCK_PRODUCTS[0];
      const order: Order = {
        id: `ord_${Date.now().toString().slice(-6)}`,
        items: [
          {
            productId: targetProduct.id,
            productName: targetProduct.name,
            priceDisplay: targetProduct.priceDisplay,
          },
        ],
        subtotalDisplay: targetProduct.priceDisplay,
        taxesDisplay: "Calculated at provider checkout",
        totalDisplay: targetProduct.priceDisplay,
        status: "pending",
        tradingViewUsername: payload.tradingViewUsername,
        contactEmail: payload.contactEmail,
        createdAt: new Date().toISOString(),
      };

      return {
        order,
        requiresPayment: true,
      };
    }

    const response = await apiClient.post<CheckoutResponseData>(
      API_ENDPOINTS.CHECKOUT_CREATE,
      payload,
      { requiresAuth: false }
    );
    return response;
  },
};
