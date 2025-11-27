import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.channels = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [...state.messages, payload];
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
