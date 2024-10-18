import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div>
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white-800 text-black p-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
            <ul className="space-y-6">
            <li>
                <Link to="/job-post" className="block p-3 rounded-lg bg-[rgb(210,210,210)] hover:bg-teal-400 m-2">
                Job Post
                </Link>
            </li>

            <li>
                <Link to="/article-post" className="block p-3 rounded-lg bg-[rgb(210,210,210)] hover:bg-teal-400 m-2">
                Post Articles
                </Link>
            </li>
            <li>
                <Link to="/announcements" className="block p-3 rounded-lg bg-[rgb(210,210,210)] hover:bg-teal-400 m-2">
                Announcements
                </Link>
            </li>
            </ul>
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
