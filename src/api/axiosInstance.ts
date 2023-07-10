import { DUMMY_JSON_URL, JSON_SERVER_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: JSON_SERVER_URL,
  headers: {
    'Content-Type': 'application/json charset=utf-8',
    Accept: 'application/json',
  },
});

export default axiosInstance;

export const axiosInstanceDummy = axios.create({
  baseURL: DUMMY_JSON_URL,
  headers: {
    'Content-Type': 'application/json charset=utf-8',
    Accept: 'application/json',
  },
});
