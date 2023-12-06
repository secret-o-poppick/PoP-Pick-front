import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AdminDateInput from '@/components/AdminDateInput';
import AdminLocationSelect from '@/components/AdminLocationSelect';
import AdminAddressInputs from '@/components/AdminAddressInputs';
import { StoreCreateStepProps } from '@/types/index';

import { useCreateStoreStep3Context } from '@/context/StoreContext';

const StoreCreateStep3: React.FC<StoreCreateStepProps> = () => {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPostCode = () => {
    setIsModalOpen(true);
  };

  const closePostCode = () => {
    setIsModalOpen(false);
  };

  const {
    range,
    setRange,
    handleClick,
    isDetailVisible,
    addressData,
    setAddressData,
    detailAddress,
    setDetailAddress,
  } = useCreateStoreStep3Context();

  return (
    <StyledContent>
      <AdminDateInput
        range={range}
        setRange={setRange}
        isDetailVisible={isDetailVisible}
        handleClick={handleClick}
        today={today}
      />
      <AdminLocationSelect />
      <AdminAddressInputs
        addressData={addressData}
        setAddressData={setAddressData}
        isModalOpen={isModalOpen}
        openPostCode={openPostCode}
        closePostCode={closePostCode}
        detailAddress={detailAddress}
        setDetailAddress={setDetailAddress}
      />
    </StyledContent>
  );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  row-gap: 50px;
`;

export default StoreCreateStep3;
