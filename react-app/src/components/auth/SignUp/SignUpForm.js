import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [usernameError, setUsernameError] = useState([])
  const [emailError, setEmailError] = useState([])
  const [firstNameError, setFirstNameError] = useState([])
  const [lastNameError, setLastNameError] = useState([])
  const [positionError, setPositionError] = useState([])
  const [passwordError, setPasswordError] = useState([])
  const [repeatPasswordError, setRepeatPasswordError] = useState([])


  const user = useSelector(state => state.session.user);
  const rolesObj = useSelector(state => state.roles);
  const roles = Object.values(rolesObj);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp({
      username,
      email,
      "first_name": firstName,
      "last_name": lastName,
      "position": role,
      "password": password,
      "repeat_password": repeatPassword
    }));
    if (data.errors) {
      const errors = data.errors
      if (errors.username) setUsernameError(errors.username)
      if (errors.email) setEmailError(errors.email)
      if(errors.first_name)setFirstNameError(errors.first_name)
      if(errors.last_name) setLastNameError(errors.last_name)
      if(errors.position)setPositionError(errors.position)
      if(errors.password)setPasswordError(errors.password)
      if(errors.repeat_password)setRepeatPasswordError(errors.repeat_password)
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError([])
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError([])
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError([])
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError([])
  };

  const updateRole = (e) => {
    console.log(e.target.value)
    setRole(e.target.value);
    setPositionError([])
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError([])
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordError([])
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="main-user-signup" onSubmit={onSignUp}>
      <div>
        <label
          className={usernameError.length ? "signup-error" : ""}
        >Username</label>
        <input
          className={usernameError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='signup-error-text'>
        {usernameError.length ? usernameError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label
          className={emailError.length ? "signup-error" : ""}
        >Email</label>
        <input
          className={emailError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='signup-error-text'>
        {emailError.length ? emailError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label className={firstNameError.length ? "signup-error" : ""}
        >First Name</label>
        <input
          className={firstNameError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div className='signup-error-text'>
        {firstNameError.length ? firstNameError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label
          className={lastNameError.length ? "signup-error" : ""}
        >Last Name</label>
        <input
          className={lastNameError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div className='signup-error-text'>
        {lastNameError.length ? lastNameError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label htmlFor="role"
          className={positionError.length ? "signup-error" : ""}
        >Role</label>
        <select className={positionError.length ? 'form-input-user form-input-error' : "form-input-user"}
          onChange={updateRole} required >
          <option disabled selected value> </option>
          {roles?.map(singleRole => (
            <option key={singleRole.id} value={singleRole?.id}>{singleRole?.position_name}</option>
          ))}
        </select>
      </div>
      <div className='signup-error-text'>
        {positionError.length ? positionError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label
          className={passwordError.length ? "signup-error" : ""}
          >Password</label>
        <input
          className={passwordError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='signup-error-text'>
        {passwordError.length ? passwordError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div>
        <label
          className={repeatPasswordError.length ? "signup-error" : ""}
        >Repeat Password</label>
        <input
          className={repeatPasswordError.length ? 'form-input-user form-input-error' : "form-input-user"}
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <div className='signup-error-text'>
        {repeatPasswordError.length ? repeatPasswordError.map(error => (
          <span key={error}> {error}</span>
        )) : null}
      </div>
      <div className='buttons-div'>
        <button className='user-buttons' type='submit'>Sign Up</button>
      </div>
    </form >
  );
};

export default SignUpForm;
