import { JSON_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: JSON_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
