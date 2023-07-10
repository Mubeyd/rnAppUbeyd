import { axiosInstanceDummy } from '../../../api/axiosInstance';
import { User } from '../data/types';

export async function getUsers(): Promise<User[]> {
  const response = await axiosInstanceDummy.get('/users');

  return response.data.users;
}
