import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import SalesList from './features/sales/components/SalesList';
import NewSaleForm from './features/sales/components/NewSaleForm';
import Layout from './components/Layout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Layout username="Admin">{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales/new"
          element={
            <PrivateRoute>
              <NewSaleForm />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/sales" />} />
      </Routes>
    </Router>
  );
};

export default App;
