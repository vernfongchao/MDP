import React, { useState } from 'react';
import { Modal } from '../../../context/Modal/Modal';
import LoginForm from './LoginForm';


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='login-modal-page-container'>
      <button id='login-modal-main-page' onClick={() => setShowModal(true)}>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}


export default LoginFormModal;
