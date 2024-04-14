import React from "react";
import Logo from "../images/Logo-jiit.png";

const Resume = () => {
  return (
    <>
      <div className="w-3/4 mx-auto mb-4">
        <form>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </form>
      </div>

      <div className="flex justify-center">
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

        <form className="max-w-md mx-auto">
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
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
