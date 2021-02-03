import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IPost, IUser } from '../utils/interfaces';

interface IPostPageState extends IPost {
  refreshComments: boolean,
}

const initialState: IPostPageState = {
  user: {
    fullName: '',
    email: '',
    username: '',
    birthdayDate: null,
    avatar: null,
    aboutme: null,
  },
  id: '',
  contentText: '',
  contentImage: null,
  createdAt: '',
  likesCount: 0,
  isUserLiked: false,
  commentsCount: 0,
  comments: [],
  refreshComments: true,
};

const postPageSlice = createSlice({
  name: 'postPage',
  initialState,
  reducers: {
    resetPostPageSlice() {
      return initialState;
    },
    updatePostPageSlice(state: IPostPageState, action: PayloadAction<IPost>) {
      return { ...state, ...action.payload };
    },
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
    setCommentsCount(state: IPostPageState, action: PayloadAction<number>) {
      return { ...state, commentsCount: action.payload };
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
  },
});

export const {
  updatePostPageSlice,
  setUser,
  setId,
  setContentText,
  setContentImage,
  setCreatedDate,
  setLikesCount,
  setIsUserLiked,
  setCommentsCount,
  setComments,
  setComment,
  setRefreshComments,
  resetPostPageSlice,
} = postPageSlice.actions;

export default postPageSlice.reducer;
