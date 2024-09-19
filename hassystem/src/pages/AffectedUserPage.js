// src/pages/AffectedUserPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AffectedUserPage.css';
import GoogleMap from '../components/GoogleMap';
import { AidPointsContext } from '../context/AidPointsContext';
import { searchAidPoints } from '../services/api';

const AffectedUserPage = () => {
  const navigate = useNavigate();
  const { aidPoints, setAidPoints } = useContext(AidPointsContext);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleGetHelpClick = () => {
    navigate('/products');
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await searchAidPoints(searchKeyword);
        if (response.succeeded) {
          setAidPoints(response.data);
        } else {
          console.log('No aid points found matching your search');
        }
      } catch (error) {
        console.error('Error searching aid points', error);
      }
    }
  };

  return (
    <div className="affected-user-page">
      <h2>Affected User Dashboard</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Aid Points"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div className="map-container">
        <GoogleMap />
      </div>
      <div className="affected-buttons">
        <button className="affected-button" onClick={handleGetHelpClick}>Get Help</button>
      </div>
      {searchKeyword && aidPoints.length > 0 && (
        <div className="aid-points-list">
          <h3>Aid Points</h3>
          {aidPoints.map((point) => (
            <div key={point.id}>
              <p>{point.name} - {point.location}</p>
              <p>Products: {point.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AffectedUserPage;
