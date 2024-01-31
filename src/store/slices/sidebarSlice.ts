// chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isSidebarCollapsed: boolean;
}

const initialState: SidebarState = {
  isSidebarCollapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state. isSidebarCollapsed = !state. isSidebarCollapsed;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;