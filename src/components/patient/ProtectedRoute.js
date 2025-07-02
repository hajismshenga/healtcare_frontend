import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const patientToken = localStorage.getItem('patientToken');
  
  if (!patientToken) {
    return <Navigate to="/patient/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
