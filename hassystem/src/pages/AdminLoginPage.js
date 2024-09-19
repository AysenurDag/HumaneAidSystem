// src/pages/AdminLoginPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminId || !password) {
      setError('These fields must be filled');
    } else {
      setError('');
      login();
      navigate('/admin-user');
    }
  };

  return (
    <div className="admin-login-page">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="adminId">
            <span role="img" aria-label="adminId">👤</span>
            Admin ID
          </label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <span role="img" aria-label="password">🔒</span>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
