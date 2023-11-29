import React from 'react';
import styled from 'styled-components';
import { ProgressBar, Step } from 'react-step-progress-bar';

interface StepProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = (props) => {
    return (
        <>
            <StyledProgressBar
                value={50}
                percent={(props.step + 1) * 20}
                filledBackground='#EB5B42'
                height='2px'
            >
                {[1, 2, 3, 4, 5].map((index) => (
                    <StyledStep key={index} transition='scale' >
                        {({ accomplished }: { accomplished: boolean }) => (
                            <StyledEachBar accomplished={accomplished}>
                                {index}
                            </StyledEachBar>
                        )}
                    </StyledStep>
                ))}
            </StyledProgressBar>
        </>
    );
};

const StyledProgressBar = styled(ProgressBar)`
display: flex;
background-color: orange;
width: 200px;
height:1px;
`

const StyledStep = styled(Step)`
    display: flex;
    width:200px;
    flex-direction: row;
    display: inline-block;

   
`
const StyledEachBar = styled.div<{ accomplished: boolean }>`
    height: 20px;
    width: 20px;
    font-size: 12px;
    background-color: ${(props) => (props.accomplished ? '#664de5' : null)};
    border: 1px solid lightgray;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    /* &:hover {
        cursor: pointer;
    }

    &:not(:last-child) {
        margin-right: 10px;
    }

    &:last-child {
        margin-right: 0;
    }

    &:not(.completed) {
        opacity: 0.6;
    }

    &:not(.completed):hover {
        opacity: 0.8;
    } */
`;

export default StepProgressBar;
