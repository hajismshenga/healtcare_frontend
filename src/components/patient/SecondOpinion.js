import React, { useState } from 'react';
import './styles/SecondOpinion.css';
import { Button, Snackbar, Alert } from '@mui/material';

// Mock doctors data (replace with backend data as needed)
const mockDoctors = [
  {
    id: 'DID/001',
    name: 'Dr. John Smith',
    profession: 'Cardiologist',
    hospital: 'Muhimbili National Hospital',
    email: 'john.smith@example.com',
    phone: '+255 123 456 789'
  },
  {
    id: 'DID/002',
    name: 'Dr. Jane Doe',
    profession: 'Neurologist',
    hospital: 'Aga Khan Hospital',
    email: 'jane.doe@example.com',
    phone: '+255 987 654 321'
  },
  {
    id: 'DID/003',
    name: 'Dr. Adam Mohamed',
    profession: 'General Practitioner',
    hospital: 'Regency Medical Centre',
    email: 'adam.mohamed@example.com',
    phone: '+255 555 111 222'
  }
];

const SecondOpinion = () => {
  const [invited, setInvited] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, doctor: '' });

  const handleInvite = (doctor) => {
    setInvited({ ...invited, [doctor.id]: true });
    setSnackbar({ open: true, doctor: doctor.name });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, doctor: '' });
  };

  return (
    <div className="second-opinion-container">
      <h2 className="second-opinion-title">Request a Second Opinion</h2>
      <div className="doctors-list">
        {mockDoctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <div className="doctor-info">
              <div className="doctor-name">{doctor.name}</div>
              <div className="doctor-profession">{doctor.profession}</div>
              <div className="doctor-hospital">{doctor.hospital}</div>
              <div className="doctor-email">{doctor.email}</div>
              <div className="doctor-phone">{doctor.phone}</div>
            </div>
            <Button
              variant="contained"
              color="primary"
              disabled={!!invited[doctor.id]}
              onClick={() => handleInvite(doctor)}
              className="invite-btn"
            >
              {invited[doctor.id] ? 'Invited' : 'Invite'}
            </Button>
          </div>
        ))}
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Invitation sent to {snackbar.doctor}!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SecondOpinion;
