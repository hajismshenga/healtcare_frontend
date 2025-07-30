import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Backend dependency removed. Using mock registration logic below instead.

const HospitalRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ownership: '',
    district: '',
    location: '',
    contactInfo: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Get existing hospitals from localStorage
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    // Check if username exists
    if (hospitals.some(h => h.username === formData.username)) {
      setError('Username already exists!');
      return;
    }
    // Save new hospital
    hospitals.push({
      username: formData.username,
      password: formData.password,
      hospitalName: formData.name,
      ownership: formData.ownership,
      district: formData.district,
      location: formData.location,
      contactInfo: formData.contactInfo
    });
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
    setSuccess('Hospital registered successfully! You can now log in.');
    setTimeout(() => {
      navigate('/hospital/login');
    }, 1200);
  };



  return (
    <Box sx={{ 
      maxWidth: 600,
      mx: 'auto',
      mt: 4,
      p: 3
    }}>
      <Paper elevation={3}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register Hospital
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Hospital Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Ownership Type"
              name="ownership"
              select
              value={formData.ownership}
              onChange={handleChange}
              margin="normal"
              required
              SelectProps={{
                native: true
              }}
            >
              <option value="">Select ownership type</option>
              <option value="PRIVATE">Private</option>
              <option value="GOVERNMENT">Government</option>
            </TextField>

            <TextField
              fullWidth
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Contact Information"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register Hospital
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default HospitalRegistration;
