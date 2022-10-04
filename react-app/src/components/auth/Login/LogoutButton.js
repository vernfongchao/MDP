import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import '../../../index.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='logout-button-page-container'>
      <button id="logout-button" onClick={onLogout}>Logout</button>
    </div>
  )
};

export default LogoutButton;
