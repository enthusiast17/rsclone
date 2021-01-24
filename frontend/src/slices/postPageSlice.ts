import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../utils/interfaces';

interface IUser {
  fullName: string,
  avatar: string | null,
}

const initialState: IPost = {
  user: { fullName: '', avatar: null },
  id: '',
  contentText: '',
  contentImage: null,
  createdDate: new Date(),
  likesCount: 0,
  isUserLiked: false,
};

const postPageSlice = createSlice({
  name: 'postPage',
  initialState,
  reducers: {
    setUser(state: IPost, action: PayloadAction<IUser>) {
      return { ...state, user: action.payload };
    },
    setId(state: IPost, action: PayloadAction<string>) {
      return { ...state, id: action.payload };
    },
    setContentText(state: IPost, action: PayloadAction<string>) {
      return { ...state, contentText: action.payload };
    },
    setContentImage(state: IPost, action: PayloadAction<string | null>) {
      return { ...state, contentImage: action.payload };
    },
    setCreatedDate(state: IPost, action: PayloadAction<Date>) {
      return { ...state, createdDate: action.payload };
    },
    setLikesCount(state: IPost, action: PayloadAction<number>) {
      return { ...state, likesCount: action.payload };
    },
    setIsUserLiked(state: IPost, action: PayloadAction<boolean>) {
      return { ...state, isUserLiked: action.payload };
    },
    resetPostPageSlice() {
      return initialState;
    },
  },
});

export const {
  setUser,
  setId,
  setContentText,
  setContentImage,
  setCreatedDate,
  setLikesCount,
  setIsUserLiked,
  resetPostPageSlice,
} = postPageSlice.actions;

export default postPageSlice.reducer;
