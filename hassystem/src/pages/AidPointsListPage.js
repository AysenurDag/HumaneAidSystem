// src/pages/AidPointsListPage.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AidPointsContext } from '../context/AidPointsContext';
import './AidPointsListPage.css';

const AidPointsListPage = () => {
  const { aidPoints } = useContext(AidPointsContext);

  return (
    <div className="aid-points-list-page">
    
      <ul>
        {aidPoints.map((aidPoint) => (
          <li key={aidPoint.id}>
            <Link to={`/aid-points/${aidPoint.id}`}>
              {aidPoint.name} - {aidPoint.location}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add-aid-point" className="add-aid-point-button">Add Aid Point</Link>
    </div>
  );
};

export default AidPointsListPage;
