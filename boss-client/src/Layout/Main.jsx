import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/SharePage/Footer/Footer";
import Navber from "../pages/SharePage/Navber/Navber";

const Main = () => {
  const currentPath = useLocation();
  console.log(currentPath);
  const islogin =
    currentPath.pathname.includes("login") ||
    currentPath.pathname.includes("signup");
  return (
    <div>
      {islogin || <Navber></Navber>}
      <Outlet></Outlet>
      {islogin || <Footer></Footer>}
    </div>
  );
};

export default Main;
