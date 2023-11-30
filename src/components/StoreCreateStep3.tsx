import React, { useState } from 'react';
import styled from 'styled-components';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import AdminDateInput from '@/components/AdminDateInput'
import AdminLocationSelect from '@/components/AdminLocationSelect'
import AdminAddressInputs from '@/components/AdminAddressInputs'
import { AddressData, StoreCreateStepProps } from '@/types/index'

const StoreCreateStep3: React.FC<StoreCreateStepProps> = () => {
    const today = new Date();
    const defaultSelected: DateRange = {
        from: today,
        to: addDays(today, 0),
    };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const handleClick = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    const [addressData, setAddressData] = useState<AddressData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailAddress, setDetailAddress] = useState('');

    const openPostCode = () => {
        setIsModalOpen(true);
    };

    const closePostCode = () => {
        setIsModalOpen(false);
    };

    return (
        <StyledContent>
            <AdminDateInput range={range} setRange={setRange} isDetailVisible={isDetailVisible} handleClick={handleClick} today={today} />
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
