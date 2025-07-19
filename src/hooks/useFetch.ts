import { useState, useEffect } from 'react';

export interface UseFetchOptions {
  baseUrl: string;
  path: string;
  searchParams?: Record<string, string>;
  deps?: any[];
}

export function getRequestUrl({
  baseUrl,
  path,
  searchParams,
}: Omit<UseFetchOptions, 'deps'>): string {
  const urlObj = new URL(path, baseUrl);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
  }
  return urlObj.toString();
}

export function useFetch<T>(options: UseFetchOptions) {
  const { baseUrl, path, searchParams, deps = [] } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = getRequestUrl({ baseUrl, path, searchParams });
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setData(data.data);
      })
      .catch(err => {
        setData(null);
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
