import axios from 'axios';

// Detect whether running locally or on Vercel live link
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// On localhost, default to http://localhost:5000/api/v1
// On live Vercel deployment, default to relative /api/v1 (Vercel Serverless API)
const defaultBaseUrl = isLocalhost ? 'http://localhost:5000/api/v1' : '/api/v1';

const backendUrl = import.meta.env.VITE_API_URL || defaultBaseUrl;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';
      if (!isLoginPage) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
