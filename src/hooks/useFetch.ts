import { useState, useEffect, useCallback, type DependencyList } from 'react';

export interface UseFetchOptions {
  baseUrl: string;
  path: string;
  searchParams?: Record<string, string>;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  deps?: DependencyList;
  skip?: boolean;
  auto?: boolean;
}

export function getRequestUrl({
  baseUrl,
  path,
  searchParams,
}: Omit<
  UseFetchOptions,
  'deps' | 'method' | 'body' | 'headers' | 'skip' | 'auto'
>): string {
  const urlObj = new URL(path, baseUrl);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
  }

  return urlObj.toString();
}

export function useFetch<T>(options: UseFetchOptions) {
  const {
    baseUrl,
    path,
    searchParams,
    method = 'GET',
    body,
    headers,
    deps = [],
    skip = false,
    auto = true,
  } = options;

  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (overrideOptions?: Partial<UseFetchOptions>) => {
      setLoading(true);

      setError(null);

      try {
        const url = getRequestUrl({
          baseUrl: overrideOptions?.baseUrl ?? baseUrl,
          path: overrideOptions?.path ?? path,
          searchParams: overrideOptions?.searchParams ?? searchParams,
        });

        const res = await fetch(url, {
          method: overrideOptions?.method ?? method,

          headers: overrideOptions?.headers ?? headers,

          body: overrideOptions?.body
            ? JSON.stringify(overrideOptions.body)
            : body
              ? JSON.stringify(body)
              : undefined,
        });

        if (!res.ok) {
          let errData: Record<string, unknown> = {};
          try {
            errData = await res.json();
          } catch {}
          const errorMsg =
            typeof errData.message === 'string'
              ? errData.message
              : res.statusText;
          const error = new Error(errorMsg);
          (
            error as Error & {
              response?: Record<string, unknown>;
              status?: number;
            }
          ).response = errData;
          (
            error as Error & {
              response?: Record<string, unknown>;
              status?: number;
            }
          ).status = res.status;
          throw error;
        }

        const json = await res.json();

        setData(json.data);
      } catch (err) {
        setData(null);

        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },

    [baseUrl, path, searchParams, method, body, headers]
  );

  useEffect(() => {
    if (skip) return;

    if (auto) {
      fetchData();
    }
  }, [...deps, skip, auto]);

  const refetch = useCallback(
    (overrideOptions?: Partial<UseFetchOptions>) => {
      fetchData(overrideOptions);
    },

    [fetchData]
  );

  return { data, loading, error, refetch };
}
