import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idChannel: "1",
  nameChannel: "general",
  userName: "",
  sendMessage: false,
};

const currentChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeCurrentChannelId(state, { payload }) {
      state.idChannel = payload;
    },
    setCurrentUserName(state, { payload }) {
      state.userName = payload;
    },
    changeCurrentChannel(state, { payload }) {
      state.nameChannel = payload.name;
      state.idChannel = payload.id;
    },
  },
});

export const { actions } = currentChatSlice;
export default currentChatSlice.reducer;
