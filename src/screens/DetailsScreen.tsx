import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useCameraDevices } from 'react-native-vision-camera';
import { Country } from 'src/data/types';
import { getCountries } from '../api/countryApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setBookBorrowDate, setBookReturnDate, setCountry } from '../redux/slices/bookBorrowSlice';

export default function DetailsScreen() {
  const { navigate } = useNavigation() as any;
  const dispatch = useAppDispatch();

  const currentContact = useAppSelector(state => state.bookBorrow.currentContact);
  const bookBorrowDate = useAppSelector(state => state.bookBorrow.bookBorrowDate);
  const bookReturnDate = useAppSelector(state => state.bookBorrow.bookReturnDate);
  const country = useAppSelector(state => state.bookBorrow.country);
  const bookPhotoFront = useAppSelector(state => state.bookBorrow.bookPhotoFront);
  const bookPhotoBack = useAppSelector(state => state.bookBorrow.bookPhotoBack);

  const [isDatePickerVisibleBorrow, setDatePickerVisibilityBorrow] = useState(false);

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  const setCountryC = useCallback(
    (item: string) => {
      dispatch(setCountry({ country: item }));
    },
    [dispatch],
  );

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
    navigate('SummaryScreen');
  }, [navigate]);

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  useEffect(() => {
    if (countries) {
      setItems(countries.map((item: Country) => ({ label: item.name, value: item.name })));
    }
  }, [countries]);

  useEffect(() => {
    if (value) {
      dispatch(setCountry({ country: value }));
    }
  }, [dispatch, setCountryC, value]);
  const devices = useCameraDevices();
  const device = devices.back;

  return (
    <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
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

      <View style={{ margin: 4 }}>
        <Text style={styles.textDes}>Country: {error ? 'error' : country ?? 'not selected'}</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          loading={isLoading}
          ActivityIndicatorComponent={ActivityIndicatorElement}
          searchable={true}
          searchPlaceholder="Search..."
        />
      </View>

      <Text style={styles.textDes}>Images </Text>
      <View
        style={{
          margin: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigate('CameraScreen', { photoType: 'front' })}>
          <Image
            source={bookPhotoFront ? { uri: `file://${bookPhotoFront}` } : require('../assets/add.png')}
            style={{
              width: 160,
              height: 160,
              resizeMode: 'contain',
              marginRight: 8,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('CameraScreen', { photoType: 'back' })}>
          <Image
            source={bookPhotoBack ? { uri: `file://${bookPhotoBack}` } : require('../assets/add.png')}
            style={{
              width: 160,
              height: 160,
              resizeMode: 'contain',
              marginRight: 8,
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderColor: 'blue',
    borderRadius: 4,
    borderWidth: 1,
    bottom: 4,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
  },
  buttonText: {
    color: 'blue',
  },
  cameraStyle: {
    height: 200,
    width: 200,
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
