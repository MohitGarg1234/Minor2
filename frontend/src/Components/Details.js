import React,{useState} from "react";
import { Link } from "react-router-dom";
const Details = () => {
    const [isEmailLocked, setIsEmailLocked] = useState(false);
  const EmailLock = () => {
    setIsEmailLocked(true);
  };

  const EmailUnlock = () => {
    setIsEmailLocked(false);
  };
    const [isMobileLocked, setIsMobileLocked] = useState(false);
  const MobileLock = () => {
    setIsMobileLocked(true);
  };

  const MobileUnlock = () => {
    setIsMobileLocked(false);
  };
    const [isLidLocked, setIsLidLocked] = useState(false);
  const LidLock = () => {
    setIsLidLocked(true);
  };

  const LidUnlock = () => {
    setIsLidLocked(false);
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
            <i className="fa-solid fa-lock mr-3"></i>   Private Details
            </p>
          </div>
            <form className="space-y-4 md:space-y-6" action="/">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name 
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
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
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
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
                    <button onClick={EmailUnlock} style={{ transform: !isEmailLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={!isEmailLocked}>
                        <i className="ml-2 fa-solid fa-lock-open" ></i>
                    </button>
                    <button onClick={EmailLock} style={{ transform: isEmailLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={isEmailLocked}>
                        <i className="ml-2 fa-solid fa-lock"></i>
                    </button>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
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
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
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
                    <button onClick={MobileUnlock} style={{ transform: !isMobileLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={!isMobileLocked}>
                        <i className="ml-2 fa-solid fa-lock-open" ></i>
                    </button>
                    <button onClick={MobileLock} style={{ transform: isMobileLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={isMobileLocked}>
                        <i className="ml-2 fa-solid fa-lock"></i>
                    </button>
                  </label>
                  <input
                    type="number"
                    name="MobileNumber"
                    id="MobileNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="LinkedIn_ID"
                    className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    LinkedIn ID
                    <button onClick={LidUnlock} style={{ transform: !isLidLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={!isLidLocked}>
                        <i className="ml-2 fa-solid fa-lock-open" ></i>
                    </button>
                    <button onClick={LidLock} style={{ transform: isLidLocked ? 'scale(1.3)' : 'scale(1)' }} disabled={isLidLocked}>
                        <i className="ml-2 fa-solid fa-lock"></i>
                    </button>
                  </label>
                  <input
                    type=""
                    name="LinkedIn_ID"
                    id="LinkedIn_ID"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
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
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
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
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
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
                  type=""
                  name="CurrentCompany"
                  id="CurrentCompany"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Role
                </label>
                <input
                  type=""
                  name="role"
                  id="role"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  />
              </div>
              <div>
                <label
                  htmlFor="exprience"
                  className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Exprience
                </label>
                <input
                  type=""
                  name="exprience"
                  id="exprience"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  />
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block 2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Education
                </label>
                <input
                  type=""
                  name="education"
                  id="education"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  />
              </div>
                  </div>
              <Link to="/homepage">
                <button
                  type="submit"
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
