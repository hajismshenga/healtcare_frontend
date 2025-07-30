import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../../services/mockApi';
import './styles/DoctorStyles.css';

const DoctorLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('doctorToken', 'mock-token');
    localStorage.setItem('doctorId', 'test-doctor');
    localStorage.setItem('doctorName', 'Dr. Test User');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="doctor-login">
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Doctor ID:</label>
          <input
            type="text"
            placeholder="Enter your doctor ID"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
