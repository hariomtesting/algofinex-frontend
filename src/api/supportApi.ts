/**
 * AlgoFinex — Support & Help Desk Domain API
 * Contract:
 *   GET  /users/me/support-tickets
 *   POST /support-tickets
 */

import { apiClient, ApiClientError } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { SupportTicket } from "../types/models";
import {
  GetSupportTicketsResponseData,
  CreateSupportTicketRequest,
  CreateSupportTicketResponseData,
} from "../types/contracts";
import { mockTicketsStore, addMockTicket } from "./mockDataStore";
import { ENV } from "../config/env";

export const supportApi = {
  /**
   * GET /users/me/support-tickets
   */
  async getUserTickets(): Promise<readonly SupportTicket[]> {
    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 200));
      return mockTicketsStore;
    }

    const response = await apiClient.get<GetSupportTicketsResponseData>(
      API_ENDPOINTS.SUPPORT_TICKETS
    );
    return response.tickets;
  },

  /**
   * POST /support-tickets
   */
  async createTicket(payload: CreateSupportTicketRequest): Promise<SupportTicket> {
    if (!payload.subject.trim() || !payload.message.trim()) {
      throw new ApiClientError("Subject and message are required", 400, "VALIDATION_ERROR");
    }

    if (ENV.useMock) {
      await new Promise((r) => setTimeout(r, 350));
      const now = new Date().toISOString();
      const newTicket: SupportTicket = {
        id: `tkt_${Date.now().toString().slice(-4)}`,
        subject: payload.subject.trim(),
        category: payload.category,
        message: payload.message.trim(),
        status: "open",
        createdAt: now,
        updatedAt: now,
      };
      addMockTicket(newTicket);
      return newTicket;
    }

    const response = await apiClient.post<CreateSupportTicketResponseData>(
      API_ENDPOINTS.SUPPORT_CREATE_TICKET,
      payload
    );
    return response.ticket;
  },
};
