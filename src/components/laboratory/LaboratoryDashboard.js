import React, { useState, useEffect } from 'react';
import './styles/LaboratoryStyles.css';

const LaboratoryDashboard = () => {
  // Always start with 'Received Tests' section when component mounts
  const [activeSection, setActiveSection] = useState('received-tests');
  const [receivedTests, setReceivedTests] = useState([]);
  const [testResults, setTestResults] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);

  // Mock data for received tests
  useEffect(() => {
    const mockReceivedTests = [
      {
        id: 'T1',
        testId: 'TEST-001',
        patientName: 'hajis',
        patientId: 'P123',
        testName: 'Complete Blood Count',
        doctor: 'Dr. Sarah Johnson',
        date: '2025-08-12',
        status: 'Done',
        completedDate: '2025-08-12',
        results: {
          'WBC': '7.5',
          'RBC': '5.2',
          'HGB': '15.0',
          'PLT': '250'
        },
        requiredTests: [
          { name: 'WBC', unit: 'cells/uL' },
          { name: 'RBC', unit: 'million/uL' },
          { name: 'HGB', unit: 'g/dL' },
          { name: 'PLT', unit: 'thousand/uL' }
        ]
      },
      {
        id: 'T2',
        testId: 'TEST-002',
        patientName: 'hajis',
        patientId: 'P124',
        testName: 'Blood Sugar Test',
        doctor: 'Dr. Michael Brown',
        date: '2025-08-12',
        status: 'Received',
        requiredTests: [
          { name: 'Fasting', unit: 'mg/dL' },
          { name: 'Postprandial', unit: 'mg/dL' }
        ]
      }
    ];

    setReceivedTests(mockReceivedTests);
  }, []);

  const handleSendResults = (testId) => {
    const test = receivedTests.find(t => t.id === testId);
    if (test) {
      setSelectedTest(test);
      // Initialize results object with empty values
      const initialResults = test.requiredTests.reduce((acc, test) => {
        acc[test.name] = '';
        return acc;
      }, {});
      setTestResults(initialResults);
    }
  };

  const handleSubmitResults = (e) => {
    e.preventDefault();
    if (!selectedTest) return;
    
    // Update the test status and results
    const updatedTests = receivedTests.map(test => {
      if (test.id === selectedTest.id) {
        return {
          ...test,
          status: 'Completed',
          completedDate: new Date().toISOString().split('T')[0],
          results: { ...testResults }
        };
      }
      return test;
    });

    setReceivedTests(updatedTests);
    setSelectedTest(null);
    setTestResults({});
  };

  const handleDeleteTest = (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setReceivedTests(prevTests => prevTests.filter(test => test.id !== testId));
    }
  };

  const handleEditTest = (testId) => {
    const test = receivedTests.find(t => t.id === testId);
    if (test) {
      setSelectedTest(test);
      setTestResults(test.results || {});
      setActiveSection('received-tests');
    }
  };

  const handleSendTest = (testId) => {
    if (window.confirm('Are you sure you want to send these results to the doctor?')) {
      // In a real app, this would send the results to the doctor
      alert('Results have been sent to the doctor.');
      // Update the test status to 'Sent' or similar if needed
      setReceivedTests(prevTests => 
        prevTests.map(test => 
          test.id === testId 
            ? { ...test, status: 'Sent', sentDate: new Date().toISOString().split('T')[0] }
            : test
        )
      );
    }
  };

  const completedTests = receivedTests.filter(test => test.status === 'Completed');
  const pendingTests = receivedTests.filter(test => test.status === 'Received');

  return (
    <div className="laboratory-dashboard">
      <div className="dashboard-header">
        <h1>Laboratory Dashboard</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeSection === 'received-tests' ? 'active' : ''}`}
            onClick={() => setActiveSection('received-tests')}
          >
            Received Tests
          </button>
          <button
            className={`nav-btn ${activeSection === 'sent-results' ? 'active' : ''}`}
            onClick={() => setActiveSection('sent-results')}
          >
            Sent Results
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeSection === 'received-tests' && (
          <div className="received-tests">
            <div className="table-responsive">
              <table className="tests-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No tests received yet.</td>
                    </tr>
                  ) : (
                    pendingTests.map((test) => (
                      <tr key={test.id}>
                        <td>
                          <div className="patient-info">
                            <span className="patient-name">{test.patientName}</span>
                            <span className="patient-id">ID: {test.patientId}</span>
                          </div>
                        </td>
                        <td>{test.testName}</td>
                        <td>{test.date}</td>
                        <td>
                          <span className="status-badge pending">Pending</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-edit"
                              onClick={() => handleSendResults(test.id)}
                              title="Edit Test"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => handleDeleteTest(test.id)}
                              title="Delete Test"
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {selectedTest && (
              <div className="results-form">
                <h3>Enter Test Results for {selectedTest.testName}</h3>
                <form onSubmit={handleSubmitResults}>
                  {selectedTest.requiredTests.map((test) => (
                    <div key={test.name} className="form-group">
                      <label>{test.name} ({test.unit})</label>
                      <input
                        type="text"
                        value={testResults[test.name] || ''}
                        onChange={(e) => {
                          setTestResults(prev => ({
                            ...prev,
                            [test.name]: e.target.value
                          }));
                        }}
                        placeholder={`Enter ${test.name} result`}
                        required
                      />
                    </div>
                  ))}
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setSelectedTest(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Submit Results
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeSection === 'sent-results' && (
          <div className="sent-results">
            <div className="table-responsive">
              <table className="tests-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor ID</th>
                    <th>Result</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No results have been sent yet.</td>
                    </tr>
                  ) : (
                    completedTests.map((test) => (
                      <tr key={test.id}>
                        <td>
                          <div className="patient-info">
                            <span className="patient-name">{test.patientName}</span>
                            <span className="patient-id">ID: {test.patientId}</span>
                          </div>
                        </td>
                        <td>
                          {test.doctor.replace('Dr. ', '')}
                        </td>
                        <td>
                          {test.requiredTests.map((t, idx) => (
                            <div key={idx} className="test-result">
                              <strong>{t.name}:</strong> {test.results?.[t.name] || 'N/A'} 
                              <span className="unit">({t.unit})</span>
                            </div>
                          ))}
                        </td>
                        <td>
                          {new Date(test.completedDate).toLocaleDateString('en-GB')}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-edit"
                              onClick={() => handleEditTest(test.id)}
                              title="Edit Test"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => handleDeleteTest(test.id)}
                              title="Delete Test"
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                            <button 
                              className="btn-send"
                              onClick={() => handleSendTest(test.id)}
                              title="Send Test"
                            >
                              <i className="fas fa-paper-plane"></i> Send
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
