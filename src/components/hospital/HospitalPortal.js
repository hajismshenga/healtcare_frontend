import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HospitalPortal.css';

const HospitalPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="hospital-portal">
      <h2>Management</h2>
      <div className="manage-options">
        <button 
          className="btn-primary" 
          onClick={() => navigate('/hospital/manage/doctors')}
        >
          View Doctors List
        </button>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/hospital/manage/labs')}
        >
          View Laboratories List
        </button>
      </div>
    </div>
  );
};

export default HospitalPortal;
