import { Server } from "socket.io";
export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.socket.on("bid", (bid) => {
      console.log(bid);
      io.emit("bid", bid);
      res.end();
      return;
    });
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("bid", (bid) => {
        console.log(bid);
        io.emit("bid", bid);
      });
    });

    res.end();
  }
}
