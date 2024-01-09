import { configureStore } from "@reduxjs/toolkit";

import liveStreamsReducer from "./slices/liveStreamsSlice";
import chatReducer from "./slices/chatSlice";
import sideReducer from "./slices/sidebarSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
	reducer: {
		liveStreams: liveStreamsReducer,
		chat: chatReducer,
		sidebar: sideReducer,
		modals: modalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
