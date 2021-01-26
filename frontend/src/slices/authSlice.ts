import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../utils/interfaces';

const initialState: IAuth = {
  fullName: null,
  email: null,
  username: null,
  avatar: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFullName(state: IAuth, action: PayloadAction<string | null>) {
      return { ...state, fullName: action.payload };
    },
    setUsername(state: IAuth, action: PayloadAction<string | null>) {
      return { ...state, username: action.payload };
    },
    setEmail(state: IAuth, action: PayloadAction<string | null>) {
      return { ...state, email: action.payload };
    },
    setAvatar(state: IAuth, action: PayloadAction<string | null>) {
      return { ...state, avatar: action.payload };
    },
  },
});

export const {
  setFullName,
  setEmail,
  setUsername,
  setAvatar,
} = authSlice.actions;

export default authSlice.reducer;
