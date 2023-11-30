import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep5: React.FC<StoreCreateStepProps> = () => {
    const [brand, setBrand] = useState('');

    return (
        <>
            <StyledContent>
                <StyledInput>
                    <InputStyled value={brand} type='text' onChange={(e) => setBrand(e.target.value)} label='SNS(공식페이지)' />
                </StyledInput>
                <StyledInput>
                    <InputStyled value={brand} type='text' onChange={(e) => setBrand(e.target.value)} label='이벤트/프로모션' />
                </StyledInput>
                <StyledInput>
                    <StyledInputRow>
                        <label>설명글</label>
                        <StyledTextArea />
                    </StyledInputRow>
                </StyledInput>
                <StyledInput>
                    <InputStyled value={brand} type='text' onChange={(e) => setBrand(e.target.value)} label='기타' />
                </StyledInput>
            </StyledContent>
        </>
    );
};

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    row-gap: 3em;
`;

const StyledInput = styled.div`
    /* height: 5em; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
`;

const StyledInputRow = styled(StyledInput)`
    flex-direction: row;
    width:100%;

    & label {
        color:#334155;
        width: 218px;
        font-weight:700;
    }
`;

const InputStyled = styled(Input)`
    width: 100%;
`;

const StyledTextArea = styled.textarea`
    resize: none;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
`;

export default StoreCreateStep5;
