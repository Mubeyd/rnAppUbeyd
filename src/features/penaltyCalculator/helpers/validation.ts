import { date, object, string } from 'yup';
import { Country, IBookBorrow } from '../db/types';

export const bookBorrowValidationSchema = object().shape({
  currentContact: object().shape({
    id: string().required('Please select a contact'),
    name: string().required('Please select a contact'),
  }),
  country: object<Country>().required('Please select a country'),
  bookBorrowDate: date().required('Please select a borrowing date'),
  bookReturnDate: date().required('Please select a returning date'),
  bookPhotoFront: string().required('Please take a photo of the front cover'),
  bookPhotoBack: string().required('Please take a photo of the back cover'),
});

// check validity

export const bookBorrowValidationSync = (bookBorrow: IBookBorrow) =>
  bookBorrowValidationSchema.isValidSync({ ...bookBorrow });

export const bookBorrowFieldsValidation = async (bookBorrow: IBookBorrow) => {
  try {
    await bookBorrowValidationSchema.validate(bookBorrow);
    return { isValid: true, errors: null };
  } catch (err: any) {
    return { isValid: false, errors: err };
  }
};

// you can try and type cast objects to the defined schema
export const bookBorrowFieldsCasting = (country: Country) =>
  bookBorrowValidationSchema.cast({
    ...country,
  });
