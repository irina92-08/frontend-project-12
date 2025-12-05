import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice";
import messagesReducer from "./messagesSlice";
import currentChatReducer from "./currentValueChatSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    currentChatReducer,
    modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});
