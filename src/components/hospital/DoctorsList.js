import React, { useState, useEffect } from 'react';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    doctorId: '',
    specialization: ''
  });

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setDoctors(storedDoctors);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoctor = { ...formData, id: Date.now() };
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    setFormData({ name: '', doctorId: '', specialization: '' });
  };


  return (
    <div className="doctors-list" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Register Doctor</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
        />
        <input
          type="text"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          placeholder="Doctor ID"
          required
        />
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add Doctor
        </button>
      </form>
      <h2>Doctors List</h2>
      <div className="doctors-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor ID</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.doctorId}</td>
                <td>{doctor.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;
