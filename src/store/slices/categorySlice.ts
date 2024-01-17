import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
	name: "category",
	initialState: {
		categoryData: null,
	},
	reducers: {
		setCategoryData: (state, action) => {
			state.categoryData = action.payload;
		},
		clearCategoryData: (state) => {
			state.categoryData = null;
		},
	},
});

export const { setCategoryData, clearCategoryData } = categorySlice.actions;
export default categorySlice.reducer;
