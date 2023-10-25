import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";
import MenuMobile from "../../components/MenuMobile";
import BackToTop from "../../components/BackToTop";
import AuthModal from "../../components/AuthModal";
const MainLayout = () => {
  return (
    // <>
    //   <Header />
    //   <Outlet />
    //   <Footer />
    // </>
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <BackToTop />
        <MenuMobile />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
