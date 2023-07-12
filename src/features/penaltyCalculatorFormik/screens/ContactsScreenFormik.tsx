import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getContacts } from '../api/contactApi';
import { Contact } from '../db/types';
import { setContacts, setCurrentContact } from '../state/bookBorrowSlice';

export default function ContactsScreenFormik() {
  const { navigate } = useNavigation() as any;
  const dispatch = useAppDispatch();

  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => getContacts(),
  });

  const data = useAppSelector(state => state.bookBorrow.contacts);

  const onPress = useCallback(() => {
    navigate('PCDetailsScreenFormik', { id: '1' });
  }, [navigate]);

  const navigateCameraScreen = useCallback(() => {
    navigate('CameraScreenFormik', { id: '1' });
  }, [navigate]);

  const onPressItem = useCallback(
    ({ item }: { item: Contact }) => {
      dispatch(setCurrentContact(item));
      navigate('PCDetailsScreenFormik');
    },
    [dispatch, navigate],
  );

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => {
      return (
        <TouchableOpacity style={styles.contactItemContainer} onPress={() => onPressItem({ item })}>
          <Text style={styles.contactText}>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [onPressItem],
  );

  useEffect(() => {
    if (contacts) {
      dispatch(setContacts(contacts));
    }
  }, [dispatch, contacts]);

  return (
    <View style={styles.container}>
      <Ionicons name={'md-people-sharp'} color="gray" size={28} />

      <Text style={{ color: 'black' }}>Please select a Contact:</Text>
      <View style={styles.listContainer}>
        {!!error && <Text style={{ color: 'red' }}>Error: {(error as any)?.message}</Text>}
        {isLoading ? (
          <Text style={{ color: 'black' }}>Loading...</Text>
        ) : (
          <FlatList data={data} renderItem={renderItem} />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateCameraScreen}>
        <Text style={styles.buttonText}>Go to Camera Screen</Text>
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
  contactItemContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    display: 'flex',
    elevation: 2,
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactText: {
    color: '#1b1d19',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
});
