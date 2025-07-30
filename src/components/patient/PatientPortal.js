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
                Medical History
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/medical-history" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Medical History
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
                Prescriptions
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/prescriptions" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Prescriptions
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
                Lab Results
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/lab-results" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Lab Results
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
                Second Opinion
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                <Link to="/patient/second-opinion" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Request Second Opinion
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
