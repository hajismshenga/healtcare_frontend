import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Add, Visibility } from '@mui/icons-material';

const LaboratoryPortal = () => {
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
                startIcon={<Add />}
                fullWidth
                sx={{ mb: 2 }}
              >
                <Link to="/laboratory/add-lab" style={{ textDecoration: 'none', color: 'white' }}>
                  Add Laboratory Test
                </Link>
              </Button>
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                fullWidth
              >
                <Link to="/laboratory/view-tests" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Laboratory Tests
                </Link>
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Patient Samples
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{ mb: 2 }}
              >
                <Link to="/laboratory/add-sample" style={{ textDecoration: 'none', color: 'white' }}>
                  Add Patient Sample
                </Link>
              </Button>
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                fullWidth
              >
                <Link to="/laboratory/view-samples" style={{ textDecoration: 'none', color: 'inherit' }}>
                  View Patient Samples
                </Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LaboratoryPortal;
