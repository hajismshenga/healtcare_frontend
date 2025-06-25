import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LaboratoryStyles.css';

const LaboratoryLogin = () => {
  const [labId, setLabId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!labId || !password) {
        throw new Error('Please enter both Laboratory ID and password');
      }

      localStorage.setItem('labId', labId);
      localStorage.setItem('labToken', 'lab_' + labId);
      navigate('/laboratory/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="laboratory-login">
      <div className="login-card">
        <h2>Laboratory Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Laboratory ID:</label>
            <input
              type="text"
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
              className="form-input"
              placeholder="Enter your laboratory ID"
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
      </div>
    </div>
  );
};

export default LaboratoryLogin;
