import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LaboratoryStyles.css';

const LaboratoryDashboard = () => {
  const [activeSection, setActiveSection] = useState('pending-tests');
  const [pendingTests, setPendingTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [testResults, setTestResults] = useState({});
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const labToken = localStorage.getItem('labToken');
    if (!labToken) {
      navigate('/laboratory');
    }
  }, [navigate]);

  // Mock data for tests
  useEffect(() => {
    const mockPendingTests = [
      {
        id: 'T1',
        patientId: 'P123',
        testName: 'Complete Blood Count',
        doctor: 'Dr. John Smith',
        date: '2025-06-22',
        status: 'Pending',
        requiredTests: [
          { name: 'WBC', unit: 'cells/uL' },
          { name: 'RBC', unit: 'million/uL' },
          { name: 'HGB', unit: 'g/dL' },
          { name: 'PLT', unit: 'thousand/uL' }
        ]
      },
      {
        id: 'T2',
        patientId: 'P124',
        testName: 'Blood Sugar Test',
        doctor: 'Dr. Sarah Johnson',
        date: '2025-06-22',
        status: 'Pending',
        requiredTests: [
          { name: 'Fasting', unit: 'mg/dL' },
          { name: 'Postprandial', unit: 'mg/dL' }
        ]
      }
    ];

    const mockCompletedTests = [
      {
        id: 'T3',
        patientId: 'P125',
        testName: 'Cholesterol Test',
        doctor: 'Dr. John Smith',
        date: '2025-06-21',
        status: 'Completed',
        results: {
          totalCholesterol: '200 mg/dL',
          hdl: '60 mg/dL',
          ldl: '120 mg/dL',
          triglycerides: '150 mg/dL'
        },
        referenceRanges: {
          totalCholesterol: '100-200 mg/dL',
          hdl: '40-60 mg/dL',
          ldl: '0-130 mg/dL',
          triglycerides: '0-150 mg/dL'
        }
      }
    ];

    setPendingTests(mockPendingTests);
    setCompletedTests(mockCompletedTests);
  }, []);

  const handleTestComplete = (testId) => {
    const test = pendingTests.find(t => t.id === testId);
    if (test) {
      const updatedTests = pendingTests.filter(t => t.id !== testId);
      setPendingTests(updatedTests);
      
      // Show results form
      setTestResults(test.requiredTests.reduce((acc, test) => {
        acc[test.name] = '';
        return acc;
      }, {}));
    }
  };

  const handleSaveResults = (testId) => {
    const test = pendingTests.find(t => t.id === testId);
    if (test) {
      const completedTest = {
        ...test,
        status: 'Completed',
        results: testResults,
        referenceRanges: test.requiredTests.reduce((acc, test) => {
          acc[test.name] = 'Normal Range'; // In real system, this would be based on test type
          return acc;
        }, {})
      };
      
      setCompletedTests([...completedTests, completedTest]);
      setTestResults({});
    }
  };

  return (
    <div className="laboratory-dashboard">
      <div className="dashboard-header">
        <h1>Laboratory Dashboard</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeSection === 'pending-tests' ? 'active' : ''}`}
            onClick={() => setActiveSection('pending-tests')}
          >
            Pending Tests
          </button>
          <button
            className={`nav-btn ${activeSection === 'completed-tests' ? 'active' : ''}`}
            onClick={() => setActiveSection('completed-tests')}
          >
            Completed Tests
          </button>
          <button
            className={`nav-btn ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSection('reports')}
          >
            Test Reports
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeSection === 'pending-tests' && (
          <div className="pending-tests">
            <h2>Pending Tests</h2>
            <div className="tests-list">
              {pendingTests.map((test) => (
                <div key={test.id} className="test-card">
                  <div className="test-info">
                    <h3>Test: {test.testName}</h3>
                    <p><strong>Patient ID:</strong> {test.patientId}</p>
                    <p><strong>Doctor:</strong> {test.doctor}</p>
                    <p><strong>Date:</strong> {test.date}</p>
                    <p><strong>Required Tests:</strong></p>
                    <ul>
                      {test.requiredTests.map((t, index) => (
                        <li key={index}>{t.name} ({t.unit})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="test-actions">
                    <button
                      className="btn-primary"
                      onClick={() => handleTestComplete(test.id)}
                    >
                      Complete Test
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(testResults).length > 0 && (
              <div className="results-form">
                <h3>Enter Test Results</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveResults(Object.keys(testResults)[0]);
                }}>
                  {Object.entries(testResults).map(([testName, value]) => (
                    <div key={testName} className="form-group">
                      <label>{testName}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setTestResults(prev => ({
                            ...prev,
                            [testName]: e.target.value
                          }));
                        }}
                        required
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn-primary">
                    Save Results
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeSection === 'completed-tests' && (
          <div className="completed-tests">
            <h2>Completed Tests</h2>
            <div className="tests-list">
              {completedTests.map((test) => (
                <div key={test.id} className="test-card">
                  <div className="test-info">
                    <h3>Test: {test.testName}</h3>
                    <p><strong>Patient ID:</strong> {test.patientId}</p>
                    <p><strong>Doctor:</strong> {test.doctor}</p>
                    <p><strong>Date:</strong> {test.date}</p>
                    <p><strong>Results:</strong></p>
                    {Object.entries(test.results).map(([key, value]) => (
                      <div key={key} className="result-item">
                        <p>{key}: {value}</p>
                        <p className="reference-range">
                          Reference: {test.referenceRanges[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'reports' && (
          <div className="test-reports">
            <h2>Test Reports</h2>
            <div className="reports-list">
              {completedTests.map((test) => (
                <div key={test.id} className="report-card">
                  <div className="report-header">
                    <h3>Test Report</h3>
                    <p><strong>Patient ID:</strong> {test.patientId}</p>
                    <p><strong>Date:</strong> {test.date}</p>
                  </div>
                  <div className="report-content">
                    <h4>Test Details</h4>
                    <p><strong>Test Name:</strong> {test.testName}</p>
                    <p><strong>Doctor:</strong> {test.doctor}</p>
                    
                    <h4>Results</h4>
                    {Object.entries(test.results).map(([key, value]) => (
                      <div key={key} className="result-item">
                        <p><strong>{key}:</strong> {value}</p>
                        <p className="reference-range">
                          Reference: {test.referenceRanges[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="report-actions">
                    <button className="btn-secondary">
                      Print Report
                    </button>
                    <button className="btn-secondary">
                      Export PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
