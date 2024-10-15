import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const AdminVerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/admin/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, otp }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        navigate("/admin/reset-password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" rounded-md flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          OTP Verification
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h6 className="font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              OTP sent to your email
            </h6>
            <form className="space-y-4 md:space-y-6" action="/">
              <div>
                <label
                  htmlFor="enrollNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter OTP
                </label>
                <input
                  type=""
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required=""
                />
              </div>
              <Link to="/admin/reset-password">
                <button
                  type="submit"
                  onClick={handleVerifyOTP}
                  className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Verify
                </button>
              </Link>
              {message && <p className="text-sm text-red-500">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminVerifyOTP;
