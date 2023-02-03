import { useState, useEffect } from "react";
import LoginForm from "../auth/Login/LoginForm";
import Carousel from "./Carousel";

import ImageOne from "./Image/baby.jpg";
import ImageTwo from "./Image/doctors.jpg";
import ImageThree from "./Image/operation.jpg";
import ImageFour from "./Image/heart.jpg";

import "./Landing.css";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  // const [cache, setCache] = useState([]);

  // const cashImages = async (imgArray) => {
  //   const promises = await imgArray.map((src) => {
  //     return new Promise(function (resolve, reject) {
  //       const img = new Image();
  //       img.src = src;
  //       img.onload = () => resolve();
  //       img.onerror = () => reject();
  //       return img
  //     });
  //   });

  //   await Promise.all(promises);
  //   setCache(promises);
  //   setLoading(true);
  // };

  // // useEffect(() => {
  // //   if(cache.length){
  // //     setLoading(true)
  // //   }
  // // },[cache])

  // // caching images
  // useEffect(() => {
  //   const imgs = [ImageOne, ImageTwo, ImageThree, ImageFour];
  //   cashImages(imgs);
  // }, []);

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
