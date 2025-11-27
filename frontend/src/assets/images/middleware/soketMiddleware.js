import { io } from "socket.io-client";

export const socketMiddleware = (store) => (next) => (action) => {
  const socket = io();

  socket.on("newMessage", (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });

  socket.on("newChannel", (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
  });

  socket.on("removeChannel", (payload) => {
    console.log(payload); // { id: 6 };
  });

  socket.on("renameChannel", (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });
  return next(action);
};
