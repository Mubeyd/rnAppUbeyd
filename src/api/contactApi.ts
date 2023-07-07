import { Contact } from 'src/data/types';
import axiosInstance from './axiosInstance';


export async function getContacts(): Promise<Contact[]> {
  const response = await axiosInstance.get('/contacts');

  console.log('response :>> ', response.config.baseURL);
  console.log('response :>> ', response.config.url);
  console.log('response :>> ', response.config.data);
  console.log('response :>> ', response.config.env);

  return response.data;
}
