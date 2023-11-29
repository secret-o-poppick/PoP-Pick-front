import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface LabelTextProps {
  label?: string;
  children: string;
}

export default function LabelText({ label, children }: LabelTextProps) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Text>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
  margin: 1rem 0;
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      flex-direction: column;
      align-items: normal;
      gap: 0.4rem;
    }
  }
`;

const Label = styled.label`
  width: 150px;
  font-size: 1rem;
  font-weight: 700;
  color: #334155;

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 100%;
      font-size: 0.8rem;
    }
  }
`;

const Text = styled.label`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #334155;
`;
