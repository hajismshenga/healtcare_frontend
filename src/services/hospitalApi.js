import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/hospitals';

const hospitalApi = {
  register: async (hospitalData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, hospitalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default hospitalApi;
