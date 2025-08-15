import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalDashboard.css';

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const hospitalName = sessionStorage.getItem('hospitalName');

  React.useEffect(() => {
    if (!hospitalName) {
      navigate('/hospital/login');
    }
  }, [hospitalName, navigate]);

  const handleManageClick = () => {
    navigate('/hospital/manage');
  };

  return (
    <div className="hospital-dashboard">
      <h2>Welcome, {hospitalName || 'Hospital'}!</h2>
      
      <div className="dashboard-actions">
        <button className="btn-primary" onClick={() => window.location.href = '/hospital/register-doctor'}>
          Register Doctor
        </button>
        <button className="btn-primary" onClick={() => window.location.href = '/hospital/register-lab'}>
          Register Laboratory
        </button>
        <button className="btn-primary" onClick={handleManageClick}>
          Manage
        </button>
      </div>
    </div>
  );
};

export default HospitalDashboard;
