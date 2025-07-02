import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import hospitalApi from '../../services/hospitalApi';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First get the hospital by username
      const hospitals = await hospitalApi.getAll();
      const hospital = hospitals.find(h => h.user.username === formData.username);
      
      if (!hospital) {
        throw new Error('Invalid username or password');
      }

      // TODO: Implement proper authentication with backend
      // For now, we'll just check if the password matches
      if (hospital.user.password !== formData.password) {
        throw new Error('Invalid username or password');
      }

      // Store hospital data in session
      sessionStorage.setItem('hospitalId', hospital.id);
      sessionStorage.setItem('hospitalName', hospital.name);
      
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/hospital/dashboard';
      navigate(from);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 400,
      mx: 'auto',
      mt: 8,
      p: 3
    }}>
      <Paper elevation={3}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Hospital Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
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
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button
              color="primary"
              component="a"
              href="/hospital/register"
              sx={{ textDecoration: 'none' }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default HospitalLogin;
