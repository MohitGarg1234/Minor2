import React, { useState } from 'react';


const Setting = () => {
    const [notificationSettings, setNotificationSettings] = useState({
        jobSearch: false,
        hiring: false,
      });
    
      const handleNotificationToggle = (setting) => {
        setNotificationSettings((prevSettings) => ({
          ...prevSettings,
          [setting]: !prevSettings[setting],
        }));
      };
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="jobSearch"
                    checked={notificationSettings.jobSearch}
                    onChange={() => handleNotificationToggle('jobSearch')}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <label htmlFor="jobSearch" className="ml-2">Receive job search notifications</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hiring"
                    checked={notificationSettings.hiring}
                    onChange={() => handleNotificationToggle('hiring')}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <label htmlFor="hiring" className="ml-2">Receive hiring notifications</label>
                </div>
              </div>
            </div>
            <div className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
              <ul className="list-disc list-inside">
                <li><a href="/connections">Manage Connections</a></li>
                <li><a href="/posts">Manage Posts</a></li>
                <li><a href="/messages">Check Messages</a></li>
                <li><a href="/requests">Check Requests</a></li>
                <li><a href="/profile">Update Profile</a></li>
              </ul>
            </div>
          </div>
        </div>
      );
}

export default Setting
