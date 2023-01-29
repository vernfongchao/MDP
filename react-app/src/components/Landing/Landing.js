import LoginForm from "../auth/Login/LoginForm";
import "./Landing.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>
        Medical Dashboard Portal
      </h1>
      <div className="landing__form">
        <LoginForm />
      </div>
    </div>
  );
};

export default LandingPage;
