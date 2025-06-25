import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Add, Visibility } from '@mui/icons-material';

const HospitalPortal = () => {
  return (
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
  );
};

export default HospitalPortal;
