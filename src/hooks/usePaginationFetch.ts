import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

interface PaginationResponse<T> {
  list: T[];
  hasMoreList: boolean;
}

interface UsePaginationFetchOptions {
  baseUrl: string;
  path: string;
  searchParams?: Record<string, string>;
  headers?: Record<string, string>;
  deps?: any[];
  limit?: number;
}

export function usePaginationFetch<T>({
  baseUrl,
  path,
  searchParams = {},
  headers = {},
  deps = [],
  limit = 20,
}: UsePaginationFetchOptions) {
  const [cursor, setCursor] = useState(0);
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error } = useFetch<PaginationResponse<T>>({
    baseUrl,
    path,
    searchParams: {
      ...searchParams,
      cursor: String(cursor),
      limit: String(limit),
    },
    headers,
    deps: [...deps, cursor],
    skip: !hasMore,
  });

  useEffect(() => {
    if (!data) return;
    if (cursor === 0) {
      setItems(data.list || []);
    } else {
      setItems(prev => [...prev, ...(data.list || [])]);
    }
    setHasMore(data.hasMoreList);
  }, [data, cursor]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setCursor(prev => prev + limit);
    }
  };

  const reset = () => {
    setCursor(0);
    setItems([]);
    setHasMore(true);
  };

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
  };
}
