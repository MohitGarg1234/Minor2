import React, { useState, useContext } from "react";
import Logo from "../images/Logo-jiit.png";
import { Link, useLocation } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { UserContext } from "../context/userContext";
import { FiGrid, FiLogOut, FiUser } from "react-icons/fi";

const Navbar = ({ unreadCount, unreadMessageCount }) => {
  initFlowbite();
  let location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const handleClickSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // const [unreadCount, setUnreadCount] = useState(0);
  // const fetchUnreadCount = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/notifications/unread-count/${currentUserId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include", // Include credentials if you're using cookies for authentication
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setUnreadCount(data.unreadCount); // Update the unread count in the state
  //     } else {
  //       console.error("Failed to fetch unread notification count");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching unread notification count:", error);
  //   }
  // };
  // useEffect(() => {
  //   if (currentUserId) {
  //     fetchUnreadCount();
  //   }
  //   // eslint-disable-next-line
  // }, [currentUserId]);
  return (
    <>
      <div
        className="fixed w-full border-gray-200 dark:bg-gray-900 z-50"
        style={{ backgroundColor: "rgb(233 229 197)" }}
      >
        <div className="flex flex-wrap items-center justify-between p-4 ">
          <Link
            to="/homepage"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              JIIT Alumni Portal
            </span>
          </Link>
          {/* Hamburger menu button for mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="block text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Desktop menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul
              style={{ backgroundColor: "rgb(233 229 197)" }}
              className="flex flex-col font-medium border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li className="mr-4">
                <Link
                  to="/homepage"
                  className={`nav-link ${
                    location.pathname === "/homepage"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/grownnetwork"
                  className={`nav-link ${
                    location.pathname === "/grownnetwork"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  Grow Network
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/jobopening"
                  className={`nav-link ${
                    location.pathname === "/jobopening"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  Job Openings
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/resume"
                  className={`nav-link ${
                    location.pathname === "/resume"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  My Network
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/askforreferal"
                  className={`nav-link ${
                    location.pathname === "/askforreferal"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  Ask For Referral
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/messages"
                  className={`nav-link ${
                    location.pathname === "/messages"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  <div className="notification-icon cursor-pointer relative">
                    Messaging
                    {unreadMessageCount > 0 && (
                      <span className="badge bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                        {unreadMessageCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/notification"
                  className={`nav-link ${
                    location.pathname === "/notification"
                      ? "ml-2 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : ""
                  }`}
                >
                  <div className="notification-icon cursor-pointer relative">
                    <i className="fa fa-bell text-2xl"></i>
                    {unreadCount > 0 && (
                      <span className="badge bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex items-center text-sm bg-gray-800 rounded-full p-1"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        {user?.image ? (
          <img
          className="w-8 h-8 rounded-full"
          src={user && user.image}
          alt={user ? user.name : "User avatar"}
        />
        ) : (
          <FiUser className="text-white w-8 h-8 rounded-full" />
        )}
      </button>
      
      {/* Dropdown Menu */}
      <div
        id="dropdownAvatar"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        {/* User Info */}
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white ">
          <div className="flex items-center space-x-2">
            <FiUser className="text-gray-400 dark:text-gray-200" />
            <span>{user?.name || 'Guest User'}</span>
          </div>
          <div className="font-medium text-gray-500 dark:text-gray-300 truncate">
            {user?.email || 'user@example.com'}
          </div>
        </div>
        
        {/* Menu Items */}
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FiGrid className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClickSignOut}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
