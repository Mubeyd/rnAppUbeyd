import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../../../redux/hooks';
import { calculateWorkdays } from '../helpers/calculateWorkdays';
import { AllowedBorrowingDays } from '../state/bookBorrowSlice';

export default function PCSummaryScreenFormik() {
  const { goBack, navigate } = useNavigation() as any;

  const currentContact = useAppSelector(state => state.bookBorrow.currentContact);
  const bookBorrowDate = useAppSelector(state => state.bookBorrow.bookBorrowDate);
  const bookReturnDate = useAppSelector(state => state.bookBorrow.bookReturnDate);
  const country = useAppSelector(state => state.bookBorrow.country);

  const totalWorkDays = useMemo(
    () =>
      calculateWorkdays({
        startDate: moment(bookBorrowDate),
        endDate: moment(bookReturnDate),
        weekendsType: country?.weekend ?? 1,
        holiDays: country?.holiDays ?? [],
      }),
    [bookBorrowDate, bookReturnDate, country?.holiDays, country?.weekend],
  );

  const delayedDays = useMemo(() => totalWorkDays - AllowedBorrowingDays, [totalWorkDays]);

  const totalPenalty = useMemo(
    () => delayedDays * (country?.penaltyPerDay ?? 0),
    [country?.penaltyPerDay, delayedDays],
  );

  const onReceive = useCallback(() => {
    navigate('ContactsScreen');
  }, [navigate]);

  const onPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={styles.textHeader}>{currentContact?.name}</Text>

      <View>
        <Text style={styles.textDes}>
          Borrow Date: {bookBorrowDate ? moment(bookBorrowDate).format('DD / MM / yyyy') : ''}
        </Text>
      </View>

      <View style={{ width: 200, height: 2, backgroundColor: 'gray', margin: 4 }} />

      <View>
        <Text style={styles.textDes}>
          Return Date: {bookReturnDate ? moment(bookReturnDate).format('DD / MM / yyyy') : ''}
        </Text>
      </View>

      <View style={{ width: 200, height: 2, backgroundColor: 'gray', margin: 4 }} />

      <View>
        <Text style={styles.textDes}>Country: {country?.name ?? 'not selected'}</Text>
      </View>

      <View>
        <Text style={styles.textDes}> Allowed borrowing days: {AllowedBorrowingDays ?? 'not selected'}</Text>
      </View>

      <View>
        <Text style={styles.textDes}>Delayed days: {delayedDays ?? 'not selected'}</Text>
      </View>

      <View>
        <Text style={styles.textDes}>
          Penalty per work day for delaying: {(country?.penaltyPerDay ?? 0).toFixed(2) ?? 'not selected'}{' '}
          {country?.currencySymbol}
        </Text>
      </View>

      <View>
        <Text style={styles.textDes}>
          Total Penalty : {totalPenalty.toFixed(2) ?? 'not selected'} {country?.currencySymbol}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onReceive}>
        <Text style={styles.buttonText}>Receive</Text>
      </TouchableOpacity>
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
  textDes: {
    color: '#1b1d19',
    fontSize: 16,
    fontWeight: '600',
    margin: 6,
    textAlign: 'center',
  },
  textHeader: {
    color: '#1b1d19',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
