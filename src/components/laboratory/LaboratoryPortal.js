import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Add, Visibility, Science, Assessment } from '@mui/icons-material';

const LaboratoryPortal = () => {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const labToken = localStorage.getItem('labToken');
    if (!labToken) {
      navigate('/laboratory/login');
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Laboratory Portal
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Laboratory Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<Science />}
                fullWidth
                sx={{ mb: 2 }}
                component={Link}
                to="/laboratory/dashboard"
              >
                Laboratory Dashboard
              </Button>
              <Button
                variant="outlined"
                startIcon={<Assessment />}
                fullWidth
                component={Link}
                to="/laboratory/workflow"
              >
                Test Workflow
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Test Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{ mb: 2 }}
                component={Link}
                to="/laboratory/pending-tests"
              >
                Pending Tests
              
                Completed Tests
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LaboratoryPortal;
