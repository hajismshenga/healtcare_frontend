import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Texture Overlay */}
      <div className="texture-overlay"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      <div className="welcome-title">
        Healthcare Management System
      </div>
      <div className="welcome-grid">
        <div className="welcome-card">
          <div className="card-icon">🏥</div>
          <h4>Hospital Portal</h4>
          <p>Manage hospital operations, staff, and patient care with comprehensive tools and analytics</p>
          <Link className="welcome-link" to="/hospital/login">
            <button className="welcome-btn">Hospital Management</button>
          </Link>
        </div>
        <div className="welcome-card">
          <div className="card-icon">👨‍⚕️</div>
          <h4>Doctor Portal</h4>
          <p>Access patient records, manage appointments, and provide medical services efficiently</p>
          <Link className="welcome-link" to="/doctor/login">
            <button className="welcome-btn">Doctor Login</button>
          </Link>
        </div>
        <div className="welcome-card">
          <div className="card-icon">👤</div>
          <h4>Patient Portal</h4>
          <p>View medical history, prescriptions, lab results, and manage your healthcare journey</p>
          <Link className="welcome-link" to="/patient/login">
            <button className="welcome-btn">Patient Login</button>
          </Link>
        </div>
        <div className="welcome-card">
          <div className="card-icon">🔬</div>
          <h4>Laboratory Portal</h4>
          <p>Manage lab tests, process medical samples, and generate detailed reports</p>
          <Link className="welcome-link" to="/laboratory">
            <button className="welcome-btn">Laboratory Portal</button>
          </Link>
        </div>
        <div className="welcome-card">
          <div className="card-icon">⚙️</div>
          <h4>Admin Portal</h4>
          <p>System administration, user management, and overall platform configuration</p>
          <Link className="welcome-link" to="/admin/login">
            <button className="welcome-btn">Admin Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
