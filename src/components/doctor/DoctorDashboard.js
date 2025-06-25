import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DoctorStyles.css';
import PatientManagement from './PatientManagement';
import SecondOpinion from './SecondOpinion';
import LabTests from './LabTests';
import DoctorProfile from './DoctorProfile';
import PatientNavigation from './PatientNavigation';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    medicalHistory: '',
    diagnosis: '',
    treatmentPlan: ''
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labRequests, setLabRequests] = useState([]);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const doctorToken = localStorage.getItem('doctorToken');
    if (!doctorToken) {
      navigate('/doctor');
    }
  }, [navigate]);

  // Mock data
  useEffect(() => {
    const mockPatients = [
      {
        id: 'P1',
        name: 'John Doe',
        age: '35',
        gender: 'Male',
        contact: '123-456-7890',
        medicalHistory: 'Hypertension, Diabetes',
        diagnosis: 'Type 2 Diabetes',
        treatmentPlan: 'Metformin 500mg, lifestyle changes'
      },
      {
        id: 'P2',
        name: 'Jane Smith',
        age: '45',
        gender: 'Female',
        contact: '987-654-3210',
        medicalHistory: 'Heart Disease, High Cholesterol',
        diagnosis: 'Coronary Artery Disease',
        treatmentPlan: 'Atorvastatin 20mg, beta blockers'
      }
    ];

    const mockPrescriptions = [
      {
        id: 'PR1',
        patientId: 'P1',
        medications: [
          { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
          { name: 'Amlodipine', dosage: '5mg', frequency: 'daily' }
        ],
        date: '2025-06-22',
        instructions: 'Take with food, monitor blood pressure'
      }
    ];

    const mockLabRequests = [
      {
        id: 'LR1',
        patientId: 'P1',
        tests: [
          { name: 'Blood Sugar Test', status: 'Pending' },
          { name: 'Cholesterol Test', status: 'Completed' }
        ],
        date: '2025-06-22',
        priority: 'High'
      }
    ];

    setPatients(mockPatients);
    setPrescriptions(mockPrescriptions);
    setLabRequests(mockLabRequests);
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newId = `P${Date.now()}`;
    const newPatientData = { id: newId, ...newPatient };
    setPatients([...patients, newPatientData]);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      contact: '',
      medicalHistory: '',
      diagnosis: '',
      treatmentPlan: ''
    });
  };

  const handleUpdateDiagnosis = (patientId, diagnosis, treatment) => {
    const updatedPatients = patients.map(patient => 
      patient.id === patientId ? { ...patient, diagnosis, treatmentPlan: treatment } : patient
    );
    setPatients(updatedPatients);
  };

  const handleLabRequest = (patientId, test) => {
    const newRequest = {
      id: `LR${Date.now()}`,
      patientId,
      tests: [{ name: test, status: 'Pending' }],
      date: new Date().toISOString().split('T')[0],
      priority: 'Normal'
    };
    setLabRequests([...labRequests, newRequest]);
  };

  return (
    <div className="doctor-dashboard">
      <div className="top-bar">
        <DoctorProfile />
      </div>
      <div className="main-content">
        <div className="dashboard-sections">
          <div className="profile-section">
            <div className="profile-picture">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Doctor Profile" 
              />
              <div className="profile-info">
                <h3>Dr. Test</h3>
                <p>Medical Specialist</p>
              </div>
            </div>
          </div>

          <div className="nav-menu">
            <button
              className={`nav-item ${activeSection === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveSection('patients')}
            >
              <i className="fas fa-user-md"></i>
              Patient Information
            </button>
            <button
              className={`nav-item ${activeSection === 'second-opinion' ? 'active' : ''}`}
              onClick={() => setActiveSection('second-opinion')}
            >
              <i className="fas fa-comments"></i>
              Second Opinion
            </button>
            <button
              className={`nav-item ${activeSection === 'lab-tests' ? 'active' : ''}`}
              onClick={() => setActiveSection('lab-tests')}
            >
              <i className="fas fa-flask"></i>
              Lab Tests
            </button>
            <button
              className={`nav-item ${activeSection === 'prescriptions' ? 'active' : ''}`}
              onClick={() => setActiveSection('prescriptions')}
            >
              <i className="fas fa-prescription-bottle"></i>
              Prescriptions
            </button>
          </div>
        </div>

        <div className="content-header">
          <h2>{
            activeSection === 'patients' ? 'Patient Information' :
            activeSection === 'second-opinion' ? 'Second Opinion Requests' :
            activeSection === 'lab-tests' ? 'Lab Tests' :
            'Prescriptions'
          }</h2>
        </div>
        <div className="content-section">
          {activeSection === 'patients' && (
            <div className="patients-section">
              <PatientNavigation />
              <PatientManagement />
            </div>
          )}
          {activeSection === 'second-opinion' && <SecondOpinion />} 
          {activeSection === 'lab-tests' && (
            <div className="lab-tests">
              <h3>Lab Test Requests</h3>
              <div className="lab-requests-list">
                {labRequests.map((request) => (
                  <div key={request.id} className="lab-request-card">
                    <div className="request-info">
                      <h4>Patient: {patients.find(p => p.id === request.patientId)?.name}</h4>
                      <p><strong>Date:</strong> {request.date}</p>
                      <p><strong>Priority:</strong> {request.priority}</p>
                      <div className="test-list">
                        {request.tests.map((test, index) => (
                          <div key={index} className="test-item">
                            <p>{test.name}</p>
                            <p className="test-status">{test.status}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'prescriptions' && (
            <div className="prescriptions">
              <h3>Prescriptions</h3>
              <div className="prescriptions-list">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="prescription-card">
                    <div className="prescription-info">
                      <h4>Patient: {patients.find(p => p.id === prescription.patientId)?.name}</h4>
                      <p><strong>Date:</strong> {prescription.date}</p>
                      <div className="medications-list">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="medication-item">
                            <h5>{med.name}</h5>
                            <p><strong>Dosage:</strong> {med.dosage}</p>
                            <p><strong>Frequency:</strong> {med.frequency}</p>
                          </div>
                        ))}
                      </div>
                      <p><strong>Instructions:</strong> {prescription.instructions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    <DoctorProfile />
    </div>
  );
};

export default DoctorDashboard;
