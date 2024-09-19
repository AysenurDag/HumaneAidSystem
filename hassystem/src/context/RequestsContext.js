// src/context/RequestsContext.js

import React, { createContext, useState } from 'react';

export const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (product) => {
    setRequests((prevRequests) => [...prevRequests, product]);
  };

  const removeRequest = (product) => {
    setRequests((prevRequests) => prevRequests.filter((req) => req !== product));
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, removeRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};
