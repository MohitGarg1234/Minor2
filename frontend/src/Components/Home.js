import React from "react";
import "../App.css";
import Logo from "../images/Logo-jiit.png";
const Home = () => {
  return (
    <div>
      <header className="Home">
        <img className="Logo" src={Logo} alt="" />
        <div className="header-text">
          <h1>Jaypee Institute of Information Technology</h1>
          <h3>Alumni Portal</h3>
        </div>
      </header>
      <div className="header">
        <h1 className="headerHeading">Convert With Your Own Network</h1>
        <button className="btn">LOGIN</button>
        <button className="btn">SIGNUP</button>
      </div>
    </div>
  );
};

export default Home;
