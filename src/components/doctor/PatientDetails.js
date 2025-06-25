import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [clinicalSummary, setClinicalSummary] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    labTests: '',
    nextVisit: ''
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await api.get(`/api/patients/${id}`);
        setPatient(response.data);
      } catch (err) {
        console.error('Error fetching patient details:', err);
      }
    };
    fetchPatientDetails();
  }, [id]);

  const handleUpdateSummary = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/patients/${id}/summary`, clinicalSummary);
      alert('Clinical summary updated successfully');
    } catch (err) {
      console.error('Error updating summary:', err);
    }
  };

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div className="patient-details">
      <h2>Patient Details</h2>
      
      <div className="patient-info">
        <h3>Patient Information</h3>
        <table>
          <tbody>
            <tr>
              <td>Patient ID:</td>
              <td>{patient.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{patient.age}</td>
            </tr>
            <tr>
              <td>Sex:</td>
              <td>{patient.sex}</td>
            </tr>
            <tr>
              <td>Mobile:</td>
              <td>{patient.mobile}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{patient.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="clinical-summary">
        <h3>Clinical Summary</h3>
        <form onSubmit={handleUpdateSummary}>
          <div className="form-group">
            <label>Symptoms:</label>
            <textarea
              value={clinicalSummary.symptoms}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, symptoms: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Diagnosis:</label>
            <textarea
              value={clinicalSummary.diagnosis}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, diagnosis: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Treatment:</label>
            <textarea
              value={clinicalSummary.treatment}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, treatment: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Medications:</label>
            <textarea
              value={clinicalSummary.medications}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, medications: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Lab Tests:</label>
            <textarea
              value={clinicalSummary.labTests}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, labTests: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Next Visit Date:</label>
            <input
              type="date"
              value={clinicalSummary.nextVisit}
              onChange={(e) => 
                setClinicalSummary({ ...clinicalSummary, nextVisit: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Summary
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetails;
