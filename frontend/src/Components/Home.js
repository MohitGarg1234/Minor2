import React from "react";
import "../App.css";
// import {Link} from  'react-router-dom'
import Logo1 from "../images/JiitClgPhoto-transformed.jpeg";
import Logo2 from "../images/home-banner-1.jpg";
import Logo3 from "../images/JIIT-Noida-scaled.webp";
import Logo4 from "../images/Jiit-Ground.jpeg";
import Logo5 from "../images/Jiit_audi5.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  // localStorage.removeItem("token");
  var token = localStorage.getItem('token');
  if(token){
    window.location.href = "/homepage";
  }
  return (
    <>
      <div
        id="default-carousel"
        className="relative w-screen h-screen"
        data-carousel="slide"
      >
        <div className="relative h-full overflow-hidden rounded-lg">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src={Logo1}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Slide 1"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h1 className="text-white">Connect With Your Own Network</h1>
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={Logo2}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Slide 2"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h1 className="text-white">Connect With Your Own Network</h1>
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={Logo3}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Slide 3"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h1 className="text-white">Connect With Your Own Network</h1>
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={Logo4}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Slide 4"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h1 className="text-white">Connect With Your Own Network</h1>
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={Logo5}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Slide 5"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h1 className="text-white">Connect With Your Own Network</h1>
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 4"
            data-carousel-slide-to="3"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 5"
            data-carousel-slide-to="5"
          ></button>
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default Home;
