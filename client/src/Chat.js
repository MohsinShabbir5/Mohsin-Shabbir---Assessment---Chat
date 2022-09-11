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
						message={message}
						timestamp="MM/DD 00:00"
						displayName="User 2"
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
					<Paper zDepth={2}>
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