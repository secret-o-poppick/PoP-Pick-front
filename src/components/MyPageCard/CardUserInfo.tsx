import styled from 'styled-components';

interface CardUserInfoProps {
  children: React.ReactNode;
}

export default function CardUserInfo({ children }: CardUserInfoProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
