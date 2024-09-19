// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RequestsProvider } from './context/RequestsContext';
import { AidPointsProvider } from './context/AidPointsContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import AffectedUserPage from './pages/AffectedUserPage';
import DonorUserPage from './pages/DonorUserPage';
import AdminUserPage from './pages/AdminUserPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CategoryListPage from './pages/CategoryListPage';
import GiveHelpPage from './pages/GiveHelpPage';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProductListPage from './pages/ProductListPage';
import AidPointsListPage from './pages/AidPointsListPage';
import AidPointDetailsPage from './pages/AidPointDetailsPage';
import AddAidPointPage from './pages/AddAidPointPage';
import ProductsPage from './pages/ProductsPage';
import EditProductsPage from './pages/EditProductsPage';
import MakeRequestPage from './pages/MakeRequestPage'; 
import './App.css';

const App = () => {
  return (
    <RequestsProvider>
      <AidPointsProvider>
        <Router>
          <AuthProvider>
            <div>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/login/:role" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/affected-user"
                  element={
                    <PrivateRoute role="DisasterAffected">
                      <AffectedUserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/donor-user"
                  element={
                    <PrivateRoute role="Helper">
                      <DonorUserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-user"
                  element={
                    <PrivateRoute role="Admin">
                      <AdminUserPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/give-help" element={<GiveHelpPage />} />
                <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/:categoryName" element={<ProductListPage />} />
                <Route path="/aid-points" element={<AidPointsListPage />} />
                <Route path="/aid-points/:id" element={<AidPointDetailsPage />} />
                <Route path="/add-aid-point" element={<AddAidPointPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/edit-products" element={<EditProductsPage />} />
                <Route path="/make-request" element={<MakeRequestPage />} />
                
              </Routes>
            </div>
          </AuthProvider>
        </Router>
      </AidPointsProvider>
    </RequestsProvider>
  );
};

export default App;
