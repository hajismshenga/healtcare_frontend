import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './styles/DoctorStyles.css';
import { PatientService } from '../../services/PatientService';

const PatientManagement = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Add Patient Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', id: '' });

  // Patient Info Section State
  const [infoPatientId, setInfoPatientId] = useState('');
  const [infoPatient, setInfoPatient] = useState(null);
  const [medicalInputs, setMedicalInputs] = useState({
    diseases: '',
    ailments: '',
    treatments: '',
    medicines: ''
  });

  // Error state for messages
  const [errorMsg, setErrorMsg] = useState('');
  const [infoErrorMsg, setInfoErrorMsg] = useState('');

  // Add Patient Handler
  const handleAddPatient = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    // Add default password and empty medical info
    const patientToAdd = {
      ...newPatient,
      password: '123456',
      age: '',
      sex: '',
      mobile: '',
      medicalInfo: { bloodType: '' },
      diseases: [],
      ailments: [],
      treatments: [],
      medicines: []
    };
    // Try to use PatientService, fallback to local
    try {
      if (PatientService && PatientService.addPatient) {
        await PatientService.addPatient(patientToAdd);
        const updated = await PatientService.getAllPatients();
        setPatients(updated);
      } else {
        setPatients(prev => [...prev, patientToAdd]);
      }
      setShowAddModal(false);
      setNewPatient({ name: '', id: '' });
      // Optionally show a non-intrusive success message
      setTimeout(() => setErrorMsg(''), 2000);
    } catch (err) {
      setErrorMsg('Failed to add patient');
    }
  };

  // Fetch Patient Info Handler
  const handleFetchPatientInfo = (e) => {
    e.preventDefault();
    setInfoErrorMsg('');
    const found = patients.find(p => p.id === infoPatientId);
    if (found) {
      setInfoPatient({ ...found });
      setMedicalInputs({ diseases: '', ailments: '', treatments: '', medicines: '' });
    } else {
      setInfoPatient(null);
      setInfoErrorMsg('Patient not found');
    }
  };

  // Add Medical Info Handler
  const handleAddMedical = (e, type) => {
    e.preventDefault();
    if (!medicalInputs[type]) return;
    setInfoPatient(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated[type] = [...(updated[type] || []), medicalInputs[type]];
      return updated;
    });
    setMedicalInputs(inputs => ({ ...inputs, [type]: '' }));
    // Optionally update backend here
  };

  // Delete Medical Info Handler
  const handleDeleteMedical = (type, idx) => {
    setInfoPatient(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated[type] = updated[type].filter((_, i) => i !== idx);
      return updated;
    });
    // Optionally update backend here
  };

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await PatientService.getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error loading patients:', error);
      }
    };
    loadPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobile.includes(searchTerm)
  );

  return (
    <div className="patient-management">
      <div className="patient-header">
        <div className="search-section">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="search-input"
            />
          </div>
        </div>
        <button 
          className="add-button"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="button-icon" />
          Add New Patient
        </button>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Patient</h3>
              <form onSubmit={handleAddPatient}>
                <label>Patient Name</label>
                <input type="text" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} required />
                <label>Patient ID (PID.001 or PID/001)</label>
                <input type="text" value={newPatient.id} onChange={e => setNewPatient({ ...newPatient, id: e.target.value })} pattern="PID[./][0-9]{3}" placeholder="PID.001 or PID/001" required />
                <p className="note">Default password: <b>123456</b></p>
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn-primary">Add</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )} 
      </div>

      <div className="patients-list">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Mobile</th>
                <th>Blood Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.mobile}</td>
                  <td>{patient.medicalInfo?.bloodType || ''}</td>
                  <td>
                    <button 
                      className="action-button view"
                      onClick={() => navigate(`/doctor/patient/${patient.id}/view`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="action-button edit"
                      onClick={() => navigate(`/doctor/patient/${patient.id}/edit`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Patient Info Section */}
      <div className="patient-info-section" style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Patient Info</h3>
        <form onSubmit={handleFetchPatientInfo} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label>Patient ID:</label>
          <input type="text" value={infoPatientId} onChange={e => setInfoPatientId(e.target.value)} placeholder="Enter Patient ID" required />
          <button type="submit" className="btn-primary">Fetch Info</button>
        </form>
        {infoErrorMsg && <div className="error-message">{infoErrorMsg}</div>}
        {infoPatient && (
          <div className="patient-details" style={{ marginTop: '1rem' }}>
            <h4>Basic Info</h4>
            <p><b>Name:</b> {infoPatient.name}</p>
            <p><b>ID:</b> {infoPatient.id}</p>
            <p><b>Age:</b> {infoPatient.age}</p>
            <p><b>Sex:</b> {infoPatient.sex}</p>
            <p><b>Mobile:</b> {infoPatient.mobile}</p>
            <p><b>Blood Type:</b> {infoPatient.medicalInfo?.bloodType || ''}</p>
            {/* Editable Medical Info */}
            <div style={{ marginTop: '1rem' }}>
              <h4>Diseases</h4>
              <ul>
                {infoPatient.diseases?.map((d, idx) => (
                  <li key={idx}>
                    {d} <button className="btn-delete" onClick={() => handleDeleteMedical('diseases', idx)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={e => handleAddMedical(e, 'diseases')} style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={medicalInputs.diseases} onChange={e => setMedicalInputs({ ...medicalInputs, diseases: e.target.value })} placeholder="Add Disease" />
                <button type="submit" className="btn-primary">Add</button>
              </form>

              <h4>Ailments</h4>
              <ul>
                {infoPatient.ailments?.map((a, idx) => (
                  <li key={idx}>
                    {a} <button className="btn-delete" onClick={() => handleDeleteMedical('ailments', idx)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={e => handleAddMedical(e, 'ailments')} style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={medicalInputs.ailments} onChange={e => setMedicalInputs({ ...medicalInputs, ailments: e.target.value })} placeholder="Add Ailment" />
                <button type="submit" className="btn-primary">Add</button>
              </form>

              <h4>Treatments</h4>
              <ul>
                {infoPatient.treatments?.map((t, idx) => (
                  <li key={idx}>
                    {t} <button className="btn-delete" onClick={() => handleDeleteMedical('treatments', idx)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={e => handleAddMedical(e, 'treatments')} style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={medicalInputs.treatments} onChange={e => setMedicalInputs({ ...medicalInputs, treatments: e.target.value })} placeholder="Add Treatment" />
                <button type="submit" className="btn-primary">Add</button>
              </form>

              <h4>Medicines</h4>
              <ul>
                {infoPatient.medicines?.map((m, idx) => (
                  <li key={idx}>
                    {m} <button className="btn-delete" onClick={() => handleDeleteMedical('medicines', idx)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={e => handleAddMedical(e, 'medicines')} style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={medicalInputs.medicines} onChange={e => setMedicalInputs({ ...medicalInputs, medicines: e.target.value })} placeholder="Add Medicine" />
                <button type="submit" className="btn-primary">Add</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;
