import React from "react";
import Lottie from "react-lottie";
import loginAnimation from "./../../assets/Animation/LoginAnimation.json";

const LoginAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LoginAnimation;
