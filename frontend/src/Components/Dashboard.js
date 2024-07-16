import React, { useContext, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import AddExperience from "./AddExperience";
import UpdateExperience from "./UpdateExperience";
import AddSkills from "./AddSkills";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      className="flex flex-col items-center min-h-screen"
      style={{ backgroundColor: "#f5efe7", padding: "20px" }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "lightgray",
          borderRadius: "10px",
          marginBottom: "20px",
          width: "50%",
        }}
      >
        <img
          src={user && user.image}
          alt=""
          style={{
            height: "20vh",
            width: "10vw",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.name}
          </h5>
          {user.Experience[0] &&
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            {user.Experience[0].companyName} | {user.Experience[0].role}
          </p>
          }
          <Link
            to="/allConnections"
            className="font-normal text-blue-700 dark:text-gray-400"
          >
            {connectionsCount} connections
          </Link>
        </div>
        <div className="pl-4">
          {user.emailVisibility && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Email : {user.email}
            </p>
          )}
          {user.mobileVisibility && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Mobile Number : {user.MobileNumber}
            </p>
          )}
          {user.LinkedInVisibility && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              LinkedIn Id : {user.LinkedIn}
            </p>
          )}
        </div>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: "lightgray",
          borderRadius: "10px",
          width: "50%",
          padding: "10px",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Experience
          </h5>
          <div>
            <button className="mr-2" onClick={handleOpenModalAddExperience}>
              <FaPlus />
            </button>
            <AddExperience
              isOpen={isModalOpenAddExperience}
              onRequestClose={handleCloseModalAddExperience}
              userId={userId}
            />
          </div>
        </div>
        {user.Experience.map((experience, index) => (
          <div
            style={{ backgroundColor: "lightgray" }}
            key={index}
            className="p-4 rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {experience.companyName}
              </p>
              <div className="flex items-center">
                <button
                  className="ml-4"
                  onClick={() =>
                    handleOpenModalUpdateExperience(experience._id)
                  }
                >
                  <FaPencilAlt />
                </button>
                <button
                  className="ml-4"
                  onClick={() => handleDeleteExperience(experience._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-md text-gray-700 dark:text-gray-300">
              {experience.role}
            </p>
            <p className="text-md text-gray-700 dark:text-gray-300">
              {experience.years}
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
      <div
        className="card mt-4"
        style={{
          backgroundColor: "lightgray",
          borderRadius: "10px",
          width: "50%",
          padding: "10px",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Education
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {user.Education}
        </p>
      </div>
      <div
        className="card mt-4"
        style={{
          backgroundColor: "lightgray",
          borderRadius: "10px",
          width: "50%",
          padding: "10px",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Skills
          </h5>
          <div>
            <button className="mr-2"  onClick={handleOpenModalSkills}>
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
            style={{ backgroundColor: "lightgray" }}
            key={index}
            className="pl-4 rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {skill.skillName}
              </p>
              <div className="flex items-center">
                <button
                  className="mr-2"
                  onClick={() => handleDeleteSkill(skill._id)}
                >
                  <FaTrash />
                </button>
                <ToastContainer/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
