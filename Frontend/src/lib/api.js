import axios from 'axios';

// In development, call backend at localhost:8000
// In production, use VITE_BACKEND_URL or same-origin relative URLs
const API_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_BACKEND_URL || '') 
  : 'http://localhost:8000';

// Axios instance for REST API calls
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Socket.io URL: full origin in production, localhost:8000 in dev
const SOCKET_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin : ''))
  : 'http://localhost:8000';

export default api;
export { API_URL, SOCKET_URL };