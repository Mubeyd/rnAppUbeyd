import yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('Please enter a first name'),
  lastName: yup.string().required('Please enter a last name'),
  age: yup.number().required('Please enter an age'),
  image: yup.string().required('Please enter an image'),
  companyName: yup.string().required('Please enter a company name'),
  companyTitle: yup.string().notRequired(),
  companyAddress: yup.string().notRequired(),
  companyCity: yup.string().notRequired(),
  companyState: yup.string().notRequired(),
  companyPostalCode: yup.string().notRequired(),
  companyDepartment: yup.string().notRequired(),
});
