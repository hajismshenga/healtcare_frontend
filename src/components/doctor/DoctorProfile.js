import React from 'react';
import { Avatar, Button } from '@mui/material';
import { Edit, Person, Email, Phone, LocationOn } from '@mui/icons-material';
import './styles/DoctorProfile.css';

const DoctorProfile = () => {
  const [editMode, setEditMode] = React.useState(false);
  // Local state for editable profile
  const [profile, setProfile] = React.useState({
    name: 'Dr. hajis',
    specialization: 'Cardiologist',
    email: 'hajismshenga@gmail.com',
    phone: '+255 712 345 678',
    location: 'Muhimbili National Hospital',
    bio: 'Experienced cardiologist with over 15 years of practice. Specializes in heart disease diagnosis and treatment.',
    qualifications: [
      'MD - Internal Medicine',
      'Fellowship in Cardiology',
      'Certified Cardiologist - Tanzania Medical Council'
    ]
  });
  // For cancel, keep a backup
  const [backup, setBackup] = React.useState(null);

  const handleEdit = () => {
    if (!editMode) setBackup(profile); // backup current state
    else setProfile(backup); // revert on cancel
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleQualificationChange = (idx, value) => {
    const newQuals = [...profile.qualifications];
    newQuals[idx] = value;
    setProfile({ ...profile, qualifications: newQuals });
  };

  const handleAddQualification = () => {
    setProfile({ ...profile, qualifications: [...profile.qualifications, ''] });
  };

  const handleRemoveQualification = (idx) => {
    const newQuals = profile.qualifications.filter((_, i) => i !== idx);
    setProfile({ ...profile, qualifications: newQuals });
  };

  const handleSave = () => {
    setEditMode(false);
    setBackup(null);
    // Here you would send profile to backend if needed
  };

  return (
    <div className="doctor-profile-container">
      {/* Profile Picture and Basic Info */}
      <div className="doctor-profile-avatar">
        <Avatar className="MuiAvatar-root">
          {profile.name[0]}
        </Avatar>
        {editMode ? (
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="edit-input"
            style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', margin: '0.5rem 0 0.2rem 0' }}
          />
        ) : (
          <h2>{profile.name}</h2>
        )}
        {editMode ? (
          <input
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            className="edit-input subtitle"
            style={{ color: '#1976d2', fontSize: '1.1rem', textAlign: 'center' }}
          />
        ) : (
          <div className="subtitle">{profile.specialization}</div>
        )}
        {editMode ? (
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
            <Button variant="outlined" color="error" onClick={handleEdit}>Cancel</Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            style={{ marginTop: 16 }}
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Info Section */}
      <div className="doctor-profile-info">
        <h6>Contact Information</h6>
        {editMode ? (
          <>
            <div className="info-row"><Person className="info-icon" />
              <input name="name" value={profile.name} onChange={handleChange} className="edit-input" style={{ width: '80%' }} />
            </div>
            <div className="info-row"><Email className="info-icon" />
              <input name="email" value={profile.email} onChange={handleChange} className="edit-input" style={{ width: '80%' }} />
            </div>
            <div className="info-row"><Phone className="info-icon" />
              <input name="phone" value={profile.phone} onChange={handleChange} className="edit-input" style={{ width: '80%' }} />
            </div>
            <div className="info-row"><LocationOn className="info-icon" />
              <input name="location" value={profile.location} onChange={handleChange} className="edit-input" style={{ width: '80%' }} />
            </div>
          </>
        ) : (
          <>
            <div className="info-row"><Person className="info-icon" /> <span>{profile.name}</span></div>
            <div className="info-row"><Email className="info-icon" /> <span>{profile.email}</span></div>
            <div className="info-row"><Phone className="info-icon" /> <span>{profile.phone}</span></div>
            <div className="info-row"><LocationOn className="info-icon" /> <span>{profile.location}</span></div>
          </>
        )}

        <div className="doctor-profile-section">
          <h6>Bio</h6>
          {editMode ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="doctor-profile-bio edit-input"
              style={{ width: '100%', minHeight: 60 }}
            />
          ) : (
            <div className="doctor-profile-bio">{profile.bio}</div>
          )}
        </div>

        <div className="doctor-profile-section">
          <h6>Qualifications</h6>
          {editMode ? (
            <ul className="doctor-profile-qualifications">
              {profile.qualifications.map((q, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    value={q}
                    onChange={e => handleQualificationChange(i, e.target.value)}
                    className="edit-input"
                    style={{ width: '80%' }}
                  />
                  <Button size="small" color="error" variant="outlined" onClick={() => handleRemoveQualification(i)}>-</Button>
                </li>
              ))}
              <li>
                <Button size="small" color="primary" variant="outlined" onClick={handleAddQualification}>+ Add Qualification</Button>
              </li>
            </ul>
          ) : (
            <ul className="doctor-profile-qualifications">
              {profile.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
