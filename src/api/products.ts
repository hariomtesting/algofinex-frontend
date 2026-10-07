import { Product, ProductCategory } from '../types/api';
import { apiRequest, simulateNetworkDelay } from './client';
import { MOCK_PRODUCTS } from '../mock/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(category?: ProductCategory): Promise<Product[]> {
  if (BASE_URL) {
    return apiRequest<Product[]>('/products', {
      params: category ? { category } : undefined,
    });
  }

  await simulateNetworkDelay(null, 250);
  if (!category) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (BASE_URL) {
    return apiRequest<Product>(`/products/${slug}`);
  }

  await simulateNetworkDelay(null, 200);
  const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}
