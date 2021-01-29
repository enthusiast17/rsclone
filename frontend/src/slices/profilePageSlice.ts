import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IPost, IPostList } from '../utils/interfaces';

interface IProfileState extends IProfile {
  postList: IPostList
}

const initialState: IProfileState = {
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
  postList: {
    posts: [],
    currentPage: 1,
    nextPage: null,
    totalPostCount: 0,
    pageCount: 0,
    newPosts: [],
  },
};

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    resetProfilePageSlice() {
      return initialState;
    },
    resetProfilePostListSlice(state: IProfileState) {
      return { ...state, postList: { ...initialState.postList, posts: [] } };
    },
    updateProfilePageSlice(state: IProfileState, action: PayloadAction<IProfile>) {
      return { ...state, ...action.payload };
    },
    updateProfilePostList(state: IProfileState, action: PayloadAction<{
      posts?: IPost[],
      currentPage?: number,
      nextPage?: number | null,
      totalPostCount?: number,
      pageCount?: number,
    }>) {
      return { ...state, postList: { ...state.postList, ...action.payload } };
    },
  },
});

export const {
  resetProfilePostListSlice,
  resetProfilePageSlice,
  updateProfilePageSlice,
  updateProfilePostList,
} = profilePageSlice.actions;

export default profilePageSlice.reducer;
