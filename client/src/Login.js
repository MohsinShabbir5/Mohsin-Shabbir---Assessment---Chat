import React, { useState, useEffect } from 'react';
import {
	Grid,
	TextField,
	Paper,
	Button
} from '@material-ui/core';
import { useAppContext } from './context/socket';


const Login = ({setIsConnected}) => {
	const { createConnection, socket, setUserData } = useAppContext();
	const [userName, setUserName] = useState('');

	const handleChange = (event) => {
		setUserName(event.target.value)
	}

	const onClick = async () => {
		createConnection();
		setUserData({
			userName,
		});
		setIsConnected(true);
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
