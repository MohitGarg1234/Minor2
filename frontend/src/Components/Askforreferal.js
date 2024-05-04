import React, { useState, useEffect } from "react";
import Logo from "../images/Logo-jiit.png";
import { Link } from "react-router-dom";

const Askforreferal = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
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
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/${currentUserId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchUserDetails(currentUserId);
    // eslint-disable-next-line
  }, [currentUserId]);
  let currentUserEmail = userDetails.email;
  useEffect(() => {
    const fetchConnectedPeople = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/connected-people",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setConnectedPeople(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConnectedPeople();
  }, [token]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredData = connectedPeople.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.CurrentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center mt-8 mb-5">
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
        </form>
      </div>
      <div className="mx-auto max-w-screen-lg md:max-w-screen-md">
        <div className="grid md:grid-cols-1 lg:grid-cols-1 justify-center">
          <div className="w-full md:w-5/6 lg:w-11/12">
            {filteredData.map((person) => (
              <div
                key={person._id}
                className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-1/3 rounded-l-lg sm:w-1/6 md:w-1/5 lg:w-1/4 xl:w-1/4"
                  src={Logo}
                  alt=""
                />
                <div className="p-4 w-2/3 md:w-1/2 lg:w-2/3 xl:w-3/4">
                  <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                    {person.name}
                  </h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Graduation Year: {person.YearOfGraduation}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Profile: {person.Role}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Company: {person.CurrentCompany}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Experience: {person.Experience}
                  </p>
                </div>

                <Link
                  to={`/message?field1=${currentUserEmail}&field2=${person.email}`}
                >
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                    Message
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Askforreferal;
