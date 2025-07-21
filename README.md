## 테마 상품 목록 페이지

### ✅ 구현 요구사항

- `Intersection Observer API`를 사용해 **무한 스크롤 페이지네이션** 구현
- `Suspense`, `ErrorBoundary` **사용 금지**
- **일관된 코드 스타일**, **기능 단위 커밋**
- **재사용성** 고려한 컴포넌트 및 로직 설계

### 🧩 주요 기능

- `/api/themes/:themeId/info` → 테마 정보 (히어로 영역)
  - `404` 응답 시 → **선물하기 홈으로 이동**

- `/api/themes/:themeId/products` → 상품 리스트 불러오기 (무한 스크롤)
  - 상품이 없을 경우 → **빈 페이지 표시**

---
