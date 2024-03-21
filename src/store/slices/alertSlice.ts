import { createSlice } from "@reduxjs/toolkit";
// import ringtone from "@assets/ringtone.mp3";

const alertSlice = createSlice({
	name: "alert",
	initialState: {
		// data: {
		// 	itemVariantsID: 0,
		// 	width: 1000,
		// 	height: 1000,
		// 	layout: "3",
		// 	inAnimationType: "slide-up",
		// 	inAnimation: "slide-in-from-bottom",
		// 	outAnimation: "slide-out-to-top",
		// 	outAnimationType: "slide-up",
		// 	inAnimationTime: "duration-1000",
		// 	outAnimationTime: "duration-1000",
		// 	duration: "1",
		// 	variantName: "New Follower",
		// 	textColor: "#ffffff",
		// 	accentColor: "#00c798",
		// 	message: "{username} just followed",
		// 	defaultTextColor: "#ffffff",
		// 	defaultAccentColor: "#00c798",
		// 	username: "Linnz",
		// 	isCheckedSayTextAlert: false,
		// 	alertImage: {
		// 		url: "https://static-cdn.jtvnw.net/default-alert-asset/v1/video/Follow.webm",
		// 		type: "video",
		// 		name: "Follow.webm",
		// 		scale: 50,
		// 	},
		// 	alertSound: {
		// 		url: ringtone,
		// 		type: "mp3",
		// 		name: "Sample Ringtong.mp3",
		// 	},
		// 	alertConditionID: 1,
		// 	alertCondition: [],
		// 	variantID: 1,
		// },
		data: {
			itemVariantsID: 0,
			width: 500,
			height: 500,
			layout: "",
			inAnimationType: "",
			inAnimation: "",
			outAnimation: "",
			outAnimationType: "",
			inAnimationTime: "",
			outAnimationTime: "",
			duration: "",
			variantName: "",
			textColor: "",
			accentColor: "",
			message: "",
			defaultTextColor: "",
			defaultAccentColor: "",
			username: "",
			isCheckedSayTextAlert: false,
			alertImage: {
				url: "",
				type: "",
				name: "",
				scale: 0,
			},
			alertSound: {
				url: "",
				type: "",
				name: "",
			},
			alertConditionID: 0,
			alertCondition: [],
			variantID: 0,
		},
		variants: {
			follow: [],
			subscription: [],
			donation: [],
			isShowFollow: true,
			isShowSubscribe: false,
			isShowDonate: false,
			isShowPanel: false
		},
		initialAlertState: {
			itemVariantsID: 0,
			width: 500,
			height: 500,
			layout: "",
			inAnimationType: "",
			inAnimation: "",
			outAnimation: "",
			outAnimationType: "",
			inAnimationTime: "",
			outAnimationTime: "",
			duration: "",
			variantName: "",
			textColor: "",
			accentColor: "",
			message: "",
			defaultTextColor: "",
			defaultAccentColor: "",
			username: "",
			isCheckedSayTextAlert: false,
			alertImage: {
				url: "",
				type: "",
				name: "",
				scale: 0,
			},
			alertSound: {
				url: "",
				type: "",
				name: "",
			},
			alertConditionID: 0,
			alertCondition: [],
			variantID: 0,
		}
	},
	reducers: {
		changeFormData(state, action) {
			state.data = {
				...state.data,
				...action.payload,
			};
		},
		changeVariants(state, action) {
			state.variants = {
				...state.variants,
				...action.payload,
			};
		},
	},
});

export const { changeFormData, changeVariants } = alertSlice.actions;
export default alertSlice.reducer;
