import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Typography, Box } from '@mui/material';

const Welcome = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Healthcare System
      </Typography>
      
      <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
        <Card 
          sx={{ 
            p: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Hospital Portal
          </Typography>
          <Link to="/hospital" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1" align="center">
              Access Hospital Management
            </Typography>
          </Link>
        </Card>

        <Card 
          sx={{ 
            p: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Doctor Portal
          </Typography>
          <Link to="/doctor/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1" align="center">
              Doctor Login
            </Typography>
          </Link>
        </Card>

        <Card 
          sx={{ 
            p: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Patient Portal
          </Typography>
          <Link to="/patient" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1" align="center">
              Patient Login
            </Typography>
          </Link>
        </Card>

        <Card 
          sx={{ 
            p: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Laboratory Portal
          </Typography>
          <Link to="/laboratory" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1" align="center">
              Laboratory Login
            </Typography>
          </Link>
        </Card>
      </Box>
    </Container>
  );
};

export default Welcome;
