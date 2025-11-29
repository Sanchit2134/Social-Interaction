import axios from 'axios';

// Get API URL from environment variable or default to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'https://github.com/Sanchit2134/Social-Interaction';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
export { API_URL };

