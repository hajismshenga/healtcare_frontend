import React, { useState } from 'react';
import './styles/DoctorSettings.css';

const DoctorSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  // For demo: assume default password is 123456
  const [storedPassword, setStoredPassword] = useState('123456');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    if (currentPassword !== storedPassword) {
      setMessage('Current password is incorrect.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setMessage('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    setStoredPassword(newPassword);
    setSuccess(true);
    setMessage('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="doctor-settings-container">
      <div className="doctor-settings-title">Settings</div>
      <form className="doctor-settings-form" onSubmit={handleSubmit}>
        <div>
          <label className="doctor-settings-label">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="doctor-settings-input"
            required
          />
        </div>
        <div>
          <label className="doctor-settings-label">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="doctor-settings-input"
            required
          />
        </div>
        <div>
          <label className="doctor-settings-label">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="doctor-settings-input"
            required
          />
        </div>
        {message && (
          <div className={`doctor-settings-message ${success ? 'success' : 'error'}`}>{message}</div>
        )}
        <button
          type="submit"
          className="doctor-settings-submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default DoctorSettings;
