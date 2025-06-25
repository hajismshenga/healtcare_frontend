import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Card } from '@mui/material';
import { Person, MedicalServices, Receipt, LocalHospital } from '@mui/icons-material';

const PatientPortal = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Patient Portal
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Person sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Profile
                </Link>
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MedicalServices sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Medical Records
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/records" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Records
                </Link>
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Receipt sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Test Results
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/results" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Results
                </Link>
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LocalHospital sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Appointments
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/appointments" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Appointments
                </Link>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PatientPortal;
