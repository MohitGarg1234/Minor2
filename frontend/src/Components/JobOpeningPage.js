import React from 'react'

const JobOpeningPage = () => {
  return (
    <>
        <div className="w-1/3 mx-auto mb-4">
            <div className="text-center border border-gray-300 p-2 rounded-full">
                <h2 className="text-lg font-semibold text-gray-800 rounded-full" style={{ padding: '10px', backgroundColor: 'rgb(182, 187, 194)'  }}>Enter Details of the Job</h2>
            </div>
        </div>

        <div className="bg-gray-100 p-6 mx-6 rounded-lg shadow-md mb-5">
            <form>
                <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" id="jobTitle" name="jobTitle" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>

                <label htmlFor="jobDescription" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Company Description</label>
                <textarea id="jobDescription" name="jobDescription" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows="4" required></textarea>
                
                <label htmlFor="jobLocation" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Job Location</label>
                <input type="text" id="jobLocation" name="jobLocation" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>

                <label htmlFor="jobLocation" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Role</label>
                <input type="text" id="jobLocation" name="jobLocation" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>

                <label htmlFor="jobLocation" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Experience</label>
                <input type="text" id="jobLocation" name="jobLocation" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>
                
                <label htmlFor="jobSalary" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Skills Requirements</label>
                <input type="text" id="jobSalary" name="jobSalary" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>

                <label htmlFor="jobSalary" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Apply Links</label>
                <input type="text" id="jobSalary" name="jobSalary" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>
                
                <label htmlFor="jobImage" className="block mt-4 mb-2 text-sm font-medium text-gray-700">Job Image</label>
                <input type="file" id="jobImage" name="jobImage" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required/>
                
                <button type="submit" className="mt-6 w-30 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Job Post</button>
            </form>
        </div>
    </>
  )
}

export default JobOpeningPage
