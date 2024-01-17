import { createSlice } from "@reduxjs/toolkit";
import store from "store2";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		currentTheme: store.get("theme"),
	},
	reducers: {
		themeSwitch: (state, action) => {
			state.currentTheme = action.payload;
		},
	},
});

export const { themeSwitch } = themeSlice.actions;
export default themeSlice.reducer;
