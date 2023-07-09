import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUsers } from '../api/userApi';
import { User } from '../data/types';
import { removeUser, setCurrentUser, setUsers } from '../state/userSlice';

export default function UsersListScreen() {
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
    navigate('NewUserScreen');
  }, [navigate]);

  const onPressItem = useCallback(
    ({ item }: { item: User }) => {
      dispatch(setCurrentUser(item));
      navigate('DetailsScreen');
    },
    [dispatch, navigate],
  );
  const onPressItemRemove = useCallback(
    ({ item }: { item: User }) => {
      dispatch(removeUser({ id: item.id ?? 0 }));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => {
      return (
        <View>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => onPressItem({ item })}>
            <ImageBackground source={{ uri: item.image }} style={styles.imageBackground} resizeMode="cover">
              <Text style={styles.textHeader}>{item.firstName}</Text>
              <Text style={styles.textHeader}>{item.age}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacityRemove} onPress={() => onPressItemRemove({ item })}>
            <Text style={styles.textHeader}>X</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [onPressItem, onPressItemRemove],
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
      <Text>Users List:</Text>
      <View style={styles.listContainer}>
        {isLoading ? <Text>Loading...</Text> : <FlatList data={data} renderItem={renderItem} numColumns={2} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add New User</Text>
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
  imageBackground: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-start',
  },
  listContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 16,
  },
  textHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 6,
    textAlign: 'center',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    margin: 10,
    overflow: 'hidden',
    width: 150,
  },
  touchableOpacityRemove: {
    backgroundColor: 'white',
    borderRadius: 10,
    // height: 150,
    // margin: 10,
    // overflow: 'hidden',
    // width: 150,
    position: 'absolute',
  },
});
