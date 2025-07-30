import React, { useState } from 'react';
import './HospitalManage.css';

const initialDoctors = [
  { id: 'DID/001', name: 'Dr. John Doe', profession: 'Cardiologist' },
  { id: 'DID/002', name: 'Dr. Jane Smith', profession: 'Neurologist' }
];
const initialLabs = [
  { id: 'LAB/001', name: 'Central Lab' },
  { id: 'LAB/002', name: 'Health Diagnostics' }
];

const HospitalManage = () => {
  const [tab, setTab] = useState('doctors');
  const [doctors, setDoctors] = useState(initialDoctors);
  const [labs, setLabs] = useState(initialLabs);
  const [editDoctor, setEditDoctor] = useState(null);
  const [editLab, setEditLab] = useState(null);
  const [doctorForm, setDoctorForm] = useState({ id: '', name: '', profession: '' });
  const [labForm, setLabForm] = useState({ id: '', name: '' });

  // Doctor handlers
  const handleEditDoctor = (doctor) => {
    setEditDoctor(doctor.id);
    setDoctorForm(doctor);
  };
  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };
  const handleDoctorFormChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };
  const handleDoctorFormSubmit = (e) => {
    e.preventDefault();
    setDoctors(doctors.map(doc => doc.id === doctorForm.id ? doctorForm : doc));
    setEditDoctor(null);
  };

  // Lab handlers
  const handleEditLab = (lab) => {
    setEditLab(lab.id);
    setLabForm(lab);
  };
  const handleDeleteLab = (id) => {
    setLabs(labs.filter(lab => lab.id !== id));
  };
  const handleLabFormChange = (e) => {
    setLabForm({ ...labForm, [e.target.name]: e.target.value });
  };
  const handleLabFormSubmit = (e) => {
    e.preventDefault();
    setLabs(labs.map(lab => lab.id === labForm.id ? labForm : lab));
    setEditLab(null);
  };

  return (
    <div className="hospital-manage">
      <h2>Hospital Management</h2>
      <div className="manage-tabs">
        <button className={tab === 'doctors' ? 'active' : ''} onClick={() => setTab('doctors')}>Manage Doctors</button>
        <button className={tab === 'labs' ? 'active' : ''} onClick={() => setTab('labs')}>Manage Laboratories</button>
      </div>
      <div className="manage-content">
        {tab === 'doctors' && (
          <div className="manage-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Profession</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>{editDoctor === doc.id ? (
                      <input name="name" value={doctorForm.name} onChange={handleDoctorFormChange} />
                    ) : doc.name}</td>
                    <td>{editDoctor === doc.id ? (
                      <input name="profession" value={doctorForm.profession} onChange={handleDoctorFormChange} />
                    ) : doc.profession}</td>
                    <td>
                      {editDoctor === doc.id ? (
                        <>
                          <button className="btn-save" onClick={handleDoctorFormSubmit}>Save</button>
                          <button className="btn-cancel" onClick={() => setEditDoctor(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => handleEditDoctor(doc)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDeleteDoctor(doc.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'labs' && (
          <div className="manage-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {labs.map(lab => (
                  <tr key={lab.id}>
                    <td>{lab.id}</td>
                    <td>{editLab === lab.id ? (
                      <input name="name" value={labForm.name} onChange={handleLabFormChange} />
                    ) : lab.name}</td>
                    <td>
                      {editLab === lab.id ? (
                        <>
                          <button className="btn-save" onClick={handleLabFormSubmit}>Save</button>
                          <button className="btn-cancel" onClick={() => setEditLab(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => handleEditLab(lab)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDeleteLab(lab.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalManage;
