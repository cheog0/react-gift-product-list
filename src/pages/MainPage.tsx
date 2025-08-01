import { useSearchParams, useNavigate, generatePath } from 'react-router-dom';
import { NavigationHeader } from '@/components/shared/layout';
import {
  FriendSelector,
  GiftThemeGrid,
  PromotionBanner,
  RealTimeRanking,
  ProductCard,
} from '@/components/features/gift-order';
import { Spinner } from '@/components/shared/ui';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useThemes } from '@/hooks/useThemes';
import { useRankingProducts } from '@/hooks/useRankingProducts';
import type { GiftTheme } from '@/types';

const DEFAULT_TARGET = 'ALL';
const DEFAULT_RANK = 'MANY_WISH';
const THEME_PATH = '/themes/:themeId';

function ThemesSection() {
  const { themes, loading, error } = useThemes();
  const navigate = useNavigate();
  if (loading) return <Spinner />;
  if (error) return null;
  if (themes.length === 0) return null;
  const handleThemeClick = (theme: GiftTheme) => {
    navigate(generatePath(THEME_PATH, { themeId: String(theme.themeId) }));
  };
  return <GiftThemeGrid themes={themes} onThemeClick={handleThemeClick} />;
}

const RankingLoadingContainer = styled.div`
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.default};
  border-radius: 16px;
  margin: 0 0 24px 0;
`;

function RankingSection({
  targetType,
  rankType,
  onFilterChange,
}: {
  targetType: string;
  rankType: string;
  onFilterChange: (nextTarget: string, nextRank: string) => void;
}) {
  const { products, loading, error } = useRankingProducts(targetType, rankType);

  if (loading)
    return (
      <RankingLoadingContainer>
        <Spinner />
      </RankingLoadingContainer>
    );
  if (error) return null;

  return (
    <RealTimeRanking
      products={products}
      ProductCardComponent={ProductCard}
      targetType={targetType}
      rankType={rankType}
      onFilterChange={onFilterChange}
    />
  );
}

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetType = searchParams.get('targetType') || DEFAULT_TARGET;
  const rankType = searchParams.get('rankType') || DEFAULT_RANK;

  const handleAddFriend = (): void => {};

  const handleRankingFilterChange = (nextTarget: string, nextRank: string) => {
    setSearchParams(
      { targetType: nextTarget, rankType: nextRank },
      { replace: true }
    );
  };

  return (
    <AppContainer>
      <MobileViewport>
        <NavigationHeader title="선물하기" />
        <FriendSelector onAddFriend={handleAddFriend} />
        <ThemesSection />
        <PromotionBanner
          subtitle="카카오테크 캠퍼스 3기 여러분"
          title="프론트엔드 2단계 과제 화이팅!"
        />
        <RankingSection
          targetType={targetType}
          rankType={rankType}
          onFilterChange={handleRankingFilterChange}
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
  background: ${theme.colors.fill};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;
