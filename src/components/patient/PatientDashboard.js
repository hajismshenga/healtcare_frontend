import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PatientStyles.css';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('medical-history');
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

  const [appointments, setAppointments] = useState([
    {
      id: 'A1',
      doctor: 'Dr. Smith',
      date: '2025-06-25',
      time: '10:00 AM',
      status: 'Upcoming',
      reason: 'Follow-up consultation'
    },
    {
      id: 'A2',
      doctor: 'Dr. Johnson',
      date: '2025-06-28',
      time: '2:30 PM',
      status: 'Upcoming',
      reason: 'Blood Test Results'
    }
  ]);

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
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.8,
      availability: 'Monday-Friday, 9AM-5PM'
    },
    {
      id: 'D2',
      name: 'Dr. Michael Smith',
      specialty: 'Endocrinology',
      experience: '10 years',
      rating: 4.9,
      availability: 'Tuesday-Saturday, 10AM-6PM'
    }
  ]);

  const [secondOpinionRequest, setSecondOpinionRequest] = useState({
    doctor: '',
    reason: '',
    medicalHistory: '',
    currentMedications: ''
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

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const patientToken = localStorage.getItem('patientToken');
    if (!patientToken) {
      navigate('/patient');
    }
  }, [navigate]);

  // Mock data
  useEffect(() => {
    const mockDoctors = [
      {
        id: 'D1',
        name: 'Dr. John Smith',
        specialty: 'Cardiology',
        experience: '15 years',
        rating: 4.5,
        availability: 'MWF 9-5',
        cv: 'https://example.com/cv/drsmith.pdf'
      },
      {
        id: 'D2',
        name: 'Dr. Sarah Johnson',
        specialty: 'Neurology',
        experience: '10 years',
        rating: 4.8,
        availability: 'TTh 10-6',
        cv: 'https://example.com/cv/drjohnson.pdf'
      }
    ];

    const mockAppointments = [
      {
        id: 'A1',
        doctor: 'Dr. John Smith',
        date: '2025-06-25',
        time: '10:00 AM',
        status: 'Confirmed'
      },
      {
        id: 'A2',
        doctor: 'Dr. Sarah Johnson',
        date: '2025-06-28',
        time: '2:30 PM',
        status: 'Scheduled'
      }
    ];

    const mockPrescriptions = [
      {
        id: 'P1',
        doctor: 'Dr. John Smith',
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
    setAppointments(mockAppointments);
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
        <h1>Patient Dashboard</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeSection === 'medical-history' ? 'active' : ''}`}
            onClick={() => setActiveSection('medical-history')}
          >
            Medical History
          </button>
          <button
            className={`nav-btn ${activeSection === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveSection('appointments')}
          >
            Appointments
          </button>
          <button
            className={`nav-btn ${activeSection === 'prescriptions' ? 'active' : ''}`}
            onClick={() => setActiveSection('prescriptions')}
          >
            Prescriptions
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

        {activeSection === 'appointments' && (
          <div className="appointments">
            <h2>Appointments</h2>
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h3>{appointment.doctor}</h3>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'prescriptions' && (
          <div className="prescriptions">
            <h2>Prescriptions</h2>
            <div className="prescriptions-list">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-info">
                    <h3>Prescribed by: {prescription.doctor}</h3>
                    <div className="medications-list">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="medication-item">
                          <h4>{med.name}</h4>
                          <p><strong>Dosage:</strong> {med.dosage}</p>
                          <p><strong>Frequency:</strong> {med.frequency}</p>
                        </div>
                      ))}
                    </div>
                    <p><strong>Instructions:</strong> {prescription.instructions}</p>
                    <p><strong>Date Prescribed:</strong> {prescription.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'lab-results' && (
          <div className="lab-results">
            <h2>Lab Results</h2>
            <div className="results-list">
              {labResults.map((result) => (
                <div key={result.id} className="result-card">
                  <div className="result-info">
                    <h3>{result.testName}</h3>
                    <p><strong>Date:</strong> {result.date}</p>
                    <p><strong>Status:</strong> {result.status}</p>
                    <div className="result-details">
                      {Object.entries(result.results).map(([key, value]) => (
                        <p key={key}>{key}: {value}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="second-opinion-section">
          <h2>Request Second Opinion</h2>
          <div className="doctors-list">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p><strong>Experience:</strong> {doctor.experience}</p>
                  <p><strong>Rating:</strong> {doctor.rating} ⭐</p>
                  <p><strong>Availability:</strong> {doctor.availability}</p>
                </div>
                <div className="doctor-actions">
                  <button
                    className="btn-primary"
                    onClick={() => handleRequestOpinion(doctor)}
                  >
                    Request Opinion
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleViewCV(doctor.cv)}
                  >
                    View CV
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
