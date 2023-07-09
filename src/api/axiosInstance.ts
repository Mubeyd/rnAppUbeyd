import { JSON_URL } from '@env';
import axios from 'axios';

// let baseURL = JSON_URL;

// if (Platform.OS === 'android') {
//   baseURL = 'http://localhost:3009';
// } else if (Platform.OS === 'ios') {
//   baseURL = 'http://localhost:3009';
// }

const axiosInstance = axios.create({
  baseURL: JSON_URL,
  headers: {
    'Content-Type': 'application/json charset=utf-8',
    Accept: 'application/json',
  },
});

export default axiosInstance;
