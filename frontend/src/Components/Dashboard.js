import React, { useContext, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import AddExperience from "./AddExperience";
import UpdateExperience from "./UpdateExperience";
import AddSkills from "./AddSkills";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";



const Dashboard = () => {
  const { user, connectionsCount, currentUserId } = useContext(UserContext);
  const [isModalOpenAddExperience, setIsModalOpenAddExperience] = useState(false);
  const [isModalOpenUpdateExperience, setIsModalOpenUpdateExperience] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);
  const [isModalOpenSkills, setIsModalOpenSkills] = useState(false);
  const userId = currentUserId;

  const handleOpenModalAddExperience = () => {
    setIsModalOpenAddExperience(true);
  };

  const handleCloseModalAddExperience = () => {
    setIsModalOpenAddExperience(false);
  };
  const handleOpenModalSkills = () => {
    setIsModalOpenSkills(true);
  };

  const handleCloseModalSkills = () => {
    setIsModalOpenSkills(false);
  };

  const handleOpenModalUpdateExperience = (experienceId) => {
    setSelectedExperienceId(experienceId);
    setIsModalOpenUpdateExperience(true);
  };

  const handleCloseModalUpdateExperience = () => {
    setIsModalOpenUpdateExperience(false);
  };

  const handleDeleteExperience = async (experienceId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${userId}/experience/${experienceId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Experience deleted");
        setSelectedExperienceId(null);
        window.location.reload();
      } else {
        console.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteSkill = async (sId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${userId}/skills/${sId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Skill deleted");
        toast.success('Skill deleted successfully!', {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        
      } else {
        console.error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen "
      style={{ backgroundColor: "#f5efe7", padding: "20px" }}
    >
      <div
        className="card mt-16 bg-gray-100 rounded-lg shadow-lg p-6 mx-auto"
        style={{
          width: "50%",
          marginBottom: "20px",
        }}
      >
        <div className="flex items-center mb-4">
          <img
            src={user && user.image}
            alt=""
            className="rounded-full border-2 border-gray-300"
            style={{
              height: "100px",
              width: "100px",
              padding: "3px",
              marginRight: "15px",
            }}
          />
          <div>
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h5>
            {user.Experience[0] && (
              <p className="text-gray-700 dark:text-gray-400">
                {user.Experience[0].companyName} | {user.Experience[0].role}
              </p>
            )}
            <Link
              to="/allConnections"
              className="text-blue-600 hover:underline dark:text-gray-400"
            >
              {connectionsCount} connections
            </Link>
          </div>
        </div>
        <div className="pl-2">
          {user.emailVisibility && (
            <p className="flex items-center text-gray-700 dark:text-gray-400 mb-2">
            <FaEnvelope className="mr-2 text-blue-500" /> Email: {user.email}
          </p>
          )}
          {user.mobileVisibility && (
            <p className="flex items-center text-gray-700 dark:text-gray-400 mb-2">
            <FaPhoneAlt className="mr-2 text-green-500" /> Mobile: {user.MobileNumber}
          </p>
          )}
          {user.LinkedInVisibility && (
            <p className="flex items-center text-gray-700 dark:text-gray-400 mb-2">
            <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn: {user.LinkedIn}
          </p>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md" style={{width:"50%"}}>
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
            Experience
          </h5>
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            onClick={handleOpenModalAddExperience}
          >
            <FaPlus size={14}/>
          </button>
          <AddExperience
            isOpen={isModalOpenAddExperience}
            onRequestClose={handleCloseModalAddExperience}
            userId={userId}
          />
        </div>
        {user.Experience.map((experience, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {experience.companyName}
              </p>
              <div className="flex items-center">
              <button
                className="p-2 rounded-full text-gray-500 hover:text-blue-500 focus:outline-none"
                onClick={() => handleOpenModalUpdateExperience(experience._id)}
              >
                <FaPencilAlt />
              </button>
              <button
                className="p-2 rounded-full text-gray-500 hover:text-red-500 focus:outline-none ml-2"
                onClick={() => handleDeleteExperience(experience._id)}
              >
                <FaTrash />
              </button>
              </div>
            </div>
            <p className="text-md text-gray-700 dark:text-gray-300">
              Role: {experience.role}
            </p>
            <p className="text-md text-gray-700 dark:text-gray-300">
              Duration: {experience.years}
            </p>
          </div>
        ))}
      </div>
      {selectedExperienceId && (
        <UpdateExperience
          isOpen={isModalOpenUpdateExperience}
          onRequestClose={handleCloseModalUpdateExperience}
          userId={userId}
          experienceId={selectedExperienceId}
        />
      )}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md my-4" style={{width:"50%"}}>
        <div className="flex items-center mb-2">
          <FaGraduationCap className="text-blue-500 dark:text-blue-400 text-2xl mr-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
            Education
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user.Education}
        </p>
      </div>
      <div
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2 mt-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills
          </h5>
          <div>
            <button
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition duration-300"
              onClick={handleOpenModalSkills}
            >
              <FaPlus />
            </button>
            <AddSkills
              isOpen={isModalOpenSkills}
              onRequestClose={handleCloseModalSkills}
              userId={userId}
            />
          </div>
        </div>
        {user.Skill.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded-lg mb-1 shadow"
          >
            {/* <div className="flex justify-between items-center"> */}
            <p className="text-md font-normal text-gray-800 dark:text-gray-100">
              {skill.skillName}
            </p>
              <div className="flex items-center">
              <button
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300"
                onClick={() => handleDeleteSkill(skill._id)}
              >
                <FaTrash size={10}/>
              </button>
                <ToastContainer/>
              </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
