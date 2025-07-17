import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEY } from '@/constants/storage';

interface User {
  authToken: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY.USER_INFO);
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    sessionStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY.USER_INFO);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY.USER_INFO && event.newValue === null) {
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
