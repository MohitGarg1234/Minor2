import React, { useState, useEffect } from "react";
import Logo from "../images/Logo-jiit.png";
import { Link } from "react-router-dom";
const ConnectAlumini = () => {
  const [randomData, setRandomData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  // Extract user ID from decoded token
  const decodedToken = parseJwt(token);
  const currentUserId = decodedToken.userId;

  useEffect(() => {
    // Function to fetch data from API
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    try {
      // console.log(token);
      const response = await fetch("http://127.0.0.1:5000/api/data/random", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      
      setRandomData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConnect = async (userId) => {
    try {
      // Make the API call here with userId and currentUserId
      console.log(
        "Connecting user:",
        userId,
        "with current user:",
        currentUserId
      );
      // Example API call
      const response = await fetch("http://127.0.0.1:5000/api/users/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, targetUserId: currentUserId }),
      });
      if (!response.ok) {
        throw new Error("Failed to connect");
      }
      const data = await response.json();
      // console.log(data.message);
      // Update UI to show "Connected" button
      const connectButton = document.getElementById(`connect-button-${userId}`);
      if (connectButton) {
        connectButton.textContent = "Connected";
        connectButton.disabled = true; // Disable the button to prevent further clicks
      }
    } catch (error) {
      console.error(error.message); // Log error message
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredData = randomData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.CurrentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <div className="flex justify-center">
        <form className="m-4 w-full md:w-9/12">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Grow your network
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-14 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Grow your network"
              required
            />
          </div>
        </form>
      </div> */}
      <div className="flex justify-center mt-5 mb-5">
        <form className="max-w-md mx-auto mb-4 md:mb-0 md:mr-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400"
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
              value={searchQuery}
              onChange={handleSearchChange}
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
          {/* <div className="relative">
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
          </div> */}
        </form>
      </div>
      {filteredData &&
        filteredData.map((items) => (
          <div
            key={items._id}
            className="mx-auto max-w-screen-lg md:max-w-screen-md"
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-1 justify-center">
              <div className="w-full md:w-5/12 lg:w-11/12">
                <div className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <img
                    className="object-cover w-1/3 rounded-l-lg md:w-48"
                    src={Logo}
                    alt=""
                  />
                  <div className="p-4 w-2/3">
                    <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                      {items.name}
                    </h6>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Graduation Year: {items.YearOfGraduation}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Profile: {items.Role}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Company: {items.CurrentCompany}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Experience: {items.Experience}
                    </p>
                  </div>
                  <div className="row-2">
                    <Link to={items.LinkedIn}>
                      <button
                        type="submit"
                        className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                      >
                        &nbsp;Get LinkedIn Id&nbsp;
                      </button>
                    </Link>
                    <button
                      id={`connect-button-${items._id}`} // Unique ID for each button
                      onClick={() => handleConnect(items._id)}
                      className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                    >
                      &nbsp;&nbsp;Connect Here&nbsp;&nbsp;
                    </button>

                    {/* <button onClick={() => handleConnect(items._id)} className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">&nbsp;&nbsp;Connect Here&nbsp;&nbsp;</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
    // </div>
  );
};

export default ConnectAlumini;
