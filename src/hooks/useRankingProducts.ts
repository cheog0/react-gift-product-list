import { useState, useEffect } from 'react';
import type { Product } from '@/types';

export function useRankingProducts(targetType: string, rankType: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoading(true);
    setError(false);
    fetch(
      `${apiUrl}/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
    )
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setError(true);
        setLoading(false);
      });
  }, [targetType, rankType]);

  return { products, loading, error };
}
