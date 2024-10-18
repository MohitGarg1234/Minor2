// import React, { useContext, useEffect, useState } from "react";
// import Logo from "../images/Logo-jiit.png";
// import { UserContext } from "../context/userContext";

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const { currentUserId } = useContext(UserContext);
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/notifications/${currentUserId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setNotifications(data.notifications);
//         setUnreadCount(data.unreadCount);

//         console.log(data.notifications);
//         console.log(data.unreadCount);
//       } else {
//         console.error("Failed to fetch notifications");
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   // Mark all notifications as read and reset the unread count
//   const markAsRead = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/notifications/read",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       if (response.ok) {
//         setUnreadCount(0); // Reset count in UI after marking as read
//       } else {
//         console.error("Failed to mark notifications as read");
//       }
//     } catch (error) {
//       console.error("Error marking notifications as read:", error);
//     }
//   };
//   useEffect(() => {
//     fetchNotifications();
//   },[]);
  
//   return (
//     <>
//       <div className="notification-icon" onClick={markAsRead}>
//         <i className="fa fa-bell"></i>
//         {unreadCount > 0 && (
//           <span className="badge">{unreadCount}</span> // Show badge for unread count
//         )}
//       </div>
//       <div className="container mx-auto p-4">
//         <div className="space-y-4">
//           {notifications.length === 0 }{
//             <p>No notifications available</p>
//           }
//           {notifications.length!==0 &&
//             notifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className={ `flex items-center p-4 border rounded bg-blue-100`}
//               >
//                 <div className="flex items-center">
//                   <div className="relative me-4">
//                     <img
//                       src={Logo}
//                       alt="Profile"
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                   </div>
//                   <p className="flex-grow">
//                     {notification.sender.name} {"Liked Your Post"}
//                   </p>
//                   <p>{notification.article.content}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Notification;

// // import React, { useEffect, useState } from 'react';
// // import io from 'socket.io-client';

// // const socket = io('http://127.0.0.1:5000'); // Change to your backend URL

// // socket.on('connect', () => {
// //   console.log('Connected to Socket.IO server');
// // });
// // socket.on('connect_error', (error) => {
// //   console.error('Connection Error:', error);
// // });
// // const Notification = ({ userId }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   useEffect(() => {
// //     // Fetch notifications initially using fetch
// //     fetch(`/api/notifications/${userId}`)
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch notifications');
// //         }
// //         return response.json();
// //       })
// //       .then(data => setNotifications(data))
// //       .catch(error => console.error('Error fetching notifications:', error));

// //     // Listen for real-time notifications
// //     socket.on(`notification:${userId}`, (notification) => {
// //       setNotifications(prevNotifications => [notification, ...prevNotifications]);
// //     });

// //     // Cleanup the socket listener when the component unmounts
// //     return () => {
// //       socket.off(`notification:${userId}`);
// //     };
// //   }, [userId]);

// //   return (
// //     <div>
// //       <h3>Notifications</h3>
// //       <ul>
// //         {notifications.map((notification, index) => (
// //           <li key={index}>
// //             {notification.message}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Notification;

import React, { useContext, useEffect, useState } from "react";
import Logo from "../images/Logo-jiit.png";
import { UserContext } from "../context/userContext";

const Notification = ({unreadCount,setUnreadCount}) => {
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
        console.log('marked as read');
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
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold">Notifications</h2>
  </div>
  <div className="space-y-4">
    {notifications.length === 0 ? (
      <p className="text-center text-gray-500">No notifications available</p>
    ) : (
      notifications.map((notification) => {
        // Check if both sender and article are present
        if (!notification.sender || !notification.article) {
          return null; // Skip rendering this notification
        }
        
        return (
          <div
            key={notification._id}
            className="flex items-start p-4 border-b last:border-b-0 transition duration-300 hover:bg-blue-50 rounded-lg"
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
              <p className="text-gray-600">{notification.article.content}</p>
              <p className="text-gray-500 text-xs">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          </div>
        );
      })
    )}
  </div>
</div>
  );
};

export default Notification;
