import styled from 'styled-components';
import { SelectBoxOption } from '@/types';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface SelectBoxProps {
  options: SelectBoxOption[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
  label?: string;
  full?: boolean;
}

export default function SelectBox({
  options,
  onChange,
  defaultValue,
  label,
  full = false,
}: SelectBoxProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledSelect
        onChange={onChange}
        defaultValue={defaultValue}
        $full={full}
      >
        {options.map((option, index) => (
          <SelectOption key={index} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </StyledSelect>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const StyledSelect = styled.select<{ $full: boolean }>`
  padding: 0.2rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${({ $full }) => $full && '100%'};
`;

const SelectOption = styled.option``;
