import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const parseJwt = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const decodedToken = parseJwt(token);
      if (!decodedToken || !decodedToken.userId) {
        console.error('Invalid token');
        return;
      }
      const currentUserId = decodedToken.userId 
      setCurrentUserId(currentUserId);
      try {
        const response = await fetch(`http://localhost:5000/api/${currentUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
        setConnectionsCount(data.connections.length);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, connectionsCount, currentUserId}}>
      {children}
    </UserContext.Provider>
  );
};
