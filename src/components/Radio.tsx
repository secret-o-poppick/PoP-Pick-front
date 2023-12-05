import React from 'react';
import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface RadioInputProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RadioInput({
  name,
  options,
  selectedValue,
  onChange,
  label
}: RadioInputProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <RadioGroup>
        {options.map((option, index) => (
          <RadioLabel key={option.value}>
            <RadioInputStyled
              type='radio'
              name={name}
              value={option.value}
              checked={selectedValue === option.value || (index === 0 && selectedValue === '')}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
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

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RadioInputStyled = styled.input`
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
