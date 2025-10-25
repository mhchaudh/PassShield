import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async analyzePassword(password) {
    try {
      const response = await this.client.post('/analyze_password', { password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkHealth() {
    try {
      const response = await this.client.get('/');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data.error || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new ApiService();