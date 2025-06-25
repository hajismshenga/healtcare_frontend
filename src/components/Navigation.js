import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/NavigationStyles.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const portalType = location.pathname.split('/')[1]; // Get portal type from URL

  const handleLogout = () => {
    const portal = portalType || 'default';
    localStorage.removeItem(`${portal}Token`);
    localStorage.removeItem(`${portal}Id`);
    navigate('/');
  };

  const getPortalName = (type) => {
    if (!type) return '';
    const portalMap = {
      'hospital': 'Hospital',
      'doctor': 'Doctor',
      'laboratory': 'Laboratory',
      'patient': 'Patient'
    };
    return portalMap[type] || '';
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Healthcare System</h1>
        <span className="portal-type">{getPortalName(portalType)}</span>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {portalType && (
          <>
            <a href="/" className="nav-link" style={{ textDecoration: 'none' }}>
              <i className="fas fa-home"></i> Home
            </a>
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
