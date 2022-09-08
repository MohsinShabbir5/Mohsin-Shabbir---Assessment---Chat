import React, { useState, useEffect } from 'react';
import { useAppContext } from './context/socket';
import {
	Grid,
	TextField,
	Paper,
	Button
} from '@material-ui/core';


const Login = ({setIsConnected}) => {
	const { createConnection, socket, setUserData } = useAppContext();
	const [userName, setUserName] = useState('');

	const handleChange = (event) => {
		setUserName(event.target.value)
	}

	useEffect(() => {
		if (socket) {
			socket.on("new-user-connected", ({ userID }) => {
				if (userID) {
					setIsConnected(true);
					setUserData({
						userID,
						name: userName,
					});
					return;
				}
				setIsConnected(false);
			});
		}
	}, [socket])

	const onClick = () => {
		createConnection();
	}

	return (
		<div style={{ padding: 30 }}>
			<Paper style={{ backgroundColor: '#33E6FF' }}>
				<Grid
					container
					spacing={3}
					direction={'column'}
					justify={'center'}
					alignItems={'center'}
				>
					<Grid item xs={12}>
						<TextField label="Username" onChange={handleChange}></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth style={{ backgroundColor: '#FFFF' }} disabled={!userName} onClick={onClick} > Enter Chat Room </Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default Login;
