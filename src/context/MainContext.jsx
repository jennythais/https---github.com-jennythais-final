import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});
const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    handleClosedMenuMobile();
    const myTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [pathname]);

  const handleShowedMenuMobile = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").addClass("mmenu-active");
  };
  const handleClosedMenuMobile = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  return (
    <MainContext.Provider
      value={{ handleShowedMenuMobile, handleClosedMenuMobile }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
