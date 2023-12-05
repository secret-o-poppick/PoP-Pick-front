import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import RadioInput from '@/components/Radio';

import { useCreateStoreStep1Context } from '@/context/StoreContext';

interface StoreCreateStepProps {
  handleChange: (
    input: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const StoreCreateStep1: React.FC<StoreCreateStepProps> = () => {
  const {
    brand,
    category,
    eventName,
    categoryHandler,
    eventNameHandler,
    brandHandler,
  } = useCreateStoreStep1Context();

  return (
    <>
      <StyledContent>
        <StyledInput>
          <RadioInput
            name='category'
            options={[
              { label: '전시', value: 'exhibition' },
              { label: '팝업', value: 'popup' },
            ]}
            selectedValue={category}
            onChange={(value) => categoryHandler(value)}
            label='분류 카테고리'
          />
        </StyledInput>
        <StyledInput>
          <Input
            value={eventName}
            type='text'
            onChange={eventNameHandler}
            label='행사명'
          />
        </StyledInput>
        <StyledInput>
          <Input
            value={brand}
            type='text'
            onChange={brandHandler}
            label='주최 브랜드명'
          />
        </StyledInput>
      </StyledContent>
    </>
  );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const StyledInput = styled.div`
  height: 5em;
  display: flex;
  align-content: center;
`;

export default StoreCreateStep1;
