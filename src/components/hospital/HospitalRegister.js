import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: '',
    ownership: '',
    district: '',
    username: '',
    password: '123456'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add registration logic
    // Generate hospital ID (HOSP/001)
    navigate('/hospital');
  };

  return (
    <div className="hospital-register">
      <h2>Hospital Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ownership Type</label>
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            required
          >
            <option value="">Select ownership type</option>
            <option value="private">Private</option>
            <option value="government">Government</option>
          </select>
        </div>
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
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
          <p className="note">Default password is 123456</p>
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p>Already have an account? <a href="/hospital">Login</a></p>
    </div>
  );
};

export default HospitalRegister;
