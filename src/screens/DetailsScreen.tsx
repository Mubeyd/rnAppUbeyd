import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  const { goBack } = useNavigation() as any;
  const onPress = useCallback(() => {
    console.log('Button pressed');
    goBack();
  }, []);
  return (
    <View>
      <Text style={styles.textHeader}>DetailsScreen</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Go Back</Text>
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
