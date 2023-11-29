import React from 'react';
import styled from 'styled-components';

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => (
  <StyledModalOverlay onClick={onClose}>
    <StyledModalContent>
      <img src={src} alt='Full-Screen Preview' />
    </StyledModalContent>
  </StyledModalOverlay>
);

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledModalContent = styled.div`
  max-width: 60%;
  max-height: 60%;
  overflow: hidden;

  & img {
    width: 56%;
    height: 100%;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
  }
`;

export default ImageModal;
