// src/pages/HomePage.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import AboutSection from '../components/AboutSection';
import GetInTouch from '../components/GetInTouch';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <section id="home">
          <HomeContent />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="contact">
          <GetInTouch />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
