import React, { useState } from 'react';
import './styles/DoctorStyles.css';

const DoctorProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const stats = [
    { label: 'Patients', value: '150', icon: '👨‍👩‍👧‍👦' },
    { label: 'Rating', value: '8.5', icon: '⭐' },
    { label: 'Years', value: '10', icon: '📅' },
    { label: 'Appointments', value: '25', icon: '📅' },
    { label: 'Reviews', value: '45', icon: '📝' },
  ];

  return (
    <div 
      className={`doctor-profile ${isHovered ? 'hovered' : ''} ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="profile-header">
        <div className="profile-image">
          <img 
            src="/images/doctor-avatar.png" 
            alt="Doctor Profile" 
            className="profile-image-inner"
          />
          <div className="status-indicator online"></div>
        </div>
        <div className="profile-info">
          <h3>Dr. John Doe</h3>
          <p className="specialty">General Practitioner</p>
          <div className="profile-actions">
            <button 
              className="profile-button primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'View Profile'}
            </button>
            <button className="profile-button secondary">Settings</button>
          </div>
        </div>
      </div>
      
      <div className="profile-stats">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-item"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-number">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {isExpanded && (
        <div className="expanded-content">
          <div className="achievements">
            <h4>Achievements</h4>
            <div className="achievement-list">
              <div className="achievement-item">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-text">Best Doctor Award 2023</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon">🎓</span>
                <span className="achievement-text">MD from Harvard</span>
              </div>
            </div>
          </div>
          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <div className="action-buttons">
              <button className="action-button">
                <span className="action-icon">📊</span>
                <span className="action-text">View Analytics</span>
              </button>
              <button className="action-button">
                <span className="action-icon">👥</span>
                <span className="action-text">Manage Team</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📅</span>
                <span className="action-text">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
