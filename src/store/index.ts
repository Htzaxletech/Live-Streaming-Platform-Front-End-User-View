/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";

import liveStreamsReducer from "./slices/liveStreamsSlice";
import chatReducer from "./slices/chatSlice";
import sideReducer from "./slices/sidebarSlice";
import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import categoryReducer from "./slices/categorySlice";
import alertReducer from "./slices/alertSlice";

import store2 from "store2";

const loadAuthState = (): any => {
	try {
		const serializedState = store2.get("authState");
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

const saveAuthState = (state: any): void => {
	try {
		const serializedState = JSON.stringify(state);
		store2.set("authState", serializedState);
	} catch (error) {
		console.error("Error while saving state to localStorage:", error);
	}
};

export const store = configureStore({
	reducer: {
		liveStreams: liveStreamsReducer,
		chat: chatReducer,
		sidebar: sideReducer,
		modals: modalReducer,
		auth: authReducer,
		theme: themeReducer,
		category: categoryReducer,
		alert: alertReducer
	},
	preloadedState: {
		auth: loadAuthState(),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

store.subscribe(() => {
	const authState = store.getState().auth;
	saveAuthState(authState);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
