import React, { useState } from 'react';
import Chat from './Chat';
import AppContextProvider from './context/socket';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Login from './Login';
import SideBar from './SideBar';


const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			width: "100vw",
			height: "100vh",
			marginTop: '25%',
			alignItems: "center",
			justifyContent: "center"
		},
	})
);


function App() {
	const classes = useStyles();
	const [isConnected, setIsConnected] = useState(false);

	return (
		<AppContextProvider>
			{
				isConnected ?
					<SideBar>
						<Chat />
					</SideBar>
					: <div>
						<Login setIsConnected={setIsConnected} />
					</div>
			}

		</AppContextProvider>
	);
}

export default App;
