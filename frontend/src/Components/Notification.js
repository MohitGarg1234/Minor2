import React, { useState } from 'react'
import Logo from "../images/Logo-jiit.png";

const Notification = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'You have a new connection request', read: false, online: true,image:'john_doe.jpg'},
        { id: 2, message: 'Your post received 10 likes', read: true, online: true, image: null},
        { id: 3, message: 'New job opportunity available', read: false , online: false, image:'john_doe.jpg'},
        // Add more notification objects as needed
      ]);
    
      const markAsRead = (id) => {
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, read: true };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      };

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
          key={notification.id}
          className={`flex items-center p-4 border rounded ${
            notification.read ? 'bg-gray-100' : 'bg-blue-100'
          }`}
          >
            <div className="flex items-center">
              <div className="relative me-4">
              <img
                src={Logo}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
                <span className={`top-0 start-7 absolute w-3.5 h-3.5 border-2 border-white rounded-full ${notification.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
              <p className="flex-grow">{notification.message}</p>
            </div>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="mt-2 ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    
    </>
  )
}

export default Notification
