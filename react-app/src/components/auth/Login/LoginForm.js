import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../SignUp/SignUpForm';
import Demo from './Demo';
import { login } from '../../../store/session';


const LoginForm = ({setShowModal}) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState([])
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState([])
  const [isLogin, setIsLogin] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data.errors) {
      const errors = data.errors
      if (errors.username) setUsernameError(errors.username)
      if (errors.password) setPasswordError(errors.password)
    }
  };


  const updateUsername = (e) => {
    setUsernameError([])
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPasswordError([])
    setPassword(e.target.value);
  };

  return (isLogin ?
    <form className='main-user-login' onSubmit={onLogin}>

      <div>
        <label
          style={usernameError.length ? { color: "red" } : {}}
          htmlFor='username'>Username</label>
        <input
          className={usernameError.length ? 'form-input-user form-input-error' : 'form-input-user'}
          name='username'
          type='text'
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className='signup-error-text'>
        {usernameError.length ? usernameError.map((error) => (
          <span>{error}</span>
        )) : null}
      </div>
      <div>
        <label
          style={passwordError.length ? { color: "red" } : {}}
          htmlFor='password'>Password</label>
        <input
          className={passwordError.length ? 'form-input-user form-input-error' : 'form-input-user'}
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className='signup-error-text'>
        {passwordError.length ? passwordError.map((error) => (
          <span>{error}</span>
        )) : null}
      </div>
      <div className='buttons-div'>
        <button className='user-buttons' type='submit'>Login</button>
        <Demo />
      </div>
      <div className='login-form-to-signup-container'>
        <span>
          Don't have an account? <span className='login-form-to-signup-text' onClick={() => setIsLogin(false)}>Sign-Up</span> here
        </span>
      </div>
    </form>

    :
    (!isLogin && <SignUpForm setShowModal={setShowModal} />)
  );
};

export default LoginForm;
