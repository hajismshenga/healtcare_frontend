import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './styles/DoctorStyles.css';
import { PatientService } from '../../services/PatientService';

const PatientManagement = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load patients from backend
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

  // Filter patients based on search term
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
          onClick={() => navigate('/doctor/patient/new')}
        >
          <FaPlus className="button-icon" />
          Add New Patient
        </button>
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
    </div>
  );
};

export default PatientManagement;
