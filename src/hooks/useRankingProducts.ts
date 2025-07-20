import { useFetch } from './useFetch';
import type { Product } from '@/types';

export function useRankingProducts(targetType: string, rankType: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>({
    baseUrl: apiUrl,
    path: '/api/products/ranking',
    searchParams: { targetType, rankType },
    deps: [targetType, rankType],
  });
  return { products: products || [], loading, error };
}
