// src/components/HomeContent.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import './HomeContent.css';

const HomeContent = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="home-content">
      <div className="map-container">
        <GoogleMap />
      </div>
      <div className="login-buttons">
        <button onClick={() => handleLoginClick('DisasterAffected')} className="login-button">Affected Login</button>
        <button onClick={() => handleLoginClick('Helper')} className="login-button">Donor Login</button>
        <button onClick={() => handleLoginClick('Admin')} className="login-button">Admin Login</button>
      </div>
    </div>
  );
};

export default HomeContent;
