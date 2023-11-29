import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import RadioInput from '@/components/Radio';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep1: React.FC<StoreCreateStepProps> = (props) => {
    const [category, setCategory] = useState<string>('');
    const [eventName, setEventName] = useState('');
    const [brand, setBrand] = useState('');

    return (
        <>
            <StyledContent>
                <StyledInput>
                    <RadioInput
                        name="category"
                        options={[
                            { label: '전시', value: 'exhibition' },
                            { label: '팝업', value: 'popup' },
                        ]}
                        selectedValue={category}
                        onChange={(value) => setCategory(value)}
                        label="분류 카테고리"
                    />
                </StyledInput>
                <StyledInput>
                    <Input value={eventName} type='text' onChange={(e) => setEventName(e.target.value)} label='행사명' />
                </StyledInput>
                <StyledInput>
                    <Input value={brand} type='text' onChange={(e) => setBrand(e.target.value)} label='주최 브랜드명' />
                </StyledInput>
            </StyledContent>
        </>
    );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.div`
  height: 5em;
  display: flex;
    align-content: center;
`;

export default StoreCreateStep1;
