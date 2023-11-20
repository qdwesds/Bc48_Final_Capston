import React from "react";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div className={`spinner fixed left-0 top-0 bg-[#282c34] flex justify-center items-center z-[9999] h-screen w-screen transition-all duration-[1200ms] ${loadingClass}`}>
      <RingLoader
        color="#36d7b7"
        loading
        size={80}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loading;
