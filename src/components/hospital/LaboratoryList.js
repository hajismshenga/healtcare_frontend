import React from 'react';
import api from '../../utils/api';
import API_CONFIG from '../../config/api';

const LaboratoryList = () => {
  const [labs, setLabs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await api.get(API_CONFIG.ENDPOINTS.LABORATORIES);
        setLabs(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch laboratories');
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  return (
    <div className="laboratories-list">
      <h2>Laboratories List</h2>
      <div className="laboratories-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab) => (
              <tr key={lab.id}>
                <td>{lab.name}</td>
                <td>{lab.location}</td>
                <td>{lab.contact}</td>
                <td>{lab.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaboratoryList;
