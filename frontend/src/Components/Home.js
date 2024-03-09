import React from "react";
import "../App.css";
import {Link} from  'react-router-dom'
const Home = () => {
  return (
    <div>
      
      <div className="header">
        <h1 className="headerHeading">Connect With Your Own Network</h1>
        <button className="btn">
          <Link to="/login" >LOGIN</Link>
        </button>
        <button className="btn">
          <Link to="/signup">SIGNUP</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
