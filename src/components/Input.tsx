import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface InputProps {
  type: 'text' | 'email' | 'tel' | 'url' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function Input({
  type = 'text',
  value,
  onChange,
  label,
}: InputProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput type={type} value={value} onChange={onChange} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 100%;
      flex-direction: column;
      align-items: normal;
      gap: 0.4rem;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
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
