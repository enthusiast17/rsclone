import { combineReducers } from '@reduxjs/toolkit';
import authStateRooter from '../AuthSlice';

const rootReducer = combineReducers({
  authState: authStateRooter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
