// src/pages/ProductListPage.js

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RequestsContext } from '../context/RequestsContext';
import { AidPointsContext } from '../context/AidPointsContext';
import './ProductListPage.css';

const ProductListPage = () => {
  const { categoryName } = useParams();
  const { requests, addRequest, removeRequest } = useContext(RequestsContext);
  const { aidPoints } = useContext(AidPointsContext);

  const products = {
    'Food & Beverage': ['Bread', 'Water'],
    Shelter: ['Blanket', 'Heater'],
    Clothing: ['Shirt', 'Pants'],
    'Women\'s Healthcare': ['Sanitary Pads', 'Pain Reliever'],
    'Men\'s Healthcare': ['Razor', 'Shaving Cream'],
    'Baby\'s Healthcare': ['Diapers', 'Baby Food'],
  };

  const [selectedRegion, setSelectedRegion] = useState('');
  const [message, setMessage] = useState('');

  const handleAddRequest = (product) => {
    addRequest(product);
  };

  const handleRemoveRequest = (product) => {
    removeRequest(product);
  };

  const handleQuery = () => {
    if (!selectedRegion) {
      setMessage('Please select a region');
      return;
    }

    const aidPoint = aidPoints.find((point) => point.region === selectedRegion);
    if (!aidPoint) {
      setMessage(`No aid point found for region ${selectedRegion}`);
      return;
    }

    const unavailableProducts = requests.filter(
      (request) => !aidPoint.products.includes(request)
    );

    if (unavailableProducts.length === 0) {
      setMessage(`All requested products are available in ${selectedRegion}`);
    } else {
      setMessage(
        `${unavailableProducts.join(', ')} are not available in ${selectedRegion}`
      );
    }
  };

  return (
    <div className="product-list-page">
      <h2>{categoryName}</h2>
      <div className="products">
        {products[categoryName].map((product) => (
          <div key={product} className="product-card">
            <img src={`/${product}.png`} alt={product} />
            <p>{product}</p>
            <button onClick={() => handleAddRequest(product)}>+</button>
            <button onClick={() => handleRemoveRequest(product)}>-</button>
          </div>
        ))}
      </div>
      <div className="requests-section">
        <h3>Requests</h3>
        <div className="requests">
          {requests.map((request) => (
            <p key={request}>{request}</p>
          ))}
        </div>
        <div className="region-select">
          <label htmlFor="region">Select Region: </label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">--Select Region--</option>
            {aidPoints.map((point) => (
              <option key={point.id} value={point.region}>
                {point.region}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleQuery} disabled={!selectedRegion}>
          Query
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ProductListPage;
