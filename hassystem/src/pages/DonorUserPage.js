// src/pages/DonorUserPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DonorUserPage.css';
import GoogleMap from '../components/GoogleMap';

const DonorUserPage = () => {
  const navigate = useNavigate();

  const handleGiveHelpClick = () => {
    navigate('/give-help');
  };

  const handleSeeProductsClick = () => {
    navigate('/products');
  };

  return (
    <div className="donor-user-page">
      <h2>Donor Dashboard</h2>
      <div className="map-container">
        <GoogleMap />
      </div>
      <div className="donor-buttons">
        <button className="donor-button" onClick={handleGiveHelpClick}>Give Help</button>
        <button className="donor-button" onClick={handleSeeProductsClick}>See Products</button>
      </div>
    </div>
  );
};

export default DonorUserPage;
