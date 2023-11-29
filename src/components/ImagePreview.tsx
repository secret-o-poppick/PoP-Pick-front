import React from 'react';
import styled from 'styled-components';

interface ImgPreviewProps {
  src: string;
}

const ImgPreview: React.FC<ImgPreviewProps> = ({ src }) => (
  <StyledImgPreview>
    <img src={src} alt="Uploaded Preview" />
  </StyledImgPreview>
);

const StyledImgPreview = styled.div`
  width: calc(100%/10);
  height: auto;
  margin-top: 16px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export default ImgPreview;
