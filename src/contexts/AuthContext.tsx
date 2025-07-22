import React, { createContext, useContext } from 'react';
import { STORAGE_KEY } from '@/constants/storage';
import { useStorageState } from '@/hooks/useStorageState';

interface User {
  authToken: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  getAuthToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useStorageState<User | null>(
    STORAGE_KEY.USER_INFO,
    null
  );

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const getAuthToken = (): string | null => {
    const stored = sessionStorage.getItem(STORAGE_KEY.USER_INFO);
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        return parsedUser?.authToken || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
