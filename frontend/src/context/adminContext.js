import React, { createContext, useState, useEffect } from 'react';
export const AdminContext = createContext();

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

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const decodedToken = parseJwt(token);
      if (!decodedToken || !decodedToken.userId) {
        console.error('Invalid token');
        return;
      }
      const currentAdminId = decodedToken.userId;
      setAdminId(currentAdminId);
      if(role === 'admin') {
        try {
          const response = await fetch('http://localhost:5000/api/admin/getAdminDetails', {
            headers: {
              Authorization: `${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch admin details');
          }
          const data = await response.json();
          if (data.success) {
            setAdmin(data.admin);
          } else {
            console.error('Failed to fetch admin data:', data.message);
          }
        } catch (error) {
          console.error('Error fetching admin details:', error);
        }
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, adminId }}>
      {children}
    </AdminContext.Provider>
  );
};
