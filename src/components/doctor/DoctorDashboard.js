import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, Person, LocalHospital, Receipt, Settings, AccountCircle } from '@mui/icons-material';
import './styles/DoctorStyles.css';
import PatientManagement from './PatientManagement';
import LabTests from './LabTests';
import Prescriptions from './Prescriptions';
import DoctorProfile from './DoctorProfile';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Patient Management');
  const [open, setOpen] = useState(true);

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
          <ListItem button onClick={() => setActiveSection('Profile')} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListItemIcon>
              <AccountCircle sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ display: open ? 'block' : 'none', color: 'white' }} />
          </ListItem>
          <ListItem button onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
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
          
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
            {activeSection === 'Patient Management' && <PatientManagement />}
            {activeSection === 'Lab Tests' && <LabTests />}
            {activeSection === 'Prescriptions' && <Prescriptions />}
            {activeSection === 'Profile' && <DoctorProfile />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
