const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("New client connected");
	socket.emit("new-user-connected", socket.id);

	socket.on("addUserToChatList", (user) => {
		io.users = io.users ? [
			...io.users,
			{
				...user,
			}
		] : [{ ...user }];
		const totalUsersConnected = io.engine.clientsCount;

		io.local.emit("updatedUsersList", {
			usersList: io.users,
			totalUsersConnected,
		});
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
		const updatedUsers = io.users ? io.users.filter(({ userID }) => userID !== socket.id) : [];
		io.users = updatedUsers;
		io.local.emit("updatedUsersList", {
			usersList: updatedUsers,
			totalUsersConnected: updatedUsers.length,
		});
	});
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log('listening on *:8000');
});