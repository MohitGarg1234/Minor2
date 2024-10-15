import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/admin/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
    //   console.log(email);
      const data = await response.json();
      setMessage(data.message);
      if (data.message === "Email is valid") {
        navigate("/admin/verify-otp", {
          state: { email: email },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h1>
            <form onSubmit={handleVerifyEmail} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="enrollmentNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="enrollmentNumber"
                  id="enrollmentNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify Email
              </button>
              <p className="text-sm font-dark text-red-500 text-gray-500 dark:text-gray-400 ">{message}</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Login?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Click here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default AdminForgotPassword;
