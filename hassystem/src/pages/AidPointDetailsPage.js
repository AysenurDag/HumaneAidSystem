// src/pages/AidPointDetailsPage.js

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AidPointsContext } from '../context/AidPointsContext';
import './AidPointDetailsPage.css';

const AidPointDetailsPage = () => {
  const { id } = useParams();
  const { aidPoints } = useContext(AidPointsContext);
  const aidPoint = aidPoints.find((ap) => ap.id === parseInt(id));

  if (!aidPoint) {
    return <div>Aid Point not found</div>;
  }

  return (
    <div className="aid-point-details-page">
      <h2>{aidPoint.name}</h2>
      <p><strong>Location:</strong> {aidPoint.location}</p>
      <h3>Available Products</h3>
      <ul>
        {aidPoint.products.map((product, index) => (
          <li key={index}>
            <strong>Category:</strong> {product.category} - <strong>Name:</strong> {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AidPointDetailsPage;
