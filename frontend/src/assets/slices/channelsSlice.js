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
      const newChannels = state.channels.filter(
        (channel) => channel.id !== payload.id,
      );
      state.channels = [...newChannels];
    },
    renameChannel(state, { payload }) {
      const newName = payload.name;
      state.channels = state.channels.map((channel) =>
        channel.id === payload.id ? { ...channel, name: newName } : channel,
      );
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
