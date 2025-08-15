import React from 'react';
import { Navigate } from 'react-router-dom';

const LaboratoryProtectedRoute = ({ children }) => {
  const labToken = localStorage.getItem('labToken');
  
  if (!labToken) {
    return <Navigate to="/laboratory/login" replace />;
  }
  
  return children;
};

export default LaboratoryProtectedRoute;
