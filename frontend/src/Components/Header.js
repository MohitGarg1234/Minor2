import React from "react";
import "../App.css";
import Logo from "../images/Logo-jiit.png";
const Header = () => {
  return (
    <header className="Home">
      <img className="Logo" src={Logo} alt="" />
      <div className="header-text">
        <h1>Jaypee Institute of Information Technology</h1>
        <h3>Alumni Portal</h3>
      </div>
    </header>
  );
};

export default Header;
