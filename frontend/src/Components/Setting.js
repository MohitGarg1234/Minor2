import React, { useState } from "react";

const Setting = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    message: true,
    jobSearch: false,
    hiring: false,
  });
  const [showNotification, setShowNotification] = useState(true);

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="container mx-auto p-4">
      {showNotification && (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Notification:</strong>
          <span className="block sm:inline">
            {" "}
            Your notification settings have been regrouped and simplified.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={handleNotificationClose}
          >
            <svg
              className="fill-current h-6 w-6 text-blue-700"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.354 5.354a2 2 0 00-2.828 0L10 7.172l-1.525-1.525a2 2 0 00-2.828 2.828L7.172 10l-1.525 1.525a2 2 0 002.828 2.828L10 12.828l1.525 1.525a2 2 0 002.828-2.828L12.828 10l1.525-1.525a2 2 0 000-2.828z" />
            </svg>
          </span>
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="message"
                checked={notificationSettings.message}
                onChange={() => handleNotificationToggle("message")}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label htmlFor="message" className="ml-2">
                Receive message notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="jobSearch"
                checked={notificationSettings.jobSearch}
                onChange={() => handleNotificationToggle("jobSearch")}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label htmlFor="jobSearch" className="ml-2">
                Receive job search notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hiring"
                checked={notificationSettings.hiring}
                onChange={() => handleNotificationToggle("hiring")}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label htmlFor="hiring" className="ml-2">
                Receive hiring notifications
              </label>
            </div>
          </div>
        </div>
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
          <ul className="list-disc list-inside">
            <li>
              <a href="/connections">Manage Connections</a>
            </li>
            <li>
              <a href="/posts">Manage Posts</a>
            </li>
            <li>
              <a href="/messages">Check Messages</a>
            </li>
            <li>
              <a href="/requests">Check Requests</a>
            </li>
            <li>
              <a href="/profile">Update Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
