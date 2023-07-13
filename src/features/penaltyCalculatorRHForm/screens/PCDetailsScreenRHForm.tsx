import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getCountries } from '../api/countryApi';
import { Country, IBookBorrowForm } from '../db/types';
import { bookBorrowValidationSchema } from '../helpers/validation';
import {
  setBookBorrowDate,
  setBookPhotoBack,
  setBookPhotoFront,
  setBookReturnDate,
  setCountry,
} from '../state/bookBorrowSlice';

export default function PCDetailsScreenRHForm() {
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

  const defaultValues: IBookBorrowForm = {
    country: country || null,
    bookBorrowDate: bookBorrowDate || null,
    bookReturnDate: bookReturnDate || null,
    bookPhotoFront: bookPhotoFront || '',
    bookPhotoBack: bookPhotoBack || '',
    randomText: '',
  };

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(bookBorrowValidationSchema),
  });

  const [open, setOpen] = useState(false);
  const [valueDropDown, setValueDropDown] = useState<string | null>(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  const showDatePickerBorrow = useCallback(() => {
    setDatePickerVisibilityBorrow(true);
  }, []);

  const hideDatePickerBorrow = useCallback(() => {
    setDatePickerVisibilityBorrow(false);
  }, []);

  const handleConfirmBorrow = useCallback(
    (date: any) => {
      setValue('bookBorrowDate', date);
      hideDatePickerBorrow();
    },
    [hideDatePickerBorrow, setValue],
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
      setValue('bookReturnDate', date);
      hideDatePickerReturn();
    },
    [hideDatePickerReturn, setValue],
  );

  const onSubmitForm: SubmitHandler<IBookBorrowForm> = useCallback(
    data => {
      dispatch(setBookBorrowDate({ date: data.bookBorrowDate }));
      dispatch(setBookReturnDate({ date: data.bookReturnDate }));
      dispatch(setCountry({ country: data.country! }));
      dispatch(setBookPhotoFront({ bookPhotoFront: data.bookPhotoFront! }));
      dispatch(setBookPhotoBack({ bookPhotoBack: data.bookPhotoBack! }));

      navigate('PCSummaryScreenFormik');
    },
    [dispatch, navigate],
  );

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  const onNavCameraScreenFrontRHForm = useCallback(() => {
    navigate('CameraScreenRHForm', { photoType: 'front' });
  }, [navigate]);
  const onNavCameraScreenBackRHForm = useCallback(() => {
    navigate('CameraScreenRHForm', { photoType: 'back' });
  }, [navigate]);

  const onChangeTextInput = useCallback(
    (text: string) => {
      setValue('randomText', text);
    },
    [setValue],
  );

  useEffect(() => {
    if (countries) {
      setItems(countries.map((item: Country) => ({ label: item.name, value: item.name })));
    }
  }, [countries]);

  useEffect(() => {
    if (valueDropDown) {
      const myCountry = countries?.find(x => x.name === valueDropDown);
      if (myCountry) {
        setValue('country', myCountry);
      }
    }
  }, [countries, setValue, valueDropDown]);

  useEffect(() => {
    if (bookPhotoFront) {
      setValue('bookPhotoFront', bookPhotoFront);
    }
  }, [bookPhotoFront, countries, setValue, valueDropDown]);

  useEffect(() => {
    if (bookPhotoBack) {
      setValue('bookPhotoBack', bookPhotoBack);
    }
  }, [bookPhotoBack, setValue]);

  useEffect(() => {
    register('country');
  }, [register]);

  return (
    <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <Text style={styles.textHeader}>{currentContact?.name}</Text>

      <View>
        <Button title="Select a borrowing date" onPress={showDatePickerBorrow} />
        <Text style={styles.textDes}>
          Borrow Date: {watch('bookBorrowDate') ? moment(watch('bookBorrowDate')).format('DD / MM / yyyy') : ''}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleBorrow}
          mode="date"
          onConfirm={handleConfirmBorrow}
          onCancel={hideDatePickerBorrow}
          date={watch('bookBorrowDate') ?? new Date()}
          maximumDate={new Date()}
        />
        {errors.bookBorrowDate ? (
          <Text style={styles.errorText}>{errors.bookBorrowDate.message?.toString()}</Text>
        ) : null}
      </View>

      <View style={{ width: 200, height: 2, backgroundColor: 'gray', margin: 4 }} />

      <View>
        <Button title="Select a returning date" onPress={showDatePickerReturn} />
        <Text style={styles.textDes}>
          Return Date: {watch('bookReturnDate') ? moment(watch('bookReturnDate')).format('DD / MM / yyyy') : ''}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleReturn}
          mode="date"
          onConfirm={handleConfirmReturn}
          onCancel={hideDatePickerReturn}
          date={watch('bookReturnDate') ?? new Date()}
          minimumDate={watch('bookBorrowDate') ?? new Date()}
          maximumDate={new Date()}
        />
        {errors.bookReturnDate ? (
          <Text style={styles.errorText}>{errors.bookReturnDate.message?.toString()}</Text>
        ) : null}
      </View>

      <View style={{ margin: 4 }}>
        <Text style={styles.textDes} {...register('country')}>
          Country: {error ? 'error' : watch('country.name') ?? 'not selected'}
        </Text>
        <DropDownPicker
          open={open}
          value={valueDropDown}
          items={items}
          setOpen={setOpen}
          setValue={setValueDropDown}
          setItems={setItems}
          loading={isLoading}
          ActivityIndicatorComponent={ActivityIndicatorElement}
          searchable={true}
          searchPlaceholder="Search..."
        />
        {errors.country ? <Text style={styles.errorText}>{JSON.stringify(errors.country)}</Text> : null}
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
        <TouchableOpacity onPress={onNavCameraScreenFrontRHForm}>
          <Image
            source={bookPhotoFront ? { uri: `file://${bookPhotoFront}` } : require('../../../assets/add.png')}
            style={{
              width: 160,
              height: 160,
              resizeMode: 'contain',
              marginRight: 8,
            }}
          />
          {errors.bookPhotoFront ? <Text style={styles.errorText}>{errors.bookPhotoFront.message}</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavCameraScreenBackRHForm}>
          <Image
            source={bookPhotoBack ? { uri: `file://${bookPhotoBack}` } : require('../../../assets/add.png')}
            style={{
              width: 160,
              height: 160,
              resizeMode: 'contain',
              marginRight: 8,
            }}
          />
          {errors.bookPhotoBack ? <Text style={styles.errorText}>{errors.bookPhotoBack.message}</Text> : null}
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.textDes}>Note: </Text>
        <TextInput style={styles.inputText} onChangeText={onChangeTextInput} value={watch('randomText')} />
        {errors.randomText ? <Text style={styles.errorText}>{errors.randomText.message}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmitForm)}>
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputText: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    height: 40,
    margin: 4,
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
