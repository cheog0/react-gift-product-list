import { useFetch } from './useFetch';
import type { Product } from '@/types';

export function useRankingProducts(targetType: string, rankType: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}/api/products/ranking?targetType=${targetType}&rankType=${rankType}`;
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(url, [targetType, rankType]);
  return { products: products || [], loading, error };
}
