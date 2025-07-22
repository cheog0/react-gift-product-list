import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import type { JSX } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const redirectUrl = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${redirectUrl}`} replace />;
  }
  return children;
}
