import React from "react";
import { MoonLoader } from "react-spinners";
const InnerLoading = ({
  isLoading = true,
  spinnerClass = "absolute w-full h-full",
  spinnerType = <MoonLoader />,
}) => {
  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={`innerLoading ${loadingClass} ${spinnerClass} left-0 top-0 flex justify-center items-center z-50 transition-all duration-300`}
    >
      {spinnerType}
    </div>
  );
};

export default InnerLoading;
