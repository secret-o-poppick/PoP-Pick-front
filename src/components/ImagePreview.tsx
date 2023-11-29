import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ImageModal from '@/components/ImageModal';
import { TiDelete } from 'react-icons/ti';
import { IoMdCheckmark } from 'react-icons/io';
import { FaRegCircle } from 'react-icons/fa';

interface ImgPreviewProps {
  src: string;
  onDelete: () => void;
  onSetMain: (id: string | number) => void;
  isMain: boolean;
}

const ImagePreview: React.FC<ImgPreviewProps> = ({ src, onDelete, onSetMain, isMain }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickDelete = () => {
    onDelete();
  };

  const handleClickMain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (imageRef.current) {
      onSetMain(imageRef.current.id);
    }
  };

  const handleImageClick = () => {
    openModal();
  };

  return (
    <>
      <StyledImgPreview isMain={isMain} onClick={handleImageClick}>
        <button onClick={handleClickDelete}>
          <TiDelete />
        </button>
        <img ref={imageRef} src={src} alt="Uploaded Preview" />
        <button
          id={`mainButton_${imageRef.current?.id}`}
          onClick={handleClickMain}
          className={isMain ? 'active' : ''}
        >
          {isMain ? <IoMdCheckmark /> : <FaRegCircle />}메인
        </button>
      </StyledImgPreview >
      {isModalOpen && <ImageModal src={src} onClose={closeModal} />
      }
    </>
  );
}

const StyledImgPreview = styled.div<{ isMain: boolean }>`
  width: calc(100% / 10);
  height: auto;
  margin-top: 16px;
  position: relative;

  & button:first-child {
    font-size: 1.6em;
    color: #eee;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  & button:last-child {
    font-size: 0.7em;
    position: absolute;
    bottom: 2px;
    left: 2px;
    background-color: ${(props) => (props.isMain ? '#ffd7d1' : '#fff9f8')};
    border: 1px solid #888;
    border-radius: 6px;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
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