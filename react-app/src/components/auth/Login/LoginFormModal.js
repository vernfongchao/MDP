import React, { useState } from 'react';
import { Modal } from '../../../context/Modal/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button id='login-modal-main-page' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}


export default LoginFormModal;
