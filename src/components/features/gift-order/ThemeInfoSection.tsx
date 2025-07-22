import { Spinner } from '@/components/shared/ui/Spinner';
import { getAuthTokenFromSession, BASE_URL } from '@/constants/api';
import { useFetch } from '@/hooks/useFetch';
import type { ThemeInfo } from '@/types';
import styled from '@emotion/styled';
import { theme as appTheme } from '@/styles/theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isFetchError } from '@/hooks/useFetch';

export function ThemeInfoSection({ themeId }: { themeId: number }) {
  const navigate = useNavigate();
  const token = getAuthTokenFromSession();
  const {
    data: theme,
    loading,
    error,
  } = useFetch<ThemeInfo>({
    baseUrl: BASE_URL,
    path: `/api/themes/${themeId}/info`,
    headers: { Authorization: token },
    deps: [themeId],
  });

  useEffect(() => {
    if (isFetchError(error) && error.status === 404) {
      navigate('/', { replace: true });
    }
  }, [error, navigate]);

  if (loading) return <Spinner />;
  if (error) return <InfoContainer>에러가 발생했습니다.</InfoContainer>;
  if (!theme) return <InfoContainer>데이터 없음</InfoContainer>;

  return (
    <InfoContainer style={{ background: theme.backgroundColor }}>
      <InfoTitle>{theme.name}</InfoTitle>
      <InfoSubtitle>{theme.title}</InfoSubtitle>
      <InfoDescription>{theme.description}</InfoDescription>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  padding: ${appTheme.spacing.spacing6} ${appTheme.spacing.spacing4}
    ${appTheme.spacing.spacing8};
  color: white;
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const InfoTitle = styled.h1`
  font-size: ${appTheme.typography.title1Bold.fontSize};
  font-weight: ${appTheme.typography.title1Bold.fontWeight};
  margin-bottom: ${appTheme.spacing.spacing2};
  position: relative;
  z-index: 1;
`;

const InfoSubtitle = styled.h2`
  font-size: ${appTheme.typography.subtitle1Bold.fontSize};
  font-weight: ${appTheme.typography.subtitle1Bold.fontWeight};
  margin-bottom: ${appTheme.spacing.spacing2};
  position: relative;
  z-index: 1;
`;

const InfoDescription = styled.p`
  font-size: ${appTheme.typography.body2Regular.fontSize};
  opacity: 0.9;
  position: relative;
  z-index: 1;
  margin: 0;
`;
