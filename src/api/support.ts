import { SupportTicket, TicketPriority } from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';
import { MOCK_TICKETS } from '../mock/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CreateTicketData {
  subject: string;
  category: 'tradingview_access' | 'indicator_settings' | 'billing' | '3day_session' | 'general';
  priority: TicketPriority;
  message: string;
}

export async function getSupportTickets(): Promise<SupportTicket[]> {
  if (BASE_URL) {
    return apiRequest<SupportTicket[]>('/support/tickets');
  }
  return simulateNetworkDelay(MOCK_TICKETS, 250);
}

export async function createSupportTicket(data: CreateTicketData): Promise<SupportTicket> {
  if (BASE_URL) {
    return apiRequest<SupportTicket>('/support/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  await simulateNetworkDelay(null, 500);

  if (!data.subject.trim() || !data.message.trim()) {
    throw new Error('Please provide both a ticket subject and description.');
  }

  const newTicket: SupportTicket = {
    id: `TICK-${Math.floor(500 + Math.random() * 500)}`,
    subject: data.subject,
    category: data.category,
    priority: data.priority,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: `msg_${Date.now()}`,
        sender: 'user',
        senderName: 'Marcus Vance',
        message: data.message,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  return newTicket;
}
