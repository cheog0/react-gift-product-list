import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { NavigationHeader } from '@/components/shared/layout';
import { LoginForm } from '@/components/features/auth';
import { theme } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetch } from '@/hooks/useFetch';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, error, refetch } = useFetch<any>({
    baseUrl: apiUrl,
    path: '/api/login',
    method: 'POST',
    auto: false,
  });

  const handleRedirect = (replace: boolean = true) => {
    const from = location.state?.from || '/';
    navigate(from, { replace });
  };

  const handleLogin = (email: string, password: string) => {
    refetch({
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
    });
  };

  useEffect(() => {
    if (error) {
      const status = (error as Error & { status?: number }).status;
      const msg =
        (status === 400 && error.message === 'Bad Request') ||
        error.message?.includes('kakao.com') ||
        error.message?.includes('이메일')
          ? '@kakao.com 이메일 주소만 가능합니다.'
          : error.message;
      toast.error(msg);
      return;
    }
    if (data) {
      login({
        authToken: data.authToken ?? data.data?.authToken,
        email: data.email ?? data.data?.email,
        name: data.name ?? data.data?.name,
      });
      handleRedirect(true);
    }
  }, [data, error]);

  return (
    <AppContainer>
      <MobileViewport>
        <NavigationHeader
          title="선물하기"
          onBackClick={() => handleRedirect(false)}
        />
        <LoginForm onSubmit={handleLogin} />
      </MobileViewport>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray200};
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.spacing4};

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  background: ${theme.colors.default};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;
