import React, { useMemo } from 'react';
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
			width: "50%",
			position: 'fixed',
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
	const { socket, userData, selectedUserForChat, messages, setMessages, } = useAppContext();

	const selectedUserMessages = useMemo(() => {
		if(!messages[selectedUserForChat?.userID]){
			return [];
		}

		return messages[selectedUserForChat?.userID];
	}, [messages,selectedUserForChat]);

	const sendMessage = (currentMessage) => {
		const olderMessages = messages[selectedUserForChat.userID];
		const currentMessageObj = {
			from: userData.userID,
			to: selectedUserForChat.userID,
			message: currentMessage
		};

		setMessages({
			...messages,
			[selectedUserForChat.userID]: [
				...olderMessages,
				currentMessageObj,
			]
		});

		socket.emit("sendMessage", currentMessageObj);
	}

	const renderMessages = (selectedUserMessages) => {
		if (!selectedUserMessages?.length) {
			return <Typography>Nothing to show yet</Typography>
		}
		return selectedUserMessages.map(({ message, from }) => {
			if (from !== userData.userID) {
				return (
					<MessageRight
					    displayName={selectedUserForChat.userName}
						message={message}
						timestamp="MM/DD 00:00"
						avatarDisp={true}
					/>
				)
			}

			return (
				<MessageLeft
					message={message}
					timestamp="MM/DD 00:00"
					displayName={userData.userName}
					avatarDisp={true}
				/>
			)
		})
	}

	return (
		<div className={classes.container}>
			{
				!selectedUserForChat ?
					<Typography>No one is selected for chat. You can select a user from list and start conversation</Typography>
					:
					!selectedUserMessages?.length ?
					<>
					<div style={{marginLeft: '2rem', marginBottom: '2rem', backgroundColor: '#D3D3D3',padding:'2rem'}}>Write the message to start the conversation</div>
					 <TextInput sendMessage={sendMessage} />
					 </>
					 :
					<Paper>
						<Paper id="style-1" className={classes.messagesBody}>
							{renderMessages(selectedUserMessages)}
						</Paper>
						<TextInput sendMessage={sendMessage} />
					</Paper>
			}
		</div>
	)
}

export default Chat