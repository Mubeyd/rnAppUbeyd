import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { navigate } = useNavigation() as any;

  const onNavBookBorrowing = useCallback(() => {
    navigate('ContactsScreen');
  }, [navigate]);

  const onNavBookBorrowingFormik = useCallback(() => {
    navigate('ContactsScreenFormik');
  }, [navigate]);

  const onNavDummyUsers = useCallback(() => {
    navigate('UsersListScreen');
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Select Feature </Text>

      <TouchableOpacity style={styles.button} onPress={onNavBookBorrowing}>
        <Text style={styles.buttonText}>Book Borrowing</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onNavBookBorrowingFormik}>
        <Text style={styles.buttonText}>Book Borrowing Formik</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onNavDummyUsers}>
        <Text style={styles.buttonText}>Dummy users</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: 'blue',
    borderRadius: 4,
    borderWidth: 1,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'blue',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  textHeader: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
