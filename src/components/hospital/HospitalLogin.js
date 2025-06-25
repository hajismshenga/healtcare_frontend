import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic
    navigate('/hospital/dashboard');
  };

  return (
    <div className="hospital-login">
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hospital ID (HOSP/001)</label>
          <input
            type="text"
            name="hospitalId"
            value={formData.hospitalId}
            onChange={handleChange}
            placeholder="HOSP/001"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p>Don't have an account? <a href="/hospital/register">Register</a></p>
    </div>
  );
};

export default HospitalLogin;
