import { BASE_URL } from '@env';

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
