import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";

const StepProgressBar: React.FC<{ step: number }> = (props) => {
    return (
        <ProgressBar
            percent={(props.step + 1) * 25}
            filledBackground="#664de5"
            height="2px"
            style={{ margin: "auto" }}
        >
            {[1, 2, 3, 4].map((index) => (
                <Step key={index} transition="scale">
                    {({ accomplished }: { accomplished: boolean }) => (
                        <div
                            style={{
                                height: "15px",
                                width: "15px",
                                border: "1px solid lightgray",
                                borderRadius: "50%",
                                backgroundColor: `${accomplished ? "#664de5" : null}`,
                            }}
                            className={`step ${accomplished ? "completed" : null}`}
                        >
                            {index}
                        </div>
                    )}
                </Step>
            ))}
        </ProgressBar>
    );
};

export default StepProgressBar;