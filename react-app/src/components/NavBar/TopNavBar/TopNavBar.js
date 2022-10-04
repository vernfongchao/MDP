
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../../auth/Login/LoginFormModal';
import SignUpFormModal from '../../auth/SignUp/SignUpFormModal';
import LogoutButton from '../../auth/Login/LogoutButton';

import './TopNavBar.css'
import Logo from './MDP-logo.png'


const TopNavBar = () => {
    const user = useSelector(state => state.session.user)

    let LoggedIn

    if (user) {
        LoggedIn = (<>
            <LogoutButton />
        </>)
    }
    else if (!user) {
        LoggedIn = (
            <>
                <LoginFormModal />
                <SignUpFormModal />
            </>
        )
    }

    return (
        <div className="top-navbar-page-container">
            <div className="logo-container">
                <img className="img-logo" src={Logo} alt='MDP-logo'></img>
            </div>
            <div className="login-signup-container">
                {LoggedIn}
            </div>
        </div>
    )
}

export default TopNavBar;
