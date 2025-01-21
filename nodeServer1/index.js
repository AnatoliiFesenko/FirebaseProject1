import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dgram from "dgram";
import cors from "cors";

import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const PORT_SERVER2 = process.env.PORT_SERVER2;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});
const udpClient = dgram.createSocket("udp4");

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  })
);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("sendMessage", (message) => {
    console.log("Message received: ", message);
    const udpMessage = Buffer.from(JSON.stringify(message));
    udpClient.send(udpMessage, PORT_SERVER2, "localhost", (err) => {
      if (err) console.error("UDP send error:", err);
    });
  });
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:3000/");
});
