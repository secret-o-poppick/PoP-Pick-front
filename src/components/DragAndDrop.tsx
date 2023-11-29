import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ImImages } from 'react-icons/im';
import ImagePreview from '@/components/ImagePreview';

interface IFileTypes {
  id: number;
  object: File;
}

const DragDrop = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileId = useRef<number>(0);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const [uploadedImages, setUploadedImages] = useState<IFileTypes[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: fileId.current++,
        object: file,
      }));
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
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
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const onDelete = (id: number) => {
    setUploadedImages((prevImages) => prevImages.filter((image) => image.id !== id));
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

      <StyledImgs>
        {uploadedImages.map((image, index) => (
          <ImagePreview key={index} src={URL.createObjectURL(image.object)} onDelete={() => onDelete(image.id)} />
        ))}
      </StyledImgs>
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
  height: 420px;
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

const StyledImgs = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  column-gap: 6px;
`;
export default DragDrop;
