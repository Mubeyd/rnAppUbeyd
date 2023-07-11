import axiosInstance from '../../../api/axiosInstance';
import { Country } from '../state/bookBorrowSlice';

export async function getCountries(): Promise<Country[]> {
  const response = await axiosInstance.get('/countries');

  return response.data;
}
