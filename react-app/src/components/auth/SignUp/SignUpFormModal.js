import React, { useState } from 'react';
import { Modal } from '../../../context/Modal/Modal';
import SignUpForm from './SignUpForm';


function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='signup-modal-page-container'>
      <button id='signup-modal-main-page'
        onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default SignUpFormModal;
