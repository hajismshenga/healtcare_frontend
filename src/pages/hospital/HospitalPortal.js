import React from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { Add, Visibility, Logout, AccountCircle } from '@mui/icons-material';

const HospitalPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('hospitalId');
    sessionStorage.removeItem('hospitalName');
    
    // Redirect to login
    navigate('/hospital/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" size="large" sx={{ width: 240, fontWeight: 700, fontSize: '1.2rem', borderRadius: 3 }} onClick={() => navigate('/hospital/login')}>
            Login to Hospital Account
          </Button>

          <Button variant="outlined" color="primary" size="large" sx={{ width: 240, fontWeight: 700, fontSize: '1.2rem', borderRadius: 3 }} onClick={() => navigate('/hospital/register')}>
            Register a New Hospital
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HospitalPortal;
