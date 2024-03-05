import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
	name: "alert",
	initialState: {
		data: {
			width: 500,
			height: 500,
			layout: "3",
			inAnimationType: "fade-in",
			inAnimation: "fade-in",
			outAnimation: "fade-out",
			outAnimationType: "fade-out",
			inAnimationTime: "duration-1000",
			outAnimationTime: "duration-1000",
			duration: "1",
			variantName: "New Follow",
			textColor: "#ffffff",
			accentColor: "#00c798",
			message: "{username} just followed",
			defaultTextColor: "#ffffff",
			defaultAccentColor: "#00c798",
			username: "Linnz",
			isCheckedSayTextAlert: false,
			mediaData: {
				url: "",
				type: "",
				name: "",
			},
		},
	},
	reducers: {
		changeFormData(state, action) {
			state.data = {
				...state.data,
				...action.payload,
			};
		},
	},
});

export const { changeFormData } = alertSlice.actions;
export default alertSlice.reducer;
