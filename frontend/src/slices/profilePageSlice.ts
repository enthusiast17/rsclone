import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from '../utils/interfaces';

const initialState: IProfile = {
  fullName: '',
  email: '',
  username: '',
  birthdayDate: null,
  avatar: null,
  aboutme: null,
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
  groupsCount: 0,
};

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    resetProfilePageSlice() {
      return initialState;
    },
    updateProfilePageSlice(state: IProfile, action: PayloadAction<IProfile>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  resetProfilePageSlice,
  updateProfilePageSlice,
} = profilePageSlice.actions;

export default profilePageSlice.reducer;
