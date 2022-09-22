import LoginFormModal from '../../auth/Login/LoginFormModal'
import SignUpFormModal from '../../auth/SignUp/SignUpFormModal'
import './TopNavBar.css'


const TopNavBar = () => {
    return (
        <div className="top-navbar-page-container">
            <div className="logo-container">

            </div>
            <div className="login-signup-container">
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        </div>
    )
}

export default TopNavBar
