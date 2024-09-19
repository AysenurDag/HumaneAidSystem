// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import {useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as loginUser } from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('These fields must be filled');
    } else {
      try {
        const userData = await loginUser(email, password);
        login({ ...userData, role });
        
      } catch (error) {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">
            <span role="img" aria-label="email">📧</span>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      <div className="login-links">
        <p>If you do not have an account, <Link to="/register">please register</Link>.</p>
        <p><Link to="/forgot-password">Forgot your password?</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
