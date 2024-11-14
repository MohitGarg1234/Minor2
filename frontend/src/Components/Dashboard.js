import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import AddExperience from "./AddExperience";
import UpdateExperience from "./UpdateExperience";
import AddSkills from "./AddSkills";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FiPlusCircle, FiTrash2, FiEdit } from "react-icons/fi";

const Dashboard = () => {
  const { user, connectionsCount, currentUserId } = useContext(UserContext);
  const [isModalOpenAddExperience, setIsModalOpenAddExperience] =
    useState(false);
  const [isModalOpenUpdateExperience, setIsModalOpenUpdateExperience] =
    useState(false);
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
        // console.log("Skill deleted");
        toast.success("Skill deleted successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
            src={user.image}
            alt=""
            className="rounded-full border-2 border-gray-300 dark:border-gray-600 mr-4"
            style={{ height: "100px", width: "100px" }}
          />
          <div>
            <h5 className="text-2xl font-bold">{user.name}</h5>
            {user.Experience[0] && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.Experience[0].companyName} | {user.Experience[0].role}
              </p>
            )}
            <Link
              to="/allConnections"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {connectionsCount} connections
            </Link>
          </div>
        </div>
        <div className="text-sm space-y-2">
          {user.emailVisibility && (
            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
            </p>
          )}
          {user.mobileVisibility && (
            <p className="flex items-center">
              <FaPhoneAlt className="mr-2 text-green-500" /> {user.MobileNumber}
            </p>
          )}
          {user.LinkedInVisibility && (
            <p className="flex items-center">
              <FaLinkedin className="mr-2 text-blue-700" /> {user.LinkedIn}
            </p>
          )}
        </div>
      </div>
      <div
        className="bg-gray-100 p-6 rounded-lg shadow-md mb-1"
        style={{ width: "50%" }}
      >
        <div className="flex justify-between items-center border-b-2 pb-2">
          <h5 className="text-2xl font-bold">Experience</h5>
          <button
            onClick={handleOpenModalAddExperience}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiPlusCircle size={24} />
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
            className="pt-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-lg">{experience.companyName}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleOpenModalUpdateExperience(experience._id)
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <p>Role: {experience.role}</p>
            <p>Duration: {experience.years}</p>
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
      <div
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md my-4"
        style={{ width: "50%" }}
      >
        <div className="flex items-center mb-2 border-b-2 pb-2">
          <FaGraduationCap className="text-blue-500 text-2xl mr-2 " />
          <h5 className="text-2xl font-bold">Education</h5>
        </div>
        <p>{user.Education}</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md w-full md:w-1/2 mt-1">
        <div className="flex justify-between items-center mb-2 p-2 border-b-2">
          <h5 className="text-2xl font-bold">Skills</h5>
          <button
            onClick={handleOpenModalSkills}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiPlusCircle size={24} />
          </button>
          <AddSkills
            isOpen={isModalOpenSkills}
            onRequestClose={handleCloseModalSkills}
            userId={userId}
          />
        </div>
        {user.Skill.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
          >
            <p>{skill.skillName}</p>
            <button
              onClick={() => handleDeleteSkill(skill._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
