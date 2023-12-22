// chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  isSidebarOpen: boolean;
}

const initialState: ChatState = {
  isSidebarOpen: true,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;