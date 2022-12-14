import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAppContext } from './context/socket';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	}
});

const SideBar = ({ classes, children }) => {
	const {
		userData,
		totalUserCount,
		activeUsersList,
		selectedUserForChat,
		setSelectedUserForChat,
		messages,
		setMessages,
	} = useAppContext();
	const { userName } = userData || {};

	const selectUserForChat = (user) => {
		if (!messages[user.userID]) {
			setMessages({
				...messages,
				[user.userID]: [],
			})
		}
		setSelectedUserForChat(user);
	}

	return (
		<div className={classes.root}>

			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
				anchor="left"
			>
				<div className={classes.toolbar} />
				<div style={{ padding: '1rem', backgroundColor: '#ADFF2F' }}>Other Online Users : <b>{totalUserCount}</b></div>
				<Divider />
				<div style={{ backgroundColor: '#FFA500', padding: '1rem' }}>Loged In User: <b>{userName}</b></div>
				<Divider />
				<List>
					{
						!activeUsersList?.length ?
							<ListItem
								selected={true}
								key='key'
							>
								<ListItemText>No One Online Currently</ListItemText>
							</ListItem> :
							<>
								<ListItem
									selected={true}
									key='key'
									style={{backgroundColor: '#89CFF0'}}

								>
									<ListItemText>Active Users List......</ListItemText>
								</ListItem>
								{
									activeUsersList.map(user => {
										return (
											<>
												<ListItem
													onClick={() => selectUserForChat(user)}
													button
													key={user.userID}
													selected={selectedUserForChat?.userID === user?.userID}
												>
													<ListItemText key={user.userID}>{user.userName}</ListItemText>
												</ListItem>
												<Divider />
											</>
										)

									})
								}
							</>
					}

				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
}

SideBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
