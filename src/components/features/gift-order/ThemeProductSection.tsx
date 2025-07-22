import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getAuthTokenFromSession, BASE_URL } from '@/constants/api';
import { Spinner } from '@/components/shared/ui/Spinner';
import { Loader } from '@/components/shared/ui/Loader';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { Product } from '@/types';

interface ThemeProductSectionProps {
  themeId: number;
  onProductClick: (product: Product) => void;
}

const LIMIT = 20;

type ProductListResponse = {
  list: Product[];
  hasMoreList: boolean;
};

export function ThemeProductSection({
  themeId,
  onProductClick,
}: ThemeProductSectionProps) {
  const token = getAuthTokenFromSession();
  const [cursor, setCursor] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error } = useFetch<ProductListResponse>({
    baseUrl: BASE_URL,
    path: `/api/themes/${themeId}/products`,
    searchParams: { cursor: String(cursor), limit: String(LIMIT) },
    headers: { Authorization: token },
    deps: [themeId, cursor],
    skip: !hasMore,
  });

  useEffect(() => {
    if (!data) return;
    if (cursor === 0) {
      setProducts(data.list || []);
    } else {
      setProducts(prev => [...prev, ...(data.list || [])]);
    }
    setHasMore(data.hasMoreList);
  }, [data, cursor]);

  const handleIntersect = () => {
    if (hasMore && !loading) {
      setCursor(prev => prev + LIMIT);
    }
  };

  if (loading && products.length === 0) return <Spinner />;
  if (error) return <ProductContainer>에러가 발생했습니다.</ProductContainer>;
  if (!loading && products.length === 0)
    return <ProductContainer>상품이 없습니다.</ProductContainer>;

  return (
    <ProductContainer>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} onClick={() => onProductClick(product)}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <ProductInfo>
              <BrandName>{product.brandInfo.name}</BrandName>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {product.price.sellingPrice.toLocaleString()}원
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
      <Loader
        onView={handleIntersect}
        enabled={hasMore && !loading}
        style={{ height: 20 }}
      />
      {loading && products.length > 0 && <LoadingText>로딩 중...</LoadingText>}
      {!hasMore && products.length > 0 && (
        <EndText>모든 상품을 불러왔어요!</EndText>
      )}
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  padding: ${theme.spacing.spacing4};
  background: ${theme.colors.default};
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing4};

  @media (max-width: 900px) {
    gap: ${theme.spacing.spacing2};
  }
  @media (max-width: 600px) {
    gap: ${theme.spacing.spacing1};
  }
`;

const ProductCard = styled.div`
  background: ${theme.colors.default};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray200};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.spacing3};
`;

const BrandName = styled.div`
  font-size: ${theme.typography.label2Regular.fontSize};
  color: ${theme.colors.textSub};
  margin-bottom: ${theme.spacing.spacing1};
`;

const ProductName = styled.div`
  font-size: ${theme.typography.body2Bold.fontSize};
  font-weight: ${theme.typography.body2Bold.fontWeight};
  color: ${theme.colors.textDefault};
  margin-bottom: ${theme.spacing.spacing2};
  line-height: 1.3;
`;

const ProductPrice = styled.div`
  font-size: ${theme.typography.body1Bold.fontSize};
  font-weight: ${theme.typography.body1Bold.fontWeight};
  color: ${theme.colors.gray1000};
`;

const LoadingText = styled.div`
  text-align: center;
  color: ${theme.colors.textSub};
  margin: 16px 0;
`;

const EndText = styled.div`
  text-align: center;
  color: ${theme.colors.textSub};
  margin: 16px 0;
`;
