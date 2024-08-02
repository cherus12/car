"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const { Server } = require("socket.io");

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("sendMessage", (msgs) => {
        io.emit("recvMsg", msgs);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    strapi.io = io;
  },
};
