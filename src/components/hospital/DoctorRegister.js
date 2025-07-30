import React, { useState } from 'react';
import './DoctorRegister.css';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    profession: '',
    doctorId: '' // User will enter Doctor ID manually
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add doctor registration logic
    // Generate doctor ID (DID/001)
    // Set default password to 123456
    alert('Doctor registered successfully! Default password is 123456');
  };

  return (
    <div className="doctor-register">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Doctor ID</label>
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
            placeholder="e.g. DID/001"
          />
          <p className="note">Doctor ID format: DID/001</p>
        </div>
        <button type="submit" className="btn-primary">Register Doctor</button>
      </form>
    </div>
  );
};

export default DoctorRegister;
