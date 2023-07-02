import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUsers } from '../api/userApi';
import { User } from '../data/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentUser, setUsers } from '../redux/slices/userSlice';

export default function HomeScreen() {
  const { navigate } = useNavigation() as any;
  const dispatch = useAppDispatch();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  const data = useAppSelector(state => state.user.users);

  const onPress = useCallback(() => {
    navigate('DetailsScreen', { id: '1' });
  }, [navigate]);

  const onPressItem = useCallback(
    ({ item }: { item: User }) => {
      dispatch(setCurrentUser(item));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => {
      return (
        <TouchableOpacity onPress={() => onPressItem({ item })}>
          <Text style={styles.textHeader}>{item.firstName}</Text>
        </TouchableOpacity>
      );
    },
    [onPressItem],
  );

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  if (error) {
    return (
      <View>
        <Text>Error: {(error as any)?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>HomeScreenRQ</Text>

      <Text>Users:</Text>
      <View style={styles.listContainer}>
        {isLoading ? <Text>Loading...</Text> : <FlatList data={data} renderItem={renderItem} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Go to Details</Text>
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
