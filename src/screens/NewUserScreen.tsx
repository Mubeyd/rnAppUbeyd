import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { setNewUser } from '../redux/slices/userSlice';

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

  const onPress = useCallback(() => {
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

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}>
      <Text style={styles.textHeader}>Add new user</Text>
      <TextInput style={styles.textInput} onChangeText={setFirstName} value={firstName} placeholder="First Name" />
      <TextInput style={styles.textInput} onChangeText={setLastName} value={lastName} placeholder="Last Name" />
      <TextInput
        style={styles.textInput}
        inputMode="numeric"
        onChangeText={setAge}
        value={age.toString()}
        placeholder="Age"
      />
      <TextInput style={styles.textInput} onChangeText={setImage} value={image} placeholder="Image" />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyName}
        value={companyName}
        placeholder="Company Name"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyTitle}
        value={companyTitle}
        placeholder="Company Title"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyAddress}
        value={companyAddress}
        placeholder="Company Address"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyCity}
        value={companyCity}
        placeholder="Company City"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyState}
        value={companyState}
        placeholder="Company State"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyPostalCode}
        value={companyPostalCode}
        placeholder="Company Postal Code"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setCompanyDepartment}
        value={companyDepartment}
        placeholder="Company Department"
      />

      <Text style={styles.textHeader}>{currentUser?.company?.address?.postalCode}</Text>

      <TouchableOpacity style={styles.button} onPress={onPress}>
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
