import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../utils/interfaces';

interface IMessagesPageState {
  messages: IMessage[],
}

const initialState: IMessagesPageState = {
  messages: [],
};

const messagesPageSlice = createSlice({
  name: 'messagesPage',
  initialState,
  reducers: {
    resetMessagesPageSlice() {
      return initialState;
    },
    setMessages(state: IMessagesPageState, action: PayloadAction<IMessage[]>) {
      return { ...state, messages: action.payload };
    },
    setMessage(state: IMessagesPageState, action: PayloadAction<IMessage>) {
      return { ...state, messages: [...state.messages, action.payload] };
    },
  },
});

export const {
  resetMessagesPageSlice,
  setMessages,
  setMessage,
} = messagesPageSlice.actions;

export default messagesPageSlice.reducer;
