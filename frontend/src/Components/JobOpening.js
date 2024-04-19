import React from "react";
import Logo from "../images/Logo-jiit.png";
import { Link } from "react-router-dom";

const JobOpening = () => {
  return (
    <div className="container mx-auto">
      <div className="flex-col">
        <Link
          to="/jobopeningpage"
          className="flex items-center justify-center font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          <button
            id="postJobBtn"
            className="relative bg-blue-500 text-white font-semibold py-2 px-8 rounded-full flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                strokeWidth="2"
                stroke="white"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-10">Post a Job</span>
          </button>
        </Link>

        <div className="flex justify-between">
          <form className="max-w-md mx-auto mb-4 md:mb-0 md:mr-4">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="mb-2 block w-full lg:w-72 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Alumni"
                required
              />
            </div>
          </form>

          <form className="max-w-md mx-auto mb-4 md:mb-0">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 4a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4H6ZM4 10a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="mb-2 block w-full lg:w-72 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Apply Filter"
                required
              />
            </div>
          </form>
        </div>

        <div className="mx-auto max-w-screen-lg md:max-w-screen-md">
        <div className="grid md:grid-cols-1 lg:grid-cols-1 justify-center">
          <div className="w-full md:w-5/12 lg:w-11/12">
              <a
                href="/"
                className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-1/3 rounded-l-lg md:w-48"
                  src={Logo}
                  alt=""
                />
                <div className="p-4 w-2/3">
                  <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                    Chiranshu Agrawal
                  </h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Graduation Year: 2025
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Profile: Software Developer II
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Company: Apni Company
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Experience: 5 Years
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Past Experience: hai hi nhu
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    Request Referral
                  </button>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    View Job
                  </button>
                </div>

              </a>
            </div>
            <div className="w-full md:w-5/12 lg:w-11/12">
              <a
                href="/"
                className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-1/3 rounded-l-lg md:w-48"
                  src={Logo}
                  alt=""
                />
                <div className="p-4 w-2/3">
                  <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                    Chiranshu Agrawal
                  </h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Graduation Year: 2025
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Profile: Software Developer II
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Company: Apni Company
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Experience: 5 Years
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Past Experience: hai hi nhu
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    Request Referral
                  </button>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    View Job
                  </button>
                </div>

              </a>
            </div>
            <div className="w-full md:w-5/12 lg:w-11/12">
              <a
                href="/"
                className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-1/3 rounded-l-lg md:w-48"
                  src={Logo}
                  alt=""
                />
                <div className="p-4 w-2/3">
                  <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                    Chiranshu Agrawal
                  </h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Graduation Year: 2025
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Profile: Software Developer II
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Company: Apni Company
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Experience: 5 Years
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Past Experience: hai hi nhu
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    Request Referral
                  </button>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    View Job
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpening;
