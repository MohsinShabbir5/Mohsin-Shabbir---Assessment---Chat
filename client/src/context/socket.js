import React, { createContext, useState, useContext } from 'react';
import io from 'socket.io-client';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [userData, setUserData] = useState({});

	const createConnection = () => {
		const socket = io("http://localhost:8000", {
			transports: ['websocket']
		});

		setSocket(socket);
	}


	return (
		<AppContext.Provider
			value={{
				socket,
				createConnection,
				userData,
				setUserData
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppContextProvider;