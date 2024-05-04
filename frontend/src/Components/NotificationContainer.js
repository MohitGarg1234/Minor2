// NotificationContainer.js
import React, { useState, useEffect } from 'react';
import NotificationList from './NotificationList';
const NotificationContainer = () => {
  const token = (localStorage.getItem("token"));
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
// Extract user ID from decoded token
const decodedToken = parseJwt(token);
const userId = decodedToken.userId;
console.log(userId);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    // Fetch notifications from the server
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/notifications?userId=${userId}`);
      if (!response.ok) {
        console.log('Failed to fetch notifications');
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      console.log(data);
      setNotifications(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleAccept = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/accept`, { method: 'PUT' });
      if (!response.ok) {
        throw new Error('Failed to accept notification');
      }
      // Refresh notifications after accepting
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleReject = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/reject`, { method: 'PUT' });
      if (!response.ok) {
        throw new Error('Failed to reject notification');
      }
      // Refresh notifications after rejecting
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <NotificationList
      notifications={notifications}
      handleAccept={handleAccept}
      handleReject={handleReject}
    />
  );
}

export default NotificationContainer;
