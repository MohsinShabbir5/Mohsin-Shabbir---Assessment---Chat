import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export const TextInput = ({sendMessage}) => {
    const classes = useStyles();
	const [message, setMessage ] = useState('');
	const handleChange = (event) => {
		setMessage(event.target.value);
	}

	const onClick = () => {
		setMessage('')
		sendMessage(message);
	}

    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Write you Message"
                className={classes.wrapText}
                onChange={handleChange}
				value={message}
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



