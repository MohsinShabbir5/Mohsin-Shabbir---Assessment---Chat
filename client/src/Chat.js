import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import { useAppContext } from './context/socket';

const useStyles = makeStyles((theme) =>
	createStyles({
		paper: {
			width: "80vw",
			height: "80vh",
			maxWidth: "500px",
			maxHeight: "700px",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			position: "relative"
		},
		paper2: {
			width: "80vw",
			maxWidth: "500px",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			position: "relative"
		},
		container: {
			width: "100vw",
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
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
	const { createConnection, socket, setUserData } = useAppContext();

	const onClick = () => {
		createConnection();
	}
	return (
		<div className={classes.container}>
			<Paper className={classes.paper} zDepth={2}>
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
		</div>
	)
}

export default Chat