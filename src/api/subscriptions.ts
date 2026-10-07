import { Subscription, SubscriptionPlan } from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';
import { MOCK_SUBSCRIPTION } from '../mock/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCurrentSubscription(): Promise<Subscription> {
  if (BASE_URL) {
    return apiRequest<Subscription>('/subscriptions/current');
  }
  return simulateNetworkDelay(MOCK_SUBSCRIPTION, 200);
}

export async function updateSubscriptionPlan(newPlan: SubscriptionPlan): Promise<Subscription> {
  if (BASE_URL) {
    return apiRequest<Subscription>('/subscriptions/update-plan', {
      method: 'POST',
      body: JSON.stringify({ plan: newPlan }),
    });
  }

  await simulateNetworkDelay(null, 450);
  return {
    ...MOCK_SUBSCRIPTION,
    plan: newPlan,
    amount: newPlan === 'monthly' ? 79 : newPlan === 'annual' ? 708 : 1490,
  };
}

export async function cancelSubscription(): Promise<{ success: boolean; message: string }> {
  if (BASE_URL) {
    return apiRequest('/subscriptions/cancel', {
      method: 'POST',
    });
  }

  await simulateNetworkDelay(null, 400);
  return {
    success: true,
    message: 'Subscription marked to cancel at end of current billing period.',
  };
}
