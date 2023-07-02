import { User } from 'src/data/types';
import axiosInstance from './axiosInstance';

export async function getUsers(): Promise<User[]> {
  const response = await axiosInstance.get('/users');

  return response.data.users;
}
