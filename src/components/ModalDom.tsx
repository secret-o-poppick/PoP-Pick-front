import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalDomProps {
  children: ReactNode;
}

const ModalDom: React.FC<ModalDomProps> = ({ children }) => {
  const el = document.getElementById('modalDom');
  if (!el) return null;

  return ReactDOM.createPortal(children, el);
};

export default ModalDom;