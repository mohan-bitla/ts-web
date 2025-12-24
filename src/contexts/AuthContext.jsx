import React, { createContext, useState, useEffect, useContext } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and get user details
          // Adjust endpoint as per your NestJS backend
          const response = await client.get('/auth/profile'); 
          setUser(response.data);
        } catch (error) {
          console.error('Auth verification failed:', error);
          // localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (login, password) => {
    try {
      const response = await client.post('/auth/login', { login, password });
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      // If user data is returned with login, set it. Otherwise fetch it.
      if (user) {
        setUser(user);
      } else {
        // Optional: fetch profile immediately after login if not provided
        const profileRes = await client.get('/auth/profile');
        setUser(profileRes.data);
      }
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
