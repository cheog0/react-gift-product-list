import { useState, useEffect } from 'react';
import type { GiftTheme } from '@/types';

export function useThemes() {
  const [themes, setThemes] = useState<GiftTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoading(true);
    setError(false);
    fetch(`${apiUrl}/api/themes`)
      .then(res => res.json())
      .then(data => {
        setThemes(data.data);
        setLoading(false);
      })
      .catch(() => {
        setThemes([]);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { themes, loading, error };
}
