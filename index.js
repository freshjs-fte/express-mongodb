const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const config = require("./configs");
const { EVENTS } = require("./configs/socket.io");
const { message: Message } = require("./models");

const PORT = process.env.PORT || config.PORT;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  /* options */
  cors: "*",
});

io.on("connection", (socket) => {
  console.log("new connection on socket.io");

  socket.on("disconnect", (reason) => {
    console.log("reason of disconneting", reason);
  });

  socket.on(EVENTS.NEW_MESSAGE, async (data) => {
    try {
      const newMessage = await Message.create(data);

      socket.emit(EVENTS.NEW_MESSAGE, newMessage);

    } catch (error) {

      return socket.emit(EVENTS.NEW_MESSAGE_ERROR, {
        error: "Cannot create message. " + error.message,
      });

    }
  });
});

httpServer.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});

module.exports = httpServer;
