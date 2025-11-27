import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice";
import messagesReducer from "./messagesSlice";
import currentChatReduser from "./currentValueChatSlice";
import { socketMiddleware } from "../images/middleware/soketMiddleware";

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    currentChatReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});
