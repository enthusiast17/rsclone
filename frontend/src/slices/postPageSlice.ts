import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IPost } from '../utils/interfaces';

interface IUser {
  fullName: string,
  email: string,
  avatar: string | null,
}

interface IPostPageState extends IPost {
  refreshComments: boolean,
}

const initialState: IPostPageState = {
  user: { fullName: '', email: '', avatar: null },
  id: '',
  contentText: '',
  contentImage: null,
  createdDate: '',
  likesCount: 0,
  isUserLiked: false,
  comments: [],
  refreshComments: true,
};

const postPageSlice = createSlice({
  name: 'postPage',
  initialState,
  reducers: {
    setUser(state: IPostPageState, action: PayloadAction<IUser>) {
      return { ...state, user: action.payload };
    },
    setId(state: IPostPageState, action: PayloadAction<string>) {
      return { ...state, id: action.payload };
    },
    setContentText(state: IPostPageState, action: PayloadAction<string>) {
      return { ...state, contentText: action.payload };
    },
    setContentImage(state: IPostPageState, action: PayloadAction<string | null>) {
      return { ...state, contentImage: action.payload };
    },
    setCreatedDate(state: IPostPageState, action: PayloadAction<string>) {
      return { ...state, createdDate: action.payload };
    },
    setLikesCount(state: IPostPageState, action: PayloadAction<number>) {
      return { ...state, likesCount: action.payload };
    },
    setIsUserLiked(state: IPostPageState, action: PayloadAction<boolean>) {
      return { ...state, isUserLiked: action.payload };
    },
    setComments(state: IPostPageState, action: PayloadAction<IComment[]>) {
      return { ...state, comments: action.payload };
    },
    setComment(state: IPostPageState, action: PayloadAction<IComment>) {
      const comments = [...state.comments];
      const index = comments.findIndex((comment) => comment.id === action.payload.id);
      if (index !== -1) comments[index] = action.payload;
      return { ...state, comments };
    },
    setRefreshComments(state: IPostPageState, action: PayloadAction<boolean>) {
      return { ...state, refreshComments: action.payload };
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
  setComments,
  setComment,
  setRefreshComments,
  resetPostPageSlice,
} = postPageSlice.actions;

export default postPageSlice.reducer;
