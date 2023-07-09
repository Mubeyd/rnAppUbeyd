import axiosInstance from '../../../api/axiosInstance';
import { Contact } from '../state/bookBorrowSlice';

export async function getContacts(): Promise<Contact[]> {
  const response = await axiosInstance.get('/contacts');

  return response.data;
}
