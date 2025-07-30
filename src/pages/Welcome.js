import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-title">Welcome to Healthcare System</div>
      <div className="welcome-grid">
        <div className="welcome-card">
          <h4>Hospital Portal</h4>
          <Link className="welcome-link" to="/hospital/login">
            <button className="welcome-btn">Access Hospital Management</button>
          </Link>
        </div>
        <div className="welcome-card">
          <h4>Doctor Portal</h4>
          <Link className="welcome-link" to="/doctor/login">
            <button className="welcome-btn">Doctor Login</button>
          </Link>
        </div>
        <div className="welcome-card">
          <h4>Patient Portal</h4>
          <Link className="welcome-link" to="/patient/login">
            <button className="welcome-btn">Patient Login</button>
          </Link>
        </div>
        <div className="welcome-card">
          <h4>Laboratory Portal</h4>
          <Link className="welcome-link" to="/laboratory">
            <button className="welcome-btn">Access Laboratory Portal</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
