import React, {
} from 'react';
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
        < >
            <DragAndDrop
                uploadedImages={props.uploadedImages}
                setUploadedImages={props.setUploadedImages}
            />
        </>
    );
}

export default StoreCreateStep2;