import React, { useState, useContext } from "react";
import { AdminContext } from "../context/adminContext";

const AdminJobPosting = () => {
  const {adminId} = useContext(AdminContext);
  const [formData, setFormData] = useState({
    CompanyName: "",
    JobDescription: "",
    Role:"",
    JobType: "",
    JobSalary:"",
    JobLocation: "",
    Experience: "",
    SkillsRequired: "",
    ApplyLinks: "",
    postedBy: adminId,
  });

  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.ApplyLinks.startsWith("http://") &&
      !formData.ApplyLinks.startsWith("https://")
    ) {
      setError("Invalid link format. It must start with http:// or https://");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/admin/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to post job');
      }
      window.location.href = '/job-post';
    } catch (error) {
      console.error('Error posting job:', error);
      
    }
  };
  return (
    <>
      <div className="w-1/3 mx-auto">
        <div className="text-center border border-gray-300 p-2 rounded-full">
          <h2
            className="text-lg font-semibold text-gray-800 rounded-full"
            style={{ padding: "10px", backgroundColor: "rgb(182, 187, 194)" }}
          >
            Enter Details of the Job
          </h2>
        </div>
      </div>

      <div className="bg-gray-100 p-6 mx-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="CompanyName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={formData.CompanyName} onChange={handleChange}
            required
          />

          <label
            htmlFor="JobDescription"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="JobDescription"
            name="JobDescription"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
            value={formData.JobDescription} onChange={handleChange}
          ></textarea>

          <label
            htmlFor="Role"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            id="Role"
            name="Role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.Role} onChange={handleChange}
          />
          <label
            htmlFor="JobType"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <input
            type="text"
            id="JobType"
            name="JobType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.JobType} onChange={handleChange}
          />
          <label
            htmlFor="JobSalary"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Job Salary
          </label>
          <input
            type="text"
            id="JobSalary"
            name="JobSalary"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.JobSalary} onChange={handleChange}
          />

          <label
            htmlFor="JobLocation"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Job Location
          </label>
          <input
            type="text"
            id="JobLocation"
            name="JobLocation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.JobLocation} onChange={handleChange}
          />

          <label
            htmlFor="Experience"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Experience Required
          </label>
          <input
            type="text"
            id="Experience"
            name="Experience"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.Experience} onChange={handleChange}
          />

          <label
            htmlFor="SkillsRequired"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Skills Requirements
          </label>
          <textarea
            type="text"
            id="SkillsRequired"
            name="SkillsRequired"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
            value={formData.SkillsRequired} onChange={handleChange}
          />

          <label
            htmlFor="ApplyLinks"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Apply Links
          </label>
          <input
            type="text"
            id="ApplyLinks"
            name="ApplyLinks"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            value={formData.ApplyLinks} onChange={handleChange}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-30 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Job Post
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminJobPosting;


