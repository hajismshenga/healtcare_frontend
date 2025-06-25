import React, { useState } from 'react';
import api from '../../utils/api';

const LabTests = () => {
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    tests: []
  });
  const [testResults, setTestResults] = useState([]);

  const handleSendTests = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/lab-tests', {
        patientId: patient.id,
        tests: patient.tests
      });
      alert('Lab tests request sent successfully');
    } catch (err) {
      console.error('Error sending lab tests:', err);
    }
  };

  const handleViewResults = async (patientId) => {
    try {
      const response = await api.get(`/api/lab-tests/${patientId}/results`);
      setTestResults(response.data);
    } catch (err) {
      console.error('Error fetching test results:', err);
    }
  };

  return (
    <div className="lab-tests">
      <h2>Lab Tests</h2>

      <div className="send-tests">
        <h3>Send Lab Tests Request</h3>
        <form onSubmit={handleSendTests}>
          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="text"
              value={patient.id}
              onChange={(e) => 
                setPatient({ ...patient, id: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              value={patient.name}
              onChange={(e) => 
                setPatient({ ...patient, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Tests Required:</label>
            <textarea
              value={patient.tests.join('\n')}
              onChange={(e) => 
                setPatient({ 
                  ...patient, 
                  tests: e.target.value.split('\n').filter(Boolean) 
                })
              }
              placeholder="Enter tests one per line"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Tests Request
          </button>
        </form>
      </div>

      <div className="view-results">
        <h3>View Test Results</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Patient ID"
            onChange={(e) => handleViewResults(e.target.value)}
          />
        </div>
        {testResults.length > 0 && (
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.testName}</td>
                    <td>{result.result}</td>
                    <td>{result.referenceRange}</td>
                    <td>{result.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTests;
