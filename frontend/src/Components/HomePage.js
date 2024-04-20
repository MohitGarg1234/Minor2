import React from 'react';
import './HomePage.css';
import Logo from "../images/Logo-jiit.png";
import Logo1 from "../images/Jiit-Ground.jpeg"

const HomePage = () => {
  return (
    <div className="centered-container">
      <div>
        <div className="card-container">
          <div className="card-body">
            <div className="card-title">
              <img className="person-photo" src={Logo} alt="person face" />
              <h5 className="person-name">Chiranshu Agrawal</h5>
            </div>
            <p className="card-text mt-3">
            The college playground serves as a catalyst for personal growth and community engagement, leaving an indelible mark on those who partake. Through shared experiences and moments of joy, it fosters connections and empowers individuals to embrace their potential.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </p>
          </div>
          <img className="card-img-bottom" src={Logo1} alt="post" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
