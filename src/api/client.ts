/**
 * ALGOFINEX API CLIENT
 * Clean abstraction layer separating frontend components from backend infrastructure.
 * Configured via VITE_API_BASE_URL environment variable.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiClientOptions extends RequestInit {
  params?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number = 500, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Universal request wrapper with error parsing
 */
export async function apiRequest<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  const { params, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(customConfig.headers || {}),
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        data?.message || `HTTP Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err?.message || 'Network connectivity error', 0);
  }
}

/**
 * Helper to simulate realistic async network round-trip for development mock state
 */
export async function simulateNetworkDelay<T>(data: T, delayMs = 280): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
