import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Demo from './Demo';
import { login } from '../../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='main-user-login' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          className='form-input-user'
          name='username'
          type='text'
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          className='form-input-user'
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div>
      </div>
      <div className='buttons-div'>
        <button className='user-buttons' type='submit'>Login</button>
        <Demo />
      </div>
    </form>
  );
};

export default LoginForm;
