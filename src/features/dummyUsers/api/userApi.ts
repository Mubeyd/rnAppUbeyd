import axiosInstance from '../../../api/axiosInstance';
import { User } from '../data/types';

export async function getUsers(): Promise<User[]> {
  const response = await axiosInstance.get('/users');

  return response.data.users;
}
