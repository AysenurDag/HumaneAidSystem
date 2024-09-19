import React, { useState } from 'react';
import { register } from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !username || !email || !password || !confirmPassword || !phoneNumber || !role) {
      setError('These fields must be filled');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
    } else {
      try {
        const response = await register(name, surname, username, email, password, confirmPassword, phoneNumber, role);
        setError('');
        setSuccess('You have successfully registered');
        console.log(response);
      } catch (error) {
        console.error('Registration failed', error.response.data);
        setError('Registration failed: ' + JSON.stringify(error.response.data));
        setSuccess('');
      }
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">
            <span role="img" aria-label="name">👤</span>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="surname">
            <span role="img" aria-label="surname">👥</span>
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">
            <span role="img" aria-label="username">👥</span>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="phoneNumber">
            <span role="img" aria-label="phoneNumber">📞</span>
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">
            <span role="img" aria-label="confirm-password">🔒</span>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">
            <span role="img" aria-label="role">🛠️</span>
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="DisasterAffected">DisasterAffected</option>
            <option value="Helper">Helper</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
