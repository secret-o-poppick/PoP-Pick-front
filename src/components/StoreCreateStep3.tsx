import React from "react";

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep3: React.FC<StoreCreateStepProps> = (props) => {
    return (
        <div className="card-container">
            <label>
                <input
                    type="radio"
                    className="card-input-element"
                    onChange={props.handleChange("checkboxValue")}
                    value="Individual"
                />
                <div className="card-input">
                    <h3 className="panel-heading">For myself</h3>
                    <p className="panel-body">Write better thing more clearly. Stay organised</p>
                </div>
            </label>

            <label>
                <input
                    type="radio"
                    className="card-input-element"
                    onChange={props.handleChange("checkboxValue")}
                    value="Company"
                />
                <div className="card-input">
                    <h3 className="panel-heading"> With my team</h3>
                    <p className="panel-body">Wikis, docs, tasks and projects, all in one place.</p>
                </div>
            </label>
        </div>
    );
};

export default StoreCreateStep3;
