import React, { useState } from 'react';
import './LaboratoryRegister.css';

const LaboratoryRegister = () => {
  const [formData, setFormData] = useState({
    labName: '',
    labId: 'LAB/001'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add laboratory registration logic
    // Generate lab ID (LAB/001)
    alert('Laboratory registered successfully!');
  };

  return (
    <div className="lab-register">
      <h2>Laboratory Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Laboratory Name</label>
          <input
            type="text"
            name="labName"
            value={formData.labName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Laboratory ID</label>
          <input
            type="text"
            name="labId"
            value={formData.labId}
            onChange={handleChange}
            readOnly
          />
          <p className="note">Auto-generated ID format: LAB/001</p>
        </div>
        <button type="submit" className="btn-primary">Register Laboratory</button>
      </form>
    </div>
  );
};

export default LaboratoryRegister;
