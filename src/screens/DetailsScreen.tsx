import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setBookBorrowDate, setBookReturnDate } from '../redux/slices/bookBorrowSlice';

export default function DetailsScreen() {
  const { navigate } = useNavigation() as any;
  const dispatch = useAppDispatch();

  const currentContact = useAppSelector(state => state.bookBorrow.currentContact);
  const bookBorrowDate = useAppSelector(state => state.bookBorrow.bookBorrowDate);
  const bookReturnDate = useAppSelector(state => state.bookBorrow.bookReturnDate);

  const [isDatePickerVisibleBorrow, setDatePickerVisibilityBorrow] = useState(false);

  const showDatePickerBorrow = useCallback(() => {
    setDatePickerVisibilityBorrow(true);
  }, []);

  const hideDatePickerBorrow = useCallback(() => {
    setDatePickerVisibilityBorrow(false);
  }, []);

  const handleConfirmBorrow = useCallback(
    (date: any) => {
      dispatch(setBookBorrowDate({ date }));
      hideDatePickerBorrow();
    },
    [dispatch, hideDatePickerBorrow],
  );

  const [isDatePickerVisibleReturn, setDatePickerVisibilityReturn] = useState(false);

  const showDatePickerReturn = useCallback(() => {
    setDatePickerVisibilityReturn(true);
  }, []);

  const hideDatePickerReturn = useCallback(() => {
    setDatePickerVisibilityReturn(false);
  }, []);

  const handleConfirmReturn = useCallback(
    (date: any) => {
      dispatch(setBookReturnDate({ date }));
      hideDatePickerReturn();
    },
    [dispatch, hideDatePickerReturn],
  );

  const onPress = useCallback(() => {
    // goBack();
    navigate('SummaryScreen');
  }, [navigate]);

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={styles.textHeader}>{currentContact?.name}</Text>

      <View>
        <Button title="Select a borrowing date" onPress={showDatePickerBorrow} />
        <Text style={styles.textDes}>
          Borrow Date: {bookBorrowDate ? moment(bookBorrowDate).format('DD/MM/yyyy') : ''}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleBorrow}
          mode="date"
          onConfirm={handleConfirmBorrow}
          onCancel={hideDatePickerBorrow}
        />
      </View>

      <View style={{ width: 200, height: 2, backgroundColor: 'gray', margin: 4 }} />

      <View>
        <Button title="Select a returning date" onPress={showDatePickerReturn} />
        <Text style={styles.textDes}>
          Return Date: {bookReturnDate ? moment(bookReturnDate).format('DD/MM/yyyy') : ''}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleReturn}
          mode="date"
          onConfirm={handleConfirmReturn}
          onCancel={hideDatePickerReturn}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Submit</Text>
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
  textDes: {
    color: '#1b1d19',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textHeader: {
    color: '#1b1d19',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
