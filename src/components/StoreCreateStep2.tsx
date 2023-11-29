import React from "react";

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}


const StoreCreateStep2: React.FC<StoreCreateStepProps> = (props) => {
    return (
        <div className="form">
            <label>Workspace Name</label>
            <input
                type="text"
                name="workspaceName"
                placeholder="Eden"
                onChange={props.handleChange("workspaceName")}
            />

            <label>
                Workspace Url <span>(optional)</span>{" "}
            </label>
            <input
                type="text"
                name="workspaceUrl"
                placeholder="www.eden.com/     Example"
                onChange={props.handleChange("workspaceUrl")}
            />
        </div>
    );
};

export default StoreCreateStep2;
