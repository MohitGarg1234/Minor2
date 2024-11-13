import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const AdminSidebar = () => {
    // const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
//   const handleClickSignOut = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };
  return (
    <div>
        <div className="fixed flex min-h-screen bg-[#4c38a9]">
        {/* Sidebar */}
        <div className="w-64 bg-white-800 text-black p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Admin Panel</h2>
            <ul className="space-y-6 ">
            <li>
                <Link to="/job-post" className="block p-3 text-center rounded-lg font-bold text-white border-b-2 hover:bg-teal-400 m-2">
                Job Post
                </Link>
            </li>

            <li>
                <Link to="/article-post" className="block p-3 text-center rounded-lg font-bold text-white border-b-2 hover:bg-teal-400 m-2">
                Post Articles
                </Link>
            </li>
            <li>
                <Link to="/announcements" className="block p-3 text-center rounded-lg font-bold text-white border-b-2 hover:bg-teal-400 m-2">
                Announcements
                </Link>
            </li>
            </ul>

            <button
          onClick={handleSignOut}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center p-3 text-center rounded-lg font-bold text-white hover:bg-[#322375]"
        >
          <FiLogOut className="mr-2" /> Sign Out
        </button>
        </div>

        {/* Content */}
        {/* <div className="flex-1 p-10 bg-gray-800"> */}
            {/* This is where you will render the individual components */}
        {/* </div> */}
        </div>
    </div>
  )
}

export default AdminSidebar
