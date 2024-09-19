// src/pages/ForgotPasswordPage.js

import React, { useState } from 'react';
import { forgotPassword } from '../services/api';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Email field must be filled');
    } else {
      try {
        await forgotPassword(email);
        setMessage('A link to reset your password has been sent to your email');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setMessage(`Failed to send password reset link. ${error.response ? error.response.data : error.message}`);
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>If you don't remember your password please write your email. We will send a link for changing your password.</p>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
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
        {message && <p className="message">{message}</p>}
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
