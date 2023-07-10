import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import { validationSchema } from '../helpers/validation';
import { setNewUser } from '../state/userSlice';

export default function NewUserScreen() {
  const { goBack } = useNavigation() as any;

  const currentUser = useAppSelector(state => state.user.currentUser);
  const allUsers = useAppSelector(state => state.user.users);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [image, setImage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyTitle, setCompanyTitle] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');
  const [companyPostalCode, setCompanyPostalCode] = useState('');
  const [companyDepartment, setCompanyDepartment] = useState('');

  const onDispatch = useCallback(() => {
    dispatch(
      setNewUser({
        newUser: {
          id: allUsers.length + 1,
          firstName: firstName || 'New User',
          lastName: lastName || 'New User',
          age: age || 0,
          image: image || 'https://picsum.photos/200/300',
          company: {
            name: companyName,
            title: companyTitle,
            address: {
              address: companyAddress,
              city: companyCity,
              state: companyState,
              postalCode: companyPostalCode,
            },
            department: companyDepartment,
          },
        },
      }),
    );
    goBack();
  }, [
    age,
    allUsers.length,
    companyAddress,
    companyCity,
    companyDepartment,
    companyName,
    companyPostalCode,
    companyState,
    companyTitle,
    dispatch,
    firstName,
    goBack,
    image,
    lastName,
  ]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: 0,
      image: '',
      companyName: '',
      companyTitle: '',
      companyAddress: '',
      companyCity: '',
      companyState: '',
      companyPostalCode: '',
      companyDepartment: '',
    },
    onSubmit: () => {
      onDispatch();
      goBack();
    },
    validationSchema: validationSchema,
  });

  const { handleSubmit, touched, errors } = formik;

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}>
      <Text style={styles.textHeader}>Add new user</Text>
      <TextInput style={styles.textInput} onChangeText={setFirstName} value={firstName} placeholder="First Name" />
      {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput style={styles.textInput} onChangeText={setLastName} value={lastName} placeholder="Last Name" />
      {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        style={styles.textInput}
        inputMode="numeric"
        onChangeText={setAge}
        value={age.toString()}
        placeholder="Age"
      />
      {touched.age && errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

      <TextInput style={styles.textInput} onChangeText={setImage} value={image} placeholder="Image" />
      {touched.image && errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyName}
        value={companyName}
        placeholder="Company Name"
      />
      {touched.companyName && errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyTitle}
        value={companyTitle}
        placeholder="Company Title"
      />
      {touched.companyTitle && errors.companyTitle && <Text style={styles.errorText}>{errors.companyTitle}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyAddress}
        value={companyAddress}
        placeholder="Company Address"
      />
      {touched.companyAddress && errors.companyAddress && <Text style={styles.errorText}>{errors.companyAddress}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyCity}
        value={companyCity}
        placeholder="Company City"
      />
      {touched.companyCity && errors.companyCity && <Text style={styles.errorText}>{errors.companyCity}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyState}
        value={companyState}
        placeholder="Company State"
      />
      {touched.companyState && errors.companyState && <Text style={styles.errorText}>{errors.companyState}</Text>}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyPostalCode}
        value={companyPostalCode}
        placeholder="Company Postal Code"
      />
      {touched.companyPostalCode && errors.companyPostalCode && (
        <Text style={styles.errorText}>{errors.companyPostalCode}</Text>
      )}

      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyDepartment}
        value={companyDepartment}
        placeholder="Company Department"
      />
      {touched.companyDepartment && errors.companyDepartment && (
        <Text style={styles.errorText}>{errors.companyDepartment}</Text>
      )}

      <Text style={styles.textHeader}>{currentUser?.company?.address?.postalCode}</Text>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Confirm New User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'blue',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'blue',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  textCompany: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '600',
    margin: 4,
    textAlign: 'center',
  },
  textHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    margin: 4,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'blue',
    borderRadius: 4,
    borderWidth: 1,
    margin: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
