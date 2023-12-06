import { IconType } from 'react-icons';
import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface CardIconProps {
  icon: IconType;
  count?: number;
}
export default function CardIcon({ icon: Icon, count }: CardIconProps) {
  return (
    <Container>
      <Icon />
      <IconCount>{count}</IconCount>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: row;
  }
`;

const IconCount = styled.p`
  font-size: 12px;
`;
