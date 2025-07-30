import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Skip credential validation: allow login for any credentials
      sessionStorage.setItem('hospitalId', formData.username);
      sessionStorage.setItem('hospitalName', formData.username);
      const from = location.state?.from?.pathname || '/hospital/dashboard';
      navigate(from);
      setLoading(false);
    }, 800);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
      <Paper elevation={3}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Hospital Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
            <a href="/hospital/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default HospitalLogin;
