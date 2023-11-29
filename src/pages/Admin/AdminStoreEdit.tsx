import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StoreCreateStep1 from '@/components/StoreCreateStep1';
import StoreCreateStep2 from '@/components/StoreCreateStep2';
import StoreCreateStep3 from '@/components/StoreCreateStep3';
import StoreCreateStep4 from '@/components/StoreCreateStep4';
import StoreCreateStep5 from '@/components/StoreCreateStep5';
import StepProgressBar from '@/components/StepProgressBar';
import AdminTitle from '@/components/AdminTitle';
import Button from '@/components/Button'; // Import your Button component

const AdminStoreEdit = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const nextStep = () => {
    console.log('Next step clicked');
  };

  const handleInputChange =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`${input} changed: ${e.target.value}`);
    };

  const [userInput, setUserInput] = useState<{
    fullName: string;
    displayname: string;
    workspaceName: string;
    workspaceUrl: string;
    checkboxValue: string;
  }>({
    fullName: '',
    displayname: '',
    workspaceName: '',
    workspaceUrl: '',
    checkboxValue: '',
  });

  const PageDisplay = () => {
    if (page === 1)
      return (
        <StoreCreateStep1
          nextStep={nextStep}
          handleChange={handleInputChange}
        />
      );
    else if (page === 2)
      return (
        <StoreCreateStep2
          nextStep={nextStep}
          handleChange={handleInputChange}
        />
      );
    else if (page === 3)
      return (
        <StoreCreateStep3
          nextStep={nextStep}
          handleChange={handleInputChange}
        />
      );
    else if (page === 4)
      return (
        <StoreCreateStep4
          nextStep={nextStep}
          handleChange={handleInputChange}
        />
      );
    else
      return (
        <StoreCreateStep5
          nextStep={nextStep}
          handleChange={handleInputChange}
        />
      );
  };

  const handleNext = () => {
    if (page < 5) {
      setPage((currPage) => currPage + 1);
    } else {
      navigate('/admin/stores');
    }
  };

  const handlePrev = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div>
      <div style={{ margin: 'auto', width: '50%' }}>
        <StepProgressBar currentPage={page} totalPage={5} />
      </div>

      <div>
        <div>
          <AdminTitle title='팝업스토어 등록' />
        </div>
        <div>{PageDisplay()}</div>
        <StyledButton>
          {page > 1 && (
            <div>
              <Button onClick={handlePrev}>이전</Button>
            </div>
          )}
          <div>
            <Button color='primary' onClick={handleNext}>
              {page === 5 ? '등록' : '다음'}
            </Button>
          </div>
        </StyledButton>
      </div>
    </div>
  );
};

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;

  & Button {
    width: 80px;
  }
`;
export default AdminStoreEdit;
