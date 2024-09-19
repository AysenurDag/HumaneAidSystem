// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const navigateBasedOnRole = (role) => {
    console.log(`Received role: ${role}`);
    alert(`You logged as a ${role}`);
    switch (role) {
      case 'Admin':
        navigate('/admin-user');
        break;
      case 'DisasterAffected':
        navigate('/affected-user');
        break;
      case 'Helper':
        navigate('/donor-user');
        break;
      default:
        navigate('/');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigateBasedOnRole(user.role);
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
