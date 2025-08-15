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
import HospitalDashboard from './components/hospital/HospitalDashboard';
import LaboratoryRegister from './components/hospital/LaboratoryRegister';
import DoctorsList from './components/hospital/DoctorsList';
import LaboratoryList from './components/hospital/LaboratoryList';
import HospitalPortal from './pages/hospital/HospitalPortal';
import HospitalRegistration from './components/hospital/HospitalRegistration';
import HospitalList from './components/hospital/HospitalList';
import DoctorRegister from './components/hospital/DoctorRegister';
import HospitalManage from './components/hospital/HospitalManage';

// Doctor Components
import DoctorLogin from './components/doctor/DoctorLogin';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PatientManagement from './components/doctor/PatientManagement';

import LabTests from './components/doctor/LabTests';
import PatientDetails from './components/doctor/PatientDetails';
import DoctorSettings from './components/doctor/DoctorSettings';
import DoctorProtectedRoute from './components/doctor/ProtectedRoute';

// Laboratory Components
import LaboratoryPortal from './components/laboratory/LaboratoryPortal';
import LaboratoryLogin from './components/laboratory/LaboratoryLogin';
import LaboratoryDashboard from './components/laboratory/LaboratoryDashboard';
import LabTestWorkflow from './components/laboratory/LabTestWorkflow';
import LaboratoryProtectedRoute from './components/laboratory/ProtectedRoute';

// Patient Components
import PatientPortal from './components/patient/PatientPortal';
import PatientLogin from './components/patient/PatientLogin';
import PatientDashboard from './components/patient/PatientDashboard';
import MedicalHistory from './components/patient/MedicalHistory';
import PatientPrescriptions from './components/patient/Prescriptions';
import LabResults from './components/patient/LabResults';
import SecondOpinion from './components/patient/SecondOpinion';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          
          {/* Hospital Routes */}

          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/register" element={<HospitalRegistration />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/list" element={<HospitalList />} />
          <Route path="/hospital/add-doctor" element={<DoctorsList />} />
          <Route path="/hospital/view-doctors" element={<DoctorsList />} />
          <Route path="/hospital/register-doctor" element={<DoctorRegister />} />
          <Route path="/hospital/manage" element={<HospitalManage />} />
          <Route path="/hospital/add-lab" element={<LaboratoryRegister />} />
          <Route path="/hospital/register-lab" element={<LaboratoryRegister />} />
          <Route path="/hospital/view-labs" element={<LaboratoryList />} />
          <Route path="/hospital/view-patients" element={<PatientManagement />} />

          {/* Doctor Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={
            <DoctorProtectedRoute>
              <DoctorDashboard />
            </DoctorProtectedRoute>
          } />
          <Route path="/doctor/patients" element={
            <DoctorProtectedRoute>
              <PatientManagement />
            </DoctorProtectedRoute>
          } />
          <Route path="/doctor/second-opinion" element={
            <DoctorProtectedRoute>
              <SecondOpinion />
            </DoctorProtectedRoute>
          } />
          <Route path="/doctor/lab-tests" element={
            <DoctorProtectedRoute>
              <LabTests />
            </DoctorProtectedRoute>
          } />
          <Route path="/doctor/patient/:id" element={
            <DoctorProtectedRoute>
              <PatientDetails />
            </DoctorProtectedRoute>
          } />
          <Route path="/doctor/settings" element={
            <DoctorProtectedRoute>
              <DoctorSettings />
            </DoctorProtectedRoute>
          } />

          {/* Laboratory Routes */}
          <Route path="/laboratory" element={<LaboratoryLogin />} />
          <Route path="/laboratory/login" element={<LaboratoryLogin />} />
          <Route path="/laboratory/portal" element={
            <LaboratoryProtectedRoute>
              <LaboratoryPortal />
            </LaboratoryProtectedRoute>
          } />
          <Route path="/laboratory/dashboard" element={
            <LaboratoryProtectedRoute>
              <LaboratoryDashboard />
            </LaboratoryProtectedRoute>
          } />
          <Route path="/laboratory/workflow" element={
            <LaboratoryProtectedRoute>
              <LabTestWorkflow />
            </LaboratoryProtectedRoute>
          } />

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
              <MedicalHistory />
            </ProtectedRoute>
          } />
          <Route path="/patient/prescriptions" element={
            <ProtectedRoute>
              <PatientPrescriptions />
            </ProtectedRoute>
          } />
          <Route path="/patient/lab-results" element={
            <ProtectedRoute>
              <LabResults />
            </ProtectedRoute>
          } />
          <Route path="/patient/second-opinion" element={
            <ProtectedRoute>
              <SecondOpinion />
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}