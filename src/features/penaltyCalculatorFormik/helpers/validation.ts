import { date, object, string } from 'yup';
import { Country } from '../db/types';

export const bookBorrowValidationSchema = object().shape({
  country: object<Country>().required('Please select a country'),
  bookBorrowDate: date().required('Please select a borrowing date'),
  bookReturnDate: date().required('Please select a returning date'),
  bookPhotoFront: string().required('Please take a photo of the front cover'),
  bookPhotoBack: string().required('Please take a photo of the back cover'),
  randomText: string().required('Please enter some random text'),
});
