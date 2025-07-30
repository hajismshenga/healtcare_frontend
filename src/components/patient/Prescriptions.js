import React, { useState } from 'react';
import './styles/Prescriptions.css';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const initialPrescriptions = [
  {
    id: 'PR1',
    patient: 'John Doe',
    date: '2025-07-25',
    disease: 'Diabetes',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2x daily' },
      { name: 'Insulin', dosage: '10 units', frequency: 'at night' }
    ]
  },
  {
    id: 'PR2',
    patient: 'John Doe',
    date: '2025-06-15',
    disease: 'Hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: '1x daily' }
    ]
  }
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);

  const handleDelete = (idx) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  return (
    <div className="patient-prescriptions-container">
      <h2 className="prescriptions-title">My Prescriptions</h2>
      <div className="prescriptions-table-wrapper">
        <table className="prescriptions-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Disease</th>
              <th>Medications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, idx) => (
              <tr key={prescription.id}>
                <td>{prescription.patient}</td>
                <td>{prescription.date}</td>
                <td>{prescription.disease}</td>
                <td>
                  <ul className="medications-list">
                    {prescription.medications.map((med, mIdx) => (
                      <li key={mIdx}>{med.name} ({med.dosage}, {med.frequency})</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><Delete /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescriptions;
