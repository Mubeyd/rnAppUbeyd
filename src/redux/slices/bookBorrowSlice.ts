import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../data/types';

interface CounterState {
  contacts: Contact[];
  currentContact: Contact | null;
  bookBorrowDate: any | null;
  bookReturnDate: any | null;
  country: string | null;
}

const initialState: CounterState = {
  contacts: [],
  currentContact: null,
  bookBorrowDate: null,
  bookReturnDate: null,
  country: null,
};

export const bookBorrowSlice = createSlice({
  name: 'bookBorrow',
  initialState,
  reducers: {
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
    setCountry: (state, action: PayloadAction<{ country: string }>) => {
      state.country = action.payload.country;
    },
  },
});

export const { setContacts, setCurrentContact, setBookBorrowDate, setBookReturnDate, setCountry } =
  bookBorrowSlice.actions;

export default bookBorrowSlice.reducer;
