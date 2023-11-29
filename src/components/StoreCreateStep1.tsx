import React from "react";

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep1: React.FC<StoreCreateStepProps> = (props) => {
    return (
        <div className="form">
            <label>Full Name</label>
            <input
                type="text"
                name="fullname"
                placeholder="Steve Jobs"
                onChange={props.handleChange("fullName")}
            />

            <label>Display Name</label>
            <input
                type="text"
                name="displayName"
                placeholder="Steve"
                onChange={props.handleChange("displayname")}
            />
        </div>
    );
};

export default StoreCreateStep1;
