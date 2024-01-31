// chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  isChatOpen: boolean;
}

const initialState: ChatState = {
  isChatOpen: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
  },
});

export const { toggleChat } = chatSlice.actions;
export default chatSlice.reducer;