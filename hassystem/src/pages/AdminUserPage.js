import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AidPointsContext } from '../context/AidPointsContext';
import { addAidPoint, removeAidPoint, updateAidPoint } from '../services/api';
import GoogleMap from '../components/GoogleMap';
import './AdminUserPage.css';

const AdminUserPage = () => {
  const { aidPoints, setAidPoints } = useContext(AidPointsContext);
  const [newRegion, setNewRegion] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newProducts, setNewProducts] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [removeRegion, setRemoveRegion] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editProducts, setEditProducts] = useState('');
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const handleAddAidPoint = async () => {
    if (newRegion && newLocation && newProducts && latitude && longitude) {
      const productsArray = newProducts.split(',').map((product) => product.trim());
      const aidPoint = {
        name: newRegion,
        location: newLocation,
        status: productsArray.join(' '),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
      try {
        await addAidPoint(aidPoint);
        setAidPoints([...aidPoints, aidPoint]);
        setNewRegion('');
        setNewLocation('');
        setNewProducts('');
        setLatitude('');
        setLongitude('');
        setMessage('Aid point added successfully!');
      } catch (error) {
        console.error('Error adding aid point', error);
        setMessage('Failed to add aid point.');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  const handleRemoveAidPoint = async () => {
    if (removeRegion) {
      const aidPoint = aidPoints.find(point => point.name === removeRegion);
      if (aidPoint) {
        try {
          await removeAidPoint(aidPoint.id);
          setAidPoints(aidPoints.filter(point => point.id !== aidPoint.id));
          setRemoveRegion('');
          setMessage('Aid point removed successfully!');
        } catch (error) {
          console.error('Error removing aid point', error);
          setMessage('Failed to remove aid point.');
        }
      } else {
        setMessage('Aid point not found.');
      }
    } else {
      setMessage('Please select a region to remove.');
    }
  };

  const handleEditAidPoint = async () => {
    if (editRegion && editProducts) {
      const aidPoint = aidPoints.find(point => point.name === editRegion);
      if (aidPoint) {
        try {
          await updateAidPoint(aidPoint.id, editProducts);
          setAidPoints(aidPoints.map(point => point.id === aidPoint.id ? { ...point, status: editProducts } : point));
          setEditRegion('');
          setEditProducts('');
          setMessage('Aid point updated successfully!');
        } catch (error) {
          console.error('Error updating aid point', error);
          setMessage('Failed to update aid point.');
        }
      } else {
        setMessage('Aid point not found.');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="admin-user-page">
      <h2>Admin Dashboard</h2>
      {message && <p className="message">{message}</p>}
      <div className="map-container">
        <GoogleMap />
      </div>
      <div className="admin-actions">
        <div className="action-buttons">
          <button onClick={() => setActiveSection('add')}>Add Help Point</button>
          <button onClick={() => setActiveSection('edit')}>Edit Help Point</button>
          <button onClick={() => setActiveSection('remove')}>Remove Help Point</button>
        </div>

        {activeSection === 'add' && (
          <div className="add-aid-point">
            <h3>Add Help Point</h3>
            <input
              type="text"
              placeholder="Region Name"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Products (comma separated)"
              value={newProducts}
              onChange={(e) => setNewProducts(e.target.value)}
            />
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <button onClick={handleAddAidPoint}>Add</button>
          </div>
        )}

        {activeSection === 'edit' && (
          <div className="edit-aid-point">
            <h3>Edit Help Point</h3>
            <select
              value={editRegion}
              onChange={(e) => setEditRegion(e.target.value)}
            >
              <option value="">--Select Region--</option>
              {aidPoints.map((point) => (
                <option key={point.id} value={point.name}>
                  {point.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Products (comma separated)"
              value={editProducts}
              onChange={(e) => setEditProducts(e.target.value)}
            />
            <button onClick={handleEditAidPoint}>Edit</button>
          </div>
        )}

        {activeSection === 'remove' && (
          <div className="remove-aid-point">
            <h3>Remove Help Point</h3>
            <select
              value={removeRegion}
              onChange={(e) => setRemoveRegion(e.target.value)}
            >
              <option value="">--Select Region--</option>
              {aidPoints.map((point) => (
                <option key={point.id} value={point.name}>
                  {point.name}
                </option>
              ))}
            </select>
            <button onClick={handleRemoveAidPoint}>Remove</button>
          </div>
        )}
      </div>
      <div className="edit-products">
        <button className="edit-products-button" onClick={() => navigate('/edit-products')}>Go to Edit Products</button>
      </div>
    </div>
  );
};

export default AdminUserPage;
