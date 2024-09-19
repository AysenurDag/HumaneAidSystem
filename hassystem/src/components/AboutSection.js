// src/components/AboutSection.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import vehicleImage from '../assets/vehicleimg.jpeg'; // Ensure the correct path to the image
import './AboutSection.css';

const AboutSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleGetHelpClick = () => {
    if (isAuthenticated) {
      navigate('/affected-user');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="about-section">
      <div className="about-text">
        <h2>About Humane Aid System</h2>
        <p>This system is intended to provide aid and manage its distribution to people damaged by natural disasters such as earthquakes.</p>
      </div>
      <div className="about-image">
        <img src={vehicleImage} alt="Aid vehicle" />
        <button className="help-button" onClick={handleGetHelpClick}>Get Help</button>
      </div>
    </div>
  );
};

export default AboutSection;
