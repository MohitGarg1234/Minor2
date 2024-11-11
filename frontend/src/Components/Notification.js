import React, { useContext, useEffect, useState } from "react";
import Logo from "../images/Logo-jiit.png";
import { UserContext } from "../context/userContext";

const Notification = ({ unreadCount, setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);
  // const [unreadCount, setUnreadCount] = useState(0);
  const { currentUserId } = useContext(UserContext);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        // setUnreadCount(data.unreadCount);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark all notifications as read and reset the unread count
  const markAsRead = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/read/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("marked as read");
        setUnreadCount(0); // Reset count in UI after marking as read
      } else {
        console.error("Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    markAsRead();
    // eslint-disable-next-line
  }, [currentUserId]);

  return (
    <div className="min-h-screen" style={{
      backgroundColor: "#ad866a",
      backgroundImage:
        "linear-gradient(62deg, #ad866a 0%, #f9d96c 50%, #f3e4cf 100%)",
      minWidth: "100%",
    }}>
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto " style={{
        backgroundColor: "#ad866a",
        backgroundImage:
          "linear-gradient(62deg, #ad866a 0%, #f9d96c 50%, #f3e4cf 100%)",
        minWidth: "100%",
      }}>
      <div className="flex items-center justify-between mb-4 mt-14">
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">
            No notifications available
          </p>
        ) : (
          notifications.map((notification) => {
            // Check if both sender and article are present
            if (!notification.sender || !notification.article) {
              return null; // Skip rendering this notification
            }

            return (
              <div
                key={notification._id}
                className="flex items-start p-4 border-b last:border-b-0 transition duration-300 hover:bg-amber-200 rounded-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={Logo}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 font-medium">
                    {notification.sender.name} liked your post
                  </p>
                  <p className="text-gray-600">
                    {notification.article.content}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
    </div>
  );
};

export default Notification;
