import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log('currentUser :>> ', currentUser);

  const onPress = useCallback(() => {
    navigate('DetailsScreen', { id: '1' });
  }, [navigate]);

  const onPressItem = useCallback(
    ({ item }: { item: User }) => {
      dispatch(setCurrentUser(item));
    },
    [dispatch],
  );

  useEffect(() => {
    async function lol() {
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data.users));
        setUsers(data.users);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    }
    lol();
  }, [dispatch]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>HomeScreen</Text>

      <Text>Users:</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressItem({ item })}>
              <Text style={styles.textHeader}>{item.firstName}</Text>
            </TouchableOpacity>
          )}
        />
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
