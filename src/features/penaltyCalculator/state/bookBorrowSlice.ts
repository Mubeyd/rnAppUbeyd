import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, Country } from '../db/types';

interface CounterState {
  contacts: Contact[];
  currentContact: Contact | null;
  bookBorrowDate: any | null;
  bookReturnDate: any | null;
  country: Country | null;
  bookPhotoFront: string | null;
  bookPhotoBack: string | null;
  errors: any;
}

const initialState: CounterState = {
  contacts: [],
  currentContact: null,
  bookBorrowDate: null,
  bookReturnDate: null,
  country: null,
  bookPhotoFront: null,
  bookPhotoBack: null,
  errors: {},
};

export const bookBorrowSlice = createSlice({
  name: 'bookBorrow',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setCurrentContact: (state, action: PayloadAction<Contact>) => {
      state.currentContact = action.payload;
    },
    setBookBorrowDate: (state, action: PayloadAction<{ date: any }>) => {
      state.bookBorrowDate = action.payload.date;
    },
    setBookReturnDate: (state, action: PayloadAction<{ date: any }>) => {
      state.bookReturnDate = action.payload.date;
    },
    setCountry: (state, action: PayloadAction<{ country: Country }>) => {
      state.country = action.payload.country;
    },
    setBookPhotoFront: (state, action: PayloadAction<{ bookPhotoFront: string }>) => {
      state.bookPhotoFront = action.payload.bookPhotoFront;
    },
    setBookPhotoBack: (state, action: PayloadAction<{ bookPhotoBack: string }>) => {
      state.bookPhotoBack = action.payload.bookPhotoBack;
    },
    setErrors: (state, action: PayloadAction<{ errors: any }>) => {
      state.errors = action.payload.errors;
    },
    setFormErrors: (state, action: PayloadAction<{ fieldName: string; error: string }>) => {
      state.errors[action.payload.fieldName] = action.payload.error;
    },
  },
});

export const {
  resetState,
  setContacts,
  setCurrentContact,
  setBookBorrowDate,
  setBookReturnDate,
  setCountry,
  setBookPhotoFront,
  setBookPhotoBack,
  setErrors,
  setFormErrors,
} = bookBorrowSlice.actions;

export default bookBorrowSlice.reducer;
