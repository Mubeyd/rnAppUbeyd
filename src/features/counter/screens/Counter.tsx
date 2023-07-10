import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AsyncButton } from '../../../components/AsyncButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { decrement, increment, incrementAsync, incrementByAmount, selectCount } from '../state/counterSlice';

export function Counter() {
  const [incrementAmount, setIncrementAmount] = useState('2');

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount);
  const status = useAppSelector(state => state.counter.status);
  const dispatch = useAppDispatch();

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{count}</Text>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.textbox}
          value={incrementAmount}
          keyboardType="numeric"
          onChangeText={setIncrementAmount}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
            <Text style={styles.buttonText}>Add Amount</Text>
          </TouchableOpacity>
          <AsyncButton
            style={styles.button}
            disabled={status !== 'idle'}
            onPress={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>
            <Text style={styles.buttonText}>Add Async</Text>
          </AsyncButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(112, 76, 182, 0.1)',
    borderRadius: 2,
    margin: 2,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonText: {
    color: 'rgb(112, 76, 182)',
    fontSize: 32,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textbox: {
    borderWidth: 1,
    color: 'rgb(112, 76, 182)',
    fontSize: 48,
    justifyContent: 'center',
    marginRight: 8,
    padding: 2,
    textAlign: 'center',
    width: 64,
  },
  value: {
    color: 'rgb(112, 76, 182)',
    fontSize: 78,
    marginTop: 2,
    paddingHorizontal: 16,
  },
});
