// src/context/AidPointsContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getAllAidPoints } from '../services/api';

export const AidPointsContext = createContext();

export const AidPointsProvider = ({ children }) => {
  const [aidPoints, setAidPoints] = useState([]);

  useEffect(() => {
    const fetchAidPoints = async () => {
      try {
        const data = await getAllAidPoints();
        console.log('Aid Points API Response:', data);
        setAidPoints(data);  // API yanıtını doğrudan state'e set ediyoruz
      } catch (error) {
        console.error('Error fetching aid points:', error);
      }
    };

    fetchAidPoints();
  }, []);

  const addAidPoint = (name, location, products) => {
    const newPoint = { id: aidPoints.length + 1, name, location, status: products.join(' ') };
    setAidPoints((prevAidPoints) => [...prevAidPoints, newPoint]);
  };

  const removeAidPoint = (id) => {
    setAidPoints((prevAidPoints) => prevAidPoints.filter((point) => point.id !== id));
  };

  return (
    <AidPointsContext.Provider value={{ aidPoints, addAidPoint, removeAidPoint, setAidPoints }}>
      {children}
    </AidPointsContext.Provider>
  );
};
