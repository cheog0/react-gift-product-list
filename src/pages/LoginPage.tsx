import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { NavigationHeader } from '@/components/shared/layout';
import { LoginForm } from '@/components/features/auth';
import { theme } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (replace: boolean = true) => {
    const from = location.state?.from || '/';
    navigate(from, { replace });
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.message || '@kakao.com 이메일 주소만 가능합니다.');
        return;
      }
      const data = await res.json();
      login({
        authToken: data.data.authToken,
        email: data.data.email,
        name: data.data.name,
      });
      handleRedirect(true);
    } catch (e) {
      toast.error('네트워크 오류가 발생했습니다.');
    }
  };

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
