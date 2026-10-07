import { User } from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';
import { MOCK_CURRENT_USER } from '../mock/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginCredentials {
  email: string;
  password?: string;
  tradingViewHandle?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password?: string;
  tradingViewHandle: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  if (BASE_URL) {
    return apiRequest<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Simulated Mock Response
  await simulateNetworkDelay(null, 400);
  if (!credentials.email || !credentials.email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  return {
    ...MOCK_CURRENT_USER,
    email: credentials.email,
    tradingViewHandle: credentials.tradingViewHandle || MOCK_CURRENT_USER.tradingViewHandle,
  };
}

export async function signup(data: SignupData): Promise<User> {
  if (BASE_URL) {
    return apiRequest<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  await simulateNetworkDelay(null, 500);
  if (!data.email.includes('@')) {
    throw new Error('Valid email required for account activation.');
  }
  return {
    ...MOCK_CURRENT_USER,
    name: data.name,
    email: data.email,
    tradingViewHandle: data.tradingViewHandle,
  };
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  if (BASE_URL) {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  await simulateNetworkDelay(null, 350);
  if (!email.includes('@')) {
    throw new Error('Valid email address required.');
  }
  return {
    success: true,
    message: `A secure verification token has been dispatched to ${email}.`,
  };
}

export async function verifyTradingViewHandle(handle: string): Promise<{ valid: boolean; handle: string }> {
  if (BASE_URL) {
    return apiRequest('/auth/verify-tradingview', {
      method: 'POST',
      body: JSON.stringify({ handle }),
    });
  }

  await simulateNetworkDelay(null, 300);
  const cleanHandle = handle.trim();
  if (cleanHandle.length < 3) {
    throw new Error('TradingView handle must be at least 3 characters.');
  }
  return { valid: true, handle: cleanHandle };
}

export async function getCurrentUser(): Promise<User> {
  if (BASE_URL) {
    return apiRequest<User>('/auth/me');
  }
  return simulateNetworkDelay(MOCK_CURRENT_USER, 150);
}
