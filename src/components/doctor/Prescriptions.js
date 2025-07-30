import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = React.useState([]);

  // Mock data - replace with actual data from API
  const mockPrescriptions = [
    {
      id: 'PR1',
      patientId: 'PID.001',
      patientName: 'John Doe',
      date: '2025-07-02',
      disease: 'Diabetes',
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
        { name: 'Amlodipine', dosage: '5mg', frequency: 'daily' }
      ],
      instructions: 'Take with food, monitor blood pressure'
    },
    {
      id: 'PR2',
      patientId: 'PID.002',
      patientName: 'Jane Smith',
      date: '2025-07-01',
      disease: 'Cholesterol',
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

  // State for modals and form
  const [showModal, setShowModal] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState(null);
  const [form, setForm] = React.useState({
    patientId: '',
    patientName: '',
    date: '',
    disease: '',
    medications: [{ name: '', dosage: '', frequency: '' }],
    instructions: ''
  });

  // Handle form changes
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle medication changes
  const handleMedChange = (idx, e) => {
    const meds = [...form.medications];
    meds[idx][e.target.name] = e.target.value;
    setForm({ ...form, medications: meds });
  };

  // Add or update prescription
  const handleSave = () => {
    if (editIdx !== null) {
      // Update
      setPrescriptions((prev) => prev.map((p, i) => (i === editIdx ? { ...form, id: p.id } : p)));
    } else {
      // Add
      setPrescriptions((prev) => [
        ...prev,
        { ...form, id: 'PR' + (prev.length + 1) }
      ]);
    }
    setShowModal(false);
    setEditIdx(null);
    setForm({ patientName: '', date: '', disease: '', medications: [{ name: '', dosage: '', frequency: '' }], instructions: '' });
  };

  // Edit prescription
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setForm({ ...prescriptions[idx], medications: prescriptions[idx].medications.map(m => ({ ...m })) });
    setShowModal(true);
  };

  // Delete prescription
  const handleDelete = (idx) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== idx));
  };

  // Add medication row
  const handleAddMed = () => {
    setForm((prev) => ({ ...prev, medications: [...prev.medications, { name: '', dosage: '', frequency: '' }] }));
  };

  // Remove medication row
  const handleRemoveMed = (idx) => {
    setForm((prev) => ({ ...prev, medications: prev.medications.filter((_, i) => i !== idx) }));
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setShowModal(true); setEditIdx(null); setForm({ patientName: '', date: '', disease: '', medications: [{ name: '', dosage: '', frequency: '' }], instructions: '' }); }}>
          Add New Prescription
        </Button>
      </Box>

      {/* Modal for Add/Edit Prescription */}
      {showModal && (
        <Box sx={{ position: 'fixed', zIndex: 2000, top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper sx={{ p: 4, width: 400 }}>
            <Typography variant="h6" gutterBottom>{editIdx !== null ? 'Edit' : 'Add'} Prescription</Typography>
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <label>Patient ID</label>
              <input name="patientId" value={form.patientId} onChange={handleFormChange} required style={{ width: '100%', marginBottom: 8 }} />
              <label>Patient Name</label>
              <input name="patientName" value={form.patientName} onChange={handleFormChange} required style={{ width: '100%', marginBottom: 8 }} />
              <label>Date</label>
              <input name="date" type="date" value={form.date} onChange={handleFormChange} required style={{ width: '100%', marginBottom: 8 }} />
              <label>Disease</label>
              <input name="disease" value={form.disease} onChange={handleFormChange} required style={{ width: '100%', marginBottom: 8 }} />
              <label>Medications</label>
              {form.medications.map((med, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <input name="name" placeholder="Name" value={med.name} onChange={e => handleMedChange(idx, e)} required style={{ flex: 1 }} />
                  <input name="dosage" placeholder="Dosage" value={med.dosage} onChange={e => handleMedChange(idx, e)} required style={{ flex: 1 }} />
                  <input name="frequency" placeholder="Frequency" value={med.frequency} onChange={e => handleMedChange(idx, e)} required style={{ flex: 1 }} />
                  {form.medications.length > 1 && <Button onClick={() => handleRemoveMed(idx)} size="small">Remove</Button>}
                </Box>
              ))}
              <Button onClick={handleAddMed} size="small" sx={{ mb: 2 }}>Add Medication</Button>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained">Save</Button>
                <Button onClick={() => setShowModal(false)} variant="outlined">Cancel</Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}

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
                    <TableCell>Patient ID</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Disease</TableCell>
                    <TableCell>Medications</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prescriptions.map((prescription, idx) => (
                    <TableRow key={prescription.id}>
                      <TableCell>{prescription.patientId}</TableCell>
                      <TableCell>{prescription.patientName}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>{prescription.disease}</TableCell>
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
                          onClick={() => handleEdit(idx)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          sx={{ ml: 1 }}
                          onClick={() => handleDelete(idx)}
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
