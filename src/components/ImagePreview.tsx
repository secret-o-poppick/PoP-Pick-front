import React, { useState } from 'react';
import styled from 'styled-components';
import ImageModal from '@/components/ImageModal';
import { TiDelete } from 'react-icons/ti';

interface ImgPreviewProps {
  src: string;
  onDelete: () => void;
}

const ImagePreview: React.FC<ImgPreviewProps> = ({ src, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <>
      <StyledImgPreview onClick={openModal}>
        <button onClick={handleClickDelete}>
          <TiDelete />
        </button>
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
  position: relative;

  & button {
    font-size: 1.6em;
    color: #eee;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    cursor: pointer;
    border: none;
    padding:0;

  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default ImagePreview;
