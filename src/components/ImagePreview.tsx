import React, { useState } from 'react';
import styled from 'styled-components';
import ImageModal from '@/components/ImageModal';

interface ImgPreviewProps {
  src: string;
}

const ImagePreview: React.FC<ImgPreviewProps> = ({ src }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledImgPreview onClick={openModal}>
        <img src={src} alt='Uploaded Preview' />
      </StyledImgPreview>
      {isModalOpen && <ImageModal src={src} onClose={closeModal} />}
    </>
  );
};

const StyledImgPreview = styled.div`
  width: calc(100% / 10);
  height: auto;
  margin-top: 16px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default ImagePreview;
