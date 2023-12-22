import { configureStore } from "@reduxjs/toolkit"

import liveStreamsReducer from "./slices/liveStreamsSlice"
import chatReducer from "./slices/chatSlice"

export const store = configureStore({
  reducer: {
    liveStreams: liveStreamsReducer,
    chat: chatReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
