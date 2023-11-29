import React, {
} from 'react';
import DragAndDrop from '@/components/DragAndDrop'

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep2: React.FC<StoreCreateStepProps> = (props) => {

    return (
        < >
            <DragAndDrop />
        </>
    );
}

export default StoreCreateStep2;