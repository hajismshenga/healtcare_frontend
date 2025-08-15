import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminStyles.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data for demonstration
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'City General Hospital', location: 'Downtown', capacity: 500, status: 'active' },
    { id: 2, name: 'Community Medical Center', location: 'Suburbs', capacity: 300, status: 'active' },
    { id: 3, name: 'Regional Health Institute', location: 'North District', capacity: 400, status: 'active' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', hospital: 'City General Hospital', status: 'active' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', hospital: 'Community Medical Center', status: 'active' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', hospital: 'Regional Health Institute', status: 'suspended' }
  ]);

  const [laboratories, setLaboratories] = useState([
    { id: 1, name: 'Central Lab Services', location: 'Downtown', services: 'Blood Tests, X-Ray', status: 'active' },
    { id: 2, name: 'Advanced Diagnostics', location: 'Medical District', services: 'MRI, CT Scan', status: 'active' },
    { id: 3, name: 'Quick Test Lab', location: 'Suburbs', services: 'Rapid Tests', status: 'active' }
  ]);

  const [patients, setPatients] = useState([
    { id: 'P001', name: 'John Smith', age: 45, disease: 'Diabetes', admissionDate: '2024-01-15', status: 'active', hospitalsVisited: ['City General Hospital'] },
    { id: 'P002', name: 'Mary Johnson', age: 32, disease: 'Hypertension', admissionDate: '2024-01-20', status: 'active', hospitalsVisited: ['Community Medical Center'] },
    { id: 'P003', name: 'Robert Wilson', age: 58, disease: 'Diabetes', admissionDate: '2024-02-01', status: 'active', hospitalsVisited: ['Regional Health Institute', 'City General Hospital'] },
    { id: 'P004', name: 'Lisa Brown', age: 29, disease: 'Asthma', admissionDate: '2024-02-05', status: 'active', hospitalsVisited: ['Community Medical Center'] },
    { id: 'P005', name: 'David Lee', age: 41, disease: 'Hypertension', admissionDate: '2024-02-10', status: 'active', hospitalsVisited: ['City General Hospital'] }
  ]);

  const [diseaseStats, setDiseaseStats] = useState([
    { disease: 'Diabetes', count: 45, dateRange: '2024-01-01 to 2024-02-29' },
    { disease: 'Hypertension', count: 38, dateRange: '2024-01-01 to 2024-02-29' },
    { disease: 'Asthma', count: 22, dateRange: '2024-01-01 to 2024-02-29' },
    { disease: 'Heart Disease', count: 15, dateRange: '2024-01-01 to 2024-02-29' }
  ]);

  // Form states for registration
  const [newHospital, setNewHospital] = useState({ name: '', location: '', capacity: '' });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', hospital: '' });
  const [newLaboratory, setNewLaboratory] = useState({ name: '', location: '', services: '' });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleRegisterHospital = (e) => {
    e.preventDefault();
    const hospital = {
      id: hospitals.length + 1,
      ...newHospital,
      capacity: parseInt(newHospital.capacity),
      status: 'active'
    };
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', location: '', capacity: '' });
  };

  const handleRegisterDoctor = (e) => {
    e.preventDefault();
    const doctor = {
      id: doctors.length + 1,
      ...newDoctor,
      status: 'active'
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: '', specialty: '', hospital: '' });
  };

  const handleRegisterLaboratory = (e) => {
    e.preventDefault();
    const laboratory = {
      id: laboratories.length + 1,
      ...newLaboratory,
      status: 'active'
    };
    setLaboratories([...laboratories, laboratory]);
    setNewLaboratory({ name: '', location: '', services: '' });
  };

  const handleUserAction = (type, id, action) => {
    if (type === 'doctor') {
      setDoctors(doctors.map(doc => 
        doc.id === id ? { ...doc, status: action === 'delete' ? 'deleted' : action } : doc
      ));
    } else if (type === 'hospital') {
      setHospitals(hospitals.map(hosp => 
        hosp.id === id ? { ...hosp, status: action === 'delete' ? 'deleted' : action } : hosp
      ));
    } else if (type === 'laboratory') {
      setLaboratories(laboratories.map(lab => 
        lab.id === id ? { ...lab, status: action === 'delete' ? 'deleted' : action } : lab
      ));
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDiseaseStats = diseaseStats.filter(stat =>
    stat.disease.toLowerCase().includes(diseaseFilter.toLowerCase())
  );

  const calculateDiseaseCount = () => {
    if (!dateRange.start || !dateRange.end) return diseaseStats;
    
    return patients.filter(patient => {
      const admissionDate = new Date(patient.admissionDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return admissionDate >= startDate && admissionDate <= endDate;
    }).reduce((acc, patient) => {
      const existing = acc.find(item => item.disease === patient.disease);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ disease: patient.disease, count: 1, dateRange: `${dateRange.start} to ${dateRange.end}` });
      }
      return acc;
    }, []);
  };

  // Reports: CSV and PDF generators (client-side, simple)
  const generateCSV = (rows, headers) => {
    const csvContent = [headers.join(','), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePDF = (textLines) => {
    const content = textLines.join('\n');
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_report.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const buildPatientReportData = () => {
    // Aggregate: disease -> {count, dates, hospitals}
    const map = new Map();
    patients.forEach(p => {
      const key = p.disease;
      if (!map.has(key)) {
        map.set(key, { disease: key, count: 0, treatmentDates: new Set(), hospitalsVisited: new Set() });
      }
      const entry = map.get(key);
      entry.count += 1;
      entry.treatmentDates.add(p.admissionDate);
      (p.hospitalsVisited || []).forEach(h => entry.hospitalsVisited.add(h));
    });
    return Array.from(map.values()).map(v => ({
      disease: v.disease,
      count: v.count,
      treatmentDates: Array.from(v.treatmentDates).sort().join(' | '),
      hospitalsVisited: Array.from(v.hospitalsVisited).sort().join(' | ')
    }));
  };

  const handleExportCSV = () => {
    const rows = buildPatientReportData();
    generateCSV(rows, ['disease', 'count', 'treatmentDates', 'hospitalsVisited']);
  };

  const handleExportPDF = () => {
    const rows = buildPatientReportData();
    const lines = ['Patient Report', '----------------', '', ...rows.map(r => `Disease: ${r.disease}\nCount: ${r.count}\nDates: ${r.treatmentDates}\nHospitals: ${r.hospitalsVisited}\n`)];
    generatePDF(lines);
  };

  // Simple chart helpers (SVG)
  const getMonthlyCounts = () => {
    const counts = Array(12).fill(0);
    patients.forEach(p => {
      const d = new Date(p.admissionDate);
      counts[d.getMonth()] += 1;
    });
    return counts;
  };

  const getDiseaseDistribution = () => {
    const map = new Map();
    patients.forEach(p => map.set(p.disease, (map.get(p.disease) || 0) + 1));
    return Array.from(map.entries()).map(([disease, count]) => ({ disease, count }));
  };

  const getMonthlyTrendPoints = () => {
    const counts = getMonthlyCounts();
    return counts.map((c, i) => ({ x: i, y: c }));
  };

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const renderCharts = () => {
    const pieData = getDiseaseDistribution();
    const barData = getMonthlyCounts();
    const lineData = getMonthlyTrendPoints();

    // Pie chart geometry
    const total = pieData.reduce((s, d) => s + d.count, 0) || 1;
    let angleAcc = 0;
    const pieColors = ['#3b82f6','#22c55e','#ef4444','#f59e0b','#8b5cf6','#06b6d4'];

    const pieSegments = pieData.map((d, idx) => {
      const angle = (d.count / total) * Math.PI * 2;
      const x1 = 100 + 80 * Math.cos(angleAcc);
      const y1 = 100 + 80 * Math.sin(angleAcc);
      angleAcc += angle;
      const x2 = 100 + 80 * Math.cos(angleAcc);
      const y2 = 100 + 80 * Math.sin(angleAcc);
      const largeArc = angle > Math.PI ? 1 : 0;
      const path = `M100,100 L${x1},${y1} A80,80 0 ${largeArc} 1 ${x2},${y2} Z`;
      return <path key={idx} d={path} fill={pieColors[idx % pieColors.length]} />;
    });

    // Bar chart geometry
    const maxBar = Math.max(...barData, 1);
    const bars = barData.map((v, i) => {
      const height = (v / maxBar) * 120;
      const x = 30 + i * 25;
      const y = 160 - height;
      return <rect key={i} x={x} y={y} width={18} height={height} fill="#3b82f6" rx="3" />;
    });

    // Line chart geometry
    const maxLine = Math.max(...lineData.map(p => p.y), 1);
    const points = lineData.map((p, i) => {
      const x = 20 + i * 25;
      const y = 160 - (p.y / maxLine) * 120;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Disease Distribution (Pie)</h4>
          <svg viewBox="0 0 200 200">{pieSegments}</svg>
          <div className="chart-legend">
            {pieData.map((d, i) => (
              <div key={i} className="legend-item"><span style={{background: pieColors[i % pieColors.length]}} />{d.disease} ({d.count})</div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h4>Patients per Month (Bar)</h4>
          <svg viewBox="0 0 340 180">
            <line x1="20" y1="160" x2="320" y2="160" stroke="#e5e7eb" />
            {bars}
            {monthLabels.map((m,i)=> <text key={i} x={30 + i*25} y={175} fontSize="8" textAnchor="middle" fill="#6b7280">{m}</text>)}
          </svg>
        </div>
        <div className="chart-card">
          <h4>Trend over Time (Line)</h4>
          <svg viewBox="0 0 340 180">
            <polyline fill="none" stroke="#22c55e" strokeWidth="2" points={points} />
            {monthLabels.map((m,i)=> <text key={i} x={20 + i*25} y={175} fontSize="8" textAnchor="middle" fill="#6b7280">{m}</text>)}
          </svg>
        </div>
      </div>
    );
  };

  const renderChartsTab = () => (
    <div className="admin-charts">
      {renderCharts()}
    </div>
  );

  const renderReports = () => {
    const rows = buildPatientReportData();
    return (
      <div className="admin-reports">
        <div className="reports-header">
          <h3>Patient Reports</h3>
          <div className="report-actions">
            <button className="action-btn" onClick={handleExportCSV}>Export CSV</button>
            <button className="action-btn" onClick={handleExportPDF}>Export PDF</button>
          </div>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Disease</th>
                <th>Number of Patients</th>
                <th>Treatment Dates</th>
                <th>Hospitals Visited</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.disease}</td>
                  <td>{r.count}</td>
                  <td>{r.treatmentDates}</td>
                  <td>{r.hospitalsVisited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDirectory = () => {
    const allUsers = [
      ...doctors.map(d => ({ id: `D${d.id}`, name: d.name, role: 'Doctor' })),
      ...patients.map(p => ({ id: p.id, name: p.name, role: 'Patient' })),
      ...laboratories.map(l => ({ id: `L${l.id}`, name: l.name, role: 'Laboratory' })),
      ...hospitals.map(h => ({ id: `H${h.id}`, name: h.name, role: 'Hospital' })),
    ];
    return (
      <div className="admin-directory">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{allUsers.length}</h3>
              <p>All Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-content">
              <h3>{doctors.length}</h3>
              <p>Doctors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <h3>{patients.length}</h3>
              <p>Patients</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔬</div>
            <div className="stat-content">
              <h3>{laboratories.length}</h3>
              <p>Laboratories</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-content">
              <h3>{hospitals.length}</h3>
              <p>Hospitals</p>
            </div>
          </div>
        </div>
        
        <div className="user-table" style={{marginTop: '16px'}}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u, i) => (
                <tr key={i}>
                  <td className="number-cell">{i + 1}</td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLocations = () => {
    const userLocations = [
      ...patients.map(p => ({ name: p.name, type: 'Patient', location: (p.hospitalsVisited && p.hospitalsVisited[0]) || 'Unknown' })),
      ...doctors.map(d => ({ name: d.name, type: 'Doctor', location: d.hospital })),
      ...laboratories.map(l => ({ name: l.name, type: 'Laboratory', location: l.location })),
      ...hospitals.map(h => ({ name: h.name, type: 'Hospital', location: h.location })),
    ];
    return (
      <div className="admin-locations">
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {userLocations.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.type}</td>
                  <td>{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    const activeHospitals = hospitals.filter(h => h.status === 'active').length;
    const activeDoctors = doctors.filter(d => d.status === 'active').length;
    const activeLabs = laboratories.filter(l => l.status === 'active').length;
    const activePatients = patients.filter(p => p.status === 'active').length;
    
    return (
      <div className="admin-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-content">
              <h3>{activeHospitals}</h3>
              <p>Active Hospitals</p>
              <div className="count-range">1 - {activeHospitals}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-content">
              <h3>{activeDoctors}</h3>
              <p>Active Doctors</p>
              <div className="count-range">1 - {activeDoctors}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔬</div>
            <div className="stat-content">
              <h3>{activeLabs}</h3>
              <p>Active Laboratories</p>
              <div className="count-range">1 - {activeLabs}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <h3>{activePatients}</h3>
              <p>Active Patients</p>
              <div className="count-range">1 - {activePatients}</div>
            </div>
          </div>
        </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => setActiveTab('registration')} className="action-btn">
            Register New Entity
          </button>
          <button onClick={() => setActiveTab('user-management')} className="action-btn">
            Manage Users
          </button>
          <button onClick={() => setActiveTab('patient-records')} className="action-btn">
            View Patient Records
          </button>
          <button onClick={() => setActiveTab('disease-stats')} className="action-btn">
            Disease Statistics
          </button>
        </div>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="admin-registration">
      <div className="registration-section">
        <h3>Register Hospital</h3>
        <form onSubmit={handleRegisterHospital} className="registration-form">
          <input
            type="text"
            placeholder="Hospital Name"
            value={newHospital.name}
            onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newHospital.location}
            onChange={(e) => setNewHospital({...newHospital, location: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newHospital.capacity}
            onChange={(e) => setNewHospital({...newHospital, capacity: e.target.value})}
            required
          />
          <button type="submit" className="register-btn">Register Hospital</button>
        </form>
      </div>

      <div className="registration-section">
        <h3>Register Doctor</h3>
        <form onSubmit={handleRegisterDoctor} className="registration-form">
          <input
            type="text"
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Specialty"
            value={newDoctor.specialty}
            onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
            required
          />
          <select
            value={newDoctor.hospital}
            onChange={(e) => setNewDoctor({...newDoctor, hospital: e.target.value})}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.filter(h => h.status === 'active').map(hospital => (
              <option key={hospital.id} value={hospital.name}>{hospital.name}</option>
            ))}
          </select>
          <button type="submit" className="register-btn">Register Doctor</button>
        </form>
      </div>

      <div className="registration-section">
        <h3>Register Laboratory</h3>
        <form onSubmit={handleRegisterLaboratory} className="registration-form">
          <input
            type="text"
            placeholder="Laboratory Name"
            value={newLaboratory.name}
            onChange={(e) => setNewLaboratory({...newLaboratory, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newLaboratory.location}
            onChange={(e) => setNewLaboratory({...newLaboratory, location: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Services (comma separated)"
            value={newLaboratory.services}
            onChange={(e) => setNewLaboratory({...newLaboratory, services: e.target.value})}
            required
          />
          <button type="submit" className="register-btn">Register Laboratory</button>
        </form>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="admin-user-management">
      <div className="management-section">
        <h3>Hospital Management</h3>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map(hospital => (
                <tr key={hospital.id}>
                  <td>{hospital.id}</td>
                  <td>{hospital.name}</td>
                  <td>{hospital.location}</td>
                  <td>{hospital.capacity}</td>
                  <td><span className={`status-badge ${hospital.status}`}>{hospital.status}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleUserAction('hospital', hospital.id, 'edit')} className="edit-btn">Edit</button>
                      <button onClick={() => handleUserAction('hospital', hospital.id, 'suspend')} className="suspend-btn">Suspend</button>
                      <button onClick={() => handleUserAction('hospital', hospital.id, 'delete')} className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="management-section">
        <h3>Doctor Management</h3>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Hospital</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.hospital}</td>
                  <td><span className={`status-badge ${doctor.status}`}>{doctor.status}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleUserAction('doctor', doctor.id, 'edit')} className="edit-btn">Edit</button>
                      <button onClick={() => handleUserAction('doctor', doctor.id, 'suspend')} className="suspend-btn">Suspend</button>
                      <button onClick={() => handleUserAction('doctor', doctor.id, 'delete')} className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="management-section">
        <h3>Laboratory Management</h3>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Services</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {laboratories.map(laboratory => (
                <tr key={laboratory.id}>
                  <td>{laboratory.id}</td>
                  <td>{laboratory.name}</td>
                  <td>{laboratory.location}</td>
                  <td>{laboratory.services}</td>
                  <td><span className={`status-badge ${laboratory.status}`}>{laboratory.status}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleUserAction('laboratory', laboratory.id, 'edit')} className="edit-btn">Edit</button>
                      <button onClick={() => handleUserAction('laboratory', laboratory.id, 'suspend')} className="suspend-btn">Suspend</button>
                      <button onClick={() => handleUserAction('laboratory', laboratory.id, 'delete')} className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPatientRecords = () => (
    <div className="admin-patient-records">
      <div className="search-section">
        <h3>Patient Records Search</h3>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="patient-table">
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Disease</th>
              <th>Admission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.disease}</td>
                <td>{patient.admissionDate}</td>
                <td><span className={`status-badge ${patient.status}`}>{patient.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDiseaseStats = () => (
    <div className="admin-disease-stats">
      <div className="stats-controls">
        <h3>Disease Statistics</h3>
        <div className="date-range-filter">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            placeholder="Start Date"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            placeholder="End Date"
          />
          <input
            type="text"
            placeholder="Filter by disease..."
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="disease-stats-table">
        <table>
          <thead>
            <tr>
              <th>Disease</th>
              <th>Patient Count</th>
              <th>Date Range</th>
            </tr>
          </thead>
          <tbody>
            {(dateRange.start && dateRange.end ? calculateDiseaseCount() : filteredDiseaseStats).map((stat, index) => (
              <tr key={index}>
                <td>{stat.disease}</td>
                <td>{stat.count}</td>
                <td>{stat.dateRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Portal</h2>
          <p>Healthcare Management</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'registration' ? 'active' : ''}`}
            onClick={() => setActiveTab('registration')}
          >
            ➕ Registration
          </button>
          <button 
            className={`nav-item ${activeTab === 'user-management' ? 'active' : ''}`}
            onClick={() => setActiveTab('user-management')}
          >
            👥 User Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'patient-records' ? 'active' : ''}`}
            onClick={() => setActiveTab('patient-records')}
          >
            📋 Patient Records
          </button>
          <button 
            className={`nav-item ${activeTab === 'disease-stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('disease-stats')}
          >
            📈 Disease Statistics
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            🧾 Reports
          </button>
          <button 
            className={`nav-item ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => setActiveTab('charts')}
          >
            📊 Charts
          </button>
          <button 
            className={`nav-item ${activeTab === 'directory' ? 'active' : ''}`}
            onClick={() => setActiveTab('directory')}
          >
            📚 Directory
          </button>
          <button 
            className={`nav-item ${activeTab === 'locations' ? 'active' : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            📍 Locations
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="main-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h1>
        </div>

        <div className="main-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'registration' && renderRegistration()}
          {activeTab === 'user-management' && renderUserManagement()}
          {activeTab === 'patient-records' && renderPatientRecords()}
          {activeTab === 'disease-stats' && renderDiseaseStats()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'charts' && renderChartsTab()}
          {activeTab === 'directory' && renderDirectory()}
          {activeTab === 'locations' && renderLocations()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
