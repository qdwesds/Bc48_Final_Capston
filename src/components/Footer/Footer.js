import React from "react";
import logo from "./../../assets/Img/jiraCloneLogo.png"

const Footer = () => {
  return (
    <div className="py-5 bg-gray-50 lg:bg-white">
      <div className="container mx-auto px-4">
      <div className="px-2 sm:px-5 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:w-1/3 mt-4 lg:mt-0 text-[16px] text-gray-600 text-center">
          <p className="mb-0">
            © 2023{" "}
            <span className="font-semibold text-black">
              Jira Clone - Hào Quý
            </span>
            . All Rights Reserved.
          </p>
        </div>
        <div className="lg:w-1/3 flex justify-center">
          <img className="h-24" src={logo} alt="web-logo" />
        </div>
        <div className="hidden lg:block w-1/3">
          <p></p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
