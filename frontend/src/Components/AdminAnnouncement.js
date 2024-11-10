import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../context/userContext";
import AdminSidebar from './AdminSidebar';
import { FaTrash } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const AdminAnnouncement = () => {
  const { currentUserId } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const token = localStorage.getItem("token");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/postAnnouncements", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, postedBy: currentUserId }),
      });
      if (!response.ok) throw new Error("Failed to add announcement");

      setTitle("");
      setDescription("");
      toggleModal();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error adding announcement:", error.message);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/getAnnouncements", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch announcements");

      const data = await response.json();
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error.message);
    }
  };

  // Function to delete an announcement by ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/deleteAnnouncements", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Pass the id in the request body
      });
      if (!response.ok) throw new Error("Failed to delete announcement");
  
      fetchAnnouncements(); // Refresh the announcements list after deletion
    } catch (error) {
      console.error("Error deleting announcement:", error.message);
    }
  };
  

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className='w-1/6'>
      <AdminSidebar />
      </div>
      
      <div className="flex-1 p-10 bg-gray-100 " style={{
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  }}>
        <div className="bg-gray-100 min-h-screen pb-4" style={{
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  }}>
          <div className="flex justify-center py-4">
            <button
              onClick={toggleModal}
              className="px-6 py-2.5 bg-[#4c38a9] rounded-lg text-white font-medium text-s leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
              Post Announcement
            </button>
          </div>

          <div className="flex justify-center items-center py-6">
            <h2 className="text-2xl font-semibold text-blue-800 flex items-center">
              <span className="mr-4">📢</span> Announcements
            </h2>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow max-w-md w-full max-h-full overflow-y-auto" style={{ backgroundColor: "rgb(233 229 197)" }}>
                <div className="flex justify-between py-4 text-blue-800 border-b-slate-400 border-b-2 mx-4">
                  <span className="text-lg font-medium text-blue-800">New Announcement</span>
                  <RxCross2
                    size={23}
                    className="mt-2 cursor-pointer hover:text-black "
                    onClick={toggleModal}
                  />
                </div>
                <form className="p-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium">Announcement Title</label>
                    <input
                      id="title"
                      type="text"
                      className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                      placeholder="Enter announcement title..."
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium">Announcement Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                      placeholder="Write your announcement here..."
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Post New Announcement
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#f3e5f3] rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
                  >
                    <div className="flex justify-between items-center pb-2 border-b-2 border-b-slate-400">
                      <h5 className="text-lg font-semibold text-blue-800">{announcement.title}</h5>
                      {/* Delete Icon */}
                      <button onClick={() => handleDelete(announcement._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                    <p className="text-gray-700 pt-2 mb-3">{announcement.description}</p>
                    <small className="text-gray-500">Date: {new Date(announcement.date).toLocaleDateString()}</small>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">No announcements available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
