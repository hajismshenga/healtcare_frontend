import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PatientStyles.css';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('medical-history');
  const [secondOpinionRequests, setSecondOpinionRequests] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    name: 'John Doe',
    age: '35',
    gender: 'Male',
    bloodType: 'O+',
    contact: '123-456-7890',
    emergencyContact: '987-654-3210',
    medicalHistory: 'Hypertension, Diabetes',
    allergies: 'Peanuts, Penicillin'
  });

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'P1',
      doctor: 'Dr. Smith',
      date: '2025-06-20',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'daily' }
      ],
      instructions: 'Take with food, monitor blood pressure'
    }
  ]);

  const [labResults, setLabResults] = useState([
    {
      id: 'L1',
      test: 'Complete Blood Count',
      date: '2025-06-20',
      results: [
        { parameter: 'WBC', value: '7.5', unit: '10^3/µL', reference: '4.0-11.0' },
        { parameter: 'RBC', value: '5.0', unit: '10^6/µL', reference: '4.5-5.9' },
        { parameter: 'Hemoglobin', value: '14.5', unit: 'g/dL', reference: '13.5-17.5' }
      ],
      status: 'Normal'
    }
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 'D1',
      name: 'Dr. Asha Ame',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.8,
      availability: 'Monday-Friday, 9AM-5PM'
    },
    {
      id: 'D2',
      name: 'Dr. Mohd Ali',
      specialty: 'Endocrinology',
      experience: '10 years',
      rating: 4.9,
      availability: 'Tuesday-Saturday, 10AM-6PM'
    }
  ]);

  const [secondOpinionRequest, setSecondOpinionRequest] = useState({
    doctor: '',
    specialty: '',
    reason: '',
    medicalHistory: patientInfo.medicalHistory,
    currentMedications: prescriptions[0]?.medications?.map(med => med.name).join(', ') || ''
  });

  const handleSecondOpinion = (doctor) => {
    setSecondOpinionRequest({
      doctor: doctor.name,
      specialty: doctor.specialty,
      reason: '',
      medicalHistory: patientInfo.medicalHistory,
      currentMedications: prescriptions[0]?.medications?.map(med => med.name).join(', ') || ''
    });
  };



  // Mock data
  useEffect(() => {
    const mockDoctors = [
      {
        id: 'D1',
        name: 'Dr. Kombo Ali',
        specialty: 'Cardiology',
        experience: '15 years',
        rating: 4.5,
        availability: 'MWF 9-5',
        cv: 'https://example.com/cv/drsmith.pdf'
      },
      {
        id: 'D2',
        name: 'Dr. Juma Ali',
        specialty: 'Neurology',
        experience: '10 years',
        rating: 4.8,
        availability: 'TTh 10-6',
        cv: 'https://example.com/cv/drjohnson.pdf'
      }
    ];

    const mockSecondOpinions = [
      {
        id: 'SO1',
        doctor: 'Dr. Paul Pogba',
        specialty: 'Cardiology',
        reason: 'Second opinion on heart condition',
        status: 'Pending',
        date: '2025-06-25',
        medicalHistory: 'Hypertension, Diabetes',
        currentMedications: 'Metformin, Amlodipine'
      },
      {
        id: 'SO2',
        doctor: 'Dr. Asha Haji',
        specialty: 'Endocrinology',
        reason: 'Second opinion on diabetes treatment',
        status: 'Completed',
        date: '2025-06-28',
        medicalHistory: 'Hypertension, Diabetes',
        currentMedications: 'Metformin, Amlodipine'
      }
    ];

    const mockPrescriptions = [
      {
        id: 'P1',
        doctor: 'Dr. Pili Abuu',
        medications: [
          { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
          { name: 'Amlodipine', dosage: '5mg', frequency: 'daily' }
        ],
        date: '2025-06-22',
        instructions: 'Take with food, monitor blood pressure'
      }
    ];

    const mockLabResults = [
      {
        id: 'L1',
        testName: 'Complete Blood Count',
        date: '2025-06-22',
        results: {
          wbc: '7.5',
          rbc: '4.5',
          hgb: '14.2',
          plt: '250'
        },
        status: 'Normal'
      }
    ];

    setDoctors(mockDoctors);

    setSecondOpinionRequests(mockSecondOpinions);

    setPrescriptions(mockPrescriptions);
    setLabResults(mockLabResults);
  }, []);

  const handleRequestOpinion = (doctor) => {
    // Mock API call - in real system would submit request
    alert(`Requesting second opinion from ${doctor.name}`);
  };

  const handleViewCV = (cvUrl) => {
    window.open(cvUrl, '_blank');
  };

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeSection === 'medical-history' ? 'active' : ''}`}
            onClick={() => setActiveSection('medical-history')}
          >
            Medical History
          </button>
          <button
            className={`nav-btn ${activeSection === 'second-opinion' ? 'active' : ''}`}
            onClick={() => setActiveSection('second-opinion')}
          >
            Second Opinion
          </button>
          <button
            className={`nav-btn ${activeSection === 'lab-results' ? 'active' : ''}`}
            onClick={() => setActiveSection('lab-results')}
          >
            Lab Results
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeSection === 'medical-history' && (
          <div className="medical-history">
            <h2>Medical History</h2>
            <div className="history-section">
              <h3>Diagnoses</h3>
              <ul>
                <li>Hypertension</li>
                <li>Diabetes</li>
                <li>Asthma</li>
              </ul>
            </div>
            <div className="history-section">
              <h3>Medical Conditions</h3>
              <ul>
                <li>High Blood Pressure</li>
                <li>High Cholesterol</li>
                <li>Seasonal Allergies</li>
              </ul>
            </div>
            <div className="history-section">
              <h3>Surgeries</h3>
              <ul>
                <li>Appendectomy - 2020</li>
                <li>Tonsillectomy - 2015</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'lab-results' && (
          <div className="lab-results">
            <h2>Lab Results</h2>
            <div className="results-list">
              {labResults.map((result) => (
                <div key={result.id} className="result-card">
                  <h3>{result.test}</h3>
                  <p><strong>Date:</strong> {result.date}</p>
                  <p><strong>Status:</strong> {result.status}</p>
                  <div className="result-details">
                    {result.results.map((param) => (
                      <p key={param.parameter}>
                        {param.parameter}: {param.value}{param.unit} ({param.reference})
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'second-opinion' && (
          <div className="second-opinion">
            <h2>Second Opinion Requests</h2>
            <div className="second-opinion-list">
              {secondOpinionRequests.map((request) => (
                <div key={request.id} className="second-opinion-card">
                  <div className="second-opinion-details">
                    <p><strong>Doctor:</strong> {request.doctor}</p>
                    <p><strong>Specialty:</strong> {request.specialty}</p>
                    <p><strong>Reason:</strong> {request.reason}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Requested On:</strong> {request.date}</p>
                    <p><strong>Medical History:</strong> {request.medicalHistory}</p>
                    <p><strong>Current Medications:</strong> {request.currentMedications}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="second-opinion-form">
              <h3>Request Second Opinion</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const newRequest = {
                  id: Date.now().toString(),
                  doctor: secondOpinionRequest.doctor,
                  specialty: secondOpinionRequest.specialty,
                  reason: secondOpinionRequest.reason,
                  medicalHistory: secondOpinionRequest.medicalHistory,
                  currentMedications: secondOpinionRequest.currentMedications,
                  status: 'Pending',
                  date: new Date().toISOString().split('T')[0]
                };
                setSecondOpinionRequests([...secondOpinionRequests, newRequest]);
                setSecondOpinionRequest({
                  doctor: '',
                  specialty: '',
                  reason: '',
                  medicalHistory: '',
                  currentMedications: ''
                });
              }}>
                <div className="form-group">
                  <label htmlFor="doctor">Select Doctor</label>
                  <select
                    id="doctor"
                    value={secondOpinionRequest.doctor}
                    onChange={(e) => {
                      const selectedDoctor = doctors.find(d => d.name === e.target.value);
                      setSecondOpinionRequest({
                        ...secondOpinionRequest,
                        doctor: e.target.value,
                        specialty: selectedDoctor?.specialty || ''
                      });
                    }}
                    required
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.specialty})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Reason for Second Opinion</label>
                  <textarea
                    id="reason"
                    value={secondOpinionRequest.reason}
                    onChange={(e) => setSecondOpinionRequest({
                      ...secondOpinionRequest,
                      reason: e.target.value
                    })}
                    required
                  />
                </div>
                <button type="submit" className="primary-button">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
