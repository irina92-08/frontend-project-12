import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice";
import messagesReducer from "./messagesSlice";
import currentChatReduсer from "./currentValueChatSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    currentChatReduсer,
    modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});
