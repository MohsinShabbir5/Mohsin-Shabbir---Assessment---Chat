import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
		padding: theme.spacing.unit * 3
	}
});

const SideBar = ({ classes, children }) => {
	const {
		userData,
		socket,
		totalUserCount,
		setTotalUserCount,
		activeUsersList,
		setActiveUsersList,
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
				<div style={{ marginBottom: '15' }}>Other Active Users: <b>{totalUserCount}</b></div>
				<Divider />
				<div >Loged In User: <b>{userName}</b></div>
				<Divider />
				<List>
					{/* <ListItem>
				<ListItemIcon><HomeIcon /></ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem> */}
					{
						!activeUsersList?.length ?
							<ListItem
								selected={true}
							>
								<ListItemText>No One Online Currently</ListItemText>
							</ListItem> :
							activeUsersList.map(user => {
								return <ListItem
									onClick={() => selectUserForChat(user)}
									button
									key={user.userID}
									selected={true}
								>
									<ListItemText>{user.userName}</ListItemText>
								</ListItem>
							})
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
