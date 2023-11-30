import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { LiveStreamInterfece } from "../../components/shared/LiveStream"

export interface LiveStreamsState {
  liveStreams: LiveStreamInterfece[]
}

const initialState: LiveStreamsState = {
  liveStreams: [],
}

export const liveStreamsSlice = createSlice({
  name: "liveStreams",
  initialState,
  reducers: {
    setLiveStreams: (state, action: PayloadAction<LiveStreamInterfece[]>) => {
      state.liveStreams = action.payload
    },
  },
})

export const { setLiveStreams } = liveStreamsSlice.actions

export default liveStreamsSlice.reducer
