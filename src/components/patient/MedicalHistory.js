import React, { useState } from 'react';
import './styles/MedicalHistory.css';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

// Mock data: replace with backend/API data as needed
const initialHistory = [
  {
    id: 'MH1',
    date: '2025-07-25',
    doctor: 'Dr. John Smith',
    hospital: 'Muhimbili National Hospital',
    disease: 'Diabetes',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2x daily' },
      { name: 'Insulin', dosage: '10 units', frequency: 'at night' }
    ],
    notes: 'Monitor blood sugar daily.'
  },
  {
    id: 'MH2',
    date: '2025-06-15',
    doctor: 'Dr. Jane Doe',
    hospital: 'Aga Khan Hospital',
    disease: 'Hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: '1x daily' }
    ],
    notes: 'Reduce salt intake.'
  }
];

const MedicalHistory = () => {
  const [history, setHistory] = useState(initialHistory);
  const handleDelete = (id) => {
    setHistory(history.filter(entry => entry.id !== id));
  };
  return (
    <div className="medical-history-container">
      <h2 className="medical-history-title">Medical History</h2>
      {history.length === 0 ? (
        <div className="medical-history-empty">No medical history found.</div>
      ) : (
        <div className="medical-history-list">
          {history.map((entry) => (
            <div className="medical-history-card" key={entry.id}>
              <div className="mh-header" style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div className="mh-date">{entry.date}</div>
                  <div className="mh-doctor">Doctor: <b>{entry.doctor}</b></div>
                  <div className="mh-hospital">Hospital: <b>{entry.hospital}</b></div>
                </div>
                <IconButton color="error" onClick={() => handleDelete(entry.id)}><Delete /></IconButton>
              </div>
              <div className="mh-disease">Disease/Diagnosis: <b>{entry.disease}</b></div>
              <div className="mh-meds">
                <div className="mh-meds-title">Medications:</div>
                <ul>
                  {entry.medications.map((med, idx) => (
                    <li key={idx}>{med.name} ({med.dosage}, {med.frequency})</li>
                  ))}
                </ul>
              </div>
              {entry.notes && (
                <div className="mh-notes">Notes: {entry.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
