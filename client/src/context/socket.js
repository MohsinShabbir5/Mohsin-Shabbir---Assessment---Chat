import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [userData, setUserData] = useState({});
	const [totalUserCount, setTotalUserCount] = useState(0);
	const [activeUsersList, setActiveUsersList] = useState([]);
	const [selectedUserForChat, setSelectedUserForChat] = useState(null)
	const [messages, setMessages] = useState({});

	const createConnection = () => {
		const socket = io("http://localhost:8000", {
			transports: ['websocket']
		});

		setSocket(socket);
		// return socket;
	}

	socket?.on("messageReceived", (currentMessageObj) => {
		const olderMessages = messages[currentMessageObj.from] || [];
		setMessages({
			...messages,
			[currentMessageObj.from]: [
				...olderMessages,
				currentMessageObj,
			]
		});
	});

	useEffect(() => {
		socket?.on("new-user-connected", (userID) => {

			const test = {
				...userData,
				userID,
			}

			console.log(test);

			setUserData({
				...userData,
				userID,
			});

			socket.emit("addUserToChatList", {
				...userData,
				userID,
			});
		});

		socket?.on("updatedUsersList", ({ usersList, totalUsersConnected }) => {

			setTotalUserCount(totalUsersConnected - 1);

			const activeUsersList = usersList.filter(({ userID }) => userID !== socket.id);

			setActiveUsersList(activeUsersList);
		});
	}, [socket])

	return (
		<AppContext.Provider
			value={{
				socket,
				createConnection,
				userData,
				setUserData,
				totalUserCount,
				setTotalUserCount,
				activeUsersList,
				setActiveUsersList,
				selectedUserForChat,
				setSelectedUserForChat,
				messages,
				setMessages
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppContextProvider;