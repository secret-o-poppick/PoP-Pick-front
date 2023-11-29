import React from "react";
import styled from 'styled-components';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep3: React.FC<StoreCreateStepProps> = (props) => {
    return (
        <Step>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Step>
    );
};

const Step = styled.div`
display:flex
`

export default StoreCreateStep3;
