import { date, object, string } from 'yup';

export const bookBorrowValidationSchema = object().shape({
  currentContact: object().shape({
    label: string().required('Please select a contact'),
    value: string().required('Please select a contact'),
  }),
  bookBorrowDate: date().required('Please select a borrowing date'),
  bookReturnDate: date().required('Please select a returning date'),
  country: object().shape({
    label: string().required('Please select a country'),
    value: string().required('Please select a country'),
  }),
  bookPhotoFront: string().required('Please take a photo of the front cover'),
  bookPhotoBack: string().required('Please take a photo of the back cover'),
});
