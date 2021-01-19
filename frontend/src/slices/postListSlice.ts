import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, IPostList } from '../utils/interfaces';

const initialState: IPostList = {
  posts: [],
  currentPage: 0,
  nextPage: null,
  totalPostCount: 0,
  pageCount: 0,
};

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setPosts(state: IPostList, action: PayloadAction<IPost[]>) {
      return { ...state, posts: [...state.posts, ...action.payload] };
    },
    setCurrentPage(state: IPostList, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload };
    },
    setNextPage(state: IPostList, action: PayloadAction<string | null>) {
      return { ...state, nextPage: action.payload };
    },
    setTotalPostCount(state: IPostList, action: PayloadAction<number>) {
      return { ...state, totalPostCount: action.payload };
    },
    setPageCount(state: IPostList, action: PayloadAction<number>) {
      return { ...state, pageCount: action.payload };
    },
  },
});

export const {
  setPosts,
  setCurrentPage,
  setNextPage,
  setTotalPostCount,
  setPageCount,
} = postListSlice.actions;

export default postListSlice.reducer;
