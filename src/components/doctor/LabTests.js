import React, { useState } from "react";
import "./LabTests.css";
import api from '../../utils/api';

const LabTests = () => {
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    tests: []
  });
  const [labId, setLabId] = useState('');
  // Mock test results data
  const [testResults, setTestResults] = useState([
    // Example initial result
    // { testName: 'CBC', result: 'Normal', referenceRange: '4.5-11', comments: 'OK', sent: false }
  ]);
  const [newResultCount, setNewResultCount] = useState(1);


  // Send test request to lab (mock)
  const handleSendTests = (e) => {
    e.preventDefault();
    alert('Lab tests request sent to lab (mock).');
    setPatient({ id: '', name: '', tests: [] });
  };

  // Simulate receiving a result from lab (mock)


  // For file input
  const [receiveFile, setReceiveFile] = useState(null);

  // For patient ID input per result
  const [patientIds, setPatientIds] = useState({});

  // Mark result as sent to patient
  const handleSendToPatient = (idx) => {
    const updated = [...testResults];
    updated[idx].sent = true;
    updated[idx].result = 'Sent to patient';
    setTestResults(updated);
  };

  // Edit a field in a result row
  const handleEditResult = (index, field, value) => {
    setTestResults(prevResults => {
      const updated = [...prevResults];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Delete a row
  const handleDeleteResult = (index) => {
    setTestResults(prevResults => prevResults.filter((_, i) => i !== index));
    setPatientIds(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };


  // View results by patient ID (mock, just filters for now)
  const handleViewResults = (patientId) => {
    // In real app, fetch results for patientId
    // Here, just show all
  };


  return (
    <div className="lab-tests">
      <h2>Lab Tests</h2>

      <div className="send-tests">
        <h3>Send Lab Test to Lab</h3>
        <form onSubmit={handleSendTests} style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label>Lab ID:</label>
            <input
              type="text"
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
              required
            />
          </div>
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
            <label>Test Requirement:</label>
            <textarea
              value={patient.tests.join('\n')}
              onChange={(e) => 
                setPatient({ 
                  ...patient, 
                  tests: e.target.value.split('\n').filter(Boolean) 
                })
              }
              placeholder="Enter test requirements, one per line"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Tests Request to Lab
          </button>
        </form>
      </div>

      <div className="view-results">
        <h3>Receive Result from Lab</h3>

        {testResults.length > 0 ? (
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Lab Name</th>
                  <th>Patient Name</th>
                  <th>From Lab</th>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                  <th>Comments</th>
                  <th>Document</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.labName || '-'}</td>
                    <td>{result.patientName || '-'}</td>
                    <td>{result.fromLab || '-'}</td>
                    <td>{result.testName}</td>
                    <td>{result.result}</td>
                    <td>{result.referenceRange}</td>
                    <td>{result.comments}</td>
                    <td>{result.document ? result.document : <span style={{ color: '#888' }}>None</span>}</td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDeleteResult(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ color: '#888', marginTop: 12 }}>No lab results received yet.</div>
        )}
        <h3 style={{ marginTop: 32 }}>Send Result to Patient</h3>
        {testResults.length > 0 ? (
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                  <th>Comments</th>
                  <th>Document</th>
                  <th>Patient ID</th>
                  <th>Send</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.testName}</td>
                    <td>{result.result}</td>
                    <td>{result.referenceRange}</td>
                    <td>{result.comments}</td>
                    <td>{result.document ? result.document : <span style={{ color: '#888' }}>None</span>}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter Patient ID"
                        value={patientIds[index] || ''}
                        onChange={e => setPatientIds({ ...patientIds, [index]: e.target.value })}
                        disabled={result.sent}
                        style={{ width: 120 }}
                      />
                    </td>
                    <td>
                      {result.sent ? (
                        <span style={{ color: 'green', fontWeight: 600 }}>Sent</span>
                      ) : (
                        <button
                          className="btn-primary"
                          onClick={() => {
                            if (patientIds[index]) {
                              handleSendToPatient(index);
                            } else {
                              alert('Please enter a Patient ID.');
                            }
                          }}
                        >
                          Send to Patient
                        </button>
                      )}
                      <button className="btn-danger" style={{ marginLeft: 8 }} onClick={() => handleDeleteResult(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LabTests;
