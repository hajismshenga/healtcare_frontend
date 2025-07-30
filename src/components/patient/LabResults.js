import React, { useState } from 'react';
import './styles/LabResults.css';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

// Mock data: Replace with backend data as needed
const initialLabResults = [
  {
    id: 'LR1',
    date: '2025-07-25',
    doctor: 'Dr. John Smith',
    hospital: 'Muhimbili National Hospital',
    disease: 'Diabetes',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2x daily' },
      { name: 'Insulin', dosage: '10 units', frequency: 'at night' }
    ]
  },
  {
    id: 'LR2',
    date: '2025-06-15',
    doctor: 'Dr. Jane Doe',
    hospital: 'Aga Khan Hospital',
    disease: 'Hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: '1x daily' }
    ]
  }
];

const LabResults = () => {
  const [labResults, setLabResults] = useState(initialLabResults);
  const handleDelete = (id) => {
    setLabResults(labResults.filter(result => result.id !== id));
  };
  return (
    <div className="lab-results-container">
      <h2 className="lab-results-title">Lab Results & Medications</h2>
      <div className="lab-results-table-wrapper">
        <table className="lab-results-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Disease</th>
              <th>Medications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {labResults.map(result => (
              <tr key={result.id}>
                <td>{result.date}</td>
                <td>{result.doctor}</td>
                <td>{result.hospital}</td>
                <td>{result.disease}</td>
                <td>
                  <ul className="medications-list">
                    {result.medications.map((med, idx) => (
                      <li key={idx}>{med.name} ({med.dosage}, {med.frequency})</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <IconButton color="error" onClick={() => handleDelete(result.id)}><Delete /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LabResults;
