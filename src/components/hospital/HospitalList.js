import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Button,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// Backend dependency removed. Using mock data below instead.

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = () => {
    // Mock hospital data
    const mockData = [
      { id: 1, name: 'City Hospital', ownership: 'Private', district: 'Central', location: 'Downtown' },
      { id: 2, name: 'General Hospital', ownership: 'Public', district: 'West', location: 'Westside' },
      { id: 3, name: 'Community Hospital', ownership: 'NGO', district: 'East', location: 'East End' },
    ];
    setHospitals(mockData);
    setLoading(false);
  };


  const handleView = (hospitalId) => {
    // Implement hospital details view
    console.log('Viewing hospital:', hospitalId);
  };

  if (loading) {
    return <Typography>Loading hospitals...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hospital List
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hospital ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ownership</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.hospitalId}</TableCell>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.ownership}</TableCell>
                <TableCell>{hospital.district}</TableCell>
                <TableCell>{hospital.location}</TableCell>
                <TableCell>{hospital.contactInfo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(hospital.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HospitalList;
