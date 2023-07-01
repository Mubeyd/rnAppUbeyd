import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../data/types';

interface CounterState {
  users: User[];
  currentUser: User | null;
}

const initialState: CounterState = {
  users: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
