import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface ButtonGroupProps {
  children: React.ReactNode;
}

export default function ButtonGroup({ children }: ButtonGroupProps) {
  return <StyledButtonGroup>{children}</StyledButtonGroup>;
}

const StyledButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.8rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      flex-direction: column;
      gap: 0.4rem;
    }
  }
`;
