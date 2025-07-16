import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { useState } from 'react';

interface RealTimeRankingProps {
  products: Product[];
  ProductCardComponent?: typeof ProductCard;
  targetType: string;
  rankType: string;
  onFilterChange: (nextTarget: string, nextRank: string) => void;
}

const INITIAL_PRODUCT_COUNT = 6;

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
}

const targetFilters: FilterOption[] = [
  { id: 'ALL', label: '전체', icon: 'ALL' },
  { id: 'FEMALE', label: '여성이', icon: '👩🏻' },
  { id: 'MALE', label: '남성이', icon: '👨🏻' },
  { id: 'TEEN', label: '청소년이', icon: '👦🏻' },
];

const categoryFilters: FilterOption[] = [
  { id: 'MANY_WISH', label: '받고 싶어한' },
  { id: 'MANY_RECEIVE', label: '많이 선물한' },
  { id: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];

export function RealTimeRanking({
  products,
  ProductCardComponent = ProductCard,
  targetType,
  rankType,
  onFilterChange,
}: RealTimeRankingProps) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const selectedTargetId = targetType || 'ALL';
  const selectedCategoryId = rankType || 'MANY_WISH';

  const displayedProducts = showAll
    ? products
    : products.slice(0, INITIAL_PRODUCT_COUNT);

  const handleTargetFilterChange = (id: string) => {
    onFilterChange(id, selectedCategoryId);
  };

  const handleCategoryFilterChange = (id: string) => {
    onFilterChange(selectedTargetId, id);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/order/${product.id}`);
  };

  return (
    <Container>
      <SectionTitle>실시간 급상승 선물랭킹</SectionTitle>

      <FilterContainer>
        {targetFilters.map(filter => (
          <FilterTab
            key={filter.id}
            isActive={selectedTargetId === filter.id}
            onClick={() => handleTargetFilterChange(filter.id)}
          >
            <ProfileIcon isActive={selectedTargetId === filter.id}>
              {filter.icon}
            </ProfileIcon>
            <FilterLabel isActive={selectedTargetId === filter.id}>
              {filter.label}
            </FilterLabel>
          </FilterTab>
        ))}
      </FilterContainer>

      <SortContainer>
        {categoryFilters.map(category => (
          <SortButton
            key={category.id}
            isActive={selectedCategoryId === category.id}
            onClick={() => handleCategoryFilterChange(category.id)}
          >
            {category.label}
          </SortButton>
        ))}
      </SortContainer>

      <ProductGrid>
        {displayedProducts.length === 0 ? (
          <EmptyMessage>상품이 없습니다.</EmptyMessage>
        ) : (
          displayedProducts.map((product, index) => (
            <ProductCardComponent
              key={product.id}
              product={product}
              rank={index + 1}
              onClick={handleProductClick}
              showRankBadge
            />
          ))
        )}
      </ProductGrid>

      {displayedProducts.length > 0 && (
        <MoreButton onClick={() => setShowAll(!showAll)}>
          {showAll ? '접기' : '더보기'}
        </MoreButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const FilterTab = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing3};
  border: none;
  border-radius: 12px;
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

const ProfileIcon = styled.div<{ isActive: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 40%;
  background: ${props =>
    props.isActive ? theme.colors.blue700 : theme.colors.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.isActive ? 'white' : theme.colors.blue500)};
`;

const FilterLabel = styled.span<{ isActive: boolean }>`
  font-size: ${theme.typography.label1Regular.fontSize};
`;

const SortContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: ${theme.colors.blue200};
  border-radius: 8px;
  padding: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const SortButton = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  color: ${props =>
    props.isActive ? theme.colors.blue800 : theme.colors.blue600};
  font-size: ${theme.typography.label1Regular.fontSize};
  font-weight: ${props =>
    props.isActive
      ? theme.typography.body1Bold.fontWeight
      : theme.typography.label1Regular.fontWeight};
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  border-radius: 6px;
  transition: all 0.2s ease;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  width: 100%;
  color: ${theme.colors.textDefault};
  grid-column: 1 / -1;
`;

const MoreButton = styled.button`
  width: 70%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.borderDefault};
  border-radius: 6px;
  background: ${theme.colors.default};
  color: ${theme.colors.textDefault};
  font-size: ${theme.typography.body1Regular.fontSize};
  transition: all 0.2s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background: ${theme.colors.gray100};
    border-color: ${theme.colors.gray400};
  }
`;
