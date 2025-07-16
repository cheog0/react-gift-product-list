import { useFetch } from './useFetch';
import type { GiftTheme } from '@/types';

export function useThemes() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: themes,
    loading,
    error,
  } = useFetch<GiftTheme[]>(`${apiUrl}/api/themes`, []);
  return { themes: themes || [], loading, error };
}
