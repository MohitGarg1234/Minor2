// HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="centered-container">
      <div>
        <div className="card-container">
          <div className="card-body">
            <div className="card-title">
              <img className="person-photo" src="" alt="person face" />
              <h5 className="person-name">Chiranshu</h5>
            </div>
            <p className="card-text">
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </p>
          </div>
          <img className="card-img-bottom" src="" alt="post" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
