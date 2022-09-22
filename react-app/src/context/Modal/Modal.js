import React, { useContext, createContext, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current)
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  )
};

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return (ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} className='fade-in' />
      <div id="modal-content" className='fade-in-grow'>
        {children}
      </div>
    </div>,
    modalNode
  ))

}
