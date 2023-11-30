import React from 'react';
import styled from 'styled-components';
import DragAndDrop from '@/components/DragAndDrop'
import { IFileTypes } from '@/types/index';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
    uploadedImages: IFileTypes[];
    setUploadedImages: React.Dispatch<React.SetStateAction<IFileTypes[]>>;
}

const StoreCreateStep2: React.FC<StoreCreateStepProps> = (props) => {

    return (
        <>
            <StyledContent>

                <DragAndDrop
                    uploadedImages={props.uploadedImages}
                    setUploadedImages={props.setUploadedImages}
                />
            </StyledContent>

        </>
    );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  height:500px;
`;

export default StoreCreateStep2;