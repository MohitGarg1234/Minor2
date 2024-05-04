import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Message = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [resume, setResume] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const field1 = queryParams.get("field1");
  const field2 = queryParams.get("field2");

  const sendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      formData.append("resume", resume);
      formData.append("currentUserEmail", field1);
      formData.append("targetUserEmail", field2); 
      const response = await fetch("http://127.0.0.1:5000/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Error");
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <div className="container w-11/12 mx-auto">
        <form>
          <label htmlFor="subject" className="">
            Subject
          </label>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <input
                id="subject"
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Subject..."
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></input>
            </div>
          </div>
          <label htmlFor="subject" className="message">
            Message
          </label>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <textarea
                id="message"
                rows="8"
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
            htmlFor="resume"
          >
            Upload Resume
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
            id="resume"
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
          />
          <Link to='/homepage'>
          <button
            onClick={sendMessage}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
            Send
          </button>
            </Link>
        </form>
      </div>
    </>
  );
};

export default Message;
