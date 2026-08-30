import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (mobile, password) => {
    const res = await api.post('/api/auth/login', { mobile, password });
    return res.data;
  },
  signup: async (name, mobile, location, password) => {
    const res = await api.post('/api/auth/signup', { name, mobile, location, password });
    return res.data;
  },
};

export const cropService = {
  analyzeCrop: async (data) => {
    const res = await api.post('/api/crop-analysis', data);
    return res.data;
  },
  getWhatIf: async (data) => {
    const res = await api.post('/api/what-if', data);
    return res.data;
  },
  getMarkets: async (crop) => {
    const res = await api.get(`/api/markets/${crop}`);
    return res.data;
  },
};

export default api;
