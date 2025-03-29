// utils/axiosInstance.ts
import axios from 'axios';

// Puedes agregar la URL base de tu API, por ejemplo:
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',  // Cambia esto por la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
