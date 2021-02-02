import { combineReducers } from '@reduxjs/toolkit';
import authStateRooter from '../slices/authSlice';
import postListRooter from '../slices/postListSlice';
import postPageRooter from '../slices/postPageSlice';
import profilePageRooter from '../slices/profilePageSlice';
import messagesPageRooter from '../slices/messagesPageSlice';

const rootReducer = combineReducers({
  authState: authStateRooter,
  postListState: postListRooter,
  postPageState: postPageRooter,
  profilePageState: profilePageRooter,
  messagesPageState: messagesPageRooter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
