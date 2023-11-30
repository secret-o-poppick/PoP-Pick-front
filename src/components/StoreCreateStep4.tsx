import React, { useState } from "react";
import styled from 'styled-components';
import Input from '@/components/Input';
import RadioInput from '@/components/Radio';
interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep4: React.FC<StoreCreateStepProps> = () => {
    const [adult, setAdult] = useState<string>('');
    const [isFree, setIsFree] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    return (
        <>
            <StyledContent>
                <StyledInput>
                    <RadioInput
                        name='adult'
                        options={[
                            { label: '필요', value: 'required' },
                            { label: '불필요', value: 'notRequired' },
                        ]}
                        selectedValue={adult}
                        onChange={(value) => setAdult(value)}
                        label='성인인증'
                    />
                </StyledInput>
                <StyledInput>
                    <RadioInput
                        name='isFree'
                        options={[
                            { label: '유료', value: 'paid' },
                            { label: '무료', value: 'free' },
                        ]}
                        selectedValue={isFree}
                        onChange={(value) => setIsFree(value)}
                        label='요금'
                    />
                </StyledInput>
                <StyledInput>
                    <Input value={cost} type='number' onChange={(e) => setCost(e.target.value)} label='가격' />
                </StyledInput>
            </StyledContent>
        </>
    );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  height:500px;
`;

const StyledInput = styled.div`
  height: 5em;
  display: flex;
  align-content: center;
`;
export default StoreCreateStep4;
