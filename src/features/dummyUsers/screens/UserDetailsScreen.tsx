import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../../../redux/hooks';

export default function UserDetailsScreen() {
  const { goBack } = useNavigation() as any;

  const currentUser = useAppSelector(state => state.user.currentUser);

  const onPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}>
      <Image source={{ uri: currentUser?.image }} style={{ width: 200, height: 200 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text style={styles.textHeader}>{currentUser?.firstName}</Text>
        <Text style={styles.textHeader}>{currentUser?.lastName}</Text>
      </View>
      <Text style={styles.textHeader}>{currentUser?.age}</Text>
      <Text style={styles.textCompany}>Company Info</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.name}</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.title}</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.address?.address}</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.address?.city}</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.address?.state}</Text>
      <Text style={styles.textHeader}>{currentUser?.company?.address?.postalCode}</Text>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Go Back</Text>
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
});
