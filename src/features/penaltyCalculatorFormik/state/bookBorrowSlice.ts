import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AllowedBorrowingDays = 10;
export const PenaltyPerDay = 5;

export enum WeekendsType {
  Type1 = 1, // Saturday and Sunday
  Type2 = 2, // Friday and Saturday
}

export interface Contact {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  currencySymbol: string;
  currencyName: string;
  flag: string;
  weekend: number;
  holiDays: string[];
  penaltyPerDay: number;
}

interface CounterState {
  contacts: Contact[];
  currentContact: Contact | null;
  bookBorrowDate: any | null;
  bookReturnDate: any | null;
  country: Country | null;
  bookPhotoFront: string | null;
  bookPhotoBack: string | null;
}

const initialState: CounterState = {
  contacts: [],
  currentContact: null,
  bookBorrowDate: null,
  bookReturnDate: null,
  country: null,
  bookPhotoFront: null,
  bookPhotoBack: null,
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
  },
});

export const {
  setContacts,
  setCurrentContact,
  setBookBorrowDate,
  setBookReturnDate,
  setCountry,
  setBookPhotoFront,
  setBookPhotoBack,
} = bookBorrowSlice.actions;

export default bookBorrowSlice.reducer;
