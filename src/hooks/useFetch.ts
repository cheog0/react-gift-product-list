import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
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
