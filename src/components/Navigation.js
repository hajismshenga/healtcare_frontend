import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/NavigationStyles.css';
import { Button, IconButton } from '@mui/material';
import { Home, Logout, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portalType, setPortalType] = useState('');

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    const portal = portalType || 'default';
    localStorage.removeItem(`${portal}Token`);
    localStorage.removeItem(`${portal}Id`);
    navigate('/');
  }, [navigate, portalType]);

  // Update portal type when location changes
  useEffect(() => {
    setPortalType(location.pathname.split('/')[1]);
  }, [location.pathname]);

  const getPortalName = useCallback((type) => {
    const portalMap = {
      'hospital': 'Hospital',
      'doctor': 'Doctor',
      'laboratory': 'Laboratory',
      'patient': 'Patient',
      'admin': 'Admin'
    };
    return portalMap[type] || '';
  }, []);

  // Handle mobile menu close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle Home button click
  const handleHomeClick = useCallback(() => {
    navigate('/');
    setIsMobileMenuOpen(false); // Close mobile menu if open
  }, [navigate]);

  return (
    <nav className={`navbar ${portalType === 'admin' ? 'admin-navbar' : ''}`}>
      <div className="nav-brand">
        <h1>Healthcare System</h1>
        <span className="portal-type">{getPortalName(portalType)}</span>
      </div>
      
      {/* Mobile menu button */}
      <IconButton 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-button"
        aria-label="Toggle menu"
        size="large"
        color="primary"
      >
        <Menu />
      </IconButton>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {portalType && (
          <>
            <Button 
              variant="outlined" 
              startIcon={<Home />} 
              onClick={handleHomeClick} 
              className="nav-link"
              disableRipple
              size="large"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              Home
            </Button>

            <Button 
              variant="contained" 
              startIcon={<Logout />} 
              onClick={handleLogout} 
              className="btn-logout"
              disableRipple
              size="large"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 2,
                },
                '&:active': {
                  transform: 'translateY(1px)',
                },
              }}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
