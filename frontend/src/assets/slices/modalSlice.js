import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: false,
  statusModal: null,
  initialValue: "",
  channelId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.activeModal = true;
      state.statusModal = "add";
      state.initialValue = "";
      state.channelId = null;
    },
    openRenameModal(state, { payload }) {
      state.activeModal = true;
      state.statusModal = "rename";
      state.initialValue = payload.name;
      state.channelId = payload.id;
    },
    closeModal: () => {
      return initialState;
    },
    openDeleteModal(state, { payload }) {
      state.activeModal = true;
      state.statusModal = "delete";
      state.initialValue = payload.name;
      state.channelId = payload.id;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
