import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { replace, navigate, goBack } = useNavigation() as any;

  const onPress = useCallback(() => {
    console.log('Button pressed');
    navigate('DetailsScreen', { id: '1' });
  }, []);

  return (
    <View>
      <Text style={styles.textHeader}>HomeScreen</Text>

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
