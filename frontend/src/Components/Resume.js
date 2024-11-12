import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
const Resume = ({ socket }) => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const { currentUserId } = useContext(UserContext);
  const token = localStorage.getItem("token");
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
  const filteredData = connectedPeople.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const MessageHandleClick = (otherUserId) => {
    socket.emit("joinChat", { userId : currentUserId, otherUserId: otherUserId });
    window.location.href = `/messages?selectedPerson=${otherUserId}`;
  };
  return (
    <section
      className="h-full lg:h-screen md:h-full"
      style={{ backgroundColor: "#f5efe7", minWidth: "100%" }}
    >
      <div className="flex justify-center">
        <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="ml-2  absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
              value={searchQuery}
              onChange={handleSearchChange}
              type="search"
              id="default-search"
              className="m-2 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Alumni"
              required
            />
          </div>
        </form>
      </div>
      {/* <div className="mx-auto max-w-screen-lg md:max-w-screen-md"> */}
      <div className="flex justify-center">
        <div className=" lg:grid grid-cols-2">
          {filteredData.map((person) => (
            <div
              key={person._id}
              className="m-5 lg:flex md:flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                style={{ height: "180px" }}
                className="object-cover w-full rounded-l-lg md:w-1/5 lg:w-1/4 xl:w-1/4"
                src={person.image}
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
                  Current Company:{" "}
                  {person.Experience[0] && person.Experience[0].companyName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Role: {person.Experience[0] && person.Experience[0].role}
                </p>
              </div>

              <Link
                className="flex flex-col justify-center items-center space-y-4 p-4"
                onClick={() => MessageHandleClick(person._id)} 
              >
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">
                  Message
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
