// src/components/Header.js

import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-left">
        <h1>Humane Aid System</h1>
      </div>
      <div className="header-right">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
          <ScrollLink to="map" smooth={true} duration={500}>Map</ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink>
          {isAuthenticated ? (
            <button onClick={logout} className="logout-button">Logout</button>
          ) : (
            <RouterLink to="/login">Login</RouterLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
