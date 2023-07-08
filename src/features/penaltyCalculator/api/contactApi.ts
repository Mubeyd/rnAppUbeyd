import { Contact } from 'src/data/types';
import axiosInstance from '../../../api/axiosInstance';

export async function getContacts(): Promise<Contact[]> {
  const response = await axiosInstance.get('/contacts');

  return response.data;
}
