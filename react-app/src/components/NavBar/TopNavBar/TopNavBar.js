import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../../auth/Login/LoginFormModal';
import SignUpFormModal from '../../auth/SignUp/SignUpFormModal';
import LogoutButton from '../../auth/Login/LogoutButton';

import './TopNavBar.css'


const TopNavBar = () => {
    const user = useSelector(state => state.session.user)
    console.log(user)

    let LoggedIn

    if (user) {
        LoggedIn = (<div>
            <LogoutButton />
        </div>)
    }
    else if (!user) {
        LoggedIn = (
            <div>
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        )
    }

    return (
        <div className="top-navbar-page-container">
            <div className="logo-container">
                <NavLink className="nav-logo" to="/" exact={true} activeClassName='active'>
                    <img className="img-logo" src="/MDP-logo.png" alt='MDP-logo'></img>
                </NavLink>
            </div>
            <div className="login-signup-container">
                {LoggedIn}
            </div>
        </div>
    )
}

export default TopNavBar;
