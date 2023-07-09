import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../data/types';

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
    setNewUser: (state, action: PayloadAction<{ newUser: User }>) => {
      state.users = [action.payload.newUser, ...state.users];
    },
    removeUser: (state, action: PayloadAction<{ id: number }>) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },
  },
});

export const { setUsers, setCurrentUser, setNewUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
