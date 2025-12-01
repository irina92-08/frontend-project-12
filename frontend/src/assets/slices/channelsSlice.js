import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    addChannel(state, { payload }) {
      state.channels = [...state.channels, payload];
    },
    removeChannel(state, { payload }) {
      console.log(state, payload);
    },
    renameChannel(state, { payload }) {
      console.log(state, payload);
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
