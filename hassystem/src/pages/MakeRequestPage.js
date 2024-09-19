// src/pages/MakeRequestPage.js

import React, { useContext, useState, useEffect } from 'react';
import { AidPointsContext } from '../context/AidPointsContext';
import { getAllProducts, sendAidRequest } from '../services/api';
import './MakeRequestPage.css';

const MakeRequestPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { aidPoints } = useContext(AidPointsContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        console.log('API Response:', data);

        const productsArray = Array.isArray(data) ? data : data.data;

        if (Array.isArray(productsArray)) {
          const categoriesSet = new Set(productsArray.map(product => product.category));
          setCategories([...categoriesSet]);

          const productsByCategory = {};
          categoriesSet.forEach(category => {
            productsByCategory[category] = productsArray.filter(product => product.category === category);
          });
          setProducts(productsByCategory);
          setSelectedCategory([...categoriesSet][0]);
        } else {
          console.error('API response does not contain an array');
          setMessage('Failed to fetch categories and products.');
        }
      } catch (error) {
        console.error('Failed to fetch categories and products', error);
        setMessage('Failed to fetch categories and products.');
      }
    };
    fetchData();
  }, []);

  const handleSendRequest = async () => {
    if (selectedProduct && selectedCategory && selectedRegion) {
      const requestData = {
        aidPointName: selectedRegion,
        products: [
          {
            name: selectedProduct,
            category: selectedCategory
          }
        ]
      };
      try {
        await sendAidRequest(requestData);
        setMessage('Your request has been successfully submitted');
      } catch (error) {
        console.error('Error sending request', error);
        setMessage('Failed to send request');
      }
    } else {
      setMessage('Please fill in all fields');
    }
  };

  return (
    <div className="make-request-page">
      <h2>Make Request</h2>
      {message && <p className="message">{message}</p>}
      <div className="input-group">
        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="product">Select Product</label>
        <select
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products[selectedCategory]?.map(product => (
            <option key={product.id} value={product.name}>{product.name}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="region">Select Region</label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">--Select Region--</option>
          {aidPoints.map(point => (
            <option key={point.id} value={point.name}>{point.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default MakeRequestPage;
