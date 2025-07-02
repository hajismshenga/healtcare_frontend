import React from 'react';
import { Box, Typography, Avatar, Grid, Paper, Button } from '@mui/material';
import { Edit, Person, Email, Phone, LocationOn } from '@mui/icons-material';

const DoctorProfile = () => {
  const [editMode, setEditMode] = React.useState(false);

  // Mock doctor data - replace with actual data from API
  const doctorData = {
    name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    email: 'dr.john.smith@example.com',
    phone: '+255 712 345 678',
    location: 'Muhimbili National Hospital',
    bio: 'Experienced cardiologist with over 15 years of practice. Specializes in heart disease diagnosis and treatment.',
    qualifications: [
      'MD - Internal Medicine',
      'Fellowship in Cardiology',
      'Certified Cardiologist - Tanzania Medical Council'
    ]
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          My Profile
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          onClick={handleEdit}
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                bgcolor: 'primary.main'
              }}
            >
              {doctorData.name[0]}
            </Avatar>
            <Typography variant="h5" component="h2">
              {doctorData.name}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              {doctorData.specialization}
            </Typography>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="body1">{doctorData.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography variant="body1">{doctorData.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography variant="body1">{doctorData.phone}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="body1">{doctorData.location}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Professional Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Professional Information
            </Typography>
            <Typography variant="body1" paragraph>
              {doctorData.bio}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Qualifications
            </Typography>
            <Box sx={{ ml: 2 }}>
              {doctorData.qualifications.map((qualification, index) => (
                <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                  • {qualification}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorProfile;
