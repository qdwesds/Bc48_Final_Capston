import React from "react";
import Header from "./../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const location = useLocation();
  if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return <Outlet />;
  }

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div className="flex relative">
        <div className="flex-shrink-0">
          <div className="sticky top-0 left-0">
            <Sidebar />
          </div>
        </div>
        <div className="flex-grow">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserTemplate;
