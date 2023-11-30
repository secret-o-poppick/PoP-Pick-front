import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface InputProps {
  type: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number';
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = 'text',
  value,
  onChange,
  onKeyDown,
  label,
  placeholder,
  readonly = false,
  onClick
}: InputProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput type={type} value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} readOnly={readonly} onClick={onClick} />
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
  border:1px solid #888;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: text;
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
