import { BASE_URL } from '@env';
import { User } from 'src/data/types';
import axiosInstance from './axiosInstance';

export async function fetchUsers() {
  const response = await fetch(BASE_URL + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }
  return await response.json();
}

/// axiosInstance
export async function getUsers(): Promise<User[]> {
  const response = await axiosInstance.get('/users');

  return response.data.users;
}
