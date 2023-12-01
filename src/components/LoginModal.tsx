import styled from 'styled-components';
import KakaoLoginButton from '@/components/SocialLoginButton/KakaoLoginButton';

export default function LoginModal() {
  return (
    <Container>
      <KakaoLoginButton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 6rem 4rem 5rem 4rem;
`;
