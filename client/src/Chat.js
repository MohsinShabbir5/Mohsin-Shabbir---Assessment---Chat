import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import { useAppContext } from './context/socket';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			height: "100vh",
		},
		messagesBody: {
			width: "calc( 100% - 20px )",
			margin: 10,
			overflowY: "scroll",
			height: "calc( 100% - 80px )"
		}
	})
);

function Chat() {
	const classes = useStyles();
	const { socket, userData,selectedUserForChat, setSelectedUserForChat, messages, setMessages, } = useAppContext();
	const { userName } = userData || {};

	useEffect(() => {
console.log(selectedUserForChat);
	},[selectedUserForChat	])

	const onClick = () => {
		// createConnection();
	}
	return (
		<div className={classes.container}>
			{
				!selectedUserForChat ?
				<Typography>No one is selected for chat. Please select a user from list and start conversation</Typography>
				:
				<Paper zDepth={2}>
				<Paper id="style-1" className={classes.messagesBody}>
					<MessageLeft
						message="hello, how are you ?"
						timestamp="MM/DD 00:00"
						// photoURL={photoURL}
						displayName="Mohsin"
						avatarDisp={true}
					/>
					<MessageRight
						message="Hi , I am good how about you ?"
						timestamp="MM/DD 00:00"
                        // photoURL={photoURL}
						displayName="User 2"
						avatarDisp={true}
					/>

					<MessageLeft
						message="What are you doing currently"
						timestamp="MM/DD 00:00"
                        // photoURL={photoURL}
						displayName="Mohsin"
						avatarDisp={true}
					/>

					<MessageRight
						message="Nothing"
						timestamp="MM/DD 00:00"
                        // photoURL={photoURL}
						displayName="User 2"
						avatarDisp={true}
					/>
				</Paper>
				<TextInput />
			</Paper>
			}
		</div>
	)
}

export default Chat