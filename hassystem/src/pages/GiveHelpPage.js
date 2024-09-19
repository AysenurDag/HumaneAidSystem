import React, { useState, useEffect } from 'react';
import './GiveHelpPage.css';
import { getAllProducts, makeDonation } from '../services/api';

const GiveHelpPage = () => {
  const [helpItems, setHelpItems] = useState([{ category: '', product: '', quantity: '' }]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const data = response.data;
        console.log('API Response:', data);
        
        if (Array.isArray(data)) {
          const categoriesSet = new Set(data.map(product => product.category));
          setCategories([...categoriesSet]);
        } else {
          console.error('API response is not an array');
          setMessage('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
        setMessage('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (index, event) => {
    const values = [...helpItems];
    values[index][event.target.name] = event.target.value;
    setHelpItems(values);
  };

  const handleAddFields = () => {
    setHelpItems([...helpItems, { category: '', product: '', quantity: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...helpItems];
    values.splice(index, 1);
    setHelpItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const donationData = helpItems.reduce((acc, item) => {
        const existingCategory = acc.find(d => d.category === item.category);
        if (existingCategory) {
          existingCategory.products.push({
            name: item.product,
            category: item.category,
            amount: parseInt(item.quantity, 10),
          });
        } else {
          acc.push({
            category: item.category,
            products: [{
              name: item.product,
              category: item.category,
              amount: parseInt(item.quantity, 10),
            }]
          });
        }
        return acc;
      }, []);

      console.log('Sending donation data:', donationData);
      
      await Promise.all(donationData.map(data => makeDonation(data)));
      setMessage('Your information has been received successfully, you can send it to the address specified on our home page. You can contact us for your questions about any subject.');
      setHelpItems([{ category: '', product: '', quantity: '' }]);
    } catch (error) {
      console.error('Error sending help', error);
      setMessage('An error occurred while sending your help. Please try again.');
    }
  };

  return (
    <div className="give-help-page">
      <h2>Give Help</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {helpItems.map((item, index) => (
          <div key={index} className="help-item">
            <select
              name="category"
              value={item.category}
              onChange={(event) => handleInputChange(index, event)}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              name="product"
              placeholder="Product"
              value={item.product}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
            <button type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddFields}>Add Product</button>
        <button type="submit">Send Help</button>
      </form>
    </div>
  );
};

export default GiveHelpPage;
