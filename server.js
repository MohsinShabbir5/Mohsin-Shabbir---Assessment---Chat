const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { uuid } = require('uuidv4');
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("New client connected");
	socket.emit("new-user-connected",{
		userID: uuid(),
	});
	socket.on("disconnect", () => {
	  console.log("Client disconnected");
	});
  });


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log('listening on *:8000');
  });