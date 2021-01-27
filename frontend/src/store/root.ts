import { combineReducers } from '@reduxjs/toolkit';
import authStateRooter from '../slices/authSlice';
import postListRooter from '../slices/postListSlice';
import postPageRooter from '../slices/postPageSlice';
import profilePageRooter from '../slices/profilePageSlice';

const rootReducer = combineReducers({
  authState: authStateRooter,
  postListState: postListRooter,
  postPageState: postPageRooter,
  profilePageState: profilePageRooter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
