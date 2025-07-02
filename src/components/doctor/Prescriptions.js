import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = React.useState([]);

  // Mock data - replace with actual data from API
  const mockPrescriptions = [
    {
      id: 'PR1',
      patientName: 'John Doe',
      date: '2025-07-02',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'daily' }
      ],
      instructions: 'Take with food, monitor blood pressure'
    },
    {
      id: 'PR2',
      patientName: 'Jane Smith',
      date: '2025-07-01',
      medications: [
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'daily' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'daily' }
      ],
      instructions: 'Take with food, monitor cholesterol levels'
    }
  ];

  React.useEffect(() => {
    // Replace with actual data fetching
    setPrescriptions(mockPrescriptions);
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<Add />}>
          Add New Prescription
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Prescriptions List
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Medications</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>{prescription.patientName}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        {prescription.medications.map((med, index) => (
                          <Typography key={index} sx={{ display: 'block' }}>
                            {med.name} ({med.dosage}, {med.frequency})
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Edit />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<Delete />}
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Prescriptions;
