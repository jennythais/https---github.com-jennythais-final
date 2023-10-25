import React from "react";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from './HeaderTop';

const Header = () => {
  return (
    <header className="header">
      <HeaderTop/>
      <HeaderMiddle/>
    </header>
  );
};

export default Header;
