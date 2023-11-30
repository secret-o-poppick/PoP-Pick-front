import React from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PostCodeModal from './PostCodeModal';
import ModalDom from './ModalDom';
import { AddressInputProps } from '@/types/index'

const AddressInput: React.FC<AddressInputProps> = ({
  addressData,
  setAddressData,
  isModalOpen,
  openPostCode,
  closePostCode,
  detailAddress,
  setDetailAddress,
}) => (
  <StyledInput>
    <label id='labels'>장소</label>
    <div id='addressInputs'>
      <div id='addressInput'>
        <Input type='text' readonly value={addressData?.address || ''} placeholder='주소' onClick={openPostCode} />
        <Button onClick={openPostCode}>주소 검색</Button>
      </div>
      <Input type='text' readonly value={addressData?.zonecode || ''} placeholder='우편번호' onClick={openPostCode}
      />
      <Input
        type='text'
        value={detailAddress}
        onChange={(e) => {
          setDetailAddress(e.target.value);
        }}
        placeholder='상세주소 입력'
      />
    </div>
    <div id='modalDom'>
      {isModalOpen && (
        <ModalDom>
          <PostCodeModal onClose={closePostCode} setAddressData={setAddressData} />
        </ModalDom>
      )}
    </div>
  </StyledInput>
);

const StyledInput = styled.div`
    display: flex;

    #labels {
        width: 150px;
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        display: inline-block;
    }

    #addressInputs{
        display: flex;
        flex-direction: column;
        row-gap: 0.5em;
        width:400px;
    }

    #addressInput{
        display: flex;
        column-gap: 0.5em;

        & button{
            font-weight:bold;
            border:none;
            background-color: #f3f5f7;
            color: #000;
            font-size: 0.8em;
            padding:0.5em;
            width:90px;
        }
    }
`;


export default AddressInput;
