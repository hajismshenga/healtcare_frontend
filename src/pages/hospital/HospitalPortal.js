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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {sessionStorage.getItem('hospitalName') || 'Hospital Portal'}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hospital Portal
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Doctor Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <Link to="/hospital/add-doctor" style={{ textDecoration: 'none', color: 'white' }}>
                    Add Doctor
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  fullWidth
                >
                  <Link to="/hospital/view-doctors" style={{ textDecoration: 'none', color: 'inherit' }}>
                    View Doctors
                  </Link>
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Laboratory Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <Link to="/hospital/add-lab" style={{ textDecoration: 'none', color: 'white' }}>
                    Add Laboratory
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  fullWidth
                >
                  <Link to="/hospital/view-labs" style={{ textDecoration: 'none', color: 'inherit' }}>
                    View Laboratories
                  </Link>
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  System Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Visibility />}
                  fullWidth
                >
                  <Link to="/hospital/view-patients" style={{ textDecoration: 'none', color: 'white' }}>
                    View All Patients
                  </Link>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const withAuth = (Component) => {
  return (props) => {
    const hospitalId = sessionStorage.getItem('hospitalId');
    if (!hospitalId) {
      return <Navigate to="/hospital/login" state={{ from: props.location }} replace />;
    }
    return <Component {...props} />;
  };
};

export default withAuth(HospitalPortal);
