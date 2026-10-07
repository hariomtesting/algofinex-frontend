import { ReferralData } from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';
import { MOCK_REFERRAL_DATA } from '../mock/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getReferralStats(): Promise<ReferralData> {
  if (BASE_URL) {
    return apiRequest<ReferralData>('/referrals/stats');
  }
  return simulateNetworkDelay(MOCK_REFERRAL_DATA, 220);
}

export async function requestPayout(amount: number): Promise<{ success: boolean; message: string; transactionId: string }> {
  if (BASE_URL) {
    return apiRequest('/referrals/request-payout', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  await simulateNetworkDelay(null, 500);
  if (amount < 100) {
    throw new Error('Minimum withdrawal threshold is $100.00 USD.');
  }

  return {
    success: true,
    message: `Payout request for $${amount} submitted to finance desk.`,
    transactionId: `WD-${Math.floor(100000 + Math.random() * 900000)}`,
  };
}
