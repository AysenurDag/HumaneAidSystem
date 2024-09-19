// src/pages/CategoryListPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryListPage.css';

const categories = [
  { name: 'Food & Beverage', image: 'url-to-image' },
  { name: 'Shelter', image: 'url-to-image' },
  { name: 'Clothing', image: 'url-to-image' },
  { name: 'Women\'s Healthcare', image: 'url-to-image' },
  { name: 'Men\'s Healthcare', image: 'url-to-image' },
  { name: 'Baby\'s Healthcare', image: 'url-to-image' }
];

const CategoryListPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="category-list-page">
      <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-card" 
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListPage;
