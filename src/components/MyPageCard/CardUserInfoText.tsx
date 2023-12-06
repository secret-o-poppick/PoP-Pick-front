import styled from 'styled-components';

interface CardUserInfoTextProps {
  children: string;
}

export default function CardUserInfoText({ children }: CardUserInfoTextProps) {
  return <P>{children}</P>;
}

const P = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;
