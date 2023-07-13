import { date, number, object, string } from 'yup';
import { Country, IBookBorrowForm } from '../db/types';

export const bookBorrowValidationSchema = object<IBookBorrowForm>().shape({
  country: object<Country>()
    .nullable()
    .shape({
      id: number().nullable().required('Please select a country'),
      name: string().nullable().required('Please select a country'),
    }),

  bookBorrowDate: date().nullable().required('Please select a borrowing date'),
  bookReturnDate: date().nullable().required('Please select a returning date'),
  bookPhotoFront: string().nullable().required('Please take a photo of the front cover'),
  bookPhotoBack: string().nullable().required('Please take a photo of the back cover'),
  randomText: string().min(1).nullable().required('Please enter some random text'),
});
