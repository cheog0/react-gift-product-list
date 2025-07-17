import { useState, useEffect } from 'react';

export function useFetch<T>(
  url: string,
  deps?: any[]
): { data: T | null; loading: boolean; error: Error | null };
export function useFetch<T>(
  options: {
    baseUrl: string;
    path: string;
    searchParams?: Record<string, string>;
  },
  deps?: any[]
): { data: T | null; loading: boolean; error: Error | null };

// 구현
export function useFetch<T>(
  urlOrOptions:
    | string
    | { baseUrl: string; path: string; searchParams?: Record<string, string> },
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url: string;
    if (typeof urlOrOptions === 'string') {
      url = urlOrOptions;
    } else {
      const { baseUrl, path, searchParams } = urlOrOptions;
      const urlObj = new URL(path, baseUrl);
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          urlObj.searchParams.set(key, value);
        });
      }
      url = urlObj.toString();
    }
    fetch(url)
      .then(res => res.json())
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
  }, deps);

  return { data, loading, error };
}
