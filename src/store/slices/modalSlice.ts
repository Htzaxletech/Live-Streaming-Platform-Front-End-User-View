import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	isOpenLogin: boolean;
	isOpenSignUp: boolean;
	isOpenOTP: boolean;
	isOpenTwoFactor: boolean;
}

const initialState: ModalState = {
	isOpenLogin: false,
	isOpenSignUp: false,
	isOpenOTP: false,
	isOpenTwoFactor: false,
};

const modalSlice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		setOpenLogin: (state, action: PayloadAction<boolean>) => {
			state.isOpenLogin = action.payload;
		},
		setOpenSignUp: (state, action: PayloadAction<boolean>) => {
			state.isOpenSignUp = action.payload;
		},
		setOpenOTP: (state, action: PayloadAction<boolean>) => {
			state.isOpenOTP = action.payload;
		},
		setOpenTwoFactor: (state, action: PayloadAction<boolean>) => {
			state.isOpenTwoFactor = action.payload;
		},
	},
});

export const { setOpenLogin, setOpenSignUp, setOpenOTP, setOpenTwoFactor } =
	modalSlice.actions;
export default modalSlice.reducer;
