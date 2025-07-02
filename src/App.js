import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/patient/ProtectedRoute';

// Hospital Components
import HospitalLogin from './components/hospital/HospitalLogin';
import HospitalRegister from './components/hospital/HospitalRegister';
import LaboratoryRegister from './components/hospital/LaboratoryRegister';
import DoctorsList from './components/hospital/DoctorsList';
import LaboratoryList from './components/hospital/LaboratoryList';
import HospitalPortal from './pages/hospital/HospitalPortal';
import HospitalRegistration from './components/hospital/HospitalRegistration';
import HospitalList from './components/hospital/HospitalList';

// Doctor Components
import DoctorLogin from './components/doctor/DoctorLogin';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PatientManagement from './components/doctor/PatientManagement';
import SecondOpinion from './components/doctor/SecondOpinion';
import LabTests from './components/doctor/LabTests';
import PatientDetails from './components/doctor/PatientDetails';

// Laboratory Components
import LaboratoryPortal from './components/laboratory/LaboratoryPortal';

// Patient Components
import PatientPortal from './components/patient/PatientPortal';
import PatientLogin from './components/patient/PatientLogin';
import PatientDashboard from './components/patient/PatientDashboard';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          
          {/* Hospital Routes */}
          <Route path="/hospital" element={<HospitalPortal />} />
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/register" element={<HospitalRegistration />} />
          <Route path="/hospital/list" element={<HospitalList />} />
          <Route path="/hospital/add-doctor" element={<DoctorsList />} />
          <Route path="/hospital/view-doctors" element={<DoctorsList />} />
          <Route path="/hospital/add-lab" element={<LaboratoryRegister />} />
          <Route path="/hospital/view-labs" element={<LaboratoryList />} />
          <Route path="/hospital/view-patients" element={<PatientManagement />} />

          {/* Doctor Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<PatientManagement />} />
          <Route path="/doctor/second-opinion" element={<SecondOpinion />} />
          <Route path="/doctor/lab-tests" element={<LabTests />} />
          <Route path="/doctor/patient/:id" element={<PatientDetails />} />

          {/* Laboratory Routes */}
          <Route path="/laboratory" element={<LaboratoryPortal />} />

          {/* Patient Routes */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient" element={
            <ProtectedRoute>
              <PatientPortal />
            </ProtectedRoute>
          } />
          <Route path="/patient/dashboard" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient/medical-history" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient/prescriptions" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient/lab-results" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient/second-opinion" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
        <p className="copyright"> 2025, All Rights Reserved</p>
      </div>
    </Router>
  );
}