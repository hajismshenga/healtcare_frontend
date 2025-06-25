import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate('/hospital/manage');
  };

  return (
    <div className="hospital-dashboard">
      <h2>Hospital Dashboard</h2>
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
