import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PatientStyles.css';

const PatientLogin = () => {
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Mock login - in real system would check against database
      if (!patientId || !password) {
        throw new Error('Please enter both patient ID and password');
      }

      // Store patient info in localStorage
      localStorage.setItem('patientId', patientId);
      localStorage.setItem('patientToken', 'patient_' + patientId);
      navigate('/patient');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="patient-login">
      <div className="login-card">
        <h2>Patient Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="form-input"
              placeholder="Enter your patient ID"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <div className="default-info">
          <p>Default Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
