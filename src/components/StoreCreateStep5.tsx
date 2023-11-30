import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep5: React.FC<StoreCreateStepProps> = () => {
    const [social, setSocial] = useState('');
    const [promotion, setPromotion] = useState('');
    const [desc, setDesc] = useState('');
    const [etc, setEtc] = useState('');

    return (
        <>
            <StyledContent>
                <StyledInput>
                    <InputStyled value={social} type='text' onChange={(e) => setSocial(e.target.value)} label='SNS(공식페이지)' />
                </StyledInput>
                <StyledInput>
                    <InputStyled value={promotion} type='text' onChange={(e) => setPromotion(e.target.value)} label='이벤트/프로모션' />
                </StyledInput>
                <StyledInput>
                    <StyledInputRow>
                        <label>설명글</label>
                        <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </StyledInputRow>
                </StyledInput>
                <StyledInput>
                    <InputStyled value={etc} type='text' onChange={(e) => setEtc(e.target.value)} label='기타' />
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
    font-family: Malgun Gothic;
`;

export default StoreCreateStep5;
