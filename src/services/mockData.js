const mockData = {
  // Mock doctors data
  doctors: [
    {
      id: 'D001',
      name: 'Dr. John Smith',
      specialization: 'General Physician',
      username: 'drjohn',
      password: '123456',
      profilePicture: 'https://via.placeholder.com/150'
    },
    {
      id: 'D002',
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrician',
      username: 'drsarah',
      password: '123456',
      profilePicture: 'https://via.placeholder.com/150'
    }
  ],

  // Mock patients data
  patients: [
    {
      id: 'P001',
      name: 'John Doe',
      age: 35,
      sex: 'male',
      mobile: '+255712345678',
      address: 'Dar es Salaam',
      doctorId: 'D001',
      medicalHistory: [],
      labTests: [],
      appointments: []
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 28,
      sex: 'female',
      mobile: '+255789012345',
      address: 'Arusha',
      doctorId: 'D002',
      medicalHistory: [],
      labTests: [],
      appointments: []
    }
  ],

  // Mock lab tests data
  labTests: [
    {
      id: 'LT001',
      patientId: 'P001',
      testName: 'Blood Test',
      result: 'Pending',
      date: '2025-06-22',
      doctorId: 'D001'
    }
  ],

  // Mock second opinion requests
  secondOpinions: [
    {
      id: 'SO001',
      patientId: 'P001',
      patientName: 'John Doe',
      condition: 'High Fever',
      requestingDoctorId: 'D001',
      status: 'Pending',
      date: '2025-06-22'
    }
  ]
};

export default mockData;
