/**
 * AlgoFinex — Product Catalog Domain API
 * Contract:
 *   GET /products
 *   GET /products/:id
 */

import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { Product } from "../types/models";
import { GetProductsResponseData, GetProductByIdResponseData } from "../types/contracts";
import { MOCK_PRODUCTS } from "./mockDataStore";
import { ENV } from "../config/env";

export const productApi = {
  /**
   * GET /products
   */
  async getProducts(): Promise<readonly Product[]> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 150));
      return MOCK_PRODUCTS;
    }

    const response = await apiClient.get<GetProductsResponseData>(
      API_ENDPOINTS.PRODUCTS_LIST,
      { requiresAuth: false }
    );
    return response.products;
  },

  /**
   * GET /products/:id
   */
  async getProductById(id: string): Promise<Product> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 150));
      const found = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
      if (!found) {
        throw new Error(`Product not found: ${id}`);
      }
      return found;
    }

    const response = await apiClient.get<GetProductByIdResponseData>(
      API_ENDPOINTS.PRODUCT_BY_ID(id),
      { requiresAuth: false }
    );
    return response.product;
  },
};
