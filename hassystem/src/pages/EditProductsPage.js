import React, { useState, useEffect } from 'react';
import { getAllProducts, addProduct, removeProduct } from '../services/api';
import './EditProductsPage.css';

const EditProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [removeProductId, setRemoveProductId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const data = response;
        console.log('API Response:', data);

        if (data.succeeded && Array.isArray(data.data)) {
          setProducts(data.data);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API response is not an array or failed');
          setMessage('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
        setMessage('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (newProductName && newProductCategory) {
      try {
        await addProduct({
          name: newProductName,
          category: newProductCategory
        });
        setNewProductName('');
        setNewProductCategory('');
        setMessage('Product added successfully.');
        // Fetch products again to update the list
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to add product', error);
        setMessage('Failed to add product.');
      }
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  const handleRemoveProduct = async () => {
    if (removeProductId) {
      try {
        await removeProduct(removeProductId);
        setRemoveProductId('');
        setMessage('Product removed successfully.');
        // Fetch products again to update the list
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to remove product', error);
        setMessage('Failed to remove product.');
      }
    } else {
      setMessage('Please provide a valid product ID.');
    }
  };

  return (
    <div className="edit-products-page">
      <h2>Edit Products</h2>
      <div className="form-container">
        <div className="form-section">
          <h3>Add Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Category"
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
          />
          <button onClick={handleAddProduct}>Add</button>
        </div>
        <div className="form-section">
          <h3>Remove Product</h3>
          <input
            type="text"
            placeholder="Product ID"
            value={removeProductId}
            onChange={(e) => setRemoveProductId(e.target.value)}
          />
          <button onClick={handleRemoveProduct}>Remove</button>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="product-list">
        <h3>Existing Products</h3>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.category} - {product.id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default EditProductsPage;
