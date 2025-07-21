export const BASE_URL = import.meta.env.VITE_API_URL ?? '/';

export const SESSION_STORAGE_KEY = 'userInfo';

export const getThemeInfoPath = (themeId: string | number): string =>
  `/api/themes/${themeId}/info`;
export const getThemeInfoUrl = (themeId: string | number): string =>
  `${BASE_URL}${getThemeInfoPath(themeId)}`;

export const getThemeProductsPath = (themeId: string | number): string =>
  `/api/themes/${themeId}/products`;
export const getThemeProductsUrl = (themeId: string | number): string =>
  `${BASE_URL}${getThemeProductsPath(themeId)}`;

export function getAuthTokenFromSession(): string {
  const userInfo = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!userInfo) return '';
  try {
    return JSON.parse(userInfo).authToken || '';
  } catch {
    return '';
  }
}
