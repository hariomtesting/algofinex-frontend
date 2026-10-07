import { 
  PaymentIntentRequest, 
  PaymentIntentResponse 
} from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PLAN_PRICES = {
  monthly: 79,
  annual: 708,
  lifetime: 1490,
};

export async function createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
  if (BASE_URL) {
    return apiRequest<PaymentIntentResponse>('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  await simulateNetworkDelay(null, 450);

  const amount = PLAN_PRICES[request.plan] || 708;

  return {
    paymentId: `pi_mock_${Date.now()}`,
    clientSecret: `cs_secret_${Math.random().toString(36).substring(2)}`,
    amount,
    currency: 'USD',
    status: 'pending',
    plan: request.plan,
  };
}

export async function processPayment(paymentId: string, shouldSimulateFailure = false): Promise<PaymentIntentResponse> {
  if (BASE_URL) {
    return apiRequest<PaymentIntentResponse>('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentId }),
    });
  }

  // Realistic processing latency
  await simulateNetworkDelay(null, 900);

  if (shouldSimulateFailure) {
    throw new Error('Card declined by issuing bank (insufficient funds / security block).');
  }

  return {
    paymentId,
    clientSecret: 'cs_confirmed',
    amount: 708,
    currency: 'USD',
    status: 'succeeded',
    plan: 'annual',
    receiptUrl: `https://algofinex.com/receipts/${paymentId}`,
  };
}
