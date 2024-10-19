import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from './AdminSidebar';
import { AdminContext } from "../context/adminContext";
const AdminJobPost = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {adminId} = useContext(AdminContext) || {};
  console.log(adminId);
  // Fetch jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/getJobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobOpenings(data); // Set jobs into the state
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  // Delete job by ID
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/deleteJob/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      // Remove the job from the state
      setJobOpenings(jobOpenings.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error.message);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="container mx-auto" style={{ backgroundColor: "rgb(243 244 246 / var(--tw-bg-opacity))", minWidth: "100%" }}>
          <div className="flex-col p-2 ">
            <Link to="/adminjobposting"
              className="flex items-center justify-center font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              <button
                id="postJobBtn"
                className="mt-2 relative bg-blue-500 text-white font-semibold py-2 px-8 rounded-full flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white absolute left-4 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="11" strokeWidth="2" stroke="white" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="ml-10">Post a Job</span>
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
      <div className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="p-4 w-2/3">
          <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
            Company - {job.CompanyName}
          </h6>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Role - {job.Role}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Type - {job.JobType}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Experience - {job.Experience}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Skills Required - {job.SkillsRequired}
          </p>
          {job.postedBy && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Posted By - {job.postedBy.name}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 mr-2">
          <a href={job.ApplyLinks} rel="noreferrer" target="_blank"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
          >
            View Job
          </a>
          <button
            onClick={() => onDelete(job._id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobPost;
