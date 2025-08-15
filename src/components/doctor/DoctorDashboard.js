import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, Person, LocalHospital, Receipt, Settings, AccountCircle } from '@mui/icons-material';
import './styles/DoctorStyles.css';
import PatientManagement from './PatientManagement';
import LabTests from './LabTests';
import Prescriptions from './Prescriptions';
import DoctorProfile from './DoctorProfile';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// Mock data for second opinion requests
const initialSecondOpinionRequests = [
  {
    id: 'REQ1',
    patientId: 'PID/001',
    patientName: 'Ali Said',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2x daily' },
      { name: 'Insulin', dosage: '10 units', frequency: 'at night' }
    ]
  },
  {
    id: 'REQ2',
    patientId: 'PID/002',
    patientName: 'Makame ali',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: '1x daily' }
    ]
  }
];

const SecondOpinionRequests = () => {
  const [requests, setRequests] = React.useState(initialSecondOpinionRequests);
  const [open, setOpen] = React.useState(false);
  const [selectedMeds, setSelectedMeds] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState('');

  const handleView = (patientName, medications) => {
    setSelectedPatient(patientName);
    setSelectedMeds(medications);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMeds([]);
    setSelectedPatient('');
  };
  const handleDelete = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(44,62,80,0.07)', padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 18 }}>Second Opinion Requests</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f7faff', borderRadius: 10 }}>
        <thead>
          <tr style={{ background: '#e3f0ff' }}>
            <th style={{ padding: 12, color: '#1976d2', fontWeight: 700 }}>Patient ID</th>
            <th style={{ padding: 12, color: '#1976d2', fontWeight: 700 }}>Patient Name</th>
            <th style={{ padding: 12, color: '#1976d2', fontWeight: 700 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{req.patientId}</td>
              <td style={{ padding: 10 }}>{req.patientName}</td>
              <td style={{ padding: 10, display: 'flex', gap: 8 }}>
                <Button variant="contained" onClick={() => handleView(req.patientName, req.medications)}>
                  View Medications
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(req.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Medications for {selectedPatient}</DialogTitle>
        <DialogContent>
          <ul style={{ fontSize: 16, color: '#374151' }}>
            {selectedMeds.map((med, idx) => (
              <li key={idx}>{med.name} ({med.dosage}, {med.frequency})</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Patient Management');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    window.location.href = '/doctor/login';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navigation Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 72,
            boxSizing: 'border-box',
            borderRight: 'none',
            backgroundColor: '#1976d2',
            color: 'white',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: '#1565c0',
          }}
          onClick={handleDrawerClose}
        >
          <Typography variant="h6" noWrap component="div">
            {open ? 'Doctor Dashboard' : ''}
          </Typography>
        </Box>
        <List>
          <ListItem button onClick={() => setActiveSection('Patient Management')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <Person sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Patient Management" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setActiveSection('Lab Tests')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <LocalHospital sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Lab Tests" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setActiveSection('Prescriptions')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <Receipt sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Prescriptions" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setActiveSection('Second Opinion Requests')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <AccountCircle sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Second Opinion Requests" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setActiveSection('Profile')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <AccountCircle sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/doctor/settings')} sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
            <ListItemIcon>
              <Settings sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={handleDrawerOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {/* Content Area */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">{activeSection}</Typography>
          </Box>
          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f7faff', p: 3 }}>
            {activeSection === 'Patient Management' && <PatientManagement />}
            {activeSection === 'Lab Tests' && <LabTests />}
            {activeSection === 'Prescriptions' && <Prescriptions />}
            {activeSection === 'Profile' && <DoctorProfile />}
            {activeSection === 'Second Opinion Requests' && <SecondOpinionRequests />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
