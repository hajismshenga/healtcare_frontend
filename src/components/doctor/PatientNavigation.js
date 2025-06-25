import React from 'react';
import './styles/DoctorStyles.css';

const PatientNavigation = () => {
  return (
    <div className="patient-navigation">
      <div className="nav-header">
        <h2>Patient Management</h2>
        <div className="nav-stats">
          <div className="stat-item">
            <span className="stat-icon">👨‍👩‍👧‍👦</span>
            <span className="stat-number">150</span>
            <span className="stat-label">Total Patients</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📅</span>
            <span className="stat-number">25</span>
            <span className="stat-label">Today's Appointments</span>
          </div>
        </div>
      </div>

      <div className="nav-actions">
        <div className="action-group">
          <button className="nav-button primary">
            <span className="button-icon">📋</span>
            <span className="button-text">Patient List</span>
          </button>
          <button className="nav-button secondary">
            <span className="button-icon">➕</span>
            <span className="button-text">Add Patient</span>
          </button>
          <button className="nav-button secondary">
            <span className="button-icon">📝</span>
            <span className="button-text">Patient Info</span>
          </button>
        </div>
        <div className="action-group">
          <button className="nav-button secondary">
            <span className="button-icon">📊</span>
            <span className="button-text">Patient Analytics</span>
          </button>
          <button className="nav-button secondary">
            <span className="button-icon">🔍</span>
            <span className="button-text">Search Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientNavigation;
