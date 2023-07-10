import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/state/counterSlice';
import userReducer from '../features/dummyUsers/state/userSlice';
import bookBorrowReducer from '../features/penaltyCalculator/state/bookBorrowSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    bookBorrow: bookBorrowReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
