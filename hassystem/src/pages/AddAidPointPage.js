// src/pages/AddAidPointPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AidPointsContext } from '../context/AidPointsContext';
import './AddAidPointPage.css';

const AddAidPointPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([{ category: '', name: '' }]);
  const { addAidPoint } = useContext(AidPointsContext);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    setProducts([...products, { category: '', name: '' }]);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAidPoint({ name, location, products });
    navigate('/aid-points');
  };

  return (
    <div className="add-aid-point-page">
      <h2>Add Aid Point</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Products</label>
          {products.map((product, index) => (
            <div key={index} className="product-group">
              <input
                type="text"
                placeholder="Category"
                value={product.category}
                onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>Add Product</button>
        </div>
        <button type="submit" className="submit-button">Add Aid Point</button>
      </form>
    </div>
  );
};

export default AddAidPointPage;
