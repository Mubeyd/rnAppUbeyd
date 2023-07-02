import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  const { goBack } = useNavigation() as any;
  const onPress = useCallback(() => {
    goBack();
  }, [goBack]);
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
  textHeader: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
