import React,{ useState} from "react";
import { Link, useLocation } from "react-router-dom";
const Details = () => {
  const [userDetails, setUserDetails] = useState(useLocation().state.userDetails);
  // console.log(userDetails.mobileVisibility);
  const [mobileVisibility, setmobileVisibility] = useState(useLocation().state.userDetails.mobileVisibility);
  const [emailVisibility, setemailVisibility] = useState(useLocation().state.userDetails.emailVisibility);
  const [LinkedInVisibility, setLinkedInVisibility] = useState(useLocation().state.userDetails.LinkedInVisibility);
  const currentYear = new Date().getFullYear();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  const toggleVisibility = (field) => {
    switch (field) {
      case 'mobile':
        let newStatus = !mobileVisibility;
        setmobileVisibility(newStatus);
        setUserDetails({
          ...userDetails,
          mobileVisibility : newStatus 
        })
        break;
      case 'email':
        let newStatus1 = !emailVisibility;
        setemailVisibility(!emailVisibility);
        setUserDetails({
          ...userDetails,
          emailVisibility : newStatus1 
        })
        break;
        case 'LinkedIn':
        let newStatus2 = !LinkedInVisibility;
        setLinkedInVisibility(!LinkedInVisibility);
        setUserDetails({
          ...userDetails,
          LinkedInVisibility : newStatus2 
        })
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = userDetails;
    // Check if the user is an alumni
    if(currentYear > userDetails.YearOfGraduation){
      console.log("");
      setUserDetails({
        ...userDetails,
        isAlumni : true
      })
    }
    try {
      // Send a PUT request to your server with the updated user details
      const response = await fetch(`http://127.0.0.1:5000/api/updateUserDetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (response.ok) {
        window.location.href = '/login';
      } else {
        const error = await response.json();
        console.error(error);
        alert("Invalid");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
  return (
    <section className="bg-gray-300 dark:bg-gray-900 ">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mt-2 mb-2 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
          Complete Your Details
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid md:grid-cols-2 md:gap-6">
              <p className="mt-2  w-full 5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <i className="fa-solid fa-lock-open mr-3"></i> Public Details
              </p>
              <p className="mt-2 w-full 5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <i className="fa-solid fa-lock mr-3"></i> Private Details
              </p>
            </div>
            <form className="space-y-4 md:space-y-6" action="/">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white " htmlFor="file_input">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4" id="file_input" type="file"/>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="enrollNo"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enrollment No
                  </label>
                  <input
                    type="number"
                    name="enrollNo"
                    id="enrollNo"
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    value={userDetails.enrollmentNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Id
                    <i className={`ml-2 fa-solid ${emailVisibility ? 'fa-lock-open' : 'fa-lock'} mr-3`} onClick={() => toggleVisibility('email')}></i> 

                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.email}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="yog"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Year of Graduation
                  </label>
                  <input
                    type="number"
                    name="yog"
                    id="yog"
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.YearOfGraduation}
                    disabled
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="MobileNumber"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number
                    <i className={`ml-2 fa-solid ${mobileVisibility ? 'fa-lock-open' : 'fa-lock'} mr-3`} onClick={() => toggleVisibility('mobile')}></i> 
                  </label>
                  <input
                    type="number"
                    name="MobileNumber"
                    id="MobileNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.MobileNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="LinkedIn"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    LinkedIn ID
                    <i className={`ml-2 fa-solid ${LinkedInVisibility ? 'fa-lock-open' : 'fa-lock'} mr-3`} onClick={() => toggleVisibility('LinkedIn')}></i>      
                  </label>
                  <input
                    type="text"
                    name="LinkedIn"
                    id="LinkedIn"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.LinkedIn}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                    <i className="ml-2 fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                    <i className="ml-2 fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="CurrentCompany"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Company
                  </label>
                  <input
                    type="text"
                    name="CurrentCompany"
                    id="CurrentCompany"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.CurrentCompany}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Role"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="Role"
                    id="Role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.Role}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Experience"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Exprience
                  </label>
                  <input
                    type="text"
                    name="Experience"
                    id="Experience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.Experience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Education"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Education
                  </label>
                  <input
                    type="text"
                    name="Education"
                    id="Education"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userDetails.Education}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Link to="/homepage">
                <button onClick={handleSubmit}
                  type="button"
                  className="mt-2 w-full 5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  SignUp
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
