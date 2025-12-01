import { io } from "socket.io-client";
import { actions as messagesActions } from "../slices/messagesSlice";
import { actions as channelsActions } from "../slices/channelsSlice";

let socket = null;

export const socketMiddleware = (store) => (next) => (action) => {
  if (!socket) {
    socket = io();

    socket.on("newMessage", (payload) => {
      store.dispatch(messagesActions.addMessage(payload));
    });

    socket.on("newChannel", (payload) => {
      store.dispatch(channelsActions.addChannel(payload));
      console.log(payload); // { id: 6, name: "new channel", removable: true }
    });

    socket.on("removeChannel", (payload) => {
      console.log(payload); // { id: 6 };
      store.dispatch(channelsActions.removeChannel(payload));
    });

    socket.on("renameChannel", (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
      store.dispatch(channelsActions.renameChannel(payload));
    });
  }

  return next(action);
};
