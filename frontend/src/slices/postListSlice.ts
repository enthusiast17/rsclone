import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, IPostListState } from '../utils/interfaces';

const initialState: IPostListState = {
  posts: [],
  currentPage: 1,
  nextPage: null,
  totalPostCount: 0,
  pageCount: 0,
};

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setPosts(state: IPostListState, action: PayloadAction<IPost[]>) {
      if (state.posts[state.currentPage - 1]) {
        return { ...state, posts: [action.payload] };
      }
      return { ...state, posts: [...state.posts, action.payload] };
    },
    setCurrentPage(state: IPostListState, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload };
    },
    setNextPage(state: IPostListState, action: PayloadAction<number | null>) {
      return { ...state, nextPage: action.payload };
    },
    setTotalPostCount(state: IPostListState, action: PayloadAction<number>) {
      return { ...state, totalPostCount: action.payload };
    },
    setPageCount(state: IPostListState, action: PayloadAction<number>) {
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
