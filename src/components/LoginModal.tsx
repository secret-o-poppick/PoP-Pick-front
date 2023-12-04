import styled from 'styled-components';
import KakaoLoginButton from '@/components/SocialLoginButton/KakaoLoginButton';

export default function LoginModal() {
  return (
    <Container>
      <H1>소셜 로그인</H1>
      <KakaoLoginButton />
    </Container>
  );
}

const H1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem 3rem 2rem;
`;
