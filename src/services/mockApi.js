import mockData from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockApi = {
  // Doctor authentication
  login: async (doctorId, password) => {
    await delay(1000);
    // Always return success with mock data
    return {
      token: `mock-token-${doctorId}`,
      name: 'Dr. Test User'
    };
  },

  // Get doctor profile
  getProfile: async () => {
    await delay(500);
    const doctorId = localStorage.getItem('doctorId');
    return mockData.doctors.find(d => d.id === doctorId);
  },

  // Update doctor profile
  updateProfile: async (profile) => {
    await delay(500);
    const doctorId = localStorage.getItem('doctorId');
    const doctorIndex = mockData.doctors.findIndex(d => d.id === doctorId);
    if (doctorIndex !== -1) {
      mockData.doctors[doctorIndex] = {
        ...mockData.doctors[doctorIndex],
        ...profile
      };
      return mockData.doctors[doctorIndex];
    }
    throw new Error('Doctor not found');
  },

  // Patient management
  getPatients: async () => {
    await delay(500);
    const doctorId = localStorage.getItem('doctorId');
    return mockData.patients.filter(p => p.doctorId === doctorId);
  },

  addPatient: async (patient) => {
    await delay(500);
    const doctorId = localStorage.getItem('doctorId');
    const newPatient = {
      id: `P${Date.now()}`,
      doctorId,
      ...patient,
      medicalHistory: [],
      labTests: [],
      appointments: []
    };
    mockData.patients.push(newPatient);
    return newPatient;
  },

  // Lab tests
  sendLabTests: async (patientId, tests) => {
    await delay(500);
    const labTest = {
      id: `LT${Date.now()}`,
      patientId,
      testName: tests.join(', '),
      result: 'Pending',
      date: new Date().toISOString().split('T')[0],
      doctorId: localStorage.getItem('doctorId')
    };
    mockData.labTests.push(labTest);
    return labTest;
  },

  getLabTestResults: async (patientId) => {
    await delay(500);
    return mockData.labTests.filter(test => test.patientId === patientId);
  },

  // Second opinion
  getSecondOpinions: async () => {
    await delay(500);
    return mockData.secondOpinions;
  },

  respondToSecondOpinion: async (opinionId, response) => {
    await delay(500);
    const opinionIndex = mockData.secondOpinions.findIndex(o => o.id === opinionId);
    if (opinionIndex !== -1) {
      mockData.secondOpinions[opinionIndex] = {
        ...mockData.secondOpinions[opinionIndex],
        response,
        status: 'Completed'
      };
      return mockData.secondOpinions[opinionIndex];
    }
    throw new Error('Opinion not found');
  }
};

export default {
  ...mockApi,
  // Add any additional mock API functions here
};
