// src/components/GetInTouch.js

import React from 'react';
import './GetInTouch.css';

const GetInTouch = () => {
  return (
    <div className="get-in-touch">
      <h2>GET IN TOUCH</h2>
      <div className="contact-cards">
        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h3>Address</h3>
          <p>Akdeniz University:<br/> Pınarbaşı, Konyaaltı/Antalya</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email Us</h3>
          <p>hello@gmail.com<br/> company@gmail.com</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Call Us</h3>
          <p>+90 5306305300<br/> +90 5306305300</p>
        </div>
      </div>
      <a href="/contact" className="view-more-button">View More</a>
    </div>
  );
};

export default GetInTouch;
