import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api', // Cambia esto por la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
