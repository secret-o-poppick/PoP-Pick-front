import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import StoreCreateStep1 from "@/components/StoreCreateStep1";
import StoreCreateStep2 from "@/components/StoreCreateStep2";
import StoreCreateStep3 from "@/components/StoreCreateStep3";
import StoreCreateStep4 from "@/components/StoreCreateStep4";
import StoreCreateStep5 from "@/components/StoreCreateStep5";
import StepProgressBar from "@/components/StepProgressBar";
import AdminTitle from "@/components/AdminTitle";
import Button from "@/components/Button"; // Import your Button component

const AdminStoreEdit = () => {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate()

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

  const pageSubTitles = ["1", "2", "3", "4", "5"];

  const PageDisplay = () => {
    if (page === 0) return <StoreCreateStep1 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 1) return <StoreCreateStep2 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 2) return <StoreCreateStep3 nextStep={nextStep} handleChange={handleInputChange} />;
    else if (page === 3) return <StoreCreateStep4 nextStep={nextStep} handleChange={handleInputChange} />;
    else return <StoreCreateStep5 nextStep={nextStep} handleChange={handleInputChange} />;
  };

  useEffect(() => {
    if (page === pageSubTitles.length - 1) {
      navigate('/admin/stores');
    }
  }, [page, navigate]);

  const handleNext = () => {
    if (page < 4) {
      setPage((currPage) => currPage + 1)
    }
  }

  const handlePrev = () => {
    setPage((currPage) => currPage - 1)
  }


  return (
    <div>
      <div style={{ margin: "auto", width: "50%" }}>
        {/* <StepProgressBar step={page} /> */}
      </div>

      <div>
        <div>
          <AdminTitle title="팝업스토어 등록" />
        </div>
        <div>{PageDisplay()}</div>
        {pageSubTitles[page]}
        <StyledButton>{page > 0 && <div><Button onClick={handlePrev}>이전</Button></div>}
          <div >
            <Button color='primary'
              onClick={handleNext}
            >
              {page === pageSubTitles.length - 1 ? "등록" : "다음"}
            </Button>
          </div>
        </StyledButton>
      </div>
    </div>
  );
};


const StyledButton = styled.div`
width:100%;
display: flex;
justify-content: flex-end;
column-gap: 12px;

& Button{
  width:80px;
}
`
export default AdminStoreEdit;
