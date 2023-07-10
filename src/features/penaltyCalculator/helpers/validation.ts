import yup from 'yup';

export const validationSchema = yup.object().shape({
  currentContact: yup.object().shape({
    label: yup.string().required('Please select a contact'),
    value: yup.string().required('Please select a contact'),
  }),
  bookBorrowDate: yup.date().required('Please select a borrowing date'),
  bookReturnDate: yup.date().required('Please select a returning date'),
  country: yup.object().shape({
    label: yup.string().required('Please select a country'),
    value: yup.string().required('Please select a country'),
  }),
  bookPhotoFront: yup.string().required('Please take a photo of the front cover'),
  bookPhotoBack: yup.string().required('Please take a photo of the back cover'),
});
