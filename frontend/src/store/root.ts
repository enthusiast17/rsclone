import { combineReducers } from '@reduxjs/toolkit';
import authStateRooter from '../slices/authSlice';
import postListRooter from '../slices/postListSlice';

const rootReducer = combineReducers({
  authState: authStateRooter,
  postListState: postListRooter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
