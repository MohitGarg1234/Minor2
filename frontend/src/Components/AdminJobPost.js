import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { AdminContext } from "../context/adminContext";
import { CiCirclePlus } from "react-icons/ci";
import { FaBuilding, FaBriefcase, FaUserTie, FaTools } from "react-icons/fa";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";
const AdminJobPost = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { adminId } = useContext(AdminContext) || {};
  console.log(adminId);
  // Fetch jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getJobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobOpenings(data); // Set jobs into the state
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  // Delete job by ID
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/deleteJob/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Remove the job from the state
      setJobOpenings(jobOpenings.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error.message);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/6">
        <AdminSidebar />
      </div>
      <div
        className="flex-1 p-10 bg-gray-100"
        style={{
          backgroundColor: "#8EC5FC",
          backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
        }}
      >
        <div
          className="container mx-auto"
          style={{
            backgroundColor: "#8EC5FC",
            backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
          }}
        >
          <div className="flex-col p-2 ">
            <Link
              to="/adminjobposting"
              className="flex items-center justify-center font-medium text-primary-600 hover:underline dark:text-primary-500 "
            >
              <button
                id="postJobBtn"
                className="mt-2 relative bg-[#4c38a9] text-white font-semibold py-2 px-4 rounded-2xl flex items-center space-x-2 hover:bg-sky-600 focus:outline-none focus:bg-blue-600 mb-4"
              >
                <CiCirclePlus size={28} />
                <span className="ml-10 ">Post a Job</span>
              </button>
            </Link>

            <div className="mx-auto lg:grid lg:grid-cols-2 md:grid grid-cols-2">
              {loading ? (
                <p>Loading...</p>
              ) : (
                jobOpenings.map((job) => (
                  <JobListing key={job._id} job={job} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListing = ({ job, onDelete }) => {
  return (
    <div className="w-full md:w-10/12 md:ml-5 lg:w-10/12 mt-5">
      <div className="mb-4 flex items-start bg-[#f3e5f3] border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-shadow duration-300">
        {/* Job Information Section */}
        <div className="p-6 w-2/3">
          <h6 className="font-bold mb-3 text-gray-900 dark:text-white text-lg flex items-center">
            <FaBuilding className="mr-2 text-blue-700" /> Company -{" "}
            {job.CompanyName}
          </h6>
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center mb-1">
            <FaBriefcase className="mr-2 text-gray-500" /> Role - {job.Role}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center mb-1">
            <FaUserTie className="mr-2 text-gray-500" /> Type - {job.JobType}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center mb-1">
            <FaTools className="mr-2 text-gray-500" /> Experience -{" "}
            {job.Experience}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center mb-1">
            <FaTools className="mr-2 text-gray-500" /> Skills -{" "}
            {job.SkillsRequired}
          </p>
          {job.postedBy && (
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
              <FaUserTie className="mr-2 text-gray-500" /> Posted By -{" "}
              {job.postedBy.name}
            </p>
          )}
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col justify-center items-center my-12 space-y-4 mr-4">
          <a
            href={job.ApplyLinks}
            rel="noreferrer"
            target="_blank"
            className="flex items-center justify-center w-32 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition-colors duration-200"
          >
            <FiExternalLink className="mr-2" /> View Job
          </a>
          <button
            onClick={() => onDelete(job._id)}
            className="flex items-center justify-center w-32 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 transition-colors duration-200"
          >
            <FiTrash2 className="mr-2" /> Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobPost;
