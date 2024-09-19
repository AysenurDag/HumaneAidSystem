import React, { useContext, useState, useEffect } from 'react';
import { RequestsContext } from '../context/RequestsContext';
import { AidPointsContext } from '../context/AidPointsContext';
import { getAllProducts, sendAidRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const { requests, addRequest, removeRequest } = useContext(RequestsContext);
  const { aidPoints } = useContext(AidPointsContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

  const handleAddRequest = (product) => {
    addRequest(product);
  };

  const handleRemoveRequest = (product) => {
    removeRequest(product);
  };

  const handleQuery = async () => {
    if (!selectedRegion) {
      setMessage('Please select a region');
      return;
    }

    const aidPoint = aidPoints.find((point) => point.name === selectedRegion);
    if (!aidPoint) {
      setMessage(`No aid point found for region ${selectedRegion}`);
      return;
    }

    const unavailableProducts = requests.filter(
      (request) => !aidPoint.status.includes(request)
    );

    const availableProducts = requests.filter(
      (request) => aidPoint.status.includes(request)
    );

    console.log(unavailableProducts);

    if (unavailableProducts.length === 0) {
      setMessage(`All requested products are available in ${selectedRegion}`);
    } else {
      setMessage(
        `${availableProducts.join(', ')} are available but ${unavailableProducts.join(', ')} are not available in ${selectedRegion}. Your request will be fulfilled within 2 days.`
      );

      // Sending unavailable products to the API
      try {
        const response = await sendAidRequest({ products: [{name:unavailableProducts[0], category:selectedCategory}], aidPointName: selectedRegion });
        console.log('Aid request sent successfully:', response);
      } catch (error) {
        console.error('Error sending aid request', error);
        setMessage('Failed to send aid request.');
      }
    }
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="products">
        {products[selectedCategory]?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`/${product.name}.png`} alt={product.name} />
            <p>{product.name}</p>
            <div className="button-group">
              <button onClick={() => handleAddRequest(product.name)}>+</button>
              <button onClick={() => handleRemoveRequest(product.name)}>-</button>
            </div>
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
              <option key={point.id} value={point.name}>
                {point.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleQuery} disabled={!selectedRegion}>
          Query
        </button>
        {message && <p className="message">{message}</p>}
      </div>
      <button className="make-request-button" onClick={() => navigate('/make-request')}>Make Request</button>
    </div>
  );
};

export default ProductsPage;
