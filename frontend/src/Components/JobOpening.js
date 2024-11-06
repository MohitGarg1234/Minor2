import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const JobOpening = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const token = localStorage.getItem("token");
  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    
    return JSON.parse(jsonPayload);
  }
  // Extract user ID from decoded token
  const [userDetails,setUserDetails] = useState([]);
  const decodedToken = parseJwt(token);
  const currentUserId = decodedToken.userId;
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${currentUserId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };
  useEffect(() => {
    // Function to fetch data from API
    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  const fetchJobOpenings = useCallback(async () => {
    const fetchJobOpeningsWithUserDetails = async (jobs) => {
      const fetchUserDetails = async (userId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching user details:", error);
          return null;
        }
      };

      const jobsWithUserDetails = await Promise.all(
        jobs.map(async (job) => {
          const userDetails = await fetchUserDetails(job.postedBy);
          return { ...job, userDetails };
        })
      );
      return jobsWithUserDetails;
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/jobOpenings/${currentUserId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch job openings");
      }
      const data = await response.json();
      const jobsWithUserDetails = await fetchJobOpeningsWithUserDetails(data);
      setJobOpenings(jobsWithUserDetails);
      setLoading(false);
      setDataFetched(true); // Set dataFetched to true after successful fetch
    } catch (error) {
      console.error("Error fetching job openings:", error);
      setLoading(false);
    }
  }, [currentUserId]);
  useEffect(() => {
    if (!dataFetched) {
      fetchJobOpenings();
    }
  }, [dataFetched, fetchJobOpenings]);

  return (
    <div className="container mx-auto"  style={{backgroundColor:"#f5efe7",minWidth:"100%"}}>
      <div className="flex-col p-2 lg:ml-10 ">
        {userDetails.isAlumni &&
        <Link to="/jobopeningpage"
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
              <circle
                cx="12"
                cy="12"
                r="11"
                strokeWidth="2"
                stroke="white"
                fill="none"
                />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-10">Post a Job</span>
          </button>
        </Link>
          }
        <div className="mx-auto lg:grid lg:grid-cols-3 md:grid grid-cols-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            jobOpenings.map((job) => <JobListing key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

const JobListing = ({ job }) => {
  const matchPercentageColor = job.matchPercentage > 50 ? 'text-green-500' : 'text-red-500';
  console.log(job.ApplyLinks);
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
              Type - {job.Type}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Experience - {job.Experience}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Skills Required - {job.SkillsRequired}
            </p>
            {job.userDetails && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Posted By - {job.userDetails.name}
              </p>
            )}
            {job.matchPercentage > 0 &&
              <p className={`text-sm font-bold ${matchPercentageColor}`}>
                Skills Matching - {job.matchPercentage}%
              </p>
            }
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mr-2">
            <a href={job.ApplyLinks} rel="noreferrer" target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
            >
              View Job
            </a>
          </div>
        </div>
      </div>
  );
};

export default JobOpening;
