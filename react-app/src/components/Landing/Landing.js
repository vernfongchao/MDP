import { useState } from "react";
import LoginForm from "../auth/Login/LoginForm";
import Carousel from "./Carousel";

import "./Landing.css";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="landing">
      <Carousel setLoading={setLoading}/>
      {loading && (
        <>
          <h1>Medical Dashboard Portal</h1>
          <div className="landing__form">
            <LoginForm />
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
