import { combineReducers } from '@reduxjs/toolkit';
import authStateRooter from '../slices/authSlice';
import postListRooter from '../slices/postListSlice';
import postPageRooter from '../slices/postPageSlice';

const rootReducer = combineReducers({
  authState: authStateRooter,
  postListState: postListRooter,
  postPageState: postPageRooter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
