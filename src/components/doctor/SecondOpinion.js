import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DoctorStyles.css';

const SecondOpinion = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const doctorId = localStorage.getItem('doctorId');
    if (!doctorId) {
      navigate('/doctor');
    }
  }, [navigate]);

  // Mock data for second opinion requests
  useEffect(() => {
    const mockRequests = [
      {
        id: 'SO1',
        patientId: 'P123',
        patientName: 'juma ali',
        requestingDoctor: 'Dr. Ngwali',
        medicalHistory: [
          'Hypertension',
          'Diabetes',
          'Asthma'
        ],
        currentMedications: [
          'Metformin - 500mg',
          'Amlodipine - 5mg'
        ],
        dateRequested: '2025-06-22'
      },
      {
        id: 'SO2',
        patientId: 'P124',
        patientName: 'Abu Msa',
        requestingDoctor: 'Dr. Hajis',
        medicalHistory: [
          'Heart Disease',
          'High Cholesterol'
        ],
        currentMedications: [
          'Atorvastatin - 20mg',
          'Aspirin - 81mg'
        ],
        dateRequested: '2025-06-21'
      }
    ];

    setRequests(mockRequests);
  }, []);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleSubmitOpinion = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - in real system would submit to database
      if (!diagnosis || !treatment) {
        throw new Error('Please provide both diagnosis and treatment');
      }

      // Reset form
      setDiagnosis('');
      setTreatment('');
      setSelectedRequest(null);

      // Update UI
      const updatedRequests = requests.map(r => 
        r.id === selectedRequest.id ? { ...r, status: 'Reviewed' } : r
      );
      setRequests(updatedRequests);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="second-opinion">
      <h2>Second Opinion Requests</h2>

      <div className="requests-list">
        {requests.map((request) => (
          <div
            key={request.id}
            className="request-card"
            onClick={() => handleViewRequest(request)}
          >
            <div className="request-info">
              <h3>Patient: {request.patientName}</h3>
              <p><strong>Doctor:</strong> {request.requestingDoctor}</p>
              <p><strong>Date:</strong> {request.dateRequested}</p>
              <p><strong>Status:</strong> {request.status || 'Pending'}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <div className="opinion-form">
          <h3>Medical History</h3>
          <ul>
            {selectedRequest.medicalHistory.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>

          <h3>Current Medications</h3>
          <ul>
            {selectedRequest.currentMedications.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>

          <form onSubmit={handleSubmitOpinion}>
            <div className="form-group">
              <label>Your Diagnosis:</label>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows="4"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Treatment Recommendation:</label>
              <textarea
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                rows="4"
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Opinion'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SecondOpinion;
