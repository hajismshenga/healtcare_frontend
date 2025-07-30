const API_CONFIG = {
  DOCTORS: [
    { id: 'D001', name: 'Dr. John Smith', specialization: 'General Physician' },
    { id: 'D002', name: 'Dr. Sarah Johnson', specialization: 'Pediatrician' }
  ],
  LABORATORIES: [
    { id: 'L001', name: 'Central Lab', location: 'Main Hospital' },
    { id: 'L002', name: 'Specialized Lab', location: 'Special Care Unit' }
  ],
  DOCTOR: {
    LOGIN: 'login',
    PROFILE: 'profile',
    PATIENTS: 'patients',
    PATIENT: 'patient/:id',
    LAB_TESTS: 'lab-tests',
    SECOND_OPINION: 'second-opinion'
  }
};

// Mock API endpoints
const mockApi = {
  login: async (doctorId, password) => {
    const doctor = API_CONFIG.DOCTORS.find(d => d.id === doctorId);
    if (doctor && password === '123456') {
      return {
        token: `mock-token-${doctorId}`,
        name: doctor.name
      };
    }
    throw new Error('Invalid credentials');
  },

  getProfile: async () => {
    const doctorId = localStorage.getItem('doctorId');
    return API_CONFIG.DOCTORS.find(d => d.id === doctorId);
  }
};

export { API_CONFIG, mockApi };

export default API_CONFIG;
