import { useState, useEffect } from "react";

import ImageOne from "./Image/baby.jpg";
import ImageTwo from "./Image/doctors.jpg";
import ImageThree from "./Image/operation.jpg";
import ImageFour from "./Image/heart.jpg";
import "./Landing.css";

const Carousel = ({ setLoading }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setIdx((state) => state + 1);
    }, 3000);
    if (idx > 3) {
      setIdx(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [idx]);

  return (
    <div className="carousel">
      <img
        className={
          idx === 0 ? "carousel__image slide__animation" : "carousel__image"
        }
        src={ImageOne}
        alt={"Baby"}
        onLoad={() => setLoading(true)}
      />
      <img
        className={
          idx === 1 ? "carousel__image slide__animation" : "carousel__image"
        }
        src={ImageTwo}
        alt="Doctors"
      />
      <img
        className={
          idx === 2 ? "carousel__image slide__animation" : "carousel__image"
        }
        src={ImageThree}
        alt="Doctors"
      />
      <img
        className={
          idx === 3 ? "carousel__image slide__animation" : "carousel__image"
        }
        src={ImageFour}
        alt="Doctors"
      />
    </div>
  );
};

export default Carousel;
