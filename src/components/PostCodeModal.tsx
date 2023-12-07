import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

interface ModalPostCodeProps {
  onClose: () => void;
}

interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

const PostCodeModal: React.FC<
  ModalPostCodeProps & { setAddressData: (data: AddressData) => void }
> = ({ onClose, setAddressData }) => {
  const handlePostCode = (data: AddressData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddressData(data);
    onClose();
  };

  return (
    <StyledPostCodeModalWrapper>
      <StyledPostCodeWrapper>
        <div id='space'></div>
        <StyledPostCode onComplete={handlePostCode} />
        <StyledCloseButton type='button' onClick={() => onClose()}>
          닫기
        </StyledCloseButton>
      </StyledPostCodeWrapper>
    </StyledPostCodeModalWrapper>
  );
};

const StyledPostCodeModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const StyledPostCodeWrapper = styled.div`
  width: 500px;
  height: auto;
  background-color: white;
  position: relative;

  & #space {
    height: 33.49px;
    width: 100%;
    border-bottom: 1px solid #444;
    background-color: transparent;
  }
`;

const StyledPostCode = styled(DaumPostcode)`
  width: 100%;
  height: 100%;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  font-size: 0.8em;
  line-height: 95%;
  border: 1px solid #333;
  border-bottom: none;
`;

export default PostCodeModal;
