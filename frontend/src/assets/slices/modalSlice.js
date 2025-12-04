import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: false,
  rename: false,
  initialValue: "",
  channelId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.activeModal = true;
      state.rename = false;
      state.initialValue = "";
      state.channelId = null;
    },
    openRenameModal(state, { payload }) {
      state.activeModal = true;
      state.rename = true;
      state.initialValue = payload.name;
      state.channelId = payload.id;
    },
    closeModal: (state) => {
      state.activeModal = false;
      state.initialValue = "";
      state.channelId = null;
      state.rename = false;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
