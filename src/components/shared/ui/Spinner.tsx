import styled from '@emotion/styled';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0 0;
  margin-top: 130px;
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #000;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerCircle />
    </SpinnerWrapper>
  );
}
