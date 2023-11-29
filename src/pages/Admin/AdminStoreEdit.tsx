import React, { useState } from "react";
import StoreCreateStep1 from "@/components/StoreCreateStep1";
import StoreCreateStep2 from "@/components/StoreCreateStep2";
import StoreCreateStep3 from "@/components/StoreCreateStep3";
import StoreCreateStep4 from "@/components/StoreCreateStep4";
import StoreCreateStep5 from "@/components/StoreCreateStep5";
import StepProgressBar from "@/components/StepProgressBar";

const AdminStoreEdit = () => {
  const [page, setPage] = useState<number>(0);

  const nextStep = () => {
    console.log('Next step clicked');
  };

  const handleInputChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${input} changed: ${e.target.value}`);
  };


  const [userInput, setUserInput] = useState<{
    fullName: string;
    displayname: string;
    workspaceName: string;
    workspaceUrl: string;
    checkboxValue: string;
  }>({
    fullName: "",
    displayname: "",
    workspaceName: "",
    workspaceUrl: "",
    checkboxValue: "",
  });

  const pageTitles = [
    "Welcome! First things first...",
    "Let's set up a home for all your work",
    "How are you planning to use Eden?",
  ];
  const pageSubTitles = [
    "You can always change them later.",
    "You can always create another workspace later",
    "We'll streamline your setup experience accordingly.",
    "You have completed onboarding, you can start using Eden",
  ];




  const PageDisplay = () => {
    if (page === 0) return <StoreCreateStep1 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 1) return <StoreCreateStep2 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 2) return <StoreCreateStep3 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 3) return <StoreCreateStep4 nextStep={nextStep} handleChange={handleInputChange} />;
    else return <StoreCreateStep5 nextStep={nextStep} handleChange={handleInputChange} />;
  };


  return (
    <div>
      <div style={{ margin: "auto", width: "50%" }}>
        <StepProgressBar step={page} />
      </div>

      <div>
        <div>
          <h1>
            {page === pageTitles.length
              ? `Congratulations, ` + userInput.displayname
              : pageTitles[page]}
          </h1>
          <p>{pageSubTitles[page]}</p>
        </div>
        <div>{PageDisplay()}</div>
        <div>
          <button
            onClick={() => {
              if (page === pageSubTitles.length - 1) {
                console.log(userInput);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === pageSubTitles.length - 1 ? "Launch Eden" : "Create Workspace"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreEdit;
