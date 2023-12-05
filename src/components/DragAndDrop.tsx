import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ImagePreview from '@/components/ImagePreview';
import { ImImages } from 'react-icons/im';

interface IFileTypes {
  id: number;
  object: File;
}

interface DragDropProps {
  setMainImage: React.Dispatch<React.SetStateAction<number>>;
  uploadedImages: IFileTypes[];
  setUploadedImages: React.Dispatch<React.SetStateAction<IFileTypes[]>>;
}

const DragDrop: React.FC<DragDropProps> = (props) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeMain, setActiveMain] = useState<number | null>(null);

  const fileId = useRef<number>(0);

  const dragRef = useRef<HTMLLabelElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: fileId.current++,
        object: file,
      }));
      props.setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: fileId.current++,
        object: file,
      }));
      props.setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const onDelete = (id: number) => {
    props.setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  const onSetMain = (id: number) => {
    props.setMainImage(id);

    if (activeMain === id) {
      return;
    }
    setActiveMain(id);

    const previouslyActiveButton = document.querySelector('.active');
    if (previouslyActiveButton) {
      previouslyActiveButton.classList.remove('active');
    }

    const newActiveButton = document.getElementById(`mainButton_${id}`);
    if (newActiveButton) {
      newActiveButton.classList.add('active');
    }
  };

  return (
    <>
      <StyledInput
        type='file'
        id='fileUpload'
        multiple={true}
        accept='image/png, image/jpeg'
        onChange={handleFileChange}
      />

      <StyledLayout
        className={isDragging ? 'DragDrop-File-Dragging' : 'DragDrop-File'}
        htmlFor='fileUpload'
        ref={dragRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <StyledLabel>
          <span>이미지 가져오기</span>
        </StyledLabel>
        <StyledIcon>
          <ImImages />
        </StyledIcon>
      </StyledLayout>

      <StyledImages>
        {props.uploadedImages.map((image, index) => (
          <ImagePreview
            key={index}
            src={URL.createObjectURL(image.object)}
            onDelete={() => onDelete(image.id)}
            onSetMain={() => onSetMain(image.id)}
            isMain={activeMain === image.id}
          />
        ))}
      </StyledImages>
    </>
  );
};

const StyledInput = styled.input`
  display: none;
`;

const StyledLayout = styled.label`
  position: relative;
  cursor: pointer;
`;

const StyledLabel = styled.div`
  border: 4px dotted #eee;
  height: 360px;
  background-color: #fff9f8;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    position: relative;
    z-index: 3;
    font-size: large;
    font-weight: bold;
    color: #888;
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  font-size: 12em;
  color: #eee;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const StyledImages = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  column-gap: 6px;
  height: 100px;
`;

export default DragDrop;
