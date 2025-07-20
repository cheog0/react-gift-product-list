# 요구사항 정리

### 🔐 로그인 기능

- **API 사용**: `POST /login`
- **성공 시 처리**
  - 응답으로 전달받은 `authToken`, `email`, `name` 값을 localStorage에 저장합니다.
    - 저장 키: `'kakaotech/userInfo'`

  - 이후 기능에서 해당 정보를 전역 상태 또는 Context API 등을 통해 활용합니다.

- **에러 처리**
  - 서버로부터 `4XX` 응답이 오면, `react-toastify`를 통해 사용자에게 에러 메시지를 보여줍니다.

---

### 🎁 주문하기 기능

- **제품 정보 조회**
  - **API 사용**: `GET /products/:productId/summary`
  - 요청 성공 시 제품 상세 정보를 화면에 렌더링합니다.
  - 요청 실패(`4XX` 에러) 시:
    - `react-toastify`로 에러 메시지를 사용자에게 알립니다.
    - 선물하기 홈(`/`)으로 리다이렉트합니다.

- **보내는 사람 정보 입력**
  - `userInfo.name`을 "보내는 사람" Input 필드의 기본값으로 사용합니다.

- **주문 요청**
  - **API 사용**: `POST /order`
  - 요청 시 헤더에 **Authorization** 토큰을 포함해야 합니다.
    - `Authorization: Bearer <authToken>`

  - 주문 성공 시:
    - 성공 메시지를 표시하고 홈 화면(`/`)으로 이동합니다.

  - 주문 실패 시:
    - `401 Unauthorized` → 로그인 페이지(`/login`)로 리다이렉트합니다.
    - 기타 오류 → `react-toastify`로 에러 메시지를 표시합니다.

---
