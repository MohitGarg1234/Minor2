import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { GoSearch } from "react-icons/go";
import {
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaLinkedin,
  FaUserPlus,
} from "react-icons/fa";

const ConnectAlumini = () => {
  const { currentUserId } = useContext(UserContext);
  const [randomData, setRandomData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
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
      console.log(
        "Connecting user:",
        userId,
        "with current user:",
        currentUserId
      );
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
      console.log(data.message);
      const connectButton = document.getElementById(`connect-button-${userId}`);
      if (connectButton) {
        connectButton.textContent = "Connected";
        connectButton.disabled = true;
      }
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = randomData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundColor: "#ad866a",
        backgroundImage:
          "linear-gradient(62deg, #ad866a 0%, #f9d96c 50%, #f3e4cf 100%)",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center mt-20">
        <form className="max-w-md mx-auto mt-2 mb-2 md:mb-0 md:mr-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
              <GoSearch size={24} />
            </div>
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              type="search"
              id="default-search"
              className="w-full lg:w-72 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Alumni"
              required
            />
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredData &&
          filteredData.map((items, index) => (
            <div
              key={index}
              className="m-4 w-1/2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl md:flex-row md:max-w-2xl dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                className="object-cover w-full rounded-t-lg  md:w-1/5 lg:w-1/4 md:rounded-none md:rounded-s-lg"
                src={items.image}
                alt=""
                style={{ height: "200px" }}
              />
              <div className="p-6 w-full md:w-2/3">
                <h6 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                  {items.name}
                </h6>
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <FaGraduationCap className="mr-2 text-blue-500" /> Graduation
                  Year: {items.YearOfGraduation}
                </p>
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <FaBriefcase className="mr-2 text-blue-500" /> Education:{" "}
                  {items.Education}
                </p>
                {items.Experience[0] && (
                  <div>
                    <p className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <FaBuilding className="mr-2 text-blue-500" /> Current
                      Company: {items.Experience[0].companyName}
                    </p>
                    <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <FaBriefcase className="mr-2 text-blue-500" /> Role:{" "}
                      {items.Experience[0].role}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col items-center space-y-3 md:space-y-2 w-full md:w-auto">
                <Link
                  to={items.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="button"
                    className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                  >
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </button>
                </Link>
                <button
                  onClick={() => handleConnect(items._id)}
                  className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                >
                  <FaUserPlus className="mr-2" /> Connect
                </button>

                {/* <button onClick={() => handleConnect(items._id)} className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">&nbsp;&nbsp;Connect Here&nbsp;&nbsp;</button> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConnectAlumini;
