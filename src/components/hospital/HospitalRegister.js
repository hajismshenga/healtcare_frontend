import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: '',
    ownership: '',
    district: '',
    username: '',
    password: '123456' // Default
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');

    if (hospitals.some((h) => h.username === formData.username)) {
      alert('Username already exists!');
      return;
    }

    hospitals.push(formData);
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
    alert('Registration successful! You can now log in.');
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
