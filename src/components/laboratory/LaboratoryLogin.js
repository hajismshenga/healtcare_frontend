import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa';
import './styles/LaboratoryStyles.css';

const LaboratoryLogin = () => {
  const [formData, setFormData] = useState({
    labId: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedLabId = localStorage.getItem('rememberedLabId');
    if (savedLabId) {
      setFormData(prev => ({
        ...prev,
        labId: savedLabId,
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.labId.trim()) {
      setError('Please enter your Laboratory ID');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would verify credentials with your backend
      if (formData.rememberMe) {
        localStorage.setItem('rememberedLabId', formData.labId);
      } else {
        localStorage.removeItem('rememberedLabId');
      }

      // Set auth tokens (replace with actual tokens from your backend)
      localStorage.setItem('labId', formData.labId);
      localStorage.setItem('labToken', `lab_${Date.now()}`);
      
      // Redirect to dashboard
      navigate('/laboratory/dashboard');
      
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="laboratory-login">
      <div className="login-card">
        <div className="login-header">
          <h2>Laboratory Login</h2>
          <p>Access your laboratory account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="labId">Laboratory ID</label>
            <div className="input-with-icon">
              <FaUserAlt className="input-icon" />
              <input
                id="labId"
                type="text"
                name="labId"
                value={formData.labId}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your laboratory ID"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="password-label-container">
              <label htmlFor="password">Password</label>
              </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LaboratoryLogin;
