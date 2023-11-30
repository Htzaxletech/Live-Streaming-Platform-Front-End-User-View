import { configureStore } from "@reduxjs/toolkit"

import liveStreamsReducer from "./slices/liveStreamsSlice"

export const store = configureStore({
  reducer: {
    liveStreams: liveStreamsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
