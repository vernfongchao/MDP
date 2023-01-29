import LoginForm from "../auth/Login/LoginForm";
import Carousel from "./Carousel";
import "./Landing.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <Carousel></Carousel>
      <h1>Medical Dashboard Portal</h1>
      <div className="landing__form">
        <LoginForm />
      </div>
    </div>
  );
};

export default LandingPage;
