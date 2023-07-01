import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchUsers } from '../api/userApi';
import { User } from '../data/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentUser, setUsers } from '../redux/slices/userSlice';

export default function HomeScreen() {
  const { replace, navigate, goBack } = useNavigation() as any;
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.user.users);
  const currentUser = useAppSelector(state => state.user.currentUser);

  // console.log('currentUser :>> ', currentUser);

  const onPress = useCallback(() => {
    navigate('DetailsScreen', { id: '1' });
  }, []);

  const onPressItem = useCallback(({ item }: { item: User }) => {
    dispatch(setCurrentUser(item));
  }, []);

  useEffect(() => {
    async function lol() {
      const data = await fetchUsers();
      dispatch(setUsers(data.users));
      setUsers(data.users);
    }
    lol();
  }, []);

  return (
    <View>
      <Text style={styles.textHeader}>HomeScreen</Text>

      <Text>Users:</Text>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressItem({ item })}>
            <Text style={styles.textHeader}>{item.firstName}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: 'blue',
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'blue',
  },
});
