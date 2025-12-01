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
  },
});

export const { actions } = currentChatSlice;
export default currentChatSlice.reducer;
