import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminDateInput from '@/components/AdminDateInput';
import AdminLocationSelect from '@/components/AdminLocationSelect';
import AdminAddressInputs from '@/components/AdminAddressInputs';
import {
  StoreCreateStepProps,
  SelectBoxOption,
  LocCategoryType,
} from '@/types/index';

import { useCreateStoreStep3Context } from '@/context/StoreContext';

const StoreCreateStep3: React.FC<StoreCreateStepProps> = ({
  locationCategory,
}) => {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select1Options, setSelect1Options] = useState<SelectBoxOption[]>([]);
  const [select2Options, setSelect2Options] = useState<SelectBoxOption[]>([]);

  const openPostCode = () => {
    setIsModalOpen(true);
  };

  const closePostCode = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    locationCategory?.map((locat) => {
      setSelect1Options((prev) => [
        ...prev,
        { value: locat._id, label: locat.name },
      ]);
    });
  }, []);

  const {
    range,
    setRange,
    handleClick,
    locCategories,
    setlocCategories,
    isDetailVisible,
    addressData,
    setAddressData,
    detailAddress,
    setDetailAddress,
  } = useCreateStoreStep3Context();

  const handleLoc1Category = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex - 1;
    setSelect2Options([]);

    if (index >= 0) {
      setlocCategories((prev) => {
        return [e.target.value, ''];
      });

      locationCategory?.[index].children?.map((child) => {
        setSelect2Options((prev) => [
          ...prev,
          { value: child._id, label: child.name },
        ]);
      });
    }
  };

  const handleLoc2Category = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setlocCategories((prev) => {
      const [a1, a2] = prev;
      return [a1, e.target.value];
    });
  };

  return (
    <StyledContent>
      <AdminDateInput
        range={range}
        setRange={setRange}
        isDetailVisible={isDetailVisible}
        handleClick={handleClick}
        today={today}
      />
      <AdminLocationSelect
        category1Option={select1Options}
        category2Option={select2Options}
        handleLoc1Category={handleLoc1Category}
        handleLoc2Category={handleLoc2Category}
      />
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
