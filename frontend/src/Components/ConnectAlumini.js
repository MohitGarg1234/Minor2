import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

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

  const filteredData = randomData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#f5efe7",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center ">
        <form className="max-w-md mx-auto mt-2 mb-2 md:mb-0 md:mr-4">
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
              className="block w-full lg:w-72 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Alumni"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredData &&
          filteredData.map((items, index) => (
            <div
              key={index}
              className="m-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={items.image}
                alt=""
                style={{ height: "200px" }}
              />
              <div className="p-4 w-2/3">
                <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                  {items.name}
                </h6>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Graduation Year: {items.YearOfGraduation}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Education: {items.Education}
                </p>
                {items.Experience[0] && (
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Current Company : {items.Experience[0].companyName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Role : {items.Experience[0].role}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <Link to={items.LinkedIn}>
                  <button
                    type="submit"
                    className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                  >
                    Get LinkedIn Id
                  </button>
                </Link>
                <button
                  id={`connect-button-${items._id}`}
                  onClick={() => handleConnect(items._id)}
                  className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                >
                  &nbsp;Connect Here&nbsp;
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
