import { useFetch } from './useFetch';
import type { Product } from '@/types';

export function useRankingProducts(targetType: string, rankType: string) {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const url = new URL('/api/products/ranking', apiUrl);
  url.searchParams.set('targetType', targetType);
  url.searchParams.set('rankType', rankType);
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(url.toString(), [targetType, rankType]);
  return { products: products || [], loading, error };
}
