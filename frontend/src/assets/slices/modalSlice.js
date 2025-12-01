import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changesModal(state, { payload }) {
      state.activeModal = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
