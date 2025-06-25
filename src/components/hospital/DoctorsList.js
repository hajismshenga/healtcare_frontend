import React from 'react';
import api from '../../utils/api';
import API_CONFIG from '../../config/api';

const DoctorsList = () => {
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get(API_CONFIG.ENDPOINTS.DOCTORS);
        setDoctors(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-list">
      <h2>Doctors List</h2>
      <div className="doctors-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;
