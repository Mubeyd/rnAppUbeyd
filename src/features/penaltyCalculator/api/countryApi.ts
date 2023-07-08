import { Contact } from 'src/data/types';
import axiosInstance from '../../../api/axiosInstance';

export async function getCountries(): Promise<Contact[]> {
  const response = await axiosInstance.get('/countries');

  return response.data;
}
