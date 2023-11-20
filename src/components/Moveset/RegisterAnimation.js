import React from "react";
import Lottie from "react-lottie";
import registerAnimation from "./../../assets/Animation/RegisterAnimation.json";

const RegisterAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default RegisterAnimation;
