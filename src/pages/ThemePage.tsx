import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { NavigationHeader } from '@/components/shared/layout';
import { ThemeInfoSection } from '@/components/features/gift-order/ThemeInfoSection';
import { ThemeProductSection } from '@/components/features/gift-order/ThemeProductSection';
import type { Product } from '@/types';

export default function ThemePage() {
  const navigate = useNavigate();
  const { themeId = '' } = useParams();
  const numericThemeId = Number(themeId);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/order/${product.id}`);
  };

  return (
    <AppContainer>
      <MobileViewport>
        <NavigationHeader title="선물하기" onBackClick={handleBackClick} />
        <ThemeInfoSection themeId={numericThemeId} />
        <ThemeProductSection
          themeId={numericThemeId}
          onProductClick={handleProductClick}
        />
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
