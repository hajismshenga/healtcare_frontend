import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const PatientService = {
  // Get all patients
  getAllPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get patient by ID
  getPatientById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/patients/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new patient
  addPatient: async (patientData) => {
    try {
      const response = await axios.post(`${API_URL}/patients`, patientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update patient
  updatePatient: async (id, patientData) => {
    try {
      const response = await axios.put(`${API_URL}/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete patient
  deletePatient: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/patients/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search patients
  searchPatients: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/patients/search?query=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
